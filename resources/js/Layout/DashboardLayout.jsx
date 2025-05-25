import { usePage } from "@inertiajs/react"
import { Avatar, AvatarImage, AvatarFallback } from "@/components/ui/avatar";

export default function DashboardLayout({ children }) {
    const page = usePage();
    const { auth } = page.props;
    const user = auth?.user;

    return (
        <>
            <nav className="flex justify-between items-center px-4 py-4 border-b relative z-20">
                {/* Nama Aplikasi */}
                <div className="flex items-center">
                    <h1 className="font-semibold text-xl hidden sm:flex">BULELENG BISA JUARA</h1>
                </div>

                {/* Login / Register / Profil Desktop */}
                <div>
                    <Avatar className={"w-12 h-12 cursor-pointer"} onClick={() => console.log("Avatar clicked")}>
                        <AvatarImage></AvatarImage>
                        <AvatarFallback className="bg-gray-200 text-2xl text-gray-600">
                            {user.name.charAt(0).toUpperCase()}
                        </AvatarFallback>
                    </Avatar>
                </div>
            </nav>

            <main>
                {children}
            </main>
        </>
    )
}