import React, { useContext, useState } from 'react'
import noteContext from "../context/notes/noteContext.js"

const AddNote = ({showAlert, mode, updateNotes}) => {
    const context = useContext(noteContext);
    const { addNote } = context;

    const [note, setNote] = useState({ title: "", description: "", tag: "" });

    const handleClick = (e) => {
        // to prevent page reload
        e.preventDefault();
        addNote(note.title, note.description, note.tag);
        // after submitting clear all the inputs
        setNote({ title: "", description: "", tag: "" });
        
        showAlert("Note Added Successfully", "success");
        
        // calling the update note to fetch the count
        updateNotes();
    }

    // ... spread operator
    const onChange = (e) => {
        setNote({ ...note, [e.target.name]: e.target.value })
    }
    return (
        <div className="container my-4">
            <h2>Add Your Note</h2>
            <form className='my-3'>
                <div className="mb-3">
                    <label htmlFor="title" className="form-label">Title</label>
                    {/* <input type="text" className="form-control" id="title" name="title" aria-describedby="emailHelp" onChange={onChange} /> */}
                    <input type="text" className="form-control" id="title" name="title" aria-describedby="emailHelp" value={note.title} onChange={onChange} style={{background : mode === 'dark'? '#1e1e25':'#dfdfed' , border:mode==='dark'?'none':'none', color:mode==='dark'?'white':'black'}} minLength={5} required/>
                </div>
                <div className="mb-3">
                    <label htmlFor="description" className="form-label">Description</label>
                    <input type="text" className="form-control" id="description" name="description" value={note.description} onChange={onChange} style={{background : mode === 'dark'? '#1e1e25':'#dfdfed', border:mode==='dark'?'none':'none', color:mode==='dark'?'white':'black'}} minLength={5} required/>
                </div>
                <div className="mb-3">
                    <label htmlFor="tag" className="form-label">Tag</label>
                    <input type="text" className="form-control" id="tag" name="tag" value={note.tag} onChange={onChange} style={{background: mode === 'dark'? '#1e1e25':'#dfdfed', border:mode==='dark'?'none':'none', color:mode==='dark'?'white':'black'}} />
                </div>
                <button disabled={note.title.length<3 || note.description.length<5} type="submit" className="btn btn-primary"  onClick={handleClick}>Add Note</button>
            </form>
        </div>
    )
}
export default AddNote
