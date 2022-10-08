const asyncHandler = require('express-async-handler');
const accountSid = process.env.TWILIO_ACCOUNT_SID;
const authToken = process.env.TWILIO_AUTH_TOKEN;
const serviceSid = process.env.TWILIO_SERVICE_SID;
const client = require('twilio')(accountSid, authToken);

/***
 * @desc Generate OTP
 * @route /api/otp/generate
 * @access Private
 */
const getOtp = asyncHandler(async (req, res) => {
  let { phone } = req.body;
  let newPhone;
  if (phone) {
    newPhone = '+91' + phone;
  } else {
    res.status(400);
    throw new Error('Please provide valid phone number.');
  }

  if (newPhone) {
    client.verify.v2
      .services(serviceSid)
      .verifications.create({
        to: newPhone,
        channel: 'sms',
      })
      .then((verification) => {
        console.log(verification.status);
        res
          .status(200)
          .json({ status: verification.status, message: 'OTP sent. Check!' });
      });
  }
});

/***
 * @desc Verify OTP
 * @route /api/otp/generate
 * @access Private
 */

const verifyOtp = asyncHandler(async (req, res) => {
  let { phone, otp } = req.body;
  if (otp) {
    newPhone = '+91' + phone;
  } else {
    res.status(400);
    throw new Error('Please fill in the otp');
  }

  client.verify.v2
    .services(serviceSid)
    .verificationChecks.create({ to: newPhone, code: otp })
    .then((verification_check) => {
      console.log(verification_check.status);
      res.status(200).json({
        status: verification_check.status,
        message:
          verification_check.status === 'approved'
            ? 'OTP verified'
            : 'Incorrect OTP',
      });
    })
    .catch((error) => {
      res.status(400);
      throw new Error(error.message);
    });
});

module.exports = { getOtp, verifyOtp };
