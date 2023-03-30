package com.bookstore.infrastructure.repository

import com.bookstore.domain.model.Order
import io.quarkus.mongodb.panache.kotlin.reactive.ReactivePanacheMongoRepository
import org.bson.types.ObjectId
import javax.enterprise.context.ApplicationScoped

@ApplicationScoped
class OrderRepository : ReactivePanacheMongoRepository<Order> {
    fun findAllOrders() = listAll()
    fun findOrderById(id: ObjectId) = findById(id)
    fun createOrder(order: Order) = persist(order)
    fun updateOrder(order: Order) = update(order)
    fun deleteOrder(id: ObjectId) = deleteById(id)
}