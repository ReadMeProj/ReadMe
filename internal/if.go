package main 

import (
    "fmt"
)

type Animal interface {
    color() string
	yariv()
}

type Dog struct { // extends Animal
    Color string
}

func (d Dog) color() string {
    return d.Color
}
// dog := &Dog{Color: "brown"}
// dog.color()

func (d Dog) oved() string {
	return "oved"
}

func (d Dog) yariv() {
	
}

type Person struct {
    Name string
    Age  int
    Pet  Animal
}

func main() {
    dog := &Dog{Color: "brown"}
    tom := &Person{Name: "Tom", Age: 13, Pet: dog}
    fmt.Println(tom.Pet.color())
	
	dog.oved()
	// tom.Pet.oved()
}