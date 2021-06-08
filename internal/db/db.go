package db

type Database struct {
	Name string
}

type ReadMeDatabase interface {
	GetUser(key string, value interface{}) (User, error)
	GetUsers() ([]User, error)
	GetArticle(key string, value interface{}) (Article, error)
	GetArticles() ([]Article, error)
	GetArticlesByQuery(query string) ([]Article, error)
	GetArticlesByDate(from int64, to int64) ([]Article, error)

	NewUser(user *User) error
	NewArticle(article *Article) error
	UpdateUser(user User) error
	UpdateArticle(article Article) error

	GetFavorite(key1 string, value1 interface{}, key2 string, value2 string) (Favorite, error)
	GetFavorites(key string, value interface{}) ([]Favorite, error)
	GetComments(key string, value interface{}) ([]Comment, error)
	NewFavorite(favorite *Favorite) error
	NewComment(comment *Comment) error

	GetRequests(key string, value interface{}) ([]Request, error)
	GetRequestsByQuery(query string) ([]Request, error)
	GetAnswers(key string, value interface{}) ([]Answer, error)
	GetReports(key string, value interface{}) ([]Report, error)
	GetAllRequests(which string) ([]Request, error)
	NewRequest(reuqest *Request) error
	NewAnswer(answer *Answer) error
	NewReport(report *Report) error
	NewVoteRegistry(vote *VoteRegistery) error
	UpdateAnswer(answer Answer) error
	UpdateRequest(request Request) error
	UpdateReport(report Report) error

	IsAuth(username string, token Token) error
	Login(username string, password string) (Token, error)
	Logout(username string) error

	IncrementOneInDB(dbName string, collectionName string, key string, value string, increment string, incrementBy int) error
	GetByKey(dbName string, collectionName string, key string, value interface{}, pResult interface{}) error
	GetAllByKey(dbName string, collectionName string, key string, value interface{}, pResults interface{}) error
	GetByDoubleKey(dbName string, collectionName string, key1 string, val1 interface{}, key2 string, val2 interface{}, pResult interface{}) error
	DeleteAllByKey(dbName string, collectionName string, key []string, val []interface{}) error
}
