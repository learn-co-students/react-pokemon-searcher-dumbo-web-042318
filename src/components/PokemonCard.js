import React from 'react'
import { Card } from 'semantic-ui-react'

class PokemonCard extends React.Component {
  constructor(props){
    super(props)

    const {name, sprites, stats} = this.props.pokemon

    const hp = stats.find(obj => obj.name === "hp").value

    this.state = {
      image: sprites.front,
      name: name,
      hp: hp
    }
  }

  handleClick = () => {
    this.state.image === this.props.pokemon.sprites.front ?
    this.setState({image: this.props.pokemon.sprites.back}) :
    this.setState({image: this.props.pokemon.sprites.front})
  }

  render() {
    //console.log(this.props)
    return (
      <Card onClick={this.handleClick}>
        <div>
          <div className="image">
            <img src={this.state.image} alt="oh no!" />
          </div>
          <div className="content">
            <div className="header">{this.state.name}</div>
          </div>
          <div className="extra content">
            <span>
              <i className="icon heartbeat red" />
              {this.state.hp}
            </span>
          </div>
        </div>
      </Card>
    )
  }
}

export default PokemonCard
