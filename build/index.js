"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const EventHub_1 = require("./EventHub");
const inputEl = document.getElementById("input");
const buttonA = document.getElementById("buttonA");
const buttonB = document.getElementById("buttonB");
const getCoffee = () => {
    return new Promise(resolve => {
        setTimeout(() => resolve("☕️"), 3000);
    });
};
const getHamburger = () => {
    return new Promise(resolve => {
        setTimeout(() => resolve("🍔"), 1000);
    });
};
const handleClickOnButtonA = async (...arg) => {
    inputEl.value = await getCoffee();
    console.log(arg);
};
const handleClickOnButtonB = async (...arg) => {
    inputEl.value = await getHamburger();
    console.log(arg);
};
const eventHub = new EventHub_1.default();
eventHub.on("clickOnA", handleClickOnButtonA);
eventHub.on("clickOnB", handleClickOnButtonB);
buttonA.addEventListener("click", () => {
    eventHub.emit("clickOnA", `dasd`, `sadf`);
});
buttonB.addEventListener("click", () => {
    eventHub.emit("clickOnB", 123, 312);
});
//# sourceMappingURL=index.js.map