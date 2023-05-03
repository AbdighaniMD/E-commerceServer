import express from "express";
import {
    createBrand,
    getAllBrands,
    getABrand,
    editBrands,
    deleteBrand

} from '../Controllers/brandCtrl.js'

import loggedIn from '../Middlewares/login/Authentication/isLoggedIn.js';
import isAdmin from '../Middlewares/login/authorization/isAdmin.js'

const Router = express.Router();

//POST /api/v1/brands
Router.route('/').post(loggedIn, isAdmin, createBrand);
// GET /api/brands
Router.route('/').get(getAllBrands);
//GET /api/brands/:id
Router.route('/:id').get(getABrand);
//PUT /api/brands/:id
Router.route('/:id').put(loggedIn, isAdmin, editBrands);
// DELETE /api/brands/:id
Router.route('/:id').delete(loggedIn, isAdmin, deleteBrand);

export default Router;