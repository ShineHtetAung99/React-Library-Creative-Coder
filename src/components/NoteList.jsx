import React from 'react'

export default function NoteList() {
    return (
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
    )
}
