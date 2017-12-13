export default class EventHub {
  private listeners: Map<string, Function>;
  private isHanging: boolean;
  private queue: string[];

  public constructor() {
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
  public on(event: string, method: Function) {
    const promisingMethod = this.methodWrapper(method);
    this.listeners.set(event, promisingMethod);
  }

  /**
   * process the event passed.
   * @param event the event should be process
   * @param arg the arguments should be pass to the method
   */
  public async emit(event: string, ...arg) {
    if (this.shouldEmit()) {
      this.hangOn();
      const method = this.listeners.get(event);
      await method(...arg);
      this.hangOff();
      if (this.hasMoreEventInQueue()) {
        this.emit(this.getEventFromQueue());
      }
    } else {
      this.queue.push(event);
    }
  }

  /**
   * delete corresponding event and method from the listeners
   * @param event the name of the event which should be deleted
   */
  public off(event: string) {
    this.listeners.delete(event);
  }

  /**
   * hand on the isHanging status to block emit events
   */
  private hangOn() {
    this.isHanging = true;
  }

  /**
   * hand off the isHanging status to let the event be process
   */
  private hangOff() {
    this.isHanging = false;
  }

  /**
   * helper funtions
   */

  /**
   * wrap the origin method to block thread
   * @param method
   */
  private methodWrapper(method) {
    return async (...arg) => {
      await method(...arg);
      return Promise.resolve("");
    };
  }

  /**
   * judge if the event whether should be emit based on the isHanging state
   */
  private shouldEmit(): boolean {
    return !this.isHanging;
  }

  private hasMoreEventInQueue(): boolean {
    return !!this.queue.length;
  }

  private getEventFromQueue(): string {
    return this.queue.shift();
  }
}