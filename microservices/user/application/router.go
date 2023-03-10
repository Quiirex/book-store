package api

import (
	"user-service/application/middleware"
	"user-service/domain/handler"
	"user-service/domain/repository"
	"user-service/domain/service"

	"github.com/gin-gonic/gin"
	"github.com/jinzhu/gorm"
)

func SetupRouter(db *gorm.DB) *gin.Engine {

	router := gin.Default()

	//Register User Repo
	userRepo := repository.NewUserRepository(db)
	userService := service.NewUserService(userRepo)
	userHandler := handler.NewUserHandler(userService)

	user := router.Group("api/user")
	{
		user.GET("/", middleware.CORSMiddleware(), userHandler.GetAllUser)
		user.GET("/:user_id", middleware.AuthMiddleware(), middleware.CORSMiddleware(), userHandler.GetDetailUser)
		user.POST("/register", middleware.CORSMiddleware(), userHandler.RegisterUser)
		user.PUT("/:user_id", middleware.CORSMiddleware(), userHandler.UpdateUser)
		user.DELETE("/:user_id", middleware.CORSMiddleware(), userHandler.DeleteUser)
		user.POST("/login", middleware.CORSMiddleware(), userHandler.Login)
	}

	return router

}
