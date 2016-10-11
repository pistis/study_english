import React from 'react';

class SidebarLeft extends React.Component {
    render(){
        return (
            <div className="navbar-default sidebar" role="navigation">
                <div className="sidebar-nav navbar-collapse">
                    <ul className="nav" id="side-menu">
                        <li className="sidebar-search">
                            <div className="input-group custom-search-form">
                                <input type="text" className="form-control" placeholder="Search..."/>
                                <span className="input-group-btn">
                                <button className="btn btn-default" type="button">
                                    <i className="fa fa-search"></i>
                                </button>
                                </span>
                            </div>
                        </li>
                        <li>
                            <a href="card"><i className="fa fa-file fa-fw"></i> Card</a>
                        </li>
                    </ul>
                </div>
            </div>
        );
    }
}

export default SidebarLeft;