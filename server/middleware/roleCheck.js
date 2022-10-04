const roleCheck = (roles) =>{
    return(req,res,next)=>{
       /* Adding the user role to the roles array. */
        roles.push("user");
        /* Checking if the user has the role that is passed in. */
        if(req.user.roles.includes(...roles)){
            next();
        }
        else{
            res.status(403).send({error:true,msg:"Access Denied"});
        }
    }
}

export default roleCheck;