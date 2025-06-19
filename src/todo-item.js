const renderTodo = (container) => {
    const todoBody = document.createElement('div');
    todoBody.classList.add('page');

    const title = document.createElement('h1');
    const description = document.createElement('p');
    const dueDate = document.createElement('p');
    const priority = document.createElement('div');

    todoBody.append(title, description, dueDate, priority);
    container.appendChild(todoBody);
}

export {
    renderTodo
}