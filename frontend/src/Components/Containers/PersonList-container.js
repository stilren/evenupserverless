import React, { Component } from 'react';
import InputSheet from '../Views/InputSheet'
import { connect } from 'react-redux';
import { deletePerson } from '../../actions/event-actions'
import store from '../../store';
import { withRouter } from 'react-router'


class PersonListContainer extends Component {
    onDelete(idx) {
        let persons = this.props.persons.slice();
        store.dispatch(deletePerson(persons[idx]))
    }

    setEdit(idx) {
        const personId = this.props.persons[idx].personId;
        this.props.router.push('event/' + (!this.props.isExample ? this.props.eventId : "1") + '/person/' + personId)
    }

    addExpense(idx) {
        const personId = this.props.persons[idx].personId;
        this.props.router.push('event/' + (!this.props.isExample ? this.props.eventId : "1") + '/person/' + personId + '/expense/')
    }

    setEditExpense(event, expenseId){
        event.preventDefault()
        this.props.router.push('event/' + (!this.props.isExample ? this.props.eventId : "1") + "/expense/" + expenseId)
    }

    render() {
        return (<InputSheet
            persons={this.props.persons}
            expenses={this.props.expenses}
            total={this.props.total}
            onDelete={(idx) => this.onDelete(idx)}
            setEdit={(idx) => this.setEdit(idx)}
            setEditExpense={(event, expenseId) => this.setEditExpense(event, expenseId)}
        />)
    }
}

const mapStateToProps = function (store) {
    return {
        persons: store.eventState.persons,
        total: store.eventState.total,
        eventId: store.eventState.eventId,
        isExample: store.eventState.isExample,
        expenses: store.eventState.expenses
    };
};


export default withRouter(connect(mapStateToProps)(PersonListContainer));