import React, { useState, useEffect, useRef } from 'react'
import { MdDeleteOutline, MdEditNote } from 'react-icons/md'

const Note = ({
	id,
	title,
	text,
	date,
	handleDeleteNote,
	handleUpdateNote
}) => {
	const [editNote, setEditNote] = useState(false)
	const [noteContent, setNoteContent] = useState({
		id,
		text,
		date
	})

	const characterCount = 250

	const editTextareaRef = useRef(null)
	useEffect(() => {
		if (editNote) {
			editTextareaRef.current.style.height = '0px'
			const scrollHeight = editTextareaRef.current.scrollHeight
			editTextareaRef.current.style.height = scrollHeight + 'px'
		}
	}, [noteContent, editNote])

	const handleDeleteNotes = () => {
		if (!editNote) handleDeleteNote(id)
	}

	const handleShowEditor = () => {
		setEditNote(!editNote)
	}

	const handleNoteContentChange = (e) => {
		if (characterCount - noteContent.text.length >= 0) {
			setNoteContent({
				...noteContent,
				text: e.target.value
			})
		}
	}

	const handleSaveEdits = () => {
		if (characterCount - noteContent.text.length >= 0) {
			handleUpdateNote(id, noteContent.text, date)
			setEditNote(!editNote)
		}
	}
	const handleCancelEdits = () => {
		setEditNote(!editNote)
	}

	return (
		<div className="note">
			<span>
				<h3>{title}</h3>
				{editNote === false && <span>{text}</span>}
				{editNote === true && (
					<span className="update-note">
						<textarea
							ref={editTextareaRef}
							value={noteContent.text}
							onChange={handleNoteContentChange}
							placeholder="Type to add a note..."
							maxLength={250}
						></textarea>
						<div className="update-note-footer">
							<small>
								{characterCount - noteContent.text.length} remaining
							</small>
							<span>
								<button
									className="update-button cancel"
									onClick={handleCancelEdits}
								>
									Cancel
								</button>
								<button className="update-button" onClick={handleSaveEdits}>
									Update
								</button>
							</span>
						</div>
					</span>
				)}
			</span>
			<div className="note-footer">
				<small className="note-date">{date}</small>
				<div className="note-footer-buttons">
					<MdEditNote
						className="edit-icon"
						size="1.3em"
						onClick={handleShowEditor}
					/>
					<MdDeleteOutline
						className={`delete-icon ${editNote && 'disabled'}`}
						size="1.3em"
						onClick={handleDeleteNotes}
					/>
				</div>
			</div>
		</div>
	)
}

export default Note
