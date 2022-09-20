import React from "react";

class NoteForm extends React.Component {
    FORM_ID = 'noteForm'
    SUCCESS_ALERT_CLASS = 'alert-success'
    ERROR_ALERT_CLASS = 'alert-danger'
    SUCCESS_TEXT = 'Заметка добавлена'
    ERROR_TEXT = 'Ошибка добавления!'

    constructor(props){
        super(props)
        this.state = {}
    }

    getFormData(event){
        let inputs = document.getElementById(this.FORM_ID).querySelectorAll('input[type=text], textarea, select'),
            fields = {};

        inputs.forEach(function(item){
            fields[item.name] = item.value;
        });

        return fields;
    }

    handleSubmit(event) {
        let fields = this.getFormData()
        event.preventDefault()
        this.props.create_note(fields)
    }

    render(){
        let show_window = this.props.item != '',
            window_class, window_text;

        if (show_window) {
            window_class = 'alert ' + (this.props.item.id != undefined ? this.SUCCESS_ALERT_CLASS : this.ERROR_ALERT_CLASS);
            window_text  = this.props.item.id != undefined ? this.SUCCESS_TEXT : this.ERROR_TEXT;
        }
        return (
            <main className="form-signin">
                <form id={this.FORM_ID} className="mb-3"
                      onSubmit={(event) => this.handleSubmit(event)}>
                    <h2 className="h3 mb-3 fw-normal">Новая заметка</h2>
                    <div className="form-floating mb-3">
                        <select name="project" className="form-select">
                            {this.props.projects.map((project, key) => <option key={key}
                                                                               value={project.id}>{project.name}</option>)}
                        </select>
                        <label>Проект</label>
                    </div>
                    <div className="form-floating mb-3">
                        <textarea name="text" placeholder="Текст заметки" className="form-control form-textarea"></textarea>
                        <label>Текст:</label>
                    </div>
                    <button className="w-100 btn btn-lg btn-primary" type="submit">Добавить</button>
                </form>
                {show_window ? <div className={window_class}>{window_text}</div>:''}
            </main>
        )
    }
}

export default NoteForm;
