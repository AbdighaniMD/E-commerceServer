import express from "express";
import {
    createReview
} from '../Controllers/reviewCtrl.js'

import loggedIn from '../Middlewares/login/Authentication/isLoggedIn.js';
import isAdmin from '../Middlewares/login/authorization/isAdmin.js'

const Router = express.Router();

Router.route('/:productId').post(loggedIn, createReview);

export default Router;