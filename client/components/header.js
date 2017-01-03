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
      <div className="header">
        <div className="header-container">
          <div className="header-box">
            <p className="header-title">Leaderboard</p>
          </div>
          <div className="header-box">
            <input
              className="button header-button"
              type="button"
              value="ADD"
              onClick={this.toggleForm}
            />
          </div>
        </div>
        {(this.state.showAddForm) ? (
          <AddForm
            toggleForm={this.toggleForm}
            addListing={this.addListing}
          />
        ) : null}
      </div>
    );
  }
}

export default Header;
