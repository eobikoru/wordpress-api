App.controller('home', function (page) {
    // put stuff here
  });

  App.controller('page2', function (page) {
    // put stuff here
  });

  try {
    App.restore();
  } catch (err) {
    App.load('home');
  }

  const textPrimary = document.querySelector('.text-primary');

const title = document.querySelector('#title');

const content = document.querySelector('#content');

const addPostButton = document.querySelector('#submit');

fetch('http://emekaobi.atwebpages.com/wp-json/wp/v2/posts').then(response => {
 return response.json()
}).then(posts => {
 console.log(posts);
 console.log(posts[0].content.rendered)
 textPrimary.className = 'text-primary';
 posts.forEach(post => {
  textPrimary.innerHTML += post.content.rendered;
 })

});

fetch('http://emekaobi.atwebpages.com/wp-json/jwt-auth/v1/token', {
 method: "POST",
 headers: {
  "content-Type": 'application/json',
  "accept": 'application/json',
 },
 body: JSON.stringify({
  username: 'emekadaniel916@gmail.com',
  password: 'Emeka@111'
 })
}).then(response => {
 return response.json()
}).then(user => {
 console.log(user.token)
 localStorage.setItem('jwt', user.token)
});

//add post

function addpost() {
    fetch('http://emekaobi.atwebpages.com/wp-json/wp/v2/posts', {
     method: "POST",
     headers: {
      "content-Type": 'application/json',
      "accept": 'application/json',
      'Authorization': `Bearer ${localStorage.getItem('jwt')}`
     },
     body: JSON.stringify({
      title : title.value,
      content : content.value,
      status: 'publish'
     })
    }).then(response => {
     return response.json()
    }).then(post => {
     console.log(post)
    });
   }
   

   addPostButton.addEventListener('click', () => {
    if (!title.value) {
     document.querySelector('.invalidTitle').style.display = 'block';
    } else if(!content.value) {
     document.querySelector('.invalidContent').style.display = 'block';
    } else {
     addpost(); 
     title.value = '';
     content.value = '';
     posts.forEach(post => {
      textPrimary.innerHTML += post.content.rendered;
     });
    }
   })