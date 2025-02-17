import { useState, useEffect } from "react";
import { account, ID, databases } from "../lib/appwrite";
import { defaultCards } from "../config/defaultCards";

export const useAuth = () => {
    const [loggedInUser, setLoggedInUser] = useState(null);

    async function init() {
        try {
            const loggedIn = await account.get();
            setLoggedInUser(loggedIn);
        } catch (err) {
            console.log(err);
            // setLoggedInUser(null);
        }
    }

    useEffect(() => {
        init();
    }, []);

    async function login(email, password) {
        await account.createEmailPasswordSession(email, password);
        setLoggedInUser(await account.get());
    }

    async function register(email, password, name) {

        const newId = ID.unique();
        try {
            //create the new account.
            await account.create(
                newId,
                email,
                password,
                name
            );
            //create copies of each 'defaultCard.'
            //no way to insertMany in Appwrite.
            for (let card of defaultCards) {
                await databases.createDocument(
                    import.meta.env.VITE_APPWRITE_DATABASE_ID, // databaseId
                    import.meta.env.VITE_APPWRITE_COLLECTION_CARDS_ID, // collectionId
                    ID.unique(), // documentId
                    {
                        ...card, userId: newId
                    }
                    // permissions (optional)
                );
            }

            return login(email, password);
        } catch (err) {
            console.error(err)
        }
    }

    async function logout() {
        await account.deleteSession("current");
        setLoggedInUser(null);
    }

    return {
        loggedInUser,
        login,
        register,
        logout
    };
}