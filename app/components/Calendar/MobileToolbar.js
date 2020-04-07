import React from 'react';

export default class MobileToolbar extends React.Component {
    render() {
      return (
        <div className="rbc-btn-group">
            <button
              className="toolbar-navigation-button"
              type="button"
              onClick={() => this.props.onNavigate('PREV')}
            >
              <Icon
                className="navigate-icon"
                icon={this.props.isRTL ? 'chevron-right' : 'chevron-left'}
              />
            </button>
            <span
              className="today-label"
              onClick={() => this.props.onNavigate('TODAY')}
            >
              {i18n('calendar-today')}
            </span>
            <button
              className="toolbar-navigation-button"
              type="button"
              onClick={() => this.props.onNavigate('NEXT')}
            >
              <Icon
                className="navigate-icon"
                icon={this.props.isRTL ? 'chevron-left' : 'chevron-right'}
              />
            </button>
          </div>
       
      );
    }
  }