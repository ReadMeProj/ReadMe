import { React } from "react";
import { isLoggedIn } from "../network/lib/apiUserFunctions";

function UserScore(params) {
  if (!isLoggedIn() || !params.score) {
    return <div></div>;
  }

  return <div className="score">My Score: {params.score}</div>;
}
export default UserScore;
