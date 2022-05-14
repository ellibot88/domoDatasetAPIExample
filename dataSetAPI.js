//Authenticate with Domo API

const { domo_client_id, domo_client_secret } = process.env;
const config = {
  headers: {
    Authorization:
      "Basic " +
      Buffer.from(`${domo_client_id}:${domo_client_secret}`).toString("base64"),
  },
};
axios
  .post(
    "https://api.domo.com/oauth/token?grant_type=client_credentials&scope=data%20user",
    {},
    config
  )
  .then((res) => {
    let token = res.data["access_token"];
  })
  .catch((err) => console.log(err));

//Call DataSet API and save payload

//Loop through payload and send text messages using Twilio API
const { twilio_account_sid, twilio_auth_token, twilio_phone_number } =
  process.env;
let configuration = {
  headers: {
    Authorization:
      "Basic " +
      Buffer.from(`${twilio_account_sid}:${twilio_auth_token}`).toString(
        "base64"
      ),
    Accept: "application/json",
    "Content-Type": "application/x-www-form-urlencoded",
  },
};

res.data.rows.forEach((element) => {
  axios
    .post(
      `https://api.twilio.com/2010-04-01/Accounts/${twilio_account_sid}/Messages.json`,
      `To=+1${element[0]}&From=${twilio_phone_number}&Body=${element[1]}`,
      configuration
    )
    .then((axiosRes) => {})
    .catch((axiosErr) => console.log(axiosErr));
});
