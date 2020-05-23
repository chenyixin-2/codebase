lg(GetScriptName());

{
    class Button {
        constructor(value) {
            this.value = value;
        }

        click() {
            lg(this.value);
        }
    }

    let button = new Button("hello");

    try {
        setTimeout(button.click, 1000); //  undefined 
    } catch (e) {
        lg(e);
    }
}

{
    class Button {
        constructor(value) {
            this.value = value;
            this.click = this.click.bind(this);    // <---------------- bind "this" to "click"
        }

        click() {
            lg(this.value);                                   // <-------------------  use "this"
        }
    }

    let button = new Button("hello");

    setTimeout(button.click, 1000); // hello
}

{
    class Button {
        constructor(value) {
            this.value = value;
        }
        click = () => {
            lg(this.value);
        }
    }
    let button = new Button("hello");
    setTimeout(button.click, 1000); // hello
}