import { createTransport} from 'nodemailer'


const sendMail = async (email,subject,html) => {
    const transport = createTransport({
        host:"smtp.gmail.com",
        port:465,
        auth:{
            user:"sejal",
            pass:"bananana"
        }
    })

    await transport.sendMail({
        from:"dfdsfdsf",
        to:email,
       subject,
       html
       


    })
}

export default sendMail