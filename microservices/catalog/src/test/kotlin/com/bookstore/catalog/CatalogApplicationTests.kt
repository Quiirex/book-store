package com.bookstore.catalog

import com.bookstore.catalog.application.controller.BookController
import com.bookstore.catalog.domain.model.Book
import com.bookstore.catalog.domain.service.BookService
import org.junit.jupiter.api.BeforeEach
import org.junit.jupiter.api.Test
import org.mockito.BDDMockito.given
import org.mockito.Mock
import org.mockito.MockitoAnnotations.initMocks
import org.springframework.boot.test.context.SpringBootTest
import org.springframework.http.ResponseEntity
import reactor.core.publisher.Flux
import reactor.core.publisher.Mono
import reactor.test.StepVerifier
import java.net.URI

@SpringBootTest
class CatalogApplicationTests {

    private lateinit var controller: BookController

    @Mock
    private lateinit var bookService: BookService

    @BeforeEach
    fun setUp() {
        initMocks(this)
        controller = BookController(bookService)
    }

    @Test
    fun `should return all books`() {
        // given
        val books = listOf(
            Book(
                "1",
                "Book 1",
                "Author 1",
                2022,
                "1234567890",
                "Description 1",
                "Fiction",
                "English",
                4.2,
                "Paperback",
                9.99
            ),
            Book(
                "2",
                "Book 2",
                "Author 2",
                2023,
                "0987654321",
                "Description 2",
                "Non-fiction",
                "Spanish",
                4.5,
                "Hardcover",
                14.99
            )
        )
        given(bookService.getAllBooks()).willReturn(Flux.fromIterable(books))

        // when
        val result = controller.getAllBooks()

        // then
        StepVerifier.create(result)
            .expectNextSequence(books)
            .verifyComplete()
    }

    @Test
    fun `should return a book by id`() {
        // given
        val book = Book(
            "1",
            "Book 1",
            "Author 1",
            2022,
            "1234567890",
            "Description 1",
            "Fiction",
            "English",
            4.2,
            "Paperback",
            9.99
        )
        given(bookService.getBookById("1")).willReturn(Mono.just(book))

        // when
        val result = controller.getBookById("1")

        // then
        StepVerifier.create(result)
            .expectNext(ResponseEntity.ok(book))
            .verifyComplete()
    }

    @Test
    fun `should return 404 when book id is not found`() {
        // given
        given(bookService.getBookById("1")).willReturn(Mono.empty())

        // when
        val result = controller.getBookById("1")

        // then
        StepVerifier.create(result)
            .expectNext(ResponseEntity.notFound().build())
            .verifyComplete()
    }

    @Test
    fun `should create a book`() {
        // given
        val book = Book(
            null,
            "Book 1",
            "Author 1",
            2022,
            "1234567890",
            "Description 1",
            "Fiction",
            "English",
            4.2,
            "Paperback",
            9.99
        )
        val createdBook = book.copy(id = "1")
        given(bookService.createBook(book)).willReturn(Mono.just(createdBook))

        // when
        val result = controller.createBook(book)

        // then
        StepVerifier.create(result)
            .expectNext(ResponseEntity.created(URI.create("/api/book/1")).body(createdBook))
            .verifyComplete()
    }

    @Test
    fun `should update a book`() {
        // given
        val book = Book(
            "1",
            "Book 1",
            "Author 1",
            2022,
            "1234567890",
            "Description 1",
            "Fiction",
            "English",
            4.2,
            "Paperback",
            9.99
        )
        val updatedBook = book.copy(title = "Updated Book Title")
        given(bookService.updateBook(book.id!!, updatedBook)).willReturn(Mono.just(updatedBook))

        // when
        val result = controller.updateBook(book.id!!, updatedBook)

        // then
        StepVerifier.create(result)
            .expectNext(ResponseEntity.ok(updatedBook))
            .verifyComplete()
    }

    @Test
    fun `should return 404 when updating a book that does not exist`() {
        // given
        val book = Book(
            "1",
            "Book 1",
            "Author 1",
            2022,
            "1234567890",
            "Description 1",
            "Fiction",
            "English",
            4.2,
            "Paperback",
            9.99
        )
        val updatedBook = book.copy(title = "Updated Book Title")
        given(bookService.updateBook(book.id!!, updatedBook)).willReturn(Mono.empty())

        // when
        val result = controller.updateBook(book.id!!, updatedBook)

        // then
        StepVerifier.create(result)
            .expectNext(ResponseEntity.notFound().build())
            .verifyComplete()
    }

    @Test
    fun `should delete a book`() {
        // given
        val bookId = "1"
        given(bookService.deleteBook(bookId)).willReturn(Mono.empty())

        // when
        val result = controller.deleteBook(bookId)

        // then
        StepVerifier.create(result)
            .expectNext(ResponseEntity.noContent().build())
            .verifyComplete()
    }

    @Test
    fun `should return 204 when deleting a book that does not exist`() {
        // given
        val bookId = "1"
        given(bookService.deleteBook(bookId)).willReturn(Mono.empty())

        // when
        val result = controller.deleteBook(bookId)

        // then
        StepVerifier.create(result)
            .expectNext(ResponseEntity.noContent().build())
            .verifyComplete()
    }

}
