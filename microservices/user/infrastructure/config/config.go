package config

import (
	"log"

	"github.com/spf13/viper"
)

func GetConfig() {
	viper.SetConfigName("App")
	viper.SetConfigType("yaml")
	viper.AddConfigPath("infrastructure/config")

	err := viper.ReadInConfig()
	if err != nil {
		log.Fatal("Config error: ", err.Error())
	}
}
