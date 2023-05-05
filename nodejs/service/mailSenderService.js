const mailer = require("nodemailer");
const { LOGGER } = require("../common/constants");

/**
 * MAIL SENDER
 *
 * @param {string} subject subject of the email
 * @param {string} body body of the email
 * @return {any} mail response
 */
async function mailSender(subject, body) {
  try {
    // create a transporter
    const transporter = getTransporter();

    // create a mail option
    const mailOption = getMailOption(subject, body);

    // sending the email
    const result = await transporter.sendMail(mailOption);
    console.log("mail sent.");

    return result;
  } catch (err) {
    console.log(err);
  }
}

function getTransporter() {
  const EMAIL_PORT = process.env.EMAIL_PORT;
  const EMAIL_HOST = process.env.EMAIL_HOST;
  const EMAIL_AUTH_USER = process.env.EMAIL_AUTH_USER;
  const EMAIL_AUTH_PASS = process.env.EMAIL_AUTH_PASS;

  if (!EMAIL_PORT || !EMAIL_HOST || !EMAIL_AUTH_USER || !EMAIL_AUTH_PASS) {
    // throw error when env doesnot exist
    throw new Error(LOGGER.ENVIRONMENT_VARIABLES_NOT_SET);
  }

  return mailer.createTransport({
    host: EMAIL_HOST?.toString(),
    port: Number(EMAIL_PORT),
    auth: {
      user: EMAIL_AUTH_USER?.toString(),
      pass: EMAIL_AUTH_PASS?.toString()
    }
  });
}

function getMailOption(subject, body) {
  const EMAIL_FROM = process.env.EMAIL_FROM;
  const EMAIL_TO = process.env.EMAIL_TO;

  if (!EMAIL_FROM || !EMAIL_TO) {
    // throw error when env doesnot exist
    throw new Error(LOGGER.ENVIRONMENT_VARIABLES_NOT_SET);
  }

  return {
    from: EMAIL_FROM?.toString(),
    to: EMAIL_TO?.toString(),
    subject: subject,
    text: body
  };
}

module.exports = {
  mailSender
};
