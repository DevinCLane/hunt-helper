import { useState } from "react";
import { account, databases, ID, Query } from "../lib/appwrite";

const DATABASE_ID = import.meta.env.VITE_APPWRITE_DATABASE_ID;
const COLLECTION_CARDS_ID = import.meta.env.VITE_APPWRITE_COLLECTION_CARDS_ID;

export const useCards = () => {
    const [cards, setCards] = useState([]);

    const getCurrentUser = async () => {
        const user = await account.get();
        return user;
    };

    async function getCards() {
        try {
            const currentUser = await getCurrentUser();
            const result = await databases.listDocuments(
                DATABASE_ID,
                COLLECTION_CARDS_ID,
                [Query.equal("userId", [currentUser.$id])] // queries (optional)
            );

            setCards(result.documents);
        } catch (error) {
            console.error(error);
            setCards([]);
        }
    }

    async function createCard(content, isComplete = false) {
        console.log(cards)
        try {
            const currentUser = await getCurrentUser();

            const newCard = await databases.createDocument(
                DATABASE_ID,
                COLLECTION_CARDS_ID,
                ID.unique(),
                {
                    content,
                    isComplete,
                    userId: currentUser.$id,
                }
            );

            setCards((prevCards) => [...prevCards, newCard]);
            console.log(cards)
            return newCard;
        } catch (error) {
            console.error("error creating card:", error);
            throw error;
        }
    }

    async function updateContent(cardId, newContent) {
        try {
            const updatedCard = await databases.updateDocument(
                DATABASE_ID,
                COLLECTION_CARDS_ID,
                cardId,
                {
                    content: newContent,
                }
            );

            setCards((prevCards) =>
                prevCards.map((card) =>
                    card.$id === cardId ? updatedCard : card
                )
            );
            return updatedCard;
        } catch (error) {
            console.error("error updating card content:", error);
            throw error;
        }
    }

    async function updateIsComplete(cardId, isComplete) {
        try {
            const updatedCard = await databases.updateDocument(
                DATABASE_ID,
                COLLECTION_CARDS_ID,
                cardId,
                { isComplete }
            );

            setCards((prevCards) =>
                prevCards.map((card) =>
                    card.$id === cardId ? updatedCard : card
                )
            );
            return updatedCard;
        } catch (error) {
            console.error("error updating card content:", error);
            throw error;
        }
    }

    async function deleteCard(cardId) {
        try {
            await databases.deleteDocument(
                DATABASE_ID,
                COLLECTION_CARDS_ID,
                cardId
            );

            setCards((prevCards) =>
                prevCards.filter((card) => card.$id !== card)
            );
            return true;
        } catch (error) {
            console.error("error deleting card:", error);
            throw error;
        }
    }

    //TODO: updateCards (status), updateCard(content), deleteCard, createCard
    return {
        cards,
        getCards,
        createCard,
        updateContent,
        updateIsComplete,
        deleteCard,
    };
};

export default useCards;