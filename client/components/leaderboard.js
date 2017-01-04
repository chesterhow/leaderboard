import React, { Component } from 'react';
import { createContainer } from 'meteor/react-meteor-data';
import { Listings } from '../../imports/collections/listings';

import Listing from './listing';

class Leaderboard extends Component {
  constructor(props) {
    super(props);

    this.state = {
      page: 1,
      confirmation: false,
      listingToRemove: {},
    };

    this.togglePage = this.togglePage.bind(this);
    this.toggleConfirmation = this.toggleConfirmation.bind(this);
    this.removeListing = this.removeListing.bind(this);
    this.onRemoveClick = this.onRemoveClick.bind(this);
  }

  togglePage(change) {
    const { page } = this.state;
    const { listings } = this.props;
    const nextPage = page + change;
    if (nextPage > 0 && nextPage < (listings.length / 10) + 1) {
      this.setState({ page: nextPage });
    }
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
    const { page } = this.state;
    const lastIndex = page * 10;
    const firstIndex = lastIndex - 10;
    const currPageListings = listings.slice(firstIndex, lastIndex);

    if (currPageListings.length === 0) {
      return (
        <li className="table-empty-row">No listings added</li>
      );
    }

    let rank = page * 10 - 10;
    let hideBorder = false;

    return currPageListings.map(listing => {
      rank++;
      hideBorder = false;

      if (rank % 10 === 1) {
        hideBorder = true;
      }

      return (
        <Listing
          key={listing._id}
          rank={rank}
          listing={listing}
          hideBorder={hideBorder}
          removeListing={this.onRemoveClick}
        />
      );
    });
  }

  renderLatestListing() {
    const { latestListing, listings } = this.props;

    if (listings.length > 0) {
      if (latestListing) {
        let rank = 0;

        for (let i = 0; i < listings.length; i++) {
          if (listings[i]._id === latestListing._id) {
            rank = i + 1;
          }
        }

        return (
          <Listing
            hideBorder
            rank={rank}
            listing={latestListing}
            removeListing={this.onRemoveClick}
          />
        );
      }
    }
  }

  render() {
    return (
      <div>
        <div className="container">
          <div className="table-headings">
            <div className="table-heading">Latest</div>
          </div>
          <ul className="table-rows">
            {this.renderLatestListing()}
          </ul>
        </div>

        <div className="container">
          <div className="table-headings">
            <div className="table-heading table-rank-col">Rank</div>
            <div className="table-heading table-name-col">Name</div>
            <div className="table-heading table-time-col">Time</div>
          </div>
          <ul className="table-rows">
            {this.renderListings()}
          </ul>
          <div className="pagination-arrows">
            <img
              src="images/arrow.svg"
              className="pagination-button pagination-left-button"
              onClick={() => this.togglePage(-1)}
            />
            <img
              src="images/arrow.svg"
              className="pagination-button pagination-right-button"
              onClick={() => this.togglePage(1)}
            />
          </div>
        </div>

        <div className="overflow">
          <p>A project by</p>
          <img src="images/overflow-logo.png" className="overflow-logo" />
        </div>

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

export default createContainer((props) => {
  Meteor.subscribe('listings');

  return {
    latestListing: Listings.findOne({}, { sort: { createdAt: -1, limit: 1 }}),
    listings: Listings.find({}, { sort: { time: 1 } }).fetch(),
  };
}, Leaderboard);
