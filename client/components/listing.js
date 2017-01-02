import React, { PropTypes } from 'react';

const Listing = ({ listing, removeListing}) => {
  return (
    <li>
      <span>1</span>
      <span>{listing.name}</span>
      <span>{listing.time}</span>
      <input
        type="button"
        value="x"
        onClick={() => removeListing(listing)}
      />
    </li>
  );
}

Listing.propTypes = {
  listing: PropTypes.object,
  removeListing: PropTypes.func,
};

export default Listing;
