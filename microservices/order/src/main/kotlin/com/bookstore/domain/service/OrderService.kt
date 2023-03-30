package com.bookstore.domain.service

import com.bookstore.domain.model.Order
import com.bookstore.infrastructure.repository.OrderRepository
import io.smallrye.mutiny.Uni
import org.bson.types.ObjectId
import org.slf4j.LoggerFactory
import javax.enterprise.context.ApplicationScoped
import javax.inject.Inject
import javax.xml.bind.ValidationException

@ApplicationScoped
class OrderService {

    private val logger = LoggerFactory.getLogger(javaClass)

    @Inject
    lateinit var orderRepository: OrderRepository

    fun getAllOrders(): Uni<List<Order>> {
        logger.info("Getting all orders...")
        return orderRepository.findAllOrders()
            .onFailure().invoke { e ->
                logger.error("Error getting all orders: ${e.message}", e)
            }
            .onItem().transform { orders -> orders.toList() }
    }

    fun getOrderById(id: String): Uni<Order?> {
        logger.info("Getting order by ID: $id")
        return orderRepository.findOrderById(ObjectId(id))
            .onFailure().invoke { e ->
                logger.error("Error getting order by ID: $id, ${e.message}", e)
            }
    }

    fun createOrder(order: Order): Uni<Order> {
        if (order.orderNumber.isNullOrEmpty()) {
            throw ValidationException("Order must not be null or empty")
        }

        logger.info("Creating order...")
        return orderRepository.createOrder(order)
            .onFailure().invoke { e ->
                logger.error("Error creating order: ${e.message}", e)
            }
    }

    fun updateOrder(id: String, order: Order): Uni<Order> {
        if (order.orderNumber.isNullOrEmpty()) {
            throw ValidationException("Order must not be null or empty")
        }
        logger.info("Updating order with ID: $id")
        return orderRepository.updateOrder(order)
            .onFailure().invoke { e ->
                logger.error("Error updating order with ID: $id, ${e.message}", e)
            }
    }

    fun deleteOrder(id: String): Uni<Boolean>? {
        logger.info("Deleting order with ID: $id")
        return orderRepository.deleteOrder(ObjectId(id))
            .onFailure().invoke { e ->
                logger.error("Error deleting order with ID: $id, ${e.message}", e)
            }
    }
}