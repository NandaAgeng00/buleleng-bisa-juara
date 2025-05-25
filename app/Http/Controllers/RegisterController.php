<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Hash;
use Illuminate\Support\Facades\Auth;
use Illuminate\Validation\Rules\Enum;
use App\Models\User;
use App\GenderEnum;

class RegisterController extends Controller
{
    public function store(Request $request) {
        $validated = $request->validate([
            'name'     => ['required', 'string', 'max:255', 'regex:/^[A-Za-z\s]+$/'],
            'email'    => ['required', 'email', 'unique:users,email'],
            'password' => ['required', 'string', 'min:8', 'confirmed'],
            'gender'   => ['required', new Enum(GenderEnum::class)],
        ]);

        // Simpan data ke database
        $user = User::create([
            'name'     => $validated['name'],
            'email'    => $validated['email'],
            'password' => Hash::make($validated['password']),
            'gender'   => $validated['gender'],
        ]);

        if ($user) {
            // dd([
            //     'session_before' => session()->getId(),
            //     'auth_before' => Auth::check(),
            //     'user_created' => $user->id,
            // ]);

            // Login user
            Auth::login($user);
            
            // Regenerate session untuk keamanan
            $request->session()->regenerate();
            
            // Debug setelah login
            // dd([
            //     'session_after' => session()->getId(),
            //     'auth_after' => Auth::check(),
            //     'auth_user' => Auth::user(),
            //     'session_data' => session()->all(),
            // ]);
            // dd(Auth::user());
            return redirect()->route('dashboard');
        }

        return redirect()->route('login')->withErrors('Gagal login otomatis.');
    }
}
