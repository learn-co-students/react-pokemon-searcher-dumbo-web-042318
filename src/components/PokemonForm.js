import React from 'react'
import { Form } from 'semantic-ui-react'

class PokemonForm extends React.Component {
  constructor() {
    super()

    this.state = {
      name: '',
      hp: '',
      frontUrl: '',
      backUrl: '',
      isClicked: false
    }
  }

  handleSubmit = (e) => {
    e.preventDefault()
    this.props.createPokemon(
      { name: this.state.name,
        stats: [0, 1, 2, 3, 4,
          { value: this.state.hp,
            name: "hp"}
          ],
        sprites: {
          front: this.state.frontUrl,
          back: this.state.backUrl
        }
      }
    )
  }

  handleChange = (e) => {
    this.setState({
      [e.target.name]: e.target.value
    })
  }

  handleClick = () => {
    this.setState({
      isClicked: !this.state.isClicked
    })
  }

  render() {
    const isClicked = this.state.isClicked
    return (
      <div>
        <button onClick={this.handleClick}>Add a Pokemon!</button>
        {
          isClicked ?
          (<Form onSubmit={this.handleSubmit}>
            <Form.Group widths="equal">
              <Form.Input fluid label="Name" placeholder="Name" name="name" onChange={this.handleChange}/>
              <Form.Input fluid label="hp" placeholder="hp" name="hp" onChange={this.handleChange}/>
              <Form.Input fluid label="Front Image URL" placeholder="url" name="frontUrl" onChange={this.handleChange}/>
              <Form.Input fluid label="Back Image URL" placeholder="url" name="backUrl" onChange={this.handleChange}/>
            </Form.Group>
            <Form.Button>Submit</Form.Button>
          </Form>) : (
            null
          )
        }
      </div>
    )
  }
}

export default PokemonForm
