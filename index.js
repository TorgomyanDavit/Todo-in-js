

const root = document.getElementById("root");

function TodoForm(add) {
    const container = document.createElement("form");
    container.innerHTML = `
        <input type="text"/>
        <button>Add</button>
    `

    container.addEventListener("submit",(e) => {
        e.preventDefault()
        const value = container.querySelector("input").value;
        add(value)
    })
    return container
}

function ListItem(todo,onchange) {
    const container = document.createElement("div");

    container.innerHTML = `
        <label> 
            <input type="checkbox"  ${todo.completed ? "checked" : ""}/>
            <span>${todo.label}</span>
        </label>
    `
    const input = container.querySelector("input")
    input.addEventListener("change",(e) => {
        onchange(e.target.checked)
    })

    return container
}

function List(todos,onchange) {
    const container = document.createElement("div")

    todos.map(todo => {
        return ListItem(todo, (change) => {
            todo.completed = change
            onchange()
        } )
    }).forEach(el => {
        container.appendChild(el)
    })

    return container
}

function TodoFooter(todos,Clear) {
    const container = document.createElement("div")

    const completed = todos.filter(todo => todo.completed === true).length
    container.innerHTML = `
        <span> ${completed} / ${todos.length} completed</span>
        <button>Clear completed</button>
    `

    const button = container.querySelector("button")
    button.addEventListener("click",function()  {
        Clear(todos.filter((todo) => todo.completed !== false))
    })

    return container
}




function App() {

    let todos = [
        {label:"learn JS",Completed:false},
        {label:"learn Node",Completed:false},
        {label:"learn Css",Completed:false}
    ]
    const container = document.createElement("div")
    function render() {
        container.innerHTML = ""
        container.appendChild(TodoForm(function(newText) {
            todos.push({
                label:newText,
                completed:false
            })
            render()
        }))
        container.appendChild(List(todos,() => {
            render()
        }))
        container.appendChild(TodoFooter(todos,(newtodos) => {
            todos = newtodos
            render()
        }))
    }
    render()
    return container
}
root.appendChild(App());