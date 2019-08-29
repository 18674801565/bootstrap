let fn = function(sequelize,userName){
    //查询用户是否存在
    sequelize.query(`select * from user where user_name =${userName}`,
        {type: sequelize.QueryTypes.SELECT}).then(function (results) {
        console.log("results:" + results)
        if (results!=null) {
            console.log(results)
            return true;
        }
    }).catch(
        function(){
            console.log("results:++==")
            return false;
        }
    );//异常捕获
}
module.exports = fn;