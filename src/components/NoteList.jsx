import React from 'react'
import useFirestore from '../hooks/useFirestore';
import { useParams } from 'react-router-dom';
import moment from 'moment/moment';
import trashIcon from '../assets/trash.svg';

export default function NoteList() {

    let { id } = useParams();
    let { getCollection, deleteDocument } = useFirestore();
    let { error, data: notes, loading } = getCollection('notes', ['bookUid', '==', id]);
    let deleteNote = async (id) => {
        await deleteDocument('notes', id);
    }
    
    return (
        !! notes.length && (
            notes.map(note => (
                <div className='border-2 shadow-md p-3 my-3' key={note.id}>
                    <div className='flex space-x-3 justify-between'>
                        <div>
                            <img src="https://assets.bitdegree.org/online-learning-platforms/storage/media/2018/08/what-is-a-web-developer.jpg" className='w-12 h-12 rounded-full' alt="" />
                            <div>
                                <h3>Shine Htet A</h3>
                                <div className='text-gray-400'>{moment(note?.date?.seconds * 1000).fromNow()}</div>
                            </div>
                        </div>
                        <div className='cursor-pointer' onClick={() => deleteNote(note.id)}>
                            <img src={trashIcon} alt="" />
                        </div>
                    </div>
                    <div className='mt-3'>
                        {note.body}
                    </div>
                </div>
            ))
        )
    )
}
