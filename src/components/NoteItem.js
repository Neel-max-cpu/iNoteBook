import React, { useContext } from 'react'
import noteContext from "../context/notes/noteContext.js"

const NoteItem = (props) => {
    const { note, mode } = props;
    const context = useContext(noteContext);
    const { deleteNote } = context;

    return (
        <div className="col-md-3">
            <div className="card my-3" style={{background:mode==="light"?"white":"#1e1e25"}}>                
                    <div className="card-body">
                        <h5 className="card-title" style={{color:mode==="dark"?"white":""}}>{note.title}</h5>
                        <p className="card-text"style={{color:mode==="dark"? "#ededd2":"", fontFamily:'cursive'}}>{note.description}</p>                
                        <p className="card-text"style={{color:mode==="dark"? "#f7f733":"#5c5858", fontFamily:'cursive'}}>{note.tag}</p>                
                        
                        {/* delete icon */}
                        <i className="fa-solid fa-trash-can mx-2" style={{ color: "red" }} onClick={()=>{deleteNote(note._id)}}></i>

                        {/* edit icon */}
                        <i className="fa-solid fa-pen-to-square mx-2" style={{color : "blue"}}></i>
                    </div>
            </div>
        </div>
    )
}

export default NoteItem
