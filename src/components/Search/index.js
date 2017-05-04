import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Field, reduxForm } from 'redux-form';
import _ from 'lodash';
//EXPORTED FUNCTIONS
import { filterUsers } from '../../ducks/messageDuck'
//MATERIAL UI
import TextField from 'material-ui/TextField'
//CSS
import './search.css';

const renderTextField = ( { input, label, meta: { touched, error }, ...custom } ) => (
    <TextField
        hintText={ label }
        errorText={ touched && error }
        { ...input }
        { ...custom }
    />
)

class Search extends Component{
    constructor() {
        super()

        this.state = {
            searchstring: null
        }

        this.handleSubmit = this.handleSubmit.bind( this );
        this.handleChange = this.handleChange.bind( this );
    }

    handleSubmit( event ) {
        event.preventDefault();
    }

    handleChange( field, e ) {
        this.setState( { [ field ]: e.target.value } , () => {
            let filterArr=[]
            _.forEach( this.props.room_titles, room => {
                let inUser = 0;
                _.forEach( room[ 0 ], key => {
                    //TODO fix search
                    // if(typeof key == String){
                    //     if( _.includes( key.toLowerCase(),this.state.searchstring.toLowerCase() ) ){
                    //         inUser ++;
                    //     }
                    // }
                    if ( _.includes( key,this.state.searchstring ) ){
                        inUser ++;
                    }
                })
                if( inUser > 0 ){
                    filterArr.push( room )
                }
            })
            this.props.filterUsers( filterArr )
        })
    }

    render() {

        const inputdivStyle = {
            display: 'flex',
            flexFlow: 'column nowrap',
            padding: '0 5px',
            width: 'auto'
        }

        return (
          <div className="searchBar">
              <form onSubmit={ this.handleSubmit }>
                  <Field
                      label="Search Users"
                      name="searchstring"
                      fullWidth={ true }
                      underlineShow={ false }
                      style={ inputdivStyle }
                      component={ renderTextField }
                      onChange={ this.handleChange.bind( this, 'searchstring' ) }
                  />
              </form>
          </div>
        )
    }
}

const mapStateToProps = state => {
    return {
        room_titles:state.messageDuck.room_titles,
    }
}

const form = reduxForm( {
    form: 'searchForm'
} )

export default connect( mapStateToProps, { filterUsers } )( form( Search ) )
