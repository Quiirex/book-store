package test

import (
	"bytes"
	"encoding/json"
	"net/http"
	"net/http/httptest"
	"testing"
	"user-service/domain/entity"
	"user-service/domain/handler"
	"user-service/infrastructure/response"

	"github.com/gin-gonic/gin"
	"github.com/stretchr/testify/assert"
)

func TestRegisterUserResponse(t *testing.T) {
	// Create mock user service
	userService := &MockUserService{}

	// Create user handler with mock user service
	userHandler := handler.NewUserHandler(userService)

	// Create Gin router and register the user handler
	router := gin.New()
	router.POST("/register", userHandler.RegisterUser)

	// Create request payload
	payload := &entity.ReqisterViewModel{
		FirstName: "Janez",
		LastName:  "Novak",
		Email:     "Janez.Novak@example.com",
		Password:  "password123",
		Address:   "Slovenska cesta 32, 2000 Maribor",
	}
	jsonPayload, _ := json.Marshal(payload)

	// Send HTTP POST request to the router with request payload
	req, _ := http.NewRequest("POST", "/register", bytes.NewBuffer(jsonPayload))
	w := httptest.NewRecorder()
	router.ServeHTTP(w, req)

	// Verify the response
	assert.Equal(t, 201, w.Code)
	assert.Equal(t, "application/json; charset=utf-8", w.Header().Get("Content-Type"))

	// Decode the response body into a ResponseOKWithDataModel
	var responseBody response.ResponseOKWithDataModel
	err := json.Unmarshal(w.Body.Bytes(), &responseBody)
	assert.Nil(t, err)

	// Verify that the response code, message and data are correct
	assert.Equal(t, 1000, responseBody.Code)
	assert.Equal(t, "Created", responseBody.Message)

	// Verify that the response data is not empty
	assert.Equal(t, "Janez", responseBody.Data.(map[string]interface{})["first_name"])
	assert.Equal(t, "Novak", responseBody.Data.(map[string]interface{})["last_name"])
	assert.Equal(t, "Janez.Novak@example.com", responseBody.Data.(map[string]interface{})["email"])
	assert.Equal(t, "Slovenska cesta 32, 2000 Maribor", responseBody.Data.(map[string]interface{})["address"])
}

func TestGetAllUserResponse(t *testing.T) {
	// Create mock user service
	// Create mock user service
	userService := &MockUserService{
		users: []entity.User{
			{ID: 1, FirstName: "Janez", LastName: "Novak", Email: "Janez.Novak@gmail.com", Address: "123 Main St"},
			{ID: 2, FirstName: "Jane", LastName: "Smith", Email: "jane.smith@gmail.com", Address: "456 Oak Ave"},
		},
		nextID: 3,
	}

	// Create user handler with mock user service
	userHandler := handler.NewUserHandler(userService)

	// Create Gin router and register the user handler
	router := gin.New()
	router.GET("/", userHandler.GetAllUser)

	// Send HTTP GET request to the router
	req, _ := http.NewRequest("GET", "/", nil)
	w := httptest.NewRecorder()
	router.ServeHTTP(w, req)

	// Verify the response
	assert.Equal(t, 200, w.Code)
	assert.Equal(t, "application/json; charset=utf-8", w.Header().Get("Content-Type"))

	// Verify the response body
	var response response.ResponseOKWithDataModel
	err := json.Unmarshal(w.Body.Bytes(), &response)
	assert.NoError(t, err)

	assert.Equal(t, 1000, response.Code)
	assert.Equal(t, "OK", response.Message)

	users := response.Data.([]interface{})
	assert.Equal(t, 2, len(users))
}

func TestGetDetailUserResponse(t *testing.T) {
	// Create mock user service
	userService := &MockUserService{}

	// Create user handler with mock user service
	userHandler := handler.NewUserHandler(userService)

	// Create Gin router and register the user handler
	router := gin.New()
	router.GET("/:user_id", userHandler.GetDetailUser)

	// Send HTTP GET request to the router
	req, _ := http.NewRequest("GET", "/1", nil)
	w := httptest.NewRecorder()
	router.ServeHTTP(w, req)

	// Verify the response
	assert.Equal(t, 200, w.Code)
	assert.Equal(t, "application/json; charset=utf-8", w.Header().Get("Content-Type"))

	// Verify the response body
	var response response.ResponseOKWithDataModel
	err := json.Unmarshal(w.Body.Bytes(), &response)
	assert.NoError(t, err)
	assert.Equal(t, 1000, response.Code)
	assert.Equal(t, "OK", response.Message)
	assert.NotNil(t, response.Data)
}

