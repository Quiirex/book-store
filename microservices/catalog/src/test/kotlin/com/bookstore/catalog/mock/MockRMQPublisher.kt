package com.bookstore.catalog.mock

import com.bookstore.catalog.infrastructure.rabbitmq.RMQPublisher

class MockRMQPublisher : RMQPublisher(null) {
    var logMessage: String? = null
    override fun send(logMessage: String?) {
        this.logMessage = logMessage
    }
}