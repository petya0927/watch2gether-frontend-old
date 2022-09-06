// create Room class
class Room {
  constructor(id, link, played) {
    this.id = id;
    this.users = [];
    this.link = link;
    this.played = 0 || played;
    this.playbackRate = 1;
  }
}

module.exports = Room;