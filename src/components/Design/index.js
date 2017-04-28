import React, {Component} from "react";
import {connect} from "react-redux";
import TextField from 'material-ui/TextField';
import "./design.css"
import FontIcon from 'material-ui/FontIcon';
import {cyan500} from 'material-ui/styles/colors';
import SaveButton from 'material-ui/svg-icons/file/cloud-upload';
import RaisedButton from 'material-ui/RaisedButton';
import Paper from 'material-ui/Paper';
import {updateComps} from '../../ducks/compDuck'
import axiosLibrary from 'axios'
const axios = axiosLibrary.create({withCredentials: true})
const BASE_URL = "http://localhost:3001/api";

class Design extends Component {
  constructor() {
    super();
    this.state = {
      designwho: "",
      designaction: "",
      designurl: ""
    }
  }

  handleChange(field, e) {
    this.setState({[field]: e.target.value})
  }
  componentDidMount() {
    console.log
      axios.get(BASE_URL + '/inputs')
      .then((response) => {
        const inputsFromServer = response.data[0]
          this.setState({
              designwho: inputsFromServer.designwho,
              designaction: inputsFromServer.designaction,
              designurl: inputsFromServer.designurl
          })
      })
      .catch(err => {
          console.log(err)
      });
  }
  saveInputs(e) {
    var componentCompleted = {
      component: "Design",
      completed: false
    }
    const inputsToServer = this.state
    var completeCheck = true;
    for (var stateCheck in inputsToServer) {
      if (!inputsToServer[stateCheck]) {
        completeCheck = false;
      }
    }
    if (completeCheck) {
      componentCompleted.completed = true;
    }

    axios.put(BASE_URL + '/inputs', inputsToServer)
    .then((response) => {
      this.props.updateComps(componentCompleted);
      }).catch(err => {
        console.log(err)
      });

    e.preventDefault()
  }

  render() {
    var {
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
          <div >
            <div className="input-header-title">Design</div>
            <div className="input-description">These questions are designed to help us with our design and build process.</div>

            <div>
              <p className="placeholderinputs">
                <FontIcon className="material-icons" style={iconStyles} color={cyan500}>arrow_forward</FontIcon>Who is visiting your site? Be specific as to what type of person or customer is visiting your site.</p>
              <TextField id="design" value={designwho} onChange={this.handleChange.bind(this, 'designwho')} className="hovertexttest" underlineShow={false} style={inStyle} multiLine={true} rows={3}/><br/>
            </div>
            <div>
              <p className="placeholderinputs">
                <FontIcon className="material-icons" style={iconStyles} color={cyan500}>arrow_forward</FontIcon>What do you want them to do when they come to your site? What ACTION?
              </p>
              <TextField value={designaction} onChange={this.handleChange.bind(this, 'designaction')} className="hovertexttest" id="design2" underlineShow={false} style={inStyle} multiLine={true} rows={3}/><br/>
            </div>
            <div>
              <p className="placeholderinputs">
                <FontIcon className="material-icons" style={iconStyles} color={cyan500}>arrow_forward</FontIcon>List of any Example Websites you like? Enter URL below.</p>
              <TextField value={designurl} onChange={this.handleChange.bind(this, 'designurl')} className="hovertexttest" id="design3" underlineShow={false} style={inStyle} multiLine={true} rows={3}/><br/>
            </div>

            <div className="save-button-inputs">

              <RaisedButton
                href="#fileup"
                label="SAVE"
                labelPosition="before"
                icon={< SaveButton />}
                style={styles.button}
                backgroundColor="#AE863C"
                labelColor="#FFFFFF"
                buttonStyle={{fontWeight: 100}}
                onClick={this.saveInputs.bind(this)}
                >
                </RaisedButton>

            </div>

          </div>
        </Paper>
      </main>
    )

  }
}

export default connect(state => state, {updateComps})(Design);
