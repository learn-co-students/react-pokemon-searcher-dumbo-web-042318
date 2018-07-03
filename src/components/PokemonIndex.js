import React from 'react'
import PokemonCollection from './PokemonCollection'
import PokemonForm from './PokemonForm'
import { Search } from 'semantic-ui-react'
import _ from 'lodash'

class PokemonPage extends React.Component {

  constructor(){
    super()
    this.state = {
      pokemons: [],
      isLoading: false,
      value: ""
    }
  }

  componentDidMount(){
    this.getPokemons()
  }

  getPokemons = () => {
    fetch('http://localhost:3000/pokemon')
    .then(resp => resp.json())
    .then(resp => this.setState({
      pokemons: resp.sort(function(a,b){
         if (a.name.toLowerCase() < b.name.toLowerCase())
            return -1;
         else if (a.name.toLowerCase() == b.name.toLowerCase())
            return 0;
         else
            return 1;
     })
    }))
  }

  updateIndex = (newPokemon) => {
    this.setState({
      pokemons: [...this.state.pokemons, newPokemon]
    })
  }

  resetComponent = () => this.setState({ isLoading: false, pokemons: [], value: '' })

  handleResultSelect = (e, { pokemon }) => this.setState({ value: pokemon.name })

  handleSearchChange = (e, { value }) => {
    this.setState({ isLoading: true, value })

    setTimeout(() => {
      if (this.state.value.length < 1) return this.resetComponent()

      const re = new RegExp(_.escapeRegExp(this.state.value), 'i')
      const isMatch = pokemon => re.test(pokemon.name)

      this.setState({
        isLoading: false,
        pokemons: _.filter(this.state.pokemons, isMatch),
      })
    }, 300)
  }

  render() {
    // console.log(this.state.pokemons);
    // debugger
    const { pokemons, isLoading, value } = this.state
    return (
      <div>
        <h1>Pokemon Searcher</h1>
        <br />
        <Search
          category
            loading={isLoading}
            onResultSelect={this.handleResultSelect}
            onSearchChange={_.debounce(this.handleSearchChange, 500, { leading: true })}
            showNoResults={false}
            value={value}
            {...this.props}/>
        <br />
        <PokemonForm newpokemon={this.updateIndex}/>
        <br />
        <PokemonCollection pokemons={this.state.pokemons}/>
      </div>
    )
  }
}

export default PokemonPage
