import axios from 'axios';

export default function handler(req, res) {
  async function getData() {
    const data = await axios.get('http://localhost:8000/keyword').then((response) => response.data);
    return res.status(200).json(data);
  }
  return getData();
}
