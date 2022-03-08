import React from 'react'
import { MdSearch } from 'react-icons/md'
const SearchNote = ({ handleSearchNote }) => {
	return (
		<div className="searchContainer">
			<MdSearch />
			<input
				placeholder="Type to search notes..."
				onChange={(e) => handleSearchNote(e.target.value)}
				type="text"
			/>
		</div>
	)
}

export default SearchNote
