import React, { createContext, useContext, type ReactNode, useState } from 'react';

interface RestaurantSettings {
    id: string;
    name: string;
    address: string;
    phone: string;
    email: string;
    hours: {
        open: string;
        close: string;
    };
}

interface RestaurantSettingsContextType {
    settings: RestaurantSettings | null;
    updateSettings: (settings: RestaurantSettings) => void;
    loading: boolean;
}

const RestaurantSettingsContext = createContext<RestaurantSettingsContextType | undefined>(undefined);

export const RestaurantSettingsProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
    const [settings, setSettings] = useState<RestaurantSettings | null>(null);
    const [loading, setLoading] = useState(false);

    const updateSettings = (newSettings: RestaurantSettings) => {
        setSettings(newSettings);
    };

    return (
        <RestaurantSettingsContext.Provider value={{ settings, updateSettings, loading }}>
            {children}
        </RestaurantSettingsContext.Provider>
    );
};

export const useRestaurantSettings = () => {
    const context = useContext(RestaurantSettingsContext);
    if (!context) {
        throw new Error('useRestaurantSettings must be used within RestaurantSettingsProvider');
    }
    return context;
};