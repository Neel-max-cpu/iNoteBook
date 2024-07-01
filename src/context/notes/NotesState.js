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
    console.log(json);
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


    console.log("adding a new note")
    const note = {
      "_id": "666557ecf73b32468e64e4aea",
      "user": "6660423e01264f998d2a1b88",
      "title": title,
      "description": description,
      "tag": tag,
      "date": "2024-06-09T07:21:16.270Z",
      "__v": 0
    }
    setNotes(notes.concat(note))
  }

  // Delete a Note
  const deleteNote = (id) => {
    console.log("deleted with id" + id)
    const newNotes = notes.filter((note) => { return note._id !== id })
    setNotes(newNotes)
  }


  // Edit a Note
  const editNote = async (id, title, description, tag) => {
    // api calls ---- 
    const response = await fetch(`${host}/api/notes/updatenote/${id}`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'auth-token' : 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyIjp7ImlkIjoiNjY2MDQyM2UwMTI2NGY5OThkMmExYjg4In0sImlhdCI6MTcxNzY1MTYwMX0.gbzjTvsiRzM70zTW8vAGXXHxiFy25qnu21-wm12MzZY'
      },
      body: JSON.stringify({title, description, tag})
    });
    const json =  response.json();

  // logic to edit in client side
  for (let index = 0; index < notes.length; index++) {
    const element = notes[index];
    if (element._id === id) {
      element.title = title;
      element.description = description;
      element.tag = tag;
    }
  }
}


return (
  <NoteContext.Provider value={{ notes, addNote, deleteNote, editNote, getNotes}}>
    {props.children}
  </NoteContext.Provider>
)
}

export default NoteState;