import { useState } from "react";
import { account, databases, ID, Query } from "../lib/appwrite";

export const useCards = () => {
    const [cards, setCards] = useState([]);

    async function getCards() {
        try {
            const currentUser = await account.get();
            const currentUserId = currentUser.$id;

            const result = await databases.listDocuments(
                import.meta.env.VITE_APPWRITE_DATABASE_ID, // databaseId
                import.meta.env.VITE_APPWRITE_COLLECTION_CARDS_ID, // collectionId
                [Query.equal("userId", [currentUserId])] // queries (optional)
            );

            setCards(result.documents);
        } catch (error) {
            console.error(error);
            setCards([]);
        }
    }

    async function createCard({ content, isComplete }) {
        try {
            const currentUser = await account.get();

            const newCard = await databases.createDocument(
                import.meta.env.VITE_APPWRITE_DATABASE_ID, // databaseId
                import.meta.env.VITE_APPWRITE_COLLECTION_CARDS_ID, // collectionId
                ID.unique(),
                {
                    content: content,
                    isComplete: isComplete,
                    userId: currentUser.$id,
                }
            );

            setCards((prevCards) => [...prevCards, newCard]);
            return newCard;
        } catch (error) {
            console.error("error creating card:", error);
            throw error;
        }
    }

    async function updateContent(cardId, newContent) {
        try {
            const updatedCard = await databases.updateDocument(
                import.meta.env.VITE_APPWRITE_DATABASE_ID, // databaseId
                import.meta.env.VITE_APPWRITE_COLLECTION_CARDS_ID, // collectionId
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

    async function updateIsComplete() {}

    async function deleteCard() {}

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
