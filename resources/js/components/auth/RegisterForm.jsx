import { Label } from "../ui/label";
import { Input } from "../ui/input";
import { Button } from "../ui/button";
import { useForm } from "@inertiajs/react";
import { useState } from "react";

export default function RegisterForm({ onAuthSuccess }) {
    const { data, setData, post, processing, reset, errors } = useForm({
        name: '',
        email: '',
        password: '',
        password_confirmation: '',
        gender: '',
    });

    const [selectedGender, setSelectedGender] = useState(null);

    function setGender(gender) {
        setSelectedGender(gender);
        setData('gender', gender);
    }

    function handleSubmit(e) {
        e.preventDefault();
        post('/register', {
            onStart: () => {
                console.log("Registration request started");
            },
            onSuccess: (response) => {
                console.log("Registration successful!", response);
                reset(); // Reset form data
                if (onAuthSuccess) {
                    onAuthSuccess(); // Call the success callback
                }
                // Reset form data after successful registration
            }, onError: (errors) => {
                console.log("Registration failed with errors:", errors);
            },
        })
    }
    
    return (
        <div>
            <h1 className="text-2xl font-semibold w-full mb-3 text-center">Daftar</h1>
            <form onSubmit={handleSubmit}>
                <div className="mb-4">
                    <Label htmlFor="name" className="block mb-2">Nama Lengkap</Label>
                    <Input 
                        id="name"
                        type="text"
                        name="name"
                        placeholder="Masukkan Nama Lengkap"
                        value={data.name}
                        className={`w-full ${errors.name ? 'border-red-500' : ''}`}
                        onChange={e => setData('name', e.target.value)}
                        required
                    />
                    {errors.email && (
                        <p className="text-red-500 text-sm mt-1">{errors.email}</p>
                    )}
                </div>
                <div className="mb-4">
                    <Label htmlFor="email" className="block mb-2">Email</Label>
                    <Input 
                        id="email"
                        type="email"
                        name="email"
                        placeholder="Masukkan Email"
                        value={data.email}
                        className={`w-full ${errors.email ? 'border-red-500' : ''}`}
                        onChange={e => setData('email', e.target.value)}
                        required
                    />
                    {errors.email && (
                        <p className="text-red-500 text-sm mt-1">{errors.email}</p>
                    )}
                </div>

                <div className="mb-6">
                    <Label htmlFor="password" className="block mb-2">Password</Label>
                    <Input 
                        id="password"
                        type="password"
                        name="password"
                        placeholder="Masukkan Password"
                        value={data.password}
                        className={`w-full ${errors.password ? 'border-red-500' : ''}`}
                        onChange={e => setData('password', e.target.value)}
                        required
                    />
                    {errors.password && (
                        <p className="text-red-500 text-sm mt-1">{errors.password}</p>
                    )}
                </div>

                <div className="mb-6">
                    <Label htmlFor="password_confirmation" className="block mb-2">Konfirmasi Password</Label>
                    <Input 
                        id="password_confirmation"
                        type="password"
                        name="password_confirmation"
                        placeholder="Ulangi Password"
                        value={data.password_confirmation}
                        className={`w-full ${errors.password_confirmation ? 'border-red-500' : ''}`}
                        onChange={e => setData('password_confirmation', e.target.value)}
                        required
                    />
                    {errors.password && (
                        <p className="text-red-500 text-sm mt-1">{errors.password}</p>
                    )}
                </div>
                
                <span className="block mb-2 text-sm">Jenis Kelamin</span>
                <div className="grid grid-cols-2 gap-4 mb-6">
                    <Button 
                        type="button"
                        className={`cursor-pointer ${selectedGender === "male" ? "bg-red-700 text-white hover:bg-red-700 hover:text-white" : "bg-gray-200 text-gray-700 hover:bg-red-400 hover:text-white"}`}
                        onClick={() => setGender("male")}
                    >
                        Laki-Laki
                    </Button>
                    <Button 
                        type="button"
                        className={`cursor-pointer ${selectedGender === "female" ? "bg-red-700 text-white hover:bg-red-700 hover:text-white" : "bg-gray-200 text-gray-700 hover:bg-red-400 hover:text-white"}`}
                        onClick={() => setGender("female")}
                    >
                        Perempuan
                    </Button>
                </div>

                <Button 
                    className="w-full text-lg" 
                    type="submit"
                    disabled={processing}
                >
                    {processing ? "Loading..." : "Daftar"}
                </Button>
            </form>
        </div>
    );
}