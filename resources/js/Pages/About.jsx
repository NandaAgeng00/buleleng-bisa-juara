import AppLayout from "@/Layout/AppLayout";

export default function About() {
    return (
        <AppLayout>
            <div className="flex flex-col items-center justify-center h-screen">
                <h1 className="text-4xl font-bold mb-4">Tentang Kami</h1>
                <p className="text-lg text-center max-w-2xl">
                    Kami adalah tim yang berdedikasi untuk memberikan informasi dan layanan terbaik kepada masyarakat. Dengan pengalaman dan keahlian kami, kami berkomitmen untuk membantu Anda mencapai tujuan Anda.
                </p>
            </div>
        </AppLayout>
    );
}