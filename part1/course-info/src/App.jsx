// Data
const course = {
  name: 'Half Stack application development',
  parts: [
    {
      name: 'Fundamentals of React',
      totalExercises: 10
    },
    {
      name: 'Using props to pass data',
      totalExercises: 7
    },
    {
      name: 'State of a component',
      totalExercises: 14
    }
  ]
}

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
    {parts.map(({ name, totalExercises }, index) => (
      <Part
        name={name}
        totalExercises={totalExercises}
        key={index}
      />
    )
    )}
  </>
)

const Total = ({ parts }) => {
  const totalExercisesArr = parts.map((part) => part.totalExercises)
  const sumTotalExercises = sumArrValues(totalExercisesArr)
  return (
    <p>Number of exercise {sumTotalExercises}</p>
  )
}

// Main Component
const App = () => (
  <div>
    <Header titleCourse={course.name} />
    <Content parts={course.parts} />
    <Total parts={course.parts} />
  </div>
)

export default App
