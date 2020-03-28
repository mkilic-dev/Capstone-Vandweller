import React, { Component } from 'react';
import { Map, TileLayer, Marker, Popup } from 'react-leaflet';
import Axios from 'axios';
import { IconDrinkingFountain } from './components/IconDrinkingFountain';
import { IconPublicWashroom } from './components/IconPublicWashroom';
const DEFAULT_LONGITUDE = -122.96;
const DEFAULT_LATITUDE = 49.24;
export default class LocationMap extends Component {
  constructor(props) {
    super(props);
    this.state = {
      activeLocation: null,
      lat: 0,
      lng: 0,
      name: '',
      description: '',
      showForm: false
    }
  }
  handleMapClick = (e) => {
    console.log(e.latlng)
    this.setState({
      showForm: true,
      lng: e.latlng.lng,
      lat: e.latlng.lat,
    })
  }
  handleDelete = () => {
    Axios.delete("http://localhost:5000/api/locations/" + this.state.activeLocation._id)
      .then(res => {
        if (res.statusText === "OK") {
          alert("Deleted Successfully");
          this.props.reload();
          this.setState({ activeLocation: null });
        } else {
          alert(res.data.message);
        }
      })
  }

  handleSubmit = (e) => {
    e.preventDefault();
    Axios.post("http://localhost:5000/api/locations", {
      name: this.state.name,
      description: this.state.description,
      lat: this.state.lat,
      lng: this.state.lng,
    }).then(res => {
      this.setState({
        showForm: false,
        name: '',
        description: ''
      })
      this.props.reload();
    });
  }
  render() {
    const { activeLocation } = this.state;
    return (
      // If there is no user-defined location, show default lat,lng as center of map
      <Map center={[
        this.props.locations.length === 0 ?
          DEFAULT_LATITUDE : this.props.locations[0].lat,
        this.props.locations.length === 0 ?
          DEFAULT_LONGITUDE : this.props.locations[0].lng]} zoom={12}
        onClick={this.handleMapClick}
      >
        <TileLayer
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
          attribution='&copy; <a href="http://osm.org/copyright">OpenStreetMap</a> contributors'
          onClick={this.handleMapClick}
        />
        {
          this.props.publicWashrooms.map(location => (
            <Marker
              key={location.recordid}
              position={[location.lat, location.lng]}
              onClick={() => {
                this.setState({ activeLocation: location })
              }}
              icon={IconPublicWashroom}
            ></Marker>
          ))
        }
        {
          this.props.drinkingFountains.map(location => (
            <Marker
              key={location.recordid}
              position={[location.lat, location.lng]}
              onClick={() => {
                this.setState({ activeLocation: location })
              }}
              icon={IconDrinkingFountain}
            ></Marker>
          ))
        }
        {
          // Show Locations Come From The App Component
          this.props.locations.map(location => (
            <Marker
              key={location._id}
              position={[location.lat, location.lng]}
              onClick={() => {
                this.setState({ activeLocation: location })
              }}
            />
          ))}
        {
          this.state.showForm && (
            <Popup position={[this.state.lat, this.state.lng]}
              onClose={() => {
                this.setState({ showForm: false })
              }} >
              <form onSubmit={this.handleSubmit} >
                <ul className="form-container">
                  <li>
                    <h2>Create Location</h2>
                  </li>
                  <li>
                    <label htmlFor="name">
                      Name
                    </label>
                    <input value={this.state.name}
                      onChange={(e) => this.setState({ name: e.target.value })}
                      type="text" name="name" id="name" />
                  </li>
                  <li>
                    <label htmlFor="description">
                      Description
                    </label>
                    <textarea type="text" value={this.state.description}
                      onChange={(e) => this.setState({ description: e.target.value })}

                      name="description" id="description" />
                  </li>
                  <li>
                    <button type="submit" >Create</button>
                  </li>
                </ul>
              </form>
            </Popup>
          )

        }
        {activeLocation && (
          <Popup
            position={[
              activeLocation.lat,
              activeLocation.lng
            ]}
            onClose={() => {
              this.setState({ activeLocation: null })
            }}
          >
            <div>
              <h2>{activeLocation.name}</h2>
              <p>{activeLocation.description}</p>
              <div>
                <button onClick={this.handleDelete} className="button danger">Delete</button>
              </div>
            </div>
          </Popup>
        )}
      </Map>
    )
  }
}
