import React, { Component } from 'react';
import { connect } from "react-redux";
import { addAuthenticatedUser } from "../actions";
import { Header } from './Header';
class Login extends Component {
    constructor( props ) {
        super( props );
        this.state = {
            username: "",
            password: "",
            errorMessage: ""
        };
        this.submit  = this.submit.bind(this);
    }
    componentDidMount() {
    }
    handleChange = name => event => {
        this.setState({
            [name]: event.target.value,
        });
    };

    render() {
        return (
            <div>
            <Header />
            <div className= "login-background"/>
                <div className=" login-container clearfix">
                    <form className="clearfix" onSubmit = { this.submit }>
                        <div className="clearfix">
                            <p className= "error"> { this.state.errorMessage } </p>
                            <div className="input-field">
                                <input id="username" type="text" className="" value = {this.state.username} onChange={ this.handleChange( 'username' ) }/>
                                    <label htmlFor="username">User Name</label>
                            </div>
                            <div className="input-field">
                                <input id="password" type="password" className="" value = {this.state.password} onChange={ this.handleChange( 'password' ) }/>
                                    <label htmlFor="password">Password</label>
                            </div>
                            <a className="row m10 right clearfix">Forgot Password ?</a>
                            <input type= "submit" className="waves-effect waves-light btn-large right clearfix" value = "Login"/>
                        </div>
                    </form>
                </div>
            </div>
        );
    }

    submit( event ) {
        event.preventDefault();
        event.stopPropagation();
        let login =this.props.loginDetails;
        if ( login.users[ this.state.username ] != null ) {
            if ( login.users[ this.state.username ].password === this.state.password ) {
                this.props.storeAuthenticatedUser( { ...login.users[ this.state.username ] } );
                this.props.history.push('/dashboard');
            } else {
                this.setState ( {
                    errorMessage: "Please enter correct username/password",
                    username: "",
                    password: ""
                } );
            }
        } else {
            this.setState ( {
                errorMessage: "Please enter correct username/password",
                username: "",
                password: ""
            } );
        }
    }
    componentWillUnmount() {
        delete this.state;
    }
}

const mapStateToProps = state => {
    return {
        store: state.simpleReducer.authUser,
        loginDetails: state.simpleReducer
    };
};

function mapDispatchToProps(dispatch) {
    return {
        storeAuthenticatedUser: payload => dispatch( addAuthenticatedUser(payload))
    };
}
export default connect(mapStateToProps, mapDispatchToProps)(Login);