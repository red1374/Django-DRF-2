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

class App extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            'users': [],
            'projects': [],
            'notes': [],
            'header_menu': [],
            'footer_menu': [],
        }
    }

    fillVarsWithData(url='', code=''){
        if (!code){
            return false;
        }

        axios.get(`http://127.0.0.1:8000/${url}${code}/`).then(response => {
            let obj = {};

            obj[code] = response.data.results !== undefined ? response.data.results : response.data;
            this.setState(obj);
        }).catch(error => console.log(error));
    }

    componentDidMount() {
        this.fillVarsWithData('api/', 'users');
        this.fillVarsWithData('api/', 'projects');
        this.fillVarsWithData('api/', 'notes');
        this.fillVarsWithData('menu/', 'header_menu');
        this.fillVarsWithData('menu/', 'footer_menu');
    }

    componentDidUpdate(prevProps, prevState, snapshotprevProps) {

        //console.log(this.props.location.pathname);
        //const currentSearch = this.props.location.search
        // const previousSearch = prevProps.location.search
        //
        // if (currentSearch !== previousSearch)
        //       this.forceUpdate()
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
                        <Header menu_items={this.state.header_menu}/>
                    </header>
                    <main className="container flex-shrink-0">
                        <Routes>
                            <Route path="" element={<HomePage />} />
                            <Route path="/users" element={<UsersList users={this.state.users} />} />
                            <Route path="/projects" element={<ProjectsList projects={this.state.projects} />} />
                            <Route path="/project/:id" element={<ProjectInfo projects={this.state.projects} />} />
                            <Route path="/notes" element={<NotesList notes={this.state.notes} />} />
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
