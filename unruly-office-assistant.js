/**
 * A clippy-inspired office assistant that aims to help users with tips!
 * 
 * @element unruly-office-assistant
*/

const POSITION_ATTRIBUTES = ['top', 'right', 'bottom', 'left'];

export default class UnrulyOfficeAssistant extends HTMLElement {
    
    static get styles() {
        const bgColor = "yellow";

        return `
        <style>
            button {
                cursor: pointer;
                display: block;
                margin: 10px 0;
                padding: 4px 6px;
                background: ${bgColor};
                border: 1px solid #333;
            }

            #dialog {
                width: 250px;
                background: ${bgColor};
                padding: 15px;
            }

            #tip-container {
                display: none;
            }
        </style>
        `;
    }
  
    static get markup() { 
        return `
            <div id="office-assistant-container">
              <div id="dialog">
                <div id="intro">
                  <slot name="prompt"></slot>
                  <button id="accept-button" role="button">
                    <slot name="accept"></slot>
                  </button>
                  <button id="decline-button" role="button">
                    <slot name="decline"></slot>
                  </button>
                </div>

                <div id="tip-container">
                  <slot id="tip-text" name="tip"></slot>
                  <button id="close-dialog-button" role="button">Thanks Clippy</button>
                </div>
              </div>

              <img src="//via.placeholder.com/200x200" />
            </div>
        `;
    }
 
    static get observedAttributes() { 
        return [...POSITION_ATTRIBUTES];
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
        this.container = this.shadowRoot.querySelector("#office-assistant-container");

        this.intro = this.shadowRoot.querySelector("#intro");
        this.acceptButton = this.shadowRoot.querySelector('#accept-button');
        this.declineButton = this.shadowRoot.querySelector('#decline-button');

        this.tipContainer = this.shadowRoot.querySelector("#tip-container");
        this.closeButton = this.shadowRoot.querySelector("#close-dialog-button");
    }
  
    addEventListeners() {
        this.acceptedCallback = this.acceptedTip.bind(this);
        this.closedCallback = this.closedTip.bind(this);

        this.acceptButton.addEventListener('click', this.acceptedCallback);
        this.declineButton.addEventListener('click', this.closedCallback);
        this.closeButton.addEventListener('click', this.closedCallback);
    }
    
    removeEventListeners() {
        this.acceptButton.removeEventListener('click', this.acceptedCallback);
        this.declineButton.removeEventListener('click', this.closedCallback);
        this.closeButton.removeEventListener('click', this.closedCallback);
    }

    acceptedTip() {
        this.intro.style['display'] = 'none';
        this.tipContainer.style['display'] = 'block';
    }

    closedTip() {
        this.container.style['display'] = 'none';
    }
    
    attributeChangedCallback(name, oldValue, newValue) {
        if (POSITION_ATTRIBUTES.includes(name)){
            this.container.style['position'] = 'fixed';
            this.container.style[name] = newValue;
        }
    }
}

customElements.define('unruly-office-assistant', UnrulyOfficeAssistant);
