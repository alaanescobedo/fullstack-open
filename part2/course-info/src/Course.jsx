// Handler functions
function sumArrValues(arr) {
  return arr.reduce((accumulator, currentValue) =>
    accumulator + currentValue, 0
  )
}

// Components
const Header = ({ titleCourse }) => (
  <h1>{titleCourse}</h1>
)

const Part = ({ name, totalExercises }) => (
  <p>{name} {totalExercises}</p>
)

const Content = ({ parts }) => (
  <>
    {parts.map(({ name, exercises }, index) => (
      <Part
        name={name}
        totalExercises={exercises}
        key={index}
      />
    )
    )}
  </>
)

const Total = ({ parts }) => {
  const totalExercisesArr = parts.map((part) => part.exercises)
  const sumTotalExercises = sumArrValues(totalExercisesArr)
  return (
    <p>
      <strong>Total of exercise {sumTotalExercises}</strong>
    </p>
  )
}

export const Course = ({ title, parts }) => {
  return (
    <div>
      <Header titleCourse={title} />
      <Content parts={parts} />
      <Total parts={parts} />
    </div>
  )
}
