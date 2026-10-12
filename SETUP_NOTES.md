# HelpDesk: setup notes

## 1. Scaffold
```bash
composer create-project laravel/laravel helpdesk && cd helpdesk
composer require laravel/breeze --dev
php artisan breeze:install react      # Inertia + React, Tailwind
```
Copy the generated files over the matching paths (this will replace Breeze's
`routes/web.php`, `HandleInertiaRequests.php`, and `AuthenticatedLayout.jsx`).

## 2. User relationship (app/Models/User.php)
```php
use Illuminate\Database\Eloquent\Relations\HasMany;

public function tickets(): HasMany
{
    return $this->hasMany(Ticket::class);
}
```

## 3. Local database (.env)
```
DB_CONNECTION=mysql
DB_HOST=127.0.0.1
DB_PORT=3306
DB_DATABASE=helpdesk_db
DB_USERNAME=helpdesk_user
DB_PASSWORD=helpdesk_password
```
```bash
docker compose up -d
php artisan key:generate
php artisan migrate
npm install && npm run dev
php artisan serve
```

## 4. Railway (production)
Environment variables: APP_ENV=production, APP_DEBUG=false, APP_KEY (from
`php artisan key:generate --show`), APP_URL=https://<your-app>.up.railway.app,
and the DB_* values from the Railway MySQL plugin (reference variables).
Add to `app/Providers/AppServiceProvider.php` boot():
```php
if (app()->environment('production')) {
    \Illuminate\Support\Facades\URL::forceScheme('https');
}
```
Also set trusted proxies in `bootstrap/app.php`:
`$middleware->trustProxies(at: '*');`
Build: `npm ci && npm run build`. Release/start:
`php artisan migrate --force && php artisan serve --host=0.0.0.0 --port=$PORT`

## 5. Demo account (database/seeders/DatabaseSeeder.php)
```php
User::factory()->create([
    'name' => 'Demo User',
    'email' => 'demo@example.com',
    'password' => 'password',   // hashed by the User model's cast
]);
```
