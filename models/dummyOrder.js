const mongoose = require('mongoose');
const User = require('./userModels');
const ObjectId = mongoose.ObjectId;
const dummyOrderSchema = new mongoose.Schema(
    {
       
            user: [{name :String}],
            
            foodinfo:
            [
              {
                item:String,
                quantity:String
              }
            ],
        createdBy:String,
        HotelId: String ,
        status: {
            type: String,
            default: 'Pending',
            enum: [
              'Pending',
              'Placed',
              'Recieved',
              'Processing',
              'Delivered',
              'Cancelled',
            ],
          },
          lockBy:String
          
       
        





    },{  timestamps: true }
);
    module.exports = mongoose.model('DummyOrder', dummyOrderSchema);