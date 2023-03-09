package entity

import (
	"user-service/infrastructure/security"

	"github.com/badoux/checkmail"
)

type User struct {
	ID        int    `json:"id"`
	FirstName string `json:"first_name"`
	LastName  string `json:"last_name"`
	Email     string `json:"email"`
	Password  string `json:"password"`
}

type ReqisterViewModel struct {
	FirstName string `json:"first_name"`
	LastName  string `json:"last_name"`
	Email     string `json:"email"`
	Password  string `json:"password"`
}

type LoginViewModel struct {
	Email    string `json:"email"`
	Password string `json:"password"`
}

type UserViewModel struct {
	ID       int    `json:"id"`
	FullName string `json:"full_name"`
	Email    string `json:"email"`
}

func (u *User) EncryptPassword(password string) (string, error) {
	hashPassword, err := security.Hash(password)
	if err != nil {
		return "", err
	}

	return string(hashPassword), nil
}

func (u *User) Validate() map[string]string {
	var errorMessages = make(map[string]string)
	var err error

	if u.Email == "" {
		errorMessages["email_required"] = "email required"
	}
	if u.Email != "" {
		if err = checkmail.ValidateFormat(u.Email); err != nil {
			errorMessages["invalid_email"] = "email email"
		}
	}

	return errorMessages
}

func (u *LoginViewModel) Validate() map[string]string {
	var errorMessages = make(map[string]string)
	var err error

	if u.Password == "" {
		errorMessages["password_required"] = "password is required"
	}
	if u.Email == "" {
		errorMessages["email_required"] = "email is required"
	}
	if u.Email != "" {
		if err = checkmail.ValidateFormat(u.Email); err != nil {
			errorMessages["invalid_email"] = "please provide a valid email"
		}
	}

	return errorMessages
}

func (u *ReqisterViewModel) Validate() map[string]string {
	var errorMessages = make(map[string]string)
	var err error

	if u.FirstName == "" {
		errorMessages["firstname_required"] = "first name is required"
	}
	if u.LastName == "" {
		errorMessages["lastname_required"] = "last name is required"
	}
	if u.Password == "" {
		errorMessages["password_required"] = "password is required"
	}
	if u.Password != "" && len(u.Password) < 6 {
		errorMessages["invalid_password"] = "password should be at least 6 characters"
	}
	if u.Email == "" {
		errorMessages["email_required"] = "email is required"
	}
	if u.Email != "" {
		if err = checkmail.ValidateFormat(u.Email); err != nil {
			errorMessages["invalid_email"] = "please provide a valid email"
		}
	}

	return errorMessages
}
