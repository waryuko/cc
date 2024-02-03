'use client';
import {useState} from "react";
import {createUser, isEmailExist} from "@/api";
import {useRouter} from "next/navigation";

interface signUpProps {
    username: string;
    email: string;
    password: string;
    confirmPassword: string;

}

// ... (import statements and interfaces remain unchanged)

function SignUp() {
    const router = useRouter();
    const [signUp, setSignUp] = useState<signUpProps>({
        username: "", email: "", password: "", confirmPassword: "",
    });

    const [errors, setErrors] = useState({
        email: "", password: "", confirmPassword: "",
    });

    const validateEmail = async () => {
        // You can add your logic to check if the email exists here
        const emailExists = await isEmailExist(signUp.email);
        if (emailExists) {
            setErrors((prevErrors) => ({
                ...prevErrors, email: "Email already exists",
            }));
        } else {
            setErrors((prevErrors) => ({...prevErrors, email: ""}));
        }
    };

    const validatePassword = () => {
        if (signUp.password.length < 8) {
            setErrors((prevErrors) => ({
                ...prevErrors, password: "Password must be at least 8 characters",
            }));
        } else {
            setErrors((prevErrors) => ({...prevErrors, password: ""}));
        }
    };

    const validateConfirmPassword = () => {
        if (signUp.password !== signUp.confirmPassword) {
            setErrors((prevErrors) => ({
                ...prevErrors, confirmPassword: "Passwords do not match",
            }));
        } else {
            setErrors((prevErrors) => ({...prevErrors, confirmPassword: ""}));
        }
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        // Perform your submission logic here, only if there are no errors
        if (!errors.email && !errors.password && !errors.confirmPassword) {
            // Your submission logic here
            const userID = await createUser(signUp.email, "", signUp.password);
            localStorage.setItem('userID', userID);
            router.push("/");
            console.log("User created successfully");

        } else {
            console.log("Form has errors. Please fix them.");
        }
    };

    return (<div className="relative flex flex-col justify-center h-screen overflow-hidden">
            <div className="w-full p-6 m-auto bg-white rounded-md shadow-md ring-2 ring-gray-800/50 lg:max-w-lg">
                <h1 className="text-3xl font-semibold text-center text-gray-700">Sign up</h1>

                <form className="space-y-4" onSubmit={handleSubmit}>
                    {/* ... (other form elements remain unchanged) */}
                    <div>
                        <label className="label">
                            <span className="text-base label-text">Email</span>
                        </label>
                        <input
                            type="text"
                            placeholder="Email Address"
                            className={`w-full input input-bordered ${errors.email ? "input-error" : ""}`}
                            onBlur={validateEmail}
                            onChange={(e) => setSignUp((prev) => ({...prev, email: e.target.value}))}
                        />
                        {errors.email && (<p className="text-xs text-red-500">{errors.email}</p>)}
                    </div>
                    <div>
                        <label className="label">
                            <span className="text-base label-text">Password</span>
                        </label>
                        <input
                            type="password"
                            placeholder="Enter Password"
                            className={`w-full input input-bordered ${errors.password ? "input-error" : ""}`}
                            onBlur={validatePassword}
                            onChange={(e) => setSignUp((prev) => ({...prev, password: e.target.value}))}
                        />
                        {errors.password && (<p className="text-xs text-red-500">{errors.password}</p>)}
                    </div>
                    <div>
                        <label className="label">
                            <span className="text-base label-text">Confirm Password</span>
                        </label>
                        <input
                            type="password"
                            placeholder="Enter Password"
                            className={`w-full input input-bordered ${errors.confirmPassword ? "input-error" : ""}`}
                            onBlur={validateConfirmPassword}
                            onChange={(e) => setSignUp((prev) => ({
                                ...prev, confirmPassword: e.target.value,
                            }))}
                        />
                        {errors.confirmPassword && (<p className="text-xs text-red-500">
                                {errors.confirmPassword}
                            </p>)}
                    </div>

                    {/* ... (other form elements remain unchanged) */}

                    <a
                        href={"/login"}
                        className="text-xs text-gray-600 hover:underline hover:text-blue-600"
                    >
                        Already have an account?
                    </a>
                    <div>
                        <button className="btn btn-primary w-full">Sign Up</button>
                    </div>
                </form>
            </div>
        </div>);
}

export default SignUp;
