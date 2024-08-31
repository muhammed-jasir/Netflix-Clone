import { createContext, useContext, useEffect, useState } from "react";
import { auth, db } from "../services/firebase";
import { createUserWithEmailAndPassword, signInWithEmailAndPassword, onAuthStateChanged, signOut, updateProfile } from 'firebase/auth';
import { collection, addDoc } from "firebase/firestore";

const UserAuthContext = createContext(null);

export const UserAuthContextProvider = ({ children }) => {
    const [user, setUser] = useState(null);
    console.log(user)
    const signup = async (name, email, password) => {
        try {
            const res = await createUserWithEmailAndPassword(auth, email, password);
            const user = res.user;

            await updateProfile(user, {
                displayName: name,
            });

            await addDoc(collection(db, "users"), {
                uid: user.uid,
                name,
                email,
                authProvider: 'local',
            });
        } catch (error) {
            throw new Error(error.message);
        }
    }

    const signin = (email, password) => {
        return signInWithEmailAndPassword(auth, email, password)
    }

    const signout = () => {
        return signOut(auth);
    }

    useEffect(() => {
        const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
            setUser(currentUser);
        });

        return () => {
            unsubscribe();
        }
    }, []);

    return (
        <UserAuthContext.Provider value={{ signup, signin, signout, user }}>
            {children}
        </UserAuthContext.Provider>
    );
};

export const useUserAuthContext = () => {
    return useContext(UserAuthContext);
};