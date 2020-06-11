const express = require("express");
const bodyParser = require("body-parser");
const _ = require("lodash");
const mongoose = require("mongoose");
const ejs = require("ejs");
const query = new mongoose.Query();

const app = express();

mongoose.connect('mongodb://localhost:27017/IDWING', { useNewUrlParser: true, useUnifiedTopology: true })

var budgetSchema = new mongoose.Schema({
    financialYear: String,
    year: Number,
    month: Number,
    date: String,
    unit: String,
    amount: Number,
    source: String,
    isFull: Boolean, //true is full
    orderNo: String,
    mode: String,
});


var projectSchema = new mongoose.Schema({
    budgetId: String,
    projectName: String,


}
);

var adBillSchema = new mongoose.Schema({
    projectId: String,
    agencyName: String,
    panNumber: String,
    gstNumber: String,
    tenderDate : String,
    tenderAmount : Number,
    tenderItCollected : Number,
    tenderNetPayment : Number,
    tenderItAmount: Number,
    retenderDate : String,
    retenderAmount : Number,
    retenderItCollected : Number,
    retenderNetPayment : Number,
    retenderItAmount: Number,


    remarksTender: String,
    remarksRetender: String



});

var contractorSchema = new mongoose.Schema({
    projectId : String,
    contractorName: String,
    panNumber : String,
    gstNumber: String
})

var Budget = mongoose.model('Budget', budgetSchema);
var Project = mongoose.model('Project', projectSchema);
var AdBill = mongoose.model('AdBill', adBillSchema)
var Contractor = mongoose.model('Contractor',contractorSchema);

app.set("view engine", "ejs");


app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.static("public"));

app.get('/', function (req, res) {
    res.render("login")
})

app.get('/budget', function (req, res) {
    res.render('budget');
})


app.get('/projects', function (req, res) {
    res.render('projects', { budgets: [] });

})

app.get('/projects/viewBudgets', function (req, res) {
    let queryYear = req.query.chosenYear + '-' + (Number(req.query.chosenYear) + 1).toString()
    let queryUnit = req.query.chosenUnit;
    let querySource = req.query.source;

    let query = {};
    if (req.query.chosenYear) {
        query.financialYear = queryYear;
    }
    if (queryUnit) {
        query.unit = queryUnit;
    }
    if (querySource) {
        query.source = querySource;
    }

    Budget.find(query, function (err, budgets) {
        if (!err) {
            res.render('projects', { budgets: budgets })
        }
    })

})

app.get('/projects/:budgetId', function (req, res) {
    Project.find({budgetId: req.params.budgetId}, function (err, projects) {
        if (!err) {
            res.render('projectEntry', { budgetId: req.params.budgetId, projects: projects })
        }
    })


})

app.get('/projects/:projectId/bills/ad', function (req, res) {
    AdBill.find({projectId:req.params.projectId}, function (err, adBills) {
        if (!err) {
            res.render('adCharges', { projectId: req.params.projectId,adBills:adBills,bill:{} })
        }
    })
})

app.get('/projects/:projectId/bills/contract', function (req, res) {
    Contractor.find({projectId:req.params.projectId}, function(err, contractors){
        if(!err){
            res.render('contractBills',{projectId:req.params.projectId, contractors :contractors})

        }
    })
})

app.get('/projects/:projectId/bills/contract/:contractorId', function(req, res){
    Project.findOne({_id:req.params.projectId},function(err,project){
        if(!err){
            Contractor.findOne({_id:req.params.contractorId},function(err2,contractor){
                res.render('contractEntry',{projectName: project.projectName, contractor: contractor})
            })
        }
    })
})

app.post('/budget', function (req, res) {


    let financialYear = req.body.chosenYear + "-" + (Number(req.body.chosenYear) + 1).toString()

    let dateParts = req.body.date.replace(",", "").split(" ")
    let year = Number(dateParts[2]);
    let day = Number(dateParts[1]);
    let isFull = false;
    if (req.body.full == "on") {
        isFull = true;
    }

    let month = Number(req.body.chosenMonth);
    console.log(month)
    let date = new Date(req.body.date);
    var indiaTime = date.toLocaleString("en-US", { timeZone: "Asia/Kolkata" });
    let date_str = indiaTime.split(',')[0]
    console.log(indiaTime)

    let budgetData = {
        financialYear: financialYear,
        year: year,
        month: month,
        date: date_str,
        source: req.body.source,
        unit: req.body.chosenUnit,
        amount: req.body.amountBudget,
        isFull: isFull,
        orderNo: req.body.orderNo,
        mode: req.body.mode,

    }
    let budget = new Budget(budgetData);
    budget.save(function (err, budget) {
        if (err) {
            console.log(err);
        }
        else {
            res.redirect('/budget')
        }
    })
})


