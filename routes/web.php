<?php

use App\Http\Controllers\DashboardController;
use Illuminate\Support\Facades\Route;
use App\Http\Controllers\HomeController;
use App\Http\Controllers\LoginController;
use App\Http\Controllers\ProfileController;
use App\Http\Controllers\RegisterController;
use Illuminate\Support\Facades\Auth;

Route::get('/', [HomeController::class, 'index'])->name('home');
Route::get('/about', [HomeController::class, 'about'])->name('about');
Route::get('/contact', [HomeController::class, 'contact'])->name('contact');

// Route::get('/login', function () {
//     return abort(404);
// });

Route::get('/me', function () {
    return Auth::user();
});





Route::get('/login', function() {
    abort(404);
});

Route::get('/register', function() {
    abort(404);
});

Route::post('/login', [LoginController::class, 'login'])->name('login');
Route::post('/logout', [LoginController::class, 'logout'])->name('logout');
Route::post('/register', [RegisterController::class, 'store'])->name('register');
Route::get('/dashboard', [DashboardController::class, 'index'])->middleware('auth')->name('dashboard');
Route::get('/profile', [ProfileController::class, 'index'])->middleware('profile')->name('profile');
Route::patch('/profile', [ProfileController::class, 'update'])->name('profile.update');
