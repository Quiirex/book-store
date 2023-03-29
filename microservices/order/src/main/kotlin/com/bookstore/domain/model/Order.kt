package com.bookstore.domain.model

import io.quarkus.mongodb.panache.common.MongoEntity
import org.bson.types.ObjectId
import java.time.LocalDate

@MongoEntity(collection = "Orders")
class Order {
    val id: ObjectId? = null
    val orderDate: LocalDate? = null
    val orderNumber: String? = null
    val orderStatus: String? = null
    val orderTotal: Double? = null
    val orderList: List<Book>? = null
    val shippingAddress: String? = null
    val customerId: String? = null
}