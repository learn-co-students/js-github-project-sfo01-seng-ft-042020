
// listen for form submit
// document.addEventListener("DOMContentLoaded", () => {
//     listenForNameSubmit()
// })





 const  container = document.getElementById('user-list')
 const nameForm = document.getElementById("github-form");
 
 nameForm.addEventListener("submit", function(event){
    event.preventDefault();
    
 
    const searchContainer = event.target.search;
    const login = searchContainer.value;
  
    fetch(`https://api.github.com/search/users?q=${login}`)
    .then(resp => resp.json())
    .then(users => renderAllUsers(users.items));
    
    });
 

    function renderAllUsers(users){
        
        users.forEach((user) => {
            renderSingleUser(user);
        });
    }
   
 
 function renderSingleUser(user){
     
     container.innerHTML += `<li> <a href="${user.repos_url}">${user.login}</a>
     , <img src= "${user.avatar_url}" style="width:42px;height:42px;border:0;"> </li>`
    
    
 }


  

  container.addEventListener("click", function(event){
      
    console.log( event.target.login )
  })
 


