export function normalizeBoolean(value) {
  return value === true || value === 1 || value === '1' || value === 'true';
}

export function parseJsonArray(value, fallback = []) {
  if (!value) return fallback;
  if (Array.isArray(value)) return value;
  try {
    const parsed = JSON.parse(value);
    return Array.isArray(parsed) ? parsed : fallback;
  } catch {
    return fallback;
  }
}

export function mapResident(row) {
  if (!row) return null;
  return {
    id: row.id,
    name: row.name,
    tag: row.tag,
    photo_url: row.photo_url,
    bio: row.bio,
    contact_name: row.contact_name,
    contact_email: row.contact_email,
    contact_phone: row.contact_phone,
    google_form_url: row.google_form_url,
    social_links: parseJsonArray(row.social_links),
    media_gallery: parseJsonArray(row.media_gallery),
    is_active: normalizeBoolean(row.is_active),
    created_at: row.created_at,
    updated_at: row.updated_at,
  };
}

export function mapMediaProject(row) {
  if (!row) return null;
  return {
    id: row.id,
    title: row.title,
    tag: row.tag,
    cover_url: row.cover_url,
    description: row.description,
    social_url: row.social_url,
    body: row.body,
    media_gallery: parseJsonArray(row.media_gallery),
    is_published: normalizeBoolean(row.is_published),
    created_at: row.created_at,
    updated_at: row.updated_at,
  };
}

export function mapNewsPost(row) {
  if (!row) return null;
  return {
    id: row.id,
    title: row.title,
    date: row.date,
    tag: row.tag,
    cover_url: row.cover_url,
    body: row.body,
    video_url: row.video_url,
    media_gallery: parseJsonArray(row.media_gallery),
    resident_id: row.resident_id,
    media_project_id: row.media_project_id,
    is_published: normalizeBoolean(row.is_published),
    created_at: row.created_at,
    updated_at: row.updated_at,
  };
}
