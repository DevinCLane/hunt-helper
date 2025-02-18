import { Cards } from "./components/Cards";
import { Navbar } from "./components/Navbar";
import { Footer } from "./components/Footer";
import { useAuth } from "./util/useAuth";
import { useCards } from "./util/useCards";
import { AuthModal } from "./components/AuthModal";
import { useState } from "react";

const App = () => {
    const { loggedInUser, login, logout, register } = useAuth();
    const { cards, getCards } = useCards();
    const [showAuthModal, setShowAuthModal] = useState(true);

    if (!loggedInUser) {
        return (
            <AuthModal
                isOpen={showAuthModal}
                onClose={() => setShowAuthModal(false)}
                login={login}
                register={register}
            />
        );
    }

    return (
        <>
            <Navbar
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
