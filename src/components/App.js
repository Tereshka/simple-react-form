import React from "react";
import countries from "../data/countries";

export default class App extends React.Component {

  state = {
    username: '',
    password: '',
    passwordRepeat: '',
    country: '',
    gender: 'female',
    agree: false,
    avatar: "",
    age: 18,
    errors: {}
  }

  onChangeInput = (event) => {
    this.setState({[event.target.name]: event.target.value});
  }

  onChangeCheckbox = (event) => {
    this.setState({[event.target.name]: event.target.checked});
  }

  onChangeAvatar = (event) => {
    const reader = new FileReader();
    reader.onload = event => {
      this.setState({[event.target.name]: event.target.result});
    }
    reader.readAsDataURL(event.target.files[0]);
  }

  incrementAge = () => {
    this.setState((prevState, prevProps) => ({
      age: prevState.age + 1
    }), () => {
      this.setState({errors: {age: this.state.age < 18 ? "You must be an adult" : ""}})
    });
  }

  decrementAge = () => {
    this.setState((prevState, prevProps) => ({
      age: prevState.age - 1
    }), () => {
      this.setState({errors: {age: this.state.age < 18 ? "You must be an adult" : ""}})
    });
  }

  submit = (event) => {
    event.preventDefault();
    const errors = {};
    if (this.state.username.length < 5) {
      errors.username = "Must be 5 characters or more";
    }
    if (!this.state.password) {
      errors.password = "Required";
    }
    if (this.state.password !== this.state.passwordRepeat) {
      errors.passwordRepeat = "Must be equal password";
    }

    this.setState({errors});
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
            {
              this.state.errors.username ? (
                <div className="invalid-feedback">{this.state.errors.username}</div>
              ) : null
            }
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
            {
              this.state.errors.password ? (
                <div className="invalid-feedback">{this.state.errors.password}</div>
              ) : null
            }
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
            {
              this.state.errors.passwordRepeat ? (
                <div className="invalid-feedback">{this.state.errors.passwordRepeat}</div>
              ) : null
            }
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
          <fieldset className="form-group">
            <div>Gender</div>
            <div className="form-check">
              <input className="form-check-input"
                type="radio"
                name="gender"
                id="male"
                value="male"
                checked={this.state.gender === 'male'}
                onChange={this.onChangeInput}
              />
              <label className="form-check-label" htmlFor="male">
                Male
              </label>
            </div>
            <div className="form-check">
              <input className="form-check-input"
                type="radio"
                name="gender"
                id="female"
                value="female"
                checked={this.state.gender === 'female'}
                onChange={this.onChangeInput}
              />
              <label className="form-check-label" htmlFor="female">
                Female
              </label>
            </div>
          </fieldset>
          <div className="form-group">
            <label htmlFor="avatar">Avatar</label>
            <input type="file"
              className="form-control-file"
              id="avatar"
              name="avatar"
              onChange={this.onChangeAvatar}
            />
          </div>
          <div className="form-group">
            <div><label>Age</label></div>
            <div className="btn-group">
              <button className="btn btn-secondary" type="button" onClick={this.decrementAge}>-</button>
              <input className="form-control"
                type="number"
                placeholder="Enter age"
                name="age"
                value={this.state.age}
                onChange={this.onChangeInput}
              />
              <button className="btn btn-secondary" type="button" onClick={this.incrementAge}>+</button>
            </div>
            {
              this.state.errors.age ? (
                <div className="invalid-feedback">{this.state.errors.age}</div>
              ) : null
            }
          </div>
          <div className="form-check">
            <input className="form-check-input"
              type="checkbox"
              id="agree"
              name="agree"
              value={this.state.agree}
              onChange={this.onChangeCheckbox}
              checked={this.state.agree}
            />
            <label className="form-check-label" htmlFor="agree">Confirm sending data</label>
          </div>
          <button type="submit" className="btn btn-primary w-100" onClick={this.submit}>
            Submit
          </button>
        </form>
      </div>
    );
  }
}
