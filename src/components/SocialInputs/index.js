import React, { Component } from 'react';
import { connect } from 'react-redux';
import axiosLibrary from 'axios';
import { APISERVERPATH } from '../../config.json'
const axios = axiosLibrary.create( { withCredentials: true } );
const BASE_URL = APISERVERPATH;
//MATERIAL UI
import { red500, cyan500 } from 'material-ui/styles/colors';
import TextField from 'material-ui/TextField';
import FontIcon from 'material-ui/FontIcon';
import Paper from 'material-ui/Paper';
import SaveButton from 'material-ui/svg-icons/file/cloud-upload';
import RaisedButton from 'material-ui/RaisedButton';
//EXPORTED FUNCTIONS
import { updateComps } from '../../ducks/compDuck';
//CSS
import './socialInputs.css';


class SocialInputs extends Component {
    constructor() {
        super()

        this.state = {
            socialfacebook: "",
            socialinstagram: "",
            socialtwitter: "",
            socialyoutube: "",
            sociallinkedin: "",
            socialpinterest: "",
            socialother: ""
        }
    }

    handleChange( field, e ) {
        this.setState( { [ field ] : e.target.value } )
    }

    componentDidMount() {
        let userId = { userId: this.props.userid }
        axios.get( BASE_URL + '/inputs',  { params: userId } )
        .then( response => {
            const inputsFromServer = response.data[ 0 ]
            this.setState( {
                socialfacebook: inputsFromServer.socialfacebook,
                socialinstagram: inputsFromServer.socialinstagram,
                socialtwitter: inputsFromServer.socialtwitter,
                socialyoutube: inputsFromServer.socialyoutube,
                sociallinkedin: inputsFromServer.sociallinkedin,
                socialpinterest: inputsFromServer.socialpinterest,
                socialother: inputsFromServer.socialother
            } )
        })
        .catch( err => {} )
    }

    saveInputs( e ) {
        let componentCompleted = {
            component: "SocialInputs",
            completed: false,
            userId: this.props.userid
        }
        const inputsToServer = {
          inputs: Object.assign({}, this.state),
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
            socialfacebook,
            socialinstagram,
            socialtwitter,
            socialyoutube,
            sociallinkedin,
            socialpinterest,
            socialother
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
                    <a name="SocialInputs"></a>
                    <div >
                        <div className="input-header-title">Social Media Links</div>
                        <div className="input-description">Find your social network links and copy and paste them below.</div>
                        <div>
                            <p className="placeholderinputs">
                                <FontIcon className="material-icons" style={ iconStyles } color={ cyan500 }>arrow_forward</FontIcon>
                                Facebook Link
                            </p>
                            <TextField
                                value={ socialfacebook }
                                onChange={ this.handleChange.bind( this, 'socialfacebook' ) }
                                id="facebooklink"
                                className="hovertexttest"
                                inputStyle={ { textColor: red500 } }
                                underlineShow={ false }
                                style={ inStyle }
                                hintText=""
                            /><br/>
                        </div>
                        <div>
                            <p className="placeholderinputs">
                                <FontIcon className="material-icons" style={ iconStyles } color={ cyan500 }>arrow_forward</FontIcon>
                                Instagram
                            </p>
                            <TextField
                                value={ socialinstagram }
                                onChange={ this.handleChange.bind( this, 'socialinstagram' ) }
                                id="instagram"
                                className="hovertexttest"
                                underlineShow={ false }
                                style={ inStyle }
                                hintText=""
                            /><br/>
                        </div>
                        <div>
                            <p className="placeholderinputs">
                                <FontIcon className="material-icons" style={ iconStyles } color={ cyan500 }>arrow_forward</FontIcon>
                                Twitter
                            </p>
                            <TextField
                                value={ socialtwitter }
                                onChange={ this.handleChange.bind( this, 'socialtwitter' ) }
                                id="twitter"
                                className="hovertexttest"
                                underlineShow={ false }
                                style={ inStyle }
                                hintText=""
                            /><br/>
                        </div>
                        <div>
                            <p className="placeholderinputs">
                                <FontIcon className="material-icons" style={ iconStyles } color={ cyan500 }>arrow_forward</FontIcon>
                                Youtube
                            </p>
                            <TextField
                                value={ socialyoutube }
                                onChange={ this.handleChange.bind( this, 'socialyoutube' ) }
                                id="youtube"
                                className="hovertexttest"
                                underlineShow={ false }
                                style={ inStyle }
                                hintText=""
                            /><br/>
                        </div>
                        <div>
                            <p className="placeholderinputs">
                                <FontIcon className="material-icons" style={ iconStyles } color={ cyan500 }>arrow_forward</FontIcon>
                                Linkedin
                            </p>
                            <TextField
                                value={ sociallinkedin }
                                onChange={ this.handleChange.bind( this, 'sociallinkedin' ) }
                                id="linked"
                                className="hovertexttest"
                                underlineShow={ false }
                                style={ inStyle }
                                hintText=""
                            /><br/>
                        </div>
                        <div>
                            <p className="placeholderinputs">
                                <FontIcon className="material-icons" style={ iconStyles } color={ cyan500 }>arrow_forward</FontIcon>
                                Pinterest
                            </p>
                            <TextField
                                value={ socialpinterest }
                                onChange={ this.handleChange.bind( this, 'socialpinterest' ) }
                                id="pinterest"
                                className="hovertexttest"
                                underlineShow={ false }
                                style={ inStyle }
                                hintText=""
                            /><br/>
                        </div>
                        <div>
                            <p className="placeholderinputs">
                                <FontIcon className="material-icons" style={ iconStyles } color={ cyan500 }>arrow_forward</FontIcon>
                                Other Link
                            </p>
                            <TextField
                                value={ socialother }
                                onChange={ this.handleChange.bind( this, 'socialother' ) }
                                id="otherLink"
                                className="hovertexttest"
                                underlineShow={ false }
                                style={ inStyle }
                                hintText=""
                            /><br/>
                        </div>
                        <div className="save-button-inputs">
                            <RaisedButton
                                label="SAVE"
                                labelPosition="before"
                                icon={ < SaveButton /> }
                                style={ styles.button }
                                backgroundColor="#AE863C"
                                labelColor="#FFFFFF"
                                buttonStyle={ { fontWeight: 100 } }
                                onClick={ this.saveInputs.bind( this ) }
                            />
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
export default connect( mapStateToProps, { updateComps } )( SocialInputs );
