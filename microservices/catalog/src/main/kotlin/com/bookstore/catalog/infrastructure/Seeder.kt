package com.bookstore.catalog.infrastructure

import com.bookstore.catalog.domain.model.Book
import com.bookstore.catalog.domain.repository.BookRepository
import org.springframework.beans.factory.annotation.Autowired
import org.springframework.boot.CommandLineRunner
import org.springframework.data.mongodb.core.ReactiveMongoOperations
import org.springframework.stereotype.Component
import reactor.core.publisher.Flux
import reactor.core.publisher.Mono

@Component
class Seeder(
    @Autowired val bookRepository: BookRepository,
    @Autowired val reactiveMongoOperations: ReactiveMongoOperations
) : CommandLineRunner {

    val booksFlux = Flux.just(
        Book(
            null,
            "The Lord of the Rings",
            "J.R.R. Tolkien",
            1954,
            "978-0544003415",
            "The Lord of the Rings is an epic high fantasy novel written by English author and scholar J. R. R. Tolkien. The story began as a sequel to Tolkien's 1937 fantasy novel The Hobbit, but eventually developed into a much larger work. Written in stages between 1937 and 1949, The Lord of the Rings is one of the best-selling novels ever written, with over 150 million copies sold.",
            "Fantasy",
            "English",
            4.5,
            "Paperback",
            19.99
        ),
        Book(
            null,
            "Harry Potter and the Philosopher's Stone",
            "J.K. Rowling",
            1997,
            "978-0747532699",
            "Harry Potter and the Philosopher's Stone is a fantasy novel written by British author J. K. Rowling. The first novel in the Harry Potter series and Rowling's debut novel, it follows Harry Potter, a young wizard who discovers his magical heritage on his eleventh birthday, when he receives a letter of acceptance to Hogwarts School of Witchcraft and Wizardry. Harry makes close friends and a few enemies during his first year at the school, and with the help of his friends, Harry faces an attempted comeback by the dark wizard Lord Voldemort, who killed Harry's parents, but failed to kill Harry when he was just 15 months old.",
            "Fantasy",
            "English",
            4.5,
            "Paperback",
            19.99
        ),
        Book(
            null,
            "The Hobbit",
            "J.R.R. Tolkien",
            1937,
            "978-0547928227",
            "The Hobbit, or There and Back Again is a children's fantasy novel by English author J. R. R. Tolkien. It was published on 21 September 1937 to wide critical acclaim, being nominated for the Carnegie Medal and awarded a prize from the New York Herald Tribune for best juvenile fiction. The book remains popular and is recognized as a classic in children's literature.",
            "Fantasy",
            "English",
            4.5,
            "Paperback",
            19.99
        ),
        Book(
            null,
            "The Lion, the Witch and the Wardrobe",
            "C.S. Lewis",
            1950,
            "978-0066235670",
            "The Lion, the Witch and the Wardrobe is a fantasy novel for children by C. S. Lewis, published by Geoffrey Bles in 1950. It is the first published and best known of seven novels in The Chronicles of Narnia (1950–1956). It is considered a classic of children's literature and is the author's best-known work, having sold over 100 million copies in 47 languages.",
            "Fantasy",
            "English",
            4.5,
            "Paperback",
            19.99
        ),
        Book(
            null,
            "The Hitchhiker's Guide to the Galaxy",
            "Douglas Adams",
            1979,
            "978-0345391803",
            "The Hitchhiker's Guide to the Galaxy is a comedy science fiction series created by Douglas Adams. Originally a radio comedy broadcast on BBC Radio 4 in 1978, it was later adapted to other formats, including stage shows, novels, comic books, a 1981 TV series, a 1984 video game, and 2005 feature film. The series follows the travails of Arthur Dent and his friend Ford Prefect, who travel through space aided by a computer called Deep Thought and the Babel Fish, a translation device that renders all other languages as \"English, with the words all jumbled up\".",
            "Science Fiction",
            "English",
            4.5,
            "Paperback",
            19.99
        ),
        Book(
            null,
            "The Game of Thrones",
            "George R.R. Martin",
            1996,
            "978-0553593716",
            "A Song of Ice and Fire is a series of epic fantasy novels by the American novelist and screenwriter George R. R. Martin. He began the first volume of the series, A Game of Thrones, in 1991, and it was published in 1996. Martin, who initially envisioned the series as a trilogy, has published five out of a planned seven volumes. The most recent volume, A Dance with Dragons, was published on 12 July 2011.",
            "Fantasy",
            "English",
            4.5,
            "Paperback",
            19.99
        ),
    )

    override fun run(vararg args: String?) {
        configureDatabase()
    }

    private fun configureDatabase() {
        reactiveMongoOperations.collectionExists(Book::class.java)
            .flatMap { exists ->
                if (exists) {
                    Mono.empty()
                } else {
                    reactiveMongoOperations.createCollection(Book::class.java)
                }
            }
            .thenMany(bookRepository.count())
            .flatMap { count ->
                if (count > 0) {
                    Mono.empty()
                } else {
                    booksFlux.flatMap {
                        bookRepository.save(it)
                    }
                }
            }
            .subscribe(
                { println(it) },
                { error -> println(error) },
                { println("Database setup complete.") }
            )
    }
}