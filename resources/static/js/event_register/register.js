
function create_event() {

    const data = get_data();
  
    if(!data){
      return;
    }
  
    const url = new URL('/api/event/', window.location.origin);

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
          return to_home();
        } else {
          Swal.fire({
            icon: "error",
            title: "Oops...",
            text: "Algo esta errado..",
          });
        }
      })
      .then((data) => {
        // Tratar os dados recebidos
      })
      .catch((error) => {
        // Tratar o erro
      });
  
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
  
  function get_data() {
  
    const name = document.getElementById('name_field').value;
    const description = document.getElementById('description_field').value;
    const initial_date = document.getElementById('initial_date_form').value;
    const final_date = document.getElementById('final_date_form').value;
    const enrollment_value = document.getElementById('valor_form').value;
    const initial_hour = document.getElementById('initial_hour_form').value;
    const final_hour = document.getElementById('final_hour_form').value;
    const min_participants = document.getElementById('min_participants_form').value;
    const max_participants = document.getElementById('max_participants_form').value;
    const location = document.getElementById('loc_form').value;
    const num_participants = 0;

    if (initial_hour > final_hour){
      Swal.fire({
          icon: "error",
          title: "Oops...",
          text: "A hora inicial nao pode ser menor que a final!",
      });
      return false;
  }
  if (initial_date > final_date){
      Swal.fire({
          icon: "error",
          title: "Oops...",
          text: "A data inicial nao pode ser menor que a final!",
      });
      return false;
  }

    data = {name, description, initial_date, final_date, initial_hour, final_hour, min_participants, max_participants, num_participants, enrollment_value, location};

    return data;
  
  }

  function to_home(){
    window.location.href = location.protocol + "//" + location.host + "/dash/organizer/home/";
}