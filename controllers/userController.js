const fs = require('fs');
const User = require('./../models/userModels');
const webPush = require('web-push');
let subscriptions={};
let  endusersubscriptions={};
console.log("subscription",subscriptions)

// to get all user

const publicVapidKey = process.env.Public_Key;
console.log(publicVapidKey);
const privateVapidKey = process.env.Private_Key;
webPush.setVapidDetails('mailto:test@example.com',  process.env.Public_Key, process.env.Private_Key);

exports.subscription= async(req,res) =>{
  subscriptions = req.body
    
  //console.log("subscription in notififcation",subscriptions);

  const payload = JSON.stringify({
    title: 'Hello!',
    body: 'It works.',
  });

    
      // webPush.sendNotification(subscriptions, payload)
      //   .then(result => console.log(result))
      //   .catch(e => console.error(e))
  res.status(200).send(subscriptions);
}
exports.endusersubscription= async(req,res) =>{
   endusersubscriptions = req.body
    
  console.log("end user subscription",endusersubscriptions);

  const payloads = JSON.stringify({
    title: 'Hello!',
    body: 'user is here  .',
  });
// webPush.sendNotification(endusersubscriptions, payloads)
//   .then(result => console.log(result))
//   .catch(e => console.error(e))
  res.status(200).send(endusersubscriptions);
}


exports.getAllUsers = async (req, res) => {
  try {
    const users = await User.find().populate("menu");
    res.status(200).json({
      status: 'Success',
      results: users.length,
      data: {
        users,
      },
    });
  } catch (err) {
    res.status(400).json({
      status: 'failed',
      message: err,
    });
  }
};

// to get a single user
exports.getSingleUser = async (req, res) => {
  console.log("---from single user----");
  try {
    const user = await User.findById(req.params.id).populate("menu");
    // console.log("-----userMenu-------",user)
    res.status(200).json({
      status: 'Success',
      data: {
        user,
      },
    });
  } catch (err) {
    res.status(400).json({
      status: 'failed',
      message: 'Invalid ID',
    });
  }
};
exports.getSingleUsercategory = async (req, res) => {
  console.log("---from singleuserCategory----");
  
  try {
    const user = await User.findById(req.params.id).populate("menu");
    // console.log("-----userMenu-------",user.menu);
    let ul=user.menu.length;
    let cat =[];for(i=0;i<ul;i++){
      console.log("for",i);
      let v={
       "category" : user.menu[i]["category"],
     " categoryImage" :user.menu[i]['categoryImage']
      }
      cat.push(v);
      // console.log(cat);
      }

  
    res.status(200).json({
      status: 'Success',
      data: {
        cat,
      },
    });
  } catch (err) {
    res.status(400).json({
      status: 'failed',
      message: err,
    });
  }
};

exports.getSingleUsercategoryitm = async (req, res) => {
  console.log("---from singleuserCategory----");
  
  try {
    const user = await User.findById(req.params.id).populate("menu");
    // console.log("-----userMenu-------",user.menu);
    let ul=user.menu.length;
    let cat =[];for(i=0;i<ul;i++){
      // console.log("for",i);
    let category=((user.menu[i]["category"]));
      let food= ((req.params.name).toUpperCase());
      // console.log("category",category);
      // console.log("food,",food);
      let  n = food.localeCompare((category));
      // console.log(n);
      if(n==0){
        console.log("Entered in if")
      let v={
        "_id":user.menu[i]['_id'],
        "status":user.menu[i]["status"],
        "name": user.menu[i]["name"],
        "price":user.menu[i]["price"],
        "photo": user.menu[i]["photo"],
        }
      cat.push(v);
      // console.log(cat);
      }
      
      }

  
    res.status(200).json({
      status: 'Success',
      data: {
        cat,
      },
    });
  } catch (err) {
    res.status(400).json({
      status: 'failed',
      message: err,
    });
  }
};

// to create an user
exports.createUser = async (req, res) => {
  try {
    const newUser = await User.create(req.body);
    res.status(201).json({
      status: 'Success',
      message: 'User successfully added to DB',
      data: {
        User: newUser,
      },
    });
  } catch (err) {
    res.status(400).json({
      status: 'Error',
      err,
    });
  }
};


//saving userid with subscription object

// to update an user
exports.updateUser = async (req, res) => {
  try {
    console.log("req.body.endpoint",req.body.Subscription);
    console.log("global.subscription.endpoint",subscriptions.endpoint);
  if(req.body.Subscription=== subscriptions.endpoint){
    console.log("true");
  await User.updateOne({_id: req.body.userId}, {
      subscriptions: subscriptions, 
      
  },function(err, doc) {
    if(err){res.status(400).json("err whiling updating")}
     //handle it

     res.status(200).json({
      status: 'subscription saved on user',
      data: {
        doc
      },
    });
  })
   
  }else{console.log("not in if");}
   
   
    } catch (err) {
    res.status(400).json({
      status: 'Error',
      err,
    });
  }
};

// to delete an user
exports.deleteUser = async (req, res) => {
  try {
    await User.findByIdAndDelete(req.params.id);
    res.status(204).json({
      status: 'success',
      data: null,
    });
  } catch (err) {
    res.status(400).json({
      status: 'Error',
      err,
    });
  }
};
