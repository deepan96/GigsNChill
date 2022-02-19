import React, { Component } from "react";
import axios from 'axios';  

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      username: '',
    };

    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  // Add componentDidMount()
  componentDidMount() {
    this.refreshList();
  }

  // GET SERVER LOGIN DATA
  refreshList = () => {
    axios   // Axios to send and receive HTTP requests
      .get("http://localhost:8000/api/login/")
      .then(res => console.log(res.data))
      .catch(err => console.log(err));
  };

  // POST SERVER DATA
  handleSubmit(event) {
    axios.post("http://localhost:8000/api/login/", { username: this.state.username, password: "test"})
  };

  handleChange(event) {
    this.setState({username: event.target.value, password:event.target.value});
  }

  render() {
    return (
      <form onSubmit={this.handleSubmit}>
        <label>
          Username:
          <input type="text" value={this.state.username} onChange={this.handleChange} />
        </label>
        <input type="submit" value="Submit" />
      </form>
    );
  }
}

export default App;
