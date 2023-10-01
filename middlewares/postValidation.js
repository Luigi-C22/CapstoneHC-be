const {body, validationResult} =  require ('express-validator');

const postBodyParams = [
    body ('carBrand')
    .notEmpty()
    .isString()
    .isLength({ min: 3})
    .withMessage('Brand must have at least 3 characters'),

    body('carName')
    .notEmpty()
    .isString()
    .isLength({min: 1})
    .withMessage('Car name must have at least 1 character'),

    /* body('carPicture')
    .notEmpty()
    .isString()
    .isURL()
    .withMessage('The picture must be an image file'), */

    body('year')
    .notEmpty()
    .isString()
    .isLength({min: 4, max: 4})
    .withMessage('Year must have 4 characters'),

    body('price')
    .notEmpty()
    .isInt()
    .isLength({min: 1})
    .withMessage('Price must to be a number at least 1 character'),

    body('contact')
    .notEmpty()
    .isString()
    .isLength({min: 8})
    .withMessage('Contact must be a phone number at least 8 characters'),

    body('description')
    .notEmpty()
    .isString()
    .isLength({min: 10})
    .withMessage('Description must have at least 10 characters'),

    body('authorName')
    .notEmpty()
    .isString()
    .isLength({min: 3})
    .withMessage('The name must have at least 3 characters and not more than 15'),
];

const validatePostBody = (req, res, next) => {
    const errors = validationResult(req);
    if(!errors.isEmpty()) {
        return res.status(400).json({errors: errors.array() });
    }
    next();
};

module.exports = {postBodyParams, validatePostBody};