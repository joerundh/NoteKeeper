class AlertBox {
    constructor(messageText) {
        this.promptBackground = document.createElement("div");
        this.promptBackground.className = "prompt-background";

        this.promptBox = document.createElement("div");
        this.promptBox.className = "prompt-box";

        this.main = document.createElement("main");
        this.main.innerHTML = messageText;

        this.footer = document.createElement("footer");

        this.promptBox.appendChild(this.main);
    }

    open() {
        document.body.appendChild(this.promptBackground);
        document.body.appendChild(this.promptBox);
    }

    close() {
        document.body.removeChild(this.promptBox);
        document.body.removeChild(this.promptBackground);
    }
}

class InfoAlert extends AlertBox {
    constructor(text) {
        super(text);

        this.promptBackground.addEventListener("click", (event) => {
            this.close();
        });

        this.okayButton = document.createElement("button");
        this.okayButton.innerHTML = "&#x2713;";
        this.okayButton.className = "okay-button";

        this.okayButton.addEventListener("click", (event) => {
            this.close();
        });

        this.footer.appendChild(this.okayButton);
        this.promptBox.appendChild(this.footer);
    }
}

function informationBox(text) {
    setTimeout(() => {
        new InfoAlert(text).open();
    });
}

class PromptAlert extends AlertBox {
    constructor(promptText, f1, f2 = () => {}, f3 = () => {}) {
        super(promptText);
        this.promptBox.style.userSelect = "none";
        this.promptBox.appendChild(this.footer);

        this.yesButton = document.createElement("button");
        this.yesButton.innerHTML = "&#x2713;";
        this.yesButton.className = "yes-button";
        this.yesButton.name = "yes-button";

        this.noButton = document.createElement("button");
        this.noButton.innerHTML = "&#x2717;";
        this.noButton.className = "no-button";
        this.noButton.name = "no-button";

        this.promptBox.children[1].appendChild(this.yesButton);
        this.promptBox.children[1].appendChild(this.noButton);

        this.responsePromise = new Promise((resolve) => {
            const listener = (event) => {
                this.close();
                if (event.target.name === "yes-button") f1();
                else if (event.target.name === "no-button") f2();
                f3();
            };
            this.yesButton.addEventListener("click", listener);
            this.noButton.addEventListener("click", listener);
        });
    }

    async run() {
        this.open();
        await this.responsePromise;
    }
}

function promptAlert(text, f1, f2 = () => {}, f3 = () => {}) {
    setTimeout(() => {
        new PromptAlert(text, f1, f2, f3).open();
    });
}

class SmallAlert {
    constructor(message) {
        this.alertBox = document.createElement("div");
        this.alertBox.className = "alert-box";
        this.alertBox.innerHTML = message;
    }

    fadeIn() {
        this.alertBox.style.animationName = "fadeIn";
        this.alertBox.style.animationIterationCount = 1;
        this.alertBox.style.animationTimingFunction = "ease-in";
        this.alertBox.style.animationDuration = "1s";
    }

    fadeOut() {
        this.alertBox.style.animationName = "fadeOut";
        this.alertBox.style.animationIterationCount = 1;
        this.alertBox.style.animationTimingFunction = "ease-in";
        this.alertBox.style.animationDuration = "1s";
    }

    open() {
        let listener = (event) => {
            clearTimeout(fadeOutTimeout);
            document.body.removeChild(this.alertBox);
            document.body.removeEventListener("click", listener);
        };

        this.fadeIn();
        document.body.appendChild(this.alertBox);

        let fadeOutTimeout = setTimeout(() => {
            this.fadeOut();
            setTimeout(() => {
                listener();
            }, 1000);
        }, 2000);

        document.body.addEventListener("click", listener);
    }
}

function smallAlert(message) {
    setTimeout(() => {
        new SmallAlert(message).open();
    }, 1);
}