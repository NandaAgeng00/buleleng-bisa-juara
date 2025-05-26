import { usePage, router } from "@inertiajs/react"
import AppLayout from "@/Layout/AppLayout";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { Avatar, AvatarImage, AvatarFallback } from "@/components/ui/avatar";
import { ImagePlus } from "lucide-react";
import { Dialog, DialogContent, DialogTitle } from "@/components/ui/dialog";
import { Key, SquarePen } from "lucide-react";
import { useRef, useState } from "react";

export default function Profile() {
    const page = usePage();
    const { auth } = page.props;
    const fileInputRef = useRef(null);
    const [imagePreview, setImagePreview] = useState(null);
    const [isEditProfileOpened, setIsEditProfileOpened] = useState(false);

    // state untuk form edit profile
    const [selectedImage, setSelectedImage] = useState(null);
    const [name, setName] = useState(auth.user.name);
    const [email, setEmail] = useState(auth.user.email);

    const handleSubmit = (e) => {
        e.preventDefault();

        console.log("Name:", name);
        console.log("Email:", email);
        console.log("Selected Image:", selectedImage);

        const formData = new FormData();
        formData.append('name', name);
        formData.append('email', email);
        if (selectedImage) {
            formData.append('image', selectedImage);
        }

        formData.append('_method', 'PATCH');

        router.post('/profile', formData, {
            forceFormData: true,
            onStart: () => {
                console.log("Edit profile request started");
            }, onError: (errors) => {
                console.log("Edit profile failed with errors:", errors);
            }
        });
    }


    function handleAvatarClick() {
        fileInputRef.current.click();
    }

    function handleFileChange(event) {
        const file = event.target.files[0];
        setSelectedImage(file);
        if (file) {
            const reader = new FileReader();
            reader.onloadend = () => {
                setImagePreview(reader.result);
            };
            reader.readAsDataURL(file);
        }
    }

    function handleEditProfileClosed() {
        setIsEditProfileOpened(false);
        setImagePreview(null);
        if (fileInputRef.current) {
            fileInputRef.current.value = "";
        }
    }

    return (
        <AppLayout>
            <div className="container mx-auto md:w-1/2 w-full sm:px-10 px-5 pt-10 border-x h-[100dvh] ">
                <div className="flex flex-col space-x-5 border-b pb-6">
                    <div className="flex space-x-8 items-center ">
                        <div className="flex justify-start">
                            <Avatar className={"md:w-28 md:h-28 w-16 h-16 cursor-pointer select-none"} onClick={() => toggleDropdown()}>
                                <AvatarImage></AvatarImage>
                                <AvatarFallback className="bg-gray-100 text-2xl text-gray-600">
                                    {auth.user.name.charAt(0).toUpperCase()}
                                </AvatarFallback>
                            </Avatar>
                        </div>
                        <div className="flex flex-col w-full justify-start space-y-3">
                            <div>
                                <h1 className="md:text-2xl text-xl text-start font-semibold">{auth.user.name}</h1>
                                <span className="text-lg text-gray-500">{auth.user.email}</span>
                            </div>
                            <Button onClick={() => setIsEditProfileOpened(true)} className={"w-max hidden md:block"}>
                                <SquarePen />
                            </Button>
                        </div>
                    </div>
                    <div>
                        <Button onClick={() => setIsEditProfileOpened(true)} className={"text-sm w-full md:hidden block mt-5"}>
                            Edit Profil 
                        </Button>
                    </div>
                </div>
                <div className="py-5 grid grid-cols-1 gap-4 border-b">
                    <div className="flex items-center space-x-2">
                        <Key className="text-black" />
                        <Label className="text-lg font-bold">Perbarui Pasword</Label>
                    </div>
                    <div>
                        <Label className="text-md mb-2">Password saat ini</Label>
                        < Input type="password" placeholder="Masukkan password saat ini" />
                    </div>
                    <div>
                        <Label className="text-md mb-2">Password baru</Label>
                        < Input type="password" placeholder="Masukkan password baru" />
                    </div>
                    <div>
                        <Label className="text-md mb-2">Konfirmasi password</Label>
                        < Input type="password" placeholder="Konfirmasi password baru" />
                    </div>
                    <div className="flex justify-end pt-4">
                        <Button className={"w-28 text-md"}>Perbarui</Button>
                    </div>
                </div>
            </div>

            <Dialog
                open={isEditProfileOpened}
                onOpenChange={() => handleEditProfileClosed()}
            >
                    <DialogContent className={"md:w-[380px] sm:rounded-lg"}>
                        <DialogTitle className={"text-xl font-bold mb-8 text-center"}>Edit Profil</DialogTitle>
                        <div className="w-full flex flex-col pb-8 items-center justify-center">
                            <form onSubmit={handleSubmit} className="w-full flex flex-col items-center justify-center px-6">
                                <div className="w-full flex justify-center mb-4">
                                    <Avatar
                                        className="md:w-28 md:h-28 w-24 h-24 cursor-pointer select-none"
                                        onClick={handleAvatarClick}
                                    >
                                        {imagePreview ? (
                                            <AvatarImage className={"object-cover"} src={imagePreview} alt="Profile" />
                                        ) : (
                                            <AvatarFallback className="bg-gray-100 text-2xl text-gray-600">
                                                <ImagePlus />
                                            </AvatarFallback>
                                        )}
                                    </Avatar>
                                </div>
                                <div className="w-full flex flex-col mb-8 space-y-4">
                                    <div>
                                        <Label className="text-md mb-2">Nama</Label>
                                        <Input type="text" placeholder="Masukkan nama lengkap" value={name} onChange={(e) => setName(e.target.value)} />
                                    </div>
                                    <div>
                                        <Label className="text-md mb-2">Email</Label>
                                        <Input type="email" placeholder="Masukkan email" value={email} onChange={(e) => setEmail(e.target.value)} />
                                    </div>
                                </div>
                                <input type="file" accept="image/*" onChange={handleFileChange} className="hidden" ref={fileInputRef} />
                                <Button type="submit" className="mt-6 w-full">Perbarui</Button>
                            </form>
                        </div>
                    </DialogContent>
            </Dialog>
        </AppLayout>
    )
}