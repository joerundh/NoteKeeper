class MessageBox {
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

class InformationBox extends MessageBox {
    constructor(infoText) {
        super(infoText);

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

class YesNoPromptBox extends MessageBox {
    constructor(promptText, f1, f2 = () => {}) {
        super(promptText);
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