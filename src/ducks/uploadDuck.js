import axiosLibrary from 'axios'
const axios = axiosLibrary.create({withCredentials: true})
  import Dropbox from 'dropbox'

  const UPLOAD_REQUEST = "UPLOAD_REQUEST",
    UPLOAD_SUCCESS = "UPLOAD_SUCCESS",
    UPLOAD_FAILURE = "UPLOAD_FAILURE",
    DROPBOX_SUCCESS = "DROPBOX_SUCCESS",
    BASE_URL = "http://localhost:3001/api";

  const initialState = {
    uploadReturnValues: {},
    loadingUploads: false,
    uploadsLoaded: false,
    errorLoadingUploads: false,
    dropboxFiles: [],
    fileUploadToast: false,
    fileName: ""
  };

  export default function uploadDuck(state = initialState, action) {
    switch (action.type) {
      case UPLOAD_REQUEST:
        return Object.assign({}, state, {
          loadingUploads: true,
          uploadsLoaded: false,
          errorLoadingUploads: false
        })
      case UPLOAD_SUCCESS:
        return Object.assign({}, state, {
          uploadReturnValues: action.payload,
          loadingUploads: false,
          errorLoadingUploads: false,
          uploadsLoaded: true,
          fileName: action.payload.fileName,
          fileUploadToast: true
        })
      case DROPBOX_SUCCESS:
        return Object.assign({}, state, {
          dropboxFiles: action.payload,
          loadingUploads: false,
          errorLoadingUploads: false,
          uploadsLoaded: true
        })
      case UPLOAD_FAILURE:
        return Object.assign({}, state, {
          errorLoadingUploads: true,
          loadingUploads: false,
          compError: action.error
        })
      default:
        return state;
    }
  }

  function UploadSuccess(response) {
    return {type: UPLOAD_SUCCESS, payload: response}
  }
  function UploadRequest() {
    return {type: UPLOAD_REQUEST}
  }

  function UploadFailure(err) {
    return {type: UPLOAD_FAILURE, error: err}
  }
  function getDropboxSuccess(response) {
    return {type: DROPBOX_SUCCESS, payload: response}
  }

  export function uploadFile() {
    return (dispatch) => {
      dispatch(UploadRequest())
      axios.get(BASE_URL + '/upload').then((response) => {
        var ACCESS_TOKEN = response.data.dropboxkey;
        var dbx = new Dropbox({accessToken: ACCESS_TOKEN});
        var fileInput = document.getElementById('file-upload');
        var file = fileInput.files[0];
        dbx.filesUpload({
          path: '/' + response.data.company + '/' + file.name,
          contents: file
        }).then(function(response) {
          alert(file.name + ' uploaded successfully!')
          dispatch(UploadSuccess(response))
          dispatch(getFiles());
        }).catch(function(error) {
        });
      }).catch(err => {
        if(err) {
        console.log(err)
        dispatch(UploadFailure(err.response.data))
      }
      });
    }
  }
  export function getFiles() {
    return (dispatch) => {
      dispatch(UploadRequest())
      axios.get(BASE_URL + '/upload').then((response) => {
        var ACCESS_TOKEN = response.data.dropboxkey;
        var dbx = new Dropbox({accessToken: ACCESS_TOKEN});
        dbx.filesListFolder({
          path: '/' + response.data.company
        }).then(function(response) {
          if(response.entries) {
          dispatch(getDropboxSuccess(response.entries))
        } else {
          dispatch(getDropboxSuccess([]))
        }
        }).catch(function(error) {
        });
      }).catch(err => {
        if(err) {
        console.log(err)
        dispatch(UploadFailure(err.response.data))
      }
      });
    }
  }
