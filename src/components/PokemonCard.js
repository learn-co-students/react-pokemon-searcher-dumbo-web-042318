import React from 'react'
import { Card } from 'semantic-ui-react'

class PokemonCard extends React.Component {

  constructor() {
    super()
    this.state = {
      clicked: false
    }
  }

  clickHandler = () => {
    this.setState({
      clicked: !this.state.clicked
    })
  }

  render() {
    return (
      <Card>
        <div onClick={this.clickHandler}>
          <div className="image">
            <img src={this.state.clicked ? this.props.pokemon.sprites.back : this.props.pokemon.sprites.front} alt="oh no!" />
          </div>
          <div className="content">
            <div className="header">{this.props.pokemon.name}</div>
          </div>
          <div className="extra content">
            {this.props.pokemon.stats ? <span>
              <i className="icon heartbeat red" />
              {this.props.pokemon.stats[4].value} hp
            </span> : '' }
            {this.props.pokemon.hp ? <span>
              <i className="icon heartbeat red" />
              {this.props.pokemon.hp} hp
            </span> : '' }
          </div>
        </div>
      </Card>
    )
  }
}

export default PokemonCard
