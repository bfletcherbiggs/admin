//PACKAGES
import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
//COMPONENTS
import SocialInputs from '../SocialInputs/index';
import LogoUpload from '../LogoUpload/index';
import BizInfo from '../BizInfo/index';
import BillInfo from '../BillInfo/index';
import WebPages from '../WebPages/index';
import Design from '../Design/index';
//CSS AND DESIGN
import './compStatus.css';
import IconButton from 'material-ui/IconButton';
import Dashboard from 'material-ui/svg-icons/action/dashboard';
import Print from 'material-ui/svg-icons/action/print';
import IconComplete from 'material-ui/svg-icons/navigation/check';
import IconNotComplete from 'material-ui/svg-icons/content/clear';
import {grey50} from 'material-ui/styles/colors';
import LinearProgress from 'material-ui/LinearProgress';
import NotificationsIcon from 'material-ui/svg-icons/communication/message';

class CompStatus extends Component{
    constructor() {
        super()

        this.state = {
            componentTypes: [
                { component: < SocialInputs />, name: 'SocialInputs' },
                { component: < LogoUpload />, name: 'LogoUpload' },
                { component: < BizInfo />, name: 'BizInfo' },
                { component: < BillInfo />, name: 'BillInfo' },
                { component: < WebPages />, name: 'WebPages' },
                { component: < Design />, name: 'Design' }
            ]
        }
    }

    printInputs() {
        let mywindow = window.open( '', 'new div', 'height=700,width=800' );
        mywindow.document.write( '<html><head><title></title>' );
        mywindow.document.write( '<link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/materialize/0.98.0/css/materialize.min.css" type="text/css" media="print">' );
        mywindow.document.write( '<link rel="stylesheet" href="https://fonts.googleapis.com/icon?family=Material+Icons type="text/css" media="print">' );
        mywindow.document.write( '<link rel="stylesheet" href="./style.css" type="text/css" media="print">' );
        mywindow.document.write( '</head><body>' );
        let billingPocPrint = document.getElementById( 'billingPOC' ).value
        mywindow.document.write( 'Billing Point of Contact: <br/>' );
        mywindow.document.write( billingPocPrint+'<br/>' );
        let billingPhonenumberPrint = document.getElementById( 'billingphonenumber' ).value
        mywindow.document.write( 'Billing Phone Number: <br/>' );
        mywindow.document.write( billingPhonenumberPrint+'<br/>' );
        let billingEmailPrint = document.getElementById( 'billingemail' ).value
        mywindow.document.write( 'Billing Email: <br/>' );
        mywindow.document.write( billingEmailPrint+'<br/>' );
        let billingAddPrint = document.getElementById( 'billingadd' ).value
        let billingCityPrint = document.getElementById( 'billingcity' ).value
        let billingStatePrint = document.getElementById( 'billingstate' ).value
        let billingZipPrint = document.getElementById( 'billingzip' ).value
        mywindow.document.write( 'Billing Address: <br/>' );
        mywindow.document.write( billingAddPrint+'<br/>'+billingCityPrint+', '+billingStatePrint+' '+billingZipPrint+'<br/>' );
        mywindow.document.write( '<script src="https://code.jquery.com/jquery-2.1.1.min.js"></script>' );
        mywindow.document.write( '<script src="https://ajax.googleapis.com/ajax/libs/angularjs/1.6.2/angular.min.js"></script>' );
        mywindow.document.write( '<script src="https://cdnjs.cloudflare.com/ajax/libs/angular-ui-router/0.4.2/angular-ui-router.js"></script>' );
        mywindow.document.write( '<script src="https://cdnjs.cloudflare.com/ajax/libs/materialize/0.98.1/js/materialize.min.js"></script>' );
        mywindow.document.write( '<script src="https://cdnjs.cloudflare.com/ajax/libs/d3/3.5.17/d3.js"></script>' );
        mywindow.document.write( '<script src="https://cdnjs.cloudflare.com/ajax/libs/datejs/1.0/date.min.js"></script>' );
        mywindow.document.write( '</body></html>' );
        mywindow.document.close();
        mywindow.focus();
            // setTimeout(function() {
            //     mywindow.print();
            //     setTimeout(function() {
            //     mywindow.close();
            //     }, 1500);
            // }, 1500);
    }

    render(){
        const iconStyle = {
            IconButton: {
                height: 30,
                width: 30
            },
        }

        const { varComponentTypes } = this.props;
        const { componentTypes } = this.state;

        let compCount = 0;
        let compCount1 = 0;
        const componentMap = componentTypes.map( (type, index) => {
            let check = false
            let check2 = false;
            for ( let comp in varComponentTypes.data ) {
                if ( varComponentTypes.data[ comp ].compName === type.name ) {
                    check = true;
                    compCount1 += 1;
                    type.statusName = varComponentTypes.data[ comp ].statusName
                    type.key = varComponentTypes.data[ comp ].id
                    if ( varComponentTypes.data[ comp ].completed === true ) {
                        compCount += 1;
                        check2 = true;
                    }
                }
            }
            if ( check && check2 ) {
                return (
                    <a href={ "#"+type.name } key={ type.key } >
                        <div className='status-point sPComplete'>
                            <IconButton tooltip={ type.statusName } tooltipPosition="top-center">
                                <IconComplete color={ grey50 }/>
                            </IconButton>
                        </div>
                    </a>
                )
            }
            else if ( check ) {
                return (
                    <a href={ "#"+type.name } key={ type.key } >
                        <div className='status-point sPComplete'>
                            <IconButton tooltip={ type.statusName } tooltipPosition="top-center">
                                <IconNotComplete color={ grey50 }/>
                            </IconButton>
                        </div>
                    </a>
                )
            }
        })

        let percentCompleted = Math.floor( ( compCount / compCount1 ) * 100 );

        return (
            <div className="compstatus-main">
                <div className="compStatus-selectedUser">Selected User</div>
                <div className="compStatus-selectedCompany">Company</div>
                <div className="compstatus-links-box" >
                    <div className="compstatus-links">
                        <Link to="/admin/components">
                            <IconButton tooltip="Components" >
                                <Dashboard color={ grey50 }/>
                            </IconButton>
                        </Link>
                        <Link to="/admin">
                            <IconButton tooltip="Messages" >
                                <NotificationsIcon color={ grey50 }/>
                            </IconButton>
                        </Link>
                    </div>
                </div>
                <div className="compstatus-percent">
                    <div className='percentCompleted'>
                        { percentCompleted }% Complete
                    </div>
                    <br/>
                    <div className="linearProgress">
                        <LinearProgress mode="determinate" value={percentCompleted}/>
                    </div>
                </div>
                <div className="compStatus-status">
                    {componentMap}
                </div>
                <div className="printButton">
                    <IconButton tooltip="message" onClick={this.printInputs.bind(this)}>
                        <Print color={ grey50 }/>
                    </IconButton>
                </div>
            </div>
        )
    }
}

const mapStateToProps = state => {
    return { varComponentTypes: state.compDuck.varComponentTypes };
}

export default connect( mapStateToProps, {} )( CompStatus );
