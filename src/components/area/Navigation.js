import React from 'react';
import { HeaderLeft, HeaderRight, SidebarLeft } from 'components/area';

class Navigation extends React.Component {
    render(){
        var navStyle = {
            marginBottom: 0
        };

        return (
            <nav style={navStyle} className="navbar navbar-default navbar-static-top" role="navigation">
                <HeaderLeft></HeaderLeft>
                <HeaderRight isLoggedIn={this.props.isLoggedIn} onLogout={this.props.onLogout}></HeaderRight>
                <SidebarLeft isLoggedIn={this.props.isLoggedIn}></SidebarLeft>
            </nav>
        );
    }
}

Navigation.propTypes = {
    isLoggedIn: React.PropTypes.bool,
    onLogout: React.PropTypes.func
};

Navigation.defaultProps = {
    isLoggedIn: false,
    onLogout: () =>{
        console.error("logout function not defined");
    }
};

export default Navigation;