import { Meteor } from 'meteor/meteor';
import { Listings } from '../imports/collections/listings';

Meteor.startup(() => {
  Meteor.publish('listings', function() {
    return Listings.find({});
  })
});
