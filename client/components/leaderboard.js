import React, { Component } from 'react';
import { createContainer } from 'meteor/react-meteor-data';
import { Listings } from '../../imports/collections/listings';

import Listing from './listing';

class Leaderboard extends Component {
  onListingRemove(listing) {
    Meteor.call('listings.remove', listing);
  }

  renderListings() {
    return this.props.listings.map(listing => {
      return (
        <Listing
          key={listing._id}
          listing={listing}
          removeListing={this.onListingRemove}
        />
      );
    });
  }

  render() {
    console.log(this.props.listings);
    return (
      <div>
        <span>Rank</span>
        <span>Name</span>
        <span>Time</span>
        <ul>
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
