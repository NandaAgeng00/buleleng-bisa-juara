import DashboardLayout from "@/Layout/DashboardLayout";

export default function CoachDashboard() {
    return (
        <DashboardLayout>
            <div className="flex flex-col items-center justify-center h-screen">
                <h1 className="text-4xl text-center font-bold mb-4">Coach Dashboard</h1>
                <p className="text-lg text-center max-w-2xl">
                    Selamat datang di dashboard Anda. Di sini Anda dapat mengelola semua informasi dan layanan yang tersedia.
                </p>
            </div>
        </DashboardLayout>
    );
}