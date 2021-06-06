let app = new Vue ({
  el: "#app",
  data: {
    keys: [],
    namethegame: "Some RPG game",
    description: "Here will be a description, but i don't have idea to write here something. [~Coming soon~]",
    regexp: {username: /^[A-z0-9_-]{3,16}$/, email: /^[A-Z0-9._%+-]+@[A-Z0-9-]+.+.[A-Z]{2,4}$/i, password: true,},
    //Themes For Site (Бля это будет долго...)
    sitethemes: [

      {theme: "black",
       body: "",
       hud: "",
       windows: "",
       win_borders: "",
       buttons: "",
       btn_borders: "",
      },

      {theme: "white",
       body: "",
       hud: "",
       windows: "",
       win_borders: "",
       buttons: "",
       btn_borders: "",
      },

    ],

    // Player login & save data.
    users: [
      {username: "admin", email: "admin@somegame.rpg", password: "123", donate: "99999", sitetheme: "black",},
      {username: "user", email: "user@somegame.rpg", password: "qwerty", donate: "21", sitetheme: "white",}
    ],

    // Current User data
    currentuser: {
      username: "",
      email: "",
      password: "",
      donate: "0",
      sitetheme: "black",
    },


    //Registration form
    regform: {
      username: "",
      email: "",
      password: "",
      repassword: "",
      invite: "",
    },

    // LogIn form
    loginform: {
      username: "",
      password: "",
      savedata: true,
    },

    // Save slots
    saveslots: [
      {index: 0, slotname: "Slot 1", logo: "images/avatars/All.jpg", heroname: "", lvl: "", money: "", gems: "", savedate: "", timeplayed: "", currentstate: "",},
      {index: 1, slotname: "Slot 2", logo: "", heroname: "", lvl: "", money: "", gems: "", savedate: "", timeplayed: "", currentstate: "",},
      {index: 2, slotname: "Slot 3", logo: "", heroname: "", lvl: "", money: "", gems: "", savedate: "", timeplayed: "", currentstate: "",},
    ],

    tempslot: {},
    chosedsave: {index: 0, heroname: "", lvl: "", money: "", gems: "", savedate: "", timeplayed: "", currentstate: "",}

  },

  methods: {

    load (key, load_item) {
      if (JSON.parse(localStorage.getItem(key)) != (null || undefined)) {
        console.log( key + " is loading...");
        load_item = JSON.parse(localStorage.getItem(key));
        console.log(load_item);
        if (key == "users") {
          this.users = JSON.parse(localStorage.getItem(key));
        }
        else if (key == "curruser") {
          this.currentuser = JSON.parse(localStorage.getItem(key));
        }
        else if (key == "saveslots") {
          this.saveslots = JSON.parse(localStorage.getItem(key));
        }
        else if (key == "save") {
          this.tempslot = JSON.parse(localStorage.getItem(key));
          for (var i = 0; i < this.saveslots.length; i++) {
            console.log("Slot " +i);
            if (this.saveslots[i].index == this.tempslot.index) {
              this.saveslots[i] = JSON.parse(localStorage.getItem(key));
            }
          }
        }
        else {
        console.log( key + " - Save not found :(");
        }
      }
    },

    save(key, save_item) {
      console.log("Saving...");
      let json = JSON.stringify(save_item);
      console.log("Key: " + key + ", JSON: " + json);
      localStorage.setItem(key, json);
    },

    gohome() {
      location.href = 'index.html';
    },

    btnplay() {
      console.log("log");
      if (this.currentuser.username != "") {
        document.querySelector(".welcome").style.display = "none";
        document.querySelector(".profile").style.display = "flex";
      }
      else {
        document.querySelector(".welcome").style.display = "none";
        document.querySelector(".kingmessage").style.display = "flex";
      }
    },

    gologin() {
      console.log("Go to Log In.");
      document.querySelector(".welcome").style.display = "none";
      document.querySelector(".regform").style.display = "none";
      document.querySelector(".kingmessage").style.display = "none";
      document.querySelector(".loginform").style.display = "flex";
      document.querySelector(".loginform").classList.add('open');
    },

    goreg() {
      console.log("Go to Sign Up.");
      document.querySelector(".welcome").style.display = "none";
      document.querySelector(".kingmessage").style.display = "none";
      document.querySelector(".loginform").style.display = "none";
      document.querySelector(".regform").style.display = "flex";
      document.querySelector(".regform").classList.add('open');
    },

    login() {
      console.log("Try LogIn...");
      if (this.loginform.username != "" && this.loginform.password != "") {
        console.log("Search users");
        for (var i = 0; i <= (this.users.length); i++) {
          if ( i == this.users.length) {
            document.querySelector('h3[class="input_error"]').style.visibility = "visible";
            document.querySelector('h3[class="input_error"]').innerHTML = "Login or password wrong.";
          }
          else {
            let e = this.users[i];
            console.log("Id:" + i + ", " + e.username + ", "+ e.password);
            if (this.loginform.username == e.username && this.loginform.password == e.password) {
              console.log("Authorization...");
              this.currentuser.username = e.username;
              this.currentuser.password = e.password;
              this.currentuser.email = e.email;
              this.currentuser.donate = e.donate;
              console.log("Close authorization...");
              document.querySelector(".out").style.display = "none";
              document.querySelector(".logged").style.display = "flex";
              document.querySelector(".loginform").style.display = "none";
              document.querySelector(".profile").style.display = "flex";
              if (this.loginform.savedata == true) {
                console.log("Save account");
                this.save("curruser", this.currentuser);
              }
              break;
            }
          }
        }

      }
      else {
        document.querySelector('h3[class="input_error"]').style.visibility = "visible";
        document.querySelector('h3[class="input_error"]').innerHTML = "Fill all fields";
      }

    },

    signup() {
      console.log("Try SignUp...");

      for (var i = 0; i <= this.users.length; i++) { //цикл для проверки повторов
        let e = this.users[i]; // сокрашение до е
        if (i < this.users.length) { //проверка ника
          console.log("Id:" + i + ", " + e.username + ", " + e.email + ".");
          if (this.regform.username == e.username || this.regform.email == e.email) {
            console.log("Login or E-Mail is busy.");
            break;
          }
        }
        else {
          console.log("Users not found. Login is free.");
          console.log("Username:" + this.regexp.username.test(this.regform.username));
          console.log("E-Mail:" + this.regexp.email.test(this.regform.email));
          console.log("Password:" + (this.regform.password != ""));
          console.log("Re-Pass:" + (this.regform.repassword == this.regform.password));
          if (this.regexp.username.test(this.regform.username) && this.regexp.email.test(this.regform.email) && (this.regform.password != "") /* this.regexp.password.test(this.regform.password)*/ && (this.regform.repassword == this.regform.password) )
          {
            console.log("Registration...");
            //Reg Data Add to Array
            this.users.push({username: this.regform.username, email: this.regform.email, password: this.regform.password, donate: "0", sitetheme: this.currentuser.sitetheme,});
            this. save("users", this.users);
            // this.regform.invited
            // Auto login
            this.currentuser.username = this.regform.username;
            this.currentuser.password = this.regform.password;
            this.currentuser.email = this.regform.email;
            console.log("Close RegForm");
            document.querySelector(".out").style.display = "none";
            document.querySelector(".logged").style.display = "flex";
            document.querySelector(".regform").style.display = "none";
            document.querySelector(".welcome").style.display = "none";
            document.querySelector(".profile").style.display = "flex";
            break;
          }
          else
          {
            console.log("Not corrected data");
          }
        }
      }
    },

    logout() {
     this.currentuser.username = "";
     this.currentuser.password = "";
     this.currentuser.email = "";
     this.currentuser.donate = "0";
     document.querySelector(".out").style.display = "flex";
     document.querySelector(".logged").style.display = "none";
     document.querySelector(".loginform").style.display = "none";
     document.querySelector(".regform").style.display = "none";
     document.querySelector(".profile").style.display = "none";
     document.querySelector(".welcome").style.display = "flex";
     // this.save_currentuser();
     this.save("curruser", this.currentuser);
    },

    goprofile() {
     document.querySelector(".loginform").style.display = "none";
     document.querySelector(".regform").style.display = "none";
     document.querySelector(".welcome").style.display = "none";
     document.querySelector(".kingmessage").style.display = "none";
     document.querySelector(".profile").style.display = "flex";
    },

    choose_slot (id) {
      console.log(id);
      this.chosedsave = this.saveslots[id];
    },

    play(type) {
     if (type == "guest") {
       alert ("Play as guest");
       location.href = 'game/index.html';
     }
     else if (type == "player") {
       if (this.chosedsave.slotname != undefined) {
         if (this.chosedsave.heroname == "") {
           alert ("New game in " + this.chosedsave.slotname)
         }
         else {
           alert ("Play as "+ this.chosedsave.heroname + " (" + this.chosedsave.slotname + ")");
         }
         this.save("save", this.chosedsave);
         this.save("saveslots", this.saveslots);
         location.href = 'game/index.html';
       }
       else {
         alert("Choose slot ");
       }
     }
    },
  },

  computed: {

    update() {

    },


          // Проверка данных тут должна быть
    // datacorrect () {
    //   if (regform.username == /^[a-z0-9_-]{3,16}$/) {
    //     console.log("Data correct");
    //     return "";
    //   }
    // },



  },

  created () {
    console.log(this.currentuser.username);
    this.load("keys", this.keys);
    console.log("Count of keys: " + localStorage.length);
    console.log("Keys: " + this.keys);
    for (var i = 0; i < localStorage.length; i++) {
      // console.log(localStorage.key(i));
      for (var x = 0; x < this.keys.length; x++) {
        console.log(this.keys[x]);
        if (localStorage.key(i) != this.keys[x]) {
          this.keys.push(localStorage.key(i));
          this.save("keys", this.keys);
        }
      }
      switch (localStorage.key(i)) {
        case "curruser":
          this.load("curruser", this.currentuser);
          break;
        case "users":
          this.load("users", this.users);
          break;
        case "save":
          this.load("save", this.player);
          break;
        case "saveslots":
          this.load("saveslots", this.saveslots);
          break;
        default:
        break;
      }
    }
  },

  mounted() {
    console.log(this.currentuser.username);
    if (this.currentuser.username != "") {
      document.querySelector(".out").style.display = "none";
      document.querySelector(".logged").style.display = "flex";
    }
    else {
      document.querySelector(".out").style.display = "flex";
      document.querySelector(".logged").style.display = "none";
    }
  },
})
