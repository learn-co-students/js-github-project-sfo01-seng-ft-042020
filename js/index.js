handleSubmit();
listenForClicky();













function handleSubmit() {
    const form = document.getElementById('github-form');
    form.addEventListener('submit', searchGithub);
}

function searchGithub() {
    event.preventDefault();
    const theBox = document.querySelector('input')
    searchStr = theBox.value

    if (searchStr) {
        fetch(`https://api.github.com/search/users?q=${searchStr}`)
            .then(resp=>resp.json())
            .then(json=>showUsersContent(json))
    }
}

function showUsersContent(json) {
    const userList = document.getElementById('user-list');
    let child = userList.lastElementChild;

    while (child) {
        userList.removeChild(child);
        child = userList.lastElementChild;
    }

    for (user of json.items) {
        const listItem = document.createElement('li');
        const subList = document.createElement('ol');
        const link = document.createElement('li');
        const avatar = document.createElement('li');
        const login = document.createElement('li');
        
        link.innerText = user.html_url
        avatar.innerHTML = `<img src='${user.avatar_url}'>`
        login.innerText = user.login
        avatar.dataset.githubId = user.login
        
        subList.appendChild(login);
        subList.appendChild(avatar);
        subList.appendChild(link);

        listItem.appendChild(subList);
        userList.appendChild(listItem);
    }
}

function listenForClicky() {
    document.getElementById('user-list').addEventListener('click', (e)=>clickedPage(e))
}

function clickedPage(e) {
    if (e.target.tagName === 'IMG') {
        user = e.target.parentNode.dataset.githubId;
        clearRepoList();
        fetch(`https://api.github.com/users/${user}/repos`)
            .then(resp=>resp.json())
            .then(json=>populateRepos(json))
    }
}

function clearRepoList() {
    const repoList = document.getElementById('repos-list');
    let child = repoList.lastElementChild;

    while (child) {
        repoList.removeChild(child);
        child = repoList.lastElementChild;
    }
}

function populateRepos(json) {
    const list = document.getElementById('repos-list');
    for (repo of json) {
        const item = document.createElement('li');
        item.innerText = `${repo.full_name}`;
        list.appendChild(item);
    }
}