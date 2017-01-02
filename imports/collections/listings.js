import { Mongo } from 'meteor/mongo';

Meteor.methods({
  'listings.insert': function() {
    return Listings.insert({
      createdAt: new Date(),
      name: '',
      time: '',
    });
  }
});

export const Listings = new Mongo.Collection('listings');
