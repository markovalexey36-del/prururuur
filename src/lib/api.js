const API_PREFIX = '/api';

async function request(path, options = {}) {
  const response = await fetch(`${API_PREFIX}${path}`, {
    credentials: 'include',
    headers: {
      ...(options.body instanceof FormData ? {} : { 'Content-Type': 'application/json' }),
      ...(options.headers || {}),
    },
    ...options,
  });

  if (!response.ok) {
    let message = `Request failed with status ${response.status}`;
    try {
      const data = await response.json();
      if (data?.error) {
        message = data.error;
      }
    } catch {
      // ignore json parse error
    }
    throw new Error(message);
  }

  if (response.status === 204) {
    return null;
  }

  return response.json();
}

export const api = {
  public: {
    listResidents: () => request('/residents'),
    getResident: (id) => request(`/residents/${id}`),
    listMediaProjects: () => request('/media-projects'),
    getMediaProject: (id) => request(`/media-projects/${id}`),
    listNews: () => request('/news'),
    getNewsPost: (id) => request(`/news/${id}`),
  },
  admin: {
    login: (payload) => request('/auth/admin/login', { method: 'POST', body: JSON.stringify(payload) }),
    logout: () => request('/auth/admin/logout', { method: 'POST' }),
    me: () => request('/auth/admin/me'),
    upload: async (file) => {
      const formData = new FormData();
      formData.append('file', file);
      return request('/upload', { method: 'POST', body: formData });
    },
    listResidents: () => request('/admin/residents'),
    createResident: (payload) => request('/admin/residents', { method: 'POST', body: JSON.stringify(payload) }),
    updateResident: (id, payload) => request(`/admin/residents/${id}`, { method: 'PUT', body: JSON.stringify(payload) }),
    deleteResident: (id) => request(`/admin/residents/${id}`, { method: 'DELETE' }),
    listMediaProjects: () => request('/admin/media-projects'),
    createMediaProject: (payload) => request('/admin/media-projects', { method: 'POST', body: JSON.stringify(payload) }),
    updateMediaProject: (id, payload) => request(`/admin/media-projects/${id}`, { method: 'PUT', body: JSON.stringify(payload) }),
    deleteMediaProject: (id) => request(`/admin/media-projects/${id}`, { method: 'DELETE' }),
    listNews: () => request('/admin/news'),
    createNewsPost: (payload) => request('/admin/news', { method: 'POST', body: JSON.stringify(payload) }),
    updateNewsPost: (id, payload) => request(`/admin/news/${id}`, { method: 'PUT', body: JSON.stringify(payload) }),
    deleteNewsPost: (id) => request(`/admin/news/${id}`, { method: 'DELETE' }),
  }
};
