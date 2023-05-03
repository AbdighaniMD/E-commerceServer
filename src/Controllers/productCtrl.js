import AsyncHandler from 'express-async-handler';

import Product from '../Models/productMDL.js';
import Brand from '../Models/brandMDL.js';
import Category from '../Models/categoryMDL.js';


/**
 * @desc    Create new product
 * @route   POST /api/v1/products
 * @access  Private/Admin
 */
const createProduct = AsyncHandler(async (req, res) => {
    const { name, description, category, sizes, colors, price, totalQty, brand } = req.body;
    if (( name && description && category && sizes && colors && price && totalQty && brand) === undefined) {
        throw new Error("Please provide all product fields.");
    }
    // image
    const convertedImgs = req.files.map((file) => file?.path);
    console.log(convertedImgs);
    //Product exists
    const productExists = await Product.findOne({ name });
    if (productExists) {
        throw new Error("Product Already Exists");
    }
    //find the brand
    const brandFound = await Brand.findOne({
        name: brand,
    });
    if (!brandFound) {
        throw new Error(
            "Brand not found, please create brand first or check brand name"
        );
    } 

    //find the category
    const categoryFound = await Category.findOne({
        name: category,
    });
    if (!categoryFound) {
        throw new Error(
            "Category not found, please create category first or check category name"
        );
    }

    //Create product
    const product = await Product.create({
        name, description, category,
        sizes, colors, user: req.userAuthId,
        price, totalQty, brand,
        images: convertedImgs,
    });

    //push the product into brand
    brandFound.products.push(product._id);
    await brandFound.save(); //save
    //push the product into category
    categoryFound.products.push(product._id);
    await categoryFound.save(); // save

    //send response
    res.status(201).json({
        status: "success",
        message: "Product created successfully",
        product,
    });
});


/**
 * @desc    Get all products
 * @route   GET /api/v1/products
 * @access  Public/AnyOne
 */
const getAllProducts = AsyncHandler(async (req, res) => {

    //const product = await Product.find({});
    let productQuery = Product.find({});

    // Search by name
    if (req.query.name) {
        productQuery = productQuery.find({
            name: { $regex: req.query.name, $options: "i" },
        });
    }

    //filter by brand
    if (req.query.brand) {
        productQuery = productQuery.find({
            brand: { $regex: req.query.brand, $options: "i" },
        }); 
    }
    //filter by category
    if (req.query.category) {
        productQuery = productQuery.find({
            category: { $regex: req.query.category, $options: "i" },
        });
    }

    //filter by color
    if (req.query.color) {
        productQuery = productQuery.find({
            colors: { $regex: req.query.color, $options: "i" },
        });
    }

    //filter by size
    if (req.query.size) {
        productQuery = productQuery.find({
            sizes: { $regex: req.query.size, $options: "i" },
        });
    }

    //filter by price range
    if (req.query.price) {
        const priceRange = req.query.price.split("-");
        //gte: greater or equal
        //lte: less than or equal to
        productQuery = productQuery.find({
            price: { $gte: priceRange[0], $lte: priceRange[1] },
        });
    }

    //pagination
    //pages
    const page = parseInt(req.query.page) ? parseInt(req.query.page) : 1;
    //limit
    const limit = parseInt(req.query.limit) ? parseInt(req.query.limit) : 10;
    //startIdx
    const startIndex = (page - 1) * limit;
    //endIdx
    const endIndex = page * limit;
    //total
    const total = await Product.countDocuments();

    productQuery = productQuery.skip(startIndex).limit(limit);

    //pagination result
    const pagination = {};
    if (endIndex > 0) {
        pagination.next = {
            page: page + 1,
            limit,
        };
    }
    if (startIndex > 0) {
        pagination.prev = {
            page: page - 1,
            limit,
        };
    }

    //await the query
    const products = await productQuery;
    //send response
    res.status(200).json({
        status: "Success",
        total,
        results: products.length,
        pagination,
        message: "Products fetched successfully",
        products,
    });
});

/**
 * @desc    Get single product
 * @route   GET /api/v1/products/:id
 * @access  Public/AnyOne
 */
const getAProduct = AsyncHandler(async (req, res) => {

    const product = await Product.findById(req.params.id).populate({
        path: 'reviews',
        select: ['message', 'rating'],
        populate: {
            path: 'user',
            select: 'fullname', 
        }
    });
    if (!product) {
        throw new Error(`The product ID: ${req.params.id} - provided is invalid.`);
    }

    //send response
    res.status(200).json({
        status: "success",
        message: "Product fetched successfully",
        product,
    });
});


/**
 * @desc    update product
 * @route   PUT /api/v1/products/:id
 * @access  Private/Admin
 */
const editProducts = AsyncHandler(async (req, res) => {
    const { name, description, category, sizes, colors, user, price, totalQty, brand} = req.body;
    if((name && description && category && sizes && colors && price && totalQty && brand) === undefined){
        throw new Error("Provide the All fields");
    }
    //Product exists
    const productExists = await Product.findById(req.params.id);
    if (!productExists) {
        throw new Error(`The product ID: ${req.params.id} - provided is invalid.`);
    }
    //update
    const product = await Product.findByIdAndUpdate(
        req.params.id, {
        name, description, category, sizes,
        colors, price, totalQty, brand,
        user: req.userAuthId
    }, {
        new: true,
        runValidators: true,
    });

    //send response
    res.status(200).json({
        status: "success",
        message: "Product updated successfully",
        product,
    });
});


/**
 * @desc    delete  product
 * @route   DELETE /api/v1/products/:id
 * @access  Private/Admin
 */
const deleteProduct = AsyncHandler(async (req, res) => {
    //Product exists
    const productExists = await Product.findById(req.params.id);
    if (!productExists) {
        throw new Error(`The product ID: ${req.params.id} - provided is invalid.`);
    }

    await Product.findByIdAndDelete(req.params.id);
    //send response
    res.status(200).json({
        status: "success",
        message: "Product deleted successfully",
    })
});

export {
    createProduct,
    getAllProducts,
    getAProduct,
    editProducts,
    deleteProduct,
}