import React from 'react';
import ReactDOM from 'react-dom';

Meteor.startup(() => {
  ReactDOM.render(<div>Hello</div>, document.querySelector('.render-target'));
});
