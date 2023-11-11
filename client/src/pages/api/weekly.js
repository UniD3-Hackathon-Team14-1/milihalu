import axios from 'axios';

export default function handler(req, res) {
  console.log(req.query)
  async function getData() {
    const data = await axios.get('http://localhost:8000/weekly', { params: req.query }).then((response) => response.data);
    console.log(data);
    res.status(200).json(data);
  }
  getData();
}