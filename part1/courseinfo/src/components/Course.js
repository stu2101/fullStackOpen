const Header = (props) => {
    return (
        <div>
            <h1>{props.name}</h1>
        </div>
    )
}

const Content = (props) => {
    const { parts } = props
    return (
        <div>
            {parts.map(part => <Part key={part.id} name={part.name} exercises={part.exercises} />)}
        </div>
    )
}

const Part = (props) => {
    const { name, exercises } = props
    return (
        <div>
            <p>{name} {exercises}</p>
        </div>
    )
}
const Total = (props) => {
    const { parts } = props
    return (
        <div>
            <b>total of {parts.map(object => object.exercises).reduce((a, b) => a + b)} exercises</b>
        </div>
    )
}

const Course = (props) => {
    const {course} = props;

    return (
        <div>
            <Header name={course.name} id={course.id} />
            <Content parts={course.parts} />
            <Total parts={course.parts} />
        </div>
    )
}

export default Course