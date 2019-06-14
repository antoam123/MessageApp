import { Template } from "meteor/templating";
import { meteor, Meteor } from "meteor/meteor";
import { messageCollection } from "../api/message.js";

import "./listMessage.js";
import "./body.html";

Template.body.onCreated(function bodyOnCreated() {
  Meteor.subscribe("message");
});

Template.body.helpers({
  messages() {
    return messageCollection.find({}, { sort: { createdAt: -1 } });
  }
});

Template.body.events({
  "submit .frmPostMessage"(events) {
    events.preventDefault();
    try {
      // Make sure the user is logged in before inserting a message
      if (!Meteor.userId()) {
        throw new Meteor.Error("not-authorized");
      }

      //fetching the message
      const target = event.target;
      const message = target.txtMessage.value;
      if (message === "") {
        alert("Message can't be empty");
        return true;
      }
      //Save the message into the db
      messageCollection.insert({
        message,
        createdAt: new Date(),
        userId: Meteor.userId()
      });
      event.target.txtMessage.value = "";
    } catch (e) {
      //handling error message
      alert(e.error);
    }
  }
});
