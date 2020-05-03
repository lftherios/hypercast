var choo = require("choo");
var app = choo();

app.use(function (state, emitter) {
  state.broadcast = {};
  state.broadcast.active = false;
  state.broadcast.key = null;
  state.broadcast.audioOnly = false;

  emitter.on("audioOnlyToggle", function () {
    state.broadcast.audioOnly = !state.broadcast.audioOnly;
    emitter.emit("render");
  });

  emitter.on("broadcast:start", function (key) {
    state.broadcast.peerCount = 0;
    state.broadcast.active = true;
    state.broadcast.key = key;

    emitter.emit("render");
  });

  emitter.on("broadcast:peer", function (peerCount) {
    state.broadcast.peerCount = peerCount;
    emitter.emit("render");
  });

  emitter.on("broadcast:stop", function () {
    state.broadcast.peerCount = 0;
    state.broadcast.active = false;
    state.broadcast.key = null;

    emitter.emit("render");
  });
});

app.route("/", require("./templates/home"));

document.body.appendChild(app.start());
