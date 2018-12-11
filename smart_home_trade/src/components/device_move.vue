<template>
	<div class="device_move">
		<el-dialog
			title="迁移设备"
			:visible.sync="opendialog"
			width="30%"
			:before-close="handleClose">
			<div class="modelContain" v-loading="pictLoading" element-loading-background="#fff"
				element-loading-text="加载数据中......">
			<el-tree 
			       v-if="hackReset"
					:data="addressList"
					show-checkbox
					ref="addresslist"
				empty-text="该园区下没有设备"
				default-expand-all
					node-key="id"
					@check="change"
					
					:default-checked-keys="checkIdList"
					:props="defaultProps"
					>
				</el-tree>		  
				
			</div>
			<span slot="footer" class="dialog-footer">
				<el-button type="primary" @click="sureadddialog()"  v-loading.fullscreen.lock="fullscreenLoading" element-loading-text="正在提交" element-loading-background="rgba(0, 0, 0, 0)">确 定</el-button>
			</span>
		</el-dialog>
		
		
		
		
	</div>
	
</template>

<script>
	import movedev from "../mixins/move.js"
	export default {
		name:"device_move",
		data(){
			return{
				hackReset:true,
				opendialog:false,
				fullscreenLoading:false,
				pictLoading:true,
				checkIdList:[],
				
				param:{
					roomId:"",
					id:"",
					inAddress:"",
				},
				addressList:[],
				defaultProps: {
						children: 'manageList',
						label: 'name'
					}
			}
		},
		mixins: [movedev],

		methods:{
			getmove(e){
				var that=this;
				that.checkIdList.push(e.roomId)	
				
				that.param={
					roomId:e.roomId,
					id:e.id,
					inAddress:e.roomId,
				},
				that.opendialog=true;
				if(that.$store.state.userinfo.userLevel==2||that.$store.state.userinfo.userLevel==3){
					var userLevel=2;
					var url="/SmartHomeTrade/block/selectManageBlock"
					var list=[];
					list.push(e.blockId)
					var param={
						manageScopeIdList:list
					}
				}
				if(that.$store.state.userinfo.userLevel==4){
					var userLevel=4;
					var url="/SmartHomeTrade/floor/selectManageFloor"
					var obj=[]
					var obj1= {
							id:e.floorId,
							addressId:e.blockId
						};
					obj.push(obj1)
						var param={
							floorAdrIdList:obj
						}	
				}
				that.getlist(param,url,userLevel)
				
			},
			handleClose(done) {
				done();
				this.$emit('reload');
				this.$emit('clearselect');
				this.$emit('refreshList');
			},
			
			//改变复选框
			change(a,b){
				this.hackReset = false
				this.$nextTick(() => {
					this.hackReset = true
				})
				this.checkIdList=[]
				this.checkIdList.push(a.id)
				this.param.inAddress=a.id;
			},
			sureadddialog(){
				var that=this;
				var listid=that.$refs.addresslist.getCheckedKeys()
				if(listid.length==0){
					that.$message.warning("请选择授权的设备")
					return;
				}
				that.fullscreenLoading=true;
				that.axios.post("/SmartHomeTrade/device/updateDeviceInRoom",that.param).then(res=>{
					that.fullscreenLoading=false;;
					if(res.data.code==0){
						that.opendialog=false;
						that.$emit('reload');
						that.$emit('clearselect');
						that.$emit('refreshList');
						that.$message.success(res.data.message)
					}else{
						that.$message.error(res.data.message)
						
					}
				})
				
			}
		}
		
		
	}
</script>

<style scoped>
	.modelContain{
		height: 300px;
		overflow:hidden;
		overflow-y:auto;
	}

</style>
