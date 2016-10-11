import React from 'react';
import { Link } from 'react-router';

class Authentication extends React.Component {
    constructor(props){
        super(props);
        this.state = {
            username: "",
            password: ""
        };
        this.handleChange = this.handleChange.bind(this);
        this.handleLogin = this.handleLogin.bind(this);
        this.handleRegister = this.handleRegister.bind(this);
        this.handleKeyPress = this.handleKeyPress.bind(this);
    }

    handleLogin(){
        let id = this.state.username;
        let pw = this.state.password;

        this.props.onLogin(id, pw).then(
            (success) =>{
                if(!success){
                    this.setState({
                        password: ''
                    });
                }
            }
        );
    }

    handleRegister(){
        let id = this.state.username;
        let pw = this.state.password;

        this.props.onRegister(id, pw).then(
            (result) =>{
                if(!result){
                    this.setState({
                        username: '',
                        password: ''
                    });
                }
            }
        );
    }

    handleKeyPress(e){
        if(e.charCode == 13){
            if(this.props.mode){
                this.handleLogin();
            }else{
                this.handleRegister();
            }
        }
    }

    handleChange(e){
        let nextState = {};
        nextState[e.target.name] = e.target.value;
        this.setState(nextState);
    }

    render(){
        const inputBoxes = (
            <div>
                <div className="form-group">
                    <input className="form-control"
                           placeholder="Username"
                           name="username"
                           type="text"
                           onChange={this.handleChange}
                           value={this.state.username}/>
                </div>
                <div className="form-group">
                    <input className="form-control"
                           placeholder="Password"
                           name="password"
                           type="password"
                           onChange={this.handleChange}
                           value={this.state.password}
                           onKeyPress={this.handleKeyPress}/>
                </div>
            </div>
        );

        const loginView = (
            <div className="login-panel panel panel-default">
                <div className="panel-heading">
                    <h3 className="panel-title">Please Sign In</h3>
                </div>
                <div className="panel-body">
                    <form role="form">
                        <fieldset>
                            {inputBoxes}
                            <div className="checkbox">
                                <label>
                                    <input name="remember" type="checkbox" value="Remember Me"/>Remember Me
                                </label>
                            </div>
                            <a className="btn btn-lg btn-success btn-block" onClick={this.handleLogin}>Login</a>
                        </fieldset>
                    </form>
                    <h5>New Here? <Link to="/register">Create an account</Link></h5>
                </div>
            </div>
        );

        const registerView = (
            <div className="login-panel panel panel-default">
                <div className="panel-heading">
                    <h3 className="panel-title">Please Sign Up</h3>
                </div>
                <div className="panel-body">
                    <form role="form">
                        <fieldset>
                            {inputBoxes}
                            <a className="btn btn-lg btn-success btn-block" onClick={this.handleRegister}>Create</a>
                        </fieldset>
                    </form>
                    <h5>Login <a href="/login">Signin</a></h5>
                </div>
            </div>
        );

        return (
            <div className="container">
                <div className="row">
                    <div className="col-md-4 col-md-offset-4">
                        {this.props.mode ? loginView : registerView }
                    </div>
                </div>
            </div>
        );
    }
}
Authentication.propTypes = {
    mode: React.PropTypes.bool,
    onLogin: React.PropTypes.func,
    onRegister: React.PropTypes.func
};

Authentication.defaultProps = {
    mode: true,
    onLogin: (id, pw) =>{
        console.error("login function not defined");
    },
    onRegister: (id, pw) =>{
        console.error("register function not defined");
    }
};

export default Authentication;