import React, { Component } from 'react'
import TextField from 'material-ui/TextField';
import RaisedButton from 'material-ui/RaisedButton';
import Checkbox from 'material-ui/Checkbox';
import Subheader from 'material-ui/Subheader';
import DropDownMenu from 'material-ui/DropDownMenu';
import MenuItem from 'material-ui/MenuItem';

class ExpenseForm extends Component {
    constructor(props) {
        super(props);
        const hasExpense = typeof this.props.expense !== 'undefined' && this.props.expense !== null;
        const defaultValue = hasExpense ? this.props.expense.personId : this.props.persons[0].personId
  
        this.state = { value: defaultValue };
    }

    handleChange = (event, index, value) => this.setState({ value });
    

    render() {
        const subheaderStyles = {
            paddingLeft: 0,
            fontSize: 15,
            fontWeight: 700,
            color: 'rgba(0, 0, 0, 0.3)'
        };

        const hasExpense = typeof this.props.expense !== 'undefined' && this.props.expense !== null;

        const checkboxStyles = {
            marginBottom: 16,
        };

        const textFieldStyle = {
            display: "block",
            width: "100%"
        }

        
        const textFieldStyleTop = {
            display: "block",
            width: "100%",
            marginTop: -20
        }

        const dropDownMenuStyle = {
            marginLeft: -24,
            width: '50%',
            marginTop: -12
        }


        const dropDownMenu = () => {
            return <DropDownMenu style={dropDownMenuStyle} value={this.state.value} onChange={this.handleChange}>
                {this.props.persons.map(p => {
                    return <MenuItem key={p.personId} value={p.personId} primaryText={p.name} />
                })}
            </DropDownMenu>
        }

        const checkBoxList = (hasExpense, expense) => {
            return this.props.persons.map(x => {
                const checked = !hasExpense || (hasExpense && expense.personShare.includes(x.personId))
                return <Checkbox
                    label={x.name}
                    style={checkboxStyles}
                    defaultChecked={checked}
                    id={x.personId}
                    name={x.personId}
                    key={x.personId}
                />
            })
        }

        const buttonContainer = {
            textAlign: 'center'
        };


        return (
            <div className="wrapper">
                <form id="expenseForm" onSubmit={(event) => this.props.onSubmitExpense(event)}>
                    <input className="hidden" name="expenseId" value={hasExpense ? this.props.expense.expenseId : ""} ></input>
                    <input className="hidden" name="personId" value={this.state.value} ></input>
                    <Subheader style={subheaderStyles}>Paid by</Subheader>
                    {dropDownMenu()}
                    <TextField
                        name="description"
                        defaultValue={hasExpense ? this.props.expense.description : ""}
                        style={textFieldStyleTop}
                        floatingLabelText="Description"
                        floatingLabelFixed={false}
                        autoComplete="off"
                        autoCorrect="off"
                        autoCapitalize="true"
                        spellCheck="false"
                    />
                    <TextField
                        name="amount"
                        defaultValue={hasExpense ? this.props.expense.amount : ""}
                        style={textFieldStyle}
                        floatingLabelText="Amount"
                        floatingLabelFixed={false}
                        autoComplete="off"
                        autoCorrect="off"
                        autoCapitalize="true"
                        spellCheck="false"
                        type="tel"
                    />
                    <Subheader style={subheaderStyles}>Split</Subheader>
                    {checkBoxList(hasExpense, this.props.expense)}
                </form>
                <div style={buttonContainer}>
                    {hasExpense && <RaisedButton
                        label="Delete"
                        secondary={true}
                        onTouchTap={() => this.props.onDeleteExpense(this.props.expense)}
                    />}
                </div>
            </div>
        )
    }
}

export default ExpenseForm