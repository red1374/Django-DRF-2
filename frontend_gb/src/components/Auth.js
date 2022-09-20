import React from "react";
import {Link} from "react-router-dom";

class LoginForm extends React.Component {
    FORM_ID = 'loginForm'
    INPUT_ERROR_CLASS = 'input-error'

    constructor(props){
        super(props)
        this.state = {login: '', password: ''}
    }

    handleChange(event){
        this.setState({
            [event.target.name]: event.target.value
        });
    }

    handleSubmit(event) {
        event.preventDefault()
        if (this.props.get_token(this.state.login, this.state.password)){
            this.removeErrors();
        }else{
            this.addErrors();
        }
    }

    addErrors(){
        let inputs = document.getElementById(this.FORM_ID).querySelectorAll('input.form-control'),
            error_class= this.INPUT_ERROR_CLASS;

        inputs.forEach(function(element){
            if (!element.classList.contains(error_class)){
                element.classList.add(error_class)
            }
        });
    }

    removeErrors(){
        let inputs = document.getElementById(this.FORM_ID).querySelectorAll('input.form-control'),
            error_class= this.INPUT_ERROR_CLASS;

        inputs.forEach(function(element){
            element.classList.remove(error_class)
        });
    }

    render(){
        return (
            <main className="form-signin">
                {!this.props.is_authorized ?
                <form id={this.FORM_ID} onSubmit={(event)=> this.handleSubmit(event)}>
                    <h2 className="h3 mb-3 fw-normal">Авторизация</h2>
                    <div className="form-floating">
                        <input type="text" name="login" placeholder="login" className="form-control"
                            value={this.state.login} onChange={(event)=>this.handleChange(event)} />
                        <label>Логин:</label>
                    </div>
                    <div className="form-floating mb-3">
                        <input type="password" name="password" placeholder="password" className="form-control"
                        value={this.state.password} onChange={(event)=>this.handleChange(event)} />
                        <label>Пароль:</label>
                    </div>
                    <button className="w-100 btn btn-lg btn-primary" type="submit">Войти</button>
                </form> :
                <div className="alert-success alert" role="alert">
                    <h4 className="alert-heading">Вы успешно авторизованы!</h4>
                    <p>Воспользуйтесь меню для перехода в нужный раздел или перейдите на <Link to="/">главную</Link>.</p>
                </div>
                }
            </main>
        )
    }
}

export default LoginForm;
