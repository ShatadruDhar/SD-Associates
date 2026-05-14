"use client";

import { useRouter } from 'next/navigation';
import { useState, useTransition } from 'react';
import type { FormEvent } from 'react';

type AuthMode = 'signup' | 'login';

type Props = {
  mode: AuthMode;
  disabled?: boolean;
};

export function AuthForm({ mode, disabled = false }: Props) {
  const router = useRouter();
  const [isPending, startTransition] = useTransition();
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');
  const [formState, setFormState] = useState({ fullName: '', email: '', password: '' });

  async function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setError('');
    setSuccess('');

    if (disabled) {
      setError('Login is currently blocked from this IP address.');
      return;
    }

    const payload =
      mode === 'signup'
        ? {
            fullName: formState.fullName,
            email: formState.email,
            password: formState.password
          }
        : {
            email: formState.email,
            password: formState.password
          };

    const response = await fetch(`/api/auth/${mode}`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(payload)
    });

    const result = await response.json();

    if (!response.ok) {
      setError(result.error ?? 'Something went wrong.');
      return;
    }

    if (mode === 'signup') {
      setSuccess('Account created successfully. You can log in now.');
      startTransition(() => router.push('/login'));
      return;
    }

    setSuccess('Login successful. Redirecting to your dashboard.');
    startTransition(() => router.push('/dashboard'));
  }

  return (
    <form className="form" onSubmit={handleSubmit}>
      {mode === 'signup' ? (
        <div className="field">
          <label htmlFor="fullName">Full name</label>
          <input
            id="fullName"
            name="fullName"
            type="text"
            value={formState.fullName}
            onChange={(event) => setFormState((current) => ({ ...current, fullName: event.target.value }))}
            placeholder="Jane Employee"
            required
          />
        </div>
      ) : null}

      <div className="field">
        <label htmlFor="email">Email</label>
        <input
          id="email"
          name="email"
          type="email"
          value={formState.email}
          onChange={(event) => setFormState((current) => ({ ...current, email: event.target.value }))}
          placeholder="employee@company.com"
          required
        />
      </div>

      <div className="field">
        <label htmlFor="password">Password</label>
        <input
          id="password"
          name="password"
          type="password"
          value={formState.password}
          onChange={(event) => setFormState((current) => ({ ...current, password: event.target.value }))}
          placeholder="Choose a strong password"
          minLength={8}
          required
        />
        <div className="field-hint">Use at least 8 characters.</div>
      </div>

      {error ? <div className="message message--error">{error}</div> : null}
      {success ? <div className="message message--success">{success}</div> : null}

      <button type="submit" className="button" disabled={isPending || disabled}>
        {isPending ? 'Please wait...' : mode === 'signup' ? 'Create employee account' : 'Sign in now'}
      </button>

      {mode === 'login' ? <div className="notice">Only approved office IP addresses can use this form.</div> : null}
    </form>
  );
}