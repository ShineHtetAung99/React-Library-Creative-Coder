import React, { useEffect, useState } from 'react'
import book from '../assets/book.png';
import { Link, useLocation } from 'react-router-dom';
import useTheme from '../hooks/useTheme';
import { db } from '../firebase';
import { collection, getDocs } from 'firebase/firestore';

export default function BookList() {
    let location = useLocation();
    let params = new URLSearchParams(location.search);
    let search = params.get('search');

    let [error, setError] = useState('');
    let [loading, setLoading] = useState(false);
    let [books, setBooks] = useState([]);
    
    useEffect(function() {
        let ref = collection(db,'books');
        getDocs(ref).then(docs => {
            let books = [];
            docs.forEach(doc => {
                let book = {id : doc.id, ...doc.data()}
                books.push(book)
            })
            setBooks(books);
        })
    },[])

    if (error) {
        return <p>{error}</p>
    }

    let {isDark} = useTheme();
    return (
        <div>
            { loading && <p>Loading ... </p>}
            {!!books && (
                <div className="grid grid-cols-2 md:grid-cols-4 gap-4 my-3">
                    {books.map((b) => (
                        <Link to={`/books/${b.id}`} key={b.id}>
                            <div className={`p-4 border border-1 min-h-[420px] ${isDark ? 'bg-dcard border-primary text-white' : ''}`}>
                                <img src={book} alt="" />
                                <div className='text-center'>
                                    <h1>{b.title}</h1>
                                    <p>{b.description}</p>
                                    <div className="flex flex-wrap">
                                        {b.categories.map(c => (
                                        <span className="mx-1 my-1 text-white rounded-full px-2 py-1 text-sm bg-blue-500" key={c}>{c}</span>
                                        ))}
                                    </div>
                                </div>
                            </div>
                        </Link>
                    ))}
                </div>
            )}
            {books && !books.length && <p className='text-center text-xl text-gray-500'>No Search Results Found</p>}
        </div>
    )
}
