import { useState, useEffect } from "react";
import { account, ID } from "./lib/appwrite";
import { Auth } from "./components/Auth";
import { Card } from "./components/Card"
import { useAuth } from "./util/useAuth"
import { useCards } from "./util/useCards";

const App = () => {
    const { loggedInUser, login, logout, register } = useAuth(); //created a custom hook for auth
    const { cards, getCards } = useCards();

    return (
        //consolidate into a login component
        <>
            <Auth loggedInUser={loggedInUser} login={login} logout={logout} register={register} />
            <Card cards={cards} getCards={getCards} loggedInUser={loggedInUser} />
        </>
    )
};

export default App;
