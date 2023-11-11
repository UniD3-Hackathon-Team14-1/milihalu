import axios from "axios";

export default async function handler(req, res) {
  async function getData() {
    const data = await axios
      .get("http://localhost:8000/diary", { params: req.query })
      .then((response) => response.data);
    res.status(200).json(data);
  }
  await getData();
}
