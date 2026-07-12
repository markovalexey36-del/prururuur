CREATE TABLE IF NOT EXISTS admins (
  id CHAR(36) NOT NULL,
  login VARCHAR(255) NOT NULL,
  password_hash VARCHAR(255) NOT NULL,
  is_active TINYINT(1) NOT NULL DEFAULT 1,
  created_at TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  PRIMARY KEY (id),
  UNIQUE KEY uniq_admins_login (login)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

CREATE TABLE IF NOT EXISTS residents (
  id CHAR(36) NOT NULL,
  name VARCHAR(255) NOT NULL,
  tag VARCHAR(255) DEFAULT NULL,
  photo_url VARCHAR(500) DEFAULT NULL,
  bio MEDIUMTEXT,
  contact_name VARCHAR(255) DEFAULT NULL,
  contact_email VARCHAR(255) DEFAULT NULL,
  contact_phone VARCHAR(100) DEFAULT NULL,
  google_form_url VARCHAR(500) DEFAULT NULL,
  social_links JSON DEFAULT NULL,
  media_gallery JSON DEFAULT NULL,
  is_active TINYINT(1) NOT NULL DEFAULT 1,
  created_at TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  PRIMARY KEY (id),
  KEY idx_residents_active (is_active),
  KEY idx_residents_created_at (created_at)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

CREATE TABLE IF NOT EXISTS media_projects (
  id CHAR(36) NOT NULL,
  resident_id CHAR(36) DEFAULT NULL,
  title VARCHAR(255) NOT NULL,
  tag VARCHAR(255) DEFAULT NULL,
  cover_url VARCHAR(500) DEFAULT NULL,
  description TEXT,
  social_url VARCHAR(500) DEFAULT NULL,
  body MEDIUMTEXT,
  media_gallery JSON DEFAULT NULL,
  is_published TINYINT(1) NOT NULL DEFAULT 1,
  created_at TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  PRIMARY KEY (id),
  KEY idx_media_projects_resident_id (resident_id),
  KEY idx_media_projects_published (is_published),
  KEY idx_media_projects_created_at (created_at),
  CONSTRAINT fk_media_projects_resident FOREIGN KEY (resident_id) REFERENCES residents (id) ON DELETE SET NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

CREATE TABLE IF NOT EXISTS news_posts (
  id CHAR(36) NOT NULL,
  title VARCHAR(255) NOT NULL,
  date DATE NOT NULL,
  tag VARCHAR(255) DEFAULT NULL,
  cover_url VARCHAR(500) DEFAULT NULL,
  body MEDIUMTEXT,
  video_url VARCHAR(500) DEFAULT NULL,
  media_gallery JSON DEFAULT NULL,
  resident_id CHAR(36) DEFAULT NULL,
  media_project_id CHAR(36) DEFAULT NULL,
  is_published TINYINT(1) NOT NULL DEFAULT 1,
  created_at TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  PRIMARY KEY (id),
  KEY idx_news_posts_resident_id (resident_id),
  KEY idx_news_posts_media_project_id (media_project_id),
  KEY idx_news_posts_published (is_published),
  KEY idx_news_posts_date (date),
  CONSTRAINT fk_news_posts_resident FOREIGN KEY (resident_id) REFERENCES residents (id) ON DELETE SET NULL,
  CONSTRAINT fk_news_posts_media_project FOREIGN KEY (media_project_id) REFERENCES media_projects (id) ON DELETE SET NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
