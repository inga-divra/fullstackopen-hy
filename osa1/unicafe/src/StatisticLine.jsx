
const StatisticLine = ({ text, value }) => {
    return <tr>
        <td style={{
            paddingRight: '20px',
            textAlign: 'left'
        }}>
            {text}
        </td>
        <td style={{ textAlign: 'right' }}>
            {value}
        </td>
    </tr>
}

export default StatisticLine

