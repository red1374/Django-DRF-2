import React from "react";
import Menu from "./Menu";

const Footer = ({menu_items}) => {
    let menu = {
        items: menu_items,
        class: 'col-md-4 justify-content-end'
    };

    return (
        <div
            className="container d-flex flex-wrap justify-content-between align-items-center my-4 border-top">
            <p className="col-md-4 mb-0 text-muted">© 2022, Плешаков Сергей</p>

            {/*<a href="/"*/}
            {/*   className="col-md-4 d-flex align-items-center justify-content-center mb-3 mb-md-0 me-md-auto link-dark text-decoration-none">*/}
            {/*    <svg className="bi me-2" width="40" height="32">*/}
            {/*        <use xlink:href="#bootstrap"></use>*/}
            {/*    </svg>*/}
            {/*</a>*/}
            <Menu menu={menu}></Menu>
        </div>
    )
}

export default Footer;
