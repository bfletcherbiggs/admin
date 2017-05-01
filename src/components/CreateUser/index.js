import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Field, reduxForm } from 'redux-form';
//EXPORTED FUNCTIONS
import { signup } from '../../ducks/authDuck'
//MATERIAL UI
import ReduxSweetAlert from 'react-redux-sweetalert';
import FlatButton from 'material-ui/FlatButton';
import TextField from 'material-ui/TextField';
//CSS
import './CreateUser.css';

const renderTextField = ( { input,label,meta: { touched,error },...custom } ) => (
    <TextField
        hintText={ label }
        floatingLabelText={ label }
        errorText={ touched && error }
        { ...input }
        { ...custom }
    />
)

class CreateUserForm extends Component {
    constructor() {
        super();

        this.state = {
            email: "",
            password: "",
            firstname: "",
            lastname: "",
            company: "",
            show:false
        }

        this.handleSubmit = this.handleSubmit.bind( this );
        this.handleChange = this.handleChange.bind( this );
    }

    handleSubmit( event ) {
        event.preventDefault();
        this.props.signup( this.state,this.props.user.id )
    }

    handleChange( field, e ) {
        this.setState( { [ field ] : e.target.value } )
    }

    render( ) {

        const { pristine } = this.props
        const { password } = this.state

        return (
            <div>
                <form onSubmit={ this.handleSubmit } className="login-landing">
                    <div className="login-container">
                        <div className="login-form-inputs">
                            <Field
                                label="First Name"
                                component={ renderTextField }
                                name="firstname"
                                onChange={ this.handleChange.bind( this, 'firstname' ) }/>
                            <br/>
                            <Field
                                label="Last Name"
                                component={ renderTextField }
                                name="lastname"
                                onChange={ this.handleChange.bind( this, 'lastname' ) }/>
                            <br/>
                            <Field
                                label="Company"
                                component={ renderTextField }
                                name="company"
                                onChange={ this.handleChange.bind( this, 'company' ) }/>
                            <br/>
                            <Field
                                label="Email"
                                component={ renderTextField }
                                name="email"
                                onChange={ this.handleChange.bind( this, 'email' ) }/>
                            <br/>
                            <Field
                                label="Password"
                                type="password"
                                name="password"
                                component={ renderTextField }
                                onChange={this.handleChange.bind( this, 'password' ) }/>
                            <br/>
                            <FlatButton
                                type="submit"
                                label="Submit"
                                disabled={ pristine || !password }
                                primary={ true }
                            />
                        </div>
                    </div>
                </form>
                <ReduxSweetAlert />
            </div>
        );
    }
}

const validate = values => {
    const errors = {}
    const requiredFields = [ 'email', 'password', 'firstname', 'lastname' ]
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
    form: 'createuserForm',
    validate
} );

const mapStateToProps = state => {
    return {
        user: state.authDuck.user
    }
}

export default connect( mapStateToProps, { signup } )( form( CreateUserForm ) );
