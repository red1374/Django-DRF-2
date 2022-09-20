import React from "react";
import {Link} from "react-router-dom";

const NoteItem = ({note, delete_note}) => {
    return (
        <tr>
            <td>{note.id}</td>
            <td>{note.project.name}</td>
            <td>{note.text}</td>
            <td>{note.user.username}</td>
            <td>
                <button className="btn btn-danger" onClick={() => delete_note(note.id)} type="button">Удалить</button>
            </td>
        </tr>
    )
}

class NotesList extends React.Component {
    constructor(props) {
        super(props);
    }

    search_submit(event){
        event.preventDefault();

        let str = event.currentTarget.querySelector('input[type=text]').value;

        this.props.search_project(str)
    }

    render() {
        return (
            <div className="table-responsive">
                <div className="d-flex mb-5 justify-content-between">
                    <form onSubmit={(event) => this.search_submit(event)} className="d-flex justify-content-between w-90">
                        <div className="form-floating w-90">
                            <input className="form-control" type="text"/>
                            <label>Найти по имени проекта</label>
                        </div>
                        <button type="submit" className="btn btn-secondary">Найти</button>
                    </form>
                    <div>
                        <Link className="btn btn-success" to="/notes/create/">Добавить</Link>
                    </div>
                </div>
                {this.props.notes.length ?
                    <table className="table table-striped table-hover">
                        <thead className="table-dark">
                        <tr>
                            <th>ID</th>
                            <th>Проект</th>
                            <th>Текст</th>
                            <th>Пользователи</th>
                            <th>&nbsp;</th>
                        </tr>
                        </thead>
                        <tbody>
                        {this.props.notes.map((note, i) => <NoteItem note={note} key={i} delete_note={this.props.delete_note}/>)}
                        </tbody>
                    </table> :
                    <div className="alert alert-info">Список пуст</div>
                }
            </div>
        )
    }
}

export default NotesList;
