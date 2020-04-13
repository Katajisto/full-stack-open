import React, { useState } from "react";
import ReactDOM from "react-dom";

const StatisticsLine = ({ text, value }) => {
  return (
    <>
      <tr>
        <td>{text}</td>
        <td>{value}</td>
      </tr>
    </>
  );
};

const Statistics = ({ good, bad, neutral }) => {
  const all = good + bad + neutral;

  let avg;
  let pos;
  if (all !== 0) {
    avg = (good - bad) / all;
    pos = good / all;
  } else {
    avg = 0;
    pos = 0;
  }

  if (all === 0) {
    return (
      <>
        <h1>Statistics</h1>
        <h2>No feedback given</h2>
      </>
    );
  }
  return (
    <>
      <h1>Statistics</h1>
      <table>
        <tbody>
          <StatisticsLine text="Good" value={good}></StatisticsLine>
          <StatisticsLine text="Neutral" value={neutral}></StatisticsLine>
          <StatisticsLine text="Bad" value={bad}></StatisticsLine>
          <StatisticsLine text="All" value={all}></StatisticsLine>
          <StatisticsLine text="Average" value={avg}></StatisticsLine>
          <StatisticsLine
            text="Positive"
            value={pos * 100 + "%"}
          ></StatisticsLine>
        </tbody>
      </table>
    </>
  );
};

const App = () => {
  // tallenna napit omaan tilaansa
  const [good, setGood] = useState(0);
  const [neutral, setNeutral] = useState(0);
  const [bad, setBad] = useState(0);

  const handleClick = (value) => () => {
    if (value === 1) {
      setGood(good + 1);
    } else if (value === 0) {
      setNeutral(neutral + 1);
    } else {
      setBad(bad + 1);
    }
  };

  return (
    <div>
      <h1>Give feedback</h1>
      <button onClick={handleClick(1)}>Good</button>
      <button onClick={handleClick(0)}>Neutral</button>
      <button onClick={handleClick(-1)}>Bad</button>
      <Statistics good={good} bad={bad} neutral={neutral}></Statistics>
    </div>
  );
};

ReactDOM.render(<App />, document.getElementById("root"));
