//PACKAGES
import React, { Component } from 'react';
import { connect } from 'react-redux';
//COMPONENTS
import SocialInputs from '../SocialInputs/index';
import LogoUpload from '../LogoUpload/index';
import BizInfo from '../BizInfo/index';
import BillInfo from '../BillInfo/index';
import WebPages from '../WebPages/index';
import Design from '../Design/index';
import {Row, Col} from 'react-flexbox-grid';
//CSS AND DESIGN
import './compSelect.css';
import { grey50 } from 'material-ui/styles/colors';
import RaisedButton from 'material-ui/RaisedButton';
import NoteAdd from 'material-ui/svg-icons/action/note-add';
import DeleteForever from 'material-ui/svg-icons/action/delete-forever';
//API CALLS
import { addComps, removeComps } from '../../ducks/compDuck'

class CompSelect extends Component{
    constructor() {
        super();
        this.state = {
            componentTypes: [
                { component: < SocialInputs />, name: 'SocialInputs', tooltip: 'SocialInputs' },
                { component: < LogoUpload />, name: 'LogoUpload', tooltip: 'LogoUpload' },
                { component: < BizInfo />, name: 'BizInfo', tooltip: 'BizInfo' },
                { component: < BillInfo />, name: 'BillInfo', tooltip: 'BillInfo' },
                { component: < WebPages />, name: 'WebPages', tooltip: 'WebPages' },
                { component: < Design />, name: 'Design', tooltip: 'Design' }
            ]
        }
    }

    addComponent( componentIndex, e ) {
        const componentToAdd = {
            created_at: 'now()',
            updated_at: 'now()',
            user_id: this.props.userid,
            compName: this.state.componentTypes[ componentIndex ].name,
            statusName: this.state.componentTypes[ componentIndex ].tooltip,
            completed: false,
            project_id: this.props.userid
        }
        this.props.addComps( componentToAdd )
        e.preventDefault()
    }

    removeComponent( componentIndex, e ) {
        const componentToDelete = {
            compName: this.state.componentTypes[ componentIndex ].name,
            user_id: this.props.userid
        }
        this.props.removeComps( componentToDelete )
        e.preventDefault()
    }

    render(){
        const style = {
            button: {
                margin: 2,
                fontWeight: 300
            }
        }

        const { varComponentTypes } = this.props;
        const { componentTypes } = this.state;

        const componentMap = componentTypes.map( (type, index) => {
            type.key = index
            var compIncluded = false;
            for ( var comp in varComponentTypes.data ) {
                if ( varComponentTypes.data[ comp ].compName === type.name ) {
                    compIncluded = true;
                }
            }
            if ( compIncluded ) {
                return (
                    <Col xs={ 4 } key={ type.key }>
                        <div className='compSelect-status-point sPComplete'>
                            <div className="compSelect-floating">
                                <RaisedButton
                                    fullWidth={ true }
                                    label={ type.name }
                                    onClick={ this.removeComponent
                                        .bind( this, [ type.key ] ) }
                                    labelPosition="after"
                                    style={ style.button }
                                    icon={ <DeleteForever color={ "#003044" }/> }
                                ></RaisedButton>
                            </div>
                        </div>
                    </Col>
                )
            }
            else {
                return (
                    <Col xs={ 4 } key={type.key}>
                        <div className='compSelect-status-point sPIncomplete'>
                            <div className="compSelect-floating">
                                <RaisedButton
                                    fullWidth={ true }
                                    onClick={ this.addComponent
                                        .bind( this, [ type.key ] ) }
                                    label={ type.name }
                                    labelPosition="after"
                                    primary={ true }
                                    style={ style.button }
                                    icon={ <NoteAdd color={ grey50 }/> }
                                ></RaisedButton>
                            </div>
                        </div>
                    </Col>
                )
            }
        })

        return (
            <div className="compSelect-main">
                <Row>
                    { componentMap }
                </Row>
            </div>
        )
    }
}

const mapStateToProps = state => {
    return { varComponentTypes: state.compDuck.varComponentTypes,
    userid: state.messageDuck.userid };
}

export default connect( mapStateToProps, { addComps, removeComps })( CompSelect );
