get_events();


function get_events() {
    const url = new URL(`/api/event/`, window.location.origin);

    fetch(url, {
        method: 'GET',
        headers: {
            'Content-Type': 'application/json',
            'X-CSRFToken': getCookie('csrftoken')
        },
    })
    .then((response) => {
        if (response.ok) {
            return response.json(); // Retorna a Promise do JSON
        } else {
            throw new Error('Erro ao obter os eventos'); // Lança um erro para cair no bloco catch
        }
    })
    .then((data) => {
        make_table(data); // Aqui 'data' contém o JSON resolvido
    })
    .catch((error) => {
        console.error('Erro na requisição:', error);
        Swal.fire({
            icon: "error",
            title: "Oops...",
            text: "Algo está errado...",
        });
    });
}

function make_table(data){

    let data_table = document.getElementById('data-table');
    data_table.innerHTML = '';
    let html = "";
    data.forEach(obj => {
        html += `

        <div class="col-lg-2 mr-5" style="background-color: red;">
            <div class="border" id="${obj.id}" style="border: 1px;">
                <div class="row d-flex justify-content-center">
                    <img src="/resources/static/images/events/default.png" style="width: 120px; ">
                </div>
                <div class="text-center">${obj.name}</div>
                <div class="text-center">${obj.initial_date}</div>
                <div class="text-center">${obj.final_date}</div>
            </div>
        </div>

        
        `;
    });

    data_table.innerHTML = html;
}


function getCookie(cname) {
    let name = cname + '=';
    let decodedCookie = decodeURIComponent(document.cookie);
    let ca = decodedCookie.split(';');
    for(let i = 0; i < ca.length; i++) {
        let c = ca[i];
        while (c.charAt(0) === ' ') {
            c = c.substring(1);
        }
        if (c.indexOf(name) === 0) {
            return c.substring(name.length, c.length);
        }
    }
    return "";
}