import jwt from 'jsonwebtoken'

const generateToken = (id, userData) => {
    
    // generate the token with the secret key in ENV file 
    return jwt.sign({ id, userData }, process.env.JWT_SECRET, {
        
        // 30d for reset token 
        expiresIn: '30d'
    })
}

export default generateToken;