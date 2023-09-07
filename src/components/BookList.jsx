import React from 'react'
import book from '../assets/book.png';
import useFetch from '../hooks/useFetch';
import { Link } from 'react-router-dom';

export default function BookList() {
    let { data : books , loading , error } = useFetch('http://localhost:3000/books');

    if (error) {
        return <p>{error}</p>
    }

    return (
        <div>
            { loading && <p>Loading ... </p>}
            {!!books && (
                <div className="grid grid-cols-2 md:grid-cols-4 gap-4 my-3">
                    {books.map((b) => (
                        <Link to={`/books/${b.id}`} key={b.id}>
                            <div className="p-4 border border-1">
                                <img src={book} alt="" />
                                    <div>
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
        </div>
    )
}
