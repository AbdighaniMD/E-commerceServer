import bcryptjs from 'bcryptjs';
import asyncHandler from 'express-async-handler';

import userMDL from '../Models/userMDL.js';
import generateToken from '../Helpers/utils/generateToken.js';
import User from '../Models/userMDL.js';

/**
 * @desc    Register user
 * @route   POST /api/v1/users/register 
 * @access  Public
 */
const userRegister = asyncHandler(async (req, res, next) =>{
    const { fullname, email, password } = req.body;
    // check payload.
    if((fullname && email && password) === undefined){
        throw new Error("Please provide all user fields.");
    }

    //Check user exists
    const userFound = await userMDL.findOne({email})
    if(userFound){
        throw new Error("User Already Exist");
    } 
     
    //HashPassword
    const salt = await bcryptjs.genSalt(10);
    const HashPassword = await bcryptjs.hash(password, salt);

    //Create user
    const newUser = await userMDL.create({
        fullname,
        email, 
        password: HashPassword,
        isAdmin: true // To access the admin experience, set to true.
    });

    //send response 
    res.status(201).json({
        status: "Success",
        message: "User Registered Successfully",
        data: newUser,
    });
});

/**
 * @desc    Login user
 * @route   POST /api/v1/users/login 
 * @access  Private/
 */
const userLogin = asyncHandler(async (req, res, next) =>{
    const { email, password} = req.body;
    if((email && password) === undefined ){
        throw new Error("Both email and password is required");
    }
    //check doesn't user exist
    const userFound = await userMDL.findOne({ email});
    if(!userFound){
        throw new Error("Invalid login credentials");
    }
    //verify password
    if(userFound && (await bcryptjs.compare(password, userFound?.password))){
        //send response 
        res.json({
            status: "success",
            message: "User logged in successfully",
            userFound,
            token: generateToken(userFound._id),
        });
    } else {
        throw new Error("Invalid login credentials");
    }
});


/**
 * @desc    User profile 
 * @route   GET /api/v1/users/userProflie 
 * @access  Private/
 */
const userProfile = asyncHandler(async (req, res) => {
    //find the user
    const user = await userMDL.findById(req.userAuthId).populate({
        path:'orders',
        select:['orderNumber','paymentStatus','paymentMethod','currency','status'],
        populate: {
            path:'orderItems',
        }
    });
    if (!user) {
        throw new Error(`The user ID: ${req.params.id} - provided is invalid.`);
    }
    //send response
    res.json({
        status: "success",
        message: "User profile fetched successfully",
        user,
    });
});

/**
 * @desc    Update user admin
 * @route   PUT /api/v1/users/profile/update/:id
 * @access  Private/Admin
 */
const updateUser = asyncHandler(async (req, res) => {
    const { admin } = req.body;
    if(admin === undefined){
        throw new Error("Please provide the admin field");
    }
    //brand exists
    const userFound = await userMDL.findById(req.params.id);
    if (!userFound) {
        throw new Error(`The user ID: ${req.params.id} - provided is invalid.`);
    }
    const user = await userMDL.findByIdAndUpdate(
        req.params.id, { isAdmin: admin }, { new: true }
    );

    //send response
    res.status(200).json({
        status: "seccess",
        message: "User updated seccessfully",
        user
    });
});

/**
 * @desc    Update user shipping address
 * @route   GET /api/v1/users/update/shipping
 * @access  Private/Admin
 */
const updateShippingAddres = asyncHandler(async (req, res) => {
    //Get the payload
    const {
        firstName, lastName,
        address, city, 
        postalCode, province,
        phone, country,
    } = req.body;
    
    // check payload.
    if((firstName && lastName && address && city && postalCode && province && phone && country) === undefined){
        throw new Error("Please provide all product Shipping Addres fields.");
    }
    // update shapping address
    const user = await userMDL.findByIdAndUpdate(
        req.userAuthId,
        {
            hasShippingAddress: true,
            shippingAddress: {
                firstName, lastName,
                address, city,
                postalCode, province,
                phone, country,
            },
        },
        { new: true, }
    );
    //send response
    res.status(200).json({
        status: "success",
        message: "User shipping address updated successfully",
        user,
    });

}); 

export {
    userRegister,
    userLogin,
    userProfile,
    updateUser,
    updateShippingAddres
}