import React, { useState, useEffect, useRef } from 'react'
import { MdAdd } from 'react-icons/md'

const AddNote = ({ handleAddNote }) => {
	const [noteContent, setNoteContent] = useState('')
	const [noteTitle, setNoteTitle] = useState('')
	let characterCount = 250

	const textareaRef = useRef(null)
	useEffect(() => {
		textareaRef.current.style.height = '0px'
		const scrollHeight = textareaRef.current.scrollHeight
		textareaRef.current.style.height = scrollHeight + 'px'
	}, [noteContent])

	const handleSaveNoteContent = () => {
		if (noteContent.trim().length > 0) {
			handleAddNote(noteTitle, noteContent)
			setNoteTitle('')
			setNoteContent('')
		}
	}

	const handleContentChange = (e) => {
		if (characterCount - noteContent.length > 0) {
			setNoteContent(e.target.value)
		}
	}

	const handleTitleChange = (e) => {
		setNoteTitle(e.target.value)
		// console.log(noteTitle)
	}

	return (
		<div className="note new-note">
			<span>
				<input
					type="text"
					placeholder="Type a title..."
					onChange={handleTitleChange}
					value={noteTitle}
				/>
				<textarea
					className="new-note-text-area"
					ref={textareaRef}
					placeholder="Type to add a note..."
					value={noteContent}
					onChange={handleContentChange}
					maxLength={250}
				></textarea>
			</span>

			<div className="note-footer new">
				<small>{characterCount - noteContent.length} remaining</small>
				<button className="save-button" onClick={handleSaveNoteContent}>
					Add note <MdAdd className="save-icon" />
				</button>
			</div>
			{/* end of footer */}
		</div>
	)
}

export default AddNote
