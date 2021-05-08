package db


type User struct {
	ID        ID `json:"id" validate:"required"`
	Username  string `json:"username" validate:"required"`
	Password  string `json:"password" validate:"required"`
	Email     string `json:"email" validate:"required"`
	FirstName string `json:"firstname" validate:"required"`
	LastName  string `json:"lastname" validate:"required"`

	AccessToken Token `json:"accesstoken"`

	Interests []ReadMeLabel `json:"interests"`
	Credit    int `json:"credit"`
	RelScore  int `json:"relscore"`

	Favorites []ID `json:"favorites"`
	Comments  []Comment `json:"comments"`
}

type Article struct {
	ID        ID `json:"id" validate:"required"`
	Name   string `json:"name" validate:"required"`
	URL    string `json:"url" validate:"required"`
	Author string `json:"author" validate:"required"`
	Date   int64 `json:"date" validate:"required"`

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
	ID 			ID
	Password 	string
}