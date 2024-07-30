import Part from './Part'

const Content = ({ parts }) => {
    return (
        <div>
            {parts.map((item, index) => {
                const { name, exercises } = item
                return <Part key={index} name={name} exercises={exercises} />
            })}
        </div>
    )
}

export default Content