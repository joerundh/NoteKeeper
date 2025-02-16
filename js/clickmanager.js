class ClickManager {
    constructor() {
        this.clickFunctions = new Map();
        this.dblClickFunctions = new Map();
        this.register = null;
    }

    notifyClick(element) {
        if (this.register === element) {
            this.register = null;
            this.dblClickFunctions.get(element)();
        } else {
            this.register = element;
            setTimeout(() => {
                if (this.register === element) {
                    this.register = null;
                    this.clickFunctions.get(element)();
                }
            }, 500);
        }
    }

    listenToElement(element, f1, f2) {
        this.clickFunctions.set(element, f1);
        this.dblClickFunctions.set(element, f2);
        element.addEventListener("click", (event) => {
            this.notifyClick(element);
        });
    }
}