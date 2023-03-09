package repository

import (
	"fmt"
	"user-service/domain/entity"

	"github.com/jinzhu/gorm"
)

type UserRepository struct {
	db *gorm.DB
}

type IUserRepository interface {
	SaveUser(*entity.User) (*entity.User, error)
	GetDetailUser(int) (*entity.User, error)
	GetAllUser() ([]entity.User, error)
	UpdateUser(*entity.User) (*entity.User, error)
	DeleteUser(int) error
	GetUserName(id int) string
	GetUserByEmailPassword(loginVM entity.LoginViewModel) (*entity.User, error)
}

func NewUserRepository(db *gorm.DB) *UserRepository {
	var userRepo = UserRepository{}
	userRepo.db = db
	return &userRepo
}

func (r *UserRepository) SaveUser(user *entity.User) (*entity.User, error) {
	err := r.db.Create(&user).Error
	if err != nil {
		return nil, err
	}

	return user, nil
}

func (r *UserRepository) GetDetailUser(id int) (*entity.User, error) {
	var user entity.User
	err := r.db.Where("id = ?", id).Take(&user).Error
	if err != nil {
		return nil, err
	}

	return &user, nil
}

func (r *UserRepository) GetUserName(id int) string {
	userDetail, _ := r.GetDetailUser(id)
	var fullname = fmt.Sprintf("%s %s", userDetail.FirstName, userDetail.LastName)
	return fullname
}

func (r *UserRepository) GetAllUser() ([]entity.User, error) {
	var users []entity.User
	err := r.db.Order("id desc").Find(&users).Error
	if err != nil {
		return nil, err
	}

	return users, nil
}

func (r *UserRepository) UpdateUser(user *entity.User) (*entity.User, error) {
	err := r.db.Save(&user).Error
	if err != nil {
		return nil, err
	}

	return user, nil
}

func (r *UserRepository) DeleteUser(id int) error {
	var user entity.User
	err := r.db.Where("id = ?", id).Delete(&user).Error
	if err != nil {
		return err
	}

	return nil
}

func (r *UserRepository) GetUserByEmailPassword(loginVM entity.LoginViewModel) (*entity.User, error) {
	var user entity.User
	err := r.db.Where("email = ?", loginVM.Email).Take(&user).Error
	if err != nil {
		return nil, err
	}

	return &user, nil
}
