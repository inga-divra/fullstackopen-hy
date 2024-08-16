
const Search = ({ searchedItem, handleSearchedItem }) => {
    return (
        <div className="search">
            <span className="search_title">Find countries </span>
            <input className="search_input" type='text' value={searchedItem} onChange={handleSearchedItem} />
        </div>
    )
}

export default Search