import { meteor, Meteor } from "meteor/meteor";
import { mongo, Mongo } from "meteor/mongo";
import { check } from "meteor/check";

export const messageCollection = new Mongo.Collection("message");

if (Meteor.isServer) {
  //publish the message collection
  Meteor.publish("message", function messagePublication() {
    return messageCollection.find({
      userId: Meteor.userId()
    });
  });

  // Allow the insertion into the message collection from the client side
  messageCollection.allow({
    insert(userId, doc) {
      // The user must be logged in and the document must be owned by the user.
      return userId && doc.userId === userId;
    }
  });
}

Meteor.methods({
  "message.remove"(messageId) {
    try {
      check(messageId, String);
      //finds the message
      const message = messageCollection.findOne({
        _id: messageId
      });
      if (!message) {
        throw new Meteor.Error("Message does not exists");
      }

      //checks the message owner and logged user are same
      //this will allow only created user can delete a message
      if (!Meteor.isTest && Meteor.userId() !== message.userId) {
        throw new Meteor.Error("You have no permission to delete this message");
      }
      messageCollection.remove(messageId);
    } catch (e) {
      throw new Meteor.Error(500, "Exception", e);
    }
  }
});
