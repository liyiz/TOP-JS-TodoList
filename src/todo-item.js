const renderTodo = (container) => {
    const todoBody = document.createElement('div');
    todoBody.classList.add('page');

    const title = renderTitle('This is a title');
    const description = renderDescription('Lorem ipsum dolor sit met. Other nonsense for a description text box so I can pad this out more with english placeholder text.');
    const dueDate = renderDueDate('TBA');
    const priority = renderPriority();

    todoBody.append(title, description, dueDate, priority);
    container.appendChild(todoBody);
}

const renderTitle = (text) => {
    const title = document.createElement('h1');
    title.textContent = text;
    // add any styling or eventlistener related stuff here?
    return title;
}

const renderDescription = (text) => {
    const description = document.createElement('p');
    description.textContent = text;
    // add any styling or eventlistener related stuff here?
    return description;
}

const renderDueDate = (date) => {
    const dueDate = document.createElement('p');
    dueDate.textContent = date; // This will need to be replaced with date data type
    return dueDate;
}

const renderPriority = () => {
    const priority = document.createElement('div');
    // Use some kind of image for the priority?
    priority.textContent = 'Priority placeholder';
    return priority;
}

export {
    renderTodo
}