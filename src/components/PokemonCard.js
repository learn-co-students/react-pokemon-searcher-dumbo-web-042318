import React from 'react'
import { Card } from 'semantic-ui-react'

class PokemonCard extends React.Component {

  constructor(){
    super()

    this.state = {
      front: true
    }
  }

  isClicked = (e) => {
    this.setState({
      front: !this.state.front
    })
  }

  findHp = () => {
    return this.props.pokemon.stats.find((stat) => stat.name === 'hp'
    ).value
    // console.log('hitting it');
  }

  render() {
    // console.log(this.props);
    const { pokemon } = this.props
    return (
      <Card>
        <div>
          <div className="image" onClick={this.isClicked}>
            {this.state.front ?
            <img alt="oh no!" src={pokemon.sprites.front}/> :
            <img alt="oh no!" src={pokemon.sprites.back}/>}
          </div>
          <div className="content">
            <div className="header">{pokemon.name}</div>
          </div>
          <div className="extra content">
            <span>
              <i className="icon heartbeat red" />
              {this.findHp()}
            </span>
          </div>
        </div>
      </Card>
    )
  }
}

export default PokemonCard
