import './App.css';
import React from "react";
import axios from 'axios'

import UsersList from "./components/User";
import Header from "./components/Header";
import Footer from "./components/Footer";
import NotesList from "./components/Notes";
import ProjectsList from "./components/Project";
import {BrowserRouter, Routes, Route, Link} from 'react-router-dom';
import HomePage from "./components/HomePage";
import NotFound404 from "./components/NotFound";
import ProjectInfo from "./components/ProjectInfo";
import LoginForm from "./components/Auth";
import Auth from "./components/Auth";
import Cookies from "universal-cookie/es6";

class App extends React.Component {
    SITE_URL = 'http://127.0.0.1:8000';

    constructor(props) {
        super(props);
        this.state = {
            'users': [],
            'projects': [],
            'notes': [],
            'header_menu': [],
            'footer_menu': [],
            'token': '',
            'user': []
        }
    }

    fillVarsWithData(url='', code=''){
        if (!code){
            return false;
        }

        const headers = this.get_headers();
        axios.get(`${this.SITE_URL}/${url}${code}/`, {headers}).
            then(response => {
                let obj = {};

                obj[code] = response.data.results !== undefined ? response.data.results : response.data;
                this.setState(obj);
            }).
            catch(error => {
                let obj = {};

                obj[code] = [];
                this.setState(obj);
            });
    }

    load_data(){
        this.fillVarsWithData('api/', 'users');
        this.fillVarsWithData('api/', 'projects');
        this.fillVarsWithData('api/', 'notes');
        this.fillVarsWithData('menu/', 'header_menu');
        this.fillVarsWithData('menu/', 'footer_menu');

        /* -- Get user data ----------------------------------------- */
        if (this.is_authenticated() && this.state.user.id == undefined){
            this.fillVarsWithData('get/', 'user');
        }else{
            this.setState({'user': []});
        }
    }

    componentDidMount() {
        this.get_token_from_storage()
    }

    get_token(username, password) {
        axios.post(`${this.SITE_URL}/api-token-auth/`, {
            username: username,
            password: password
        }).then(response => {
            let auth_form = new Auth();
            auth_form.removeErrors();
            this.set_token(response.data['token'])
        }).catch(error => {
            let auth_form = new Auth();
            auth_form.addErrors();
        })
    }

    set_token(token) {
        const cookies = new Cookies()
        cookies.set('token', token)
        this.setState({'token': token},()=>this.load_data())
    }

    is_authenticated() {
        return this.state.token != '' && this.state.token != undefined
    }

    logout() {
        this.set_token('')
    }

    get_token_from_storage() {
        const cookies = new Cookies()
        const token = cookies.get('token')
        this.setState({'token': token}, () => this.load_data())
    }

    get_headers() {
		let headers = {
			'Content-Type': 'application/json'
		}
		if (this.is_authenticated())		{
			headers['Authorization'] = 'Token ' + this.state.token
		}
		return headers
	}

    get_username(){
        return this.state.user.username;
    }

    get_first_name(){
        return this.state.user.first_name;
    }

    render(){
        let menu = {
            items: this.state.header_menu,
            class: 'col-12 col-lg-auto me-lg-auto mb-2 justify-content-center mb-md-0'
        };
        return (
            <div className="d-flex flex-column h-100">
                <BrowserRouter>
                    <header className="p-3 mb-3 border-bottom">
                        <Header menu_items={this.state.header_menu}
                                is_authorized={this.is_authenticated()}
                                logout={() => this.logout()}
                                get_username={this.get_username()}
                                get_first_name={this.get_first_name()}/>
                    </header>
                    <main className="container flex-shrink-0">
                        <Routes>
                            <Route path="" element={<HomePage />} />
                            <Route path="/users" element={<UsersList users={this.state.users} />} />
                            <Route path="/projects" element={<ProjectsList projects={this.state.projects} />} />
                            <Route path="/project/:id" element={<ProjectInfo projects={this.state.projects} />} />
                            <Route path="/notes" element={<NotesList notes={this.state.notes} />} />
                            <Route path="/login" element={<LoginForm get_token={(username, password) => this.get_token(username, password)}
                                is_authorized={this.is_authenticated()}/>} />
                            <Route path='*' element={<NotFound404/>}/>
                        </Routes>
                    </main>
                    <footer className="footer mt-auto py-3 bg-light">
                        <Footer menu_items={this.state.footer_menu}/>
                    </footer>
                </BrowserRouter>
                <script src="https://cdn.jsdelivr.net/npm/bootstrap@5.2.0/dist/js/bootstrap.bundle.min.js"
                        integrity="sha384-A3rJD856KowSb7dwlZdYEkO39Gagi7vIsF0jrRAoQmDKKtQBHUuLZ9AsSv4jD4Xa"
                        crossOrigin="anonymous"></script>
            </div>
        );
    }
}

export default App;
