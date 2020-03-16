/* DO NOT DELETE THESE LINES */

import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import PropTypes from 'prop-types';
import {Table} from './components/TemperatureTable.jsx';
import { Line } from 'react-chartjs-2';

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
  return { greeting: 'Could not get event from backend' };
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

const getData = (events) => ({

  datasets: [
    {
      label: 'Temperature',
      fill: false,
      lineTension: 0.1,
      backgroundColor: 'rgba(75,192,192,0.4)',
      borderColor: 'rgba(75,192,192,1)',
      borderJoinStyle: 'miter',
      pointBorderColor: 'rgba(75,192,192,1)',
      pointBackgroundColor: '#fff',
      pointHoverBackgroundColor: 'rgba(75,192,192,1)',
      pointHoverBorderColor: 'rgba(220,220,220,1)',
      pointHoverBorderWidth: 1,
      pointRadius: 1,
      data: events.slice( events.length - 100).map(event => {
        const timestamp = event.timestamp
        const temperature = event.temperature
        return {
          x: timestamp,
          y: temperature
        }
      })
    }
  ]
})

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
        <Line 
          data={getData(this.state.events)}
          options={{
                scales: {
                  xAxes: [{
                    type: 'time'
                    
                  }
                ]
              }
            }
          }
        />
      </>
    );
  }
}

/* DO NOT DELETE AFTER THIS LINE */

ReactDOM.render(
  <App />,
  document.getElementById('root'),
);
