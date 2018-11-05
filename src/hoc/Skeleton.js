import React, {Component} from 'react';
import {withRouter} from 'react-router-dom';

import {connect} from 'react-redux';
import OneRoot from './OneRoot';
import NavigationItems from '../components/Navigation/NavigationItems/NavigationItems';
import SiderToggle from '../components/Navigation/Sider/SiderToggle/SiderToggle'
import Sider from '../components/Navigation/Sider/Sider'
import './styles.css';

class Skeleton extends Component {
    state = {
        showSider: false
    }

    siderClosedHandler = () => {
        this.setState({showSider: false});
    }

    siderToggleHandler = () => {
        this.setState((prevState) => {
            return {
                showSider: !prevState.showSider
            };
        });
    }
    render() {

        return (

            <OneRoot>

                <header className='main--header'>
                    <SiderToggle clicked={() => this.siderToggleHandler()}/>
                    <nav className='nav--desktop'>
                        <NavigationItems
                            isAuthenticated={this.props.isLoggedIn}
                            email={this.props.email}
                            isAdmin={this.props.isAdmin}/>
                    </nav>
                    <Sider
                        email={this.props.email}
                        isAdmin={this.props.isAdmin}
                        isAuthenticated={this.props.isLoggedIn}
                        open={this.state.showSider}
                        closed={this.siderClosedHandler}/>
                </header>
                <main className='main--content'>
                    {this.props.children}
                </main>

            </OneRoot>

        )
    }
}

const mapStateToProps = state => {
    return {isLoggedIn: state.auth.isLoggedIn, email: state.auth.email, isAdmin: state.auth.isAdmin};
}

export default withRouter(connect(mapStateToProps)(Skeleton));