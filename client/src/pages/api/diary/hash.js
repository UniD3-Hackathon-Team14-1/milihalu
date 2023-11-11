import axios from "axios";

export default async function handler(hash) {
  async function getData() {
    const data = await axios
      .get(`http://localhost:8000/diary/${hash}`)
      .then((response) => response.data);
    res.status(200).json(data);
  }
  await getData();
}
