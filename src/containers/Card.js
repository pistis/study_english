import React from 'react';
import { CardList, CardWrite } from 'components';
import { connect } from 'react-redux';
import { cardPostRequest, cardListRequest } from 'actions/card';

class Card extends React.Component {
    constructor(props){
        super(props);

        this.handlePost = this.handlePost.bind(this);

        this.state = {
            loadingState: false
        };
    }

    componentDidMount(){
        this.props.cardListRequest(true).then(
            () =>{
                console.log('load success card list');
            }
        );
    }

    handlePost(contents, means, examples){
        return this.props.cardPostRequest(contents, means, examples).then(
            () =>{
                if(this.props.postStatus.status === "SUCCESS"){
                    // TODO : refresh list
                    alert('SUCCESS CARD REGISTER');
                }else{
                    /*
                     ERROR CODES
                     1: NOT LOGGED IN
                     2: EMPTY CONTENTS
                     */
                    switch(this.props.postStatus.error){
                        case 1:
                            // IF NOT LOGGED IN, NOTIFY AND REFRESH AFTER
                            alert('FAIL! Not Logged In');
                            break;
                        case 2:
                            alert('FAIL! Empty Contents');
                            break;
                        default:
                            alert('FAIL! Something Broke');
                            break;
                    }
                }
            }
        );
    }

    render(){
        const cardWrite = ( <CardWrite onPost={this.handlePost}/> );
        return (
            <div>
                <div id="page-wrapper">
                    <CardList data={this.props.cardData} currentUser={this.props.currentUser}/>
                </div>
                { this.props.isLoggedIn ? cardWrite : undefined }
            </div>
        );
    }
}

const mapStateToProps = (state) =>{
    return {
        isLoggedIn: state.authentication.status.isLoggedIn,
        currentUser: state.authentication.status.currentUser,
        postStatus: state.card.post,
        cardData: state.card.list.data
    };
};

const mapDispatchToProps = (dispatch) =>{
    return {
        cardPostRequest: (contents, means, examples) =>{
            return dispatch(cardPostRequest(contents, means, examples));
        },
        cardListRequest: (isInitial, listType, id, username) =>{
            return dispatch(cardListRequest(isInitial, listType, id, username));
        }
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(Card);