package main

import (
	"log"
	"time"
)

func main() {
	log.Println("Start! die after 10 sec")
	time.Sleep(10 * time.Second)
	log.Fatal("Exit!")
}
