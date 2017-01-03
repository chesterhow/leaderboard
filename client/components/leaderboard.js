import React, { Component } from 'react';
import { createContainer } from 'meteor/react-meteor-data';
import { Listings } from '../../imports/collections/listings';

import Listing from './listing';

class Leaderboard extends Component {
  constructor(props) {
    super(props);

    this.state = {
      confirmation: false,
      listingToRemove: {},
    };

    this.toggleConfirmation = this.toggleConfirmation.bind(this);
    this.removeListing = this.removeListing.bind(this);
    this.onRemoveClick = this.onRemoveClick.bind(this);
  }

  toggleConfirmation() {
    this.setState({ confirmation: !this.state.confirmation });
  }

  removeListing() {
    Meteor.call('listings.remove', this.state.listingToRemove);

    this.toggleConfirmation();
    this.setState({ listingToRemove: {} });
  }

  onRemoveClick(listing) {
    this.toggleConfirmation();
    this.setState({ listingToRemove: listing });
  }

  renderListings() {
    const { listings } = this.props;

    if (listings.length === 0) {
      return (
        <li className="table-empty-row">No listings added</li>
      );
    }

    listings.sort((a, b) => {
      return a.time - b.time;
    });

    let rank = 0;

    return listings.map(listing => {
      rank++;

      return (
        <Listing
          key={listing._id}
          listing={listing}
          rank={rank}
          removeListing={this.onRemoveClick}
        />
      );
    });
  }

  render() {
    console.log(this.props.listings);
    return (
      <div className="leaderboard">
        <div className="table-headings">
          <div className="table-heading table-rank-col">Rank</div>
          <div className="table-heading table-name-col">Name</div>
          <div className="table-heading table-time-col">Time</div>
        </div>
        <ul className="table-rows">
          {this.renderListings()}
        </ul>
        {(this.state.confirmation) ? (
          <div className="overlay">
            <div className="confirmation-box">
              <p>Remove this listing?</p>
              <div className="confirmation-buttons">
                <input
                  className="button remove-button"
                  type="button"
                  value="Remove"
                  onClick={this.removeListing}
                />
                <input
                  className="button cancel-button"
                  type="button"
                  value="Cancel"
                  onClick={this.toggleConfirmation}
                />
              </div>
            </div>
          </div>
        ) : null}
      </div>
    );
  }
}

export default createContainer(() => {
  Meteor.subscribe('listings');

  return { listings: Listings.find({}).fetch() };
}, Leaderboard);
