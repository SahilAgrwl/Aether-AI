import axios from 'axios';

export default async function handler(req, res) {
  const { content3 } = req.body;
  
  const response = await axios.post('https://api.cohere.com/v1/summarize', {
  
    text : content3,
   
  }, {
    headers: {
      Authorization: `Bearer ${process.env.COHERE_API_KEY}`,
      "Cohere-Version": "2021-11-08",
    },
  });

  res.status(200).json({ summarizedText: response.data.summary });
}
