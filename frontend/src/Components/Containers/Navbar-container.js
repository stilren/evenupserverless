import React, { Component } from 'react';
import Navbar from '../Views/Navbar'
import { connect } from 'react-redux';
import { withRouter } from 'react-router'

class NavbarContainer extends Component {
  render() {
      return(!this.props.hideAppBar && <Navbar
        eventId={this.props.eventId}
        eventName={this.props.eventName}
        backArrow={this.props.backArrow}
        title={this.props.title}
        goBack={() => this.props.router.goBack()}
        goHome={() => this.props.router.push('/')}
        formName={this.props.formName}
      />)
  }
}

const mapStateToProps = function (store) {
  return {
    eventId: store.eventState.eventId,
    eventName: store.eventState.name,
    title: store.navbarState.title,
    backArrow: store.navbarState.backArrow,
    formName: store.navbarState.formName
  };
};


export default withRouter(connect(mapStateToProps)(NavbarContainer));