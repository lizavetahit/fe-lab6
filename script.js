var API_URL = 'https://randomuser.me/api/?results=5';

var button = document.getElementById('download-btn');
var statusBox = document.getElementById('status');
var usersBox = document.getElementById('users');

button.addEventListener('click', loadUsers);

function loadUsers() {
    button.disabled = true;
    statusBox.className = '';
    statusBox.textContent = 'loading...';

    
    fetch(API_URL)
        .then(function (response) {
            if (!response.ok) {
                throw new Error('HTTP ' + response.status);
            }
            return response.json();         
        })
        .then(function (data) {
            showUsers(data.results);
            statusBox.textContent = 'success!';
        })
        .catch(function (error) {
            statusBox.className = 'error';
            statusBox.textContent = 'Помилка завантаження: ' + error.message;
        })
        .finally(function () {
            button.disabled = false;
        });
}


function showUsers(users) {
    usersBox.innerHTML = '';

    users.forEach(function (user) {
        var card = document.createElement('div');
        card.className = 'user';

        var img = document.createElement('img');
        img.src = user.picture.large;                      
        img.alt = user.name.first + ' ' + user.name.last;

        var info = document.createElement('div');
        info.className = 'info';
        info.appendChild(makeLine('Name: ' + user.name.title + ' ' +
                                  user.name.first + ' ' + user.name.last));   
        info.appendChild(makeLine('City: ' + user.location.city));            
        info.appendChild(makeLine('Country: ' + user.location.country));      
        info.appendChild(makeLine('Postcode: ' + user.location.postcode));    

        card.appendChild(img);
        card.appendChild(info);
        usersBox.appendChild(card);
    });
}

function makeLine(text) {
    var p = document.createElement('p');
    p.textContent = text;          
    return p;
}
