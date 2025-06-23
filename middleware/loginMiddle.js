const jwt = require('jsonwebtoken');

module.exports = loginMiddle = (req, res, next)=>{
  const token = req.headers.authorization.split(' ')[1];;

  try{
    const jwtDecoded = jwt.verify(token, process.env.JWT_SECRET);

    const userId = jwtDecoded.id;
    req.userId = userId;

    console.log('유저 : ',userId)
    next();
  }catch(err){
    res.status(401).json({message: '토큰 인증 실패'});
    console.error(err);
  }
}