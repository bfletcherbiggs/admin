import React, { Component } from 'react';
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
import RaisedButton from 'material-ui/RaisedButton';
import Paper from 'material-ui/Paper';
//EXPORTED FUNCTIONS
import { getInputs, setInputs } from '../../ducks/inputDuck';
import { updateComps } from '../../ducks/compDuck';
//CSS
import './billInfo.css';


class BillInfo extends Component {
    constructor() {
        super()

        this.state = {
            billingpoc: "",
            billingphonenumber: "",
            billingemail: "",
            billingadd: "",
            billingcity: "",
            billingstate: "",
            billingzip: ""
        }
    }

    handleChange( field, e ) {
        this.setState( { [ field ] : e.target.value } )
    }

    componentDidMount() {
        let userId = { userId: this.props.userid }
        axios.get( BASE_URL + '/inputs',  {params: userId} )
        .then( response => {
            const inputsFromServer = response.data[ 0 ]
            this.setState( {
                billingpoc: inputsFromServer.billingpoc,
                billingphonenumber: inputsFromServer.billingphonenumber,
                billingemail: inputsFromServer.billingemail,
                billingadd: inputsFromServer.billingadd,
                billingcity: inputsFromServer.billingcity,
                billingstate: inputsFromServer.billingstate,
                billingzip: inputsFromServer.billingzip
            } )
        })
        .catch( err => {} )
    }

    saveInputs( e ) {
        const inputsToServer = {
          inputs: Object.assign({}, this.state),
          userId: this.props.userid
        }

        let componentCompleted = {
            component: "BillInfo",
            completed: false,
            userId: this.props.userid
        }

        let completeCheck = true;
        for ( let stateCheck in inputsToServer.inputs ) {
            if ( !inputsToServer.inputs[ stateCheck ] ) {
                completeCheck = false;
            }
        }

        if ( completeCheck ) {
            componentCompleted.completed = true;
        }

        axios.put( BASE_URL + '/inputs', inputsToServer )
        .then( response => {
            this.props.updateComps( componentCompleted );
        })
        .catch( err => {} )

        e.preventDefault()
    }

    render() {
        const {
            billingpoc,
            billingphonenumber,
            billingemail,
            billingadd,
            billingcity,
            billingstate,
            billingzip
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
                    <a name="BillInfo"></a>
                    <div>
                        <div className="input-header-title">Billing Information</div>
                        <div className="input-description">This is for Goldsage Billing Contact Info and Payment Processing</div>
                        <div>
                            <p className="placeholderinputs">
                                <FontIcon className="material-icons" style={ iconStyles } color={ cyan500 }>arrow_forward</FontIcon>
                                Billing Point of Contact Name
                            </p>
                            <TextField
                                id="billingPOC"
                                value={ billingpoc }
                                onChange={ this.handleChange.bind( this, 'billingpoc' ) }
                                className="hovertexttest"
                                underlineShow={ false }
                                style={ inStyle }
                                hintText=""
                            />
                            <br/>
                        </div>
                        <div>
                            <p className="placeholderinputs">
                                <FontIcon className="material-icons" style={ iconStyles } color={ cyan500 }>arrow_forward</FontIcon>
                                Direct Phone Number
                            </p>
                            <TextField
                                id="billingphonenumber"
                                value={ billingphonenumber }
                                onChange={ this.handleChange.bind( this, 'billingphonenumber' ) }
                                className="hovertexttest"
                                underlineShow={ false }
                                style={ inStyle }
                                hintText=""
                            />
                            <br/>
                        </div>
                        <div>
                            <p className="placeholderinputs">
                                <FontIcon className="material-icons" style={ iconStyles } color={ cyan500 }>arrow_forward</FontIcon>
                                Email
                            </p>
                            <TextField
                                id="billingemail"
                                value={ billingemail }
                                onChange={ this.handleChange.bind( this, 'billingemail' ) }
                                className="hovertexttest"
                                underlineShow={ false }
                                style={ inStyle }
                                hintText=""
                            />
                            <br/>
                        </div>
                        <div>
                            <p className="placeholderinputs">
                                <FontIcon className="material-icons" style={ iconStyles } color={ cyan500 }>arrow_forward</FontIcon>
                                Billing Address
                            </p>
                            <TextField
                                id="billingadd"
                                value={ billingadd }
                                onChange={ this.handleChange.bind( this, 'billingadd' ) }
                                className="hovertexttest"
                                underlineShow={ false }
                                style={ inStyle }
                                hintText=""
                            />
                            <br/>
                        </div>
                        <div>
                            <p className="placeholderinputs">
                            <FontIcon className="material-icons" style={ iconStyles } color={ cyan500 }>arrow_forward</FontIcon>
                            City
                            </p>
                            <TextField
                                id="billingcity"
                                value={ billingcity }
                                onChange={ this.handleChange.bind( this, 'billingcity' ) }
                                className="hovertexttest"
                                underlineShow={ false }
                                style={ inStyle }
                                hintText=""
                            />
                            <br/>
                        </div>
                        <div>
                            <p className="placeholderinputs">
                                <FontIcon className="material-icons" style={ iconStyles } color={ cyan500 }>arrow_forward</FontIcon>
                                State
                            </p>
                            <TextField
                                id="billingstate"
                                value={ billingstate }
                                onChange={ this.handleChange.bind( this, 'billingstate' ) }
                                className="hovertexttest"
                                underlineShow={ false }
                                style={ inStyle }
                                hintText=""
                            />
                            <br/>
                        </div>
                        <div>
                            <p className="placeholderinputs">
                                <FontIcon className="material-icons" style={ iconStyles } color={ cyan500 }>arrow_forward</FontIcon>
                                Zip Code
                            </p>
                            <TextField
                                id="billingzip"
                                value={ billingzip }
                                onChange={ this.handleChange.bind( this, 'billingzip' ) }
                                className="hovertexttest"
                                underlineShow={ false }
                                style={ inStyle }
                                hintText=""
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
const mapStateToProps = state => {
    return { userid: state.messageDuck.userid };
}
export default connect( mapStateToProps, { setInputs, getInputs, updateComps } )( BillInfo )
