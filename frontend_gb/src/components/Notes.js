import React from "react";

const NoteItem = ({note}) => {
    return (
        <tr>
            <td>{note.id}</td>
            <td>{note.project}</td>
            <td>{note.text}</td>
            <td>{note.user}</td>
        </tr>
    )
}

const NotesList = ({notes}) => {
    return (
        <div className="table-responsive">
            <table className="table table-striped table-hover">
                <thead className="table-dark">
                    <tr>
                        <th>ID</th>
                        <th>Проект</th>
                        <th>Текст</th>
                        <th>Пользователи</th>
                    </tr>
                </thead>
                <tbody>
                {notes.map((note, i) => <NoteItem note={note} key={i} />)}
                </tbody>
            </table>
        </div>
    )
}

export default NotesList;
