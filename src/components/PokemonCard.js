import React from 'react'
import { Card } from 'semantic-ui-react'

class PokemonCard extends React.Component {
  state = {
    front: true 
  }

  handleClick = () => {
    this.setState({ 
      front: !this.state.front
    })
  }
  render() {
    const {name, sprites:{front}, sprites:{back}, stats} = this.props.pokemon,
      hp = stats.find(stat => stat.name === "hp").value;
    return (
      <Card onClick={this.handleClick} >
        <div>
          <div className="image">
            <img src={ this.state.front ? front : back } alt="oh no!" />
          </div>
          <div className="content">
            <div className="header">{name}</div>
          </div>
          <div className="extra content">
            <span>
              <i className="icon heart red" />
              {hp}
            </span>
          </div>
        </div>
      </Card>
    )
  }
}

export default PokemonCard
