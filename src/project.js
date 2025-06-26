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

    createProjectContainer() {
        const projectBody = document.createElement('section');
        projectBody.classList.add('project');
        return projectBody;
    }
}


const createProjectContainer = () => {
    const projectBody = document.createElement('section');
    projectBody.classList.add('project');
    return projectBody;
}

const renderProject = (container, data) => {
    const projectHeader = renderProjectHeader(data);
    container.append(projectHeader);
}

const renderProjectHeader = (text) => {
    const title = document.createElement('h1');
    title.classList.add('project-title');
    title.textContent = text;
    // add any styling or eventlistener related stuff here?
    return title;
}

export {
    Project
};