import asyncHandler from "express-async-handler";
import Brand from "../Models/brandMDL.js";

/**
 * @desc    Create new Brand
 * @route   POST /api/v1/brands
 * @access  Private/Admin
 */
const createBrand = asyncHandler(async (req, res) => {
    const { name } = req.body;
    if (!name) {
        throw new Error("Provide the name field");
    }
    //brand exists
    const brandFound = await Brand.findOne({ name });
    if (brandFound) {
        throw new Error("Brand already exists");
    }

    //create
    const brand = await Brand.create({
        name: name?.toLowerCase(),
        user: req.userAuthId,
    });

    //send response 
    res.status(201).json({
        status: "success",
        message: "Brand created successfully",
        brand,
    });
});

/**
 * @desc    Get all brands
 * @route   GET /api/brands
 * @access  Public/Anyone
 */
const getAllBrands = asyncHandler(async (req, res) => {
    //brands exists
    const brands = await Brand.find({});
    if (!brands) {
        throw new Error("brands object is an undefined");
    }else if (Object.keys(brands).length === 0){
        throw new Error("No brands exist yet!");
    }

    //send response
    res.status(200).json({
        status: "success",
        message: "Brands fetched successfully",
        brands,
    });
});

/**
 * @desc    Get single brands
 * @route   GET /api/brands/:id
 * @access  Public/Anyone
 */
const getABrand = asyncHandler(async (req, res) => {
    //brands exists
    const brand = await Brand.findById(req.params.id);
    if (!brand) {
        throw new Error(`The brand ID: ${req.params.id} - provided is invalid.`);
    }
    //send response
    res.status(200).json({
        status: "success",
        message: "Brands fetched successfully",
        brand,
    });
});


/**
 * @desc    Update brand
 * @route   PUT /api/brands/:id
 * @access  Private/Admin
 */
const editBrands = asyncHandler(async (req, res) => {
    const { name } = req.body;
    if (name === undefined) {
        throw new Error("Provide the name field");
    }

    //brand exists
    const brandFound = await Brand.findById(req.params.id);
    if (!brandFound) {
        throw new Error(`The brand ID: ${req.params.id} - provided is invalid.`);
    }
    const brand = await Brand.findByIdAndUpdate(
        req.params.id, { name }, { new: true }
    );

    //send response
    res.status(200).json({
        status: "seccess",
        message: "Brand updated seccessfully",
        brand
    });
});

/**
 * @desc    delete brand
 * @route   DELETE /api/brands/:id
 * @access  Private/Admin
 */
const deleteBrand = asyncHandler(async (req, res) => {
    //brand exists
    const brand = await Brand.findById(req.params.id);
    if (!brand) {
        throw new Error(`The brand ID: ${req.params.id} - provided is invalid.`);
    }
    //delete
    await Brand.findByIdAndDelete(req.params.id);
    //send response
    res.status(200).json({
        status: "success",
        message: "Brand deleted successfully",
    });

});

export {
    createBrand,
    getAllBrands,
    getABrand,
    editBrands,
    deleteBrand
}