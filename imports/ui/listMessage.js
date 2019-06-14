import { Meteor } from "meteor/meteor";
import { Template } from "meteor/templating";

import "./listMessage.html";

Template.messageList.events({
  "click .deleteMessage"(events) {
    Meteor.call("message.remove", this._id, (err, result) => {
      if (err) {
        alert(err.reason);
      }
    });
  }
});
