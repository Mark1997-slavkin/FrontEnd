import React from "react";
import BookList from "../components/BookList.component";
import { useBookStore } from "../store/book.store";
import AddBookIcon from "../components/AddBookIcon";
import { useUserStore } from "../store/user.store";

export default function HomePage() {
  const { books } = useBookStore();
  const { user } = useUserStore();
  return (
    <div>
      <BookList books={books} />
      {(user?.isBusiness || user?.isAdmin) && <AddBookIcon />}
    </div>
  );
}
