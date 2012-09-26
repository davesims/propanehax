var url = "http://dl.dropbox.com/u/6926437/"

function DropMachine(library) {
  if (undefined == library) {
    this.library = [
      [/#parent/, "http://www.dailywav.com/0212/trying2parent.wav"]
    ];
  } else {
    this.library = library;
  }

}

DropMachine.prototype = {
  matchMessage:function (messages) {
    for (var i = 0; i < this.library.length; i++) {
      for (var j = 0; j < messages.length; j++) {
        var ary = this.library[i];
        var regex = ary[0];
        var url = ary[1];
        var message = messages[j];
        if (message.bodyElement().innerText.match(regex)) {
          return url;
        }
      }
    }
    return null;
  }
}

Campfire.DropMachine = Class.create({
  initialize:function (chat) {
    this.chat = chat;
    this.dropMachine = new DropMachine();
  },

  onMessagesInserted:function (messages) {
    var url = this.dropMachine.matchMessage(messages);
    if (url != null) {
      var audio = new Audio(url);
      audio.play();
    }
  }
});

Campfire.Responders.push("DropMachine");
window.chat.installPropaneResponder("DropMachine", "dropmachine");