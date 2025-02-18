import { useState, useEffect } from "react";

// todo:
// fix contrast on button: change text color
// when logout, view the modal again
//

export const AuthModal = ({ isOpen, onClose, login, register }) => {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [name, setName] = useState("");
    const [isRegistering, setIsRegistering] = useState(false);

    useEffect(() => {
        if (isOpen) {
            setEmail("");
            setPassword("");
            setName("");
        }
    }, [isOpen]);

    const handleSubmit = async (e) => {
        e.preventDefault();
        if (isRegistering) {
            await register(email, password, name);
        } else {
            await login(email, password);
        }
        onClose();
    };

    if (!isOpen) return null;
    return (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center">
            <div className="bg-white p-8 rounded-lg">
                <h2 className="text-2xl font-bold mb-6 text-center text-teal-600">
                    {isRegistering
                        ? "Register for Hunt Helper"
                        : "Welcome back, log in"}
                </h2>
                <form onSubmit={handleSubmit} className="space-y-4">
                    <input
                        type="email"
                        placeholder="Email"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        className="w-full p-2 border rounded text-gray-900"
                    />
                    <input
                        type="password"
                        placeholder="Password"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        className="w-full p-2 border rounded text-gray-900"
                    />
                    {isRegistering && (
                        <input
                            type="text"
                            placeholder="Name"
                            value={name}
                            onChange={(e) => setName(e.target.value)}
                            className="w-full p-2 border rounded text-gray-900"
                        />
                    )}
                    <button
                        type="submit"
                        className="w-full bg-blue-500 text-white p-2 rounded"
                    >
                        {isRegistering ? "Register" : "Login"}
                    </button>
                </form>
                <button
                    onClick={() => setIsRegistering(!isRegistering)}
                    className="mt-4 text-blue-500"
                >
                    {isRegistering
                        ? "Already have an account? Login"
                        : "Need an account? Register"}
                </button>
            </div>
        </div>
    );
};
