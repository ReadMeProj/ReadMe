package db

type Database struct {
	Name string
}

type ReadMeDatabase interface {
	GetUser(key string, value interface{}) (User, error)
	GetUsers() ([]User, error)
	GetArticle(key string, value interface{}) (Article, error)
	GetArticles() ([]Article, error)

	NewUser(user User) error
	NewArticle(article Article) error
	UpdateUser(user User) error
	UpdateArticle(article Article) error

	GetFavorites(key string, value interface{}) ([]Favorite, error)
	GetComments(key string, value interface{}) ([]Comment, error)
	NewFavorite(favorite Favorite) error
	NewComment(comment Comment) error

	IsAuth(username string, token Token) error
	Login(username string, password string) (Token, error)
	Logout(username string) error
}
