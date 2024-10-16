let notes_container = document.querySelector(".notes-container");
let add_new = document.querySelector(".btn");

function saveNotes() {
  let notes = [];
  document.querySelectorAll('.content').forEach(contentBox => {
    notes.push(contentBox.querySelector('.input-Box').innerText);
  });
  localStorage.setItem('notes', JSON.stringify(notes));
}

function loadNotes() {
  let savedNotes = JSON.parse(localStorage.getItem('notes')) || [];
  savedNotes.forEach(noteText => {
    createNote(noteText);
  });
}

function createNote(text = "") {
  let contentBox = document.createElement("div");
  contentBox.className = "content";

  let InputBox = document.createElement("p");
  InputBox.className = "input-Box";
  InputBox.contentEditable = "true"; 
  InputBox.innerText = text; 

  let img = document.createElement("img");
  img.src = "./images/delete.png";
  img.className = "delete-icon";

  contentBox.appendChild(InputBox);
  contentBox.appendChild(img);
  notes_container.appendChild(contentBox);

  img.addEventListener("click", function () {
    contentBox.remove();
    saveNotes();
  });

  InputBox.addEventListener("input", saveNotes);
}

add_new.addEventListener("click", function () {
  createNote();
  saveNotes();
});

window.addEventListener('load', loadNotes);