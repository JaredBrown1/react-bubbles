import React from "react";
import { axiosWithAuth } from "../utils/axiosWithAuth";

class Login extends React.Component {
  // make a post request to retrieve a token from the api
  // when you have handled the token, navigate to the BubblePage route

  state = {
    credentials: {
      username: "",
      password: ""
    }
  };

  handleChange = e => {
    this.setState({
      credentials: {
        ...this.state.credentials,
        [e.target.name]: e.target.value
      }
    });
  };

  login = e => {
    e.preventDefault();
    axiosWithAuth()
      .post("/api/login", this.state.credentials)
      .then(res => {
        localStorage.setItem("token", res.data.payload);
        this.props.history.push("/protected");
      })
      .catch(err => {
        console.log("invalid login", err);
      });
  };

  render() {
    return (
      <>
        <h1>Welcome to the Bubble App!</h1>
        <p>Build a login page here</p>
        <form onSubmit={this.login}>
          <input
            type="text"
            name="username"
            placeholder="login"
            value={this.state.credentials.username}
            onChange={this.handleChange}
          />

          <input
            type="password"
            name="password"
            placeholder="password"
            value={this.state.credentials.password}
            onChange={this.handleChange}
          />
          <br />
          <button>Login</button>
        </form>
      </>
    );
  }
}

export default Login;
