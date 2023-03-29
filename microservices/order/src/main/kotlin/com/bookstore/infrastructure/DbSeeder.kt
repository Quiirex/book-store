package com.bookstore.infrastructure

import com.bookstore.domain.repository.OrderRepository
import javax.enterprise.context.ApplicationScoped
import javax.inject.Inject

@ApplicationScoped
class DbSeeder {

    @Inject
    lateinit var orderRepository: OrderRepository

    fun seed() {
        // TODO: Implement
    }
}