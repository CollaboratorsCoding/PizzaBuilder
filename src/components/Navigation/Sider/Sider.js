import React from 'react';

// import Logo from '../../Logo/Logo';
import NavigationItems from '../NavigationItems/NavigationItems';
import './style.css';
import BackBlack from './BackBlack/BackBlack';
import OneRoot from '../../../hoc/OneRoot';

const sideDrawer = (props) => {
    let attachedClasses = ['main--sider', 'main--sider--close'];
    if (props.open) {
        attachedClasses = ['main--sider', 'main--sider--open'];
    }
    return (
        <OneRoot>
            <BackBlack show={props.open} clicked={props.closed}/>
            <div className={attachedClasses.join(' ')}>
                {/* <div className={classes.Logo}>
                    <Logo/>
                </div> */}
                <nav>
                    <NavigationItems
                        isAuthenticated={props.isAuthenticated}
                        isAdmin={props.isAdmin}
                        email={props.email}/>
                </nav>
            </div>
        </OneRoot>
    );
};

export default sideDrawer;