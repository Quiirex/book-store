package com.bookstore.catalog.domain.model

import org.springframework.data.annotation.Id

data class LogMessage(
    @Id
    val timestamp: String? = null,
    val logType: String? = null,
    val url: String? = null,
    val correlationId: String? = null,
    val applicationName: String? = null,
    val message: String? = null
)

