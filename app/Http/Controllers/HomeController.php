<?php

namespace App\Http\Controllers;
use Illuminate\Support\Facades\Auth;
use Illuminate\Http\Request;

class HomeController extends Controller
{
    public function index() {
        return inertia('Home', [
            'message' => 'Koni Kabupaten Buleleng',
        ]);
    }

    public function about() {
        return inertia('About');
    }

    public function contact() {
        return inertia('Contact');
    }
}
