import { createContext, useContext } from "react";
import { setDoc, doc, deleteDoc, getDocs, collection } from "firebase/firestore";
import { db } from "../services/firebase";

const WatchlistContext = createContext(null);

export const WatchlistContextProvider = ({ children }) => {

    const addToWatchlist = async (userId, item, type) => {
        const docId = `${type}-${item.id}`;
        try {
            const watchlistRef = doc(db, "users", userId, "watchlist", docId);
            await setDoc(watchlistRef, {
                id: item.id,
                title: item.title || item.name,
                overview: item.overview,
                type,
                poster_path: item.poster_path,
                release_date: item.release_date || item.first_air_date,
                vote_average: item.vote_average,
            }, { merge: true });
        } catch (error) {
            console.log('Error adding to watchlist:', error);
        }
    }

    const removeFromWatchlist = async (userId, item, type) => {
        const docId = `${type}-${item.id}`;
        try {
            const watchlistRef = doc(db, "users", userId, "watchlist", docId);
            await deleteDoc(watchlistRef);
        } catch (error) {
            console.log('Error removing from watchlist:', error);
        }
    }

    const fetchWatchlist = async (userId) => {
        try {
            const watchlistRef = collection(db, "users", userId, "watchlist");
            const querySnapshot = await getDocs(watchlistRef);
            const watchlistItems = querySnapshot.docs.map(doc => ({
                id: doc.id,
                ...doc.data(),
            }));
            return watchlistItems;

        } catch (error) {
            console.log('Error fetching:', error);
        }
    }

    return (
        <WatchlistContext.Provider value={{ fetchWatchlist, removeFromWatchlist, addToWatchlist }}>
            {children}
        </WatchlistContext.Provider>
    );
};

export const useWatchlistContext = () => {
    return useContext(WatchlistContext);
};