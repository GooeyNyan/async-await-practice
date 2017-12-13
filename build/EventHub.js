"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
class EventHub {
    constructor() {
        this.listeners = new Map();
        this.isHanging = false;
        this.queue = [];
    }
    /**
     * register the event and corresponding method into the listeners
     * preprocess the event to be a promising method to adapt to async
     * @param event event name
     * @param method the method bind to the event
     */
    on(event, method) {
        const promisingMethod = this.methodWrapper(method);
        this.listeners.set(event, promisingMethod);
    }
    /**
     * process the event passed.
     * @param event the event should be process
     * @param arg the arguments should be pass to the method
     */
    async emit(event, ...arg) {
        if (this.shouldEmit()) {
            this.hangOn();
            const method = this.listeners.get(event);
            await method(...arg);
            this.hangOff();
            if (this.hasMoreEventInQueue()) {
                this.emit(this.getEventFromQueue());
            }
        }
        else {
            this.queue.push(event);
        }
    }
    /**
     * delete corresponding event and method from the listeners
     * @param event the name of the event which should be deleted
     */
    off(event) {
        this.listeners.delete(event);
    }
    /**
     * hand on the isHanging status to block emit events
     */
    hangOn() {
        this.isHanging = true;
    }
    /**
     * hand off the isHanging status to let the event be process
     */
    hangOff() {
        this.isHanging = false;
    }
    /**
     * helper funtions
     */
    /**
     * wrap the origin method to block thread
     * @param method
     */
    methodWrapper(method) {
        return async (...arg) => {
            await method(...arg);
            return Promise.resolve("");
        };
    }
    /**
     * judge if the event whether should be emit based on the isHanging state
     */
    shouldEmit() {
        return !this.isHanging;
    }
    hasMoreEventInQueue() {
        return !!this.queue.length;
    }
    getEventFromQueue() {
        return this.queue.shift();
    }
}
exports.default = EventHub;
//# sourceMappingURL=EventHub.js.map