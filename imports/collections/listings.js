import { Mongo } from 'meteor/mongo';

Meteor.methods({
  'listings.insert': function() {
    return Listings.insert({
      createdAt: new Date(),
      name: '',
      time: '',
    });
  },

  'listings.remove': function(listing) {
    return Listings.remove(listing);
  }
});

export const Listings = new Mongo.Collection('listings');
