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

	GetRequests(key string, value interface{}) ([]Request, error)
	GetAnswers(key string, value interface{}) ([]Answer, error)
	GetReports(key string, value interface{}) ([]Report, error)
	NewRequest(reuqest Request) error
	NewAnswer(answer Answer) error
	NewReport(report Report) error
	UpdateAnswer(answer Answer) error
	UpdateRequest(request Request) error
	UpdateReport(report Report) error

	IsAuth(username string, token Token) error
	Login(username string, password string) (Token, error)
	Logout(username string) error

	IncrementOneInDB(dbName string, collectionName string, key string, value string, increment string, incrementBy int) error
}
