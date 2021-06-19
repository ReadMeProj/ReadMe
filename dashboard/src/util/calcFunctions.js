// Calculate the threshold for deciding if an article is realiable/not reliable enough to sort it accordingly.
// Calculated by the ratio avarage of the currently seen articles.
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

// Calc the ratio of votes of one article and return according to passing the threshold.
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

// Given a list of answers choose the best answer to mark as correct by the voting values.
export function calcCorrectAnswerId(answers) {
  var correctAnsId;
  var threshold = 0; // As for now there is 0 threshold for the POC.
  // The idea for the threshold is to be derived from the number of users or a high enough constant.
  if (answers && answers.length > 0) {
    var sortedAnswers = answers.sort(
      (a, b) =>
        calcRelaibility(b.votes.up, b.votes.down, null) -
        calcRelaibility(a.votes.up, a.votes.down, null)
    );
    if (sortedAnswers[0].votes.up > threshold)
      correctAnsId = sortedAnswers[0].id;
  }

  return correctAnsId;
}
