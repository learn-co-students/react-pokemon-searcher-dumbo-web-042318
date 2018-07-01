import React from 'react'
import PokemonCollection from './PokemonCollection'
import PokemonForm from './PokemonForm'
import { Search } from 'semantic-ui-react'
import _ from 'lodash'

class PokemonPage extends React.Component {
    constructor(props) {
    super(props)

    this.state = {
      pokemons: [],
      results: [],
      value: ""
    }
  }

  componentDidMount() {
    console.log("log");
    fetch("http://localhost:3000/pokemon")
      .then(r => r.json())
      .then(pokemons => this.setState({
        pokemons,
        results: pokemons.reverse()
      }))
  }

  addPokemon = (pokemon) => {
    let pokemons = [...this.state.pokemons]
    let results = [...this.state.results]
    pokemons.unshift(pokemon) 
    results.unshift(pokemon) 
    this.setState({ pokemons, results })
  }

  handleSearchChange = (e, { value, results}) => {
    this.setState({ isLoading: true, value })
    results = this.state.pokemons.filter(pokemon => {
      return pokemon.name.match(value)
    })
    this.setState({ results })
  }

  render() {
    return (
      <div>
        <h1>Pokemon Searcher</h1>
        <br />
        <PokemonForm addPokemon={this.addPokemon}/>
        <br />
        <Search onSearchChange={_.debounce(this.handleSearchChange, 500)} showNoResults={false} />
        <br />
        <PokemonCollection pokemons={this.state.results} />
      </div>
    )
  }
}

export default PokemonPage
