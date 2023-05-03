import express from "express";
import {
    createOrder,
    getAllOrders,
    getAOrders,
    updateOrder,
    getOrderStats
} from '../Controllers/orderCtrl.js'

import loggedIn from '../Middlewares/login/Authentication/isLoggedIn.js';
import isAdmin from '../Middlewares/login/authorization/isAdmin.js'

const Router = express.Router();
//POST /api/v1/orders
Router.route('/').post(loggedIn, createOrder);
//GET /api/v1/orders
Router.route('/').get(loggedIn, getAllOrders);
//GET /api/v1/orders/:id
Router.route('/:id').get(loggedIn, getAOrders);
//PUT /api/v1/orders/:id
Router.route('/:id').put(loggedIn, isAdmin, updateOrder);
//GET /api/v1/orders/sales/stats
Router.route('/sales/stats').get(loggedIn, isAdmin, getOrderStats);

export default Router;