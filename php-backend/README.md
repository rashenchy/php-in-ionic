PHP backend for Ionic login/register demo

Files:
- dbconfig.php — DB connection; update host/user/pass/name as needed.
- register.php — POST JSON { username, password } to register.
- login.php — POST JSON { username, password } to login.
- create_db.sql — SQL to create the database and users table.

Deployment (XAMPP):
1. Copy the `php-backend` folder into your XAMPP `htdocs` folder (e.g., `C:\xampp\htdocs\php-backend`).
2. Open `create_db.sql` in phpMyAdmin or run it in the MySQL CLI to create the `ionic_auth_db` database and `users` table.
3. If your MySQL root user requires a password, edit `dbconfig.php` and set `DB_PASS` accordingly.
4. Start Apache and MySQL from the XAMPP control panel.

API Endpoints (assumes `http://localhost/php-backend/`):
- POST http://localhost/php-backend/register.php
  Body: JSON { "username": "alice", "password": "secret" }

- POST http://localhost/php-backend/login.php
  Body: JSON { "username": "alice", "password": "secret" }

Test with curl:
curl -X POST http://localhost/php-backend/register.php -H "Content-Type: application/json" -d '{"username":"alice","password":"secret"}'

Security note: This demo stores hashed passwords but is not production-ready. Use HTTPS and further security controls for real apps.
