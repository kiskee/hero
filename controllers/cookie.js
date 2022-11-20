const Cookie = require("../models/cookie");

async function createCookieApi(req, res) {
  const { date, cookie } = req.body;

  //if (!date) res.status(400).send({ msg: "the date is missing" });
  //if (!cookie) res.status(400).send({ msg: "the cookie is missing" });

  const newCookie = new Cookie({
    date,
    cookie,
  });

  newCookie.save((error, cookieStorage) => {
    if (error) {
      res.status(400).send({ msg: "Error creating the cookie" });
    } else {
      res.status(200).send(cookieStorage);
    }
  });
}

async function updateCookieApi(req, res) {
  const { id } = req.params;
  const cookieData = req.body;


  Cookie.findByIdAndUpdate({ _id: id }, cookieData, (error) => {
    if (error) {
      res.status(400).send({ msg: "Failed to update cookie" });
    } else {
      res.status(200).send({ msg: "successful update" });
    }
  });

}


async function getCookie(req,res){
    const { id } = req.params;

    const response = await Cookie.findById({_id:id});
  
    if (!response) {
      res.status(400).send({ msg: "Cookie not found" });
    } else {
      res.status(200).send(response);
    }
}


async function deleteCookie(req,res){
    const { id } = req.params;

  Cookie.findByIdAndDelete(id, (error) => {
    if (error) {
      res.status(400).send({ msg: "Error deleting cookie" });
    } else {
      res.status(200).send({ msg: "Cookie Deleted" });
    }
  });
}





module.exports = {
  createCookieApi,
  updateCookieApi,
  getCookie,
  deleteCookie,
};
