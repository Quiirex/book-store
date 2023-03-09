package response

import (
	"net/http"

	"github.com/gin-gonic/gin"
)

type ResponseOKWithDataModel struct {
	Code    int         `json:"code"`
	Data    interface{} `json:"data"`
	Message string      `json:"message"`
}

type ResponseOKModel struct {
	Code    int    `json:"code"`
	Message string `json:"message"`
}

type ResponseErrorModel struct {
	Code    int    `json:"code"`
	Message string `json:"message"`
}

type ResponseErrorCustomModel struct {
	Code    int         `json:"code"`
	Message interface{} `json:"message"`
}

func ResponseOKWithData(c *gin.Context, data interface{}) {
	response := ResponseOKWithDataModel{
		Code:    1000,
		Data:    data,
		Message: "OK",
	}

	c.JSON(http.StatusOK, response)
}

func ResponseCreated(c *gin.Context, data interface{}) {
	response := ResponseOKWithDataModel{
		Code:    1000,
		Data:    data,
		Message: "Created",
	}

	c.JSON(http.StatusCreated, response)
}

func ResponseOK(c *gin.Context, message string) {
	response := ResponseOKModel{
		Code:    1000,
		Message: message,
	}

	c.JSON(http.StatusOK, response)
}

func ResponseError(c *gin.Context, err string, code int) {
	response := ResponseErrorModel{
		Code:    99,
		Message: err,
	}

	c.JSON(code, response)
}

func ResponseCustomError(c *gin.Context, err interface{}, code int) {
	response := ResponseErrorCustomModel{
		Code:    99,
		Message: err,
	}

	c.JSON(code, response)
}
