import React from "react";

const MenuItem = ({menu_item}) => {
    return (
        <li className="nav-item">
            <a className={"nav-link px-2" + (menu_item.class ? ' ' + menu_item.class : '')}
               href={menu_item.href}>{menu_item.title}</a>
        </li>
    )
}

const Menu = ({menu}) => {
    var ul_class = (menu.class ? ' ' + menu.class : '');
    return (
        <ul className={'nav' + ul_class}>
            {menu.items.map((menu_item) => <MenuItem menu_item={menu_item} />)}
        </ul>
    )
}

export default Menu;
