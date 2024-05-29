import JWT from 'jsonwebtoken';

function auth(req, res, next) {
  const token = req.header('Authorization');
  console.log(req.header('Authorization'))


  if (!token) return res.status(401).json({ msg: 'Authorization denied' });

  try {
  
    const decoded = JWT.verify(token.split(' ')[1], process.env.JWT_SECRET); 

   
    req.user = decoded;
    next();
  } catch (e) {
    res.status(400).json({ msg: 'Token is not valid' });
  }
}

export default auth;
