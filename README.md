# Под Крышей

Проект переведён с Base44 на собственный стек для деплоя на обычный VPS:
- frontend: React + Vite
- backend: Node.js + Express
- database: MySQL 5.7
- admin auth: httpOnly cookie + JWT
- uploads: локальное файловое хранилище `/uploads`

## Локальный запуск

1. Установить зависимости:

```bash
npm install
```

2. Создать серверный `.env` на основе `server/.env.example`.

Минимальный набор:

```env
NODE_ENV=development
PORT=3001
CLIENT_ORIGIN=http://localhost:5173
PUBLIC_BASE_URL=http://localhost:3001
DB_HOST=188.225.23.140
DB_PORT=3306
DB_NAME=cz24409_podkrishey
DB_USER=cz24409_podkrishey
DB_PASSWORD=KT4w9tXF
ADMIN_JWT_SECRET=change-this-to-a-long-random-secret
```

3. Применить SQL-схему из `server/sql/schema.mysql57.sql` к MySQL 5.7.

4. Создать администратора в таблице `admins`.
Для этого нужно заранее сгенерировать bcrypt hash пароля и использовать шаблон `server/sql/seed-admin.example.sql`.

5. Запустить backend:

```bash
npm run dev:server
```

6. В отдельном терминале запустить frontend:

```bash
npm run dev
```

## Production / VPS

1. Установить Node.js LTS и MySQL client.
2. Скопировать проект на сервер.
3. Выполнить:

```bash
npm install
npm run build
```

4. Создать production `.env` для backend.
5. Импортировать `server/sql/schema.mysql57.sql` в production-базу.
6. Создать admin-пользователя с bcrypt hash пароля.
7. Запустить backend через PM2 или systemd:

```bash
npm run start
```

8. Раздавать `dist/` через Nginx, а `/api` и `/uploads` проксировать на backend-процесс.

## Безопасность админки

Что уже сделано:
- удалена клиентская проверка пароля
- убран пароль из `VITE_*` переменных
- убран `sessionStorage`-флаг авторизации
- защищены admin API endpoints через middleware `requireAdmin`
- используется `httpOnly` cookie
- включён rate limit для логина
- включён `helmet`
- CRUD админки переведён на серверный API

Что обязательно сделать на VPS:
- использовать HTTPS
- задать длинный `ADMIN_JWT_SECRET`
- ограничить доступ к MySQL по firewall/IP, если возможно
- регулярно менять admin-пароль
- хранить `.env` только на сервере, не в репозитории
