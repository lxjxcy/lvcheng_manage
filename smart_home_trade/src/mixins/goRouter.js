export default {
	methods: {
		goRouter(aaa) {
			var that = this;
			if (aaa == 1) {
				that.$router.push('/garden/gardenManagement')
			} else if (aaa == 2 || aaa == 3 || aaa == 4 || aaa == 5) {
				that.getBar(aaa)
			}

		},
		getBar(a) {
			var that = this;
			var aid = parseInt(a);
			console.log(aid)
			var seletid = aid - 1;
			for (var i = 0; i < that.$store.state.setDAta.length; i++) {
				if (that.$store.state.setDAta[i].id == seletid) {
					console.log(that.$store.state.setDAta[i].children)
					var childrens = that.$store.state.setDAta[i].children;
					that.getBarchild(childrens)
				}
			}
		},
		getBarchild(childrens) {
			var that = this;
			for (var j = 0; j < childrens.length; j++) {
				if (childrens[j].id == 11) {
					that.$router.push('/park/MyPark');
					return;
				}
				if (childrens[j].id == 12) {
					that.$router.push('/park/buildingManagement')
					return;
				}
				if (childrens[j].id == 13) {
					that.$router.push('/park/parkUser')
					return;
				}
				if (childrens[j].id == 14) {
					that.$router.push('/park/parkAppuser')
					return;
				}
				if (childrens[j].id == 15) {
					that.$router.push('/park/parkLog')
					return;
				}
				if (childrens[j].id == 21) {
					that.$router.push('/building/MyBuilding');
					return;
				}
				if (childrens[j].id == 22) {
					that.$router.push('/building/floorManagment')
					return;
				}
				if (childrens[j].id == 23) {
					that.$router.push('/building/buildingUser')
					return;
				}
				if (childrens[j].id == 24) {
					that.$router.push('/building/buildingAppuser')
					return;
				}
				if (childrens[j].id == 25) {
					that.$router.push('/building/buildingLog')
					return;
				}
				if (childrens[j].id == 31) {
					that.$router.push('/floor/myFloor');
					return;
				}
				if (childrens[j].id == 32) {
					that.$router.push('/floor/roomManagement')
					return;
				}
				if (childrens[j].id == 33) {
					that.$router.push('/floor/floorUser')
					return;
				}
				if (childrens[j].id == 34) {
					that.$router.push('/floor/floorAppuser')
					return;
				}
				if (childrens[j].id == 35) {
					that.$router.push('/floor/floorLog')
					return;
				}
				if (childrens[j].id == 11) {
					that.$router.push('/room/myRoom');
					return;
				}
				if (childrens[j].id == 42) {
					that.$router.push('/room/equipment')
					return;
				}
				if (childrens[j].id == 43) {
					that.$router.push('/room/authorization')
					return;
				}
				if (childrens[j].id == 44) {
					that.$router.push('/room/roomAppuser')
					return;
				}
				if (childrens[j].id == 45) {
					that.$router.push('/room/roomLog')
					return;
				}
			}
		}

	}
};



// else if (res.data.data.user.userLevel == 3) {
// 	that.$router.push('/building/MyBuilding')
// } else if (res.data.data.user.userLevel == 4) {
// 	that.$router.push('/floor/myFloor')
// } else {
// 	that.$router.push('/room/myRoom')
// }



// console.log(this.$store.state.setDAta)
// for (var i = 0; i < this.$store.state.setDAta.length; i++) {
// 	if (this.$store.state.setDAta[i].id == "1") {
// 		console.log(this.$store.state.setDAta[i].children)
// 		var childrens = this.$store.state.setDAta[i].children
// 		for (var j = 0; j < childrens.length; j++) {
// 			if (childrens[i].id == 11) {
// 				this.MyPark = childrens[i].label;
// 				console.log(childrens[i].label)
// 			}
// 		}
// 	}
// }