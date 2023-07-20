const Router = require('express');
const { getEvents, createEvent, updateEvent, deleteEvent } = require('../controllers/events');
const { validateJWT } = require('../middlewares/validar-jwt');
const { check } = require('express-validator');
const { validarCampos } = require('../middlewares/validar-campos');
const { isDate } = require('../helpers/isDate');
const router = Router()

router.use(validateJWT);

router.get('/',getEvents);

router.post('/',[
    check('title','The title is required').not().isEmpty(),
    check('start','Start date required').custom(isDate),
    check('end','End date required').custom(isDate),
    validarCampos
],createEvent);

router.put('/:id', [
    check('title','The title is required').not().isEmpty(),
    check('start','Start date required').custom(isDate),
    check('end','End date required').custom(isDate),
    validarCampos
], updateEvent);

router.delete('/:id',deleteEvent);

module.exports = router;