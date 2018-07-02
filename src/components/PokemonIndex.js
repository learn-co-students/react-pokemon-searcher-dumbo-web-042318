import React from 'react'
import PokemonCollection from './PokemonCollection'
import PokemonForm from './PokemonForm'
import { Search } from 'semantic-ui-react'
import _ from 'lodash'

class PokemonPage extends React.Component {

  constructor(){
    super()

    this.state ={
      pokemon: [],
      searchPok: ''
    }
  }

  componentDidMount(){
    this.fetchPokemon()
  }

  fetchPokemon = () => {
    fetch(`http://localhost:3000/pokemon`)
    .then(r => r.json())
    .then(res => this.setState({
      pokemon: res
    }))
  }

  handleChange = (e, value) => {
    //console.log(value.value)
    this.setState({
      searchPok: value.value
    })
    let newArr = [...this.state.pokemon]
    const searchArr = newArr.filter(pokemon => {
      return pokemon.name.includes(this.state.searchPok)
    })
    this.setState({
      pokemon: searchArr
    })
  }
  //filter is not destructive, so save it into a new array

  postPok = (data) => {
    const options = {method: 'POST',
                  headers: {
                    'Content-Type': 'application/json'
                  },
                    body: JSON.stringify(data)
                  }
    fetch(`http://localhost:3000/pokemon`, options)
    .then(r => r.json())
    .then(this.fetchPokemon())
  }

  render() {
    console.log(this.state);
    return (
      <div>
        <h1>Pokemon Searcher</h1>
        <br />
        <Search onSearchChange={_.debounce((e, value) => this.handleChange(e, value), 500)} showNoResults={false} />
        <br />
        <PokemonCollection pokemonArray={this.state.pokemon}/>
        <br />
        <PokemonForm createPokemon={this.postPok}/>
      </div>
    )
  }
}

export default PokemonPage
