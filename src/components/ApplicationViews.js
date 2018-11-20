import { Route } from 'react-router-dom'
import React, { Component } from "react"
import AnimalList from './AnimalList/AnimalList'
import LocationList from './LocationList/LocationList'
import EmployeeList from './employee/EmployeeList'
import OwnersList from './owners/OwnersList'
import AnimalManager from "../modules/AnimalManager"

class ApplicationViews extends Component {

  state = {
    animals: [],
    locations: [],
    employees: [],
    owners: []
  }

  componentDidMount() {
    const newState = {}

  

    // Our fetch happens in AnimalManager 
    AnimalManager.getAll().then(allAnimals => {
      this.setState({
        animals: allAnimals
      })
    })
    




      .then(() => fetch("http://localhost:5002/employees")
        .then(r => r.json()))
      .then(employees => newState.employees = employees)

      .then(() => fetch("http://localhost:5002/locations")
        .then(r => r.json()))
      .then(locations => newState.locations = locations)

      .then(() => fetch("  http://localhost:5002/owners")
        .then(r => r.json()))
      .then(owners => newState.owners = owners)

      .then(() => this.setState(newState))
  }

  deleteAnimal = id => {
    return fetch(`http://localhost:5002/animals/${id}`, {
      method: "DELETE"
    })
      .then(e => e.json())
      .then(() => fetch(`http://localhost:5002/animals`))
      .then(e => e.json())
      .then(animals => this.setState({ animals: animals }))
  }

  deleteEmployee = id => {
    return fetch(`http://localhost:5002/employees/${id}`, {
      method: "DELETE"
    })
      .then(e => e.json())
      .then(() => fetch(`http://localhost:5002/employees`))
      .then(e => e.json())
      .then(employees => this.setState({ employees: employees }))
  }

  deleteOwner = id => {
    return fetch(`http://localhost:5002/owners/${id}`, {
      method: "DELETE"
    })
      .then(e => e.json())
      .then(() => fetch(`http://localhost:5002/owners`))
      .then(e => e.json())
      .then(owners => this.setState({ owners: owners }))
  }

  render() {
    return (
      <React.Fragment>
        <Route exact path="/" render={(props) => {
          return <LocationList locations={this.state.locations} />
        }} />
        <Route path="/animals" render={(props) => {
          return <AnimalList deleteAnimal={this.deleteAnimal} animals={this.state.animals} />
        }} />
        <Route path="/employees" render={(props) => {
          return <EmployeeList deleteEmployee={this.deleteEmployee} employees={this.state.employees} />
        }} />
        <Route path="/owners" render={(props) => {
          return <OwnersList deleteOwner={this.deleteOwner} owners={this.state.owners} />
        }} />
      </React.Fragment>
    )
  }
}

export default ApplicationViews