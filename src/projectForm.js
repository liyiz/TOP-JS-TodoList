// Create input form for projects
export function createForm() {
    const form = document.createElement('form');

    const div = document.createElement('div');
    const label = document.createElement('label');
    const input = document.createElement('input');

    label.textContent = 'Project Title';

    const submitBtn = document.createElement('button');
    submitBtn.textContent = 'Save';
    submitBtn.setAttribute('type', 'submit');

    div.append(label, input, submitBtn);
    form.append(div);

    return { form, input };
}

export function bindHandler(element, eventType, input, callback) {
    element.addEventListener(eventType, (event) => {
        event.preventDefault();
        callback(input);
    });
}