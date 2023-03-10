package service

import (
	"fmt"
	"user-service/domain/entity"
	"user-service/domain/repository"
	"user-service/infrastructure/security"

	"golang.org/x/crypto/bcrypt"
)

type UserService struct {
	userRepo repository.IUserRepository
}

type IUserService interface {
	SaveUser(*entity.ReqisterViewModel) (*entity.UserViewModel, error)
	GetListUser() (*[]entity.UserViewModel, error)
	GetDetailUser(id int) (*entity.UserViewModel, error)
	UpdateUser(userVM *entity.User) (*entity.UserViewModel, error)
	DeleteUser(id int) error
	GetUserByEmailPassword(loginVM entity.LoginViewModel) (*entity.User, error)
}

func NewUserService(userRepo repository.IUserRepository) *UserService {
	var userService = UserService{}
	userService.userRepo = userRepo
	return &userService
}

func (s *UserService) GetListUser() (*[]entity.UserViewModel, error) {
	result, err := s.userRepo.GetAllUser()
	if err != nil {
		return nil, err
	}

	var users []entity.UserViewModel
	for _, item := range result {
		var user entity.UserViewModel
		user.Email = item.Email
		user.FirstName = item.FirstName
		user.LastName = item.LastName
		user.Email = item.Email
		user.Address = item.Address
		users = append(users, user)
	}

	return &users, nil
}

func (s *UserService) GetDetailUser(id int) (*entity.UserViewModel, error) {
	var viewModel entity.UserViewModel

	result, err := s.userRepo.GetDetailUser(id)
	if err != nil {
		return nil, err
	}

	if result != nil {
		viewModel = entity.UserViewModel{
			ID:        result.ID,
			FirstName: result.FirstName,
			LastName:  result.LastName,
			Email:     result.Email,
			Address:   result.Address,
		}
	}

	return &viewModel, nil
}

func (s *UserService) SaveUser(userVM *entity.ReqisterViewModel) (*entity.UserViewModel, error) {
	var user = entity.User{
		FirstName: userVM.FirstName,
		LastName:  userVM.LastName,
		Email:     userVM.Email,
		Address:   userVM.Address,
	}

	password, err := user.EncryptPassword(userVM.Password)
	if err != nil {
		return nil, err
	}

	user.Password = password

	result, err := s.userRepo.SaveUser(&user)
	if err != nil {
		return nil, err
	}

	var afterRegVM entity.UserViewModel

	if result != nil {
		afterRegVM = entity.UserViewModel{
			ID:        result.ID,
			FirstName: result.FirstName,
			LastName:  result.LastName,
			Email:     result.Email,
			Address:   result.Address,
		}
	}

	return &afterRegVM, nil
}

func (s *UserService) UpdateUser(userVM *entity.User) (*entity.UserViewModel, error) {
	password, err := userVM.EncryptPassword(userVM.Password)
	if err != nil {
		return nil, err
	}

	userVM.Password = password

	result, err := s.userRepo.UpdateUser(userVM)
	if err != nil {
		return nil, err
	}

	userAfterUpdate := entity.UserViewModel{
		ID:        result.ID,
		FirstName: result.FirstName,
		LastName:  result.LastName,
		Email:     result.Email,
		Address:   result.Address,
	}

	return &userAfterUpdate, err
}

func (s *UserService) DeleteUser(id int) error {
	err := s.userRepo.DeleteUser(id)
	if err != nil {
		return err
	}

	return nil
}

func (s *UserService) GetUserByEmailPassword(loginVM entity.LoginViewModel) (*entity.User, error) {
	result, err := s.userRepo.GetUserByEmailPassword(loginVM)
	if err != nil {
		return nil, err
	}

	// Verify Password
	err = security.VerifyPassword(result.Password, loginVM.Password)
	if err != nil && err == bcrypt.ErrMismatchedHashAndPassword {
		return nil, fmt.Errorf("incorrect password. error %s", err.Error())
	}

	return result, nil
}
