import { useEffect, useState } from 'react';
import {
  Button,
  TextField,
  Typography,
  Container,
  Paper,
  FormControlLabel,
  Checkbox,
  Grid2,
} from '@mui/material';
import { userService } from '../services/user.services';
import constants from '../components/login-signup-form/LoginSignupForm.constants'
import Joi from 'joi';
import { useNavigate, useParams } from 'react-router';
import { useUserStore } from '../store/user.store';

const fields = constants.signupFields.filter((field) => field.name != 'password');
const validators = {};

delete fields.password;

fields.forEach((field) => validators[field.name] = field.validation);

const UserPage = () => {
  const { userId } = useParams();
  const [editUser, setEditUser] = useState();
  const [isValid, setIsValid] = useState(false);
  const [formData, setFormData] = useState(userService.getEmptyUser());
  const navigate = useNavigate();
  const [errors, setErrors] = useState({});
  const { user, setUser, users, setUsers } = useUserStore();

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

  useEffect(() => {
    userService.getById(userId).then((user) => {
      const formData = userService.getEditableUser(user);
      setFormData(formData);
      setEditUser(user);
    });
  }, [userId]);

  useEffect(() => {
    setIsValid(!Joi.object(validators).validate(formData).error);
  }, [formData]);

  const handleCheckboxChange = (e) => {
    const { name, checked } = e.target;
    setFormData((prevData) => ({ ...prevData, [name]: checked }));
  };

  const handleSubmit = async (e) => {
    try {
      e.preventDefault();
      const userData = userService.normalizeUser(formData);
      delete userData.password;
      const editedUser = await userService.save({ _id: userId, ...userData });

      setUsers(users?.map((user) => user._id == userId ? editedUser : user));

      if (user._id == userId) {
        setUser(editedUser);
      }

      navigate('/admin');
    } catch (err) {
      console.error(err);
    }
  };

  return (
    <Container maxWidth="xs">
      <Paper elevation={3} style={{ padding: '20px' }}>
        <Typography variant="h5">Edit User</Typography>
        <form onSubmit={handleSubmit}>
          <Grid2 container mx={-1}>
            {fields.map(field => {
              const { displayName, name, type, required } = field
              return (
                type == "checkbox" ? (
                  <Grid2 key={name} size={12} p={1}>
                    <FormControlLabel
                      name={name}
                      onChange={handleCheckboxChange}
                      control={<Checkbox checked={formData[name]} color="primary" />}
                      label={displayName}
                    />
                  </Grid2>
                ) : (
                  <Grid2 key={name} size={6} p={1}>
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
                ));
            })}
          </Grid2>
          <Button type="submit" fullWidth variant="contained" color="primary" disabled={!isValid}>
            Save
          </Button>
        </form>
      </Paper>
    </Container>
  );
};

export default UserPage;
