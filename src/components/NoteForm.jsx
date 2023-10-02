import React, { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom';
import useFirestore from '../hooks/useFirestore';
import useTheme from '../hooks/useTheme';

export default function NoteForm({type="create", setEditNote, editNote}) {

    let { isDark } = useTheme();
    let { id } = useParams();
    let [body, setBody] = useState('');
    let { addCollection, updateDocument } = useFirestore();

    useEffect(() => {
        if (type == 'update') {
            setBody(editNote.body)
        }
    }, [type])
    
    let submit = async (e) => {
        e.preventDefault()
        if (type == 'create') {
            let data = {
                body,
                bookUid : id
            }
            await addCollection('notes', data);
            setBody('');
        } else {
            editNote.body = body;
            await updateDocument('notes', editNote.id, editNote, false);
            setEditNote(null);
        }

    }
    return (
            <form onSubmit={submit}>
                    <textarea value={body} onChange={e => setBody(e.target.value)} className='bg-gray-50 w-full shadow-md border-2 p-3' name="" id="" cols="30" rows="5"></textarea>
                    <div className="flex space-x-3">
                        <button type='submit' className='text-white bg-primary px-3 py-2 my-3 rounded-lg flex items-center gap-1'>
                            <span className='hidden md:block'>{type == 'create' ? 'Add' : 'Update'} Note</span>
                        </button>
                        {type == 'update' && <button onClick={() => setEditNote(null)} type='button' className='text-primary border-2 border-primary px-3 py-2 my-3 rounded-lg flex items-center gap-1'>
                            <span className='hidden md:block'>Cancel</span>
                        </button>}
                    </div>
            </form> 
    )
}
