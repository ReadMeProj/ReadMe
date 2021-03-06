package db


type User struct {
	ID        ID `json:"id"`
	Username  string `json:"username" validate:"required,gte=2"`
	Password  string `json:"password" validate:"required,gte=6"`
	Email     string `json:"email" validate:"required,email"`
	FirstName string `json:"firstname" validate:"required,gte=2"`
	LastName  string `json:"lastname" validate:"required,gte=2"`

	AccessToken Token `json:"accesstoken"`

	Credit    int `json:"credit"`
}

type Article struct {
	ID     ID `json:"id"`
	Name   string `json:"name" validate:"required"`
	URL    string `json:"url" validate:"required,url"`
	Author string `json:"author" validate:"required,gte=2"`
	Date   int64 `json:"date" validate:"required"`
	Image  string `json:"image" validate:"url"`
	Site   string `json:"site"`
	
	FakeVotes  Votes `json:"fakevotes"`
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
	Name 		string `json:"articlename"` 
	URL  		string `json:"articleurl"`
	Date      	int64 `json:"date" validate:"required"`
	Content   	string `json:"content" validate:"required,lte=256"`
	AnswerID 	ID `json:"answerid"`
	Votes 		Votes `json:"votes"`
}

type Answer struct {
	ID 		  ID `json:"id"`
	RequestID ID `json:"requestid" validate:"required"`
	UserID 	  ID `json:"userid" validate:"required"`
	ArticleId ID `json:"articleid"` 
	Date      int64 `json:"date"` 
	Content   string `json:"content" validate:"required,lte=256"`
	// Report
	Category  string `json:"category"`
	// Report
	Votes 	  Votes `json:"votes"`
}

type Report struct {
	ID 		  ID `json:"id"`
	UserID 	  ID `json:"userid" validate:"required"`
	ArticleId ID `json:"articleid" validate:"required"`
	// Report
	Labels 	  []string `json:"labels"`
	// Report
}

type ID string
type Token string

type ReadMeLabel struct {
	Label	  string `json:"label"`
	Score     float32 `json:"score"`
}

type VoteRegistery struct {
	UserID 		ID `json:"userid"`
	ItemID 		ID `json:"itemid"`
	Up 			bool `json:"up"`
}

type Votes struct {
	Up   int `json:"up"`
	Down int `json:"down"`
}

type Tag struct {
	ID 		  	ID `json:"id"`
	ArticleID 	ID `json:"articleid" validate:"required"`
	Label 		string `json:"label" validate:"required"`
	Score 		int64 `json:"score"`
}

type Credentials struct { 
	Username 	string `json:"username" validate:"required"`
	Password 	string `json:"password" validate:"required"`
}