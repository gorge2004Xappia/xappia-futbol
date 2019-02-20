import React, { Component } from "react";
import config from "../helpers/config"; // We import config.
import { load } from "../helpers/sheet"; // We import load function from sheet.js.
import "./ourcomponent.css"; // We import styles.
class OurComponent extends Component {
  state = {
    players: [],
    error: null
  };

  render() {
    const { players, error } = this.state;
    if (error) {
      return <div>{this.state.error}</div>;
    }
    return (
      <div>
        <table>
          <tbody>
          <tr>
            <td>Photo</td>
            <td>Nombre</td>
            <td>Apellido</td>
            <td>Position</td>
          </tr>
          {players.map((player, i) => (
            <tr key={i}>
              <td><img src={player.photo} alt={player.firstName}/></td>
              <td>{player.firstName}</td>
              <td>{player.lastName}</td>
              <td>{player.firstPosition}</td>
            </tr>
          ))}
          {console.log(players)}
          </tbody>
        </table>
      </div>
    );
  }

  // Loads the JavaScript client library.
  componentDidMount() {
    window.gapi.load("client", this.initClient);
  }

  // Initialize the JavaScript client library.
  initClient = () => {
    window.gapi.client
      .init({
        apiKey: config.apiKey,
        discoveryDocs: config.discoveryDocs
      })
      .then(() => {
        load(this.onLoad); // Initialize and make the API request.
      });
  };

  // If it receives data from sheets.js it set it into the component state. Else it set the error inside the component state.
  onLoad = (data, error) => {
    if (data) {
      const players = data.players;
      this.setState({ players });
    } else {
      this.setState({ error });
    }
  };
}

export default OurComponent;
