package db

type Database struct {
	Name string
}

type ReadMeDatabase interface {
	GetUser(id ID) (User, error)
	GetUsers() ([]User, error)
	GetArticle(id ID) (Article, error)
	GetArticles() ([]Article, error)

	NewUser() error
	NewArticle() error
	UpdateUser() error
	UpdateArticle() error
}
