'use client'

import React, { createContext, useContext, useState, ReactNode, useEffect } from 'react';
import { useRouter, usePathname } from 'next/navigation';

interface NavigationContextType {
    isNavigating: boolean;
    navigate: (url: string) => void;
}

const NavigationContext = createContext<NavigationContextType | undefined>(undefined);

export const useNavigation = () => {
    const context = useContext(NavigationContext);
    if (!context) {
        throw new Error('useNavigation must be used within a NavigationProvider');
    }
    return context;
};

interface NavigationProviderProps {
    children: ReactNode;
}

export const NavigationProvider: React.FC<NavigationProviderProps> = ({ children }) => {
    const [isNavigating, setIsNavigating] = useState(false);
    const router = useRouter();
    const pathname = usePathname();

    // Clear loading state when pathname changes
    useEffect(() => {
        if (isNavigating) {
            const timer = setTimeout(() => {
                setIsNavigating(false);
            }, 500); // Small delay to ensure smooth transition

            return () => clearTimeout(timer);
        }
    }, [pathname, isNavigating]);

    const navigate = (url: string) => {
        // Don't show loading for same page
        if (url === pathname) return;

        setIsNavigating(true);
        router.push(url);
    };

    return (
        <NavigationContext.Provider value={{ isNavigating, navigate }}>
            {children}
        </NavigationContext.Provider>
    );
};
