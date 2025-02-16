import { useState, useEffect } from "react";
import { account, ID } from "./lib/appwrite";

function checkSession(id) {
    const session = localStorage.getItem("cookieFallback");
    if (session) {
        return true;
    } else {
        return false;
    }
}

const App = () => {
    const [loggedInUser, setLoggedInUser] = useState(null);
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [name, setName] = useState("");

    async function init() {
        try {
            const loggedIn = await account.get();
            setLoggedInUser(loggedIn);
        } catch (err) {
            setLoggedInUser(null);
        }
    }

    useEffect(() => {
        init();
    }, []);

    async function login(email, password) {
        await account.createEmailPasswordSession(email, password);
        setLoggedInUser(await account.get());
    }

    return (

        <div>
            <p>
                {loggedInUser
                    ? `Logged in as ${loggedInUser.name}`
                    : "Not logged in"}
            </p>

            <form>
                <input
                    type="email"
                    placeholder="Email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                />
                <input
                    type="password"
                    placeholder="Password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                />
                <input
                    type="text"
                    placeholder="Name"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                />

                <button type="button" onClick={() => login(email, password)}>
                    Login
                </button>

                <button
                    type="button"
                    onClick={async () => {
                        await account.create(
                            ID.unique(),
                            email,
                            password,
                            name
                        );
                        login(email, password);
                    }}
                >
                    Register
                </button>

                <button
                    type="button"
                    onClick={async () => {
                        await account.deleteSession("current");
                        setLoggedInUser(null);
                    }}
                >
                    Logout
                </button>
            </form>
        </div>
    );
};

export default App;
