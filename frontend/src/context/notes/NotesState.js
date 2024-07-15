import NoteContext from './noteContext';
import { useState } from 'react';

const NoteState = (props) => {
  // for local host ---
  // const host = "http://localhost:5000"

  // for vercel connection --
  const host = "https://i-note-book-backend-blue.vercel.app"

  const notesInitial = []

  const [notes, setNotes] = useState(notesInitial);


  // Remember when api calls are done, we have to use cors to give api requests

  // Get all Notes  
  const getNotes = async () => {
    // api calls ---- 
    const response = await fetch(`${host}/api/notes/fetchallnotes`, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
        'auth-token': localStorage.getItem('token')
      },
    });
    const json = await response.json();
    // console.log(json);
    setNotes(json);
  }



  // Add a Note
  const addNote = async (title, description, tag) => {
    // api calls ---- 
    const response = await fetch(`${host}/api/notes/addnote`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'auth-token': localStorage.getItem('token')
      },
      body: JSON.stringify({ title, description, tag })
    });

    const note = await response.json();
    setNotes(notes.concat(note))
  }

  // Delete a Note
  const deleteNote = async (id) => {
    // API call
    const response = await fetch(`${host}/api/notes/deletenote/${id}`, {
      method: 'DELETE',
      headers: {
        'Content-Type': 'application/json',
        'auth-token': localStorage.getItem('token')
      },
    });
    const json = await response.json();
    console.log(json);

    // console.log("deleted with id" + id)
    const newNotes = notes.filter((note) => { return note._id !== id })
    setNotes(newNotes)
  }


  // Edit a Note
  const editNote = async (id, title, description, tag) => {
    // api calls ---- 
    const response = await fetch(`${host}/api/notes/updatenote/${id}`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
        'auth-token': localStorage.getItem('token')
      },
      body: JSON.stringify({ title, description, tag })
    });
    const json = await response.json();
    console.log(json);

    // creating a deep copy
    let newNotes = JSON.parse(JSON.stringify(notes))
    // logic to edit in client side
    for (let index = 0; index < newNotes.length; index++) {
      const element = newNotes[index];
      if (element._id === id) {
        newNotes[index].title = title;
        newNotes[index].description = description;
        newNotes[index].tag = tag;
        break;
      }
    }
    setNotes(newNotes);
  }


  return (
    <NoteContext.Provider value={{ notes, addNote, deleteNote, editNote, getNotes }}>
      {props.children}
    </NoteContext.Provider>
  )
}

export default NoteState;