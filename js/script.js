const title = document.querySelector('.title');
const content = document.querySelector('.content');
const submitBtn = document.querySelector('.submitBtn');
const container = document.querySelector('.container');

// Когда у нас страница загружается

window.addEventListener('load', ()=>{
    const isTodos = localStorage.getItem('todos');

    if(!isTodos){
        localStorage.setItem('todos', JSON.stringify([]));
    }else{
        const todos = JSON.parse(localStorage.getItem('todos'));

        const newTodos = todos.map((item, index) =>{
            return {
                ...item, id: index
            }
            
        });

        localStorage.setItem('todos', JSON.stringify(newTodos));
        const template = newTodos.reverse().reduce((prev, {title, content, completed, date, id}) => 
        {
           if(completed){
            return prev + `<div class="col-lg-6 mb-3 completed">${cardTemplate(title, content, date, id)}</div>`
           }else{
            return prev + `<div class="col-lg-6 mb-3">${cardTemplate(title, content, date, id)}</div>`
           }
        }, '');

        // const template = newTodos.reverse().map(({title, content, completed, date, id})=>{
        //     if(completed){
        //         return `<div class="col-lg-6 mb-4 completed">${cardTemplate(title, content, date, id)}</div>`
        //         }else{
        //         return `<div class="col-lg-6 mb-4">${cardTemplate(title, content, date, id)}</div>`;
        //         }
        // }).join();

        container.innerHTML=template;
    }
    
});

// Add new task 
submitBtn.addEventListener('click', e =>{
    e.preventDefault();

    if(title.value==="" && content.value==="")alert('Поля не должны быть пустым');
    if(title.value !=="" && content.value !==""){
       const todos = JSON.parse(localStorage.getItem('todos'))
       localStorage.setItem('todos', JSON.stringify([...todos, {
           title: title.value,
           content: content.value,
           date: currentTime(),
           completed: false
       }]))
       window.location.reload();
    }
})

// Шаблон карточки

function cardTemplate(title, content, time, id){
    if(content.length >= 350){
        return`
            <div class="card m-2">
                <div class="card-header">
                    <h3 class="card-title mb-0">${title}</h3>
                </div>
                <div class="card-body content shorted">
                    <p>${content}</p>
                    <span class="time">${time}</span>
                </div>
                <div class="card-footer p-3 d-flex align-items-center justify-content-around">
                    <div onclick="deleteTask(${id})" class="btn btn-danger">Delete</div>
                    <div onclick="completeTask(${id})" class="btn btn-primary">Complete</div>
                    <div onclick="editTask(${id})" class="btn btn-info">Edit</div>
                </div>
            </div>
        `
    }else{
        return`
            <div class="card m-2">
                <div class="card-header">
                    <h3 class="card-title mb-0">${title}</h3>
                </div>
                <div class="card-body content">
                    <p>${content}</p>
                    <span class="time">${time}</span>
                </div>
                <div class="card-footer p-3 d-flex align-items-center justify-content-around">
                    <div style="box-shadow: 0 0 20px rgb(168, 85, 200) !important;" onclick="deleteTask(${id})" class="btn btn-danger">Delete</div>
                    <div style="box-shadow: 0 0 20px rgb(168, 85, 200) !important;" onclick="completeTask(${id})" class="btn btn-primary">Complete</div>
                    <div style="box-shadow: 0 0 20px rgb(168, 85, 200) !important;" onclick="editTask(${id})"  class="btn btn-info">Edit</div>
                </div>
            </div>
        `
    }
}

// Our Current time
function currentTime(){
    return`${moment().format('L')} ${moment().format('LTS')}`
}

const body = document.body;
const selector = document.querySelector('.theme-selector');

selector.addEventListener('change' , e =>{
    const value = e.target.value;

    if(value === 'light'){
        body.style.background = 'url(../img/optimize1.webp) top / cover no-repeat fixed';
        localStorage.setItem('bgColor', 'url(../img/optimize1.webp) top / cover no-repeat fixed')
        localStorage.setItem('themeValue', 'light')
    }else if(value === 'dark'){
        body.style.background = 'url(../img/218662.png) center / cover no-repeat fixed'
        localStorage.setItem('bgColor', 'url(../img/218662.png) center / cover no-repeat fixed')
        localStorage.setItem('themeValue', 'dark')
    }else if(value === 'custom'){
        const askColor = prompt('Your custom color')

        body.style.background = askColor
        localStorage.setItem('bgColor', askColor)
        localStorage.setItem('themeValue', 'custom')
    }
})

window.addEventListener('load', ()=>{
    body.style.background = localStorage.getItem('bgColor')
    selector.value = localStorage.getItem('themeValue')
})

// Buttons

function deleteTask(id){
    const askDelete = confirm('Are you sure?!')

    if(!askDelete) return;

    const todos = JSON.parse(localStorage.getItem('todos'));

    const newTodos = todos.filter(item => item.id !== id);

    localStorage.setItem('todos', JSON.stringify(newTodos));

    window.location.reload();
}

function completeTask(id){
    const todos = JSON.parse(localStorage.getItem('todos'));
    const newTodos = todos.map(item =>{
        if(item.id === id){
            return{
                ...item,
                completed: !item.completed
            }
        }else{
            return item
        }
    })
    localStorage.setItem('todos', JSON.stringify(newTodos));
    window.location.reload();
}

function editTask(id){
    const todos = JSON.parse(localStorage.getItem('todos'));
    const newTodos = todos.map(item =>{
        if(item.id === id){
            return{
                ...item,
                title:`${prompt('New title', item.title)} (ред..ный)`,
                content:`${prompt('New content', item.content)} (ред..ный)`,
                date:`${currentTime()} (ред..ный)`
            }
        }else{
            return item
        }
    })
    localStorage.setItem('todos', JSON.stringify(newTodos))
    window.location.reload();
}

// check is auth
window.addEventListener('load', ()=>{
    const isAuth = localStorage.getItem('isAuth');

    if(isAuth === 'true'){
        return
    }else{
        window.open('auth.html', '_self')
    }
})

// sing out

const singOutBtn= document.querySelector('.singOutBtn');

singOutBtn.addEventListener('click', e =>{
    e.preventDefault();

    // if(isAuth === 'false'){
    //     confirm('Вы действительно хотите выйти?')
    // }else{
    //     window.location.reload();
    // }

    localStorage.setItem('isAuth', 'false');
    window.location.reload();
})

// fixed menu

let nav = document.querySelector('.navbar')

window.onscroll = () => {
    nav.classList.toggle('activeNav' , window.scrollY > 0);
}