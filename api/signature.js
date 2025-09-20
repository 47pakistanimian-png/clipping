const crypto = require('crypto');

export default function handler(req, res) {
  const { transformation, timestamp } = req.query;
  
  const params = { 
    eager_async: 'true',
    timestamp, 
    transformation 
  };
  
  const sortedParams = Object.keys(params)
    .sort()
    .map(key => `${key}=${params[key]}`)
    .join('&');
    
  const signature = crypto
    .createHash('sha1')
    .update(sortedParams + process.env.CLOUDINARY_SECRET)
    .digest('hex');
    
  res.json({ signature, timestamp });
}
