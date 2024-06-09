import NoteContext from './noteContext';
import { useState } from 'react';

const NoteState = (props)=>{
    const notesInitial = [
        {
          "_id": "666557e5f73b32468e64e4ac",
          "user": "6660423e01264f998d2a1b88",
          "title": "hehe i know",
          "description": "i know ok hehe, and you can't do anything about it",
          "tag": "Personal",
          "date": "2024-06-09T07:21:09.259Z",
          "__v": 0
        },
        {
          "_id": "666557ecf73b32468e64e4ae",
          "user": "6660423e01264f998d2a1b88",
          "title": "hehe i know2",
          "description": "i know ok hehe2, and you can't do anything about it",
          "tag": "Personal",
          "date": "2024-06-09T07:21:16.270Z",
          "__v": 0
        }
      ]

      const [notes, setNotes] = useState(notesInitial);
      
    
    return(
        <NoteContext.Provider value={{notes, setNotes}}>
            {props.children}
        </NoteContext.Provider>
    )
}

export default NoteState;