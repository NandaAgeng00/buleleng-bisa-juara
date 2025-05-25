import { Link, usePage, useForm } from "@inertiajs/react"
import { Button } from "@/components/ui/button";
import NavLink from "@/components/Navlink";
import { Dialog, DialogContent } from "@/components/ui/dialog";
import { useState, useEffect } from "react";
import LoginForm from "@/components/auth/LoginForm";
import RegisterForm from "@/components/auth/RegisterForm";
import { DialogTitle } from "@radix-ui/react-dialog";
import { Avatar, AvatarImage, AvatarFallback } from "@/components/ui/avatar";

export default function AppLayout({ children }) {
    const page = usePage();
    const { post } = useForm();
    const { auth } = page.props;
    const user = auth?.user;

    useEffect(() => {
        console.log("Page props:", page.props);
    }, [page.props]);

    const [activeModal, setActiveModal] = useState(null);
    const [sideBarOpen, setSideBarOpen] = useState(false);

    function handleLogout() {
        if (user) {
            post('/logout');
        }
    }

    // Handle ESC key untuk menutup sidebar
    useEffect(() => {
        const handleEscKey = (event) => {
            if (event.key === 'Escape' && sideBarOpen) {
                setSideBarOpen(false);
            }
        };

        if (sideBarOpen) {
            document.addEventListener('keydown', handleEscKey);
            // Prevent body scroll when sidebar is open
            document.body.style.overflow = 'hidden';
        } else {
            document.body.style.overflow = 'unset';
        }

        return () => {
            document.removeEventListener('keydown', handleEscKey);
            document.body.style.overflow = 'unset';
        };
    }, [sideBarOpen]);

    function LoginSubmit(e) {
        e.preventDefault();
        // Handle login submission logic here
        console.log("Login submitted");
    }

    const handleSidebarToggle = () => {
        setSideBarOpen(!sideBarOpen);
    };

    const handleBackdropClick = (e) => {
        // Tutup sidebar hanya jika backdrop (area abu-abu) yang diklik
        // e.currentTarget adalah div container utama
        // e.target adalah elemen yang benar-benar diklik
        if (e.target === e.currentTarget) {
            setSideBarOpen(false);
        }
    };

    const handleNavClick = () => {
        // Tutup sidebar ketika nav link diklik
        setSideBarOpen(false);
    };

    const handleAuthClick = (type) => {
        setSideBarOpen(false);
        setActiveModal(type);
    };

    return (
        <>
            <nav className="flex justify-between items-center px-4 py-4 border-b relative z-20">
                {/* Nama Aplikasi */}
                <div className="flex items-center">
                    <h1 className="font-semibold text-xl hidden sm:flex">BULELENG BISA JUARA</h1>
                    <button
                        onClick={handleSidebarToggle}
                        className="sm:hidden p-1 hover:bg-gray-100 rounded transition-colors duration-200"
                        aria-label="Toggle menu"
                        aria-expanded={sideBarOpen}
                    >
                        <svg 
                            xmlns="http://www.w3.org/2000/svg" 
                            width="32" 
                            height="32" 
                            fill="currentColor" 
                            className={`bi bi-list transition-transform duration-300 ${sideBarOpen ? 'rotate-90' : 'rotate-0'}`} 
                            viewBox="0 0 16 16"
                        >
                            <path fillRule="evenodd" d="M2.5 12a.5.5 0 0 1 .5-.5h10a.5.5 0 0 1 0 1H3a.5.5 0 0 1-.5-.5m0-4a.5.5 0 0 1 .5-.5h10a.5.5 0 0 1 0 1H3a.5.5 0 0 1-.5-.5m0-4a.5.5 0 0 1 .5-.5h10a.5.5 0 0 1 0 1H3a.5.5 0 0 1-.5-.5"/>
                        </svg>
                    </button>
                </div>

                {/* Navbar Menu Desktop */}
                <div className="sm:flex space-x-4 font-normal text-lg hidden">
                    <NavLink current={page.url} href={'/'}>Beranda</NavLink>
                    <NavLink current={page.url} href={'/about'}>Tentang Kami</NavLink>
                    <NavLink current={page.url} href={'/contact'}>Hubungi Kami</NavLink>
                </div>

                {/* Login / Register / Profil Desktop */}
                { user ? (
                    <div className="relative">
                        <Avatar className={"w-12 h-12"} onClick={() => console.log("Avatar clicked")}>
                            <AvatarImage></AvatarImage>
                            <AvatarFallback className="bg-gray-200 text-2xl text-gray-600">
                                {user.name.charAt(0).toUpperCase()}
                            </AvatarFallback>
                        </Avatar>
                        <div className="absolute right-0 bg-white shadow-lg rounded-md mt-2 w-52 p-4 text-sm text-gray-700 border">
                            <div className="pb-3 border-b">
                                <h1 className="font-semibold text-base">{user.name}</h1>
                                <p className="text-gray-500">{user.email}</p>
                            </div>
                            <div className="flex flex-col text-md mt-4">
                                <Link href={'/dashboard'} className="hover:bg-gray-200 rounded-md p-2">Dashboard</Link>
                                <Link onClick={() => handleLogout()} className="hover:bg-gray-200 rounded-md p-2">Logout</Link>
                            </div>
                        </div>
                    </div>
                ) : (
                    <div className="flex">
                        <Button 
                            onClick={() => setActiveModal("login")} 
                            className="bg-red-600 hover:bg-red-700 text-white text-lg sm:py-6 py-5 mr-0 sm:mr-4 transition-all duration-200"
                        >
                            Masuk
                        </Button>
                        <Button 
                            onClick={() => setActiveModal("register")} 
                            className="bg-gray-200 hover:bg-gray-300 text-black text-lg py-6 hidden sm:flex transition-all duration-200"
                        >
                            Daftar
                        </Button>     
                    </div>
                ) }
                
            </nav>

            {/* Auth Modals */}
            <Dialog 
                open={activeModal !== null}
                onOpenChange={() => setActiveModal(null)}
            >

                <DialogContent className="sm:max-w-[320px]">
                    <DialogTitle></DialogTitle>
                    {activeModal === "login" && <LoginForm onAuthSuccess={() => setActiveModal(null)}/>}
                    {activeModal === "register" && <RegisterForm onAuthSuccess={() => setActiveModal(null)}/>}
                </DialogContent>
            </Dialog>

            {/* Mobile Sidebar */}
            <div
                className={`fixed top-0 left-0 w-full h-full z-50 sm:hidden transition-all duration-300 ease-in-out ${
                    sideBarOpen 
                        ? "opacity-100 pointer-events-auto" 
                        : "opacity-0 pointer-events-none"
                }`}
                role="dialog"
                aria-modal="true"
                aria-label="Navigation menu"
            >
                {/* Backdrop - Area abu-abu yang bisa diklik untuk menutup */}
                <div 
                    className={`absolute inset-0 bg-black cursor-pointer transition-opacity duration-300 ease-in-out ${
                        sideBarOpen ? "opacity-30" : "opacity-0"
                    }`}
                    onClick={() => setSideBarOpen(false)}
                    aria-label="Close navigation menu"
                /> 
                
                {/* Sidebar Content */}
                <div
                    className={`relative pl-4 pt-8 pb-8 h-full bg-white w-4/5 max-w-sm shadow-2xl transform transition-transform duration-300 ease-in-out ${
                        sideBarOpen ? "translate-x-0" : "-translate-x-full"
                    }`}
                >
                    {/* Header */}
                    <div className="flex items-center justify-between pr-4 mb-8">
                        <h1 className="font-semibold text-xl">BULELENG BISA JUARA</h1>
                        <button
                            onClick={() => setSideBarOpen(false)}
                            className="p-2 hover:bg-gray-100 rounded-full transition-colors duration-200"
                            aria-label="Close menu"
                        >
                            <svg 
                                xmlns="http://www.w3.org/2000/svg" 
                                width="24" 
                                height="24" 
                                fill="currentColor" 
                                viewBox="0 0 16 16"
                            >
                                <path d="M2.146 2.854a.5.5 0 1 1 .708-.708L8 7.293l5.146-5.147a.5.5 0 0 1 .708.708L8.707 8l5.147 5.146a.5.5 0 0 1-.708.708L8 8.707l-5.146 5.147a.5.5 0 0 1-.708-.708L7.293 8z"/>
                            </svg>
                        </button>
                    </div>

                    {/* Navigation Links */}
                    <nav className="font-normal text-lg flex flex-col space-y-4 mb-8">
                        <div onClick={handleNavClick} className="hover:bg-gray-50 rounded-lg transition-colors duration-200">
                            <NavLink current={page.url} href={'/'} className="block py-3 px-2">
                                Beranda
                            </NavLink>
                        </div>
                        <div onClick={handleNavClick} className="hover:bg-gray-50 rounded-lg transition-colors duration-200">
                            <NavLink current={page.url} href={'/about'} className="block py-3 px-2">
                                Tentang Kami
                            </NavLink>
                        </div>
                        <div onClick={handleNavClick} className="hover:bg-gray-50 rounded-lg transition-colors duration-200">
                            <NavLink current={page.url} href={'/contact'} className="block py-3 px-2">
                                Hubungi Kami
                            </NavLink>
                        </div>
                    </nav>

                    {/* Auth Buttons */}
                    <div className="flex flex-col space-y-3 pr-4">
                        <Button
                            onClick={() => handleAuthClick("login")}
                            className="bg-red-600 hover:bg-red-700 text-white text-lg py-6 w-full transition-all duration-200 transform hover:scale-105"
                        >
                            Masuk
                        </Button>
                        <Button
                            onClick={() => handleAuthClick("register")}
                            className="bg-gray-200 hover:bg-gray-300 text-black text-lg py-6 w-full transition-all duration-200 transform hover:scale-105"
                        >
                            Daftar
                        </Button>
                    </div>
                </div>
            </div>

            <main className={sideBarOpen ? "sm:relative" : ""}>
                {children}
            </main>
        </>
    )
}