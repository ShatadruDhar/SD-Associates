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
        attendance.createIndex({ userId: 1, date: 1 }, { unique: true })
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
    email: input.email.toLowerCase()
  };

  await users.insertOne(user);
  return user;
}

export async function storeSession(userId: string) {
  const { sessions } = await ensureCollections();
  const session: SessionRecord = {
    token: randomUUID(),
    userId,
    createdAt: new Date().toISOString()
  };

  await sessions.deleteMany({ userId });
  await sessions.insertOne(session);
  return session;
}

export async function getSessionByToken(token: string) {
  const { sessions } = await ensureCollections();
  const session = await sessions.findOne({ token });
  return session ? stripMongoFields(session) : null;
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
    ...input
  };

  await attendance.insertOne(record);
  return record;
}