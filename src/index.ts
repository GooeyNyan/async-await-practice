import EventHub from "./EventHub";

const inputEl: HTMLElement = <HTMLElement>document.getElementById("input");
const buttonA: HTMLElement = <HTMLElement>document.getElementById("buttonA");
const buttonB: HTMLElement = <HTMLElement>document.getElementById("buttonB");
const buttonC: HTMLElement = <HTMLElement>document.getElementById("buttonC");

const promiseSomething = (somthing: any, time: number) => {
  return new Promise(resolve => {
    setTimeout(() => resolve(somthing), time);
  });
};

const getCoffee = () => promiseSomething("☕️", 1500);

const getHamburger = () => promiseSomething("🍔", 500);

const getHeart = () => promiseSomething("❤️", 1000);

const handleWrapper = (f: Function) => async (...args) => {
  console.log(`${f.name} start.`);
  inputEl.value = await f();
  console.log(`${f.name} end.`);
};

const handleClickOnButtonA = handleWrapper(getCoffee);
const handleClickOnButtonB = handleWrapper(getHamburger);
const handleClickOnButtonC = handleWrapper(getHeart);

const eventHub = new EventHub();
eventHub.on("clickOnA", handleClickOnButtonA);
eventHub.on("clickOnB", handleClickOnButtonB);
eventHub.on("clickOnC", handleClickOnButtonC);

const bindClickEvent = (el: HTMLElement, event: string, ...args: any[]) => {
  el.addEventListener("click", () => {
    eventHub.emit(event, ...args);
  });
};

bindClickEvent(buttonA, "clickOnA", `A`, `A`);
bindClickEvent(buttonA, "clickOnA", 1, 1);
bindClickEvent(buttonB, "clickOnB", `B`, 2);
bindClickEvent(buttonC, "clickOnC", `C`, 3, 2, 1);
