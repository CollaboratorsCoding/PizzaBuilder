import React from 'react';
import {NavLink} from 'react-router-dom';

import './style.css'

const navigationItem = (props) => (
    <li
        className={props.className
        ? 'main--navigation--item ' + props.className
        : 'main--navigation--item'}>
        <NavLink to={props.link} exact={props.exact} activeClassName='active'>{props.children}</NavLink>
    </li>
);

export default navigationItem;