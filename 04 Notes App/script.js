const addNoteEl = document.getElementById("add-note");

const mainEl = document.querySelector("main");

addNoteEl.addEventListener("click", addNote);

function addNote(e, noteContent = undefined) {
	const noteContainerEl = document.createElement("div");
	noteContainerEl.classList.add("note-container");

	noteContainerEl.innerHTML = `
         <header class="toolbar">
            <button class="note-toolBtn editBtn" ><i class="far fa-edit"></i></button>
            <button class="note-toolBtn deleteBtn" ><i class="far fa-trash-alt"></i></button>
         </header>
         <div class="note-body">
            <textarea
                class="note-edit hidden"
                name="note"
                cols="40"
                rows="15"
            >${noteContent ? noteContent : ""}</textarea>
            <div class="note-present">
                <p>${noteContent ? noteContent : ""}</p>     
            </div>
         </div>
         `;

	mainEl.appendChild(noteContainerEl);

	const textareaEl = noteContainerEl.querySelector("textarea");
	const editBtnEl = noteContainerEl.querySelector(".editBtn");
	const deleteBtnEl = noteContainerEl.querySelector(".deleteBtn");
	const notePresentEl = noteContainerEl.querySelector(".note-present");
	const notePEl = noteContainerEl.querySelector("p");

	editBtnEl.addEventListener("click", () => {
		notePresentEl.classList.toggle("hidden");
		textareaEl.classList.toggle("hidden");

		if (notePresentEl.classList.contains("hidden")) {
			editBtnEl.innerHTML = '<i class="far fa-save"></i>';
		} else {
			editBtnEl.innerHTML = '<i class="far fa-edit"></i>';
		}

		updateNoteToLS();
	});

	deleteBtnEl.addEventListener("click", () => {
		noteContainerEl.remove();
		updateNoteToLS();
	});

	textareaEl.addEventListener("input", (e) => {
		const textAreaContent = e.target.value;
		notePEl.innerHTML = textAreaContent;
	});
}

function updateNoteToLS() {
	const notesPEl = document.querySelectorAll("p");
	let notesArr = [];

	for (let i = 0; i < notesPEl.length; i++) {
		const noteEl = notesPEl[i];
		notesArr.push(noteEl.innerHTML);

		// addNoteEl()
	}
	localStorage.setItem("notes", JSON.stringify(notesArr));
	// console.log(notesArr);
}

function loadNotesFromLS() {
	const notesArr = JSON.parse(localStorage.getItem("notes"));

	if (notesArr) {
		notesArr.forEach((element) => {
			addNote(undefined, element);
		});
	}
}

loadNotesFromLS();
