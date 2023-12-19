import axios from 'axios';
import FormData from 'form-data';

export const uploadImgBB = async (req, res) => {
  try {
    if (!req.file) {
      return res.status(400).json({ error: 'No file has been selected' });
    }

    const formData = new FormData();
    formData.append('key', `${process.env.IMAGE_KEY}`);
    formData.append('image', req.file.buffer, {
      filename: req.file.originalname,
    });

    const response = await axios.post('https://api.imgbb.com/1/upload', formData, {
      headers: {
        ...formData.getHeaders(),
      },
    });

    const imageUrl = response.data.data.url; 
    res.json({ imageUrl }); 
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};
