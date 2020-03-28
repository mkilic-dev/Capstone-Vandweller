import React, { Component } from "react";
import axios from "axios";
import "./App.css";
import LocationMap from "./LocationMap";

class App extends Component {
  state = {
    books: []
  };

  componentDidMount() {
    axios.get("/api/books").then(res => {
      this.setState({
        books: res.data
      });
    });
  }

  handleFormSubmit = event => {
    event.preventDefault();

    axios
      .post("/api/books", {
        title: event.target.title.value,
        description: event.target.description.value,
        imageUrl: event.target.imageUrl.value
      })
      .then(res => {
        this.setState({
          books: res.data
        });
      })
      .catch(err => {
        console.log(err);
      });

    event.target.reset();
  };

  render() {
    if (!this.state.books) {
      return <p>Loading</p>;
    }

    const books = this.state.books.map(book => {
      return (
        <li key={book.id} className="book-list__item">
          <h3>{book.title}</h3>
          <img src={book.imageUrl} alt={book.title} />
        </li>
      );
    });

    return (
      <div className="App">
        <h1>React Client</h1>
        <LocationMap ></LocationMap>

        <form onSubmit={this.handleFormSubmit} className="book-form">
          <input type="text" name="title" placeholder="title" required />
          <textarea
            name="description"
            placeholder="description"
            required
          ></textarea>
          <input type="url" name="imageUrl" placeholder="image url" required />
          <button type="submit">Submit</button>
        </form>

        <ul className="book-list">{books}</ul>
      </div>
    );
  }
}

export default App;
