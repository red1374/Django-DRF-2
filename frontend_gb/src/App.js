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
import NoteForm from "./components/NoteForm";
import ProjectForm from "./components/ProjectForm";
import ProjectEditForm from "./components/ProjectEditForm";

class App extends React.Component {
    SITE_URL = 'http://127.0.0.1:8080';

    constructor(props) {
        super(props);
        this.state = {
            'users': [],
            'users_list': [],
            'projects': [],
            'notes': [],
            'header_menu': [],
            'footer_menu': [],
            'token': '',
            'user': [],
            'item': '',
            'project': '',
        }
        this.query = {
            'notes' : [
                'todoActiveList',
                'id text user { username } project { name }'
            ],
            'projects' : [
                'projectsList',
                'id name users{ username }'
            ],
        }
        this.search_note_query_method = 'todoByProjectName(projectName:"__str__")'
        this.search_project_query_method = 'projectByName(name:"__str__")'
    }

    create_record(code, fields){
        if (!code){
            return false;
        }

        if (fields.user == undefined || !fields.user){
            fields['user'] = this.state.user.id;
        }
        const headers = this.get_headers();
        axios.post(`${this.SITE_URL}/api/${code}/`, fields,{headers}).
            then(response => {
                if (code == 'notes') {
                    this.setState({item: response.data})
                }else{
                    this.setState({project: response.data})
                }
                this.clearFormFields(code)
                this.load_data(code)
            }).
            catch(error => {
                if (code == 'notes') {
                    this.setState({item: error})
                }else{
                    this.setState({project: error})
                }
            });
    }

    update_record(code, fields){
        if (!code){
            return false;
        }

        if (fields.user == undefined || !fields.user){
            fields['user'] = this.state.user.id;
        }
        const headers = this.get_headers();
        axios.put(`${this.SITE_URL}/api/${code}/`, fields,{headers}).
            then(response => {
                if (code == 'notes') {
                    this.setState({item: response.data})
                }else{
                    this.setState({project: response.data})
                }
                this.clearFormFields(code)
                this.load_data(code)
            }).
            catch(error => {
                if (code == 'notes') {
                    this.setState({item: error})
                }else{
                    this.setState({project: error})
                }
            });
    }

    clearFormFields(code){
        let inputs = '', form_object = '';
        if (code == 'notes'){
            form_object = new NoteForm()
        }else{
            form_object = new ProjectForm()
        }
        inputs = document.getElementById(form_object.FORM_ID).querySelectorAll('input[type=text], textarea, select');

        inputs.forEach(function(item){
            item.value = ''
        });
    }

    delete_record(id, code){
        if (!code){
            return false;
        }

        const headers = this.get_headers();
        axios.delete(`${this.SITE_URL}/api/${code}/${id}/`, {headers}).
            then(response => {
                this.load_data(code)
            }).
            catch(error => {
                alert(error);
            });
    }

    delete_note(id){
        this.delete_record(id, 'notes')
    }

    delete_project(id){
        this.delete_record(id, 'projects')
    }

    create_note(fields){
        this.create_record('notes', fields)
    }

    create_project(fields){
        this.create_record('projects', fields)
    }

    create_project(fields){
        this.create_record('projects', fields)
    }

    update_project(fields){
        this.update_record('projects', fields)
    }

    fillVarsWithData(url='', code='', query_params=''){
        if (!code){
            return false;
        }
        let query_string = '',
            endpoint = '',
            data = {};

        if (url == 'graphql/'){
            endpoint = `${this.SITE_URL}/${url}`;
            data = {
                operationName: query_params[0],
                query: `{${query_params[0]} { ${query_params[1]} }}`,
                variables: {}
            };
        }else{
            query_string = query_params ? '?' + query_params.join('&') : ''
            endpoint = `${this.SITE_URL}/${url}${code}/${query_string}`
        }

        this.send_request(endpoint, code, data)
    }

    send_request(endpoint, code, data){
        axios({
            method: 'get',
            url: endpoint,
            headers: this.get_headers(),
            params: {
                'query': data.query
            }
        }).then(response => {
            let response_data = response.data.results !== undefined ? response.data.results : response.data;

            /* -- Exception for graphQL requests --------------------------------- */
            if (response_data.data != undefined && data.operationName != undefined){
                if (!data.operationName.includes('(')) {
                    response_data = response_data.data[data.operationName]
                }else{
                /* -- Exception for graphQL filtering requests ------------------- */
                    response_data = response_data.data[
                        data.operationName.substr(0, data.operationName.indexOf('('))
                    ]
                }
            }

            if (response_data == undefined){
                response_data = []
            }
            this.setState({[code] : response_data});
        }).catch(error => {
            this.setState({[code]:[]});
        });
    }

    load_data(code){
        if (!code) {
            this.fillVarsWithData('api/', 'users', ['size=2']);
            this.fillVarsWithData('api/', 'users_list', ['size=100']);
            this.fillVarsWithData('graphql/', 'projects', this.query['projects']);
            this.fillVarsWithData('graphql/', 'notes', this.query['notes']);
            this.fillVarsWithData('menu/', 'header_menu');
            this.fillVarsWithData('menu/', 'footer_menu');
        }else{
            if (code == 'users'){
                this.fillVarsWithData('api/', code);
            }
            if (code == 'header_menu' || code == 'footer_menu'){
                this.fillVarsWithData('menu/', code);
            }
            if (code == 'notes' || code == 'projects'){
                this.fillVarsWithData('graphql/', code, this.query[code]);
            }
        }

        /* -- Get user data ----------------------------------------- */
        if (!code || code == 'user') {
            if (this.is_authenticated() && this.state.user.id == undefined) {
                this.fillVarsWithData('get/', 'user');
            } else {
                this.setState({'user': []});
            }
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

    search_note_by_project(str){
        if (!str){
            this.load_data('notes')
            return ""
        }
        let method = this.search_note_query_method.replace('__str__', str),
            query = this.query['notes'];

        query[0] = method
        this.fillVarsWithData('graphql/', 'notes', query);
    }

    search_project(str){
        if (!str){
            this.load_data('projects')
            return ""
        }
        let method = this.search_project_query_method.replace('__str__', str),
            query = this.query['projects'];

        query[0] = method
        this.fillVarsWithData('graphql/', 'projects', query);
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
                            <Route path="/projects" element={<ProjectsList projects={this.state.projects}
                                                                           delete_project={(id) => this.delete_project(id)}
                                                                           search_project={(str) => this.search_project(str)}/>} />
                            <Route path="/project/:id" element={<ProjectInfo projects={this.state.projects} />} />
                            <Route path="/projects/create/" element={<ProjectForm users={this.state.users_list}
                                                                            create_project={(fields) => this.create_project(fields)}
                                                                            project={this.state.project}/>} />
                            <Route path="/projects/edit/" element={<ProjectEditForm users={this.state.users_list}
                                                                            update_project={(fields) => this.update_project(fields)}
                                                                            project={this.state.project}/>} />
                            <Route path="/notes" element={<NotesList notes={this.state.notes}
                                                                     delete_note={(id) => this.delete_note(id)}
                                                                     search_project={(str) => this.search_note_by_project(str)}/>} />
                            <Route path="/notes/create/" element={<NoteForm projects={this.state.projects}
                                                                            create_note={(fields) => this.create_note(fields)}
                                                                            item={this.state.item}/>} />
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
