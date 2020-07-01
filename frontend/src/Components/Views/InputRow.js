import React, { Component } from 'react'
import { ListItem } from 'material-ui/List';
import IconButton from 'material-ui/IconButton';
import IconMenu from 'material-ui/IconMenu';
import MoreVertIcon from 'material-ui/svg-icons/navigation/more-vert';
import { grey400 } from 'material-ui/styles/colors';
import MenuItem from 'material-ui/MenuItem';
import ArrowForward from 'material-ui/svg-icons/navigation/chevron-right';
import Person from 'material-ui/svg-icons/social/person';



class InputRow extends Component {
  constructor(props) {
  super(props);
  this.state = {
    isOpen: false
  };
}
  
  nestToggle = (item) => {
    if(this.props.expenses.length === 0)
      return
    this.setState({
      isOpen: !this.state.isOpen,
    });
  }

  render() {
    const balance = Math.round(this.props.person.balance);
    const balanceClassname = "input-card__field input-card__property input-card__balance" + (balance < 0 ? " input-card__balance--negative" : "");
    const iconButtonElement = (
      <IconButton
        touch={true}
        tooltipPosition="bottom-left">
        <MoreVertIcon color={grey400} />
      </IconButton>
    );

    const expenseButtonElement = (
        <ArrowForward color={grey400} />
      );

    const rightIconMenu = (
      <IconMenu iconButtonElement={iconButtonElement}>
        <MenuItem onClick={() => this.props.setEdit(this.props.index)}>Edit</MenuItem>
        <MenuItem onClick={() => this.props.onDelete(this.props.index)}>Delete</MenuItem>
      </IconMenu>
    );

    const personShare = (includedCount, totalCount) => (
      <div >
        <div className="inline-icon"><Person color={grey400} /></div> {includedCount}/{totalCount}
      </div>
    ) 

    const expandedClass = this.state.isOpen ? "expanded" : ""

    const expenseList = () => {
      let list = this.props.expenses.map(e => {
        return <ListItem
          key={e.expenseId}
          onTouchTap={(event) => this.props.setEditExpense(event, e.expenseId)}
          primaryText={
            <div className="input-card__row">
            <div className="input-card__description">
                {e.description}
              </div>
              <div className="input-card__amount">
                {e.amount} <span className="fa fa-lg fa-money"></span>
              </div>
              <div className="input-card__count">
                  {personShare(e.personShare.length, this.props.totalPersons)}
              </div>
            </div>}
            rightIcon={expenseButtonElement}
        >
        
        </ListItem>
      })
      return list
    }


    return (
      <div className={expandedClass}>
      <ListItem
        initiallyOpen={false}
        primaryTogglesNestedList={true}
        rightIconButton={rightIconMenu}
        nestedItems={expenseList()}
        onNestedListToggle={(item) => this.nestToggle(item)}
        primaryText={
          <div className="input-card">
            <div className="input-card__row">
              <div className="input-card__name">
                {this.props.person.name}  {this.props.person.count !== 1 ? "+ " + (this.props.person.count - 1) : ""}
              </div>
              <div className="input-card__property input-card__expense ">
                {this.props.person.totalAmount} <span className="fa fa-lg fa-money"></span>
              </div>
              <div className={balanceClassname}>
                {(balance > 0 ? "+" : "") + balance}
              </div>
              
            </div>
            
          </div>}>
      </ListItem>
      </div>
    )
  }
}

export default InputRow