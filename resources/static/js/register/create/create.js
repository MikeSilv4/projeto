

function create_user() {

  const data = get_data();

  if(!data){
    return;
  }

  const url = new URL('/api/registration/', window.location.origin);
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
        if(response.status){
          Swal.fire({
            icon: "error",
            title: "Oops...",
            text: "Este usuario ja existe..",
          });
        }else{
          Swal.fire({
            icon: "error",
            title: "Oops...",
            text: "Algo esta errado..",
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

  } 
  if(cpf.length != 14){

    Swal.fire({
      icon: "error",
      title: "Oops...",
      text: "O campo CPF esta incorreto!",
    });

    return false;
  }

  if(passwd1.length < 8 || passwd1.length > 10){

      Swal.fire({
        icon: "error",
        title: "Oops...",
        text: "A senha deve conter entre 8 e 10 digitos!",
      });
  
      return false;

  }

  data = {email, born_date, cpf, first_name, last_name, passwd1};

  return data;

}

document.getElementById('cpf_field').addEventListener('input', function(e) {
  var cpf = e.target.value.replace(/\D/g, ''); // Remove caracteres não numéricos
  cpf = cpf.replace(/(\d{3})(\d)/, '$1.$2'); // Insere o primeiro ponto
  cpf = cpf.replace(/(\d{3})(\d)/, '$1.$2'); // Insere o segundo ponto
  cpf = cpf.replace(/(\d{3})(\d{1,2})$/, '$1-$2'); // Insere o hífen
  e.target.value = cpf;
});