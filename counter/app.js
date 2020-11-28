function Counter(element, value) {
    this.counter = element;
    this.value = value;
    this.decreaseBtn = element.querySelector(".decrease");
    this.resetBtn = element.querySelector(".reset");
    this.increaseBtn = element.querySelector(".increase");
    this.valueDOM = element.querySelector(".value");
    this.valueDOM.textContent = value;
    // this.increase = this.increase.bind(this);
    this.increaseBtn.addEventListener("click", this.increase.bind(this)); // this.increaseBtn.increase.bind(this) здесь на кнопке increase мы вызываем метод addEventListener, который по клику вызывает на этой кнопке метод increase, которого у этой кнопки нет. Поэтому к метододу increase мы применяем метом bind (потому что нам не нужно мгновенно вызывать ф-цию, нужно только передать ссылку на неё в методо addEventListener). В bind мы указываем, что объект, к которому нужно применить метод increase - это this, а не this.increaseBtn.
    this.decrease = this.decrease.bind(this);
    // здесь мы заблаговременно передали ссылку на объект this в метод decrease
    this.decreaseBtn.addEventListener("click", this.decrease);
    this.reset = this.reset.bind(this);
    this.resetBtn.addEventListener("click", this.reset);
}

Counter.prototype.increase = function () {
    console.log(this);
    this.value++;
    this.valueDOM.textContent = this.value;
};

Counter.prototype.decrease = function () {
    this.value--;
    this.valueDOM.textContent = this.value;
};

Counter.prototype.reset = function () {
    this.value = 0;
    this.valueDOM.textContent = this.value;
};

const firstCounter = new Counter(getElement(".first-counter"), 100);
const secondCounter = new Counter(getElement(".second-counter"), 200);

function getElement(selector) {
    const element = document.querySelector(selector);
    if (element) {
        return element;
    }

    throw new Error(`Please, check ${selector}, threre is no such element`);
}
