document.addEventListener("DOMContentLoaded", () => {
    
    const githubForm = document.getElementById("github-form");
    const userList = document.getElementById("user-list");
    const reposList = document.getElementById("repos-list");
    const searchData = document.getElementById("search");

    
    githubForm.addEventListener("submit", (e) => {
        e.preventDefault();

        
        const username = searchData.value.trim();

        if (username) {
        
            userList.innerHTML = "";
            reposList.innerHTML = "";

            
            fetchUserData(username);
        }
    });

    function fetchUserData(username) {
        fetch(`https://api.github.com/users/${username}`)
            .then((response) => response.json())
            .then((userData) => {
            
                displayUserInfo(userData);

                
                fetchUserRepositories(username);
            })
            .catch((error) => {
                console.error('Error fetching user data:', error);
            });
    }

    
    function fetchUserRepositories(username) {
        fetch(`https://api.github.com/users/${username}/repos`)
            .then((response) => response.json())
            .then((reposData) => {
                // Display user repositories
                displayUserRepositories(reposData);
            })
            .catch((error) => {
                console.error('Error fetching user repositories:', error);
            });
    }


    function displayUserInfo(userData) {
        const userItem = document.createElement("li");
        userItem.innerHTML = `
            <img src="${userData.avatar_url}" alt="${userData.login}" width="100">
            <h3>${userData.login}</h3>
            <a href="${userData.html_url}" target="_blank">View Profile</a>
        `;
        userList.appendChild(userItem);
    }

    
    function displayUserRepositories(reposData) {
        reposData.forEach((repo) => {
            const repoItem = document.createElement('li');
            repoItem.innerHTML = `
                <h3>${repo.name}</h3>
                <p>${repo.description || 'No description available'}</p>
                <a href="${repo.html_url}" target="_blank">View Repository</a>
            `;
            reposList.appendChild(repoItem);
        });
    }
});
