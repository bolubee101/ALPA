const nodemailer = require('nodemailer');
const sender = {
  user: 'youremail@gmail.com',
  pass: 'yourpassword'
}
export const sendMail = (
  service='gmail', 
  senderObject=sender, 
  to='youremail@gmail.com', 
  subject="Hello", 
  text=""
) => {
  try {
    const transporter = nodemailer.createTransport({
      service,
      auth: senderObject
    });
    
    const mailOptions = {
      from: senderObject.user,
      to,
      subject,
      text
    };
    
    transporter.sendMail(mailOptions, (error, info) => {
      if (error) {
        console.log(error);
        return
      } else {
        console.log('Email sent: ' + info.response);
        return info.response
      }
    });
  } catch (error) {
    console.log(error)
    return
  }
}