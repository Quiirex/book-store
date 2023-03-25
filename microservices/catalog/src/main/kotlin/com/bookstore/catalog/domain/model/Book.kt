package com.bookstore.catalog.domain.model

import org.springframework.data.annotation.Id
import org.springframework.data.mongodb.core.mapping.Document

@Document("Books")
data class Book(
    @Id
    val id: String?,
    val title: String,
    val author: String,
    val yearOfPublication: Int,
    val isbn: String,
    val description: String,
    val genre: String,
    val language: String,
    val rating: Double,
    val format: String,
    val price: Double,
)