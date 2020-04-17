import React, { PureComponent } from 'react';
import { newGuid } from '../utils';

function addEvent({ eventType, onRecevivedEvent }) {
  console.log('add pusherEvent listener', eventType);
  document.addEventListener(eventType, onRecevivedEvent, true);
}

function removeEvent({ eventType, onRecevivedEvent }) {
  console.log('remove pusherEvent listener', eventType);
  if (document.removeEventListener) {
    document.removeEventListener(eventType, onRecevivedEvent, true);
  } else if (document.detachEvent) {
    document.detachEvent(eventType, onRecevivedEvent, true);
  }
}

const eventListener = WrappedComponent => {
  class EventListenerWrapper extends PureComponent {
    constructor(props) {
      super(props);
      this.state = {
        eventHandlers: [],
      };
      this.onAddEvent = this.onAddEvent.bind(this);
      this.onRemoveEvent = this.onRemoveEvent.bind(this);
    }

    componentWillMount() {
      this.state.eventHandlers.forEach(e => addEvent(e));
    }

    componentWillUnmount() {
      this.state.eventHandlers.forEach(e => removeEvent(e));
    }

    onAddEvent(eventType, onRecevivedEvent, id = null) {
      const eventHandlers = this.state.eventHandlers;
      eventHandlers.push({ id: !id ? newGuid() : id, eventType, onRecevivedEvent });
      this.setState({ eventHandlers }, () => addEvent({ eventType, onRecevivedEvent }));
    }

    onRemoveEvent(eventType, onRecevivedEvent) {
      const eventHandlers = this.state.eventHandlers;
      const eventListenerFound = eventHandlers.find(
        e => e.onRecevivedEvent === onRecevivedEvent && e.eventType === eventType,
      );
      if (eventListenerFound !== undefined) {
        this.setState(
          { eventHandlers: eventHandlers.filter(e => e.id !== eventListenerFound.id) },
          () => {
            removeEvent(eventListenerFound);
          },
        );
      }
    }

    render() {
      return (
        <WrappedComponent
          {...this.props}
          addEventListener={this.onAddEvent}
          removeEventListener={this.onRemoveEvent}
        />
      );
    }
  }

  return EventListenerWrapper;
};

export default eventListener;
