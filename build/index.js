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
const handleClickOnButtonA = async () => {
    inputEl.value = await getCoffee();
};
const handleClickOnButtonB = async () => {
    inputEl.value = await getHamburger();
};
const eventHub = new EventHub_1.default();
eventHub.on("clickOnA", handleClickOnButtonA);
eventHub.on("clickOnB", handleClickOnButtonB);
buttonA.addEventListener("click", () => {
    eventHub.emit("clickOnA");
});
buttonB.addEventListener("click", () => {
    eventHub.emit("clickOnB");
});
//# sourceMappingURL=index.js.map