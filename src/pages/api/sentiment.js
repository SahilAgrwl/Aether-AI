export default async function handler(req, res) {
    const { content2 } = req.body;
    
    try {
        var myHeaders = new Headers();
        myHeaders.append("apikey", `${process.env.APILAYER_API_KEY}`);
        
        var raw = content2;
        
        var requestOptions = {
          method: 'POST',
          redirect: 'follow',
          headers: myHeaders,
          body: raw
        };
        
        const response = await fetch("https://api.apilayer.com/sentiment/analysis", requestOptions);
        
        // Ensure that the response is in JSON format
        const data = await response.json();
    
  
      res.status(200).json({ sentimentText: data });
    } catch (error) {
      console.error('Error generating image:', error);
      res.status(500).json({ error: 'Failed to generate image' });
    }
  }
  