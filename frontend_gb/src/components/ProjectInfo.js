import React from "react";
import {useParams} from "react-router-dom";

const ProjectInfo = ({projects}) => {
    let {id} = useParams(),
    project_info = projects.filter(project => project.id == parseInt(id));

    if (project_info[0] != undefined) {
        return (
            <div className="content">
                <h2>{project_info[0].name}</h2>
                <p>Ссылка на репозиторий: {project_info[0].scvLink}</p>
            </div>
        )
    }else{
        return (
            <div className="content">
                <h5>Проект с id = <strong>{id}</strong> не найден!</h5>
            </div>
        )
    }
}

export default ProjectInfo;
