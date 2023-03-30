package com.bookstore.domain.model

import org.bson.types.ObjectId

class Book {
    var id: ObjectId? = null
    var title: String? = null
    var author: String? = null
    var yearOfPublication: Int? = null
    var isbn: String? = null
    var description: String? = null
    var genre: String? = null
    var language: String? = null
    var rating: Double? = null
    var format: String? = null
    var price: Double? = null
}