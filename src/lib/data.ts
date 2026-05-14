import { randomUUID } from 'crypto';
import { Collection, type Document, type WithId } from 'mongodb';
import { getMongoDb } from '@/lib/mongodb';

export type UserRole = 'employee' | 'boss';

export type UserRecord = {
  id: string;
  fullName: string;
  email: string;
  passwordHash: string;
  salt: string;
  role: UserRole;
  createdAt: string;
};

export type SessionRecord = {
  token: string;
  userId: string;
  createdAt: string;
  expiresAt: string;
};

export type AttendanceRecord = {
  id: string;
  userId: string;
  date: string;
  markedAt: string;
};

type UserDocument = UserRecord & Document;
type SessionDocument = SessionRecord & Document;
type AttendanceDocument = AttendanceRecord & Document;

type Collections = {
  users: Collection<UserDocument>;
  sessions: Collection<SessionDocument>;
  attendance: Collection<AttendanceDocument>;
};

let collectionsPromise: Promise<Collections> | null = null;

const SESSION_TTL_SECONDS = 60 * 60 * 24 * 7; // 7 days

async function ensureCollections() {
  if (!collectionsPromise) {
    collectionsPromise = (async () => {
      const db = await getMongoDb();
      const users = db.collection<UserDocument>('users');
      const sessions = db.collection<SessionDocument>('sessions');
      const attendance = db.collection<AttendanceDocument>('attendance');

      await Promise.all([
        users.createIndex({ email: 1 }, { unique: true }),
        sessions.createIndex({ token: 1 }, { unique: true }),
        sessions.createIndex({ userId: 1 }, { unique: true }),
        // TTL index: MongoDB auto-deletes expired sessions
        sessions.createIndex({ expiresAt: 1 }, { expireAfterSeconds: 0 }),
        attendance.createIndex({ userId: 1, date: 1 }, { unique: true }),
      ]);

      return { users, sessions, attendance };
    })();
  }

  return collectionsPromise;
}

function stripMongoFields<T extends Document>(document: WithId<T>): T {
  const { _id, ...rest } = document;
  return rest as unknown as T;
}

export async function findUserByEmail(email: string) {
  const { users } = await ensureCollections();
  const user = await users.findOne({ email: email.toLowerCase() });
  return user ? stripMongoFields(user) : null;
}

export async function getUserById(id: string) {
  const { users } = await ensureCollections();
  const user = await users.findOne({ id });
  return user ? stripMongoFields(user) : null;
}

export async function createUser(input: Omit<UserRecord, 'id' | 'createdAt'>) {
  const { users } = await ensureCollections();
  const user: UserRecord = {
    id: randomUUID(),
    createdAt: new Date().toISOString(),
    ...input,
    role: input.role ?? 'employee',
    email: input.email.toLowerCase(),
  };

  await users.insertOne(user);
  return user;
}

/**
 * Atomically ensures the boss user exists with up-to-date credentials.
 * Uses findOneAndUpdate with upsert so concurrent calls are race-free.
 */
export async function upsertBossUser(input: Omit<UserRecord, 'id' | 'role' | 'createdAt'>) {
  const { users } = await ensureCollections();
  const email = input.email.toLowerCase();
  const now = new Date().toISOString();

  const result = await users.findOneAndUpdate(
    { email },
    {
      $setOnInsert: { id: randomUUID(), createdAt: now, role: 'boss' as UserRole },
      $set: { fullName: input.fullName, passwordHash: input.passwordHash, salt: input.salt, email },
    },
    { upsert: true, returnDocument: 'after' }
  );

  // result is the document after the operation
  if (!result) {
    throw new Error('upsertBossUser: unexpected null result');
  }
  return stripMongoFields(result);
}

export async function storeSession(userId: string) {
  const { sessions } = await ensureCollections();
  const now = new Date();
  const expiresAt = new Date(now.getTime() + SESSION_TTL_SECONDS * 1000);

  const session: SessionRecord = {
    token: randomUUID(),
    userId,
    createdAt: now.toISOString(),
    expiresAt: expiresAt.toISOString(),
  };

  await sessions.deleteMany({ userId });
  await sessions.insertOne(session);
  return session;
}

export async function getSessionByToken(token: string) {
  const { sessions } = await ensureCollections();
  const session = await sessions.findOne({ token });
  if (!session) return null;

  // Guard: reject sessions that have already expired (belt-and-suspenders
  // alongside the MongoDB TTL index, which only fires every ~60 s).
  if (new Date(session.expiresAt) <= new Date()) {
    await sessions.deleteOne({ token });
    return null;
  }

  return stripMongoFields(session);
}

export async function deleteSessionByToken(token: string) {
  const { sessions } = await ensureCollections();
  await sessions.deleteOne({ token });
}

export async function getAttendanceForUserAndDate(userId: string, date: string) {
  const { attendance } = await ensureCollections();
  const record = await attendance.findOne({ userId, date });
  return record ? stripMongoFields(record) : null;
}

export async function getAttendanceRecords(filter: { userId?: string; datePrefix?: string } = {}) {
  const { attendance } = await ensureCollections();
  const query: { userId?: string; date?: { $regex: string } } = {};

  if (filter.userId) {
    query.userId = filter.userId;
  }

  if (filter.datePrefix) {
    query.date = { $regex: `^${filter.datePrefix}` };
  }

  const records = await attendance.find(query).sort({ date: -1, markedAt: -1 }).toArray();
  return records.map(stripMongoFields);
}

export async function getAllUsers() {
  const { users } = await ensureCollections();
  const list = await users.find({}).toArray();
  return list.map(stripMongoFields);
}

export async function storeAttendance(input: Omit<AttendanceRecord, 'id'>) {
  const { attendance } = await ensureCollections();
  const record: AttendanceRecord = {
    id: randomUUID(),
    ...input,
  };

  await attendance.insertOne(record);
  return record;
}