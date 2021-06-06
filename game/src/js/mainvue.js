let app = new Vue ({
  el: ".left_block",
  data: {
    player: {
      index: "#",
      slotname: "Slot #",
      heroname: "",
      lvl: "",
      money: "",
      gems: "",
      savedate: "",
      timeplayed: "",
      currentstate: "",
    },
  },
  methods: {
    load (key, load_item) {
      if (JSON.parse(localStorage.getItem(key)) != (null || undefined)) {
        console.log( key + " is loading...");
        load_item = JSON.parse(localStorage.getItem(key));
        console.log(load_item);
        if (key == "save") {
          this.player = JSON.parse(localStorage.getItem(key));
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

    btn_save() {
      let nowDate = new Date();
      this.player.savedate = nowDate.getFullYear() + "/" + nowDate.getMonth() + "/" + nowDate.getDate() + " | " + nowDate.getHours() + "h:" + nowDate.getMinutes() + "m:" + nowDate.getSeconds() + "s";
      console.log("Saving...");
      this.save("save", this.player);
      location.href = '../index.html';
    },
  },
  created (){
    console.log("Play");
    this.load("save", this.player)
  },
})
