import React from 'react'
import { useState } from "react";
import { account, ID } from "../lib/appwrite";

export const Auth = ({ loggedInUser, login, logout, register }) => {
    // const [loggedInUser, setLoggedInUser] = useState(null);
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [name, setName] = useState("");

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
                    onClick={() => register(email, password, name)}
                >
                    Register
                </button>

                <button
                    type="button"
                    onClick={logout}
                >
                    Logout
                </button>
            </form>
        </div>
    )
}