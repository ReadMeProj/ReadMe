package db


type User struct {
	ID			ID
    Username 	string
	Email 		string
	FirstName	string
	LastName	string

	Interests	*ReadMeLabel
	Credit		int
	RelScore	int
	
	Favorites	*ID
	Comments	*Comment

}

type Article struct {
	ID			ID
    Name 	 	string
	URL  	 	string
	Author 		string 
	Date 		int64
	
	Labels	 	*ReadMeLabel
	//RelScore 	float32	
	FakeVotes	Votes
	SponsVotes	Votes

	Comments	*Comment
}

type Comment struct {
	userID 		ID
	articleID	ID
	Date 		int64
	Content		string
	
	Votes		Votes
}

type ID string

type ReadMeLabel struct {
	LabelName 	string
	Score		float32
}

type Votes struct {
	UpVote 		int
	DownVote 	int
}