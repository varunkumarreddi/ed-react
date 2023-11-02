
import emailjs from '@emailjs/browser';

export const sendSMSService = (smsData) => {
    const templateParams= {
        from_name: 'Ethereal Design',
        from_email: 'varunkumarvicky15@gmail.com',
        to_name: smsData.to_name,
        message: smsData.message
    }

    emailjs.send(process.env.REACT_APP_SERVICE_ID, process.env.REACT_APP_TEMPLATE_ID, templateParams, process.env.REACT_APP_PUBLIC_KEY)
        .then((result) => {
            console.log("Email Sent Successfully: ", result);
        }, (error) => {
            console.log("Email Not Sent: ",error);
        });
};