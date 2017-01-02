import React, { Component, PropTypes } from 'react';
import { Listings } from '../../imports/collections/listings';

class AddForm extends Component {
  constructor(props) {
    super(props);

    this.state = {
      formValues: {
        name: '',
        timeMM: '',
        timeSS: '',
        timeMS: '',
      },
    };

    this.updateValues = this.updateValues.bind(this);
    this.onAddClick = this.onAddClick.bind(this);
  }

  updateValues(event, key) {
    const { formValues } = this.state;
    formValues[key] = event.target.value;

    this.setState({ formValues });
  }

  onAddClick(event) {
    const { formValues: { name, timeMM, timeSS, timeMS } } = this.state;
    const time = `${timeMM}${timeSS}${timeMS}`;

    const listing = {
      name,
      time,
    };

    this.props.addListing(listing);
    this.props.toggleForm();
  }

  render() {
    const { formValues: { name, timeMM, timeSS, timeMS } } = this.state;
    return (
      <div className="add-form-overlay">
        <div className="add-form">
          <input type="button" value="x" onClick={this.props.toggleForm} />
          <h3>Name</h3>
          <input
            type="text"
            value={name}
            onChange={(event) => this.updateValues(event, 'name')}
          />

          <h3>Time</h3>
          <input
            type="text"
            value={timeMM}
            onChange={(event) => this.updateValues(event, 'timeMM')}
          />
          <span>:</span>
          <input
            type="text"
            value={timeSS}
            onChange={(event) => this.updateValues(event, 'timeSS')}
          />
          <span>:</span>
          <input
            type="text"
            value={timeMS}
            onChange={(event) => this.updateValues(event, 'timeMS')}
          />

          <input
            type="button"
            value="Add"
            onClick={this.onAddClick}
          />
        </div>
      </div>
    );
  }
}

AddForm.propTypes = {
  toggleForm: PropTypes.func,
  addListing: PropTypes.func,
};

export default AddForm;
