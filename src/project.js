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
    createProjectContainer,
    renderProject
}