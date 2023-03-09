package config

import (
	"log"

	"github.com/spf13/viper"
)

func GetConfig() {
	viper.SetConfigName("app")
	viper.SetConfigType("yaml")
	viper.AddConfigPath("./configurations")

	err := viper.ReadInConfig()
	if err != nil {
		log.Fatal("config error: ", err.Error())
	}
}
