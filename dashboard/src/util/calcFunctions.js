export function calcThreshold(articles) {
  if (articles == null || articles.length === 0) return 0;

  var upAvg,
    downAvg,
    upSum = 0,
    downSum = 0;

  articles.forEach((element) => {
    upSum += element.fakevotes.up;
    downSum += element.fakevotes.down;
  });
  upAvg = upSum / articles.length;
  downAvg = downSum / articles.length;
  return calcRelaibility(upAvg, downAvg, null);
}

export function calcRelaibility(upVotes, downVotes, threshold) {
  var ratio = 0;
  if (upVotes > 0 && downVotes > 0) {
    ratio = upVotes / downVotes;
  } else if (upVotes > 0 && downVotes === 0) {
    ratio = upVotes / 0.9;
  } else if (upVotes === 0 && downVotes > 0) {
    ratio = -1 * (downVotes / 0.9);
  }
  // Check threshold for both directions.
  if (threshold) {
    if (ratio > 0) {
      return ratio >= threshold ? ratio : 0;
    } else {
      return ratio * -1 >= threshold ? ratio : 0;
    }
  } else {
    return ratio;
  }
}

export function calcCorrectAnswerId(answers) {
  var correctAnsId;
  var threshold = 0; // As for now there is no threshold bc of the mock data.
  if (answers && answers.length > 0) {
    var sortedAnswers = answers.sort(
      (a, b) =>
        calcRelaibility(b.votes.up, b.votes.down, null) -
        calcRelaibility(a.votes.up, a.votes.down, null)
    );
    console.log(sortedAnswers);
    if (sortedAnswers[0].votes.up > threshold)
      correctAnsId = sortedAnswers[0].id;
  }

  return correctAnsId;
}
