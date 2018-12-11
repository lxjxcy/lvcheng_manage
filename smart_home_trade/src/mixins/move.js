export default {
	methods:{
		getlist(param,url,userLevel){
			var that=this;
			
			that.axios.post(url,param).then(res=>{
				that.pictLoading=false
				if(res.data.code==0){
					
					if(userLevel==2){
						var addressList=res.data.data.bList;
						for(var j=0;j<addressList.length;j++){
							addressList[j].disabled=true;
							for(var k=0;k<addressList[j].manageList.length;k++){
								addressList[j].manageList[k].disabled=true;
							}
						}
						that.addressList=addressList;
						
					}else{
						var addressList=res.data.data.fList;
							for(var j=0;j<addressList.length;j++){
								addressList[j].disabled=true;
							}
							that.addressList=addressList;
					}
				}else{
					that.$message.error(res.data.message)
				}
				
			})
		}
	},
}