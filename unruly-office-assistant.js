/**
 * A button.
 * 
 * @element unruly-office-assistant
*/

export default class UnrulyOfficeAssistant extends HTMLElement {
    
    static get styles() {
        return `
        <style>
            button {
                display: flex;
                font-family: sans-serif;
                font-weight: 500;
                font-size: 24px;
            	cursor: pointer;
                color:#ffffff;
                border: none;
                border-radius:12px;
                height: 50px;
                justify-content: space-around;
                align-items: center;
            }
            </style>
        `;
    }
  
    static get markup() { 
        return `
            <button id="button-container">
              <div id="icon">🐷</div>
              <div id="label"><slot></slot></div>
            </button>
        `;
    }
 
    static get observedAttributes() { 
        return ['color', 'width'];
    }

    constructor() {
        super();
        const template = document.createElement('template');
        template.innerHTML = this.constructor.styles + this.constructor.markup;
        this.attachShadow({ mode: 'open' });
        this.shadowRoot.appendChild(template.content.cloneNode(true));
        this.initializeElements();
    }
  
    connectedCallback() {
        this.addEventListeners();
    }
    
    disconnectedCallback() {
        this.removeEventListeners();
    }
    
    initializeElements() {
        this.icon = this.shadowRoot.querySelector('#icon');
        this.button = this.shadowRoot.querySelector('#button-container');
    }
  
    addEventListeners() {
        this.pressedCallback = this.buttonPressed.bind(this);
        this.button.addEventListener('click', this.pressedCallback);
    }
    
    removeEventListeners() {
        this.button.removeEventListener('click', this.pressedCallback);
    }
    
    buttonPressed() {
        alert('Hello, World!');
    }
    
    attributeChangedCallback(name, oldValue, newValue) {
        if (name === 'color'){
            this.button.style['background-color'] = newValue;
        }
        if (name === 'width'){
            this.button.style.width = `${newValue}px`;
        }
    }
}

customElements.define('unruly-office-assistant', UnrulyOfficeAssistant);
