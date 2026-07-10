export type DataSource = 'api' | 'mock';

export class ApiError extends Error {
  constructor(public readonly status: number, public readonly statusText: string, public readonly path: string) {
    super(`API request failed: ${status} ${statusText} for ${path}`);
  }
}

export async function apiGet<T>(path: string, init?: RequestInit): Promise<T> {
  const res = await fetch(path, { ...init, headers: { accept: 'application/json', ...(init?.headers ?? {}) } });
  if (!res.ok) throw new ApiError(res.status, res.statusText, path);
  return res.json() as Promise<T>;
}

export async function apiGetOrMock<T>(path: string, fallback: T, init?: RequestInit): Promise<{ data: T; source: DataSource; error?: string }> {
  try {
    return { data: await apiGet<T>(path, init), source: 'api' };
  } catch (err) {
    const message = err instanceof Error ? err.message : String(err);
    console.info(`[Portal.Web] Using mock data for ${path}: ${message}`);
    return { data: fallback, source: 'mock', error: message };
  }
}
