import express from 'express';
import dotenv from 'dotenv'

import userRouter from '../Routes/usersRoute.js';
import productsRouter from '../Routes/productRouter.js';
import categoriesRouter from '../Routes/categoryRouter.js';
import brandsRouter from '../Routes/brandRouter.js';
import reviewRouter from '../Routes/reviewRouter.js';
import orderRouter from '../Routes/orderRouter.js';
import webhooksEndpoint from '../Middlewares/stripe/webhookEndpoint.js';
import { globalErrHandler, notFoundRoutes } from '../Middlewares/error/globalErr.js';

const app = express();
dotenv.config();

//stripeWebhook
app.use(webhooksEndpoint);

//middlewares
app.use(express.urlencoded({ extended: false }));
app.use(express.json());

//routes
app.use('/api/v1/users/', userRouter);
app.use("/api/v1/products/", productsRouter);
app.use("/api/v1/categories/", categoriesRouter);
app.use("/api/v1/brands/", brandsRouter);
app.use("/api/v1/reviews/", reviewRouter);
app.use("/api/v1/orders/", orderRouter);

//404 Error
app.use(notFoundRoutes);
//Error handler Middleware
app.use(globalErrHandler);

export default app