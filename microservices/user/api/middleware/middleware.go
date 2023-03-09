package middleware

import (
	"net/http"
	jwttoken "user-service/infrastructure/jwt"
	"user-service/infrastructure/response"

	"github.com/gin-gonic/gin"
)

func AuthMiddleware() gin.HandlerFunc {
	return func(c *gin.Context) {
		err := jwttoken.TokenValid(c.Request)
		if err != nil {
			response.ResponseError(c, err.Error(), http.StatusUnauthorized)
			c.Abort()
			return
		}

		c.Next()
	}
}

func CORSMiddleware() gin.HandlerFunc {
	return func(c *gin.Context) {
		c.Writer.Header().Set("Access-Control-Allow-Origin", "*")
		c.Writer.Header().Set("Access-Control-Allow-Credentials", "true")
		c.Writer.Header().Set("Access-Control-Allow-Headers", "Content-Type,Content-Length")
		c.Writer.Header().Set("Access-Control-Allow-Method", "POST, GET, DELETE, PUT")

		if c.Request.Method == "OPTIONS" {
			c.AbortWithStatus(204)
			return
		}

		c.Next()
	}
}
