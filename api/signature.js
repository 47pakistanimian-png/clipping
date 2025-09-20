const crypto = require('crypto');

export default function handler(req, res) {
  const { transformation } = req.query;
  
  // Generate fresh timestamp
  const timestamp = Math.floor(Date.now() / 1000);
  
  const params = { 
    eager_async: 'true',
    timestamp: timestamp.toString(), 
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
