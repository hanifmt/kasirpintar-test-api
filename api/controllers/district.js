// const { axiosService } = require("../configs/axios");
const axios = require("axios");

exports.getById = async (req, res) => {
  const { id } = req.body;

  const data = await axios
    .get("https://kasirpintar.co.id/allAddress.txt")
    .then((res) => {
      return res.data.address_kecamatan;
    })
    .catch((error) => {
      return error;
    });

  for (d of data) {
    if (d.id == id) {
      return res.status(200).send({ status: "success", data: d });
    } else {
      return res.status(404).send({ status: "not found", data: {} });
    }
  }
};

exports.getByCityId = async (req, res) => {
  const { kota_id } = req.body;

  const data = await axios
    .get("https://kasirpintar.co.id/allAddress.txt")
    .then((res) => {
      return res.data.address_kecamatan;
    })
    .catch((error) => {
      return error;
    });

  let arr = [];

  for (d of data) {
    if (d.kota_id == kota_id) {
      arr.push(d);
    }
  }

  if (arr.length != 0) {
    return res.status(200).send({ status: "success", data: arr });
  } else {
    return res.status(404).send({ status: "not found", data: arr });
  }
};
