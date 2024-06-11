import React, {useContext} from 'react'
import noteContext from "../context/notes/noteContext.js"
import NoteItem from './NoteItem.js';

const Notes = (props) => {
    const context = useContext(noteContext);
    const {notes, setNotes} = context;
    return (
    
        <div className="row my-4">
            <h2>Your Notes</h2>
            {notes.map((note)=>{
                return <NoteItem key ={note._id} note={note} mode={props.mode}/>
            })}
        </div>
    
  )
}

export default Notes
