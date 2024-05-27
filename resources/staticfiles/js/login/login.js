

function login_validation() {

    const data = get_data();
    const url = new URL('/api/login/', window.location.origin);
  
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
          window.location.href = `${response.url}`;
          console.log('ta logado');
        } else {
          Swal.fire({
            icon: "error",
            title: "Oops...",
            text: "Someething went wrong",
          });
        }
      })
      .then((data) => {
        // Tratar os dados recebidos
        console.log(data);
      })
      .catch((error) => {
        // Tratar o erro
        console.log(url);
        console.log(data);
        console.error(error.message);
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

    let email = document.getElementById('email_form').value;
    let passwd = document.getElementById('passwd_form').value;

    data = {email, passwd};
    
    return data;
  
  }