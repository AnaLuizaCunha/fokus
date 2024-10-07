const btnAddTask = document.querySelector('.app__button--add-task');
const formAddTask = document.querySelector('.app__form-add-task');
const textArea = document.querySelector('.app__form-textarea');
const ulTask = document.querySelector('.app__section-task-list');


const tasks = JSON.parse(localStorage.getItem('tasks')) || []; // o parse transforma a string em um array de objetos, funciona como o inverso do stringify; se nao tiver nada no localStorage, ele retorna um array vazio

function createTaskElement(task) {
    const li = document.createElement('li');
    li.classList.add('app__section-task-list-item');

    const svg = document.createElement('svg');
    svg.innerHTML = `
        <svg class="app__section-task-icon-status" width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
            <circle cx="12" cy="12" r="12" fill="#FFF"></circle>
            <path d="M9 16.1719L19.5938 5.57812L21 6.98438L9 18.9844L3.42188 13.4062L4.82812 12L9 16.1719Z" fill="#01080E"></path>
        </svg>
    `;

    const p = document.createElement('p');
    p.classList.add('app__section-task-list-item-description');
    p.textContent = task.description;

    const button = document.createElement('button');
    button.classList.add('app_button-edit');
    const btnImg = document.createElement('img');
    btnImg.setAttribute('src', '/imagens/edit.png');

    button.appendChild(btnImg);

    li.appendChild(svg);
    li.appendChild(p);
    li.appendChild(button);

    return li;

}

btnAddTask.addEventListener('click', () => {
    formAddTask.classList.toggle('hidden'); // toggle: alterna da classe hidden
});

formAddTask.addEventListener('submit', (event) => {
    event.preventDefault(); // previne o comportamento padrão do formulário, nao regarrega a página
    // Criamos um objeto chamado "task" (tarefa) que vai guardar o que escrevemos na área de texto.
    // O valor digitado no textArea vai ficar guardado na parte chamada "description" desse objeto.
    const task = {
        description: textArea.value
    }
    tasks.push(task);
    const taskElement = createTaskElement(task);
    ulTask.append(taskElement);
    localStorage.setItem('tasks', JSON.stringify(tasks)); // guarda a tarefa no localStorage, se atualizar a página, a tarefa não some
    textArea.value = ''; // limpa o campo de texto
    formAddTask.classList.add('hidden'); // esconde o formulário
})

tasks.forEach(task => {
    const taskElement = createTaskElement(task);
    ulTask.append(taskElement);
});