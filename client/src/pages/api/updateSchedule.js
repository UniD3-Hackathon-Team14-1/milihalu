import axios from 'axios';

export default function handler(req, res) {
  async function putData() {
    const data = await axios.put('http://localhost:8000/daily', req.body).then((response) => response.data);
    res.status(200).json(data);
  }
  putData();
}
