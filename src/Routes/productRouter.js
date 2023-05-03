import express from "express";
import {
    createProduct,
    getAllProducts,
    getAProduct,
    editProducts,
    deleteProduct,
} from '../Controllers/productCtrl.js'

import upload from '../Config/productUpload_cloudinary.js';
import loggedIn from '../Middlewares/login/Authentication/isLoggedIn.js';
import isAdmin from '../Middlewares/login/authorization/isAdmin.js'



const Router = express.Router();

//POST /api/v1/products/ 
Router.route('/').post(loggedIn, isAdmin, upload.array('files'), createProduct);
//GET /api/v1/products/ 
Router.route('/').get(getAllProducts);
//GET /api/v1/products/:id
Router.route('/:id').get(getAProduct);
//PUT /api/v1/products/:id
Router.route('/:id').put(loggedIn, isAdmin, editProducts);
//DELETE /api/products/:id
Router.route('/:id').delete(loggedIn, isAdmin, deleteProduct);

export default Router;