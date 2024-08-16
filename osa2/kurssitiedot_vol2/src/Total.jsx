
const Total = ({ parts }) => {
    const total = parts.reduce((acc, item) => {
        return acc + item.exercises
    }, 0)
    return (
        <h4>Total of {total} exercises</h4>
    )
}

export default Total