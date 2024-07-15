import React, { useContext, useEffect, useRef, useState } from 'react'
import noteContext from "../context/notes/noteContext.js"
import NoteItem from './NoteItem.js';
import AddNote from './AddNote.js';
import { useNavigate } from 'react-router-dom';

const Notes = (props) => {
    const context = useContext(noteContext);
    const { notes, getNotes, editNote } = context;
    const [noteCount, setNoteCount] = useState(0);

    let navigate = useNavigate();
    useEffect(() => {
        if (localStorage.getItem('token')) {
            getNotes()
        }
        else {
            navigate("/login");
        }
        // eslint-disable-next-line
    }, [])

    const ref = useRef(null);
    const refClose = useRef(null);
    const [note, setNote] = useState({ id: "", etitle: "", edescription: "", etag: "" });

    const updateNote = (currentNote) => {
        // launch model button is reffered to edit button
        ref.current.click();
        setNote({ id: currentNote._id, etitle: currentNote.title, edescription: currentNote.description, etag: currentNote.tag });
    }


    const handleClick = (e) => {
        // console.log("updating the note...", note)
        // call the editNote funcition
        editNote(note.id, note.etitle, note.edescription, note.etag);
        refClose.current.click();
        props.showAlert("Updated Successfully", "success");
    }

    // ... spread operator
    const onChange = (e) => {
        setNote({ ...note, [e.target.name]: e.target.value })
    }

    const myStyle = {
        color: props.mode === 'dark' ? 'white' : 'black',
        // backgroundColor: mode === 'dark' ? 'rgb(39 36 36 / 85%)' : 'white',
        backgroundColor: props.mode === 'dark' ? '#1e1e25' : 'white',
        // border: '1px solid',
        // borderColor: props.mode === 'dark' ? 'white' : 'rgb(0 0 0 / 85%)'
    }

    const innerStyle = {
        background: props.mode === 'dark' ? '#5a5a66' : '#bcbcff',
        color: props.mode === 'dark' ? 'white' : 'black',
        border: 'none',
    }


    // count the number of notes
    const fetchNoteCount = async () => {
        try {  
            // for local host 
            const response = await fetch("http://localhost:5000/api/notes/count", {

            // for connecting to vercel
            // const response = await fetch("https://i-note-book-backend-sand.vercel.app/api/notes/count", {
                method: 'GET',
                headers: {
                    'Content-Type': 'application/json',
                    'auth-token': localStorage.getItem('token') // Assuming you're using a token for auth
                }
            });

            const json = await response.json();
            if (response.status === 200) {
                setNoteCount(json.count);
            } else {
                console.error("Failed to fetch note count");
            }
        } catch (error) {
            console.error("Error fetching note count:", error);
        }
    };

    const getNotesAndCount = async () => {
        await getNotes();
        await fetchNoteCount();
    };

    // using useeffect to show the updated notes
    useEffect(() => {
        getNotesAndCount();
        // eslint-disable-next-line
    }, []);


    return (
        <>
            <AddNote showAlert={props.showAlert} mode={props.mode} updateNotes={getNotesAndCount} />


            {/* EDIT NOTE Modal */}
            {/*Button trigger modal -- but d-none(display none) */}
            <button type="button" className="btn btn-primary d-none" ref={ref} data-bs-toggle="modal" data-bs-target="#exampleModal">
                Launch demo modal
            </button>
            {/* Modal */}
            <div className="modal fade" id="exampleModal" tabIndex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
                <div className="modal-dialog">
                    <div className="modal-content" style={myStyle}>
                        <div className="modal-header">
                            {/* <h1 className="modal-title fs-5" id="exampleModalLabel" style={{color:'black'}} >Edit Note</h1> */}
                            <h1 className="modal-title fs-5" id="exampleModalLabel" >Edit Note</h1>
                            <button style={{ color: props.mode === "dark" ? 'white' : 'black' }} type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                        </div>
                        <div className="modal-body">
                            {/* form like Add Note--------- */}
                            <form className='my-3'>
                                <div className="mb-3">
                                    {/* <label htmlFor="title" className="form-label" style={{color:'black'}}>Title</label> */}
                                    <label htmlFor="title" className="form-label">Title</label>
                                    <input type="text" style={innerStyle} value={note.etitle} className="form-control" id="etitle" name="etitle" aria-describedby="emailHelp" onChange={onChange} minLength={5} required />
                                </div>
                                <div className="mb-3">
                                    {/* <label htmlFor="description" className="form-label" style={{color:'black'}}>Description</label> */}
                                    <label htmlFor="description" className="form-label">Description</label>
                                    <input type="text" style={innerStyle} value={note.edescription} className="form-control" id="edescription" name="edescription" onChange={onChange} minLength={5} required />
                                </div>
                                <div className="mb-3">
                                    {/* <label htmlFor="tag" className="form-label" style={{color:'black'}}>Tag</label> */}
                                    <label htmlFor="tag" className="form-label">Tag</label>
                                    <input type="text" style={innerStyle} value={note.etag} className="form-control" id="etag" name="etag" onChange={onChange} />
                                </div>
                            </form>
                        </div>
                        <div className="modal-footer">
                            <button ref={refClose} type="button" className="btn btn-secondary" data-bs-dismiss="modal">Close</button>
                            <button disabled={note.etitle.length < 3 || note.edescription.length < 5} type="button" onClick={handleClick} className="btn btn-primary">Update Note</button>
                        </div>
                    </div>
                </div>
            </div>

            <div>
                <h2>Your Notes : {noteCount} 😊✨</h2>
            </div>

            <div className="row my-4">
                <h2>Notes</h2>
                <div className="container">
                    {notes.length === 0 && 'No Notes To Display'}
                </div>
                {notes.map((note) => {
                    return <NoteItem key={note._id} updateNote={updateNote} note={note} showAlert={props.showAlert} mode={props.mode} fetchNoteCount={fetchNoteCount}
                        getNotesAndCount={getNotesAndCount} />
                })}
            </div>
        </>

    )
}

export default Notes
