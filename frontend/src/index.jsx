/* DO NOT DELETE THESE LINES */

import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import PropTypes from 'prop-types';
import {Table} from './components/TemperatureTable.jsx';

import './assets/stylesheets/style.css';

const BACKEND_PORT = process.env.BACKEND_PORT || 9000;
const baseUrl = window.location.hostname;
const backendUrl = `http://${baseUrl}:${BACKEND_PORT}`;

/* ADD YOUR CODE AFTER THIS LINE */

const getGreetingFromBackend = async () => {
  try {
    const url = `${backendUrl}/api/greeting`;
    console.log(`Getting greeting from ${url}`);
    const response = await fetch(url);
    return response.json();
  } catch (error) {
    console.error(error);
  }
  return { greeting: 'Could not get greeting from backend' };
};

const getEventFromBackend = async () => {
  try {
    const url = `${backendUrl}/api/events`;
    console.log(`Getting greeting from ${url}`);
    const response = await fetch(url);
    return response.json();
  } catch (error) {
    console.error(error);
  }
  return { greeting: 'Could not get greeting from backend' };
};

const BackendGreeting = (props) => (
  <div>
    <p>
      Backend says:
      {' '}
      {props.greeting}
    </p>
  </div>
);

BackendGreeting.propTypes = {
  greeting: PropTypes.string,
};

BackendGreeting.defaultProps = {
  greeting: '',
};

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      greeting: '',
      events: []
    };
  }

  async componentDidMount() {
    const response = await getGreetingFromBackend();
    this.setState({ greeting: response.greeting });
    const events = await getEventFromBackend();
    console.log(events)
    this.setState({events: events.results});
    console.log(this.state.events)
  }

  render() {
    return (
      <>
        <BackendGreeting greeting={this.state.greeting} />
        <Table events={this.state.events}/>
      </>
    );
  }
}

/* DO NOT DELETE AFTER THIS LINE */

ReactDOM.render(
  <App />,
  document.getElementById('root'),
);
