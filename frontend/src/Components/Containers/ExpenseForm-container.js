import React, { Component } from 'react';
import { connect } from 'react-redux';
import ExpenseForm from '../Views/ExpenseForm'
import store from '../../store';
import { addExpense, editExpense, deleteExpense } from '../../actions/event-actions'
import { withRouter } from 'react-router'
import { setTitle, setBackarrow, resetNavbar, setForm } from '../../actions/navbar-actions'


class ExpenseFormContainer extends Component {
    componentWillMount() {
        store.dispatch(setBackarrow(true))
        if (this.props.params.expenseId) {
            store.dispatch(setTitle("Edit expense"))
        } else {
            store.dispatch(setTitle("Add expense"))
        }
        store.dispatch(setForm("expenseForm"))
    }

    componentWillUnmount() {
        store.dispatch(resetNavbar())
    }

    onDeleteExpense(expense) {
        store.dispatch(deleteExpense(expense))
        this.props.history.goBack()
    }

    onSubmitExpense(event) {
        event.preventDefault();
        const form = event.target;
        const amount = parseFloat(form.amount.value, 10);
        const description = form.description.value;
        const personsToShareExpense = this.props.persons.reduce((acc, person) => {
            if (document.getElementById(person.personId).checked) {
                acc.push(person.personId)
            }
            return acc
        }, [])


        if (description === "" || isNaN(amount) || personsToShareExpense.length === 0) {
            return;
        }

        const expense = {
            expenseId: form.expenseId.value,
            personId: form.personId.value,
            description: description,
            amount: amount,
            personShare: personsToShareExpense
        }

        if (expense.expenseId === "") {
            //We should add the person
            if (this.props.isExample) {
                //Since person id:s are issued by the server we need to populate these with uniqe dummy values if we are at the example.
                expense.expenseId = Math.floor(Math.random() * (1000000 - 0)).toString();
            }
            store.dispatch(addExpense(expense))
        } else {
            store.dispatch(editExpense(expense))
        }

        this.props.history.goBack()
    }
    findExpense() {
        return this.props.expenses.find(e => e.expenseId === this.props.params.expenseId)
    }

    render() {
        return (<ExpenseForm
            expense={this.props.params.expenseId ? this.findExpense() : null}
            persons={this.props.persons}
            onCancel={() => this.props.history.goBack()}
            onSubmitExpense={(event) => this.onSubmitExpense(event)}
            onDeleteExpense={(expense) => this.onDeleteExpense(expense)}
        />
        )
    }
}

const mapStateToProps = function (store) {
    return {
        persons: store.eventState.persons,
        expenses: store.eventState.expenses,
        isExample: store.eventState.isExample
    };
};


export default withRouter(connect(mapStateToProps)(ExpenseFormContainer));