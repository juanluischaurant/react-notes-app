import React from 'react'
import AddNote from './AddNote'
import Note from './Note'

const NotesList = ({
	notes,
	handleAddNote,
	handleDeleteNote,
	handleUpdateNote
}) => {
	return (
		<div className="notes-list">
			{notes.map((note) => {
				return (
					<Note
						id={note.id}
						key={note.id}
						date={note.date}
						title={note.title}
						text={note.text}
						handleDeleteNote={handleDeleteNote}
						handleUpdateNote={handleUpdateNote}
					/>
				)
			})}
			<AddNote handleAddNote={handleAddNote} />
		</div>
	)
}

export default NotesList
