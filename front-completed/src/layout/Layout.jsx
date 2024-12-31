import React, { useEffect } from "react";
import Main from "./main/Main";
import Footer from "./footer/Footer";
import Header from "./header/Header.component";
import { useUserStore } from "../store/user.store";
import { useBookStore } from "../store/book.store";
import { userService } from "../services/user.services";
import { bookService } from "../services/book.services";

export default function Layout({ children }) {
  const { user, setUser } = useUserStore();
  const { books, setBooks } = useBookStore();

  const fetchLoggedInUser = async () => {
    const loggedInUser = await userService.getLoggedInUser();
    setUser(loggedInUser);
  };

  const fetchBooks = async () => {
    setBooks(await bookService.getBooks());
  };

  useEffect(() => {
    if (!user) {
      fetchLoggedInUser();
    }
    if (!books) {
      fetchBooks();
    }
  }, []);

  return (
    <>
      <Header />
      <div style={{ paddingBlock: "30px", paddingInline: "10px" }}>
        <Main>{children}</Main>
      </div>
      <Footer />
    </>
  );
}
