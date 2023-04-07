package com.bookstore.catalog.infrastructure.utils

import com.bookstore.catalog.domain.model.LogMessage
import org.springframework.stereotype.Service

@Service
class LogMessageConverter {
    fun toString(logMessage: LogMessage): String {
        return ((((((logMessage.timestamp + " "
                + logMessage.logType) + " "
                + logMessage.url) + " "
                + "Correlation: "
                + logMessage.correlationId) + " ["
                + logMessage.applicationName) + "] "
                + "- <* "
                + logMessage.message) + " "
                + "*>")
    }
}

