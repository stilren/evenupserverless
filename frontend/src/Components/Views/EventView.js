import React, { Component } from 'react'
import EventName from './EventName'
import { List, ListItem } from 'material-ui/List';
import Subheader from 'material-ui/Subheader';
import PersonListContainer from '../Containers/PersonList-container'
import SpeedDialContainer from '../Containers/SpeedDial-container'

class EventView extends Component {
    render() {
        const transactions = this.props.transactions && this.props.transactions.map((transaction, i) => {
            return <ListItem key={i} primaryText={<div className="transaction-card" key={i}>
                <div>{transaction.from}   </div>
                <div className="fa fa-lg fa-long-arrow-right"></div>
                <div>{transaction.to}</div>
                <div>{Math.round(transaction.amount)} <span className="fa fa-lg fa-money"></span></div>
            </div>}>
            </ListItem>;
        })

        return (
            <div>
                {this.props.persons &&
                    <div style={{marginBottom: 70}}>
                        <div>
                            <EventName
                                name={this.props.name}
                                isEditingName={this.props.isEditingName}
                                setEditingEventName={(val) => this.props.setEditingEventName(val)}
                                onSubmitEventName={(event) => this.props.onSubmitEventName(event)}
                            />
                            <div className="col-sm-6">
                                <div className="input-sheet ">
                                    <PersonListContainer />
                                </div>
                                
                            </div>
                        </div>
                        <div>
                                <div className="settle col-sm-6">
                            
                            <List>
                                    <Subheader>Settlement</Subheader>
                                    {transactions}
                            </List>
                                </div>
                            
                        </div>
                        </div>}
                        <SpeedDialContainer />
            </div>
        )
    }
}

export default EventView