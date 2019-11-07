'use strict';
// ------------------------ ESPACE VARIABLE ------------------
const myform = document.getElementById('myform')
const ul = document.querySelector('ul')

myform.addEventListener('submit', newTask);
ul.addEventListener('click', removeTask)
document.addEventListener("DOMContentLoaded", reloadFromFuckingStorage)

// ------------------------ AJOUTER DANS LE DOM ------------------

function newTask(e) {
    e.preventDefault();
    let task = document.getElementById('myTextArea').value
    let myCondition = task === '' || task === " " || task === "  " || task === "\n"; 
    if (myCondition) {
        return 
    } else {
        let li = document.createElement('li')
        li.innerHTML = `${task} <span class="remove">x</span>`
        ul.appendChild(li)
        document.getElementById("myform").reset()
    }
    // JE RAPPELLE LA FONCTION " setTaskToStorage(task)" POUR POUVOIR RECUPERER LA VALEUR DE " task " ET LA PUSHER DANS LE TABLEAU ' tasks ' QUE J'ENVERER DANS LE STORAGE
    setTaskToStorage(task)
}

// ------------------------ SUPPRIMER DU DOM ------------------
function removeTask(e) {
    if (e.target.classList.contains('remove')) {
        e.target.parentElement.remove()
    }
    removeTaskFromStorage(e.target.parentElement.innerText)
}

// ------------------------ ENVOYER DANS LE STORAGE ------------------
function setTaskToStorage(task) {
    // JE RAPPELLE LA FONCTION " getTaskFromStorage() " POUR POUVOIR RECUPERER LA VALEUR QU'ELLE ME RETOURNE ET TRAVAILLER AVEC 
    let tasks = getTaskFromStorage()
    tasks.push(task)
    localStorage.setItem('tasks', JSON.stringify(tasks))
}
// ------------------------ RECUPERER DU STORAGE ------------------
function getTaskFromStorage() {
    let tasks;
    let getStorage = localStorage.getItem("tasks")

    getStorage === null || getStorage == undefined ? tasks = [] : tasks = JSON.parse(getStorage)
    // RETOURNER LA VALEUR DE  " tasks " POUR POUVOIR RECUPERER LA VALEUR DANS D'AUTRES FONCTIONS
    return tasks
}
// ------ FAIRE UN " DOMContentLoaded " AFIN DE RECUPERER DU STORAGE (AVEC eloadFromFuckingStorage() ) ET AINSI EVITER DE REMPLACER PAR UNE NOUVELLE LORS DE LA SAISIE DE NOUVELLE TÂCHE ------------------
function reloadFromFuckingStorage() {
    // JE RAPPELLE LA FONCTION " getTaskFromStorage() " POUR POUVOIR RECUPERER LA VELEUR QU'ELLE ME RETOURNE ET TRAVAILLER AVEC 
    let tasks = getTaskFromStorage()
    tasks.forEach(task => {
        let li = document.createElement('li')
        li.innerHTML = `${task} <span class="remove">x</span>`
        ul.appendChild(li)
    });
}

// ------------------------ SUPPRIMER DU STORAGE ------------------
function removeTaskFromStorage(task) {
    // JE RAPPELLE LA FONCTION " getTaskFromStorage() " POUR POUVOIR RECUPERER LA VALEUR QU'ELLE ME RETOURNE ET TRAVAILLER AVEC 
    let tasks = getTaskFromStorage()
    let SuppTask = task.substring(0, task.length - 1)
    tasks.forEach(function (item, index) {
        item + ' ' === SuppTask ? tasks.splice(index, 1) : console.log('')
    });
    localStorage.setItem('tasks', JSON.stringify(tasks))
}

