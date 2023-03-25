package com.bookstore.catalog.domain.handler

import com.bookstore.catalog.application.controller.BookController
import com.bookstore.catalog.domain.model.Book
import org.slf4j.LoggerFactory
import org.springframework.http.HttpStatus
import org.springframework.http.ResponseEntity
import org.springframework.web.server.ResponseStatusException
import reactor.core.publisher.Flux
import reactor.core.publisher.Mono

class RequestHandler {
    private val logger = LoggerFactory.getLogger(BookController::class.java)
    fun handleInternalServerError(error: Throwable): Flux<Book> {
        logger.error("Internal server error", error)
        return Flux.error(ResponseStatusException(HttpStatus.INTERNAL_SERVER_ERROR, "Internal server error"))
    }

    fun handleNotFoundException(error: Throwable): Mono<ResponseEntity<Book>> {
        logger.warn("Not found error", error)
        return Mono.just(ResponseEntity.notFound().build())
    }

    fun handleBadRequest(error: Throwable): Mono<ResponseEntity<Book>> {
        logger.warn("Bad request error", error)
        return Mono.just(ResponseEntity.badRequest().build())
    }
}