func TestUpdateUserResponse(t *testing.T) {
	// Create mock user service
	userService := &MockUserService{
		users: []entity.User{
			{ID: 1, FirstName: "Janez", LastName: "Novak", Email: "Janez.Novak@gmail.com", Address: "123 Main St"},
			{ID: 2, FirstName: "Jane", LastName: "Smith", Email: "jane.smith@gmail.com", Address: "456 Oak Ave"},
		},
		nextID: 3,
	}

	// Create user handler with mock user service
	userHandler := handler.NewUserHandler(userService)

	// Create Gin router and register the user handler
	router := gin.New()
	router.PUT("/:user_id", userHandler.UpdateUser)

	// Create request payload
	payload := &entity.User{
		FirstName: "Bojan",
		LastName:  "Slovenec",
		Email:     "Bojan.Slovenec@gmail.com",
		Address:   "Mariborska cesta 32, 2000 Maribor",
	}
	jsonPayload, _ := json.Marshal(payload)

	// Send HTTP PUT request to the router with request payload
	req, _ := http.NewRequest("PUT", "/1", bytes.NewBuffer(jsonPayload))
	w := httptest.NewRecorder()
	router.ServeHTTP(w, req)

	// Verify the response
	assert.Equal(t, 200, w.Code)
	assert.Equal(t, "application/json; charset=utf-8", w.Header().Get("Content-Type"))

	// Assert that the user has been updated in the mock user service
	assert.Equal(t, "Bojan", userService.users[0].FirstName)
	assert.Equal(t, "Slovenec", userService.users[0].LastName)
	assert.Equal(t, "Bojan.Slovenec@gmail.com", userService.users[0].Email)
	assert.Equal(t, "Mariborska cesta 32, 2000 Maribor", userService.users[0].Address)
}

func TestDeleteUserResponse(t *testing.T) {
	// Create mock user service
	userService := &MockUserService{
		users: []entity.User{
			{ID: 1, FirstName: "Janez", LastName: "Novak", Email: "Janez.Novak@gmail.com", Address: "123 Main St"},
			{ID: 2, FirstName: "Jane", LastName: "Smith", Email: "jane.smith@gmail.com", Address: "456 Oak Ave"},
		},
		nextID: 3,
	}

	// Create user handler with mock user service
	userHandler := handler.NewUserHandler(userService)

	// Create Gin router and register the user handler
	router := gin.New()
	router.DELETE("/:user_id", userHandler.DeleteUser)

	// Send HTTP DELETE request to the router
	req, _ := http.NewRequest("DELETE", "/1", nil)
	w := httptest.NewRecorder()
	router.ServeHTTP(w, req)

	// Verify the response
	assert.Equal(t, 200, w.Code)
	assert.Equal(t, "application/json; charset=utf-8", w.Header().Get("Content-Type"))
	assert.Equal(t, 1, len(userService.users))
}

func TestLoginResponse(t *testing.T) {
	// Create mock user service
	userService := &MockUserService{}

	// Create user handler with mock user service
	userHandler := handler.NewUserHandler(userService)

	// Create Gin router and register the user handler
	router := gin.New()
	router.POST("/login", userHandler.Login)

	// Create request payload
	payload := &entity.LoginViewModel{
		Email:    "Janez.Novak@gmail.com",
		Password: "password123",
	}
	jsonPayload, _ := json.Marshal(payload)

	// Send HTTP POST request to the router with request payload
	req, _ := http.NewRequest("POST", "/login", bytes.NewBuffer(jsonPayload))
	w := httptest.NewRecorder()
	router.ServeHTTP(w, req)

	// Verify the response
	var res response.ResponseOKWithDataModel
	err := json.Unmarshal(w.Body.Bytes(), &res)
	if err != nil {
		t.Errorf("failed to parse response: %v", err)
	}

	assert.Equal(t, 200, w.Code)
	assert.Equal(t, "application/json; charset=utf-8", w.Header().Get("Content-Type"))
	assert.Equal(t, 1000, res.Code)
	assert.Equal(t, "OK", res.Message)
	assert.NotNil(t, res.Data)
}
