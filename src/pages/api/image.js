export default async function handler(req, res) {
    const { content4 } = req.body;
    
    try {
      const response = await fetch('https://api.claid.ai/v1-beta1/image/generate', {
        method: 'POST',
        headers: {
          "Host": "api.claid.ai",
          "Authorization": `Bearer ${process.env.CLAID_API_KEY}`,
          "Content-Type": "application/json"
        },
        body: JSON.stringify({
          "input": content4,
          "options": {
            "number_of_images": 2,
            "guidance_scale": 5
          }
        }),
      });
  
      const data = await response.json();
      console.log(data);
  
      res.status(200).json({ generatedImage: data });
    } catch (error) {
      console.error('Error generating image:', error);
      res.status(500).json({ error: 'Failed to generate image' });
    }
  }
  