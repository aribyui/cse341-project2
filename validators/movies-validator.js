/* 
  📝 A Clean Approach to Using Express Validator - https://tinyurl.com/yhuwyafm
  📝 Introducción a Express Validator - https://tinyurl.com/n6csabt6
  📝 express-validator-example - https://tinyurl.com/mr4dyh97
  📝 UDEMY: Aprende a programar en Javascript desde cero con el curso mas completo de todos. - 
      33. Operador spread, rest y desestructuración 
*/

const { body, validationResult } = require('express-validator');

const movieGenres = [
  'action',
  'adventure',
  'animation',
  'biography',
  'comedy',
  'crime',
  'documentary',
  'drama',
  'family',
  'fantasy',
  'history',
  'horror',
  'music',
  'mystery',
  'romance',
  'sci-fi',
  'thriller',
  'war',
  'western',
  'musical',
  'sport',
  'crime drama',
  'psychological',
  'superhero',
  'martial arts',
  'coming of age',
  'epic'
];

const contentRating = [
  'g',
  'pg',
  'pg-13',
  'r',
  'nc-17',
  'tv-y',
  'tv-y7',
  'tv-g',
  'tv-pg',
  'tv-14',
  'tv-ma',
  'unrated',
  'not-rated',
  'approved',
  '18',
  'a'
]

const postPutSharedRules = [
  body('title')
    .escape()
    .notEmpty()
    .withMessage('the movie title is required')
    .isLowercase()
    .withMessage('the title must be in lowercase')
    .bail(),
  body('director')
    .escape()
    .notEmpty()
    .withMessage('the director name is required')
    .isLowercase()
    .withMessage('the director name must be in lowercase')
    .bail(),
  body('genre')
    .escape()
    .notEmpty()
    .withMessage('the genre field is required')
    .isIn(movieGenres)
    .withMessage(`try one of the following genres: ${movieGenres.join()}`)
    .isLowercase()
    .withMessage('please, enter the genre in lower case')
    .bail(),
  body('releaseDate')
    .escape()
    .notEmpty()
    .withMessage('the movie release date is required')
    .isDate()
    .withMessage('The release date must be in the format YYYY-MM-DD')
    .bail(),
  body('contentRating')
    .escape()
    .notEmpty()
    .withMessage('the movie content rating is required')
    .isIn(contentRating)
    .withMessage(`the content rating must be one of the following: ${contentRating.join()}`)
    .isLowercase()
    .withMessage('the movie rating must be in lowercase with the exception of numbers and dashes')
    .bail(),
  body('duration')
    .escape()
    .notEmpty()
    .withMessage('the movie duration is required')
    .isInt({min: 1, max: 400})
    .withMessage('the movie duration must be integer numbers and in minutes format (e.g. 117, 135, etc)')
    .bail(),
  body('rating')
    .escape()
    .notEmpty()
    .withMessage('the movie rating is required')
    .isFloat({ min: 0, max: 10 })
    .withMessage('the movie rating must be in decimals between 0 and 10')
    .bail(),
  body('description')
    .escape()
    .notEmpty()
    .withMessage('the movie description is required')
    .isLowercase()
    .withMessage('the movie description must be in lowercase')
    .bail()
];

const validate = (req, res, next) => {
  const errors = validationResult(req);
  if (errors.isEmpty()) {
    return next();
  }
  return res.status(422).json({ errors: errors.array() });
};

module.exports = { postPutSharedRules, validate };