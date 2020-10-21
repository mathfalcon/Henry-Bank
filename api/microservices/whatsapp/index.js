const whatsAppWeb = require('baileys');

const client = new whatsAppWeb();

// Module to connect whatsapp to the server
module.exports.connectApi = async (req, res) => {
    client.connect()
    .then(([user, chats, contacts, unread ]) => {
        res.send({
            success: true,
            message:
              "Successful WhatsApp authentication"
          })
          .catch((err) => {
            console.log(err);
            res.send({
              success: false,
              message: "WhatsApp authentication error",
              err,
            });
        });
    });
};
// Module to send whatsapp notifications
module.exports.sendMessage = async (req, res) => {
    options = {
        quoted: null,
        timestamp: new Date()
    }
    client.sendTextMessage(`${req.body.phone}@s.whatsapp.net`, req.body.body, options)
    // client.sendTextMessage(
    //     `${req.body.phone}@s.whatsapp.net`,
    //     `Hello, you have recieved an invitation to Henry Bank from ${userId}`,
    //     options
    //     )
    res.send({
        success: true,
        message:
          "Your WhatsApp notification has been sent"
      })
      .catch((err) => {
        console.log(err);
        res.send({
          success: false,
          message: "Something went wrong sending your WhatsApp notification",
          err,
        });
    });
};
// Module to send whatsapp notification when the user is not in the database
module.exports.sendInvitation = async (req, res) => {
    options = {
        quoted: null,
        timestamp: new Date()
    }
    client.sendTextMessage(
        `${req.body.phone}@s.whatsapp.net`,
        `Hello, you have recieved an invitation to Henry Bank from ${req.body.userId}`,
        options
        )
    res.send({
        success: true,
        message:
          "Your WhatsApp notification has been sent"
      })
      .catch((err) => {
        console.log(err);
        res.send({
          success: false,
          message: "Something went wrong sending your WhatsApp notification",
          err,
        });
    });
};