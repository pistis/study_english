import React from 'react';

class SidebarLeft extends React.Component {
    render(){
        const cardWriteButton = (
            <li className="sidebar-toolbar">
                <div className="">
                    <button type="button" className="btn btn-default" data-toggle="modal" data-target="#cardWrite">
                        <i className="fa fa-plus"></i> Card
                    </button>
                </div>
            </li>
        );

        return (
            <div className="navbar-default sidebar" role="navigation">
                <div className="sidebar-nav navbar-collapse">
                    <ul className="nav" id="side-menu">
                        {this.props.isLoggedIn ? cardWriteButton : undefined}
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
                            <a href="bookmark"><i className="fa fa-bookmark fa-fw"></i> Bookmark</a>
                        </li>
                        <li>
                            <a href="card"><i className="fa fa-book fa-fw"></i> Card</a>
                        </li>
                        <li>
                            <a href="tag"><i className="fa fa-tags fa-fw"></i> Tag</a>
                        </li>
                    </ul>
                </div>
            </div>
        );
    }
}

export default SidebarLeft;