import PropTypes from 'prop-types'
import './SearchBar.css'

/**
 * Input pencarian terkontrol (controlled input); nilai disimpan oleh komponen induk.
 */
function SearchBar({ value, onChange }) {
  return (
    <div className="search-bar">
      <input
        type="search"
        className="search-bar__input"
        value={value}
        onChange={(event) => onChange(event.target.value)}
        placeholder="Cari judul atau penulis..."
        aria-label="Cari buku"
      />
    </div>
  )
}

SearchBar.propTypes = {
  value: PropTypes.string.isRequired,
  onChange: PropTypes.func.isRequired,
}

export default SearchBar
