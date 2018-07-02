import React from 'react'
import PokemonCollection from './PokemonCollection'
import PokemonForm from './PokemonForm'
import { Search } from 'semantic-ui-react'
import { Button } from 'semantic-ui-react'
import { Dropdown } from 'semantic-ui-react'
import _ from 'lodash'

class PokemonPage extends React.Component {
  constructor() {
    super()
    this.state = {
      pokemon: [],
      isLoading: false,
      searchResults: [],
      searchValue: '',
      addButtonClicked: false,
      sortOptions: [{
        text: 'name',
        value: 'name'
      },{
        text: 'hp',
        value: 'hp'
      }],
      sortSelection: '',
      sortedPokemon: []
    }
  }
  
  fetchPokemon = () => {
    const baseURL = 'http://localhost:3000/pokemon'
    fetch(baseURL)
      .then(resp => resp.json())
      .then(pokemon => this.setState({
        pokemon
      }))
  }

  componentDidMount() {
    this.fetchPokemon()
  }

  searchHandler = (event) => {
    this.setState({
      searchValue: event.target.value
    })
    const filteredPokemon = this.filterPokemon(this.state.searchValue)
    this.setState({
      searchResults: filteredPokemon
    })
  }

  filterPokemon = (query) => {
    return this.state.pokemon.filter(pokemon =>
      pokemon.name.includes(query)
    )
  }

  postPokemon = (data) => {
    const baseURL = 'http://localhost:3000/pokemon'
    //any headers needed in options?
    const options = {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(data)
    }
    fetch(baseURL, options)
      .then(resp => resp.json())
      .then(pokemon => {
        this.addNewPokemon(pokemon)
      })
  }

  addNewPokemon = (pokemon) => {
    const newPokemonArrayCopy = [...this.state.pokemon, pokemon]
    this.setState({
      pokemon: newPokemonArrayCopy,
      addButtonClicked: !this.state.addButtonClicked
    })
  }

  addButtonHandler = () => {
    this.setState({
      addButtonClicked: !this.state.addButtonClicked
    })
  }

  sortHandler = (e) => {
    // console.log(e.target.firstElementChild)
    // debugger;  
    this.setState({
      sortSelection: e.target.firstElementChild.innerText
    }, () => {
      if (this.state.sortSelection === 'name') {
        const pokemonSortedByName = this.sortByName(this.state.pokemon)
        // console.log(pokemonSortedByName)
        this.setState({
          pokemon: pokemonSortedByName
        })
      } else if (this.state.sortSelection === 'hp') {
        const pokemonSortedByHp = this.sortyByHp(this.state.pokemon)
        // console.log(pokemonSortedByHp)
        this.setState({
          pokemon: pokemonSortedByHp
        })
      }
    })
    
  }

  sortByName = (array) => {
    const pokemonCopy = [...array]
    const sortedPokemon = pokemonCopy.sort((a, b) => {
      return a.name < b.name ? -1 : a.name > b.name ? 1 : 0
    })
    return sortedPokemon
  }

  sortyByHp = (array) => {
    const pokemonCopy = [...array]
    const sortedPokemon = pokemonCopy.sort((a, b) => {
      if (a.stats && b.stats) {
        return a.stats[4].value < b.stats[4].value ? -1 : a.stats[4].value > b.stats[4].value ? 1 : 0
      } else if (a.stats && b.hp) {
        return a.stats[4].value < b.hp ? -1 : a.stats[4].value > b.hp ? 1 : 0
      } else if (a.hp && b.stats) {
        return a.hp < b.stats[4].value ? -1 : a.hp > b.stats[4].value ? 1 : 0
      } else if (a.hp && b.hp) {
        return a.hp < b.hp ? -1 : a.hp > b.hp ? 1 : 0
      }
    })
    return sortedPokemon
  }

  render() {
    console.log(this.state.pokemon)
    
    return (
      <div>
        <h1>Pokemon Searcher</h1>
        <br />
        <Search onSearchChange={this.searchHandler} showNoResults={false} />
        <br/>
        <Dropdown fluid selection onChange={this.sortHandler} options={this.state.sortOptions} placeholder="Sort By..."/>
        {/* <Search onSearchChange={_.debounce(event => this.searchHandler(event), 500)} showNoResults={false} /> */}
        <br />
        <Button content="Add Pokemon!" onClick={this.addButtonHandler}/>
        <br/>
        {this.state.addButtonClicked ? <PokemonForm postPokemon={this.postPokemon}/> : '' }
        <br />
        <PokemonCollection pokemonData={this.state.searchValue ? this.state.searchResults : this.state.pokemon} />
      </div>
    )
  }
}

export default PokemonPage
