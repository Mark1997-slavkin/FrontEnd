import React, { useEffect, useState } from 'react';
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
import { userService } from '../../services/user.services';
import constants from './LoginSignupForm.constants';
import Joi from 'joi';
import { useUserStore } from '../../store/user.store';
import { useNavigate } from 'react-router';

const { generalFields, signupFields } = constants
const generalValidators = {};
const signupValidators = {};

generalFields.forEach(field => generalValidators[field.name] = field.validation);
signupFields.forEach(field => signupValidators[field.name] = field.validation);

const LoginSignupForm = () => {
  const [isValid, setIsValid] = useState(false);
  const [isSignup, setIsSignup] = useState(false);
  const [formData, setFormData] = useState(userService.getEmptyUser());
  const navigate = useNavigate();
  const [errors, setErrors] = useState({});

  const { setUser } = useUserStore();

  const fields = isSignup ? signupFields : generalFields
  const validators = isSignup ? signupValidators : generalValidators

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

  const onToggleMode = () => {
    setIsSignup(!isSignup)
    setFormData(userService.getEmptyUser())
  }

  useEffect(() => {
    const data = isSignup ? formData : { email: formData.email, password: formData.password };
    setIsValid(!Joi.object(validators).validate(data).error);
  }, [isSignup, formData]);

  const handleCheckboxChange = (e) => {
    const { name, checked } = e.target;
    setFormData((prevData) => ({ ...prevData, [name]: checked }));
  };

  const handleSubmit = async (e) => {
    try {
      e.preventDefault();
      const userData = userService.normalizeUser(formData);
      if (isSignup) {
        await userService.signup(userData);
      } else {
        const loginData = { email: userData.email, password: userData.password };
        await userService.login(loginData);
      }

      setUser(await userService.getLoggedInUser());
      navigate(`/`)

    } catch (err) {
      console.error(err)
    }
  };

  return (
    <Container maxWidth="xs">
      <Paper elevation={3} style={{ padding: '20px' }}>
        <Typography variant="h5">{isSignup ? 'Sign Up' : 'Log In'}</Typography>
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
                      control={<Checkbox value={formData[name]} color="primary" />}
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
            {isSignup ? 'Sign Up' : 'Log In'}
          </Button>
          <Button
            onClick={onToggleMode}
            fullWidth
            variant="text"
            style={{ marginTop: '10px' }}
          >
            {isSignup ? 'Already have an account? Log In' : "Don't have an account? Sign Up"}
          </Button>
        </form>
      </Paper>
    </Container>
  );
};

export default LoginSignupForm;
