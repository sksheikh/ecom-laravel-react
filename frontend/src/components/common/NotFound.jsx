import React from 'react'

function NotFound({ text = 'Records not found!' }) {
    return (
        <div className='text-center'>
            {text}
        </div>
    )
}

export default NotFound
