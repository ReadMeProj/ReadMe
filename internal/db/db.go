package db

type Database struct {
	Name 	string
}

type ReadMeDatabase interface {
	getUser() 		User
	getUsers()  	*User
	getArticle()	Article	
	getArticles()	*Article

	newUser()
	newArticle()
	updateUser()
	updateArticle()
}