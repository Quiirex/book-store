package com.bookstore.catalog

import io.swagger.v3.oas.annotations.OpenAPIDefinition
import io.swagger.v3.oas.annotations.info.Info
import org.springframework.amqp.core.AmqpTemplate
import org.springframework.amqp.rabbit.connection.ConnectionFactory
import org.springframework.amqp.rabbit.core.RabbitTemplate
import org.springframework.amqp.support.converter.Jackson2JsonMessageConverter
import org.springframework.amqp.support.converter.MessageConverter
import org.springframework.boot.autoconfigure.SpringBootApplication
import org.springframework.boot.runApplication
import org.springframework.context.annotation.Bean

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

@Bean
fun messageConverter(): MessageConverter {
    return Jackson2JsonMessageConverter()
}

@Bean
fun template(connectionFactory: ConnectionFactory?): AmqpTemplate {
    val template = RabbitTemplate(connectionFactory!!)
    template.messageConverter = messageConverter()
    return template
}