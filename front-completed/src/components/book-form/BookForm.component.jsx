import React, { useEffect, useState } from "react";
import {
  Button,
  TextField,
  Typography,
  Container,
  Paper,
  FormControlLabel,
  Checkbox,
  Grid2,
} from "@mui/material";
import { bookService } from "../../services/book.services";
import { fields } from "./BookForm.constants";
import Joi from "joi";
import { useNavigate } from "react-router";
import { useBookStore } from "../../store/book.store";
import { useUserStore } from "../../store/user.store";
const validators = {};
const defaultImageUrl =
  "https://bookstoreromanceday.org/wp-content/uploads/2020/08/book-cover-placeholder.png";
fields.forEach((field) => (validators[field.name] = field.validation));
const BookForm = ({ bookId, book }) => {
  const [isValid, setIsValid] = useState(false);
  const [formData, setFormData] = useState(bookService.getEmptyBook());
  const navigate = useNavigate();
  const [errors, setErrors] = useState({});
  const { books = [], setBooks } = useBookStore();

  const handleChange = (e) => {
    const { name, value } = e.target;

    setFormData((prevData) => ({ ...prevData, [name]: value }));
    if (validators[name]) {
      const fieldValidator = Joi.object({ [name]: validators[name] });
      const { error } = fieldValidator.validate({ [name]: value });
      const errorMessage = error ? error.details[0].message : null;
      setErrors((prevErrors) => ({ ...prevErrors, [name]: errorMessage }));
    }
  };

  const { user, setUser } = useUserStore();
  const handleCheckboxChange = (e) => {
    const { name, checked } = e.target;
    setFormData((prevData) => ({ ...prevData, [name]: checked }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const finalFormData = {
        ...formData,
        image: formData.image || defaultImageUrl,
      };

      const isEditing = Boolean(bookId);
      const id = await bookService.save({
        _id: bookId,
        ...finalFormData,
        userId: user._id,
      });

      const newBook = await bookService.getById(id);

      if (isEditing) {
        setBooks(
          books.map((oldBook) =>
            oldBook._id === newBook._id ? newBook : oldBook
          )
        );
      } else {
        setBooks([...books, newBook]);
      }

      navigate(`/book/${id}`);
    } catch (err) {
      console.error(err);
    }
  };

  useEffect(() => {
    if (book) {
      setFormData(book);
    }
  }, [book]);

  useEffect(() => {
    setIsValid(!Joi.object(validators).validate(formData).error);
  }, [formData]);

  return (
    <Container maxWidth="xs">
      <Paper elevation={3} style={{ padding: "20px" }}>
        <Typography variant="h5">
          {bookId ? `Edit ${formData.title}` : "Add Book"}
        </Typography>
        <form onSubmit={handleSubmit}>
          <Grid2 container mx={-1}>
            {fields.map((field) => {
              const { displayName, name, type, required } = field;
              return type === "checkbox" ? (
                <Grid2 key={name} size={12} p={1}>
                  <FormControlLabel
                    name={name}
                    onChange={handleCheckboxChange}
                    control={
                      <Checkbox value={formData[name]} color="primary" />
                    }
                    label={displayName}
                  />
                </Grid2>
              ) : type === "textarea" ? (
                <Grid2 key={name} size={12} p={1}>
                  <TextField
                    name={name}
                    multiline
                    rows={4}
                    variant="outlined"
                    fullWidth
                    label={displayName}
                    value={formData[name]}
                    onChange={handleChange}
                    required={required}
                    error={Boolean(errors[name])}
                    helperText={errors[name]}
                  />
                </Grid2>
              ) : (
                <Grid2 key={name} size={12} p={1}>
                  <TextField
                    type={type}
                    margin="normal"
                    fullWidth
                    name={name}
                    label={displayName}
                    value={formData[name]}
                    onChange={handleChange}
                    required={required}
                    sx={{ my: 0 }}
                    error={Boolean(errors[name])}
                    helperText={errors[name]}
                  />
                </Grid2>
              );
            })}
          </Grid2>
          <Button
            type="submit"
            fullWidth
            variant="contained"
            color="primary"
            disabled={!isValid}
          >
            {bookId ? "Edit" : "Create"}
          </Button>
        </form>
      </Paper>
    </Container>
  );
};

export default BookForm;
