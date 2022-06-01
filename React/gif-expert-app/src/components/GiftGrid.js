import React, { useState, useEffect } from 'react';
import { useFetchGifts } from '../hooks/useFetchGif';
import { GiftGridItem } from './GiftGridItem';


export const GiftGrid = ({ category }) => {


    const { data: images, loading } = useFetchGifts(category);

    return (
        <>
            <h3 className="animate__animated animate__flash animate__infinite">{category}</h3>
            {loading && <p className="animate__animated animate__flash">Loading</p>}

            <div className="card-grid">
                {
                    images.map(img => (
                        <GiftGridItem
                            key={img.id}
                            {...img} />
                    ))
                }

            </div>
        </>


    )
}
