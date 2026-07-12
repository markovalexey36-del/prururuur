-- Сгенерируйте hash пароля через bcrypt и вставьте его сюда.
-- Пример login: admin
INSERT INTO admins (id, login, password_hash, is_active)
VALUES (
  '11111111-1111-1111-1111-111111111111',
  'admin',
  '$2a$12$REPLACE_WITH_BCRYPT_HASH',
  1
)
ON DUPLICATE KEY UPDATE
  password_hash = VALUES(password_hash),
  is_active = VALUES(is_active);
