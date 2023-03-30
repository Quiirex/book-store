package com.bookstore.application.controller

import com.bookstore.domain.model.Order
import com.bookstore.domain.service.OrderService
import io.smallrye.mutiny.Uni
import org.slf4j.LoggerFactory
import javax.enterprise.context.RequestScoped
import javax.inject.Inject
import javax.ws.rs.*
import javax.ws.rs.core.Response

@Path("/api/order")
@Produces("application/json")
@Consumes("application/json")
@RequestScoped
class OrderController {

    private val logger = LoggerFactory.getLogger(javaClass)

    @Inject
    lateinit var orderService: OrderService

    @GET
    @Path("/")
    fun getAllOrders(): Uni<List<Order>> {
        return orderService.getAllOrders()
            .onFailure().invoke { e ->
                logger.error("Error getting all orders: ${e.message}", e)
                throw WebApplicationException(Response.Status.INTERNAL_SERVER_ERROR)
            }
    }

    @GET
    @Path("/{id}")
    fun getOrderById(@PathParam("id") id: String): Uni<Order?> {
        return orderService.getOrderById(id)
            .onFailure().invoke { e ->
                logger.error("Error getting order by ID: $id, ${e.message}", e)
                throw WebApplicationException(Response.Status.INTERNAL_SERVER_ERROR)
            }
    }

    @POST
    @Path("/")
    fun createOrder(order: Order): Uni<Order> {
        return orderService.createOrder(order)
            .onFailure().invoke { e ->
                logger.error("Error creating order: ${e.message}", e)
                throw WebApplicationException(Response.Status.INTERNAL_SERVER_ERROR)
            }
    }

    @PUT
    @Path("/{id}")
    fun updateOrder(@PathParam("id") id: String, order: Order): Uni<Order> {
        return orderService.updateOrder(id, order)
            .onFailure().invoke { e ->
                logger.error("Error updating order with ID: $id, ${e.message}", e)
                throw WebApplicationException(Response.Status.INTERNAL_SERVER_ERROR)
            }
    }

    @DELETE
    @Path("/{id}")
    fun deleteOrder(@PathParam("id") id: String): Uni<Boolean>? {
        return orderService.deleteOrder(id)
            ?.onFailure()!!.invoke { e ->
                logger.error("Error deleting order with ID: $id, ${e.message}", e)
                throw WebApplicationException(Response.Status.INTERNAL_SERVER_ERROR)
            }
    }

}