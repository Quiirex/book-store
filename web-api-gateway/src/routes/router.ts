import express from 'express';
import catalog_controller from '../controllers/catalog.controller';
import user_controller from '../controllers/user.controller';
import order_controller from '../controllers/order.controller';
import review_controller from '../controllers/review.controller';
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

// order routes
router.get('/order', order_controller.getOrders);
router.get('/order/:id', order_controller.getOrder);
router.put('/order/:id', order_controller.updateOrder);
router.delete('/order/:id', order_controller.deleteOrder);
router.post('/order', order_controller.createOrder);

// review routes
router.get('/review/:id', review_controller.getReviewsByAuthorId);
router.delete('/review/:id', review_controller.deleteReview);
router.post('/review', review_controller.createReview);
router.put('/review/:id', review_controller.updateReview);

export = router;
