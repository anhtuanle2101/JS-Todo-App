const form=document.querySelector('#add-form');
const input=document.querySelector('#new-todo');
const todoList=document.querySelector('#todo-list');

if (localStorage.getItem('array')){
    // console.log(JSON.parse(localStorage.getItem('array')));
    const array=JSON.parse(localStorage.getItem('array'));
    for(let object of array){
        createLi(object.value,object.completed);
    }
}

todoList.addEventListener('click',function(e){
    if (e.target.tagName='button'&&e.target.innerText==='X'){
        e.target.parentElement.remove();
        saveToLocal();
    }else if (e.target.tagName='span'){
        e.target.classList.toggle('completed');
        saveToLocal();
    }
})

form.addEventListener('submit',function(e){
    e.preventDefault();

    createLi(input.value,false);
    saveToLocal();
    input.value='';
})

function createLi(value,completed){
    const newTodo=document.createElement('li');
    const newSpan=document.createElement('span');
    const removeBtn=document.createElement('button');
    
    newSpan.innerText=value;
    if (completed){
        newSpan.classList.add('completed');
    }
    removeBtn.innerText='X';
    newTodo.append(newSpan,removeBtn);
    console.log(newTodo);
    todoList.append(newTodo);
}

function saveToLocal(){
    const lis=document.querySelectorAll('li');
    const array=[];
    for (let li of lis){
        const object={
            'value':li.querySelector('span').innerText,
            'completed':li.querySelector('span').classList.contains('completed')
        }
        array.push(object);
    }
    localStorage.setItem('array',JSON.stringify(array));
    // console.log(localStorage);
}
