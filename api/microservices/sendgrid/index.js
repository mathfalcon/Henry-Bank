//require sendgrid/mail
const sgMail = require('@sendgrid/mail');
const User = require('../models/User');
sgMail.setApiKey(process.env.SENDGRID_API_KEY);


const register = async (name, email, token, host) => {
    const msg = {
        from: 'bankhenry7@gmail.com',
        to: email,
        subject: 'Henry Bank - Verify email',
        text: `
            Hello ${name}, thanks for registering on our site.
            Please copy and paste the address below to verify your account.
            http://${host}/verify-email?token=${token}
        `,
        html: `
            <h1>Hello ${name},</h1>
            <p>Thanks for registering on our site.</p>
            <a href="http://${host}/verify-email?token=${token}">Verify your account</a>
        `
    }
    try {
        await sgMail.send(msg);
        console.log('Email sent');
        // res.send({
        //     success: true,
        //     message: `Thanks for registering. Please check your email to verify your account.`,
        // });
    } catch (error) {
        console.log(error);
        // res.send({
        //     success: false,
        //     message: `Something went wrong. Please contact us for assistance.`,
        // });
    }
};


//Email verification route
//server.get('/verify-email', async(req, res, next) => {
const verifyEmail = async(req, res, next) => {
    try {
        const user = await User.findOne({ where: { emailToken: req.query.token }});
        if (!user) {
            req.flash('error', 'Token is invalid. PLease contact us for assistance');
            return res.redirect('/');
        }
        user.emailToken = null;
        user.isVerified = true;
        await user.save();
        await req.login(user, async (err) => {
            if (err) return next(err);
            req.flash('success', `Welcome to Henry Bank ${user.name}`);
            const redirectUrl = req.session.redirectTo || '/';
            delete req.session.redirectTo;
            res.redirect(redirectUrl);
        });
    } catch (error) {
        console.log(error);
        req.flash('error', 'Token is invalid. PLease contact us for assistance');
        res.redirect('/');
    }
};
// Middleware to verified email
const isNotVerified = async (req, res, next) => {
    try {
        const user = await User.findOne({ email: req.body.email });
        if (user.isVerified) {
            return next();
        }
        req.flash('error', 'Your account has not been verified. Please check your email to verify your account');
        return res.redirect('/');
    } catch (error) {
        console.log(error);
        req.flash('error', 'Token is invalid. PLease contact us for assistance');
        res.redirect('/');
    }
};


module.exports = { register, verifyEmail, isNotVerified };
