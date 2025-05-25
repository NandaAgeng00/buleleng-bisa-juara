import AppLayout from "../Layout/AppLayout";

export default function Home({ message }) {
    return (
        <AppLayout>
            <div className="flex flex-col items-center justify-center h-screen">
                <h1 className="text-4xl text-center font-bold mb-4">Selamat Datang di Buleleng Bisa Juara</h1>
                <p className="text-lg text-center max-w-2xl">
                    {message}
                </p>
            </div>
        </AppLayout>
    );
}