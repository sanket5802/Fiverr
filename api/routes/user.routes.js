import express from 'express';
import { deleteUser, getUser } from '../controllers/user.controller.js';
import { verifyToke } from '../middleware/jwt.js';


const Router = express.Router();

Router.delete('/:id' , verifyToke,deleteUser);
Router.get('/:id', getUser);
export default Router;