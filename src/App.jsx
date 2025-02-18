import { Cards } from "./components/Cards";
import { Navbar } from "./components/Navbar";
import { Footer } from "./components/Footer";
import { useAuth } from "./util/useAuth";
import { useCards } from "./util/useCards";
import { AuthModal } from "./components/AuthModal";
import { useState, useEffect } from "react";

const App = () => {
    const { loggedInUser, login, logout, register } = useAuth();
    const { cards, getCards } = useCards();
    const [showAuthModal, setShowAuthModal] = useState(false);

    useEffect(() => {
        setShowAuthModal(!loggedInUser);
    }, [loggedInUser]);

    const handleLogout = () => {
        logout();
        setShowAuthModal(true);
    };

    return (
        <>
            {loggedInUser && !showAuthModal ? (
                <>
                    <Navbar
                        loggedInUser={loggedInUser}
                        login={login}
                        logout={handleLogout}
                        register={register}
                    />
                    <Cards
                        cards={cards}
                        getCards={getCards}
                        loggedInUser={loggedInUser}
                    />
                    <Footer />
                </>
            ) : (
                <AuthModal
                    isOpen={true}
                    onClose={() => setShowAuthModal(false)}
                    login={login}
                    register={register}
                />
            )}
        </>
    );
};

export default App;
