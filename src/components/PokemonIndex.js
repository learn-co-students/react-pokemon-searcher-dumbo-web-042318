import React from 'react'
import PokemonCollection from './PokemonCollection'
import PokemonForm from './PokemonForm'
import { Search } from 'semantic-ui-react'
import _ from 'lodash'

class PokemonPage extends React.Component {
  state = {
    pokemonArr: []
  }

  componentDidMount(){
    console.log('componentDidMount')
    this.fetchPokemon()
  }

  fetchPokemon(){
    fetch('http://localhost:3000/pokemon')
      .then(r => r.json())
      .then(array => this.setState({
        pokemonArr: array
      }))
  }

  createPokemon(data){
    console.log(data)
    fetch('http://localhost:3000/pokemon', {
      body: JSON.stringify(data),
      method: 'POST',
      headers: {
        'content-type': 'application/json'
      }
    })
      .then(r => r.json())
      .then(obj => this.setState({
        pokemonArr: [...this.state.pokemonArr, obj]
      }))
  }

  handleChange = (e) => {
    console.log(e.target.value);
  }

  render() {
    console.log(this.state)
    return (
      <div>
        <h1>Pokemon Searcher</h1>
        <br />
        <Search onSearchChange={this.handleChange} showNoResults={false} />
        <br />
        <PokemonCollection pokemons={this.state.pokemonArr}/>
        <br />
        <PokemonForm createPokemon={this.createPokemon}/>
      </div>
    )
  }
}

// _.debounce(() => this.handleChange, 500)

export default PokemonPage
