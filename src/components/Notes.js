import React, { useContext, useEffect, useRef, useState } from 'react'
import noteContext from "../context/notes/noteContext.js"
import NoteItem from './NoteItem.js';
import AddNote from './AddNote.js';

const Notes = (props) => {
    const context = useContext(noteContext);
    const { notes, getNotes } = context;
    useEffect(() => {
        // eslint-disable-next-line
        getNotes()
    }, []);

    const updateNote = (currentNote) => {
        // launch model button is reffered to edit button
        ref.current.click();
        setNote({etitle:currentNote.title, edescription:currentNote.description, etag:currentNote.tag});
    }

    const ref = useRef(null)


    const [note, setNote] = useState({etitle:"", edescription:"", etag:""});

    const handleClick = (e) =>{
        // to prevent page reload
        console.log("updating the note...", note)
        e.preventDefault();

    }

    // ... spread operator
    const onChange = (e)=>{
        setNote({...note, [e.target.name]:e.target.value})
    }

    return (
        <>
            <AddNote mode={props.mode} />

            {/*Button trigger modal -- but d-none(display none) */}
            <button type="button" className="btn btn-primary d-none" ref={ref} data-bs-toggle="modal" data-bs-target="#exampleModal">
                Launch demo modal
            </button>
            {/* Modal */}
            <div className="modal fade" id="exampleModal" tabIndex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
                <div className="modal-dialog">
                    <div className="modal-content">
                        <div className="modal-header">
                            <h1 className="modal-title fs-5" id="exampleModalLabel">Edit Note</h1>
                            <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                        </div>
                        <div className="modal-body">
                            {/* form like Add Note--------- */}
                            <form className='my-3'>
                                <div className="mb-3">
                                    <label htmlFor="title" className="form-label">Title</label>
                                    <input type="text" value={note.etitle} className="form-control" id="etitle" name="etitle" aria-describedby="emailHelp" onChange={onChange} />
                                </div>
                                <div className="mb-3">
                                    <label htmlFor="description" className="form-label">Description</label>
                                    <input type="text" value={note.edescription} className="form-control" id="edescription" name="edescription" onChange={onChange} />
                                </div>
                                <div className="mb-3">
                                    <label htmlFor="tag" className="form-label">Tag</label>
                                    <input type="text" value={note.etag} className="form-control" id="etag" name="etag" onChange={onChange} />
                                </div>
                            </form>
                        </div>
                        <div className="modal-footer">
                            <button type="button" className="btn btn-secondary" data-bs-dismiss="modal">Close</button>
                            <button type="button" onClick={handleClick} className="btn btn-primary">Update Note</button>
                        </div>
                    </div>
                </div>
            </div>

            <div className="row my-4">
                <h2>Your Notes</h2>
                {notes.map((note) => {
                    return <NoteItem key={note._id} updateNote={updateNote} note={note} mode={props.mode} />
                })}
            </div>
        </>

    )
}

export default Notes
