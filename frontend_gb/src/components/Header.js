import React from "react";
import Menu from "./Menu";
import {Link} from "react-router-dom";

class Header extends React.Component {
    constructor(props) {
        super(props);
    }

    render(){
        let menu = {
            items: this.props.menu_items,
            class: 'col-12 col-lg-auto me-lg-auto mb-2 justify-content-center mb-md-0'
        }, name = this.props.get_first_name ? this.props.get_first_name : this.props.username;

        return (
            <div className="container">
                <div className="d-flex flex-wrap align-items-center justify-content-center justify-content-lg-start">
                    <Menu menu={menu}></Menu>
                    <nav className="pull-right">
                        <ul className="nav">
                            <li>
                            {this.props.is_authorized ?
                                <strong>{name}&nbsp;&nbsp;</strong>:
                                <span>Вы не авторизованы&nbsp;&nbsp;</span>
                            }
                            </li>
                            <li>
                                {this.props.is_authorized ?
                                    <Link to="/login/" onClick={()=>this.props.logout()}>Выйти</Link> :
                                    <Link to="/login/">Войти</Link>}
                            </li>
                        </ul>
                    </nav>
                </div>
            </div>
        )
    }
}

export default Header;
