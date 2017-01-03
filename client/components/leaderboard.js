import React, { Component } from 'react';
import { createContainer } from 'meteor/react-meteor-data';
import { Listings } from '../../imports/collections/listings';

import Listing from './listing';

class Leaderboard extends Component {
  onListingRemove(listing) {
    Meteor.call('listings.remove', listing);
  }

  renderListings() {
    const { listings } = this.props;
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
          removeListing={this.onListingRemove}
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
      </div>
    );
  }
}

export default createContainer(() => {
  Meteor.subscribe('listings');

  return { listings: Listings.find({}).fetch() };
}, Leaderboard);
