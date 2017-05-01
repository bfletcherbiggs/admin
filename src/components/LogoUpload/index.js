import React, { Component } from 'react';
import { connect } from 'react-redux';
import axiosLibrary from 'axios';
import { APISERVERPATH } from '../../config.json';
const axios = axiosLibrary.create( { withCredentials: true } );
const BASE_URL = APISERVERPATH;
import Dropbox from 'dropbox'
//MATERIAL UI
import FontIcon from 'material-ui/FontIcon';
import { cyan500, greenA700 } from 'material-ui/styles/colors';
import UploadButton from 'material-ui/svg-icons/file/file-upload';
import RaisedButton from 'material-ui/RaisedButton';
import Paper from 'material-ui/Paper';
import SaveButton from 'material-ui/svg-icons/file/cloud-upload';
//EXPORTED FUNCTIONS
import { uploadFile, getFiles } from '../../ducks/uploadDuck'
import { updateComps } from '../../ducks/compDuck'
//CSS
import './logoUpload.css'

class LogoUpload extends Component {
    constructor() {
        super();
        this.state = {
            open: false,
            dropboxFiles: []
        }
    }

    _uploadFile( e ) {
        e.preventDefault()
        let componentCompleted = {
            component: "LogoUpload",
            completed: true
        }
        return axios.get( BASE_URL + '/inputs/upload' )
        .then( response => {
            let ACCESS_TOKEN = response.data.dropboxkey;
            let dbx = new Dropbox( { accessToken: ACCESS_TOKEN } );
            let fileInput = document.getElementById( 'file-upload' );
            let file = fileInput.files[ 0 ];
            dbx.filesUpload( {
                path: '/' + response.data.company + '/' + file.name,
                contents: file
            } )
            .then( response => {
                this.setState( { dropboxFiles: [ ...this.state.dropboxFiles, response ] } )
                componentCompleted.completed = true;
                this.props.updateComps( componentCompleted );
                alert( file.name + ' uploaded successfully!' )
            } )
            .catch( err => {} )
        })
        .catch( err => {} )
    }

    componentDidMount() {
        return axios.get( BASE_URL + '/inputs/upload' )
        .then( response => {
            let ACCESS_TOKEN = response.data.dropboxkey;
            let dbx = new Dropbox( { accessToken: ACCESS_TOKEN } );
            dbx.filesListFolder( {
                path: '/' + response.data.company
            } )
            .then( response => {
                this.setState({dropboxFiles: response.entries})
            } )
            .catch( err => {} )
        })
        .catch(err => {} )
    }

    handleTouchTap () {
        this.setState( { open: true } )
    }

    handleRequestClose () {
        this.setState( { open: false } )
    }

    render() {
        const { dropboxFiles } = this.state

        const dropboxFileUploads = dropboxFiles.map( file => {
            return (
                <div key={ file.id }>
                    { file.name }
                </div>
            )
        })

        const iconStyles = {
            marginRight: 10,
            fontSize: 14
        }
        const styles = {
            button: {
                margin: 20,
                rippleStyle: cyan500
            },
            exampleImageInput: {
                cursor: 'pointer',
                position: 'absolute',
                top: 0,
                bottom: 0,
                right: 0,
                left: 0,
                width: '100%',
                opacity: 0
            }
        }
        const pstyle = {
            padding: 40,
            width: 600
        }

        return (
            <main className="input-tile">
                <Paper style={ pstyle } zDepth={ 1 }>
                    <a name="LogoUpload"></a>
                    <div id="fileup">
                        <div className="input-header-title">Upload Your Logo</div>
                        <div className="input-description">Prefer Vector but accept these files: .jpeg .pdf .ai .psd .png .svg</div>
                        <div className="input-description">
                            <FontIcon
                                style={ { iconStyles } }
                                className="material-icons"
                                color={ greenA700 }
                            >
                                cloud_done
                            </FontIcon>
                            Files Uploaded: { dropboxFileUploads }
                        </div>
                        <div className="save-button-inputs">
                            <RaisedButton
                                label="CHOOSE FILE"
                                labelPosition="before"
                                icon={ < UploadButton /> }
                                style={ styles.button }
                                backgroundColor="#1C333D"
                                labelColor="#FFFFFF"
                                buttonStyle={ { fontWeight: 100 } }
                                containerElement="label"
                                onTouchTap={ this.handleTouchTap }
                            >
                                <input id="file-upload" type="file" style={ styles.exampleImageInput }/>
                            </RaisedButton>
                            <RaisedButton // href="#fileup"
                                label="SAVE"
                                labelPosition="before"
                                icon={ < SaveButton /> }
                                style={ styles.button }
                                backgroundColor="#AE863C"
                                labelColor="#FFFFFF"
                                buttonStyle={ { fontWeight: 100 } }
                                onClick={ this._uploadFile.bind( this ) }
                            >
                            </RaisedButton>
                        </div>
                    </div>
                </Paper>
            </main>
        )
    }
}

export default connect( state => state, { updateComps } )( LogoUpload );
