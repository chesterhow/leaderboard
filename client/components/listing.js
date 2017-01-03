import React, { PropTypes } from 'react';

const Listing = ({ rank, listing, removeListing }) => {
  const { time } = listing;
  const formattedTime = `${time.substring(0, 2)}:${time.substring(2, 4)}:${time.substring(4, 6)}`;

  return (
    <li className="table-row">
      <div className="table-col table-rank-col">#{rank}</div>
      <div className="table-col table-name-col">{listing.name}</div>
      <div className="table-col table-time-col">{formattedTime}</div>
      <div className="table-col table-remove-col">
        <input
          type="button"
          value="x"
          onClick={() => removeListing(listing)}
        />
      </div>
    </li>
  );
}

Listing.propTypes = {
  rank: PropTypes.number,
  listing: PropTypes.object,
  removeListing: PropTypes.func,
};

export default Listing;
