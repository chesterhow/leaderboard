import React, { Component } from 'react';
import AddForm from './add_form';

class Header extends Component {
  constructor(props) {
    super(props);

    this.state = { showAddForm: false };

    this.toggleForm = this.toggleForm.bind(this);
  }

  addListing(listing) {
    Meteor.call('listings.insert', listing);
  }

  toggleForm() {
    this.setState({ showAddForm: !this.state.showAddForm });
  }

  render() {
    return (
      <nav className="nav">
        <div className="nav-container">
          <span>Leaderboard</span>
          <input type="button" value="ADD" onClick={this.toggleForm} />
        </div>
        {(this.state.showAddForm) ? (
          <AddForm
            toggleForm={this.toggleForm}
            addListing={this.addListing}
          />
        ) : null}
      </nav>
    );
  }
}

export default Header;
