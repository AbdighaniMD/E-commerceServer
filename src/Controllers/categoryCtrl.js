import asyncHandler from 'express-async-handler';
import Category from '../Models/categoryMDL.js';

/**
 * @desc    Create new category
 * @route   POST /api/v1/categories
 * @access  Private/Admin
 */
const createCategory = asyncHandler(async (req, res) => {
    const { name } = req.body;
    if (name === undefined) {
        throw new Error("Provide the name category field");
    }
    //category exists 
    const categoryFound = await Category.findOne({ name });
    if (categoryFound) {
        throw new Error("Category already exists");
    }

    //create
    const category = await Category.create({
        name: name?.toLowerCase(),
        user: req.userAuthId,
        image: req?.file?.path,
    });

    //send response
    res.status(201).json({
        status: "success",
        message: "Category created successfully",
        category,
    });

});

/**
 * @desc    Get all categories
 * @route   GET /api/v1/categories
 * @access  Public/anyone
 */
const getAllCategories = asyncHandler(async (req, res) => {
    //categories exists
    const categories = await Category.find({});
    if (!categories) {
        throw new Error("category object is an undefined!");
    } else if (Object.keys(categories).length === 0){
        throw new Error("No recipes exist yet!");
    }
    //send response
    res.status(200).json({
        status: "success",
        message: "Categories fetched successfully",
        categories,
    });
});

/**
 * @desc    Get single category
 * @route   GET /api/v1/categories/:id
 * @access  Public/anyone
 */
const getACategory = asyncHandler(async (req, res) => {
    //category exists
    const category = await Category.findById(req.params.id);
    if (!category) {
        throw new Error(`The category ID: ${req.params.id} - provided is invalid.`);
    }
    //send response
    res.status(200).json({
        status: "success",
        message: "Category fetched successfully",
        category,
    });
});

/**
 * @desc    Update category
 * @route   PUT /api/categories/:id
 * @access  Private/Admin
 */
const editCategory = asyncHandler(async (req, res) => {
    const { name } = req.body;
    if (name === undefined) {
        throw new Error("Provide the name category field");
    }
    //category exists
    const categoryFound = await Category.findById(req.params.id);
    if (!categoryFound) {
        throw new Error(`The category ID: ${req.params.id} - provided is invalid.`);
    }

    //update
    const category = await Category.findByIdAndUpdate(
        req.params.id, { name, }, { new: true, }
    );
    res.status(200).json({
        status: "success",
        message: "category updated successfully",
        category,
    });

});

/**
 * @desc    delete category
 * @route   DELETE /api/categories/:id
 * @access  Private/Admin
 */
const deleteCategory = asyncHandler(async (req, res) => {
    //category exists
    const categoryFound = await Category.findById(req.params.id);
    if (!categoryFound) {
        throw new Error(`The category ID: ${req.params.id} - provided is invalid.`);
    }
    //delete
    await Category.findByIdAndDelete(req.params.id);
    //send response
    res.status(200).json({
        status: "success",
        message: "Category deleted successfully",
    });
});

export {
    createCategory,
    getAllCategories,
    getACategory,
    editCategory,
    deleteCategory
}