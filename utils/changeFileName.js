
    const path = require("path");
    const { v4: uuidv4 } = require("uuid");
    exports.ChangeFileName = async (card) => {
    let res;

    try {
    if (card.mimetype == "image/png") {
      const newName = uuidv4();
      res = newName + ".png";
    } else if (card.mimetype == "image/jpeg") {
      const newName = uuidv4();
      res = newName + ".jpeg";
    } else if (card.mimetype == "image/jpg") {
      const newName = uuidv4();
      res = newName + ".jpg";
    }

    const folderLocation = "./upload/";
    const uploadLocaton = folderLocation.concat(res);
    card.mv(uploadLocaton, function (err) {
      if (err) {
        res.send(err);
        console.log(err)
      }
    });
    } catch (error) {
      console.log(error)
    }

    return res;
    };

    