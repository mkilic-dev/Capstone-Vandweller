import React, { Component } from "react";
import LocationMap from "./LocationMap";
import Axios from "axios";


class App extends Component {
  constructor() {
    super();
    // Initialize list of drinking-fountains.
    this.state = {
      locations: [],
      "drinking-fountains": [],
      "public-washrooms": []
    };
  }

  componentDidMount() {
    this.loadLocations();
    this.loadExternalData("drinking-fountains");
    this.loadExternalData("public-washrooms");
  }
  loadExternalData(category) {
    Axios.get(`http://localhost:5000/api/external/vancouver?category=${category}`)
      .then(res => {
        this.setState({ [category]: res.data });
      }).catch(err => console.log(err));
  }

  loadLocations = () => {
    // Get List of locations from server (Mockup server )
    Axios.get(`http://localhost:5000/api/locations`)
      .then(res => {
        // Fill the locations into state.locations
        this.setState({ locations: res.data });

      }).catch(err => console.log(err));
  }

  render() {
    return (<div className="grid-container">
      <header className="header">
        <div><a href="/" className="brand">Vandwellers</a></div>
        <div>
          <a href="#" className="link">Sign-in</a>
          <a href="#" className="link">Register</a>
        </div>
      </header>
      <main className="main">
        {
          <LocationMap reload={this.loadLocations}
            drinkingFountains={this.state["drinking-fountains"]}
            publicWashrooms={this.state["public-washrooms"]}
            locations={this.state.locations} ></LocationMap>
        }
      </main>
    </div>)
  }
}
export default App;
