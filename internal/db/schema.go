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
	RelScore  float32 `json:"relscore"`
}

type Article struct {
	ID     ID `json:"id"`
	Name   string `json:"name" validate:"required"`
	URL    string `json:"url" validate:"required,url"`
	Author string `json:"author" validate:"required,gte=2"`
	Date   string `json:"date" validate:"required"`
	Image  string `json:"image" validate:"url"`
	
	Labels []ReadMeLabel `json:"labels"`
	FakeVotes  Votes `json:"fakevotes"`
	SponsVotes Votes `json:"sponsvotes"`
	RelScore   float32 `json:"relscore"`
}

type Comment struct {
	ID 		  ID `json:"id"`
	UserID 	  ID `json:"userid" validate:"required"`
	ArticleID ID `json:"articleid" validate:"required"`
	Date      int64 `json:"date" validate:"required"`
	Content   string `json:"content" validate:"required,lte=128"`
	Votes 	  Votes `json:"votes"`
}

type Favorite struct {
	UserID 	  ID `json:"userid" validate:"required"`
	ArticleID ID `json:"articleid" validate:"required"`
	Date      int64 `json:"date" validate:"required"`
}

type Request struct {
	ID 		  	ID `json:"id"`
	RequestedBy ID `json:"requestedby" validate:"required"`
	ArticleID   ID `json:"articleid" validate:"required"`
	Date      	int64 `json:"date" validate:"required"`
	Content   	string `json:"content" validate:"required,lte=256"`
	Votes 		Votes `json:"votes"`
	Fulfilled	bool `json:"fulfilled"`
}

type Answer struct {
	ID 		  ID `json:"id"`
	RequestID ID `json:"requestid" validate:"required"`
	UserID 	  ID `json:"userid" validate:"required"`
	ArticleId ID `json:"articleid" validate:"required"`
	Date      int64 `json:"date" validate:"required"`
	Content   string `json:"content" validate:"required,lte=128"`
	Votes 	  Votes `json:"votes"`
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
	Username 	string `json:"username" validate:"required"`
	Password 	string `json:"password" validate:"required"`
}