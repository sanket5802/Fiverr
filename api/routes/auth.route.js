import express from 'express';
import { login, logout, register } from '../controllers/auth.controller.js'; // Adjust the path as necessary

const Router = express.Router();

Router.post('/register', register);
Router.post('/login', login);
Router.post("/logout", logout);
export default Router;
