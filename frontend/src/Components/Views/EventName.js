import React, { Component } from 'react'

class EventName extends Component {

  constructor(props){
    super(props);
    this.state = {
      updatedName: props.name
    }
    this.handleNameChange = this.handleNameChange.bind(this)
  }

  handleNameChange(event) {
    this.setState({updatedName: event.target.value})
  }

  handleFocusLoss(event) {
    this.props.onSubmitEventName(event)
  }

  render(){
    if(this.props.isEditingName) {
     return (<div className="event-name-edit header-large col-sm-12">
        <form onSubmit={this.props.onSubmitEventName}>
           <div className="event-name-edit__input-row">
              <input name="name" className="event-name-edit__input-row__name" defaultValue={this.props.name} onBlur={(e) => this.handleFocusLoss(e)} onChange={this.handleNameChange.bind(this)} autoFocus />
            </div>
        </form>
      </div>)
    } else {
      return (<div className="event-name header-large" onClick={() => this.props.setEditingEventName(true)}>{this.props.name}</div>)
    }
  }
}

export default EventName