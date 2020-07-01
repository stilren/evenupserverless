import React, { Component } from 'react';   
import { connect } from 'react-redux';  
import PersonForm from '../Views/PersonForm'
import store from '../../store';
import { updatePerson, addPerson } from '../../actions/event-actions'
import {setTitle, setBackarrow, resetNavbar, setForm} from '../../actions/navbar-actions'


class PersonFormContainer extends Component {
    componentWillMount(){
        store.dispatch(setBackarrow(true))
        if(this.props.params.personId){
            store.dispatch(setTitle("Edit person"))
        } else {
            store.dispatch(setTitle("Add person"))
        }
        store.dispatch(setForm("personForm"))
    }

    componentWillUnmount(){
        store.dispatch(resetNavbar())
    }

    onSubmitPerson(event) {
        event.preventDefault();
        const form = event.target;
        const count = parseInt(parseFloat(form.count.value, 10) * 10, 10);
        const name = form.name.value;

        if (name === "" || isNaN(count)) {
            return;
        }
        const person = {
            personId: form.personId.value,
            name: name,
            count: count,
            expenses: []
        }

        if (person.personId === "") {
            //We should add the person
            if (this.props.isExample) {
                //Since person id:s are issued by the server we need to populate these with uniqe dummy values if we are at the example.
                person.personId = Math.floor(Math.random() * (1000000 - 0)).toString();
            }
            store.dispatch(addPerson(person))
        } else {        
            store.dispatch(updatePerson(person))
        }
        this.props.history.goBack()
    }

    render() {
        return (<PersonForm
            person={this.props.persons.find(x => x.personId === this.props.params.personId)}
            onCancel={() => this.props.history.goBack()}
            onSubmitPerson={(event) => this.onSubmitPerson(event)} />)
    }
}

const mapStateToProps = function (store) {
    return {
        persons: store.eventState.persons,
        isExample: store.eventState.isExample
    };
};


export default connect(mapStateToProps)(PersonFormContainer);