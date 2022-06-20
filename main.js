const ORDER_ASC = 'ASC';
const ORDER_DESC = 'DESC';

class Task {
    id;
    text;

    constructor(id, text) {
        this.id = id
        this.text = text
    }
 
    setText = (text) => {
        this.text = text
    }
}

class TaskList {
    list = [];
    order = ORDER_ASC
    currentId = 0;

    add = (text) => {
        const task = new Task(this.currentId++, text)
        this.list.push(task)

        return task;
    }

    remove = (id) => {
        this.list = this.list.filter(task => id !== task.id)
    }

    update = (id, text) => {
        this.list.find((task) => id === task.id).setText(text)
    }

    sortForword = () => {
        this.list.sort((a, b) => a.text > b.text ? 1 : -1)
    }
    sortBack = () => {
        this.list.sort((a, b) => a.text < b.text ? 1 : -1)
    }

}
class TaskView {
    list = new TaskList()
    addButton = document.querySelector('.add-button')
    container = document.querySelector('.tasks-list')
    sortButton = document.querySelector('.sort-button-up')

    constructor() {
        this.add()
        this.addButton.addEventListener('click', this.add)
        this.sortButton.addEventListener('click', this.sort)
    }

    sort = () => {
        this.list.order === ORDER_ASC ? this.list.sortForword() : this.list.sortBack();
        this.list.order = this.list.order === ORDER_ASC ? ORDER_DESC : ORDER_ASC
        this.list.order === ORDER_ASC ? this.sortButton.classList.replace('sort-button-down', 'sort-button-up') : this.sortButton.classList.replace('sort-button-up', 'sort-button-down')
        this.render()
    }

    clear() {
        this.container.innerHTML = '';
    }

    add = () => {
        const task = this.list.add('');
        this.container.append(this.createTask(task))
    }

    render() {
        this.clear()
        this.container.append(...this.list.list.map(task => this.createTask(task)))
    }

    createTask(task) {
        const container = document.createElement('div')
        const input = document.createElement('input')
        const button = document.createElement('button')

        input.value = task.text

        container.classList.add('input-block')

        input.classList.add('input')
        button.classList.add('delete')

        input.addEventListener('input', () => this.list.update(task.id, input.value))
        button.addEventListener('click', () => {
            if (this.list.list.length === 1) return
            this.list.remove(task.id)
            container.remove()
        })

        container.append(button, input)

        return container
    }
}
const view = new TaskView()


