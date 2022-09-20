import React from "react";
import {Link} from "react-router-dom";

const ProjectItem = ({project, delete_project, update_project}) => {
    let users = [];
    project.users.forEach(function(user){
        users.push(user.username)
    });

    return (
        <tr>
            <td>{project.id}</td>
            <td>
                <Link to={`/project/${project.id}`}>{project.name}</Link>
            </td>
            <td>{users.join(', ')}</td>
            <td>
                <button className="btn btn-danger" onClick={() => delete_project(project.id)} type="button">Удалить</button>
            </td>
            <td>
                <Link to="/projects/edit/" className="btn btn-info" onClick={() => update_project(project.id)} type="button">Редактировать</Link>
            </td>
        </tr>
    )
}


class ProjectsList extends React.Component {
    constructor(props) {
        super(props);
    }

    search_submit(event){
        event.preventDefault();

        let str = event.currentTarget.querySelector('input[type=text]').value;

        this.props.search_project(str)
    }

    render(){
        return (
            <div className="table-responsive">
                <div className="d-flex mb-5 justify-content-between">
                    <form onSubmit={(event) => this.search_submit(event)}
                          className="d-flex justify-content-between w-90">
                        <div className="form-floating w-90">
                            <input className="form-control" type="text"/>
                            <label>Найти по имени</label>
                        </div>
                        <button type="submit" className="btn btn-secondary">Найти</button>
                    </form>
                    <div>
                        <Link className="btn btn-success" to="/projects/create/">Добавить</Link>
                    </div>
                </div>
                {this.props.projects.length ?
                    <table className="table table-striped table-hover">
                        <thead className="table-dark">
                        <tr>
                            <th>ID</th>
                            <th>Название</th>
                            <th>Пользователи</th>
                            <th>&nbsp;</th>
                            <th>&nbsp;</th>
                        </tr>
                        </thead>
                        <tbody>
                        {this.props.projects.map((project, i) => <ProjectItem project={project} key={i}
                                                                   delete_project={this.props.delete_project}/>)}
                        </tbody>
                    </table> :
                    <div className="alert alert-info">Список пуст</div>
                }
            </div>
        )
    }
}

export default ProjectsList;
