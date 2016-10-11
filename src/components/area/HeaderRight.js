import React from 'react';

class HeaderRight extends React.Component {
    render(){

        const logout = (<li><a onClick={this.props.onLogout}><i className="fa fa-sign-out fa-fw"></i> Logout</a>
        </li>);
        return (
            <ul className="nav navbar-top-links navbar-right">
                <li className="dropdown">
                    <a className="dropdown-toggle" data-toggle="dropdown" href="#">
                        <i className="fa fa-user fa-fw"></i> <i className="fa fa-caret-down"></i>
                    </a>
                    <ul className="dropdown-menu dropdown-user">
                        {/* TODO : li 요소들 추가하기(account 관련) */}
                        {this.props.isLoggedIn ? logout : undefined}
                    </ul>
                </li>
            </ul>
        );
    }
}

HeaderRight.propTypes = {
    onLogout: React.PropTypes.func
};

HeaderRight.defaultProps = {
    onLogout: () =>{
        console.error("logout function not defined");
    }
};

export default HeaderRight;