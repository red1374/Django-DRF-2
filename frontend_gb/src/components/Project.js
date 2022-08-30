import React from "react";
import {Link} from "react-router-dom";

const ProjectItem = ({project}) => {
    return (
        <tr>
            <td>{project.id}</td>
            <td>
                <Link to={`/project/${project.id}`}>{project.name}</Link>
            </td>
        </tr>
    )
}

const ProjectsList = ({projects}) => {
    return (
        <div className="table-responsive">
            <table className="table table-striped table-hover">
                <thead className="table-dark">
                    <tr>
                        <th>ID</th>
                        <th>Название</th>
                    </tr>
                </thead>
                <tbody>
                {projects.map((project, i) => <ProjectItem project={project} key={i} />)}
                </tbody>
            </table>
        </div>
    )
}

export default ProjectsList;
