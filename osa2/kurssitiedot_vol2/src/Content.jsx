import Part from './Part'
import Total from './Total'

const Content = ({ parts }) => {
    return <>
        {
            parts.map((part) => {
                return <Part key={part.id} {...part} />
            })
        }
        <Total parts={parts} />
    </>
}

export default Content