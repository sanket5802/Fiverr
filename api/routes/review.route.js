import express from 'express';
import { createReview, deleteReview, getReviews } from '../controllers/review.controller.js';
import { verifyToke } from '../middleware/jwt.js';


const Router = express.Router();

Router.post('/' , verifyToke ,createReview);
Router.delete('/:id' , deleteReview);
Router.get('/:id' , getReviews);


export default Router;