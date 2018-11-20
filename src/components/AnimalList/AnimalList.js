import React, { Component } from 'react'
import { Link } from "react-router-dom";
import dog from "./DogIcon.png"
import "./animals.css"

class AnimalList extends Component {
  render() {
    return (
      <section className="animals list">
        {
          this.props.animals.map(animal =>
            <div key={animal.id} className="card">
              <div className="card-body">
                <h5 className="card-title">
                  <img src={dog} className="icon--dog" />
                  {animal.name}
                  <Link className="nav-link" to={`/animals/${animal.id}`}>Details</Link>
                  <a href="#"
                    onClick={() => this.props.deleteAnimal(animal.id)}
                    className="card-link">Delete</a>
                </h5>
              </div>
            </div>
          )}
      </section>
    )
  }
}

export default AnimalList