import React from 'react'
import { useParams } from 'react-router-dom'
import useTheme from '../hooks/useTheme';
import useFirestore from '../hooks/useFirestore';

export default function BookDetail() {
    let { id } = useParams();
    let {isDark} = useTheme();

    let {getDocument} = useFirestore();
    let {error,loading,data : book} = getDocument('books',id)

    return (
        <>
            {error && <p>{error}</p>}
            {loading && <p>loading ....</p>}
            {book && (
                <>
                    <div className={`grid grid-cols-2 ${isDark ? 'text-white' : ''}`}>
                        <div>
                            <img src={book.cover} alt="" className='w-[80%]' />
                        </div>
                        <div className='space-y-4'>
                            <h1 className='text-3xl font-bold'>{book.title}</h1>
                            <div className='space-x-3'>
                                {book.categories.map(cateogry => (
                                    <span className='bg-blue-500 text-white rounded-full text-sm px-2 py-1' key={cateogry}>{cateogry}</span>
                                ))}
                            </div>
                            <p>
                                {book.description}
                            </p>
                        </div>
                    </div>
                    <div>
                        <h3 className='font-bold text-xl text-primary my-3 text-center'>My Notes</h3>
                        <textarea className='bg-gray-50 w-full shadow-md border-2 p-3' name="" id="" cols="30" rows="5"></textarea>
                        <button className='text-white bg-primary px-3 py-2 my-3 rounded-lg flex items-center gap-1'>
                            <span className='hidden md:block'>Add Note</span>
                        </button>
                        <div className='border-2 shadow-md p-3 my-3'>
                            <div className='flex space-x-3'>
                                <img src="https://assets.bitdegree.org/online-learning-platforms/storage/media/2018/08/what-is-a-web-developer.jpg" className='w-12 h-12 rounded-full' alt="" />
                                <div>
                                    <h3>Shine Htet A</h3>
                                    <div className='text-gray-400'>20.9.2023</div>
                                </div>
                            </div>
                            <div className='mt-3'>
                                Lorem ipsum, dolor sit amet consectetur adipisicing elit. Sunt saepe perspiciatis at? Sequi fugiat culpa voluptas dolor temporibus eveniet iure error magni asperiores praesentium molestias, nisi dolorum dignissimos assumenda? Nulla?
                            </div>
                        </div>
                    </div>
                </>
            )}
        </>
    )
}