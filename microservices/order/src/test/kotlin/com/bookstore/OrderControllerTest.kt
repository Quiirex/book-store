package com.bookstore

import com.bookstore.application.controller.OrderController
import com.bookstore.domain.model.Book
import com.bookstore.domain.model.Order
import com.bookstore.domain.service.OrderService
import io.quarkus.test.junit.QuarkusTest
import io.smallrye.mutiny.Uni
import org.bson.types.ObjectId
import org.junit.jupiter.api.Assertions.assertEquals
import org.junit.jupiter.api.Assertions.assertNotNull
import org.junit.jupiter.api.BeforeEach
import org.junit.jupiter.api.Test
import org.mockito.InjectMocks
import org.mockito.Mock
import org.mockito.Mockito.`when`
import org.mockito.MockitoAnnotations
import java.time.LocalDate

@QuarkusTest
class OrderControllerTest {

    @Mock
    lateinit var orderService: OrderService

    @InjectMocks
    lateinit var orderController: OrderController

    @BeforeEach
    fun setUp() {
        MockitoAnnotations.openMocks(this)
    }

    @Test
    fun testGetAllOrders() {
        // given
        val orders = listOf(
            Order().apply {
                id = ObjectId("614f4d10fc4e3e4cc0620c09")
                orderDate = LocalDate.now()
                orderNumber = "Order 1"
                orderStatus = "Order Status 1"
                orderTotal = 100.0
                orderList = listOf(Book())
                shippingAddress = "Shipping Address 1"
                customerId = "Customer Id 1"
            },
            Order().apply {
                id = ObjectId("614f4d10fc4e3e4cc0620c0c")
                orderDate = LocalDate.now()
                orderNumber = "Order 2"
                orderStatus = "Order Status 2"
                orderTotal = 100.0
                orderList = listOf(Book())
                shippingAddress = "Shipping Address 2"
                customerId = "Customer Id 2"
            }
        )
        `when`(orderService.getAllOrders()).thenReturn(Uni.createFrom().item(orders))

        // when
        val result: Uni<List<Order>> = orderController.getAllOrders()

        // then
        assertNotNull(result)
        assertEquals(orders, result.await().indefinitely())
    }

    @Test
    fun testGetOrderById() {
        // given
        val orderId = "1"
        val order = Order().apply {
            id = ObjectId("614f4d10fc4e3e4cc0620c09")
            orderDate = LocalDate.now()
            orderNumber = "Order 1"
            orderStatus = "Order Status 1"
            orderTotal = 100.0
            orderList = listOf(Book())
            shippingAddress = "Shipping Address 1"
            customerId = "Customer Id 1"
        }
        `when`(orderService.getOrderById(orderId)).thenReturn(Uni.createFrom().item(order))

        // when
        val result: Uni<Order?> = orderController.getOrderById(orderId)

        // then
        assertNotNull(result)
        assertEquals(order, result.await().indefinitely())
    }

    @Test
    fun testCreateOrder() {
        // given
        val order = Order().apply {
            id = ObjectId("614f4d10fc4e3e4cc0620c09")
            orderDate = LocalDate.now()
            orderNumber = "Order 1"
            orderStatus = "Order Status 1"
            orderTotal = 100.0
            orderList = listOf(Book())
            shippingAddress = "Shipping Address 1"
            customerId = "Customer Id 1"
        }
        `when`(orderService.createOrder(order)).thenReturn(Uni.createFrom().item(order))

        // when
        val result: Uni<Order> = orderController.createOrder(order)

        // then
        assertNotNull(result)
        assertEquals(order, result.await().indefinitely())
    }

    @Test
    fun testUpdateOrder() {
        // given
        val orderId = "1"
        val order = Order().apply {
            id = ObjectId("614f4d10fc4e3e4cc0620c09")
            orderDate = LocalDate.now()
            orderNumber = "Order 1"
            orderStatus = "Order Status 1"
            orderTotal = 100.0
            orderList = listOf(Book())
            shippingAddress = "Shipping Address 1"
            customerId = "Customer Id 1"
        }
        `when`(orderService.updateOrder(orderId, order)).thenReturn(Uni.createFrom().item(order))

        // when
        val result: Uni<Order> = orderController.updateOrder(orderId, order)

        // then
        assertNotNull(result)
        assertEquals(order, result.await().indefinitely())
    }

    @Test
    fun testDeleteOrder() {
        // given
        val orderId = "614f4d10fc4e3e4cc0620c09"
        `when`(orderService.deleteOrder(orderId)).thenReturn(Uni.createFrom().item(true))

        // when
        val result: Uni<Boolean>? = orderController.deleteOrder(orderId)

        // then
        assertNotNull(result)
        assertEquals(true, result?.await()?.indefinitely())
    }

}