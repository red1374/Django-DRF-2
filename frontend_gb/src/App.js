import logo from './logo.svg';
import './App.css';
import React from "react";
import UsersList from "./components/User";
import axios from 'axios'
import Header from "./components/Header";
import Menu from "./components/Menu";
import Footer from "./components/Footer";

class App extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            'users': [],
            'menu_header_items': [],
            'menu_footer_items': [],
        }
    }

    componentDidMount() {
        axios.get('http://127.0.0.1:8000/api/users/').then(response => {
            const users = response.data
            this.setState(
                {
                    'users': users
                })
        }).catch(error => console.log(error));

        this.setState(
            {
                'menu_header_items': [
                    {
                        title: 'Главная',
                        href: '/',
                        class: 'link-dark',
                    },
                    {
                        title: 'To Do',
                        href: '/',
                        class: 'link-dark',
                    },
                    {
                        title: 'Контакты',
                        href: '/',
                        class: 'link-dark',
                    },
                ]
            }
        );

        this.setState(
            {
                'menu_footer_items': [
                    {
                        title: 'Главная',
                        href: '/',
                        class: 'text-muted',
                    },
                    {
                        title: 'To Do',
                        href: '/',
                        class: 'text-muted',
                    },
                    {
                        title: 'Контакты',
                        href: '/',
                        class: 'text-muted',
                    },
                ]
            }
        );
    }

    render(){
        return (
            <div className="d-flex flex-column h-100">
                <header className="p-3 mb-3 border-bottom">
                    <Header menu_items={this.state.menu_header_items}/>
                </header>
                <main className="container flex-shrink-0">
                    <UsersList users={this.state.users} />
                </main>
                <footer className="footer mt-auto py-3 bg-light">
                    <Footer menu_items={this.state.menu_footer_items}/>
                </footer>
                <script src="https://cdn.jsdelivr.net/npm/bootstrap@5.2.0/dist/js/bootstrap.bundle.min.js"
                        integrity="sha384-A3rJD856KowSb7dwlZdYEkO39Gagi7vIsF0jrRAoQmDKKtQBHUuLZ9AsSv4jD4Xa"
                        crossOrigin="anonymous"></script>
            </div>
        );
    }
}

export default App;
