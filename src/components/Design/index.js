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
import { setInputs, getInputs } from '../../ducks/inputDuck';
import { updateComps } from '../../ducks/compDuck';
//CSS
import './design.css';


class Design extends Component {
    constructor() {
        super()

        this.state = {
            designwho: "",
            designaction: "",
            designurl: ""
        }
    }

    handleChange( field, e ) {
        this.setState( { [ field ] : e.target.value } )
    }
    componentDidMount() {
        let userId = { userId: this.props.userid }
        axios.get( BASE_URL + '/inputs', { params: userId } )
        .then( response => {
            const inputsFromServer = response.data[ 0 ]
            this.setState( {
                designwho: inputsFromServer.designwho,
                designaction: inputsFromServer.designaction,
                designurl: inputsFromServer.designurl
            } )
        } )
        .catch( err => {} )
    }

    saveInputs( e ) {
        let componentCompleted = {
            component: "Design",
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
        } )
        .catch( err => {} )
        e.preventDefault()
    }

    render() {
        const {
            designwho,
            designaction,
            designurl
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
                <Paper style={pstyle} zDepth={1}>
                    <a name="Design"></a>
                    <div>
                        <div className="input-header-title">Design</div>
                        <div className="input-description">These questions are designed to help us with our design and build process.</div>
                        <div>
                            <p className="placeholderinputs">
                                <FontIcon className="material-icons" style={ iconStyles } color={ cyan500 }>arrow_forward</FontIcon>
                                Who is visiting your site? Be specific as to what type of person or customer is visiting your site.
                            </p>
                            <TextField
                                id="design"
                                value={ designwho }
                                onChange={ this.handleChange.bind( this, 'designwho' ) }
                                className="hovertexttest"
                                underlineShow={ false }
                                style={ inStyle }
                                multiLine={ true }
                                rows={ 3 }
                            /><br/>
                        </div>
                        <div>
                            <p className="placeholderinputs">
                                <FontIcon className="material-icons" style={ iconStyles } color={ cyan500 }>arrow_forward</FontIcon>
                                What do you want them to do when they come to your site? What ACTION?
                            </p>
                            <TextField
                                value={ designaction }
                                onChange={ this.handleChange.bind( this, 'designaction' ) }
                                className="hovertexttest"
                                id="design2"
                                underlineShow={ false }
                                style={ inStyle }
                                multiLine={ true }
                                rows={ 3 }
                            /><br/>
                        </div>
                        <div>
                            <p className="placeholderinputs">
                                <FontIcon className="material-icons" style={ iconStyles } color={ cyan500 }>arrow_forward</FontIcon>
                                List of any Example Websites you like? Enter URL below.
                            </p>
                            <TextField
                                value={ designurl }
                                onChange={ this.handleChange.bind( this, 'designurl' ) }
                                className="hovertexttest"
                                id="design3"
                                underlineShow={ false }
                                style={ inStyle }
                                multiLine={ true }
                                rows={ 3 }
                            /><br/>
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
export default connect( mapStateToProps, { updateComps } )( Design );
