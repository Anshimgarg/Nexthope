var express=require("express");
var fileUploader=require("express-fileupload");
var cloudinary=require("cloudinary").v2;
var mysql2=require('mysql2');

var app=express();

app.listen(2006,function(){
    console.log("Server Started");
})

app.use(express.static("Public"));

app.get("/",function(req,resp){
    let dirName=__dirname;
    let fullpath=dirName+"/Public/index.html";
    resp.sendFile(fullpath);
})

app.get("/voldash",function(req,resp){
    
    
    let dirName=__dirname;
    
    let fullpath=dirName+"/Public/vol-dash.html";
    resp.sendFile(fullpath);
})

app.use(express.urlencoded(true)); 
        app.use(fileUploader());
        cloudinary.config({ 
            cloud_name: 'dj378wdii', 
            api_key: '155299856683225', 
            api_secret: 'wari5eQsOl7jXtEibel_SRT5vvk'
        });
        




//Connecting to DB==========================================
let dbConfig="mysql://avnadmin:AVNS_XTD9RdY7p89O_nDmFLI@mysql-2c6328a7-anshimgarg0907-04bb.i.aivencloud.com:15726/Project1";

let mySqlServer=mysql2.createConnection(dbConfig);

mySqlServer.connect(function(err){
    if(err!=null)
    {
        console.log(err.message);
    }
    else
        console.log("Connected to DB")
    
})
app.get("/save-details",function(req,resp){
    
    mySqlServer.query("INSERT INTO users VALUES (?,?,?,?)", [req.query.x, req.query.y, req.query.z,1], function (err) {
        if (err == null) {
            resp.send("Record Saved Successfully. Login Now.");
        } else {
           
            resp.send("Database Error: " + err.message);
        }
    });
})

app.get("/user-controller",function(req,resp){
    
    
    let dirName=__dirname;//Global Variable for path of current directory
    let fullpath=dirName+"/Public/user-controller.html";
    resp.sendFile(fullpath);
})

app.get("/login-details",function(req,resp){

    mySqlServer.query("SELECT * from users where email=? and pwd=? and statuss=?", [req.query.x, req.query.y,1], function (err,resultAry)
     {  if (err == null) {
        //resp.send("Login successfully");
        if(resultAry.length==0)
            resp.send("Invalid userid or pwd");
        else if(resultAry[0].statuss==1) {
            resp.send(resultAry[0].userType);
        }
        else{
            resp.send("blocked");
        }
    }
    else
    {
        resp.send(err.message)
    }
}
);
})


app.post("/Register",async function(req,resp){
    console.log(req.body)
    let fileName="";
    if(req.files!=null)
    {
        fileName=req.files.ppic1.name;
        let locationToSave=__dirname+"/Public/uploads/"+fileName;
        req.files.ppic1.mv(locationToSave);
        
         
         await cloudinary.uploader.upload(locationToSave).then(function(picUrlResult){
            fileName=picUrlResult.url;   
            console.log(fileName);
      });
    }
    else
    fileName="nopic.jpg";
    
    let photos="";
    if(req.files!=null)
    {
        photos=req.files.ppic2.name;
        let locationToSave1=__dirname+"/Public/uploads/"+photos;
        req.files.ppic2.mv(locationToSave1);
        
        

         
         await cloudinary.uploader.upload(locationToSave1).then(function(picUrlResult){
            photos=picUrlResult.url;   
            console.log(photos);
      });
    }
    else
    photos="nopic.jpg";
    mySqlServer.query("INSERT INTO volkyc VALUES (?,?,?,?,?,?,?,?,?,?,?,?,?)", [req.body.txtEmail, 
                                                                                req.body.txtName, 
                                                                                req.body.txtContactnumber,
                                                                                req.body.txtAddress,
                                                                                req.body.txtCity,
                                                                                req.body.txtDob,
                                                                                req.body.txtValue,
                                                                                req.body.txtQualification,
                                                                                req.body.txtOccupation,
                                                                                req.body.txtInfo,
                                                                                fileName,
                                                                                photos,1], function (err) {
        if (err == null) {
            resp.send("Registered Successfully");
        } else {
           
            resp.send("Database Error: " + err.message);
        }
    });
});

