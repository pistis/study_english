import React from 'react';
import { Page } from 'components';
import { connect } from 'react-redux';
//import { idiomPostRequest, idiomListRequest } from 'actions/idiom';

class Card extends React.Component {
    constructor(props){
        super(props);

        this.state = {
            loadingState: false
        };
    }

    render(){
        return (
            <div id="page-wrapper">
                <Page />
            </div>
        );
    }
}

const mapStateToProps = (state) =>{
    return {
        isLoggedIn: state.authentication.status.isLoggedIn,
        currentUser: state.authentication.status.currentUser
    };
};

export default connect(mapStateToProps)(Card);