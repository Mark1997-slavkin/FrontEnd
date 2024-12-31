import { create } from 'zustand'

export const useBookStore = create((set) => ({
    books: undefined,
    setBooks: (books) => {
        set((state) => ({
            ...state,
            books: books,
        }));
    },
}));
