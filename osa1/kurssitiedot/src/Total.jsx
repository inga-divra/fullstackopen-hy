
const Total = ({ parts }) => {
    const total = parts.reduce((acc, item) => {
        return acc + item.exercises
    }, 0)
    return (
        <p>Number of exercises {total}</p>
    )
}

export default Total