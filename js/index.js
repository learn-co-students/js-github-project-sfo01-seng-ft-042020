const GITHUB_ROOT = "https://api.github.com"
// document.addEventListener('DOMContentLoaded', function() {
//   searchGithub()
//   console.log("LOADED")
// })


  const form = document.getElementById('github-form')
  const inputText = document.getElementById('search')
  const userContainer = document.getElementById('user-list');
 
  form.addEventListener('submit', (e) => {
    e.preventDefault();
    let query = inputText.value;
    return getUsers(query)
    // co
  })

  function getUsers(username) {
    fetch(`${GITHUB_ROOT}/search/users?q=${username}`, {
      method: "GET",
      headers: {
        'Accept': 'application/json'
      }
    })
    .then(res => res.json())
    .then(obj => renderResults(obj));
  }

  function renderResults(users) {
    inputText.value = "";
    userContainer.innerHTML = "";
    const results = users.items;
    results.forEach(user => {
      // console.log(user)
      const card = document.createElement('div')
      card.className = "card"
      const image = document.createElement('img');
      image.src = user.avatar_url;
      image.className = "card-img-top"
      card.appendChild(image);
      
      const cardBody = document.createElement('div');
      cardBody.className = 'card-body'
      card.appendChild(cardBody)
      
      const userName = document.createElement('h5')
      userName.className = 'card-title';
      userName.innerText = user.login;
      cardBody.appendChild(userName)
      
      const link = document.createElement('a');
      link.setAttribute("user-id", user.login)
      link.addEventListener('click', (e) => searchRepos(e.target))
      link.className = "btn btn-primary";
      link.textContent = "Profile"
      cardBody.appendChild(link);

      userContainer.appendChild(card)
    })
  }

  function searchRepos(target) {
    // userContainer.innerHTML = ""
    // userContainer.appendChild(target.parentElement.parentElement)
    
    const userName = target.attributes[0].value
    fetch(`${GITHUB_ROOT}/users/${userName}/repos`)
    .then(res => res.json())
    .then(obj => renderRepos(obj))
    .catch(err => alert(err));
  }

  function renderRepos(repos) {
    // console.log(repos);
    const repoList = document.getElementById('repos-list');
    repoList.classList.add("col-lg-4")
    repoList.innerHTML = "";
    repos.forEach(rep => {
      console.log(rep);
      const listItem = document.createElement('a');
      listItem.className = "list-group-item list-group-item-action";
      listItem.innerText = rep.name
      listItem.href = rep.svn_url
      repoList.appendChild(listItem);
    })

  }
