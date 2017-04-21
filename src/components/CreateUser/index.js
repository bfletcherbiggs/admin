import React, { Component } from "react";
import { connect } from "react-redux";
import { signup } from '../../ducks/userDuck'
import "./CreateUser.scss";
import TextField from 'material-ui/TextField';
import FlatButton from 'material-ui/FlatButton';
import { Field, reduxForm } from 'redux-form';
import asyncValidate from '../../asyncValidate';

const renderTextField = ({input,label,meta: {touched,error},...custom}) => (
    <TextField
        hintText={label}
        floatingLabelText={label}
        errorText={touched && error}
        {...input}
        {...custom}
    />
)

class CreateUserForm extends Component {
    constructor( props ) {
        super( props );

        this.state = {
            email: "",
            password: "",
            firstname: "",
            lastname: "",
            company: ""
        }

        this.handleSubmit = this.handleSubmit.bind( this );
        this.handleChange = this.handleChange.bind( this );

    }

    handleSubmit( event ) {
        this.props.signup( this.state )
        event.preventDefault( );
    }

    handleChange( field, e ) {
        this.setState( { [ field ]: e.target.value } )
    }

    render( ) {

        const { pristine } = this.props
        const { password } = this.state

        return (

            <form onSubmit={this.handleSubmit} className="login-landing">
                <div className="login-container">
                    <div className="login-form-inputs">
                        <Field
                            label="First Name"
                            component={renderTextField}
                            name="firstname"
                            onChange={this.handleChange.bind( this, 'firstname' )}/>
                        <br/>
                        <Field
                            label="Last Name"
                            component={renderTextField}
                            name="lastname"
                            onChange={this.handleChange.bind( this, 'lastname' )}/>
                        <br/>
                        <Field
                            label="Company"
                            component={renderTextField}
                            name="company"
                            onChange={this.handleChange.bind( this, 'company' )}/>
                        <br/>
                        <Field
                            label="Email"
                            component={renderTextField}
                            name="email"
                            onChange={this.handleChange.bind( this, 'email' )}/>
                        <br/>
                        <Field
                            label="Password"
                            type="password"
                            name="password"
                            component={renderTextField}
                            onChange={this.handleChange.bind( this, 'password' )}/>
                        <br/>
                        <FlatButton
                            type="submit"
                            label="SIGNUP"
                            disabled={pristine || !password}
                            primary={true}/>
                    </div>
                </div>
            </form>

        );
    }
}



const validate = values => {
    const errors = {}
    const requiredFields = [ 'email', 'password', 'firstname', 'lastname' ]
    requiredFields.forEach(field => {
        if (!values[field]) {
            errors[field] = 'Required'
        }
    })
    if (values.email && !/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i.test( values.email )) {
        errors.email = 'Invalid email address'
    }
    return errors
}


const form = reduxForm({
    form: 'createuserForm',
    asyncValidate,
    validate
});

export default connect({ signup })(form( CreateUserForm ));
