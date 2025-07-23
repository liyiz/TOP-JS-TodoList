class Page {
    /**
     * @param {string} id
     * @param {HTMLElement} container
     */
    constructor(id, container) {
        this.id = id;
        this.container = container;
    }

    clearPage() {
        container.innerHTML = '';
    }

    // renderPage would require what?
    // it would need to know what page it is rendering: Projects, or Todos
    renderPage(pageFunction) {
        this.clearPage();
        pageFunction();
    }

    renderMainPage() {
        // Render the main menu that lists all the project cards
    }

    renderProjectPage() {
        // DOM elements to render the project page
    }

}

export { Page }