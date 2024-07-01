import React, { useContext, useEffect } from 'react'
import noteContext from "../context/notes/noteContext.js"
import NoteItem from './NoteItem.js';
import AddNote from './AddNote.js';

const Notes = (props) => {
    const context = useContext(noteContext);
    const {notes, getNotes} = context;
    useEffect(() => {
        getNotes()
    }, []);
    
    return (
        <>
            <AddNote mode={props.mode}/>  
            <div className="row my-4">
                <h2>Your Notes</h2>
                {notes.map((note) => {
                    return <NoteItem key={note._id} note={note} mode={props.mode} />
                })}
            </div>
        </>

    )
}

export default Notes
