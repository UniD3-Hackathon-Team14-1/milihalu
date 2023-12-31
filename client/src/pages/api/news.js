import axios from 'axios';

export default function handler(req, res) {
  async function getData() {
    const data = await axios.get('http://localhost:8000/keyword/news', { params: req.query }).then((response) => response.data);
    res.status(200).json(data);
  }
  getData();
}
