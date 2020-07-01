import React, { Component } from 'react'
import { withRouter } from 'react-router'
import Api from '../../Helpers/Api'
import RaisedButton from 'material-ui/RaisedButton';
import PlayIcon from 'material-ui/svg-icons/av/playlist-play';
import FlatButton from 'material-ui/FlatButton';
import { LOCAL_STORAGE_KEY, DEFAULT_EVENT_NAME } from '../../Helpers/Constants'
import Chip from 'material-ui/Chip';
import Avatar from 'material-ui/Avatar';
import Person from 'material-ui/svg-icons/social/person';
import Divider from 'material-ui/Divider';

class Home extends Component {

  onStartClick(cb) {
    Api.createNewEvent((res) => {
      cb('event/' + res.eventId);
    })
  }

  onExampleClick(cb) {
    cb('/example');
  }



  getEvents() {
    const savedEvents = JSON.parse(localStorage.getItem(LOCAL_STORAGE_KEY));
    const iconStyles = {
      height: 19,
      width: 15,
    };

    const chipStyles = {
      margin: 5

    }
    if (typeof savedEvents === "undefined" || savedEvents === null)
      return
    const myevents = savedEvents.map(event => {
      return <div key={event.eventId} style={{ display: 'inline-block' }}><Chip
        style={chipStyles}
        onTouchTap={() => this.props.router.push('event/' + event.eventId)}
      >
        <Avatar size={32}>
          <Person style={iconStyles} />{event.persons}
        </Avatar>
        {event.name === DEFAULT_EVENT_NAME ? "Un-named event" : event.name}
      </Chip></div>
    })

    return <div>
      <Divider />
      <h4 style={{ marginTop: 25 }}>Previous events</h4>
      {myevents}
    </div>
  }

  render() {


    return <div>
      <div className="hero grey">
        <div className="hero__content">
          <div className="logo">
            <img className="logo__image" alt="<handshaking></handshaking>" src="/justice-icon-blue.png" />
            <div className="logo__text header-medium-light">evenup</div>
          </div>
          <div className="logo__heading tagline header-large-light">Track and settle expenses for an event</div>
          <div className="tagline ">
            <h3 className="catch">Evenup is the easiest way to manage debt for an event. It is totally free, easy to share and no registration required</h3>
          </div>
          <div className="hero__button">
            <RaisedButton
              onTouchTap={() => this.onStartClick(this.props.router.push)}
              label="Create event - it´s free"
              primary={true}
              icon={<PlayIcon />}
            />
          </div>
          <div className="hero__button">
            <FlatButton
              onTouchTap={() => this.onExampleClick(this.props.router.push)}
              primary={true}
              label="Show usage example" />
          </div>
          <div>
          </div>

          {this.getEvents()}
        </div>
      </div>
      <div className="hero">
        <div className="hero__content">
          <div className="tagline">
            <h2>It´s simple</h2>
          </div>
          <div className="mobile-container">
            <img alt="none" className="mobile hide-mobile" src="/mobile.png" />
            <div className="mobile-tagline">
              <div>
                <div className="mobile-tagline__heading header-normal">1. Create event</div>
                <div className="mobile-tagline__text body-normal-light">Create a new event and send the link to participants</div>
              </div>
              <div>
                <div className="mobile-tagline__heading header-normal">2. Log expenses</div>
                <div className="mobile-tagline__text body-normal-light">Add your expenses and split them equally or individually</div>
              </div>
              <div>
                <div className="mobile-tagline__heading header-normal">3. Even up</div>
                <div className="mobile-tagline__text body-normal-light">When the event is over and all expenses has been logged it is easy to see who owes what to whom </div>
              </div>
            </div>
          </div>

        </div>
      </div>
    </div>

  }
}

export default withRouter(Home);