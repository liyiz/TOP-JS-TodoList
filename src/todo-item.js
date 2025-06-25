const renderTodo = (container, data) => {
    const todoBody = document.createElement('div');
    todoBody.classList.add('todo');

    console.log(data);

    const title = renderTitle(data.projectTitle);
    const description = renderDescription(data.todos[0].description);
    const dueDate = renderDueDate(data.todos[0].dueDate);
    const priority = renderPriority(data.todos[0].priority);

    todoBody.append(title, description, dueDate, priority);
    container.appendChild(todoBody);

    // console.dir(data);
}

const renderTitle = (text) => {
    const title = document.createElement('h1');
    title.classList.add('todo-title');
    title.textContent = text;
    // add any styling or eventlistener related stuff here?
    return title;
}

const renderDescription = (text) => {
    const description = document.createElement('p');
    description.classList.add('todo-descr');
    description.textContent = text;
    // add any styling or eventlistener related stuff here?
    return description;
}

const renderDueDate = (date) => {
    const dueDate = document.createElement('p');
    dueDate.classList.add('todo-ddate');
    dueDate.textContent = date; // This will need to be replaced with date data type
    return dueDate;
}

const renderPriority = (value) => {
    const priority = document.createElement('div');
    priority.classList.add('todo-priority');
    // Use some kind of image for the priority?
    priority.textContent = value;
    return priority;
}

export {
    renderTodo
}