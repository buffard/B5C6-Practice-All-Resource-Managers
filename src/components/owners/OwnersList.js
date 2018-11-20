import React, { Component } from 'react'
import photo from "./key.png"
import "./owners.css"


class OwnersList extends Component {
  render() {
    return (
      <section className="owners list">
      {
        this.props.owners.map(owner =>
        <div key={owner.id} className="card">
        <div className="card-body">
          <h5 className="card-title">
          <img src={photo} className="icon--owners"/>
          <p className="centerText">{owner.name}</p>
          <p className="gray centerText">{owner.phoneNumber}</p>
          <a href="#" onClick={() => this.props.deleteOwner(owner.id)} className="card-link">Delete</a>
          </h5>
        </div>
        </div>
      )}
    </section>
    )
  }
}

export default OwnersList