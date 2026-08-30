import { describe, expect, it, vi } from 'vitest';
import { fetchUserProfile } from './profiles';

describe('profiles API', () => {
  it('fetches user profile by id', async () => {
    const mockUsers = {
      '1': { name: 'John Doe', title: 'Developer' },
      '2': { name: 'Jane Smith', title: 'Designer' },
    };

    (globalThis as any).fetch = vi.fn().mockResolvedValue({
      json: () => Promise.resolve(mockUsers),
    });

    const profile = await fetchUserProfile('1');
    expect(profile).toEqual({ name: 'John Doe', title: 'Developer' });
  });

  it('returns fallback for unknown user', async () => {
    const mockUsers = { '1': { name: 'John Doe', title: 'Developer' } };

    (globalThis as any).fetch = vi.fn().mockResolvedValue({
      json: () => Promise.resolve(mockUsers),
    });

    const profile = await fetchUserProfile('999');
    expect(profile).toEqual({ name: 'Unknown', title: 'No such user' });
  });
});
