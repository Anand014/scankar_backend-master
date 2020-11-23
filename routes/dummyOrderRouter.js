const express = require('express');
const {createDummyOrder,adduserDummyOrder,getDummyorder,deleteDummyOrder}
=  require('../controllers/dummyOrder');


const router = express.Router();

router.route('/createDummyOrder').post(createDummyOrder);
router.route('/adduserDummyOrder').put(adduserDummyOrder);

router
  .route('/:id')
  .get(getDummyorder)
  .delete(deleteDummyOrder)

module.exports = router;