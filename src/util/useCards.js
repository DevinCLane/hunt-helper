import { useState, useEffect } from "react";
import { account, databases, Query } from "../lib/appwrite";

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

            setCards(result.documents)
        } catch (error) {
            console.error(error)
            setCards([])
        }
    }

    async function createCard() {

    }

    async function updateContent() {

    }

    async function updateIsComplete() {

    }

    async function deleteCard() {

    }

    //TODO: updateCards (status), updateCard(content), deleteCard, createCard
    return {
        cards,
        getCards,
    };
}