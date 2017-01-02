import React, { Component } from 'react';
import { createContainer } from 'meteor/react-meteor-data';
import { Listings } from '../../imports/collections/listings';

class Leaderboard extends Component {
  renderListings() {
    return this.props.listings.map(listing => {
      return (
        <li key={listing._id}>
          {listing._id}
        </li>
      );
    });
  }

  render() {
    console.log(this.props.listings);
    return (
      <ul>
        {this.renderListings()}
      </ul>
    );
  }
}

export default createContainer(() => {
  Meteor.subscribe('listings');

  return { listings: Listings.find({}).fetch() };
}, Leaderboard);
