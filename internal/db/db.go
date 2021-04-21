package db

type Database struct {
	Name 	string
}

type ReadMeDatabase interface {
	GetUser() 		User
	//getUsers()  	*User
	//getArticle()	Article	
	//getArticles()	*Article

	//newUser()
	//newArticle()
	//updateUser()
	//updateArticle()
}