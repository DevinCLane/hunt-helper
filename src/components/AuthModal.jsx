export const AuthModal = ({
    isOpen,
    onClose,
    login,
    register,
    email,
    setEmail,
    password,
    setPassword,
    name,
    setName,
}) => {
    if (!isOpen) return null;
    return (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center">
            <div className="bg-white p-8 rounded-lg">
                <form className="space-y-4">
                    <input
                        type="email"
                        placeholder="Email"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        className="w-full p-2 border rounded"
                    />
                    <input
                        type="password"
                        placeholder="Password"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        className="w-full p-2 border rounded"
                    />
                    <input
                        type="text"
                        placeholder="Name"
                        value={name}
                        onChange={(e) => setName(e.target.value)}
                        className="w-full p-2 border rounded"
                    />
                    <div className="flex gap-2">
                        <button
                            type="button"
                            onClick={() => {
                                login(email, password);
                                onClose();
                            }}
                            className="bg-teal-600 text-white px-4 py-2 rounded"
                        >
                            Login
                        </button>
                        <button
                            type="button"
                            onClick={() => {
                                register(email, password, name);
                                onClose();
                            }}
                            className="bg-gray-200 px-4 py-2 rounded"
                        >
                            Register
                        </button>
                        <button
                            type="button"
                            onClick={onClose}
                            className="bg-gray-200 px-4 py-2 rounded"
                        >
                            Close
                        </button>
                    </div>
                </form>
            </div>
        </div>
    );
};
