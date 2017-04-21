import React, {Component} from "react";
import { connect } from "react-redux";
import {login} from '../../ducks/userDuck';
import "./Login.scss";
import TextField from 'material-ui/TextField';
import FlatButton from 'material-ui/FlatButton';
import { withRouter } from 'react-router-dom';
import CircularProgress from 'material-ui/CircularProgress';
import { Field, reduxForm } from 'redux-form';

const renderTextField = ({ input, label, meta: { touched, error }, ...custom }) => (
    <TextField
        hintText={label}
        floatingLabelText={label}
        errorText={touched && error}
        {...input}
        {...custom}
    />
)

class LoginForm extends Component {
    constructor(props){
        super(props);

        this.state = {
            email: "" ,
            password:""
        }

        this.handleSubmit = this.handleSubmit.bind(this);
        this.handleChange = this.handleChange.bind(this);

    }

    handleSubmit(event) {
        this.props.login( this.state )
        event.preventDefault();
    }

    handleChange(field, e) {
        this.setState( { [ field ]: e.target.value } )
    }

    componentWillReceiveProps(nextProps){
        if( nextProps.isAuthenticated ){
            nextProps.history.push('/admin')
        }
    }

    render() {

        const{
            loadingUser,
            pristine,
            loginError
        } =  this.props

        const {
            password
        } = this.state

        return (

            <form onSubmit={ this.handleSubmit } className="login-landing" >
                <div className="login-container">
                    <div className="login-form-inputs">
                         <Field
                              label="Username"
                              component={renderTextField}
                              name="email"
                              onChange={ this.handleChange.bind( this, 'email' ) }
                        />
                        <br/>
                        <Field
                              label="Password"
                              type="password"
                              name="password"
                              component={renderTextField}
                              onChange={ this.handleChange.bind( this, 'password' ) }
                        />
                        <br/>
                        <FlatButton
                            type="submit"
                            label="LOGIN"
                            disabled={ loadingUser || pristine || !password}
                            primary={ true }
                        />
                    </div>
                </div>
                { ( loadingUser )?<CircularProgress size={ 80 } thickness={ 5 } />:null }
                { ( loginError )? <div>Username/Password is Incorrect</div>:null}
            </form>

        );
    }
}

const validate = values => {
    const errors = {}
    const requiredFields = [ 'email', 'password']
    requiredFields.forEach(field => {
        if (!values[ field ]) {
            errors[ field ] = 'Required'
        }
    })
    if (values.email && !/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i.test(values.email)) {
        errors.email = 'Invalid email address'
    }
    return errors
}

const form = reduxForm({
    form: 'loginForm',
    validate
});

function mapStateToProps(state) {
    return {
        isAuthenticated: state.loginDuck.isAuthenticated,
        errorAuthenticating: state.loginDuck.errorAuthenticating,
        loadingUser: state.loginDuck.loadingUser,
        loginError: state.loginDuck.loginError,
        messages: state.loginDuck.messages
    }
}

export default withRouter(connect( mapStateToProps, {login})( form(LoginForm) ))
