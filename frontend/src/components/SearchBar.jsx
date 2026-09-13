import '../components/SearchBar.css'

const SearchBar = ({ value, onChange }) => {

    return (

        <input
            className="search-bar"
            type="text"
            placeholder="Buscar productos..."
            value={value}
            onChange={(e) => onChange(e.target.value)}
        />

    )

}

export default SearchBar



