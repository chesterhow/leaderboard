import { Mongo } from 'meteor/mongo';
import { check } from 'meteor/check';

Meteor.methods({
  'listings.insert'(listing) {
    check(listing, {
      name: String,
      time: String,
    });

    Listings.insert({
      createdAt: new Date(),
      name: listing.name,
      time: listing.time,
    });
  },

  'listings.remove'(listing) {
    return Listings.remove(listing);
  },
});

export const Listings = new Mongo.Collection('listings');
