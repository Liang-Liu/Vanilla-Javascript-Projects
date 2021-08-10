const formEl = document.querySelector("form");
const inputEl = document.querySelector("input");
const ulEl = document.querySelector("ul");

loadLS();
formEl.addEventListener("submit", (e) => {
	e.preventDefault();

	const todoContent = inputEl.value;

	const listItemObj = {};

	listItemObj.todoContent = todoContent;
	listItemObj.completed = false;

	addListItems(listItemObj);
	inputEl.value = "";
});

function addListItems(listItemObj) {
	const { todoContent, completed } = listItemObj;
	const listItemEl = document.createElement("li");

	listItemEl.innerHTML = `<p>${
		todoContent ? todoContent : ""
	}</p> <i class="far fa-trash-alt"></i>`;

	ulEl.appendChild(listItemEl);

	const listItemPEl = listItemEl.querySelector("p");

	if (completed) {
		listItemPEl.classList.add("completed");
	}

	//---------------------- Delete Icon function
	const deleteIconEl = listItemEl.querySelector(".far.fa-trash-alt");
	deleteIconEl.addEventListener("click", (e) => {
		listItemEl.remove();
		updateLS();
	});
	// --------------------

	//---------------------- complete list function
	listItemEl.addEventListener("click", (e) => {
		listItemPEl.classList.toggle("completed");
		updateLS();
	});
	// --------------------
	updateLS();
}

function updateLS() {
	const allListItemPEl = document.querySelectorAll("p");

	let todosArr = [];

	allListItemPEl.forEach((listItemPEl) => {
		const listItemObj = {};

		listItemObj.todoContent = listItemPEl.innerText;
		listItemObj.completed = listItemPEl.classList.contains("completed");

		todosArr.push(listItemObj);
	});

	localStorage.setItem("todosArr", JSON.stringify(todosArr));
}

function loadLS() {
	const todosArr = JSON.parse(localStorage.getItem("todosArr"));

	todosArr.forEach((listItemObj) => {
		if (listItemObj.todoContent) {
			addListItems(listItemObj);
		}
	});
}
