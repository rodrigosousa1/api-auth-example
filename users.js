//list of users
var users = [
    { 
        id: 1,
        email: "user@mail.com",
        password: "1234"
     },
     { 
        id: 2,
        email: "user1@mail.com",
        password: "1234"
     }
];

var getUser = function(id)  {
    return users.find(function (u) {
        return u.id === id;
    });
}

var findUser = function(email, password) {
     return users.find(function (user) {
        return user.email === email && user.password === password;
  });
}


module.exports = {
    getUser,
    findUser
}