import React from 'react'
import { NotesAppBar } from './NotesAppBar'

export const NotesScreen = () => {
    return (
        <div className="notes_main-content">
            <NotesAppBar />
            <div className="notes_content">
                <input
                    type="text"
                    placeholder="some awesome title"
                    className="notes__title-input" />

                <textarea
                    placeholder="What happened today"
                    className="notes__textarea"></textarea>
                <div className="notes__image">
                    <img src="https://i.blogs.es/aa1b9a/luna-100mpx/450_1000.jpg" alt="Imagen" />

                </div>
            </div>
        </div>
    )
}
