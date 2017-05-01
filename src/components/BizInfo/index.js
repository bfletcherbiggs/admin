import React, { Component  } from 'react';
import { connect } from 'react-redux';
import axiosLibrary from 'axios';
import { APISERVERPATH } from '../../config.json';
const axios = axiosLibrary.create( { withCredentials: true } );
const BASE_URL = APISERVERPATH;
//MATERIAL UI
import TextField from 'material-ui/TextField';
import FontIcon from 'material-ui/FontIcon';
import { cyan500 } from 'material-ui/styles/colors';
import SaveButton from 'material-ui/svg-icons/file/cloud-upload';
import Paper from 'material-ui/Paper';
import RaisedButton from 'material-ui/RaisedButton';
//EXPORTED FUNCTIONS
import { setInputs, getInputs } from '../../ducks/inputDuck';
import { updateComps } from '../../ducks/compDuck';
//CSS
import './bizInfo.css';

class BizInfo extends Component {
    constructor() {
        super()

        this.state = {
            businessname: "",
            businessadd: "",
            businesscity: "",
            businessstate: "",
            businessemail: ""
        }
    }

    handleChange( field, e ) {
        this.setState( { [ field ] : e.target.value } )
    }

    componentDidMount() {
        axios.get( BASE_URL + '/inputs' )
        .then( response => {
            const inputsFromServer = response.data[ 0 ]
            this.setState( {
                businessname: inputsFromServer.businessname,
                businessadd: inputsFromServer.businessadd,
                businesscity: inputsFromServer.businesscity,
                businessstate: inputsFromServer.businessstate,
                businessemail: inputsFromServer.businessemail
            } )
        } )
        .catch( err => {} )
    }

    saveInputs( e ) {
        let componentCompleted = {
            component: "BizInfo",
            completed: false
        }
        const inputsToServer = this.state;

        let completeCheck = true;
        for ( let stateCheck in inputsToServer ) {
            if ( !inputsToServer[ stateCheck ] ) {
                completeCheck = false;
            }
        }
        if ( completeCheck ) {
            componentCompleted.completed = true;
        }
        axios.put( BASE_URL + '/inputs', inputsToServer )
        .then( response => {
            this.props.updateComps( componentCompleted )
        })
        .catch( err => {} )

        e.preventDefault()
    }

    render() {

        const {
            businessname,
            businessadd,
            businesscity,
            businessstate,
            businessemail
        } = this.state;

        const iconStyles = {
            marginRight: 10,
            fontSize: 14
        }
        const inStyle = {
            width: '90%',
            fontSize: 25,
            fontWeight: 300
        }
        const styles = {
            button: {
                margin: 20,
                fontWeight: 100
            }
        }
        const pstyle = {
            padding: 40,
            width: 600
        }

        return (
            <main className="input-tile">
                <Paper style={ pstyle } zDepth={ 1 }>
                    <a name="BizInfo"></a>
                    <div>
                        <div className="input-header-title">General Business Info</div>
                        <div className="input-description">Provide your business information for website.</div>
                        <div>
                            <p className="placeholderinputs">
                                <FontIcon className="material-icons" style={ iconStyles } color={ cyan500 }>arrow_forward</FontIcon>
                                Business Name
                            </p>
                            <TextField
                                id="businessname"
                                value={ businessname }
                                onChange={ this.handleChange.bind( this, 'businessname' ) }
                                className="hovertexttest"
                                underlineShow={ false }
                                style={ inStyle }
                            />
                            <br/>
                        </div>
                        <div>
                            <p className="placeholderinputs">
                                <FontIcon className="material-icons" style={ iconStyles } color={ cyan500 }>arrow_forward</FontIcon>
                                Business Address
                            </p>
                            <TextField
                                id="businessadd"
                                value={ businessadd }
                                onChange={ this.handleChange.bind( this, 'businessadd' ) }
                                className="hovertexttest"
                                underlineShow={ false }
                                style={ inStyle }
                            />
                        </div>
                        <div>
                            <p className="placeholderinputs">
                                <FontIcon className="material-icons" style={ iconStyles } color={ cyan500 }>arrow_forward</FontIcon>
                                City
                            </p>
                            <TextField
                                id="businesscity"
                                value={ businesscity }
                                onChange={ this.handleChange.bind( this, 'businesscity' ) }
                                className="hovertexttest"
                                underlineShow={ false }
                                style={ inStyle }
                            />
                        </div>
                        <div>
                            <p className="placeholderinputs">
                                <FontIcon className="material-icons" style={ iconStyles } color={ cyan500 }>arrow_forward</FontIcon>
                                State
                            </p>
                            <TextField
                                id="businessstate"
                                value={ businessstate }
                                onChange={ this.handleChange.bind( this, 'businessstate' ) }
                                className="hovertexttest"
                                underlineShow={ false }
                                style={ inStyle }
                            />
                            <br/>
                        </div>
                        <div>
                            <p className="placeholderinputs">
                                <FontIcon className="material-icons" style={ iconStyles } color={ cyan500 }>arrow_forward</FontIcon>
                                Contact Form Email Address
                            </p>
                            <TextField
                                id="businessemail"
                                value={ businessemail }
                                onChange={ this.handleChange.bind( this, 'businessemail' ) }
                                className="hovertexttest"
                                underlineShow={ false }
                                style={ inStyle }
                            />
                            <br/>
                        </div>
                        <div className="save-button-inputs">
                            <RaisedButton
                                href="#fileup"
                                label="SAVE"
                                labelPosition="before"
                                icon={ < SaveButton /> }
                                style={ styles.button }
                                backgroundColor="#AE863C"
                                labelColor="#FFFFFF"
                                buttonStyle={ { fontWeight: 100 } }
                                onClick={ this.saveInputs.bind( this ) }
                            ></RaisedButton>
                        </div>
                    </div>
                </Paper>
            </main>
        )

    }
}

export default connect( state => state, { setInputs, getInputs, updateComps } )( BizInfo )
