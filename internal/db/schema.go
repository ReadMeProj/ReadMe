package db


type User struct {
	ID        ID `json:"id"`
	Username  string `json:"username" validate:"required,gte=2"`
	Password  string `json:"password" validate:"required,gte=8"`
	Email     string `json:"email" validate:"required,email"`
	FirstName string `json:"firstname" validate:"required,gte=2"`
	LastName  string `json:"lastname" validate:"required,gte=2"`

	AccessToken Token `json:"accesstoken"`

	Interests []ReadMeLabel `json:"interests"`
	Credit    int `json:"credit"`
	RelScore  int `json:"relscore"`

	Favorites []ID `json:"favorites"`
	Comments  []Comment `json:"comments"`
}

type Article struct {
<<<<<<< HEAD
	ID     ID `json:"id" validate:"required"`
	Name   string `json:"name" validate:"required"`
	URL    string `json:"url" validate:"required,url"`
	Author string `json:"author" validate:"required,gte=2"`
	Date   string `json:"date" validate:"required"`
=======
	ID        ID `json:"id" validate:"required"`
	Name   string `json:"name" validate:"required"`
	URL    string `json:"url" validate:"required,url"`
	Author string `json:"author" validate:"required,gte=2"`
	Date   int64 `json:"date" validate:"required"`
>>>>>>> 8b92c8e4104e3bb2b86c0881440062fe7ce97247

	Labels []ReadMeLabel `json:"labels"`
	//RelScore 	float32
	FakeVotes  Votes `json:"fakevotes"`
	SponsVotes Votes `json:"sponsvotes"`

	Comments []Comment `json:"comments"`
}

type Comment struct {
	UserID    ID `json:"userid"`
	ArticleID ID `json:"articleid"`
	Date      int64 `json:"date"`
	Content   string `json:"content"`

	Votes Votes `json:"votes"`
}

type ID string
type Token string

type ReadMeLabel struct {
	LabelName string `json:"labelname"`
	Score     float32 `json:"score"`
}

type Votes struct {
	UpVote   int `json:"upvote"`
	DownVote int `json:"downvote"`
}

type Credentials struct { 
	ID 			ID	`json:"id" validate:"required"`
	Password 	string `json:"password" validate:"required"`
}