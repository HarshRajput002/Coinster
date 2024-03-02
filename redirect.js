if (document.cookie.includes('connect.sid=')) {
    window.location.href = '/home';
  } else {
    window.location.href = '/login';
  }