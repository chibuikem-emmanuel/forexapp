export async function apiFetch(endpoint: string, options: RequestInit = {}) {
  const token = typeof window !== 'undefined' ? localStorage.getItem('access_token') : null;

  const headers: Record<string, string> = {
    'Content-Type': 'application/json',
    ...(token ? { Authorization: `Bearer ${token}` } : {}),
    ...(options.headers as Record<string, string>),
  };

  const API_BASE = process.env.NEXT_PUBLIC_API_URL || 'https://cryp-backend.onrender.com/';
  const response = await fetch(`${API_BASE}${endpoint}`, {
    ...options,
    headers,
  });

  const responseText = await response.text();
  let data: any = {};

  try {
    data = JSON.parse(responseText);
  } catch {
    throw new Error(`Server returned a non-JSON response (${response.status}). Check backend logs.`);
  }

  if (response.status === 401) {
    if (typeof window !== 'undefined') {
      localStorage.removeItem('access_token');
      window.location.href = '/login?expired=true';
    }
    throw new Error('Session expired. Please log in again.');
  }

  if (!response.ok) {
    throw new Error(data.error || data.detail || `Request failed with status ${response.status}`);
  }

  return data;
}