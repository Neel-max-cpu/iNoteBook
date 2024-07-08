import NoteContext from './noteContext';
import { useState } from 'react';

const NoteState = (props) => {
  const host = "http://localhost:5000"
  const notesInitial = []

  const [notes, setNotes] = useState(notesInitial);


  // Remember when api calls are done, we have to use cors to give api requests

  // Get all Notes  
  const getNotes = async () => {    
    // api calls ---- 
    const response = await fetch(`${host}/api/notes/fetchallnotes`, {
      method: 'GET',
      headers: {
        'auth-token' : 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyIjp7ImlkIjoiNjY2MDQyM2UwMTI2NGY5OThkMmExYjg4In0sImlhdCI6MTcxNzY1MTYwMX0.gbzjTvsiRzM70zTW8vAGXXHxiFy25qnu21-wm12MzZY'
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
        'auth-token' : 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyIjp7ImlkIjoiNjY2MDQyM2UwMTI2NGY5OThkMmExYjg4In0sImlhdCI6MTcxNzY1MTYwMX0.gbzjTvsiRzM70zTW8vAGXXHxiFy25qnu21-wm12MzZY'
      },
      body: JSON.stringify({title, description, tag})
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
        'auth-token' : 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyIjp7ImlkIjoiNjY2MDQyM2UwMTI2NGY5OThkMmExYjg4In0sImlhdCI6MTcxNzY1MTYwMX0.gbzjTvsiRzM70zTW8vAGXXHxiFy25qnu21-wm12MzZY'
      },
    });
    const json = await response.json();
    // console.log(json);

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
        'auth-token' : 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyIjp7ImlkIjoiNjY2MDQyM2UwMTI2NGY5OThkMmExYjg4In0sImlhdCI6MTcxNzY1MTYwMX0.gbzjTvsiRzM70zTW8vAGXXHxiFy25qnu21-wm12MzZY'
      },
      body: JSON.stringify({title, description, tag})
    });
    const json = await response.json();
    // console.log(json);

  // logic to edit in client side
  for (let index = 0; index < notes.length; index++) {
    const element = notes[index];
    if (element._id === id) {
      notes[index].title = title;
      notes[index].description = description;
      notes[index].tag = tag;
    }
    break;
  }
  setNotes(notes);
}


return (
  <NoteContext.Provider value={{ notes, addNote, deleteNote, editNote, getNotes}}>
    {props.children}
  </NoteContext.Provider>
)
}

export default NoteState;