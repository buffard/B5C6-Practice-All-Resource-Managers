import { Route } from 'react-router-dom'
import React, { Component } from "react"
import AnimalList from './AnimalList/AnimalList'
import LocationList from './LocationList/LocationList'
import EmployeeList from './employee/EmployeeList'
import OwnersList from './owners/OwnersList'
import AnimalsManager from "../modules/AnimalsManager"
import LocationsManager from "../modules/LocationsManager"
import EmployeesManager from "../modules/EmployeesManager"
import OwnersManager from "../modules/OwnersManager"
import AnimalDetail from "./AnimalList/AnimalDetail"
class ApplicationViews extends Component {

  state = {
    animals: [],
    locations: [],
    employees: [],
    owners: []
  }

  componentDidMount() {
    const newState = {}

    AnimalsManager.getAll().then(allAnimals => {
      this.setState({
        animals: allAnimals
      })
    })

    LocationsManager.getAll().then(allLocations => {
      this.setState({
        locations: allLocations
      })
    })

    EmployeesManager.getAll().then(allEmployees => {
      this.setState({
        employees: allEmployees
      })
    })

    OwnersManager.getAll().then(allOwners => {
      this.setState({
        owners: allOwners
      })
    })
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
        <Route exact path="/animals" render={(props) => {
          return <AnimalList deleteAnimal={this.deleteAnimal} animals={this.state.animals} />
        }} />
        <Route path="/animals/:animalId(\d+)" render={(props) => {
          return <AnimalDetail {...props} deleteAnimal={this.deleteAnimal} animals={this.state.animals} />
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