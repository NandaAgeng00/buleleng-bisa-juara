<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Inertia\Inertia;

class ProfileController extends Controller
{
    public function index() {
        // dd([
        //     'message' => 'Sampai ke controller',
        // ]);
        
        return inertia('Profile');
    }

    public function update(Request $request) {
        dd([
            'message' => 'Sampai ke controller update',
            'data' => $request->all(),
            'gambar' => $request->file('image'),
        ]);
    }
}
