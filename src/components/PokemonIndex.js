import React from 'react'
import PokemonCollection from './PokemonCollection'
import PokemonForm from './PokemonForm'
import { Select } from 'semantic-ui-react'
import { Search } from 'semantic-ui-react'
// import { pokeOptions } from '../pokeOptions'
import _ from 'lodash'

const pokeOptions = [ {
    key: "name",
    value: "name",
    text: "Name"
  },
  {
    key: "hp",
    value: "hp",
    text: "HP"
  },
  {
    key: "none",
    value: "none",
    text: "None"
  }
]

class PokemonPage extends React.Component {
  state = {
    pokemonArr: [],
    search: '',
    sortSelection: ''
  }

  componentDidMount(){
    console.log('componentDidMount')
    this.fetchPokemon()
  }

  fetchPokemon(){
    fetch('http://localhost:3000/pokemon')
      .then(r => r.json())
      .then(array => this.sanitizeArray(array))
  }

  sanitizeArray(array){
    const newArr = [...array]

    const sanitizedArr = newArr.map(poke => {
        // const hp = poke.stats.find(obj => obj.name === "hp").value
        // const newPoke = Object.assign({}, poke.name, poke.sprites, hp);
        const newPoke = {};
        newPoke.name = poke.name;
        newPoke.sprites = poke.sprites;
        newPoke.hp = poke.stats.find(obj => obj.name === "hp").value
        return newPoke
    })
      // console.log(sanitizedArr);

      this.setState({
        pokemonArr: sanitizedArr
      })
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
      .then(r => r.json()).then(console.log)
      // .then(obj => this.setState({
      //   pokemonArr: [obj, ...this.state.pokemonArr]
      // }))
  }

  handleSort = (data) => {
    // console.log(data);
    const newPokemonArr = [...this.state.pokemonArr]

      this.setState({
        sortSelection: data.value
      }, () => {
        if (data.value === "name") {
          const sortedArr = newPokemonArr.sort(function(a, b){
            return a.name < b.name ? -1 : a.name > b.name ? 1 : 0
          });
          this.setState({
            pokemonArr: sortedArr
          });
        } else if (data.value === "hp"){
          const sortedArr = newPokemonArr.sort(function(a, b){
            return a.hp - b.hp
          });
          this.setState({
            pokemonArr: sortedArr
          })
        }
      })
  }

  handleSearch = () => {
    const newPokemonArr = [...this.state.pokemonArr]
    if (this.state.search === '') {
      return newPokemonArr
    } else {
      const searchArr = newPokemonArr.filter(pokemon => pokemon.name.includes(this.state.search))
      // console.log(searchArr)
      return searchArr
    }
  }

  handleChange = (value) => {
    this.setState({
      search:  value.value
    })
  }

  render() {
    console.log(this.state)
    return (
      <div>
        <h1>Pokemon Searcher</h1>
        <br />
        <Search onSearchChange={_.debounce((event, value) => this.handleChange(value), 500)} showNoResults={false} />
        <Select onChange={(event, data) => this.handleSort(data)} options={pokeOptions} placeholder="Sort By..." />
        <PokemonForm createPokemon={this.createPokemon}/>
        <PokemonCollection pokemons={this.handleSearch()}/>
        <br />
      </div>
    )
  }
}

// _.debounce((event) => this.handleChange(event), 500)

export default PokemonPage
