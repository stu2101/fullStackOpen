interface CoursePartBase {
    name: string;
    exerciseCount: number;
    type: string;
}

interface CoursePartDescription extends CoursePartBase {
    description: string;
}

interface CourseNormalPart extends CoursePartDescription {
    type: "normal";
}

interface CourseProjectPart extends CoursePartBase {
    type: "groupProject";
    groupProjectCount: number;
}

interface CourseSubmissionPart extends CoursePartDescription {
    type: "submission";
    exerciseSubmissionLink: string;
}

interface CourseSpecialPart extends CoursePartDescription {
    type: "special"
    requirements: string[];
}

type CoursePart = CourseNormalPart | CourseProjectPart | CourseSubmissionPart | CourseSpecialPart;

const assertNever = (value: never): never => {
    throw new Error(
        `Unhandled discriminated union member: ${JSON.stringify(value)}`
    );
};


const Part = (props: CoursePart) => {
    switch (props.type) {
        case "normal":
            return (
                <div>
                    <b>{props.name} {props.exerciseCount}</b> <br />
                    <i>{props.description}</i>
                </div>
            )
        case "groupProject":
            return (
                <div>
                    <b>{props.name} {props.exerciseCount}</b> <br />
                    project exercises {props.groupProjectCount}
                </div>
            )
        case "submission":
            return (
                <div>
                    <b>{props.name} {props.exerciseCount}</b> <br />
                    <i>{props.description}</i> <br />
                    submit to {props.exerciseSubmissionLink}
                </div>
            )
        case "special":
            return (
                <div>
                    <b>{props.name} {props.exerciseCount}</b> <br />
                    <i>{props.description}</i> <br />
                    required skills: {props.requirements}
                </div>
            )
        default: 
            return assertNever(props);
    }
}


interface HeaderProps {
    title: string
}

const Header = (props: HeaderProps) => {
    return (
        <h1>
            {props.title}
        </h1>
    )
}

interface ContentProps {
    courseParts: CoursePart[]
}

const Content = (props: ContentProps) => {
    return (
        <div>
            {props.courseParts.map(p => <Part {...p} />)}
        </div>
    )
}

interface TotalProps {
    count: number[]
}

const Total = (props: TotalProps) => {
    return (
        <p>Total: {props.count.reduce((a, b) => a + b, 0)}</p>
    )
}

const App = () => {
    const courseName = "Half Stack application development";
    const courseParts: CoursePart[] = [
        {
            name: "Fundamentals",
            exerciseCount: 10,
            description: "This is the easy course part",
            type: "normal"
        },
        {
            name: "Advanced",
            exerciseCount: 7,
            description: "This is the hard course part",
            type: "normal"
        },
        {
            name: "Using props to pass data",
            exerciseCount: 7,
            groupProjectCount: 3,
            type: "groupProject"
        },
        {
            name: "Deeper type usage",
            exerciseCount: 14,
            description: "Confusing description",
            exerciseSubmissionLink: "https://fake-exercise-submit.made-up-url.dev",
            type: "submission"
        },
        {
            name: "Backend development",
            exerciseCount: 21,
            description: "Typing the backend",
            requirements: ["nodejs", "jest"],
            type: "special"
        }
    ]

    return (
        <div>
            <Header title={courseName} />
            <Content courseParts={courseParts} />
            <Total count={courseParts.map(e => e.exerciseCount)} />
        </div>
    )
};

export default App;