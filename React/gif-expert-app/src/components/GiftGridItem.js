import React from 'react'

export const GiftGridItem = ({ id, title, url }) => {
    return (
        < div className="card animate__animated animate__fadeIn">
            <img src={url} alt={title}></img>
            <p>{title}</p>
        </div>
    )
}