app.get("/do-fetch-one",function(req,resp)
{
    mySqlServer.query("select * from volkyc where email=?",[req.query.x],function(err,resultAry)
    {
        // console.log(result);
        
            resp.send(resultAry);
    })
})

app.post("/do-update",async function(req,resp)
{
    let txtEmail=req.body.txtEmail;
    let txtName=req.body.txtName;
    let txtContactnumber=req.body.txtContactnumber;
    let txtAddress=req.body.txtAddress;
    let txtCity=req.body.txtCity;
    let txtDob=req.body.txtDob;
    let txtValue=req.body.txtValue;
    let txtQualification=req.body.txtQualification;
    let txtOccupation=req.body.txtOccupation;
    let txtInfo=req.body.txtInfo;
   



    let fileName="";
    if(req.files!=null)
    {
        fileName=req.files.ppic1.name;
        let locationToSave=__dirname+"/Public/uploads/"+fileName;
        req.files.ppic1.mv(locationToSave);

         
         try{
         await cloudinary.uploader.upload(locationToSave).then(function(picUrlResult){
            fileName=picUrlResult.url;  
            console.log(fileName);
            });
        }
        catch(err)
        {
            resp.send(err.message);
        }

    }
    else
    fileName="nopic.jpg";

    let photos="";
    if(req.files!=null)
    {
        photos=req.files.ppic2.name;
        let locationToSave1=__dirname+"/Public/uploads/"+photos;
        req.files.ppic2.mv(locationToSave1);

         
         try{
         await cloudinary.uploader.upload(locationToSave1).then(function(picUrlResult){
            photos=picUrlResult.url;  
            console.log(photos);
            });
        }
        catch(err)
        {
            resp.send(err.message);
        }

    }
    else
    photos="nopic.jpg";

    mySqlServer.query("update volkyc set name=?, contactnumber=?, address=?, city=?, dob=?, value=?, qualification=?, occupation=?, info=?, picpath=?, idpath=? where email=?",[txtName,
                                                                                                                                                                     txtContactnumber,
                                                                                                                                                                     txtAddress,
                                                                                                                                                                     txtCity,
                                                                                                                                                                     txtDob,
                                                                                                                                                                     txtValue,
                                                                                                                                                                     txtQualification,
                                                                                                                                                                     txtOccupation,
                                                                                                                                                                     txtInfo,
                                                                                                                                                                     fileName,
                                                                                                                                                                     photos,
                                                                                                                                                                     txtEmail],function(err,result)
    {
            if(err==null)
            {
                if(result.affectedRows==1)
                    resp.send("Record Update Successsfulllyyy.");
                else
                    resp.send("Invalid Email ID");
            }
            else
            resp.send(err.message);
    })
})

//------------------------


app.post("/Publishjob",async function(req,resp){
    
    mySqlServer.query("INSERT INTO postjob VALUES (?,?,?,?,?,?,?,?)", [req.body.txtClientID, 
                                                                    req.body.txtJobtitle, 
                                                                    req.body.txtJobtype,
                                                                    req.body.txtFirmaddress,
                                                                    req.body.txtCity,
                                                                    req.body.txtEdured,
                                                                    req.body.txtContactperson,
                                                                    1], function (err) {
        if (err == null) {
            resp.send("Registered Successfully");
        } else {
           
            resp.send("Database Error: " + err.message);
        }
    });
});


//--------------------

