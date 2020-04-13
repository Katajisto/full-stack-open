import React, { useState } from "react";
import ReactDOM from "react-dom";

const App = (props) => {
  const [selected, setSelected] = useState(0);
  const [votes, setVotes] = useState({});

  const handleClick = () => {
    setSelected(Math.floor(Math.random() * props.anecdotes.length));
  };

  const handleVote = () => {
    let copy = { ...votes };
    if (votes[selected] === undefined) copy[selected] = 1;
    else copy[selected] = votes[selected] + 1;
    console.log(votes[selected]);
    setVotes(copy);
  };

  let maxVotes = 0;
  let maxID = 0;

  for (let i = 0; i < anecdotes.length; i++) {
    if (votes[i] === undefined) continue;
    if (votes[i] > maxVotes) {
      maxID = i;
      maxVotes = votes[i];
    }
  }

  return (
    <>
      <h1>Anecdote of the day</h1>
      <div>{props.anecdotes[selected]}</div>
      <p>has {votes[selected] === undefined ? 0 : votes[selected]} votes.</p>
      <button onClick={handleVote}>Vote</button>
      <button onClick={handleClick}>Next anecdote</button>
      <h1>Anecdote with the most votes</h1>
      <p>{props.anecdotes[maxID]}</p>
    </>
  );
};

const anecdotes = [
  "If it hurts, do it more often",
  "Adding manpower to a late software project makes it later!",
  "The first 90 percent of the code accounts for the first 90 percent of the development time...The remaining 10 percent of the code accounts for the other 90 percent of the development time.",
  "Any fool can write code that a computer can understand. Good programmers write code that humans can understand.",
  "Premature optimization is the root of all evil.",
  "Debugging is twice as hard as writing the code in the first place. Therefore, if you write the code as cleverly as possible, you are, by definition, not smart enough to debug it.",
];

ReactDOM.render(<App anecdotes={anecdotes} />, document.getElementById("root"));
