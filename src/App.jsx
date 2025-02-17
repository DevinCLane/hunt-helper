import { Auth } from "./components/Auth";
import { Cards } from "./components/Cards";
import { Navbar } from "./components/Navbar"
import { Footer } from "./components/Footer"
import { useAuth } from "./util/useAuth";
import { useCards } from "./util/useCards";
import { useState } from "react";
const App = () => {
    const { loggedInUser, login, logout, register } = useAuth(); //created a custom hook for auth
    const { cards, getCards } = useCards();

    console.log("The current cards are:", cards)

    return (
        //consolidate into a login component
        <>
            <Navbar loggedInUser={loggedInUser} />
            <Auth
                loggedInUser={loggedInUser}
                login={login}
                logout={logout}
                register={register}
            />
            <Cards
                cards={cards}
                getCards={getCards}
                loggedInUser={loggedInUser}
            />

            <Footer />
        </>
    );
};

export default App;