app.post("/Save",async function(req,resp){
    
    mySqlServer.query("INSERT INTO Cprofile VALUES (?,?,?,?,?,?,?,?,?,?,?)", [req.body.txtClientID, 
                                                                                req.body.txtName, 
                                                                                req.body.txtBusiness,
                                                                                req.body.txtBprofile,
                                                                                req.body.txtAddress,
                                                                                req.body.txtCity,
                                                                                req.body.txtContact,
                                                                                req.body.txtidproof,
                                                                                req.body.txtIdpnumber,
                                                                                req.body.txtInfo,
                                                                                1], function (err) {
        if (err == null) {
            resp.send("Saved Successfully");
        } else {
           
            resp.send("Database Error: " + err.message);
        }
    });
});

app.get("/do-Search-one",function(req,resp)
{
    mySqlServer.query("select * from Cprofile where email=?",[req.query.x],function(err,resultAry)
    {
        // console.log(result);
        
            resp.send(resultAry);
    })
})

app.post("/do-Change",async function(req,resp)
{
    let txtClientID=req.body.txtClientID;
    let txtName=req.body.txtName;
    let txtBusiness=req.body.txtBusiness;
    let txtBprofile=req.body.txtBprofile;
    let txtAddress=req.body.txtAddress;
    let txtCity=req.body.txtCity;
    let txtContact=req.body.txtContact;
    let txtidproof=req.body.txtidproof;
    let txtIdpnumber=req.body.txtIdpnumber;
    let txtInfo=req.body.txtInfo;
   
    mySqlServer.query("update Cprofile set name=?, business=?, bprofile=?, address=?, city=?, contact=?, idproof=?, idpnumber=?, info=? where email=?",[txtName,
                                                                                                                                                        txtBusiness,
                                                                                                                                                        txtBprofile,
                                                                                                                                                        txtAddress,
                                                                                                                                                        txtCity,
                                                                                                                                                        txtContact,
                                                                                                                                                        txtidproof,
                                                                                                                                                        txtIdpnumber,
                                                                                                                                                        txtInfo,
                                                                                                                                                                     
                                                                                                                                                        txtClientID],function(err,result)
    {
            if(err==null)
            {
                if(result.affectedRows==1)
                    resp.send("Record Update Successsfulllyyy.");
                else
                    resp.send("Invalid Client ID");
            }
            else
            resp.send(err.message);
    })
})

//------------------------

//---------------ANGULAR AJAX---------------

app.get("/all-records",function(req,resp)
{
    mySqlServer.query("select * from users",function(err,result)
    {
        console.log(result);
        resp.send(result);
    })
})

app.get("/do-delete-one",function(req,resp)
{
    let userMail=req.query.emailKuch;
                                                  //col name Same as  table col name
    mySqlServer.query("delete from users where email=?",[userMail],function(err,result)
    {
        if(err==null)
        {
            if(result.affectedRows==1)
            resp.send("Record Deleted Successfulllyyyy");
            else
            resp.send("Inavlid User Id");
        }
        else
        resp.send(err.message);
    })
})


app.get("/all-recordss",function(req,resp)
{
    mySqlServer.query("select * from volkyc",function(err,result)
    {
        console.log(result);
        resp.send(result);
    })
})

app.get("/all-recordsss",function(req,resp)
{
    mySqlServer.query("select * from Cprofile",function(err,result)
    {
        console.log(result);
        resp.send(result);
    })
})

app.get("/all-recordssss",function(req,resp)
{
    mySqlServer.query("select * from postjob",function(err,result)
    {
        console.log(result);
        resp.send(result);
    })
})




app.get("/all-recordssss1",function(req,resp)
{
    mySqlServer.query("select * from postjob",function(err,result)
    {
        console.log(result);
        resp.send(result);
    })
})
app.get("/do-delete-one",function(req,resp)
{
    let userMail=req.query.cidKuch;
                                                  //col name Same as  table col name
    mySqlServer.query("delete from postjob where cid=?",[userMail],function(err,result)
    {
        if(err==null)
        {
            if(result.affectedRows==1)
            resp.send("Record Deleted Successfulllyyyy");
            else
            resp.send("Inavlid User Id");
        }
        else
        resp.send(err.message);
    })
})
//------------------------