import { Meteor } from "meteor/meteor";
import { Random } from "meteor/random";
import assert from "assert";

import { messageCollection } from "./message.js";

if (Meteor.isServer) {
  describe("methods", function() {
    const userId = Random.id();

    beforeEach(() => {
      messageCollection.remove({ test: { $eq: 1 } });
    });

    it("it can remove a message", async function() {
      const messageId = await messageCollection.insert({
        message: "Test message",
        createdAt: new Date(),
        test: 1,
        userId
      });
      Meteor.call("message.remove", messageId, (err, result) => {
        if (err) {
          return false;
        }
        assert.equal(messageCollection.find({ _id: messageId }).count(), 0);
      });
    });

    it("it can't remove a message(message id should be string)", async function() {
      const messageId = await messageCollection.insert({
        message: "Test message",
        createdAt: new Date(),
        test: 1,
        userId
      });
      Meteor.call("message.remove", 123, (err, result) => {
        if (err) {
          return true;
        } else {
          return false;
        }
      });
    });
  });
}
