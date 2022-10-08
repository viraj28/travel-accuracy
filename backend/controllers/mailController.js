const axios = require('axios');

/***
 * @desc getKeys -- get the keys for emailjs
 * @route GET /api/mail/
 * @access Publics
 */

const getKeys = async (req, res) => {
  const publicKey = process.env.EMAILJS_PUBLIC;
  const SID = process.env.EMAILJS_SID;
  const TID = process.env.EMAILJS_TID;

  var data = {
    service_id: SID,
    template_id: TID,
    user_id: publicKey,
  };

  res.status(200).json(data);
};

module.exports = { getKeys };
