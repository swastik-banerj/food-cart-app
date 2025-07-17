import { useContext, useState } from "react";
import { cartContext } from "../App";
import axios from "axios";
import toast from "react-hot-toast";
import { useNavigate } from "react-router";

const SignUp = () => {

    const navigate = useNavigate();

    const { signupState, setSignupState, setSignupPop, userState, setUserState} = useContext(cartContext);

    axios.defaults.baseURL = 'http://localhost:5000';

    const [formData, setFormData] = useState({
        fullName: "",
        email: "",
        password: "",
        confirmPassword: ""
    });

    const handleChange = (e) => {
        setFormData({
            ...formData,
            [e.target.name]: e.target.value
        });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        // Validation

        if (!formData.email || !formData.password || (signupState && (!formData.fullName || !formData.confirmPassword))) {
            toast.error("Please fill all required fields");
            return;
        }

        if (signupState && formData.password !== formData.confirmPassword) {
            toast.error("Passwords do not match");
            return;
        }

        try {

            const endpoint = signupState ? "/api/auth/signup" : "/api/auth/signin";
            const payload = signupState
                ? {
                    fullName: formData.fullName,
                    email: formData.email,
                    password: formData.password,
                    confirmPassword: formData.confirmPassword
                }
                : {
                    email: formData.email,
                    password: formData.password,
                };

            const { data } = await axios.post(endpoint, payload, {
                headers: {
                    "Content-Type": "application/json"
                }
            });

            if (data.success) {
                localStorage.setItem("token", data.token);
                toast.success(signupState ? "Sign Up Successful" : "Sign In Successful");
                setSignupPop(false);
                setSignupState(false);
                setUserState(data.userData);
                navigate("/cart");
                return;
            } else {
                toast.error(data.message || "Something went wrong");
                return;
            }

        } catch (error) {
            toast.error(error.response?.data?.message || "Server error");
        }

    };




    return (
        <div className="fixed inset-0 z-50 flex justify-center items-center  bg-opacity-40 backdrop-blur-sm">
            <div className="bg-white w-[90vw] max-w-md p-6 rounded shadow-md relative">
                <button
                    onClick={() => setSignupPop(false)}
                    className="absolute right-3 top-3 text-gray-500 hover:text-black"
                >
                    ✕
                </button>
                <h2 className="text-2xl font-semibold mb-4 text-center">
                    {signupState ? "Sign Up" : "Sign In"}
                </h2>

                <form onSubmit={handleSubmit} className="flex flex-col gap-3">
                    {signupState && (
                        <input
                            type="text"
                            name="fullName"
                            placeholder="Full Name"
                            value={formData.fullName}
                            onChange={handleChange}
                            required
                            className="input"
                        />
                    )}

                    <input
                        type="email"
                        name="email"
                        placeholder="Email"
                        value={formData.email}
                        onChange={handleChange}
                        required
                        className="input"
                    />

                    <input
                        type="password"
                        name="password"
                        placeholder="Password"
                        value={formData.password}
                        onChange={handleChange}
                        required
                        className="input"
                    />

                    {signupState && (
                        <input
                            type="password"
                            name="confirmPassword"
                            placeholder="Confirm Password"
                            value={formData.confirmPassword}
                            onChange={handleChange}
                            required
                            className="input"
                        />
                    )}

                    <button type="submit" className="bg-amber-500 text-white py-2 rounded hover:bg-amber-600">
                        {signupState ? "Sign Up" : "Sign In"}
                    </button>
                </form>

                <p className="mt-4 text-center text-sm">
                    {signupState ? "Already have an account?" : "Don't have an account?"}{" "}
                    <span
                        onClick={() => setSignupState(!signupState)}
                        className="text-amber-600 font-semibold cursor-pointer"
                    >
                        {signupState ? "Sign In" : "Sign Up"}
                    </span>
                </p>
            </div>
        </div>
    )
}

export default SignUp;
