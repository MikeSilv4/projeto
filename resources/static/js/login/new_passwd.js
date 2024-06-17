function new_password(user_id) {
    
    const passwd1 = document.getElementById('passwd1').value;
    const passwd2 = document.getElementById('passwd2').value;
    const email = document.getElementById('email').value;
  
    if(passwd1 != passwd2){
      Swal.fire({
        icon: "error",
        title: "Oops...",
        text: "As senhas pecisam ser iguais!",
      });
  
      return false;
  
    }else if(passwd1.length > 10 ||  passwd1.length < 8){
        Swal.fire({
            icon: "error",
            title: "Oops...",
            text: "As senhas pecisam ser iguais!",
          });
      
          return false;
    }

    let data = {'password' : passwd1, 'email' : email};

    const url = new URL(`/api/new-password/`, window.location.origin);
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
            Swal.fire({
                title: "OK!",
                text: "Sucesso",
                icon: "success",
                showConfirmButton: false,
                timer: 1500
              }).then(res => {
                window.location.href = location.protocol + "//" + location.host + "/dash/login/";
              });
        } else {
            Swal.fire({
            icon: "error",
            title: "Oops...",
            text: "Algo esta errado",
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