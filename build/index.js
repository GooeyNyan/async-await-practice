"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const EventHub_1 = require("./EventHub");
const inputEl = document.getElementById("input");
const buttonA = document.getElementById("buttonA");
const buttonB = document.getElementById("buttonB");
const buttonC = document.getElementById("buttonC");
const promiseSomething = (somthing, time) => {
    return new Promise(resolve => {
        setTimeout(() => resolve(somthing), time);
    });
};
const getCoffee = () => promiseSomething("☕️", 1500);
const getHamburger = () => promiseSomething("🍔", 500);
const getHeart = () => promiseSomething("❤️", 1000);
const handleWrapper = (f) => async (...args) => {
    console.log(`${f.name} start.`);
    inputEl.value = await f();
    console.log(`${f.name} end.`);
};
const handleClickOnButtonA = handleWrapper(getCoffee);
const handleClickOnButtonB = handleWrapper(getHamburger);
const handleClickOnButtonC = handleWrapper(getHeart);
const eventHub = new EventHub_1.default();
eventHub.on("clickOnA", handleClickOnButtonA);
eventHub.on("clickOnB", handleClickOnButtonB);
eventHub.on("clickOnC", handleClickOnButtonC);
const bindClickEvent = (el, event, ...args) => {
    el.addEventListener("click", () => {
        eventHub.emit(event, ...args);
    });
};
bindClickEvent(buttonA, "clickOnA", `A`, `A`);
bindClickEvent(buttonA, "clickOnA", 1, 1);
bindClickEvent(buttonB, "clickOnB", `B`, 2);
bindClickEvent(buttonC, "clickOnC", `C`, 3, 2, 1);
//# sourceMappingURL=index.js.map