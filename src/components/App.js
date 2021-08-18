import React from 'react'

import Filters from './Filters'
import PetBrowser from './PetBrowser'

class App extends React.Component {
  constructor() {
    super()

    this.state = {
      pets: [],
      filters: {
        type: 'all'
      }
    }
  }

  onChangeType = (event) => {
    this.setState({
      filters: {
        type: event.target.value
      }
    })
  }

  onFindPetsClick = () => {
    if(this.state.filters.type === "all"){
      fetch('/api/pets')
      .then( response => response.json() )
      .then( json => this.setState({
        pets: json
      }))
    }else{
      fetch(`/api/pets?type=${this.state.filters.type}`)
      .then( response => response.json() )
      .then( json => this.setState({
        pets: json
      }))
    }
  }

  // Custom search funtion
  // 1. Map the array and iterate through the elements
  // 2. If element is a match, use the spread operator (...elem) in order to copy all key:value pairs within the object element and provide a second argument to overwrite a key with its new value. Then return the edited element into the array.
  // 3. If element is not a match, simply return the element as part of the map function to be included back into the array
  // 4. Use setState() to update the state with the new array (edited)
  onAdoptPet = (id) => {
    let pets = this.state.pets.map( pet => {
      return pet.id === id ? {...pet, isAdopted: true} : pet;
    })
    this.setState({
      pets: pets
    })
  }

  render() {
    return (
      <div className="ui container">
        <header>
          <h1 className="ui dividing header">React Animal Shelter</h1>
        </header>
        <div className="ui container">
          <div className="ui grid">
            <div className="four wide column">
              <Filters onChangeType={this.onChangeType} onFindPetsClick={this.onFindPetsClick} />
            </div>
            <div className="twelve wide column">
              <PetBrowser pets={this.state.pets} onAdoptPet={this.onAdoptPet} />
            </div>
          </div>
        </div>
      </div>
    )
  }
}

export default App
