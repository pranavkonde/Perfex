const Mailjet = require('node-mailjet');
const dotenv = require("dotenv");

dotenv.config();

const mailjet = Mailjet.apiConnect(
    process.env.MJ_APIKEY_PUBLIC,
    process.env.MJ_APIKEY_PRIVATE,
);

module.exports = function sendMail(email, name, title, otp, msg, callback){

    var url = "<p>Hey "+name+"<br><b>Welcome to Perfex </b><br><p>Your OTP to "+msg+" is : "+otp+"</p></p>"

    const request = mailjet
    .post("send", {'version': 'v3.1'})
    .request({
    "Messages":[
        {
        "From": {
            "Email": "vyawaharepb@gmail.com",
            "Name": "Perfex"
        },
        "To": [
            {
            "Email": email,
            "Name": name
            }
        ],
        "Subject": title,
        "TextPart": "",
        "HTMLPart": url,
        "CustomID": "AppGettingStartedTest"
        }
    ]
    })
    request
    .then((result) => {
        console.log(result.body);
        callback(null);
    })
    .catch((err) => {
        console.log(err.statusCode);
        callback("error occured");
    })
}