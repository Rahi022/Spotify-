// src/services/auth.js

// Simulate an authentication API call for signing in
export const signin = async (email, password) => {
  // Simulate a network delay for the request
  await new Promise((resolve) => setTimeout(resolve, 1000));

  // Simulate some basic checks for successful sign-in
  if (email === 'test@example.com' && password === 'password123') {
    return { status: 200, message: 'Sign in successful' };
  } else {
    throw new Error('Invalid email or password. Please try again.');
  }
};

// Simulate an authentication API call for signing up
export const signup = async (email, password) => {
  // Simulate a network delay for the request
  await new Promise((resolve) => setTimeout(resolve, 1000));

  // Simulate checking if the email already exists (simple check)
  if (email === 'test@example.com') {
    throw new Error('Email already in use. Please use a different email.');
  }

  // Simulate a successful sign-up response if no errors
  return { status: 200, message: 'Sign up successful' };
};
