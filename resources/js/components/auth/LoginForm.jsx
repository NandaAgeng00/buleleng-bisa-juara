import { Input } from "../ui/input";
import { Label } from "../ui/label";
import { Button } from "../ui/button";
import { useEffect } from "react";
import { useForm } from "@inertiajs/react";

export default function LoginForm({ onAuthSuccess, onClose }) {
    const { data, setData, post, processing, errors, reset } = useForm({
        email: '',
        password: ''
    });

    function handleSubmit(e) {
        e.preventDefault();
        console.log("Login form submitted with data:", data);
        
        post('/login', {
            onStart: () => {
                console.log("Login request started");
            },
            onSuccess: (response) => {
                console.log("Login successful!", response);
                reset(); // Reset form
                if (onAuthSuccess) {
                    onAuthSuccess();
                }
            },
            onError: (errors) => {
                console.log("Login failed with errors:", errors);
                // Jangan panggil onAuthSuccess() di sini!
            },
            onFinish: () => {
                console.log("Login request finished");
            },
        });
    }

    // Debug: Log setiap perubahan data
    useEffect(() => {
        console.log("Form data changed:", data);
    }, [data]);

    // Debug: Log errors
    useEffect(() => {
        if (Object.keys(errors).length > 0) {
            console.log("Form errors:", errors);
        }
    }, [errors]);

    return (
        <div className="py-6 px-3">
            <h1 className="text-2xl font-semibold w-full mb-3 text-center">Masuk</h1>
            
            <form onSubmit={handleSubmit}>
                <div className="mb-4">
                    <Label htmlFor="email" className="block mb-2">Email</Label>
                    <Input 
                        id="email"
                        type="email"
                        name="email"
                        placeholder="Email"
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
                        placeholder="Password"
                        value={data.password}
                        className={`w-full ${errors.password ? 'border-red-500' : ''}`}
                        onChange={e => setData('password', e.target.value)}
                        required
                    />
                    {errors.password && (
                        <p className="text-red-500 text-sm mt-1">{errors.password}</p>
                    )}
                </div>

                <Button 
                    className="w-full text-lg" 
                    type="submit"
                    disabled={processing}
                >
                    {processing ? "Loading..." : "Masuk"}
                </Button>
            </form>
        </div>
    );
}