import React from "react";
import { useParams } from "react-router";
import { Box, CircularProgress, Container, Typography } from "@mui/material";
import ToolBar from "../components/ToolBar.component";
import { useBookStore } from "../store/book.store";

export default function BookPage() {
  const { bookId } = useParams();
  const { books } = useBookStore();
  const book = books?.find((book) => bookId === book._id);
  return !books ? (
    <CircularProgress />
  ) : book ? (
    <Container>
      <Box
        sx={{
          mx: { xs: "10px", sm: "20px" },
          display: "flex",
          flexDirection: { sm: "column" },
          gap: "15px",
          alignItems: "center",
          justifyContent: "center",
        }}
      >
        <Box
          sx={{
            width: { xs: "100%", sm: "400px" },
            textAlign: "center",
            mt: { xs: "20px" },
            boxShadow: 3,
            borderRadius: "10px",
            p: "20px",
            backgroundColor: "#f5f5f5",
          }}
        >
          <img
            src={book.image}
            alt={book.title}
            style={{
              width: "100%",
              maxHeight: "400px",
              objectFit: "cover",
              borderRadius: "10px",
            }}
          />
          <ToolBar book={book} />
        </Box>

        <Box
          sx={{
            textAlign: "center",
            width: { xs: "100%" },
            mt: { xs: "20px", sm: "0" },
          }}
        >
          <Typography variant="h4" sx={{ fontWeight: "bold", mb: "20px" }}>
            {book.title}
          </Typography>

          <Typography
            variant="body1"
            sx={{
              mt: "20px",
              whiteSpace: "pre-line",
              marginBottom: "30px",
              paddingRight: "10px",
              wordBreak: "break-all",
            }}
          >
            {book.description}
          </Typography>
          <Typography sx={{ fontSize: "1.4rem" }}>
            {`${book.price}$`}
          </Typography>
        </Box>
      </Box>
    </Container>
  ) : (
    <h1>book not found</h1>
  );
}
