/**
 * User / auth routes
 * Host /api/auth
 */

const {Router} = require('express');
const {check} = require('express-validator');
const router = Router();
const {newUser,renewToken,loginUser} = require('../controllers/auth');
const { validarCampos } = require('../middlewares/validar-campos');
const { validateJWT } = require('../middlewares/validar-jwt');


router.post(
    '/new',
    [
        check('name','Name is required').not().isEmpty(),
        check('email','Email is required').isEmail(),
        check('password','Password is must contain at least 6 characters').isLength({min:6}),
        validarCampos
    ],
    newUser)

router.post(
    '/',
    [ 
        check('email','Email is required').isEmail(),
        check('password','Password is must contain at least 6 characters').isLength({min:6}),
        validarCampos
    ],
    loginUser)

router.get('/renew',validateJWT,renewToken)

module.exports = router; 