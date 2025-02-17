import { React, useState, useEffect } from 'react'

export const Card = ({ cards, getCards, loggedInUser }) => {

    useEffect(() => {
        getCards();
    }, [loggedInUser]);

    return (
        <section>

            {cards.map(card => (
                <div key={card.$id}>
                    Content: {card.content}
                    Status: {`${card.status}`}
                </div>
            ))}

        </section>
    )
}
