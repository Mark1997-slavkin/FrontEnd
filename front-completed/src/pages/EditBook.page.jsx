import { useEffect, useState } from "react";
import { useParams } from "react-router";
import { bookService } from "../services/book.services";
import BookForm from "../components/book-form/BookForm.component";
import { Box } from "@mui/material";

const EditBookPage = () => {
  const { bookId } = useParams();
  const [book, setBook] = useState();

  useEffect(() => {
    if (bookId) {
      bookService.getById(bookId).then((book) => {
        const editableBook = bookService.editBook(book);
        setBook(editableBook);
      });
    } else {
      setBook(bookService.getEmptyBook());
    }
  }, [bookId]);

  return (
    <Box sx={{ width: '100%', paddingTop: '90px', paddingBottom: '30px' }}>
      <BookForm bookId={bookId} book={book} />
    </Box>
  )
};

export default EditBookPage;
