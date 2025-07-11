class Page {
    /**
     * @param {string} id
     * @param {HTMLElement} container
     */
    constructor(id, container) {
        this.id = id;
        this.container = container;
    }

    // What functions do I need to render a page with?

    clearPage() {
        // Clear the previous page before rendering the new page
        container.innerHTML = '';
    }
}

export { Page }