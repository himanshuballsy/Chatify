import { create } from "zustand";

interface themeState {
    theme: string,
    setTheme: (themeName : string) => void
}

export const useThemeStore = create<themeState>((set)=> ({
    theme: localStorage.getItem('theme') || 'dark',
    setTheme: (themeName) => {
        localStorage.setItem('theme', themeName);
        set({ theme: themeName })
    }
}))