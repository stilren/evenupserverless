import React, { Component } from 'react';
import Api from '../../Helpers/Api'
import EventView from '../Views/EventView'
import { connect } from 'react-redux';
import store from '../../store';
import { setExampleEvent, focusEditEventName, updateEventName } from '../../actions/event-actions'
import { withRouter } from 'react-router'


class EventContainer extends Component {
  constructor(props) {
    super();
    const isExample = props.route.example
    if (!isExample && props.eventState.eventId !== props.params.id) {
      Api.getEventById(props.params.id);
    }
    if (isExample && !props.eventState.isExample) {
      //We need to set state to example
      store.dispatch(setExampleEvent());
    }
  }

  setEditingEventName(val) {
    store.dispatch(focusEditEventName(val));
  }

  onSubmitEventName(event) {
    event.preventDefault();
    const target = event.target;
    let name = target.value;
    if (name === undefined) {
      name = target.name.value;
    }

    if (name === "" || name === this.props.eventState.name) {
      this.setEditingEventName(false);
      return;
    }

    store.dispatch(updateEventName(name));
  }

  onAddEditPersonClick(personId) {
    this.props.router.push('event/' + (!this.props.eventState.isExample ? this.props.eventState.eventId : "1") + '/person/' + (typeof personId !== 'undefined' ? personId : ""))
  }


  render() {
    return <EventView
      persons={this.props.eventState.persons}
      isEditingName={this.props.eventState.isEditingEventName}
      name={this.props.eventState.name}
      perPerson={this.props.eventState.perPerson}
      transactions={this.props.eventState.transactions}
      setEditingEventName={(val) => this.setEditingEventName(val)}
      onSubmitEventName={(event) => this.onSubmitEventName(event)}
      onAddEditPersonClick={(val) => this.onAddEditPersonClick(val)}
    />
  }
}

const mapStateToProps = function (store) {
  return {
    eventState: store.eventState
  };
};

export default withRouter(connect(mapStateToProps)(EventContainer));