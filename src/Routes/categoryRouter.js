import express from "express";
import {
    createCategory,
    getAllCategories,
    getACategory,
    editCategory,
    deleteCategory
} from '../Controllers/categoryCtrl.js'

import loggedIn from '../Middlewares/login/Authentication/isLoggedIn.js';
import isAdmin from '../Middlewares/login/authorization/isAdmin.js'
import catetgoryFileUpload from "../config/categoryUpload_cloudinary.js";

const Router = express.Router();

//POST /api/v1/categories
Router.route('/').post(loggedIn, isAdmin, catetgoryFileUpload.single('file'), createCategory);
//GET /api/categories
Router.route('/').get(getAllCategories);
//GET /api/categories/:id
Router.route('/:id').get(getACategory);
//PUT /api/categories/:id
Router.route('/:id').put(loggedIn, isAdmin, editCategory);
//DELETE /api/categories/:id
Router.route('/:id').delete(loggedIn, isAdmin, deleteCategory);

export default Router;