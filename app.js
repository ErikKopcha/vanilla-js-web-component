class MyCounter extends HTMLElement {
  constructor() {
    super();

    this.shadow = this.attachShadow({ mode: "open" });
  }

  get count() {
    return this.getAttribute("count");
  }

  set count(val) {
    this.setAttribute("count", val);
  }

  connectedCallback() {
    this.render();
  }

  static get observedAttributes() {
    return ["count"];
  }

  attributeChangedCallback(prop, oldVal, newVal) {
    if (prop === "count") {
      this.render();
    }
  }

  increment() {
    this.count++;
  }

  render() {
    this.shadow.innerHTML = `
        <h1>Counter</h1>
        ${this.count}
        <button id="btnIncrement">Increment</button>
    `;

    this.triggers();
  }

  triggers() {
    let btnIncr = this.shadow.querySelector("#btnIncrement");
    btnIncr.addEventListener("click", this.increment.bind(this));
  }
}

customElements.define("my-counter", MyCounter);
