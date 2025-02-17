/* eslint-disable react/prop-types */
import { useState, useEffect } from "react";
import { AddCard } from "./CardComponents/AddCard"
import { Card } from "./CardComponents/Card";

import useCards from '../util/useCards'

export const Cards = ({ cards, getCards, loggedInUser }) => {
    useEffect(() => {
        getCards();
    }, [loggedInUser]);

    const { createCard, deleteCard, updateContent } = useCards();

    const [isAddCard, setAddCard] = useState(false)

    function handleAddCard() {
        setAddCard(!isAddCard);
    }

    async function handleCreateCard(content) {
        await createCard(content)
        await getCards();
        setAddCard(false);
    }

    async function handleDeleteCard(cardId) {
        // console.log(cardId)
        await deleteCard(cardId);
        await getCards();
        // setAddCard(false);
    }

    async function handleUpdateContent(cardId, content) {
        console.log("cardId: ", cardId, "content: ", content)
        await updateContent(cardId, content);
        getCards();
    }

    return (
        <section className="pb-36">
            {cards.map((card) => (
                <Card key={card.$id} card={card} handleDeleteCard={handleDeleteCard} handleUpdateContent={handleUpdateContent} />
            ))}
            <div className="w-full my-36 text-center">
                {isAddCard && <AddCard handleCreateCard={handleCreateCard} />}

                <button className="mx-auto h-16 w-36 mt-2" onClick={handleAddCard}> {isAddCard ? 'Cancel' : 'Add Card'} </button>
            </div>
        </section >
    );
};
