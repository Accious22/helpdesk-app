<?php

use App\Http\Controllers\ProfileController;
use App\Http\Controllers\TicketController;
use Illuminate\Support\Facades\Route;
use Inertia\Inertia;

Route::get('/', fn () => redirect()->route('login'));

Route::middleware(['auth', 'verified'])->group(function () {
    Route::get('/dashboard', function () {
        $tickets = request()->user()->tickets();

        return Inertia::render('Dashboard', [
            'counts' => [
                'total'    => (clone $tickets)->count(),
                'open'     => (clone $tickets)->where('status', 'Open')->count(),
                'progress' => (clone $tickets)->where('status', 'In Progress')->count(),
                'resolved' => (clone $tickets)->where('status', 'Resolved')->count(),
            ],
        ]);
    })->name('dashboard');

    Route::resource('tickets', TicketController::class);
});

Route::middleware('auth')->group(function () {
    Route::get('/profile', [ProfileController::class, 'edit'])->name('profile.edit');
    Route::patch('/profile', [ProfileController::class, 'update'])->name('profile.update');
    Route::delete('/profile', [ProfileController::class, 'destroy'])->name('profile.destroy');
});

require __DIR__ . '/auth.php';
