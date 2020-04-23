const helpers = {
    CheckData: function(userData)
    {
            return new Promise((resolve, reject) => {
                let userRegex = new RegExp(/^[a-zA-Z0-9_-]{3,16}$/);
                let mailRegex = new RegExp(/^(?!.{254})(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/)
                let passRegex = new RegExp(/^(?=.*?[A-Z])(?=.*?[a-z])(?=.*?[0-9]).{5,20}$/)
                let avatars = ["iopM.png", "craM.png", "pandawaM.png", "enutrofM.png", "zobalM.png", "sacrierM.png", "roublardM.png", "fecaM.png", "eniripsaM.png",
                "ouginakM.png", "steamerM.png", "xelorM.png", "sadidaM.png", "huppermageM.png", "osamodasM.png", "ecaflipM.png", "sramM.png", "iopF.png", "craF.png", "pandawaF.png",
                "enutrofF.png", "zobalF.png", "sacrierF.png", "roublardF.png", "fecaF.png", "eniripsaF.png", "ouginakF.png", "steamerF.png", "xelorF.png", "sadidaF.png",
                "huppermageF.png", "osamodasF.png", "ecaflipF.png", "sramF.png"]
 
                if (!(userRegex.test(userData.username)))
                    reject("Username must only contain alphanumeric and -_- characheters")
                else if (!avatars.includes(userData.avatar))
                    reject("Please Select your avatar")
                else if (!(mailRegex.test(userData.email)))
                    reject("E-mail must be valid")
                else if (!(passRegex.test(userData.password)))
                    reject("Password requires 1 lower 1 upper case letter and 1 digit and between 5 and 20")
                else
                    resolve("data_clear")
            })
    },
    SendMail: function (email, object, message)
    {
    return new Promise((resolve, reject) => {
        mailOptions = {
              to : email,
              subject : object,
              html : message
        }
        smtpTransport.sendMail(mailOptions, function(error, response){
            if(error) 
                reject(error)
            else
                resolve("Mail was sent successfully");
        });
    })
}
}

module.exports = helpers