import React, {Component} from "react";
import { connect } from "react-redux";
import { Link } from "react-router-dom";
import {signup} from '../../ducks/userDuck'
import "./CreateUser.scss";
import TextField from 'material-ui/TextField';
import FlatButton from 'material-ui/FlatButton';
import CircularProgress from 'material-ui/CircularProgress';
import { Field, reduxForm } from 'redux-form'
import asyncValidate from '../../asyncValidate'


class CreateUserForm extends Component {
    constructor(props){
        super(props);

        this.state = {
            email: "" ,
            password:"",
            firstname:"",
            lastname:"",
            company:""
        }

        this.handleSubmit = this.handleSubmit.bind(this);
        this.handleChange = this.handleChange.bind(this);

    }

    handleSubmit(event) {
        this.props.signup( this.state )
        event.preventDefault();
    }

    handleChange(field, e) {
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
            email,
            password,
            firstname,
            lastname,
            company
        } = this.state

        return (

            <form onSubmit={ this.handleSubmit } className="login-landing" >
                <div className="login-container">
                    <div className="login-form-inputs">
                         <Field
                              label="First Name"
                              component={renderTextField}
                              name="firstname"
                              onChange = { this.handleChange.bind( this, 'firstname' ) }
                        />
                        <br/>
                        <Field
                             label="Last Name"
                             component={renderTextField}
                             name="lastname"
                             onChange = { this.handleChange.bind( this, 'lastname' ) }
                       />
                       <br/>
                       <Field
                            label="Company"
                            component={renderTextField}
                            name="company"
                            onChange = { this.handleChange.bind( this, 'lastname' ) }
                        />
                        <br/>
                        <Field
                             label="Email"
                             component={renderTextField}
                             name="email"
                             onChange = { this.handleChange.bind( this, 'email' ) }
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
                            label="SIGNUP"
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

function mapStateToProps(state) {
    return {
        isAuthenticated: state.loginDuck.isAuthenticated,
        errorAuthenticating: state.loginDuck.errorAuthenticating,
		loadingUser: state.loginDuck.loadingUser,
		loginError: state.loginDuck.loginError
     };
}

const required = value => value ? undefined : 'Required'
const maxLength = max => value =>
    value && value.length > max ? `Must be ${max} characters or less` : undefined
const maxLength15 = maxLength(15)
const number = value => value && isNaN(Number(value)) ? 'Must be a number' : undefined
const minValue = min => value =>
    value && value < min ? `Must be at least ${min}` : undefined
const minValue18 = minValue(18)
const email = value =>
    value && !/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i.test(value) ?
    'Invalid email address' : undefined
const validate = values => {
    const errors = {}
    const requiredFields = [ 'email', 'password','firstname','lastname']
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
const renderTextField = ({ input, label, meta: { touched, error }, ...custom }) => (
    <TextField
        hintText={label}
        floatingLabelText={label}
        errorText={touched && error}
        {...input}
        {...custom}
    />
)

const form = reduxForm({
   form: 'createuserForm',
  asyncValidate,
  validate
});

export default connect( mapStateToProps, {signup})( form(CreateUserForm) );
