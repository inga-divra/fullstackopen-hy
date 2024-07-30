
const Button = ({ handleClick, text }) => {
    return <button
        onClick={handleClick}
        type="button"
        style={{
            backgroundColor: 'lavender',
            padding: '5px 10px',
            borderColor: 'blue',
            marginRight: '10px',
            borderRadius: '5px'
        }}>
        {text}
    </button>
}

export default Button