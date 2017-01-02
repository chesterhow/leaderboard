import React from 'react';
import ReactDOM from 'react-dom';

import App from './components/app';
import { Listings } from '../imports/collections/listings';

Meteor.startup(() => {
  ReactDOM.render(<App />, document.querySelector('.render-target'));
});
