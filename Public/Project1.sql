use Project1;
create table users( email varchar(30) primary key, pwd varchar(15), userType varchar(15), statuss int1); 
insert into users values('admin@gmail.com', 'admin1234', 'Admin', 1);

select * from users;


create table volkyc( email varchar(30) NOT NULL primary key, 
					  name varchar(15), 
                      contactnumber varchar(10), 
                      address varchar(100), 
                      city varchar(100), 
                      dob date, 
                      value varchar(15), 
                      qualification varchar(30), 
                      occupation varchar(30), 
                      info varchar(30), 
                      picpath varchar(500), 
                      idpath varchar(500), 
                      statuss int1);


select * from volkyc;


create table postjob(  cid varchar(30) NOT NULL primary key, 
					   jobtitle varchar(100), 
                       jobtype varchar(10), 
                      firmaddress varchar(100), 
                      city varchar(100), 
					   edured varchar(50), 
                       contactperson varchar(15), 
                      statuss int1);

select * from postjob;



create table Cprofile( email varchar(30) NOT NULL primary key, 
					  name varchar(15), 
                      business varchar(10), 
                      bprofile varchar(100), 
                      address varchar(100), 
                      city varchar(15), 
                      contact varchar(15), 
					  idproof varchar(30), 
                      idpnumber varchar(30), 
                      info varchar(30), 
                      statuss int1);


select * from Cprofile;

















