const express = require('express');
const {
  getAllUsers,
  createUser,
  getSingleUser,
  updateUser,
  deleteUser,
  subscription,
  endusersubscription,
  getSingleUsercategory,
  getSingleUsercategoryitm
} = require('../controllers/userController');
const { protect, authorize } = require('../middleware/auth');

const router = express.Router();

router.route('/').get(getAllUsers).post(createUser);
router.route('/notifications/subscribe').post(subscription);
router.route('/enduser/notifications/subscribe').post(endusersubscription);
router.route('/endurlupdate').put(updateUser);
router.route('/getcategory/:id').get(getSingleUsercategory);
router.route('/category/:id/:name').get(getSingleUsercategoryitm);

router.route('/:id').get(getSingleUser).delete(deleteUser);

module.exports = router;
