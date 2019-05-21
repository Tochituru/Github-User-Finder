//1. Llamar al input, 
//2. Agregamos un listener al botón del formulario
//3. Todo dentro del listener.
//4. Guardo el valor del input y lo valido
//5. Hago el fetch

const clientId = '1bdf77874d539b78c9ed';
const clientSecret = '4a1769b47ff7b03618226f664593537acba3e3ba';
const input = document.querySelector('#search-form input');
const cantidadDeRepos = 5;

function traerDatos() {
    const user = input.value;
    //cuando hay un input y botón dentro del formulario, por default manda toda la información a cierto lugar (servidor, api, algo) porque es type "submit". 
    //Una solución es poner "type=button", así evita que se haga esa acción por default.

    if (user) {
        //tres opciones de validación: user !== '', user.length > 0, user (para que sea true, no false)
        const urlUserInfo = `https://api.github.com/users/${user}?client_id=${clientId}&client_secret=${clientSecret}`;
        fetch(urlUserInfo)
            .then(res => res.json())
            .then(userInfo => {
                console.log(userInfo);
                document
                    .querySelector('#profile .card img')
                    .src = userInfo.avatar_url;
                document
                    .querySelector('#profile .card .card-title')
                    .innerText = userInfo.login;
                document
                    .querySelector('#profile .card a')
                    .href = userInfo.html_url;
                document
                    .querySelector('#profile .card #public-repos')
                    .innerHTML = userInfo.public_repos;
                document
                    .querySelector('#profile .card #followers')
                    .innerHTML = userInfo.followers;
                document
                    .querySelector('#profile .card #following')
                    .innerHTML = userInfo.following;

            });

        const urlRepos = `https://api.github.com/users/${user}/repos?per_page=${cantidadDeRepos}&client_id=${clientId}&client_secret=${clientSecret}`;

        fetch(urlRepos)
            .then(res => res.json())
            .then(repos => {
                console.log(repos)
                //no hace falta modificar cada a por su cuenta
                const listaDeRepositorios = [];
                repos.forEach(repo => {
                    const repoName = repo.fullname.replace(`${repo.owner.login}/`, '');
                    listaDeRepositorios
                        .push(`<a href="${repo.html_url}" target="_blank"
                    class="list-group-item list-group-item-action">${repo.name}</a>`);
                    document
                        .querySelector('#profile .list-group')
                        .innerHTML = listaDeRepositorios.join('');
                })
            })
    }
}

// document
//opción a: hacer onclick y onkeypress = 13, función; sobre el botón
//     .querySelector('#search-form')
//     .addEventListener('click', function (e) {
//         traerDatos();
//     });

// document
//opción a: segunda parte
//     .querySelector("#search-form input")
//puede ser onclick tb
//     .addEventListener("keypress", function (e) {

// if(e.charCode) etc
//         if (e.keyCode === 13) {
//             e.preventDefault();

//me guardo el valor del input
//             const user = input.value;
//             traerDatos();

//         }
//     });

document
    .querySelector('#search-form')
    .addEventListener('submit', e => {
        e.preventDefault();
        traerDatos();
    });

    //Vamos a ordernar los elementos

