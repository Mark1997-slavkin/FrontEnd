import { Box } from "@mui/material";
import React, { useState } from "react";
import { useNavigate } from "react-router";
import ToolBar from "./ToolBar.component";

export default function BookCard({ book }) {
  const navigate = useNavigate();
  const [imgSrc, setImgSrc] = useState(book.image);
  const handleCardClick = () => {
    navigate(`/book/${book._id}`);
  };
  const descriptionStyle = {
    display: "-webkit-box",
    WebkitLineClamp: 1,
    WebkitBoxOrient: "vertical",
    overflow: "hidden",
    textOverflow: "ellipsis",
  };

  return (
    <Box
      className="flex flex-col items-center book-card"
      onClick={handleCardClick}
    >
      <h2 style={descriptionStyle}>{book.title}</h2>
      <p style={descriptionStyle}>{book.summary}</p>
      <img
        onError={() => {
          setImgSrc(
            "https://bookstoreromanceday.org/wp-content/uploads/2020/08/book-cover-placeholder.png"
          );
        }}
        src={imgSrc}
        alt={book.title}
        className="book-img"
      />
      <ToolBar book={book} />
    </Box>
  );
}
