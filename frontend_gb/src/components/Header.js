import React from "react";
import Menu from "./Menu";

const Header = ({menu_items}) => {
    let menu = {
        items: menu_items,
        class: 'col-12 col-lg-auto me-lg-auto mb-2 justify-content-center mb-md-0'
    };

    return (
        <div className="container">
            <div className="d-flex flex-wrap align-items-center justify-content-center justify-content-lg-start">
                {/*<a href="/" className="d-flex align-items-center mb-2 mb-lg-0 text-dark text-decoration-none">*/}
                {/*    <svg className="bi me-2" width="40" height="32" role="img" aria-label="Bootstrap">*/}
                {/*        <use xlink:href="#bootstrap"></use>*/}
                {/*    </svg>*/}
                {/*</a>*/}
                <Menu menu={menu}></Menu>
                {/*<div className="dropdown text-end">*/}
                {/*    <a href="#" className="d-block link-dark text-decoration-none dropdown-toggle"*/}
                {/*       data-bs-toggle="dropdown" aria-expanded="false">*/}
                {/*        <img src="https://github.com/mdo.png" alt="mdo" width="32" height="32"*/}
                {/*             className="rounded-circle">*/}
                {/*    </a>*/}
                {/*    <ul className="dropdown-menu text-small">*/}
                {/*        <li><a className="dropdown-item" href="#">New project...</a></li>*/}
                {/*        <li><a className="dropdown-item" href="#">Settings</a></li>*/}
                {/*        <li><a className="dropdown-item" href="#">Profile</a></li>*/}
                {/*        <li>*/}
                {/*            <hr className="dropdown-divider">*/}
                {/*        </li>*/}
                {/*        <li><a className="dropdown-item" href="#">Sign out</a></li>*/}
                {/*    </ul>*/}
                {/*</div>*/}
            </div>
        </div>
    )
}

export default Header;
