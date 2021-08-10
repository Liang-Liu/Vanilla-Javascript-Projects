const favMealsEl = document.querySelector("div.fav-meals");
const mealsContainerEl = document.querySelector("div.meals-container");
const searchInputEl = document.getElementById("search-bar");
const searchBtnEl = document.getElementById("searchBtn");

searchBtnEl.addEventListener("click", clickSearchBtn);

function clickSearchBtn() {
	const searchTerm = searchInputEl.value;
	if (!searchTerm) {
		return;
	}

	fetchSearchedMeals(searchTerm);
}

let existingFavMeals = [];

fetchSearchedMeals("");
// async function fetchRandomMeals() {
// 	let mealImgURLArr = [];
// 	let mealNameArr = [];
// 	let mealsJsonArr = [];

// 	try {
// 		const response = await fetch(
// 			"https://www.themealdb.com/api/json/v1/1/random.php"
// 		);

// 		if (response.ok) {
// 			const responseJson = await response.json();
// 			mealsJsonArr = responseJson.meals[0];

// 			mealImgURLArr = responseJson.meals[0].strMealThumb;
// 			// console.log(responseJson);
// 			mealNameArr = responseJson.meals[0].strMeal;

// 			// console.log(mealImgURLArr);
// 			console.log(mealNameArr);
// 		}
// 	} catch (e) {
// 		console.error(e);
// 	}
// }

async function fetchSearchedMeals(searchTerm) {
	let mealsJsonArr = [];

	try {
		const response = await fetch(
			`https://www.themealdb.com/api/json/v1/1/search.php?s=${searchTerm}`
		);

		if (response.ok) {
			const responseJson = await response.json();
			mealsJsonArr = responseJson.meals;
		}
	} catch (e) {
		console.error(e);
	}
	loadMeals(mealsJsonArr);
}

function loadMeals(mealsJsonArr) {
	mealsContainerEl.innerHTML = "";

	let mealImgURLArr = [];
	let mealNameArr = [];

	mealsJsonArr.forEach((element) => {
		mealImgURLArr.push(element.strMealThumb);
		mealNameArr.push(element.strMeal);
	});

	for (let i = 0; i < mealNameArr.length; i++) {
		const mealName = mealNameArr[i];
		const mealImgURL = mealImgURLArr[i];

		const childEl = document.createElement("div");
		childEl.classList.add("meal");

		childEl.innerHTML = `
					<img
						src="${mealImgURL}"
						alt="${mealName}"
						class="meal"
					/>
					<div class="meal-body-container">
						<h4>${mealName}</h4>
						<button id="favBtn"><i class="fas fa-heart fa-lg" data-mealName="${mealName}" data-mealImgURL="${mealImgURL}" onclick="clickFavBtn(this)"></i></button>

					</div>
                `;

		mealsContainerEl.appendChild(childEl);
	}
}

function clickFavBtn(ele) {
	const eleDataset = ele.dataset;
	const mealName = eleDataset.mealname;
	const mealImgURL = eleDataset.mealimgurl;

	const mealDataObj = { mealName: mealName, mealImgURL: mealImgURL };

	// console.log(mealDataObj);

	localStorage.setItem(mealName, JSON.stringify(mealDataObj));
	loadFavMeal(mealName);
}

function onMouseOverFavMealImg(HTMLele) {
	HTMLele.classList.add("hover");
}

function onMouseOutFavMealImg(HTMLele) {
	HTMLele.classList.remove("hover");
}

function clickFavMealImg(ele) {
	// console.log(ele);
	const mealName = ele.getAttributeNode("alt").value;
	// console.log(mealName);
	removeFavMeal(mealName);
	favMealsEl.innerHTML = "";
	loadFavMeals();
}

function loadFavMeal(mealNameKey) {
	if (existingFavMeals.includes(mealNameKey)) {
		return;
	}

	const mealDataObj = JSON.parse(localStorage.getItem(mealNameKey));
	const mealName = mealDataObj.mealName;
	const mealImgURL = mealDataObj.mealImgURL;

	const favMealChildEl = document.createElement("div");
	favMealChildEl.classList.add("fav-meal");

	favMealChildEl.innerHTML = `
				<div class="fav-meal">
					<img
						src="${mealImgURL}"
						alt="${mealName}"
						class="fav-meal"
						onclick="clickFavMealImg(this)"
						onmouseover="onMouseOverFavMealImg(this)"
						onmouseout="onMouseOutFavMealImg(this)"
					/>
					<h6>${mealName}</h6>
				</div>
			`;
	favMealsEl.appendChild(favMealChildEl);
	existingFavMeals.push(mealName);
}

function loadFavMeals() {
	for (let i = 0; i < localStorage.length; i++) {
		const mealDataObj = JSON.parse(localStorage.getItem(localStorage.key(i)));

		const mealName = mealDataObj.mealName;
		const mealImgURL = mealDataObj.mealImgURL;

		// if (existingFavMeals.includes(mealName)) {
		// 	break;
		// }
		existingFavMeals.push(mealName);

		const favMealChildEl = document.createElement("div");
		favMealChildEl.classList.add("fav-meal");

		favMealChildEl.innerHTML = `
					<div class="fav-meal">
						<div class="fav-meal-img">
						<img
							src="${mealImgURL}"
							alt="${mealName}"
							class="fav-meal"
							onclick="clickFavMealImg(this)"
							onmouseover="onMouseOverFavMealImg(this)"
							onmouseout="onMouseOutFavMealImg(this)"
						/>
						
							<!--<i id="broken-heart" class="fas fa-heart-broken fa-2x"></i>-->
						</div>	
						<h6>${mealName}</h6>
					</div>
				`;
		favMealsEl.appendChild(favMealChildEl);
	}
}

function removeFavMeal(mealNameKey) {
	localStorage.removeItem(mealNameKey);
	existingFavMeals = existingFavMeals.filter((ele) => ele !== mealNameKey);
}

function clearAllFavMeals() {
	localStorage.clear();
}

loadFavMeals();
