// [
//     {
//         id: '/#46131315303',
//         name: 'Bruno',
//         room: 'The Office Fans'
//     }
// ]


// addUser(id, name, room)
// removeUser(id)
// getUser(id)
// getUserList(room)

// var users = [];
//
// var addUser = (id, name, room) => {
//     users.push({});
// }
//
// module.exports = {addUser};

// class Person {
//     constructor (name, age){
//         this.name=name;
//         this.age=age;
//     }
//
//     getUserDescription(){
//         return `${this.name} is ${this.age} year(s) old.`;
//     }
// }
//
// var me = new Person('Bruno',50);
// //console.log(me.name,me.age);
// console.log(me.getUserDescription());

class Users{
    constructor(){
        this.users = [];
    }

    addUser(id,name,room){
        var user = {id,name,room};
        this.users.push(user);
        return user;
    }

    removeUser(id){
        var user=this.getUser(id);

        if(user){
            this.users = this.users.filter((user) => user.id !== id);
        }

        return user;
    }

    getUser(id){
        return this.users.filter((user) => user.id === id)[0];
    }

    getUserList(room){
        var users = this.users.filter((user) => user.room === room);
        var namesArray = users.map((user) => user.name);

        return namesArray;
    }
}

module.exports = {Users};


