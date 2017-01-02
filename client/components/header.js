import React, { Component } from 'react';

class Header extends Component {
  onAddClick(event) {
    event.preventDefault();

    Meteor.call('listings.insert');
  }

  render() {
    return (
      <nav className="nav">
        <div className="nav-container">
          <span>Leaderboard</span>
          <input type="button" value="ADD" onClick={this.onAddClick.bind(this)} />
        </div>
      </nav>
    );
  }
}

export default Header;
