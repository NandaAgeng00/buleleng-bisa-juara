import DashboardLayout from "@/Layout/DashboardLayout";
import AppLayout from "@/Layout/AppLayout";

export default function AdminDashboard() {
    return (
        <AppLayout>
            <div className="flex flex-col items-center justify-center h-screen">
                <h1 className="text-4xl text-center font-bold mb-4">Admin Dashboard</h1>
                <p className="text-lg text-center max-w-2xl">
                    Selamat datang di dashboard Anda. Di sini Anda dapat mengelola semua informasi dan layanan yang tersedia.
                </p>
            </div>
        </AppLayout>
    );
}