const roleCheck = (roles) =>{
    return(req,res,next)=>{
        roles.push("user");
        if(req.user.roles.includes(...roles)){
            next();
        }
        else{
            res.status(403).send({error:true,msg:"Access Denied"});
        }
    }
}

export default roleCheck;