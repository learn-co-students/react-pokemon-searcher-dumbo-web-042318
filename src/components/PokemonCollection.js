import React from 'react'
import PokemonCard from './PokemonCard'
import { Card } from 'semantic-ui-react'

class PokemonCollection extends React.Component {
  render() {
    const PokemonCards = this.props.pokemonArray.map(pokemon => {
      return <PokemonCard key={pokemon.name} pokemon={pokemon}/>
    })
    return (
      <Card.Group itemsPerRow={6}>
        {PokemonCards}
      </Card.Group>
    )
  }
}

export default PokemonCollection
