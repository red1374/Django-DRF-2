import React from "react";

class ProjectEditForm extends React.Component {
    FORM_ID = 'projectForm'
    SUCCESS_ALERT_CLASS = 'alert-success'
    ERROR_ALERT_CLASS = 'alert-danger'
    SUCCESS_TEXT = 'Изменения сохранены'
    ERROR_TEXT = 'Ошибка сохранения!'

    constructor(props){
        super(props)
        this.state = {
            'selected_users' : []
        }
    }

    getFormData(event){
        let form = document.getElementById(this.FORM_ID).querySelectorAll('input[type=text], textarea, select'),
            fields = {};

        form.forEach(function(item){
            fields[item.name] = item.value;
        });
        if (this.state.selected_users){
            fields['users'] = [];
            this.state.selected_users.forEach(function(item){
                fields['users'].push(item);
            })
        }

        return fields;
    }

    onMultiSelectChange(event){
        if (!event.target.selectedOptions){
            this.setState({
                'selected_users': []
            })
        }else{
            let users = [];
            for(let i = 0; i < event.target.selectedOptions.length; i++){
                users.push(event.target.selectedOptions.item(i).value)
            };
            this.setState({'selected_users': users});
        }
    }

    handleSubmit(event) {
        event.preventDefault()
        let fields = this.getFormData()

        this.props.update_project(fields)
    }

    render(){
        let show_window = this.props.project != '',
            window_class, window_text;

        if (show_window) {
            window_class = 'alert ' + (this.props.project.id != undefined ? this.SUCCESS_ALERT_CLASS : this.ERROR_ALERT_CLASS);
            window_text  = this.props.project.id != undefined ? this.SUCCESS_TEXT : this.ERROR_TEXT;
        }
        return (
            <main className="form-signin">
                <form id={this.FORM_ID} className="mb-3"
                      onSubmit={(event) => this.handleSubmit(event)}>
                    <h2 className="h3 mb-3 fw-normal">Редактирваоние проекта</h2>
                    <div className="form-floating mb-3">
                        <input type="text" name="name" className="form-control"/>
                        <label>Название</label>
                    </div>
                    <div className="form-floating mb-3">
                        <select name="users_arr" className="form-select" multiple="True"
                                onChange={(event) => this.onMultiSelectChange(event)}>
                            {this.props.users.map((user, key) => <option key={key}
                                                                               value={user.id}>{user.username}</option>)}
                        </select>
                        <label>Пользователи</label>
                    </div>
                    <div className="form-floating mb-3">
                        <input type="text" name="scv_link" className="form-control"/>
                        <label>Ссылка на репозиторий</label>
                    </div>
                    <button className="w-100 btn btn-lg btn-primary" type="submit">Сохранить</button>
                </form>
                {show_window ? <div className={window_class}>{window_text}</div>:''}
            </main>
        )
    }
}

export default ProjectEditForm;
