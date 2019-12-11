const express = require('express');
const app = express();
const productRoutes = express.Router();
// Require Product model in our routes module 
let Product = require('../models/Product');
// Defined store route 
productRoutes.route('/add').post(function(req,res) {
    console.log('in');
    let product = new Product(req.body);
    product.save()
        .then(product => {
            res.status(200).json({'Product': 'Product added sucessfully'});
        })
        .catch(err => {
            res.status(400).send('An error occured');
        });
});
// Defined get data(index or listing) route  
productRoutes.route('/').get(function(req,res) {
    Product.find(function (err,products){
        if(err){
            console.log(err);
        }else{
            res.json(products);
        }
    });
});
// Defined edit route  
productRoutes.route('edit/:id').get(function(req,res) {
    let id = req.params.id;
    Product.findById(id, function(err,product){
        res.json(product);
    });
});
//Defined delete route
productRoutes.route('/update.:id').post(function(req,res){
    Product.findById(re.params.id,function(err,product){
        if(!product){
            res.status(404).send('Record not found');
        }else{
            product.ProductName = req.params.ProductName;
            product.ProductDescription = req.params.ProductDescription;
            product.ProductPrice = req.params.ProductPrice
            product.save().then(product => {
                res.json('Update Done');
            })
            .catch(err => {
                res.status(400).send('unable to update record');
            });
        }
    });
});
//Defined delete route
productRoutes.route('/delete/:id').get(function(req, res){
    Product.findById({_id: req.params.id}, function(err,product){
        if(err){
            res.json(err);
        }else{
            res.json('Removed Succesfully');
        }
    });
});
module.exports = productRoutes;