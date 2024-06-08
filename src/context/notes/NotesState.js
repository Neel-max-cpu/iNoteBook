import NoteContext from './noteContext';
import { useState } from 'react';

const NoteState = (props)=>{
    const s1 = {
        "name":"Neel",
        "class":"5b"
    }
    
    const [state, setState] = useState(s1);
    const update = () =>{
        setTimeout(() => {
            setState({
                "name":"Lary",
                "class":"10D"
            })
        }, 1000);
    }
    
    return(
        <NoteContext.Provider value={{state, update}}>
            {props.children}
        </NoteContext.Provider>
    )
}

export default NoteState;