const APIURL = "https://api.github.com/users/";

const formEl = document.querySelector("form");
const inputEl = document.querySelector("input");

formEl.addEventListener("submit", (e) => {
	e.preventDefault();

	if (inputEl.value) {
		fetchUserInfo(inputEl.value);
	}
	inputEl.value = "";
});

async function fetchUserInfo(userName) {
	try {
		const resp = await fetch(APIURL + userName);
		const respData = await resp.json();

		const reposArr = await fetchUserRepos(respData.repos_url);

		showProfile(respData, reposArr);
	} catch (e) {
		mainEl.innerHTML = "<h1>Oops! Nothing Was Found...</h1>";
	}
}

async function fetchUserRepos(ReposURL) {
	const resp = await fetch(ReposURL);
	const respData = await resp.json();

	const compareFuc = (a, b) => {
		if (a.stargazers_count > b.stargazers_count) {
			return -1;
		} else if (a.stargazers_count < b.stargazers_count) {
			return 1;
		} else {
			return 0;
		}
	};

	const reposArr = respData.sort(compareFuc).slice(0, 10);
	return reposArr;
}

const mainEl = document.querySelector("main");

function showProfile(respData, reposArr) {
	mainEl.innerHTML = `
    
	<a href="${respData.html_url}" target="_blank">
	<img src="${respData.avatar_url}" alt="${respData.login} "/>
	</a>

    <div class="info">
        <h2>${respData.login}</h2>
        <span class="titel">${respData.company ? respData.company : ""}</span>
        <div class="bio">${respData.bio ? respData.bio : ""}</div>
        <ul class="icons">
            <li>Follower: ${respData.followers}</li>
            <li>Following: ${respData.following}</li>
            <li>Repos: ${respData.public_repos}</li>
        </ul>
        <div class="repos">
        </div>

    </div>
    `;

	const reposEl = mainEl.querySelector(".repos");

	reposArr.forEach((repo) => {
		const repoEl = document.createElement("a");
		repoEl.classList.add("repo");
		repoEl.href = repo.html_url;
		repoEl.target = "_blank";
		repoEl.textContent = repo.name;
		reposEl.appendChild(repoEl);
	});
}

fetchUserInfo("Liang-Liu");
