function logout(){
    
    const url = new URL('/api/logout/', window.location.origin);

    fetch(url, {
      method: 'GET',
      headers: {
          'Content-Type': 'application/json',
          'X-CSRFToken': getCookie('csrftoken')
      },
    });

}