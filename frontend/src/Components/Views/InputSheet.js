import React, { Component } from 'react';
import InputRow from './InputRow'
import {List} from 'material-ui/List';
import Subheader from 'material-ui/Subheader';


class InputSheet extends Component {
  render(){
    const persons= this.props.persons.map((person, i) => {
          return <InputRow
                expenses={this.props.expenses.filter(e => e.personId === person.personId)} 
                key={person.personId}
                person={person}
                setEdit={(idx) => this.props.setEdit(idx)}
                onDelete={(idx) => this.props.onDelete(idx)}
                addExpense={(idx) => this.props.addExpense(idx)}
                index={i}
                setEditExpense={(event, expenseId) => this.props.setEditExpense(event, expenseId)}
                totalPersons={this.props.persons.length}
              />
    });
    const totText = this.props.total > 0 ? " - total: "+this.props.total : "";
    return(
      <div className="input-sheet">
        <List>
          <Subheader>Expenses{totText}</Subheader>
          {persons}
        </List>
      </div>
    )
  }
}

export default InputSheet