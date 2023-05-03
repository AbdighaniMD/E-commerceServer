import dotenv from "dotenv";
import asyncHandler from 'express-async-handler';
import Stripe from 'stripe';

import User from '../Models/userMDL.js';
import Product from '../Models/productMDL.js';
import Order from '../Models/orderMDL.js';

//instance
dotenv.config();
const stripe = new Stripe(process.env.STRIPE_KEY);

/**
 * @desc    create orders
 * @route   POST /api/v1/orders
 * @access  Private/
 */
const createOrder = asyncHandler(async (req, res) => {

    //Get the payload(customer, orderItem, ShippingAddress, totalPrice)
    const { orderItems, shippingAddress, totalPrice } = req.body;
    if ((orderItems && totalPrice) === undefined) {
        throw new Error("Please provide all fields.");
    }
    //Find user
    const user = await User.findById(req.userAuthId);
    //Check if user has shipping address
    if (!user?.hasShippingAddress) {
        throw new Error("Please provide shipping address by in user profile");
    }

    //Check if order is not empty
    if (orderItems?.length <= 0) {
        throw new Error("No order items");
    }

    //place/ create order into db
    const implementOrder = await Order.create({
        orderItems,
        shippingAddress: shippingAddress ? shippingAddress : user?.shippingAddress,
        totalPrice,
        user: user?._id,
    });

    //Update the product qty
    const products = await Product.find({ _id: { $in: orderItems } });

    //console.log(products)
    orderItems?.map(async (order) => {
        const product = products?.find((product) => {
          return product?._id?.toString() === order?._id?.toString();
        });
        if (product) {
          product.totalSold += order.totalQtyBuy;
        }
        await product.save();
      });
     //console.log(orderItems);

    //push order into user
    user.orders.push(implementOrder?._id);
    await user.save(); //save

    //make payment (strip)
    //convert order items to have same structure that stripe need
    const convertedOrders = orderItems.map((item) => {
        return {
            price_data: {
                currency: "gbp",
                product_data: {
                    name: item?.name,
                    description: item?.description,
                },
                unit_amount: item?.price * 100,
            },
            quantity: item?.totalQtyBuy,
        };
    });

    const session = await stripe.checkout.sessions.create({
        line_items: convertedOrders,
        metadata: {
            orderId: JSON.stringify(implementOrder?._id),
        },
        mode: "payment",
        success_url: "http://localhost:3000/success",
        cancel_url: "http://localhost:3000/cancel",
    });

    //send response
    res.status(201).send({ url: session.url });
});

/**
 * @desc    get all orders
 * @route   GET /api/v1/orders
 * @access  Private
 */
const getAllOrders = asyncHandler(async (req, res) => {
    //find all orders
    const orders = await Order.find({user: req.userAuthId}).populate("user");
    if (!orders) {
        throw new Error("order object is an undefined!");
    }else if (Object.keys(orders).length === 0){
        throw new Error("No order was found!");
    }
    //send response
    res.status(200).json({
        status: "seccess",
        message: "All orders",
        orders,
    });
});

/**
 * @desc    get all orders
 * @route   GET /api/v1/orders/:id
 * @access  Private
 */
const getAOrders = asyncHandler(async (req, res) => {
    //get the id from params
    const order = await Order.findById({ _id: req.params.id });
    //check credentials e.g who made the order
    const orderFound = order?.user?.toString() === req.userAuthId?.toString();
    if (!order) {
        throw new Error(`The order ID: ${req.params.id} - provided is invalid.`);
    } else if (!orderFound) {
        throw new Error("Invalid credentials to see order");
    }
    //send response
    res.status(200).json({
        status: "seccess",
        message: "Single order",
        order,
    });
});

/**
 * @desc    update order to delivered
 * @route   PUT /api/v1/orders/:id
 * @access  Private/Admin
 */
const updateOrder = asyncHandler(async (req, res) => {
    //get the id from params
    const id = req.params.id;
    const orderFound = await Order.findById(req.params.id);
    if (!orderFound) {
        throw new Error(`The order ID: ${req.params.id} - provided is invalid.`);
    }
    //update
    const updatedOrder = await Order.findByIdAndUpdate(
        id,
        { status: req.body.status, },
        { new: true, }
    );
    res.status(200).json({
        status: "seccess",
        message: "Order updated",
        updatedOrder,
    });
});

/**
 * @desc    get sales sum of orders
 * @route   GET /api/v1/orders/sales/stats
 * @access  Private/Admin
 */
const getOrderStats = asyncHandler(async (req, res) => {
    //get order stats
    const orders = await Order.aggregate([
        {
            $group: {
                _id: null,
                minimumSale: { $min: "$totalPrice", },
                totalSales: { $sum: "$totalPrice", },
                maxSale: { $max: "$totalPrice", },
                avgSale: { $avg: "$totalPrice", },
            },
        },
    ]);
    //get the date
    const date = new Date();
    const today = new Date(date.getFullYear(), date.getMonth(), date.getDate());
    const saleToday = await Order.aggregate([
        {
            $match: {
                createdAt: { $gte: today, },
            },
        },
        {
            $group: {
                _id: null,
                totalSales: { $sum: "$totalPrice", },
            },
        },
    ]);
    //send response
    res.status(200).json({
        status: "seccess",
        message: "Sum of orders",
        orders,
        saleToday,
    });
});

export {
    createOrder,
    getAllOrders,
    getAOrders,
    updateOrder,
    getOrderStats
}