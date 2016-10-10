import React from 'react';
import { IdiomWrite, IdiomList } from 'components';
import { connect } from 'react-redux';
import { idiomPostRequest, idiomListRequest } from 'actions/idiom';

class Home extends React.Component {
    constructor(props){
        super(props);
        this.handlePost = this.handlePost.bind(this);
        this.loadNewIdiom = this.loadNewIdiom.bind(this);
        this.loadOldIdiom = this.loadOldIdiom.bind(this);

        this.state = {
            loadingState : false
        };
    }

    componentDidMount(){
        const loadUntilScrollable = () => {
            // IF THE SCROLLBAR DOES NOT EXIST,
            if($("body").height() < $(window).height()) {
                this.loadOldIdiom().then(
                    () => {
                        // DO THIS RECURSIVELY UNLESS IT'S LAST PAGE
                        if(!this.props.isLast) {
                            loadUntilScrollable();
                        }
                    }
                );
            }
        };

        // LOAD NEW Idiom EVERY 5 SECONDS
        const loadIdiomLoop = () =>{
            this.loadNewIdiom().then(
                () =>{
                    this.idiomLoaderTimeoutId = setTimeout(loadIdiomLoop, 5000);
                }
            );
        };

        this.props.idiomListRequest(true).then(
            () =>{
                // BEGIN NEW Idiom LOADING LOOP
                loadUntilScrollable();
                loadIdiomLoop();
            }
        );

        $(window).scroll(() =>{
            // WHEN HEIGHT UNDER SCROLLBOTTOM IS LESS THEN 250
            if($(document).height() - $(window).height() - $(window).scrollTop() < 250){
                if(!this.state.loadingState){
                    console.log("LOAD NOW");
                    this.loadOldIdiom();
                    this.setState({
                        loadingState : true
                    });
                }
            }else{
                if(this.state.loadingState){
                    this.setState({
                        loadingState : false
                    });
                }
            }
        });
    }

    componentWillUnmount(){
        // STOPS THE loadIdiomLoop
        clearTimeout(this.idiomLoaderTimeoutId);
        // REMOVE WINDOWS SCROLL LISTENER
        $(window).unbind();
    }

    loadNewIdiom(){
        // CANCEL IF THERE IS A PENDING REQUEST
        if(this.props.listStatus === 'WAITING')
            return new Promise((resolve, reject)=>{
                resolve();
            });

        // IF PAGE IS EMPTY, DO THE INITIAL LOADING
        if(this.props.idiomData.length === 0)
            return this.props.idiomListRequest(true);

        return this.props.idiomListRequest(false, 'new', this.props.idiomData[0]._id);
    }

    loadOldIdiom(){
        // CANCEL IF USER IS READING THE LAST PAGE
        if(this.props.isLast){
            return new Promise(
                (resolve, reject)=>{
                    resolve();
                }
            );
        }

        // GET ID OF THE MEMO AT THE BOTTOM
        let lastId = this.props.idiomData[this.props.idiomData.length - 1]._id;

        // START REQUEST
        return this.props.idiomListRequest(false, 'old', lastId).then(() =>{
            // IF IT IS LAST PAGE, NOTIFY
            if(this.props.isLast){
                Materialize.toast('You are reading the last page', 2000);
            }
        });
    }

    /* POST Idiom */
    handlePost(contents, means, examples){
        return this.props.idiomPostRequest(contents, means, examples).then(
            () =>{
                if(this.props.postStatus.status === "SUCCESS"){
                    // TRIGGER LOAD NEW MEMO
                    this.loadNewIdiom().then(
                        () =>{
                            Materialize.toast('Success!', 2000);
                        }
                    );
                }else{
                    /*
                     ERROR CODES
                     1: NOT LOGGED IN
                     2: EMPTY CONTENTS
                     */
                    let $toastContent;
                    switch(this.props.postStatus.error){
                        case 1:
                            // IF NOT LOGGED IN, NOTIFY AND REFRESH AFTER
                            $toastContent = $('<span style="color: #FFB4BA">You are not logged in</span>');
                            Materialize.toast($toastContent, 2000);
                            setTimeout(()=>{
                                location.reload(false);
                            }, 2000);
                            break;
                        case 2:
                            $toastContent = $('<span style="color: #FFB4BA">Please write something</span>');
                            Materialize.toast($toastContent, 2000);
                            break;
                        default:
                            $toastContent = $('<span style="color: #FFB4BA">Something Broke</span>');
                            Materialize.toast($toastContent, 2000);
                            break;
                    }
                }
            }
        );
    }

    render(){
        const idiomWrite = ( <IdiomWrite onPost={this.handlePost}/> );

        return (
            <div className="wrapper">
                { this.props.isLoggedIn ? idiomWrite : undefined }
                <IdiomList data={this.props.idiomData} currentUser={this.props.currentUser}/>
            </div>
        );
    }
}

const mapStateToProps = (state) =>{
    return {
        isLoggedIn : state.authentication.status.isLoggedIn,
        postStatus : state.idiom.post,
        currentUser : state.authentication.status.currentUser,
        idiomData : state.idiom.list.data,
        listStatus : state.idiom.list.status,
        isLast : state.idiom.list.isLast
    };
};

const mapDispatchToProps = (dispatch) =>{
    return {
        idiomPostRequest : (contents, means, examples) =>{
            return dispatch(idiomPostRequest(contents, means, examples));
        },
        idiomListRequest : (isInitial, listType, id, username) =>{
            return dispatch(idiomListRequest(isInitial, listType, id, username));
        }
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(Home);