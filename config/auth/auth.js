const jwt = require('jsonwebtoken');
const fs = require('fs');
const path = require('path');
const DIR_PATH = "./tmp/token.json";
const crypto = require('crypto');

class Auth {
    
    init(exp = 8){
        this.exp = exp;
    }

    getPrivateKey(){
        return fs.readFileSync(`${__dirname}/app.rsa`); //openssl genrsa -out app.rsa 2048
    }

    getPublicKey(){
        return fs.readFileSync(`${__dirname}/app.rsa.pub`); //openssl rsa -in app.rsa -pubout > app.rsa.pub
    }

    async saveToLocal(token, id) {
        let dirPath = path.dirname(DIR_PATH);
        const mykey = crypto.createCipher('aes-128-cbc', process.env.KEY_ENC_TOKEN);
        token = mykey.update(token, 'utf8', 'hex')
        token += mykey.final('hex');
        if(fs.existsSync(DIR_PATH)){
            let val = fs.readFileSync(DIR_PATH, {encoding : "utf8"});
            val = JSON.parse(val);

            val.push({
                token : token,
                user_id : id,
                used : 0
            })  
            fs.writeFile(DIR_PATH, JSON.stringify(val), () => {});
        }
        else {
            console.log("blm ada");
            let val = new Array()
            val.push({
                token : token,
                user_id : id,
                used : 0
            });
            fs.mkdirSync(dirPath, {recursive : true});
            fs.writeFile(DIR_PATH, JSON.stringify(val), () => {});
        }
        
    }

    generateToken(userId, userType){
        let curdate = new Date().getTime();
        let tokenExpired = curdate + (this.exp * (60 * 1000));
        const token = jwt.sign({
            "exp":    tokenExpired,
            "iat":    curdate,
            "sub":    userId,
            "status": userType,
        }, this.getPrivateKey());
        let refreshTokenExpired = curdate + (30 * (24 * 60 * 60 * 1000));
        const refreshToken = jwt.sign({
            "exp": refreshTokenExpired,
            "iat" : curdate,
            "sub" : userId,
            "status": userType,
        }, this.getPrivateKey())
        const tokenResponse = {
            token : token,
            refreshToken : refreshToken
        }

        this.saveToLocal(refreshToken, userId);

        return tokenResponse;

    }

    refreshToken(refreshToken){
        let val = fs.readFileSync(DIR_PATH, {encoding : "utf8"});
        val = JSON.parse(val);
        let foundedToken = false;
        let tokenWasUsed = false;
        let tokenFound;
        let used = 0;
        for(let v in val){
            let mykey = crypto.createDecipher('aes-128-cbc', process.env.KEY_ENC_TOKEN);
            let token = mykey.update(val[v].token, 'hex', 'utf8')
            token += mykey.final('utf8');
            if(token === refreshToken){
                foundedToken = true;
                if(val[v].used === 0){
                    tokenWasUsed = true;
                    used = 1;
                    tokenFound = jwt.verify(token, this.getPrivateKey());
                }
            }
        }
        if(!foundedToken) {
            return {
                msg : "TOKEN_NOT_FOUND"
            };
        }
        if(!tokenWasUsed){
            return {
                msg : "TOKEN_WAS_USED"
            };
        }
        val = fs.readFileSync(DIR_PATH, {encoding : "utf8"});
        val = JSON.parse(val);
        for(let v in val){
            let mykey = crypto.createDecipher('aes-128-cbc', process.env.KEY_ENC_TOKEN);
            let token = mykey.update(val[v].token, 'hex', 'utf8')
            token += mykey.final('utf8');
            if(token === refreshToken){
                val[v].used = 1;
            }
        }
        fs.writeFileSync(DIR_PATH, JSON.stringify(val), () => {});
        return this.generateToken(tokenFound.sub, tokenFound.status);
    }
    revokeToken(token){
        const userToken = jwt.verify(token, this.getPrivateKey());
        let val = fs.readFileSync(DIR_PATH, {encoding : "utf8"});
        val = JSON.parse(val);
        
        const filtered = val.filter((v, i) => {
            if(v.user_id != userToken.sub){
                return v;
            }
        })

        fs.writeFile(DIR_PATH, JSON.stringify(filtered));
    }

    extractor(token){
        const userToken = jwt.verify(token, this.getPrivateKey());
        return userToken;
    }
    
    checkToken(token){
        const userToken = jwt.verify(token, this.getPrivateKey());
        if(userToken.exp > new Date().getTime()){
            return {
                status : true,
                payload : userToken
            };
        } else {
            return {
                status : false,
                msg : "TOKEN_WAS_EXPIRED"
            }
        }
    }
}

module.exports = new Auth(); 