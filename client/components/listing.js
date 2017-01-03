import React, { PropTypes } from 'react';

const Listing = ({ rank, listing, removeListing }) => {
  const { time } = listing;
  const formattedTime = `${time.substring(0, 2)}:${time.substring(2, 4)}:${time.substring(4, 6)}`;
  let className = "table-row";

  switch (rank) {
    case 1:
      className += " table-first-row";
      break;
    case 2:
      className += " table-second-row";
      break;
    case 3:
      className += " table-third-row";
      break;
  }

  return (
    <li className={className}>
      <div className="table-col table-rank-col">
        <div className="rank-box">#{rank}</div>
      </div>
      <div className="table-col table-name-col">{listing.name}</div>
      <div className="table-col table-time-col">{formattedTime}</div>
      <div className="table-col table-remove-col">
        <img
          className="remove-image"
          src="images/cross.svg"
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
