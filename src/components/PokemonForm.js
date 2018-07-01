import React from 'react'
import { Form } from 'semantic-ui-react'

// HERE 
class PokemonForm extends React.Component {
  constructor(props) {
    super(props)

    this.state = {
      name: '',
      hp: '',
      urlId: '',
    }
  }

  handleChange = (e) => this.setState({ [e.target.name]: e.target.value }) 

  handleSubmit = () => {
    const {name, hp, urlId} = this.state
    let data = {
      name,
      stats: [{ value: hp, name: "hp" }],
      sprites: {
        front: `https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/${urlId}.png`,
        back: `https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/back/${urlId}.png`
      }
    }
    let options = {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify(data)
    }
    fetch("http://localhost:3000/pokemon", options)
      .then(r => r.json())
      .then(this.props.addPokemon)
  }

  render() {
    return (
      <div>
        <h3>Add a Pokemon!</h3>
        <Form onSubmit={this.handleSubmit}>
          <Form.Group widths="equal" onChange={this.handleChange}>
            <Form.Input fluid label="Name" placeholder="Name" name="name" />
            <Form.Input fluid label="hp" placeholder="hp" name="hp" />
            <Form.Input fluid label="id" placeholder="id" name="urlId" />
          </Form.Group>
          <Form.Button>Submit</Form.Button>
        </Form>
      </div>
    )
  }
}

export default PokemonForm
