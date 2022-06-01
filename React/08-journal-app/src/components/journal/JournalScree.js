import React from 'react'
import { NotesScreen } from '../notes/NotesScreen'
import { NothingSelected } from './NothingSelected'
import { Sidebar } from './Sidebar'

export const JournalScree = () => {
    return (
        <div className="journal__main-content">
            {/* <h1>Journal Screen</h1> */}

            <Sidebar />
            <main>
                {/* <NothingSelected /> */}

                <NotesScreen />
            </main>
        </div>
    )
}
