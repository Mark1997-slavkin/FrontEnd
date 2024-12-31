import React, { useEffect, useState } from 'react'
import BookList from '../components/BookList.component'
import { useUserStore } from '../store/user.store';
import { CircularProgress } from '@mui/material';
import { bookService } from '../services/book.services';

const { getBookList } = bookService
export default function FavoritesPage() {
    const { user } = useUserStore();
    const [books, setBooks] = useState()

    async function fetchBookList() {
        if (!user || !user.favorites) return
        const bookList = await getBookList(user?.favorites)
        setBooks(bookList)
    }

    useEffect(() => {
        fetchBookList()
    }
        , [user])
    return (
        <div>
            {books ?
                <BookList books={books} /> :
                <CircularProgress />
            }

        </div>
    )
}
