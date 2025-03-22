/* 
  📝 A Clean Approach to Using Express Validator - https://tinyurl.com/yhuwyafm
  📝 Introducción a Express Validator - https://tinyurl.com/n6csabt6
  📝 express-validator-example - https://tinyurl.com/mr4dyh97
  📝 UDEMY: Aprende a programar en Javascript desde cero con el curso mas completo de todos. - 
      33. Operador spread, rest y desestructuración 
*/

const { body, validationResult } = require('express-validator');

const genres = [
  'adventure',
  'classics',
  'fiction',
  'non-fiction',
  'mystery',
  'science fiction',
  'romance',
  'historical',
  'horror',
  'biography',
  'self-help',
  'thriller',
  'adventure',
  'young adult',
  'dystopian',
  'historical fiction',
  'poetry',
  'drama',
  'graphic novel',
  'classics',
  'cookbook',
  'true crime',
  'travel',
  'religion',
  'science',
  'philosophy',
  'art',
  'humor'
]

const postPutSharedRules = [
  body('title')
    .escape()
    .notEmpty()
    .withMessage('the title of the book is required')
    .isLowercase()
    .withMessage('titles name must be in lowercase')
    .bail(),
  body('author')
    .escape()
    .notEmpty()
    .withMessage('the authors name is required')
    .isLowercase()
    .withMessage('authors name must be in lowercase')
    .bail(),
  body('genre')
    .escape()
    .notEmpty()
    .withMessage('the genre field is required')
    .isIn(genres)
    .withMessage(`try one of the following genres: ${genres.join()}`)
    .isLowercase()
    .withMessage('please, enter the genre in lower case')
    .bail()
]

const postValidationRules = [
  ...postPutSharedRules
];

const putValidationRules = [
  ...postPutSharedRules
];

const validate = (req, res, next) => {
  const errors = validationResult(req);
  if (errors.isEmpty()) {
    return next();
  }
  return res.status(422).json({ errors: errors.array() });
};

module.exports = {
  postValidationRules,
  putValidationRules,
  validate
};