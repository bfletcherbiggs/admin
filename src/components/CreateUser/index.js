import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import { Field, reduxForm } from 'redux-form';
import { Grid, Row, Col } from 'react-flexbox-grid';
//EXPORTED FUNCTIONS
import { signup } from '../../ducks/authDuck'
//MATERIAL UI
import ReduxSweetAlert from 'react-redux-sweetalert';
import RaisedButton from 'material-ui/RaisedButton';
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
        this.props.signup( this.state,this.props.user.id, this )
    }

    handleChange( field, e ) {
        this.setState( { [ field ] : e.target.value } )
    }

    render( ) {

        const { pristine } = this.props
        const { password } = this.state

        return (

                <form onSubmit={ this.handleSubmit } className="createuser-landing">
                    <Grid fluid>
                        <div className="createuser-container">
                            <Row>
                                <Col type="row" sm={ 12 } md={ 6 } className="createuser-form-inputs">
                                    <h2>Create New User</h2>
                                    <Field
                                        label="First Name"
                                        component={ renderTextField }
                                        fullWidth={ true }
                                        name="firstname"
                                        onChange={ this.handleChange.bind( this, 'firstname' ) }/>
                                    <br/>
                                    <Field
                                        label="Last Name"
                                        component={ renderTextField }
                                        fullWidth={ true }
                                        name="lastname"
                                        onChange={ this.handleChange.bind( this, 'lastname' ) }/>
                                    <br/>
                                    <Field
                                        label="Company"
                                        component={ renderTextField }
                                        fullWidth={ true }
                                        name="company"
                                        onChange={ this.handleChange.bind( this, 'company' ) }/>
                                    <br/>
                                    <Field
                                        label="Email"
                                        component={ renderTextField }
                                        fullWidth={ true }
                                        name="email"
                                        onChange={ this.handleChange.bind( this, 'email' ) }/>
                                    <br/>
                                    <Field
                                        label="Password"
                                        type="password"
                                        name="password"
                                        component={ renderTextField }
                                        fullWidth={ true }
                                        onChange={this.handleChange.bind( this, 'password' ) }/>
                                    <br/>
                                    <Row>
                                        <Col xs={ 6 }>
                                            <Link to="/admin">
                                                <RaisedButton
                                                    label="Cancel"
                                                    fullWidth={ true }
                                                />
                                            </Link>
                                        </Col>
                                        <Col xs={ 6 }>
                                            <RaisedButton
                                                type="submit"
                                                label="Submit"
                                                disabled={ pristine || !password }
                                                primary={ true }
                                                fullWidth={ true }
                                            />
                                        </Col>
                                    </Row>
                                </Col>
                            </Row>
                        </div>
                    </Grid>
                    <ReduxSweetAlert />
                </form>
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
