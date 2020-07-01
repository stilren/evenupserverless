import React, { Component } from 'react'
import SpeedDial from '../Views/Speeddial'
import { withRouter } from 'react-router'
import { connect } from 'react-redux';

class SpeedDialContainer extends Component {
    constructor(props) {
        super(props)
        this.state = {
            open: false,
        }
        this.handleToggle = this.handleToggle.bind(this)
    }

    handleToggle() {
        this.setState({
            open: !this.state.open,
        })
    }

    addExpense() {
        this.props.router.push('event/' + (!this.props.isExample ? this.props.eventId : "1") + '/expense/')
    }

    onAddPersonClick() {
        this.props.router.push('event/' + (!this.props.isExample ? this.props.eventId : "1") + '/person/')
    }

    render() {
        return<SpeedDial
            persons={this.props.persons}
            disableExpense={typeof this.props.persons === 'undefined' ||     this.props.persons.length === 0}
            onAddPerson={() => this.onAddPersonClick()}
            onAddExpense={() => this.addExpense() }
            handleToggle={() => this.handleToggle()}
            open={this.state.open}
        />
    }
}


const mapStateToProps = function (store, ownProps) {
    return {
        persons: store.eventState.persons,
        isExample: store.eventState.isExample,
        eventId: store.eventState.eventId
    };
};

export default withRouter(connect(mapStateToProps)(SpeedDialContainer))
