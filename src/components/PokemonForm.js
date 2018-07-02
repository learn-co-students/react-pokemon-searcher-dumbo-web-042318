import React from 'react'
import { Form } from 'semantic-ui-react'

class PokemonForm extends React.Component {
  constructor() {
    super()

    this.state = {
      name: '',
      hp: '',
      sprites: {
        front: '',
        back: ''
      }
    }
  }

  handleInputChange = (e) => {
    if (e.target.name === 'front') {
      this.setState({
        sprites: {
          ...this.state.sprites,
          front: e.target.value
        }
      })
    }
    else if (e.target.name === 'back') {
      this.setState({
        sprites: {
          ...this.state.sprites,
          back: e.target.value
        }
      })
    } else {
      this.setState({
        [e.target.name]: e.target.value
      })
    }
  }

  handleSubmit = (e) => {
    e.preventDefault()
    //use the postPokemon prop callback to send the data back up
    this.props.postPokemon(this.state)
    //reset the values of this.state to clear the form
    this.setState({
      name: '',
      hp: '',
      sprites: {
        front: '',
        back: ''
      }
    })
  }


  render() {
    return (
      <div>
        <Form onSubmit={this.handleSubmit}>
          <Form.Group widths="equal">
            <Form.Input 
              fluid label="Name" 
              placeholder="Name" 
              name="name" 
              onChange={this.handleInputChange} 
              value={this.state.name} 
            />
            <Form.Input 
              fluid label="hp" 
              placeholder="hp" 
              name="hp" 
              onChange={this.handleInputChange} 
              value={this.state.hp} 
            />
            <Form.Input 
              fluid label="Front Image URL" 
              placeholder="url" 
              name="front" 
              onChange={this.handleInputChange} 
              value={this.state.sprites.front} 
            />
            <Form.Input 
              fluid label="Back Image URL" 
              placeholder="url" 
              name="back" 
              onChange={this.handleInputChange} 
              value={this.state.sprites.back} 
            />
          </Form.Group>
          <Form.Button>Submit</Form.Button>
        </Form>
      </div>
    )
  }
}

export default PokemonForm
