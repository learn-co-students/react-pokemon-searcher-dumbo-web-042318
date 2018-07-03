import React from 'react'
import { Form } from 'semantic-ui-react'

class PokemonForm extends React.Component {
  constructor() {
    super()

    this.state = {
      name: '',
      hp: '',
      frontUrl: '',
      backUrl: ''
    }
  }

  handleSubmit = (e) => {
    e.preventDefault();

    const newPokemon = {
      name: this.state.name,
      stats: [{value: this.state.hp, name: "hp"}],
      sprites: {
        front: this.state.frontUrl,
        back: this.state.backUrl,
      }
    }

    fetch('http://localhost:3000/pokemon', {
      method: 'POST',
      headers: {
        'content-type':'application/json'
      },
      body: JSON.stringify(newPokemon),
    })
      .then(resp => resp.json())
      .then(resp => this.props.newpokemon(resp))

       e.target.reset()
    }

  handleName = (e) => {
    console.log(e.target.value);
    this.setState({
      name: e.target.value
    })
  }

  handleHp = (e) => {
    console.log(e.target.value);
    this.setState({
      hp: e.target.value
    })
  }

  handleFrontUrl = (e) => {
    console.log(e.target.value);
    this.setState({
      frontUrl: e.target.value
    })
  }

  handleBackUrl = (e) => {
    console.log(e.target.value);
    this.setState({
      backUrl: e.target.value
    })
  }

  // componentDidMount(){
  //
  // }

  render() {
    // debugger
    return (
      <div>
        <h3>Add a Pokemon!</h3>
        <Form onSubmit={this.handleSubmit}>
          <Form.Group widths="equal">
            <Form.Input fluid label="Name" placeholder="Name" name="name" onChange={this.handleName}/>
            <Form.Input fluid label="hp" placeholder="hp" name="hp" onChange={this.handleHp}/>
            <Form.Input fluid label="Front Image URL" placeholder="url" name="frontUrl" onChange={this.handleFrontUrl}/>
            <Form.Input fluid label="Back Image URL" placeholder="url" name="backUrl" onChange={this.handleBackUrl}/>
          </Form.Group>
          <Form.Button>Submit</Form.Button>
        </Form>
      </div>
    )
  }
}

export default PokemonForm
