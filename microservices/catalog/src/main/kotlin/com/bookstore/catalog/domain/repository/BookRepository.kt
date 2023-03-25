package com.bookstore.catalog.domain.repository

import com.bookstore.catalog.domain.model.Book
import org.springframework.data.mongodb.repository.ReactiveMongoRepository

interface BookRepository : ReactiveMongoRepository<Book, String>
