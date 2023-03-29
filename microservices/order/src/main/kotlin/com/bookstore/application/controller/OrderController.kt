package com.bookstore.application.controller

import com.bookstore.domain.model.Order
import com.bookstore.domain.repository.OrderRepository
import io.smallrye.mutiny.Uni
import org.bson.types.ObjectId
import org.slf4j.LoggerFactory
import javax.enterprise.context.RequestScoped
import javax.inject.Inject
import javax.ws.rs.*
import javax.ws.rs.core.Response
import javax.xml.bind.ValidationException

@Path("/api/order")
@Produces("application/json")
@Consumes("application/json")
@RequestScoped
class OrderController {

    private val logger = LoggerFactory.getLogger(javaClass)

    @Inject
    private lateinit var orderRepository: OrderRepository

    @GET
    @Path("/")
    fun getAllOrders(): Uni<List<Order>> {
        logger.info("Getting all orders...")
        return orderRepository.findAllOrders()
            .onFailure().invoke { e ->
                logger.error("Error getting all orders: ${e.message}", e)
                throw WebApplicationException(Response.Status.INTERNAL_SERVER_ERROR)
            }
            .onItem().transform { orders -> orders.toList() }
    }

    @GET
    @Path("/{id}")
    fun getOrderById(@PathParam("id") id: String): Uni<Order?> {
        logger.info("Getting order by ID: $id")
        return orderRepository.findOrderById(ObjectId(id))
            .onFailure().invoke { e ->
                logger.error("Error getting order by ID: $id, ${e.message}", e)
                throw WebApplicationException(Response.Status.INTERNAL_SERVER_ERROR)
            }
    }

    @POST
    @Path("/")
    fun createOrder(order: Order): Uni<Response> {
        if (order.orderNumber.isNullOrEmpty()) {
            throw ValidationException("Order must not be null or empty")
        }

        logger.info("Creating order...")
        return orderRepository.createOrder(order)
            .onFailure().invoke { e ->
                logger.error("Error creating order: ${e.message}", e)
                throw WebApplicationException(Response.Status.INTERNAL_SERVER_ERROR)
            }
            .onItem().transform { _ -> Response.status(Response.Status.CREATED).build() }
    }

    @PUT
    @Path("/{id}")
    fun updateOrder(@PathParam("id") id: String, order: Order): Uni<Response> {
        if (order.orderNumber.isNullOrEmpty()) {
            throw ValidationException("Order must not be null or empty")
        }
        logger.info("Updating order with ID: $id")
        return orderRepository.updateOrder(order)
            .onFailure().invoke { e ->
                logger.error("Error updating order with ID: $id, ${e.message}", e)
                throw WebApplicationException(Response.Status.INTERNAL_SERVER_ERROR)
            }
            .onItem().transform { _ -> Response.ok().build() }
    }

    @DELETE
    @Path("/{id}")
    fun deleteOrder(@PathParam("id") id: String): Uni<Response> {
        logger.info("Deleting order with ID: $id")
        return orderRepository.deleteOrder(ObjectId(id))
            .onFailure().invoke { e ->
                logger.error("Error deleting order with ID: $id, ${e.message}", e)
                throw WebApplicationException(Response.Status.INTERNAL_SERVER_ERROR)
            }
            .onItem().transform { _ -> Response.noContent().build() }
    }

}