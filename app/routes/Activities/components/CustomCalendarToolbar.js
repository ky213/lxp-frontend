import React from 'react';
import PropTypes from 'prop-types';
import clsx from 'clsx';

class CustomCalendarToolBar extends React.PureComponent {
  handleChange = (event) => {
    this.props.onView(event.target.value);
  };

  view = (view) => {
    this.props.onView(view);
  };

  viewNamesGroup(messages) {
    let viewNames = this.props.views;
    const view = this.props.view;

    if (viewNames.length > 1) {
      return viewNames.map((name) => (
        <button
          type="button"
          key={name}
          className={clsx({ 'rbc-active': view === name })}
          onClick={this.view.bind(null, name)}
        >
          {messages[name]}
        </button>
      ));
    }
  }

  render() {
    const {
      view,
      views,
      onNavigate,
      label,
      onAddNew,
      localizer: { messages },
    } = this.props;

    return (
      <div className="rbc-toolbar">
        <span className="rbc-btn-group">
          <span className="title">Activities</span>
          <button type="button" onClick={() => onNavigate('TODAY')}>
            Today
          </button>
          <button type="button" onClick={() => onNavigate('PREV')}>
            Back
          </button>
          <button type="button" onClick={() => onNavigate('NEXT')}>
            Next
          </button>
          <button type="button" className="add-new-event" onClick={onAddNew}>
            +
          </button>
        </span>
        <span className="rbc-toolbar-label">{label}</span>
        <span className="rbc-btn-group">{this.viewNamesGroup(messages)}</span>
      </div>
    );
  }
}

CustomCalendarToolBar.propTypes = {
  onView: PropTypes.func,
  onNavigate: PropTypes.func,
  label: PropTypes.string,
  view: PropTypes.string,
  views: PropTypes.array,
};

export default CustomCalendarToolBar;
