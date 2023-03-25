package com.bookstore.catalog.application.controller

import com.bookstore.catalog.domain.model.Book
import com.bookstore.catalog.domain.service.BookService
import org.slf4j.LoggerFactory
import org.springframework.http.HttpStatus
import org.springframework.http.MediaType
import org.springframework.http.ResponseEntity
import org.springframework.web.bind.annotation.*
import reactor.core.publisher.Flux
import reactor.core.publisher.Mono
import java.util.*

@RestController
@RequestMapping("/api/book")
class BookController(private val bookService: BookService) {

    private val logger = LoggerFactory.getLogger(BookController::class.java)

    @GetMapping
    fun getAllBooks(): Flux<Book> {
        logger.info("[GET] All books")
        return bookService.getAllBooks()
    }

    @GetMapping("/{id}")
    fun getBookById(@PathVariable id: String): Mono<ResponseEntity<Book>> {
        logger.info("[GET] Book by id: $id")
        return bookService.getBookById(id)
            .map { book -> ResponseEntity.ok(book) }
            .defaultIfEmpty(ResponseEntity.notFound().build())
    }

    @PostMapping
    fun createBook(@RequestBody book: Book): Mono<Book> {
        logger.info("[POST] Book: $book")
        return bookService.createBook(book)
    }

    @PutMapping("/{id}")
    fun updateBook(@PathVariable id: String, @RequestBody book: Book): Mono<ResponseEntity<Book>> {
        logger.info("[PUT] Book: $book")
        return bookService.updateBook(id, book)
            .map { updatedBook -> ResponseEntity.ok(updatedBook) }
            .defaultIfEmpty(ResponseEntity.notFound().build())
    }

    @DeleteMapping("/{id}")
    fun deleteBook(@PathVariable id: String): Mono<ResponseEntity<Void>> {
        logger.info("[DELETE] Book by id: $id")
        return bookService.deleteBook(id)
            .map { ResponseEntity<Void>(HttpStatus.OK) }
            .defaultIfEmpty(ResponseEntity.notFound().build())
    }

    @GetMapping(value = ["/stream"], produces = [MediaType.APPLICATION_NDJSON_VALUE])
    fun streamAllBooks(): Flux<Book> {
        logger.info("[STREAM] All books")
        return bookService.getAllBooks()
    }
}


