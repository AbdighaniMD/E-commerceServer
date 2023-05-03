import express from "express";
import {
    userRegister,
    userLogin,
    userProfile,
    updateUser,
    updateShippingAddres
} from '../Controllers/usersCtrl.js'

import loggedIn from '../Middlewares/login/Authentication/isLoggedIn.js';
import isAdmin from '../Middlewares/login/authorization/isAdmin.js'

const Router = express.Router();

//POST/api/v1/users/register
Router.route('/register').post(userRegister);
//POST/api/v1/users/login
Router.route('/login').post(userLogin);
//GET/api/v1/users/profile
Router.route('/profile').get(loggedIn, userProfile);
//put/api/v1/users/profile/update/:id
Router.route('/profile/update/:id').put(loggedIn, isAdmin, updateUser);
//PUT /api/v1/users/update/shipping
Router.route('/update/shipping').put(loggedIn, isAdmin, updateShippingAddres);

export default Router;