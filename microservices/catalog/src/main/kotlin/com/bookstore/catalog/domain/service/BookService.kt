package com.bookstore.catalog.domain.service

import com.bookstore.catalog.domain.model.Book
import com.bookstore.catalog.domain.repository.BookRepository
import org.springframework.stereotype.Service
import reactor.core.publisher.Flux
import reactor.core.publisher.Mono

@Service
class BookService(private val bookRepository: BookRepository) {

    fun getAllBooks(): Flux<Book> = bookRepository.findAll()

    fun getBookById(id: String): Mono<Book> = bookRepository.findById(id)

    fun createBook(book: Book): Mono<Book> = bookRepository.save(book)

    fun updateBook(id: String, book: Book): Mono<Book> = bookRepository.save(book.copy(id = id))

    fun deleteBook(id: String): Mono<Void> = bookRepository.deleteById(id)
}