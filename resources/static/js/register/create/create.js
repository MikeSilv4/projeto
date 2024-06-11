

function create_user() {

  const data = get_data();

  if(!data){
    return;
  }

  const url = new URL('/api/registration/', window.location.origin);
  console.log(data);
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
        window.location.href = location.protocol + "//" + location.host + "/dash/home/"; 
      } else {
        
        if(response.status == 409){
          Swal.fire({
            icon: "error",
            title: "Oops...",
            text: "Este usuario ja existe!",
          });
        }else{
          Swal.fire({
            icon: "error",
            title: "Oops...",
            text: "Someething went wrong",
          });
        }
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

  const email = document.getElementById('email_field').value;
  const born_date = document.getElementById('born_date_field').value;
  const cpf = document.getElementById('cpf_field').value;
  const first_name = document.getElementById('first_name_field').value;
  const last_name = document.getElementById('last_name_field').value;
  const passwd1 = document.getElementById('passwd_field_1').value;
  const passwd2 = document.getElementById('passwd_field_2').value;

  if(passwd1 != passwd2){
    Swal.fire({
      icon: "error",
      title: "Oops...",
      text: "The passwords must be equal!",
    });

    return false;

  } else if(cpf.length != 14){

    Swal.fire({
      icon: "error",
      title: "Oops...",
      text: "The field CPF is wrong!",
    });

    return false;
  }

  data = {email, born_date, cpf, first_name, last_name, passwd1};

  return data;

}