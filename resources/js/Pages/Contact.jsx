import AppLayout from "@/Layout/AppLayout";

export default function Contact() {
    return (
        <AppLayout>
            <div className="flex flex-col items-center justify-center h-screen">
                <h1 className="text-4xl font-bold mb-4">Hubungi Kami</h1>
                <p className="text-lg text-center max-w-2xl">
                    Jika Anda memiliki pertanyaan atau ingin berkolaborasi, silakan hubungi kami melalui email di <a href="mailto:tj4Dm@example.com" className="text-blue-500">tj4Dm@example.com</a> atau telepon di <a href="tel:+1234567890" className="text-blue-500">+1234567890</a>.
                </p>
            </div>
        </AppLayout>
    );
}