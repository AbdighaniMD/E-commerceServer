import asyncHandler from 'express-async-handler';
import Review from '../Models/reviewMDL.js';
import Product from '../Models/productMDL.js';

/**
 * @desc    Create new review
 * @route   POST /api/v1/reviews
 * @access  Private/authoraztions
 */
export const createReview = asyncHandler(async (req, res) => {
    const { product, message, rating } = req.body
    if ((message && rating) === undefined) {
        throw new Error("Please provide all review fields.");
    }
    //product exists
    const productFound = await Product.findById(req.params.productId);
    if (!productFound) {
        throw new Error(`The product ID: ${req.params.productId} - provided is invalid. or Product Not Found `);
    }
    // check if the user already has reviewed this product
    const hasReviewed = productFound?.reviews?.find((review) => {
        return review?.user?.toString() === req?.userAuthId?.toString();
    });
    if (hasReviewed) {
        throw new Error("You have already reviewed this product");
    }
    //create
    const review = await Review.create({
        message,
        rating,
        product: productFound?._id,
        user: req.userAuthId,
    });

    // push review into product Found 
    productFound.reviews.push(review?._id);
    await productFound.save()//save

    //send responses
    res.status(201).json({
        success: true,
        message: "Review created successfully",
    });
});