app.post('/projects/:budgetId', function (req, res) {
    let projectData = {
        budgetId: req.params.budgetId,
        projectName: req.body.projectName,


    }
    let project = new Project(projectData)
    project.save(function (err, project) {
        if (err) {
            console.log(err);
        }
        else {
            res.redirect('/projects/' + req.params.budgetId)
        }
    })
})

app.post('/projects/:projectId/bills/ad', function(req, res){
    console.log('in old')
    let adBillData = {
        projectId: req.params.projectId,
        agencyName: req.body.agencyName,
        panNumber: req.body.panNumber,
        gstNumber: req.body.gstNumber,
        tenderDate : req.body.tenderDate,
        tenderAmount : req.body.tenderAmount,
        tenderItCollected : req.body.tenderItCollected,
        tenderItAmount : req.body.tenderItAmount,
        tenderNetPayment : req.body.tenderNetPayment,
        retenderDate : req.body.retenderDate,
        retenderAmount : req.body.retenderAmount,
        retenderItCollected : req.body.retenderItCollected,
        retenderNetPayment : req.body.retenderNetPayment,
        retenderItAmount : req.body.retenderItAmount,
    
        remarksTender: req.body.remarksTender,
        remarksRetender: req.body.remarksRetender

    }
    let adBill = new AdBill(adBillData)
    adBill.save(function (err, addBill) {
        if (err) {
            console.log(err);
        }
        else {
            res.redirect('/projects/' + req.params.projectId+'/bills/ad')
        }
    })


})

app.post('/projects/:projectId/bills/contract', function(req, res){
    let contractorData = {
        projectId : req.params.projectId,
        contractorName: req.body.contractorName,
        panNumber : req.body.panNumber,
        gstNumber: req.body.gstNumber
    }
    let contractor = new Contractor(contractorData)
    contractor.save(function(err,contractor){
        if(err){
            console.log(err)
        }
        else{
            res.redirect('/projects/'+req.params.projectId+'/bills/contract')
        }
    })
})

app.get('/apis/removeAdBill/:projectId/:billId', function(req, res){

    console.log(req.params.billId)
    bill_id = req.params.billId
    AdBill.deleteOne({_id:req.params.billId}, function(err,_){
        if(!err){
            AdBill.find({projectId:req.params.projectId}, function (err, adBills) {
                if (!err) {
                    res.render('adCharges', { projectId: req.params.projectId,adBills:adBills, bill :{}})
                }
            })
        }
    })
})
app.get('/apis/editAdBill/:projectId/:billId', function(req, res){
   AdBill.findOne({_id:req.params.billId}, function(err, bill){
       if(!err){
        AdBill.find({projectId:req.params.projectId}, function (err, adBills) {
            if (!err) {
                res.render('adCharges', { projectId: req.params.projectId,adBills:adBills,bill:bill})
            }
        })
       }
   }) 
   
})

app.post('/apis/editAdBill/:projectId/:billId', function(req, res){
    console.log('in second')
    let adBillData = {
        projectId: req.params.projectId,
        agencyName: req.body.agencyName,
        panNumber: req.body.panNumber,
        gstNumber: req.body.gstNumber,
        tenderDate : req.body.tenderDate,
        tenderAmount : req.body.tenderAmount,
        tenderItCollected : req.body.tenderItCollected,
        tenderItAmount : req.body.tenderItAmount,
        tenderNetPayment : req.body.tenderNetPayment,
        retenderDate : req.body.retenderDate,
        retenderAmount : req.body.retenderAmount,
        retenderItCollected : req.body.retenderItCollected,
        retenderNetPayment : req.body.retenderNetPayment,
        retenderItAmount : req.body.retenderItAmount,
    
        remarksTender: req.body.remarksTender,
        remarksRetender: req.body.remarksRetender

    }
    AdBill.findByIdAndUpdate({_id: req.params.billId},adBillData, function(err,result){
        if(!err){
            res.redirect('/projects/' + req.params.projectId+'/bills/ad')
        }else{
            console.log(err)
        }
    })
})


app.listen(3000, '192.168.18.2' | 'localhost', function () {
    console.log("Server started on port 3000");
});