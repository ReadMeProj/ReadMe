package db

type User struct {
	ID        ID `json:"id"`
	Username  string `json:"username"`
	Email     string `json:"email"`
	FirstName string `json:"firstname"`
	LastName  string `json:"lastname"`

	Interests []ReadMeLabel `json:"interests"`
	Credit    int `json:"credit"`
	RelScore  int `json:"relscore"`

	Favorites []ID `json:"favorites"`
	Comments  []Comment `json:"comments"`
}

type Article struct {
	ID        ID `json:"id"`
	Name   string `json:"name"`
	URL    string `json:"url"`
	Author string `json:"author"`
	Date   int64 `json:"date"`

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

type ReadMeLabel struct {
	LabelName string `json:"labelname"`
	Score     float32 `json:"score"`
}

type Votes struct {
	UpVote   int `json:"upvote"`
	DownVote int `json:"downvote"`
}
