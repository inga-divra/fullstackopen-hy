import Header from './Header'
import Content from './Content'

const Course = ({ course }) => {
    const { name, parts } = course
    return <>
        <Header title={name} />
        <Content parts={parts} />
    </>
}

export default Course