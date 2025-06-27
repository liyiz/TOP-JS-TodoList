class Project {
    /**
     * @param {string} id
     * @param {string} title
     * @param {Array} todos
     */
    constructor(id, title, todos) {
        this.id = id;
        this.title = title;
        this.todos = todos;
    }

    renderProjectCard() {

        const card = document.createElement('div');
        card.classList.add('project');

        card.setAttribute('data-id', this.id)

        card.addEventListener('click', (e) => {
            console.dir(e);
        });

        const cardTitle = document.createElement('h1');
        cardTitle.textContent = this.title;
        cardTitle.classList.add('project-title');

        card.append(cardTitle);

        return card;
        
    }

}

export {
    Project
};