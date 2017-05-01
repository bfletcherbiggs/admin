import React, { Component } from 'react';
import { connect } from 'react-redux';
import { withRouter, Redirect } from 'react-router-dom';
import { Field, reduxForm } from 'redux-form';
//EXPORTED FUNCTIONS
import { login } from '../../ducks/authDuck';
//MATERIAL UI
import TextField from 'material-ui/TextField';
import FlatButton from 'material-ui/FlatButton';
import CircularProgress from 'material-ui/CircularProgress';
//CSS
import './Login.css';

const renderTextField = ( { input, label, meta: { touched, error }, ...custom } ) => (
    <TextField
        hintText={ label }
        floatingLabelText={ label }
        errorText={ touched && error }
        { ...input }
        { ...custom }
    />
)

class LoginForm extends Component {
    constructor(){
        super();

        this.state = {
            email: "" ,
            password:""
        }

        this.handleSubmit = this.handleSubmit.bind( this );
        this.handleChange = this.handleChange.bind( this );
    }

    handleSubmit( e ) {
        this.props.login( this.state )
        e.preventDefault();
    }

    handleChange( field, e ) {
        this.setState( { [ field ]: e.target.value } )
    }

    render() {

        const{
            isAuthenticated,
            loadingUser,
            pristine,
            loginError
        } =  this.props

        const {
            password
        } = this.state

        if( isAuthenticated ){
            return (
                <Redirect to='/admin'/>
            )
        }

        return (
            <form onSubmit={ this.handleSubmit } className="login-landing" >
                <div className="login-container">
                    <div className="login-form-inputs">
                         <Field
                              label="Username"
                              component={ renderTextField }
                              name="email"
                              onChange={ this.handleChange.bind( this, 'email' ) }
                        />
                        <br/>
                        <Field
                              label="Password"
                              type="password"
                              name="password"
                              component={ renderTextField }
                              onChange={ this.handleChange.bind( this, 'password' ) }
                        />
                        <br/>
                        <FlatButton
                            type="submit"
                            label="LOGIN"
                            disabled={ loadingUser || pristine || !password }
                            primary={ true }
                        />
                    </div>
                </div>
                { ( loadingUser )?<CircularProgress size={ 80 } thickness={ 5 } />:null }
                { ( loginError )? <div>Username/Password is Incorrect</div>:null }
            </form>
        )
    }
}

const validate = values => {
    const errors = {}
    const requiredFields = [ 'email', 'password']
    requiredFields.forEach( field => {
        if ( !values[ field ] ) {
            errors[ field ] = 'Required'
        }
    })
    if ( values.email && !/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i.test( values.email ) ) {
        errors.email = 'Invalid email address'
    }
    return errors
}

const form = reduxForm( {
    form: 'loginForm',
    validate
} );

const mapStateToProps = state => {
    return {
        isAuthenticated: state.authDuck.isAuthenticated,
        errorAuthenticating: state.authDuck.errorAuthenticating,
        loadingUser: state.authDuck.loadingUser,
        loginError: state.authDuck.loginError,
        messages: state.authDuck.messages
    }
}

export default withRouter( connect( mapStateToProps, { login } )( form( LoginForm ) ) )
