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

        <div class="col-lg-2 mr-5 mb-5" onclick="retreave_event(${obj.id});" style="cursor: pointer;">
            <div class="border" id="${obj.id}" style="border: 1px;">
                <div class="row d-flex justify-content-center">
                    <img src="/resources/static/images/events/default.png" style="width: 200px; ">
                </div>
                <div class="text-center" style="color: white;">${obj.name}</div>
                <div class="text-center" style="color: white;">${obj.initial_date}</div>
                <div class="text-center" style="color: white;">${obj.final_date}</div>
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

function open_modal(data){
    console.log(data);
    var user_events = window.localStorage.getItem('user_events');
    user_events = JSON.parse(user_events);
    let buy_button = document.getElementById('buy_button');

    if(data.num_participants === data.max_participants){
        buy_button.disabled = true;
    }else{
        buy_button.disabled = false;
    }

   for(let i of user_events){
        if(i === data.id){
            buy_button.disabled = true;
            break;
        }else{
            buy_button.disabled = false;
        }
    }

    var event_id = JSON.stringify(data.id);
    window.localStorage.setItem('event_id', event_id);

    var modal = new bootstrap.Modal(document.getElementById('event'));
    modal.show();

    document.getElementById('close_modal').addEventListener('click', function(){
        modal.hide();
    });

    document.getElementById('buy_button').addEventListener('click', function(){
        modal.hide();
    });

    let data_table = document.getElementById('data_table');
    let sales = document.getElementById('sales');
    data_table.innerHTML = '';
    sales.innerHTML = '';
    data_table.innerHTML = `
        <tr><th colspan="2" style="font-size: 20px;"><center>${data.name}</center></th></tr>
        <tr><td colspan="2" style="font-size: 12px; word-wrap: break-word; max-width: 400px;"><center>${data.description}</center></td></tr>
        <tr><th><center>Inicio: </center></th><th><center>Termino: </center></th></tr>
        <tr><td><center>${data.initial_date}</center></td><td><center>${data.final_date}</center></td></tr>     
        <tr><th colspan="2"><center>Horas de funcionamento do evento (diario):</center></th></tr>
        <tr><td colspan="2"><center>${data.initial_hour}&nbsp;às&nbsp;${data.final_hour}</center></td></tr>
        <tr><th colspan="2"><center>Valor: </center></th></tr>
        <tr><td colspan="2"><center>${data.enrollment_value}</center></td></tr>
    `;
    sales.innerHTML = ` 
    ${data.num_participants}/${data.max_participants}
    `

    function new_modal(){
        buy_modal(modal);
    }
}

function retreave_event(id) {
    const url = new URL(`/api/event/${id}`, window.location.origin);

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
        open_modal(data); // Aqui 'data' contém o JSON resolvido
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

function buy_modal(){

    var event = window.localStorage.getItem('event_id');
    event = JSON.parse(event);
    var user = window.localStorage.getItem('userPk');
    user = JSON.parse(user);
    console.log(userPk);
    let data = {user, event};
    console.log(data);
    const url = new URL(`/api/home/user_events/`, window.location.origin);
    fetch(url, {
      method: 'POST',
      headers: {
          'Content-Type': 'application/json',
          'X-CSRFToken': getCookie('csrftoken')
      },
      body: JSON.stringify(data)  
    })
    .then((response) => {
    if (response.ok) {

    } else {
        Swal.fire({
        icon: "error",
        title: "Oops...",
        text: "Algo esta errado",
        });
    }
    });

    var buy_modal = new bootstrap.Modal(document.getElementById('buy_modal'));
    buy_modal.show();

    document.getElementById('close_buy_modal').addEventListener('click', function(){
        buy_modal.hide();
        window.location.href = location.protocol + "//" + location.host + "/dash/home/events"; 
    });

}