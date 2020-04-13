import React from "react";

const Header = ({ course }) => {
  return (
    <>
      <h1>{course.name}</h1>
    </>
  );
};

const Part = ({ Info }) => {
  return (
    <>
      <p>
        {Info.name} {Info.exercises}
      </p>
    </>
  );
};

const Content = ({ course }) => {
  const parts = course.parts.map((x) => <Part key={x.id} Info={x}></Part>);
  return <>{parts}</>;
};

const Total = ({ course }) => {
  const excounts = course.parts.map((x) => x.exercises);
  const reducer = (acc, temp) => acc + temp;
  return <h3>Total: {excounts.reduce(reducer)}</h3>;
};

const Course = ({ course }) => {
  return (
    <>
      <Header course={course}></Header>
      <Content course={course}></Content>
      <Total course={course}></Total>
    </>
  );
};

export default Course;
