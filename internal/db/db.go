package db

type Database struct {
	Name 	string
}

type ReadMeDatabase interface {
	GetUser(id ID) 		User
	GetUsers()  		[]User
	GetArticle(id ID)	Article	
	GetArticles()		[]Article

	NewUser()
	NewArticle()
	UpdateUser()
	UpdateArticle()
}