package com.bookstore.catalog

import io.swagger.v3.oas.annotations.OpenAPIDefinition
import io.swagger.v3.oas.annotations.info.Info
import org.springframework.boot.autoconfigure.SpringBootApplication
import org.springframework.boot.runApplication

@SpringBootApplication
@OpenAPIDefinition(
    info = Info(
        title = "Catalog Service",
        version = "1.0",
        description = "Catalog Service REST API for Book management in the Bookstore",
        license = io.swagger.v3.oas.annotations.info.License(name = "Apache 2.0", url = "https://springdoc.org")
    )
)
class CatalogApplication

fun main(args: Array<String>) {
    runApplication<CatalogApplication>(*args)
}
