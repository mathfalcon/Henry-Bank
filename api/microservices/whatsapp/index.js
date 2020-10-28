const whatsAppWeb = require("baileys");

const client = new whatsAppWeb();

// Module to connect whatsapp to the server
module.exports.connectApi = async (req, res) => {
  client.connect();
  res
    .send({
      success: true,
      message:
        "Check console to find the QR code that you need to use to connect to Whatsapp Web API",
    })
    .catch((err) => {
      console.log(err);
      res.send({
        success: false,
        message: "WhatsApp authentication error",
        err,
      });
    });
};
// Module to send whatsapp notifications
module.exports.sendMessage = async (req, res) => {
  options = {
    quoted: null,
    timestamp: new Date(),
  };
  client.sendTextMessage(
    `${req.body.phone}@s.whatsapp.net`,
    req.body.body,
    options
  );
  res
    .send({
      success: true,
      message: "Your WhatsApp notification has been sent",
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
  const { userName, phone, api } = req.body;

  options = {
    quoted: null,
    timestamp: new Date(),
  };

  client
    .sendTextMessage(
      `${phone}@s.whatsapp.net`,
      `Hello, ${userName} has invited you to join Henry Bank, visit the following link below to register. exp://${api}:19000`,
      options
    )
    .then((data) =>
      res
        .send({
          success: true,
          message: "Your WhatsApp notification has been sent",
        })
        .catch((err) => {
          console.log(err);
          res.send({
            success: false,
            message: "Something went wrong sending your WhatsApp notification",
            err,
          });
        })
    )
    .catch((err) => {
      res.send({
        success: false,
        message: "Something went wrong sending your WhatsApp notification",
        err,
      });
    });

    res.send({
      success: false,
      message: "Something went wrong sending your WhatsApp notification",
      err,
    });
};
