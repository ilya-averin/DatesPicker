import React from "react";
import ReactDOM from "react-dom";
import "react-dates/initialize";
import "react-dates/lib/css/_datepicker.css";
import {
  DateRangePicker,
  SingleDatePicker,
  DayPickerRangeController
} from "react-dates";

import "./App.css";

export default class IncorporationForm extends React.Component {
  constructor() {
    super();
    this.state = {
      focusedInput: null,
      fullscreen: false,
      direction: "left",
      dateFormat: "MM/DD/YYYY",
      small: false,
      block: false,
      orientation: "horizontal",
      numMonths: 2,
      minimumNights: 7,
      arrayData: [
        {
          startDate: null,
          endDate: null,
          block: false,
          small: false,
          orientation: "horizontal",
          startDateId: "2",
          endDateId: "1"
        }
      ],

      name: "",
      shareholders: [{ name: "" }]
    };
    this.handleDatesChange = this.handleDatesChange.bind(this);
    this.handleFocusChange = this.handleFocusChange.bind(this);
    this.handleChangeFullscreen = this.handleChangeFullscreen.bind(this);
    this.handleChangeDirection = this.handleChangeDirection.bind(this);
    this.handleChangeDateFormat = this.handleChangeDateFormat.bind(this);
    this.handleIsDayBlocked = this.handleIsDayBlocked.bind(this);
  }

  handleDatesChange(startDate, endDate, index) {
		this.setState({ startDate, endDate });
		console.log(this.state.focusedInput, index);
	}
// 	handleDatesChange = (startDate, endDate, index) => {
//     this.setState(prevState => ({
//       arrayData: {
//         ...prevState.arrayData,
//         [prevState.arrayData[index].startDate]: startDate,
//         [prevState.arrayData[index].endDate]: endDate
//       }
//     }));
// };

  handleFocusChange(focusedInput) {
		this.setState({ focusedInput });
		console.log(focusedInput);
  }

  handleChangeFullscreen() {
    this.setState({ fullscreen: !this.state.fullscreen });
  }

  handleChangeDirection(e) {
    this.setState({ direction: e.target.value });
  }

  handleChangeDateFormat(e) {
    this.setState({ dateFormat: e.target.value });
  }

  handleIsDayBlocked(day) {
    return this.BLOCKED_DATES.filter(d => d.isSame(day, "day")).length > 0;
  }

  handleShareholderNameChange = idx => evt => {
    const newShareholders = this.state.shareholders.map((shareholder, sidx) => {
      if (idx !== sidx) return shareholder;
      return { ...shareholder, name: evt.target.value };
    });

    this.setState({ shareholders: newShareholders });
  };
	
  handleAdd = () => {
    this.setState({
      arrayData: this.state.arrayData.concat([
        {
          id: 0,
          start_date: "",
          end_date: "",
          focusedInput: {}
        }
      ])
    });
  };

  handleRemoveShareholder = idx => () => {
    this.setState({
      shareholders: this.state.shareholders.filter((s, sidx) => idx !== sidx)
    });
  };

  render() {
		console.log(this.state.arrayData)
    return (
      <div>
        {this.state.arrayData.map((datepicker, index) => (
          <DateRangePicker
						// startDateId={}
						// endDateId={} 
            key={index}
            onDatesChange={({startDate, endDate}) => this.handleDatesChange(index, {startDate, endDate}) /*, index*/}
            focusedInput={this.state.focusedInput}
						// onFocusChange={this.handleFocusChange}
						onFocusChange={focusedInput => this.setState({ focusedInput })}
            hideKeyboardShortcutsPanel={true}
            {...datepicker}
          />
        ))}

        <button type="button" onClick={this.handleAdd} className="addPicker">
          +Add
        </button>
      </div>
    );
  }
}

const rootElement = document.getElementById("root");
ReactDOM.render(<IncorporationForm />, rootElement);


