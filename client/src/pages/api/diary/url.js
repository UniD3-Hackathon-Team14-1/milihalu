import axios from "axios";

export default async function handler(req, res) {
  async function getData() {
    console.log(req.query);
    const data = await axios
      .post("http://localhost:8000/diary/url", req.query)
      .then((response) => response.data);
    res.status(200).json(data);
  }
  await getData();
}
