package com.bookstore.domain.model

import io.quarkus.mongodb.panache.common.MongoEntity
import org.bson.types.ObjectId
import java.time.LocalDate

@MongoEntity(collection = "Orders")
class Order {
    var id: ObjectId? = null
    var orderDate: LocalDate? = null
    var orderNumber: String? = null
    var orderStatus: String? = null
    var orderTotal: Double? = null
    var orderList: List<Book>? = null
    var shippingAddress: String? = null
    var customerId: String? = null
}