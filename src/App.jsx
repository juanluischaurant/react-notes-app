import React, { useEffect, useState } from 'react'
import { nanoid } from 'nanoid'
import NotesList from './components/NotesList'
import SearchNote from './components/SearchNote'
import Header from './components/Header'

const App = () => {
	const [notes, setNotes] = useState([
		// sample entry
		// {
		// 	id: nanoid(),
		// 	text: 'Welcome, drop your notes here',
		// 	date: '1/1/2022'
		// }
	])
	const [searchNote, setSearchNote] = useState('')

	useEffect(() => {
		// load stored notes
		const savedNotes = JSON.parse(localStorage.getItem('react-notes-app-data'))
		if (savedNotes) setNotes(savedNotes)
	}, [])

	useEffect(() => {
		// save the notes state each time in changes and when the app loads
		localStorage.setItem('react-notes-app-data', JSON.stringify(notes))
	}, [notes])

	const addNote = (noteTitle, noteContent) => {
		const date = new Date()

		setNotes([
			...notes,
			{
				id: nanoid(),
				title: noteTitle,
				text: noteContent,
				date: date.toLocaleDateString()
			}
		])
	}

	const deleteNote = (noteId) => {
		let filteredNotes = notes.filter((el) => el.id !== noteId)
		setNotes(filteredNotes)
	}

	const editNote = (noteId, noteContent, noteDate) => {
		// const elementIndex = notes.findIndex((note) => note.id === noteId)

		let newState = notes.map((el) =>
			el.id === noteId ? { ...el, text: noteContent } : el
		)

		setNotes(newState)
	}

	const handleSearchNote = (searchTerm) => {
		setSearchNote(searchTerm)
	}

	return (
		<>
			<Header />
			<div className="container">
				<SearchNote handleSearchNote={handleSearchNote} />
				<NotesList
					notes={notes.filter((note) =>
						note.text.toLowerCase().includes(searchNote)
					)}
					handleAddNote={addNote}
					handleDeleteNote={deleteNote}
					handleUpdateNote={editNote}
				></NotesList>
			</div>
		</>
	)
}

export default App
