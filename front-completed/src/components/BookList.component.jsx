import React from 'react'
import BookCard from './BookCard.component';

export default function BookList({ books }) {

    return (
        <div className='book-list'>
            {books?.map(book => (
                <BookCard book={book} key={book._id} />
            ))}

        </div>
    )
}
