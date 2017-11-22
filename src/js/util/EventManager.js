import Event from "util/Event";
class EventManager {

    events: Map<Event, Array>;

    constructor() {
        this.events = {};
    }

    when(event: Event, observer: Function, ...rest: any[]) {
        this.observers(event).push({observer: observer, params: rest});
    }

    on(eventKey: Event, ...rest: any[]) {
        this.observers(eventKey).forEach(
            function (observerAndParams) {
                observerAndParams.observer(...rest, ...observerAndParams.params);
            }
        );
    }

    observers(eventKey: Event): Array {
        if (!this.events[eventKey]) {
            this.events[eventKey] = [];
        }
        return this.events[eventKey];
    }

}

export default new EventManager();