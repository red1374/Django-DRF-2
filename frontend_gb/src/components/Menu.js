import React from "react";
import {BrowserRouter, Link, Router} from "react-router-dom";
import App from "../App";

const MenuItem = ({menu_item}) => {
    return (
        <li className="nav-item">
            <Link className={"nav-link px-2" + (menu_item.class ? ' ' + menu_item.class : '')}
               to={menu_item.href}>{menu_item.title}</Link>
        </li>
    )
}

const Menu = ({menu}) => {
    var ul_class = (menu.class ? ' ' + menu.class : '');
    return (
        <ul className={'nav' + ul_class}>
            {menu.items.map((menu_item, i) => <MenuItem menu_item={menu_item} key={i}/>)}
        </ul>
    )
}

export default Menu;
