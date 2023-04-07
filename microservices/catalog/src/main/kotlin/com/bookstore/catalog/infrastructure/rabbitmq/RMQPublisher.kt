package com.bookstore.catalog.infrastructure.rabbitmq

import org.springframework.amqp.rabbit.core.RabbitTemplate
import org.springframework.beans.factory.annotation.Autowired
import org.springframework.beans.factory.annotation.Value
import org.springframework.stereotype.Service

@Service
class RMQPublisher @Autowired constructor(private val rabbitTemplate: RabbitTemplate?) {
    @Value("\${rabbitmq.exchange}")
    private val exchange: String? = null

    @Value("\${rabbitmq.routingkey}")
    private val routingKey: String? = null
    fun send(logMessage: String?) {
        rabbitTemplate?.convertAndSend(exchange!!, routingKey!!, logMessage!!)
    }
}

