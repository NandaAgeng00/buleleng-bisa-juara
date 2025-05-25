<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;

class DashboardController extends Controller
{
    public function index() {
        // dd(Auth::user()->role->value);
        $user_role = Auth::user()->role->value;
        if ($user_role === 'super-admin') {
            return inertia('dashboard/SuperAdminDashboard');
        } elseif ($user_role === 'admin') {
            return inertia('dashboard/AdminDashboard');
        } elseif ($user_role === 'athlete') {
            return inertia('dashboard/AthleteDashboard');
        } elseif ($user_role === 'coach') {
            return inertia('dashboard/CoachDashboard');
        } elseif ($user_role === 'manager') {
            return inertia('dashboard/ManagerDashboard');
        } elseif ($user_role === 'official') {
            return inertia('ManagerDashboard');
        } else {
            return redirect()->route('home');
        }
    }
}
