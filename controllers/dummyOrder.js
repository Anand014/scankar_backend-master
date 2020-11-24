const dummyOrder = require("../models/dummyOrder");

exports.createDummyOrder = async (req, res) => {
  try {
    let username = req.body.username;
    let foodinfo = req.body.foodinfo;
    let HotelId = req.body.HotelId;
    const dummy = new dummyOrder({
      user: {
        name: username,
      },
      foodinfo: foodinfo,

      createdBy: username,
      HotelId: HotelId,
      status: "Pending",

      lockBy: username,
    });

    // Insert customer object
    // https://mongoosejs.com/docs/api.html#model_Model-save
    dummy.save((err, cust) => {
      if (err) return console.error(err);
      console.log(cust);
      res.status(200).send(cust);

      // This will print inserted record from database
      // console.log(cust);
    });
  } catch (err) {
    console.log(err);
  }
};
exports.getDummyorder = async (req, res) => {
  try {
    const product = await dummyOrder.findById(req.params.id);
    res.status(200).json({
      status: "Success",
      data: {
        product,
      },
    });
  } catch (err) {
    res.status(400).json({
      status: "failed",
      message: "Invalid ID",
    });
  }
};
exports.deleteDummyOrder = async (req, res) => {
  try {
    await dummyOrder.findByIdAndDelete(req.params.id);
    res.status(204).json({
      status: "success",
      data: null,
    });
  } catch (err) {
    res.status(400).json({
      status: "Error",
      err,
    });
  }
};
exports.updatethelockby = async (req, res) => {
  try {
    let username = req.body.username;
    let foodinfo = req.body.foodinfo;
    let lockBy = username;
    let id = req.body.id;
    await dummyOrder.updateOne({ _id: id }, { lockBy: lockBy });
    const John1 = await dummyOrder.findOne({ _id: id });
    res.send(John1);
  } catch (err) {
    res.status(400).json({
      status: "Error",
      err,
    });
  }
};

exports.adduserDummyOrder = async (req, res) => {
  console.log("here we are in adduserDummy");

  let username = req.body.username;
  let foodinfo = req.body.foodinfo;
  let lockBy = username;
  let id = req.body.id;
  // console.log(foodinfo);
  if (typeof foodinfo !== "undefined") {
    const John = await dummyOrder.findOne({ _id: id });
    console.log("John", John);
    await John.user.push({ name: username });
    for (i = 0; i < foodinfo.length; i++) {
      let item = foodinfo[i].item;
      let quantity = foodinfo[i].quantity;
      console.log("-----------", item);
      await John.foodinfo.push({ item: item, quantity: quantity });
    }

    //  await John.foodinfo.push({"item":2,"quantity":3});
    await John.save();
    await dummyOrder.updateOne({ _id: id }, { lockBy: lockBy });
    const John1 = await dummyOrder.findOne({ _id: id });
    // console.log(John1);
    res.send(John1);
  } else {
    console.log("in else");
    await dummyOrder.updateOne({ _id: id }, { lockBy: lockBy });
    const John2 = await dummyOrder.findOne({ _id: id });
    console.log(John2);
    res.send(John2);
  }
};
