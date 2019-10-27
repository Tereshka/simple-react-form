import React from "react";
import countries from "../data/countries";

export default class App extends React.Component {

  state = {
    username: '',
    password: '',
    passwordRepeat: '',
    country: '',
  }

  onChangeInput = (event) => {
    this.setState({[event.target.name]: event.target.value});
  }

  submit = (event) => {
    event.preventDefault();
    console.log(this.username.value, this.password.value);
  }

  renderItemsOptions = (items) => {
    return items.map((country, index) => (
      <option key={index} value={country.id}>{country.name}</option>
    ));
  }

  render() {
    const {username, password, passwordRepeat} = this.state;
    return (
      <div className="form-container card">
        <form className="form card-body">
          <div className="form-group">
            <label>Username</label>
            <input
              type="text"
              className="form-control"
              placeholder="Enter username"
              ref={node => (this.username = node)}
              name="username"
              value={username}
              onChange={ this.onChangeInput }
            />
          </div>
          <div className="form-group">
            <label>Password</label>
            <input
              type="text"
              className="form-control"
              placeholder="Enter password"
              ref={node => (this.password = node)}
              name="password"
              value={password}
              onChange={this.onChangeInput}
            />
          </div>
          <div className="form-group">
            <label>Repeat password</label>
            <input
              type="text"
              className="form-control"
              placeholder="Enter repeat password"
              ref={node => (this.passwordRepeat = node)}
              name="passwordRepeat"
              value={passwordRepeat}
              onChange={this.onChangeInput}
            />
          </div>
          <div className="form-group">
            <label htmlFor="country">Country</label>
            <select
              className="form-control"
              id="country"
              name="country"
              value={this.state.country}
              onChange={this.onChangeInput}
            >
              {this.renderItemsOptions(countries)}
            </select>
          </div>
          <button type="submit" className="btn btn-primary w-100" onClick={this.submit}>
            Submit
          </button>
        </form>
      </div>
    );
  }
}
