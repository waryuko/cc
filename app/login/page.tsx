'use client';
import {FormEventHandler, useState} from "react";
import {getUserIdByEmail, isEmailExist, login} from "@/api";
import {useRouter} from "next/navigation";

function LogIn() {
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const [errors, setErrors] = useState({
        email: "", password: "",
    });
    const rounter = useRouter();

    const emailValidation = async () => {
        // You can add your logic to check if the email exists here
        const emailExists = await isEmailExist(email);
        if (!emailExists) {
            setErrors((prevErrors) => ({
                ...prevErrors, email: "Email does not exists",
            }));
        } else {
            setErrors((prevErrors) => ({...prevErrors, email: ""}));
        }
    };

    const hundleLogin: FormEventHandler<HTMLFormElement> = async (e) => {
        e.preventDefault();
        const loginTest = await login(email, password,);
        if (loginTest) {
            console.log("Login")
            // const userId = await getUserIdByEmail(email)
            // save the user id in the local storage
            try {
                const userId = await getUserIdByEmail(email)
                localStorage.setItem('userID', userId);
            } catch (e) {
                console.log(e)
            }
            rounter.push('/')
        } else {
            setErrors((prevErrors) => ({
                ...prevErrors, password: "Password is incorrect",
            }));
        }
        window.alert("login failed")
        setEmail('')
        setPassword('')
    }



return <div className="relative flex flex-col justify-center h-screen overflow-hidden">
    <div className="w-full p-6 m-auto bg-white rounded-md shadow-md ring-2 ring-gray-800/50 lg:max-w-lg">
        <h1 className="text-3xl font-semibold text-center text-gray-700">Log in </h1>

        <form className="space-y-4" onSubmit={hundleLogin}>
            <div>
                <label className="label">
                    <span className="text-base label-text">Email</span>
                </label>
                <input type="text" placeholder="Email Address" className="w-full input input-bordered" value={email}
                       onChange={(e) => setEmail(e.target.value)} onBlur={emailValidation}/>
            </div>
            <div>
                <label className="label">
                    <span className="text-base label-text">Password</span>
                </label>
                <input type="password" placeholder="Enter Password"
                       className="w-full input input-bordered"
                       value={password}
                       onChange={(e) => setPassword(e.target.value)}
                />
            </div>
            <div className="flex justify-between">
                <a href="/resetpassword" className="text-xs text-gray-600 hover:underline hover:text-blue-600 m">Forget
                    Password?</a>
                {/* eslint-disable-next-line react/no-unescaped-entities */}
                <a href={"/signup"} className="text-xs text-gray-600 hover:underline hover:text-blue-600">Don't have
                    an account?</a>
            </div>
            <div>
                <button className="btn btn-primary w-full submit">Login</button>
            </div>
        </form>
    </div>
</div>
}

export default LogIn;