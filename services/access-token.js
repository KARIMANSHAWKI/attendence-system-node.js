const jwt = require('jsonwebtoken')

function getAccessToken (id, isAdmin, expirePeriod,isSubadmin, isVerified, jwtSecretKey){
   const accessToken = jwt.sign(
   {
        id, isAdmin, isVerified 
   },
   jwtSecretKey, 
   {expiresIn: expirePeriod}
   );

   return accessToken;
}

module.exports= getAccessToken;