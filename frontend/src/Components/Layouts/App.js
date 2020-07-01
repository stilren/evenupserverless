import React, { Component } from 'react';
import './App.css';
import NavbarContainer from '../Containers/Navbar-container'
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import injectTapEventPlugin from 'react-tap-event-plugin';

class App extends Component {
  render() {
    if (typeof code_happened === 'undefined') {
      window.code_happened = true;
      injectTapEventPlugin();
    }

    const isLandingPage = this.props.location.pathname === "/"

    return (
      <MuiThemeProvider>
        <div>
        <NavbarContainer hideAppBar={isLandingPage} />
        <div className={isLandingPage ? "" : "content"}>
          {this.props.children}
        </div>
      </div>
      </MuiThemeProvider>
    );
  }
}

export default App;