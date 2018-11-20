import React, { Component } from 'react'
class LocationList extends Component {
  render() {
    return (
      <section className="locations list">
        <h2 className="header">Locations:</h2>
          {this.props.locations.map(locations => 
            <div key={locations.id}>
              <p className="bold">Name: {locations.name}</p>
              <p className="gray">Address: {locations.address}</p>
            </div>
          )}
      </section>
    )
  }
}


export default LocationList