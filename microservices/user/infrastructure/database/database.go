package database

import (
	"fmt"

	_ "github.com/go-sql-driver/mysql"
	"github.com/jinzhu/gorm"
	"github.com/spf13/viper"
)

func InitDB() (*gorm.DB, error) {
	username := viper.GetString("Database.Username")
	password := viper.GetString("Database.Password")
	host := viper.GetString("Database.Host")
	port := viper.GetInt("Database.Port")
	dbname := viper.GetString("Database.DBName")

	dsn := fmt.Sprintf("%s:%s@tcp(%s:%d)/%s", username, password, host, port, dbname)

	db, err := gorm.Open("mysql", dsn)

	if err != nil {
		return nil, err
	}

	if err := db.DB().Ping(); err != nil {
		return nil, err
	}

	return db, nil

}
