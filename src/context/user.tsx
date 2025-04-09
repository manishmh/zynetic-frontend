'use client'

import { createContext, useState, ReactNode, useContext } from "react";

interface userType {
    id: string,
    name: string,
    email: string
}

interface UserContextType {
    user: userType | null;
    handleUser: (data: userType | null) => void;
}

const UserContext = createContext<UserContextType | undefined>(undefined);

export const UserDataProvider = ({ children }: { children: ReactNode }) => {
    const [user, setUser] = useState<userType | null>(null)
    console.log('user', user)
    const handleUser = (data: userType | null) => {
        setUser(data);
    }

    return (
        <UserContext.Provider value={{ user, handleUser }}>
            {children}
        </UserContext.Provider>
    )
}

export const useUserContext = () => {
    const context = useContext(UserContext);

    if (!context) {
        throw new Error('useUserContext must be used within defined layout')
    }
    return context;
}