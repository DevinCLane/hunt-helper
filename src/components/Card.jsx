/* eslint-disable react/prop-types */
import { useEffect } from "react";

export const Card = ({ cards, getCards, loggedInUser }) => {
    useEffect(() => {
        getCards();
    }, [loggedInUser, getCards]);

    return (
        <section>
            {cards.map((card) => (
                <div key={card.$id}>
                    Content: {card.content}
                    isComplete: {`${card.isComplete}`}
                </div>
            ))}
        </section>
    );
};
