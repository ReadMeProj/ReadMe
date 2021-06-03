package db


type User struct {
	ID        ID `json:"id"`
	Username  string `json:"username" validate:"required,gte=2"`
	Password  string `json:"password" validate:"required,gte=6"`
	Email     string `json:"email" validate:"required,email"`
	FirstName string `json:"firstname" validate:"required,gte=2"`
	LastName  string `json:"lastname" validate:"required,gte=2"`

	AccessToken Token `json:"accesstoken"`

	Interests []ReadMeLabel `json:"interests"`
	Credit    int `json:"credit"`
	//RelScore  float32 `json:"relscore"`
}

type Article struct {
	ID     ID `json:"id"`
	Name   string `json:"name" validate:"required"`
	URL    string `json:"url" validate:"required,url"`
	Author string `json:"author" validate:"required,gte=2"`
	Date   string `json:"date" validate:"required"`
	Image  string `json:"image" validate:"url"`
	Site   string `json:"site"`
	
	FakeVotes  Votes `json:"fakevotes"`
	Rating 	   int `json:"rating"`
	//RelScore   float32 `json:"relscore"`
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
	Name 		string `json:"articlename" validate:"required"`
	URL  		string `json:"articleurl" validate:"required,url"`
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
	Rating 	  int `json:"rating" validate:"lte=5,gte=0"`
	Category  string `json:"category"`
	Fake 	  bool `json:"fake"`
	// Report
	Votes 	  Votes `json:"votes"`
}

type Report struct {
	ID 		  ID `json:"id"`
	UserID 	  ID `json:"userid" validate:"required"`
	ArticleId ID `json:"articleid" validate:"required"`
	// Report
	Rating 	  int `json:"rating" validate:"lte=5,gte=0"`
	Labels 	  []string `json:"labels"`
	Fake 	  bool `json:"fake"`
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