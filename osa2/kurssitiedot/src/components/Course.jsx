const Course = ({course}) => {
    console.log('Course',course)
    return (
      <div>
      <Header header={course.name} />
      <Content parts={course.parts} />
      <Total parts={course.parts} />
      </div>
    )
  }
  
  const Total = ({parts}) => {
    const amount = parts.reduce((sum, part) => {
      return sum + part.exercises;
    }, 0)
    return (
      <div>
        <b>
          total of {amount} exercises
        </b>
      </div>
    )
  }
  
  const Header = ({header}) => {
    console.log(header)
    return (
      <h1>{header}</h1>
    )
  }
  
  const Content = ({parts}) => {
    console.log(parts)
    return (
      <div>
      {parts.map(part =>
        <Part key={parts.id} part={part} />
      )}
      </div>
    )
  }
  
  const Part = ({part}) => {
    return (
      <p>{part.name} {part.exercises}</p>
    )
  }

export default Course