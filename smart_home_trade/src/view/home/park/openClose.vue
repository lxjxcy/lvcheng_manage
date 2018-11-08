<template>
	<div></div>
</template>
<script>
	export default{
		name:"openClose",
		data(){
			return{

			}
		},
		 methods:{
		 	open(e){
				 var that=this;
		          console.log(e.mainStatus)
		          if(e.mainStatus==1){//状态开
		            var lamp=false;
		            var curtains="CLOSE"
		            // var socket={
		    //         	"powerOnResume":false,
						// "overloadAutoOff":false,
						// "overloadThreshold": “3000”,
						// "loadThreshold":”5”
						// }
		    //            }
		          }else{//状态关
		            var lamp=true;
		             var curtains="OPEN"
		                   // var socket={
		    //         	"powerOnResume":true,
						// "overloadAutoOff":true,
						// "overloadThreshold": “3000”,
						// "loadThreshold":”5”
						// }
		    //            }
		          }
		          //type=1，灯 或type=？报警器  或type=？天然报警器或type=？烟雾报警器  或水浸报警器或声光报警器或零火线灯控面板	   
		          if(e.type==1){
		            var param={
		            "on":lamp
		            }
		             var Swiparam={
		              "command":"SwitchMain",
		              "argument":param,
		              }
		          }
		          //type=4窗帘电机
		          else if(e.type==4){
		             var param={
		            "opt":curtains
		            }
		            var Swiparam={
		              "command":"SetMotorOption",
		              "argument":param,
		              }
		          }
		           //type=31智能插座面板
		          //   else if(e.type==？){
		          //    var param={
		          //   "opt":socket
		          //   }
		          //   var Swiparam={
		          //     "command":"SetRunArgs",
		          //     "argument":param,
		          //     }
		          // }

		           //type=31快捷面板
		           //type=31快捷面板
		           //type=31快捷面板

		           //type=31快捷面板
		           //type=31快捷面板
		           //type=31快捷面板
		           //type=31快捷面板
		           //type=31快捷面板

		           //type=31快捷面板


		         // 共同参数
		            var commparam={
		               userId: this.$store.state.userinfo.uuid,
		               deviceId:e.id,
		               userDeviceAuth:this.$store.state.userinfo.userDeviceAuth,
		               executeUser:that.$store.state.userinfo.name,
                       createUserMobile:that.$store.state.userinfo.createUser,
		            }

		          var param = Object.assign(commparam, Swiparam);       
		          that.axios.post('/SmartHomeTrade/device/deviceSwitchOnFalse',param).then(function(res){
		            if(res.data.code==0){
		              that.$emit('refreshList');
		            }else{
		              that.$message.error(res.data.message)
		                that.$emit('refreshList');
		            }

		          })

		 	}
		 }
	}
</script>