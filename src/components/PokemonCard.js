import React from 'react'
import { Card } from 'semantic-ui-react'

class PokemonCard extends React.Component {
  constructor(props){
    super(props)

    this.state = {
      name: this.props.pokemon.name,
      image: this.props.pokemon.sprites.front,
      hp: this.props.pokemon.hp
    }
  }

  handleClick = () => {
    // if (this.state.image === this.props.pokemon.sprites.front){
    //   this.setState({
    //     image: this.props.pokemon.sprites.back
    //   })
    // } else {
    //   this.setState({
    //     image: this.props.pokemon.sprites.front
    //   })
    // }

    this.state.image === this.props.pokemon.sprites.front ?
    this.setState({ image: this.props.pokemon.sprites.back}) :
    this.setState({ image: this.props.pokemon.sprites.front})
  }

  render() {
    return (
      <Card>
        <div>
          <div className="image" onClick={this.handleClick}>
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
