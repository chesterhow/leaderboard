import React, { Component, PropTypes } from 'react';
import { Listings } from '../../imports/collections/listings';

function isEmpty(value) {
  return !/\S/.test(value);
}

function isInteger(value) {
  return Number.isInteger(parseInt(value), 10);
}

function isValidTime(value) {
  return value >= 0 && value <= 59;
}

function appendZero(number) {
  return (`0${number}`).slice(-2);
}

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
      errors: {
        name: false,
        timeMM: false,
        timeSS: false,
        timeMS: false,
      },
      errorMessage: '',
    };

    this.updateValues = this.updateValues.bind(this);
    this.validateFields = this.validateFields.bind(this);
  }

  componentDidMount() {
    this.nameInput.focus();
  }

  focusNextField(event, nextField) {
    if (event.target.value.length == 2) {
      nextField.focus();
    }
  }

  updateValues(event, key) {
    const { formValues } = this.state;
    formValues[key] = event.target.value;

    this.setState({ formValues });
  }

  validateFields() {
    const { formValues: { name, timeMM, timeSS, timeMS } } = this.state;
    const errors = {
      name: false,
      timeMM: false,
      timeSS: false,
      timeMS: false,
    }
    let errorMessage = '';
    const emptyFieldsError = 'All fields must be filled';
    const notIntegerError = 'Only numbers allowed for time';
    const invalidTimeError = 'Time values must be a number between 0 to 59';

    if (isEmpty(name) || isEmpty(timeMM) || isEmpty(timeSS) || isEmpty(timeMS)) {
      errorMessage = emptyFieldsError;
      errors.name = isEmpty(name);
      errors.timeMM = isEmpty(timeMM);
      errors.timeSS = isEmpty(timeSS);
      errors.timeMS = isEmpty(timeMS);
    } else if (!isInteger(timeMM) || !isInteger(timeSS) || !isInteger(timeMS)) {
      errorMessage = notIntegerError;
      errors.timeMM = !isInteger(timeMM);
      errors.timeSS = !isInteger(timeSS);
      errors.timeMS = !isInteger(timeMS);
    } else if (!isValidTime(timeMM) || !isValidTime(timeSS) || !isValidTime(timeMS)) {
      errorMessage = invalidTimeError;
      errors.timeMM = !isValidTime(timeMM);
      errors.timeSS = !isValidTime(timeSS);
      errors.timeMS = !isValidTime(timeMS);
    }

    this.setState({ errors, errorMessage }, () => {
      this.addListing();
    });
  }

  addListing() {
    if (this.state.errorMessage === '') {
      const { formValues: { name, timeMM, timeSS, timeMS } } = this.state;
      const time = `${appendZero(timeMM)}${appendZero(timeSS)}${appendZero(timeMS)}`;

      const listing = { name, time };

      this.props.addListing(listing);
      this.props.toggleForm();
    }
  }

  render() {
    const { formValues: { name, timeMM, timeSS, timeMS }, errors, errorMessage } = this.state;
    const errorClass = ' form-textbox-error';

    return (
      <div className="overlay">
        <div className="add-form-box">
          <h2 className="form-title">Add new listing</h2>
          <img className="close-image" src="images/cross.svg" onClick={this.props.toggleForm} />

          <div className="form-field">
            <p className="form-label">Name</p>
            <input
              ref={(input) => { this.nameInput = input; }}
              className={`form-textbox form-name-textbox ${errors.name ? errorClass : null}`}
              type="text"
              value={name}
              onChange={(event) => this.updateValues(event, 'name')}
            />
          </div>

          <div className="form-field">
            <p className="form-label">Time</p>
            <input
              className={`form-textbox form-time-textbox ${errors.timeMM ? errorClass : null}`}
              type="text"
              maxLength="2"
              value={timeMM}
              onChange={(event) => this.updateValues(event, 'timeMM')}
              onKeyUp={(event) => this.focusNextField(event, this.timeSSInput)}
            />
            <span>&nbsp;:&nbsp;</span>
            <input
              className={`form-textbox form-time-textbox ${errors.timeSS ? errorClass : null}`}
              type="text"
              maxLength="2"
              value={timeSS}
              ref={(input) => { this.timeSSInput = input; }}
              onChange={(event) => this.updateValues(event, 'timeSS')}
              onKeyUp={(event) => this.focusNextField(event, this.timeMSInput)}
            />
            <span>&nbsp;:&nbsp;</span>
            <input
              className={`form-textbox form-time-textbox ${errors.timeMS ? errorClass : null}`}
              type="text"
              maxLength="2"
              value={timeMS}
              ref={(input) => { this.timeMSInput = input; }}
              onChange={(event) => this.updateValues(event, 'timeMS')}
            />
          </div>

          <div className="form-bottom">
            <p className="form-error-message">{errorMessage}</p>
            <input
              className="button confirm-button"
              type="button"
              value="Confirm"
              onClick={this.validateFields}
            />
          </div>
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
