import React, { useState } from "react";
import toast from "react-hot-toast";
import { Link, useNavigate } from "react-router-dom";
import api from "../utils/axios"; // Your axios instance with baseURL and credentials
import { useDispatch } from "react-redux";
import { login } from "../components/redux/authSlice";

const Login = () => {
    const [email, setEmail] = useState("");
    const dispatch = useDispatch();
    const [password, setPassword] = useState("");
    const [loading, setLoading] = useState(false);
    const navigate = useNavigate();

    const handleSubmit = async (e) => {
        e.preventDefault();
        setLoading(true);

        if (!email || !password) {
            toast.error("Please fill all fields");
            setLoading(false);
            return;
        }

        try {
            const res = await api.post("/auth/login", { email, password });
            toast.success("Login successful!");
            dispatch(login(res.data.user));
            navigate("/menu");

        } catch (err) {
            toast.error(err.response?.data?.error || "Login failed");
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="min-h-screen flex items-center justify-center bg-yellow-50 px-4">
            <form
                onSubmit={handleSubmit}
                className="bg-white shadow-lg rounded-lg p-8 max-w-md w-full"
            >
                <h1 className="text-3xl font-bold text-yellow-600 mb-6 text-center">
                    Login
                </h1>

                <label className="block mb-2 font-semibold text-gray-700" htmlFor="email">
                    Email
                </label>
                <input
                    id="email"
                    type="email"
                    placeholder="you@example.com"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    className="w-full p-3 border border-yellow-300 rounded-md focus:outline-none focus:ring-2 focus:ring-yellow-400 mb-4"
                    required
                />

                <label className="block mb-2 font-semibold text-gray-700" htmlFor="password">
                    Password
                </label>
                <input
                    id="password"
                    type="password"
                    placeholder="Your password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    className="w-full p-3 border border-yellow-300 rounded-md focus:outline-none focus:ring-2 focus:ring-yellow-400 mb-6"
                    required
                />

                <button
                    type="submit"
                    disabled={loading}
                    className={`w-full py-3 rounded-md text-white font-bold ${loading ? "bg-yellow-300 cursor-not-allowed" : "bg-yellow-500 hover:bg-yellow-600"
                        } transition-colors`}
                >
                    {loading ? "Logging in..." : "Login"}
                </button>
                <div className="text-center mt-4">
                    <p className="text-gray-600">Don't have an account?
                        <Link to="/register" className="text-indigo-600 font-semibold hover:underline"> Sign Up</Link>
                    </p>
                </div>
            </form>
        </div>
    );
};

export default Login;