import express from 'express';
import catalog_controller from '../controllers/catalog-controller';
import user_controller from '../controllers/user-controller';
// import order-controller from '../controllers/order-controller';
const router = express.Router();

// catalog routes
router.get('/book', catalog_controller.getBooks);
router.get('/book/:id', catalog_controller.getBook);
router.put('/book/:id', catalog_controller.updateBook);
router.delete('/book/:id', catalog_controller.deleteBook);
router.post('/book', catalog_controller.createBook);

// user routes
router.get('/user', user_controller.getUsers);
router.get('/user/:id', user_controller.getUser);
router.put('/user/:id', user_controller.updateUser);
router.delete('/user/:id', user_controller.deleteUser);
router.post('/user/login', user_controller.loginUser);
router.post('/user', user_controller.registerUser);

// // order routes
// router.get('/orders', controller.getOrders);
// router.get('/orders/:id', controller.getOrder);
// router.put('/orders/:id', controller.updateOrder);
// router.delete('/orders/:id', controller.deleteOrder);
// router.post('/orders', controller.addOrder);

export = router;
