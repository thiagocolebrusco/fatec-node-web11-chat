module.exports = (app) => {
    return {
        filter: (req, res, next) => {
            let token = req.headers.token;
            
            if(req.originalUrl == "/usuarios/login"){
                next();
            } else if(token) {
                app.get("jwt").verify(token, "senhasecretafatec", (err, decoded) => {
                    if(err){
                        return res.sendStatus(401)
                    } else {
                        req.decoded = decoded;
                        console.log(decoded)
                        next();
                    }
                })
            } else {
                return res.status(401).send("Falta o token");
            }
        }
    }
}