package test

import (
	"log"
	"user-service/domain/entity"
)

type MockUserService struct {
	users     []entity.User
	nextID    int
	err       error
	errGet    error
	errSave   error
	errUpdate error
	errDelete error
}

func (m *MockUserService) SaveUser(userVM *entity.ReqisterViewModel) (*entity.UserViewModel, error) {
	if m.errSave != nil {
		return nil, m.errSave
	}

	user := entity.User{
		ID:        m.nextID,
		FirstName: userVM.FirstName,
		LastName:  userVM.LastName,
		Email:     userVM.Email,
		Address:   userVM.Address,
	}

	m.users = append(m.users, user)
	m.nextID++

	return &entity.UserViewModel{
		ID:        user.ID,
		FirstName: user.FirstName,
		LastName:  user.LastName,
		Email:     user.Email,
		Address:   user.Address,
	}, nil
}

func (m *MockUserService) GetListUser() (*[]entity.UserViewModel, error) {
	if m.err != nil {
		return nil, m.err
	}

	users := make([]entity.UserViewModel, len(m.users))
	for i, u := range m.users {
		users[i] = entity.UserViewModel{
			ID:        u.ID,
			FirstName: u.FirstName,
			LastName:  u.LastName,
			Email:     u.Email,
			Address:   u.Address,
		}
	}

	log.Printf("Returning %d users: %+v", len(users), users)

	return &users, nil
}

func (m *MockUserService) GetDetailUser(id int) (*entity.UserViewModel, error) {
	if m.errGet != nil {
		return nil, m.errGet
	}

	for _, u := range m.users {
		if u.ID == id {
			return &entity.UserViewModel{
				ID:        u.ID,
				FirstName: u.FirstName,
				LastName:  u.LastName,
				Email:     u.Email,
				Address:   u.Address,
			}, nil
		}
	}

	return nil, nil
}

func (m *MockUserService) UpdateUser(userVM *entity.User) (*entity.UserViewModel, error) {
	if m.errUpdate != nil {
		return nil, m.errUpdate
	}

	for i, u := range m.users {
		if u.ID == userVM.ID {
			m.users[i].FirstName = userVM.FirstName
			m.users[i].LastName = userVM.LastName
			m.users[i].Email = userVM.Email
			m.users[i].Address = userVM.Address

			return &entity.UserViewModel{
				ID:        m.users[i].ID,
				FirstName: m.users[i].FirstName,
				LastName:  m.users[i].LastName,
				Email:     m.users[i].Email,
				Address:   m.users[i].Address,
			}, nil
		}
	}

	return nil, nil
}

func (m *MockUserService) DeleteUser(id int) error {
	if m.errDelete != nil {
		return m.errDelete
	}

	for i, u := range m.users {
		if u.ID == id {
			m.users = append(m.users[:i], m.users[i+1:]...)
			return nil
		}
	}

	return nil
}

func (m *MockUserService) GetUserByEmailPassword(loginVM entity.LoginViewModel) (*entity.User, error) {
	return nil, nil
}
