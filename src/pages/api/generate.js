import axios from 'axios';

export default async function handler(req, res) {
  const { content } = req.body;
  
  const response = await axios.post('https://api.cohere.ai/generate', {
  
    prompt: content,
   
  }, {
    headers: {
      Authorization: `Bearer ${process.env.COHERE_API_KEY}`,
      "Cohere-Version": "2021-11-08",
    },
  });

  res.status(200).json({ generatedText: response.data.generations[0].text });
}
