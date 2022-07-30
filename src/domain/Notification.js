const nodemailer = require("nodemailer");
class Notification {
  constructor(cryptocarency, senderEmail, transportConfig) {
    this.cryptocarency = cryptocarency;
    this.senderEmail = senderEmail;
    this.transporter = nodemailer.createTransport(transportConfig);
  }

  async send({ email, baseCarency, vsCarency }) {
    const rate = await this.cryptocarency.getRate(baseCarency, vsCarency);

    const text = `${baseCarency}/${vsCarency}: ${rate}`;

    const mailOptions = {
      to: email,
      from: this.senderEmail,
      subject: "Cryptocarency rate",
      text,
    };

    await this.transporter.sendMail(mailOptions);
  }
}

module.exports = Notification;
