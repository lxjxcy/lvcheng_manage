export default {
	methods: {
		goRouter(listparam) {

			var that = this;
			var buildingManagement = 0,
				parkuser = 0,
				parkAppuser = 0,
				parlog = 0,

				floorManagment = 0,
				buildingUser = 0,
				buildingAppuser = 0,
				buildingLog = 0,

				roomManagement = 0,
				floorUser = 0,
				floorAppuser = 0,
				floorLog = 0,

				equipment = 0,
				authorization = 0,
				roomAppuser = 0,
				roomLog = 0;
			var addbuild = 0,
				changebuild = 0,
				buildsetuser = 0,
				hostlist = 0,
				addfloor = 0,
				changefloor = 0,
				floorsetuser = 0,
				addroom = 0,
				changeroom = 0,
				roomsetuser = 0;
			var parkAdduser = 0,
				parkChangeuser = 0,
				parkDeleteuser = 0,
				parkSetaccess = 0,
				buildAdduser = 0,
				buildChangeuser = 0,
				buildDeleteuser = 0,
				buildSetaccess = 0,
				floorAdduser = 0,
				floorChangeuser = 0,
				floorDeleteuser = 0,
				floorSetaccess = 0;
			var park_changeappuser = 0,
				park_deleteappuser = 0,
				park_stopappuser = 0,
				park_recoveredappuser = 0,
				build_changeappuser = 0,
				build_deleteappuser = 0,
				build_stopappuser = 0,
				build_recoveredappuser = 0,
				floor_changeappuser = 0,
				floor_deleteappuser = 0,
				floor_stopappuser = 0,
				floor_recoveredappuser = 0,
				room_addappuser = 0,
				room_changeappuser = 0,
				room_deleteappuser = 0,
				room_stopappuser = 0,
				room_recoveredappuser = 0,
				changedement = 0,
				movequement = 0,
				quementAuthor = 0,
				addAuthor = 0,
				changeAuthor = 0,
				deleteAuthor = 0;



			var extendslist = listparam;

			for (var a = 0; a < extendslist.length; a++) {

				if (extendslist[a].id == 2) {
					buildingManagement = 1
				}
				if (extendslist[a].id == 3) {
					floorManagment = 1;
				}
				if (extendslist[a].id == 4) {
					roomManagement = 1;
				}
				for (var b = 0; b < extendslist[a].sonJdtionList.length; b++) {
					// if (extendslist[a].sonJdtionList[b].id == 11) {
					// 	mypark = 1;

					// }
					if (extendslist[a].sonJdtionList[b].id == 12) {
						buildingManagement = 1;
					}
					if (extendslist[a].sonJdtionList[b].id == 13) {
						parkuser = 1;
					}
					if (extendslist[a].sonJdtionList[b].id == 14) {
						parkAppuser = 1;
					}
					if (extendslist[a].sonJdtionList[b].id == 15) {
						parlog = 1;
					}
					// if (extendslist[a].sonJdtionList[b].id == 21) {
					// 	mybuild = 1;
					// }
					if (extendslist[a].sonJdtionList[b].id == 22) {
						floorManagment = 1;
					}
					if (extendslist[a].sonJdtionList[b].id == 23) {
						buildingUser = 1;
					}
					if (extendslist[a].sonJdtionList[b].id == 24) {
						buildingAppuser = 1;
					}
					if (extendslist[a].sonJdtionList[b].id == 25) {
						buildingLog = 1;
					}
					// if (extendslist[a].sonJdtionList[b].id == 31) {
					// 	myFloor = 1;
					// }
					if (extendslist[a].sonJdtionList[b].id == 32) {
						roomManagement = 1;
					}
					if (extendslist[a].sonJdtionList[b].id == 33) {
						floorUser = 1;
					}
					if (extendslist[a].sonJdtionList[b].id == 34) {
						floorAppuser = 1;
					}
					if (extendslist[a].sonJdtionList[b].id == 35) {
						floorLog = 1;
					}
					// if (extendslist[a].sonJdtionList[b].id == 41) {
					// 	myRoom = 1;
					// }
					if (extendslist[a].sonJdtionList[b].id == 42) {
						equipment = 1;
					}
					if (extendslist[a].sonJdtionList[b].id == 43) {
						authorization = 1;
					}
					if (extendslist[a].sonJdtionList[b].id == 44) {
						roomAppuser = 1;
					}
					if (extendslist[a].sonJdtionList[b].id == 45) {
						roomLog = 1;
					}
					for (var c = 0; c < extendslist[a].sonJdtionList[b].sonJdtionList.length; c++) {
						if (extendslist[a].sonJdtionList[b].sonJdtionList[c].id == 121) {
							addbuild = 1;
						}
						if (extendslist[a].sonJdtionList[b].sonJdtionList[c].id == 122) {
							changebuild = 1;
						}
						if (extendslist[a].sonJdtionList[b].sonJdtionList[c].id == 123) {
							buildsetuser = 1;
						}
						if (extendslist[a].sonJdtionList[b].sonJdtionList[c].id == 124) {
							hostlist = 1;
						}
						if (extendslist[a].sonJdtionList[b].sonJdtionList[c].id == 221) {
							addfloor = 1;
						}
						if (extendslist[a].sonJdtionList[b].sonJdtionList[c].id == 222) {
							changefloor = 1;
						}
						if (extendslist[a].sonJdtionList[b].sonJdtionList[c].id == 223) {
							floorsetuser = 1;
						}
						if (extendslist[a].sonJdtionList[b].sonJdtionList[c].id == 321) {
							addroom = 1;
						}
						if (extendslist[a].sonJdtionList[b].sonJdtionList[c].id == 322) {
							changeroom = 1;
						}
						if (extendslist[a].sonJdtionList[b].sonJdtionList[c].id == 323) {
							roomsetuser = 1;
						}
						if (extendslist[a].sonJdtionList[b].sonJdtionList[c].id == 131) {
							parkAdduser = 1;
						}
						if (extendslist[a].sonJdtionList[b].sonJdtionList[c].id == 132) {
							parkChangeuser = 1;
						}
						if (extendslist[a].sonJdtionList[b].sonJdtionList[c].id == 133) {
							parkDeleteuser = 1;
						}
						if (extendslist[a].sonJdtionList[b].sonJdtionList[c].id == 134) {
							parkSetaccess = 1;
						}
						if (extendslist[a].sonJdtionList[b].sonJdtionList[c].id == 231) {
							buildAdduser = 1;
						}
						if (extendslist[a].sonJdtionList[b].sonJdtionList[c].id == 232) {
							buildChangeuser = 1;
						}
						if (extendslist[a].sonJdtionList[b].sonJdtionList[c].id == 233) {
							buildDeleteuser = 1;
						}
						if (extendslist[a].sonJdtionList[b].sonJdtionList[c].id == 234) {
							buildSetaccess = 1;
						}
						if (extendslist[a].sonJdtionList[b].sonJdtionList[c].id == 331) {
							floorAdduser = 1;
						}
						if (extendslist[a].sonJdtionList[b].sonJdtionList[c].id == 332) {
							floorChangeuser = 1;
						}
						if (extendslist[a].sonJdtionList[b].sonJdtionList[c].id == 333) {
							floorDeleteuser = 1;
						}
						if (extendslist[a].sonJdtionList[b].sonJdtionList[c].id == 334) {
							floorSetaccess = 1;
						}
						if (extendslist[a].sonJdtionList[b].sonJdtionList[c].id == 141) {
							park_changeappuser = 1;
						}
						if (extendslist[a].sonJdtionList[b].sonJdtionList[c].id == 142) {
							park_deleteappuser = 1;
						}
						if (extendslist[a].sonJdtionList[b].sonJdtionList[c].id == 143) {
							park_stopappuser = 1;
						}
						if (extendslist[a].sonJdtionList[b].sonJdtionList[c].id == 144) {
							park_recoveredappuser = 1;
						}
						if (extendslist[a].sonJdtionList[b].sonJdtionList[c].id == 241) {
							build_changeappuser = 1;
						}
						if (extendslist[a].sonJdtionList[b].sonJdtionList[c].id == 242) {
							build_deleteappuser = 1;
						}
						if (extendslist[a].sonJdtionList[b].sonJdtionList[c].id == 243) {
							build_stopappuser = 1;
						}
						if (extendslist[a].sonJdtionList[b].sonJdtionList[c].id == 244) {
							build_recoveredappuser = 1;
						}
						if (extendslist[a].sonJdtionList[b].sonJdtionList[c].id == 341) {
							floor_changeappuser = 1;
						}
						if (extendslist[a].sonJdtionList[b].sonJdtionList[c].id == 342) {
							floor_deleteappuser = 1;
						}

						if (extendslist[a].sonJdtionList[b].sonJdtionList[c].id == 421) {
							movequement = 1;
						}
						if (extendslist[a].sonJdtionList[b].sonJdtionList[c].id == 422) {
							quementAuthor = 1;
						}
						if (extendslist[a].sonJdtionList[b].sonJdtionList[c].id == 431) {
							addAuthor = 1;
						}
						if (extendslist[a].sonJdtionList[b].sonJdtionList[c].id == 432) {
							changeAuthor = 1;
						}
						if (extendslist[a].sonJdtionList[b].sonJdtionList[c].id == 433) {
							deleteAuthor = 1;
						}



						if (extendslist[a].sonJdtionList[b].sonJdtionList[c].id == 343) {
							floor_stopappuser = 1;
						}
						if (extendslist[a].sonJdtionList[b].sonJdtionList[c].id == 344) {
							floor_recoveredappuser = 1;
						}
						if (extendslist[a].sonJdtionList[b].sonJdtionList[c].id == 441) {
							room_addappuser = 1;
						}
						if (extendslist[a].sonJdtionList[b].sonJdtionList[c].id == 442) {
							room_changeappuser = 1;
						}
						if (extendslist[a].sonJdtionList[b].sonJdtionList[c].id == 443) {
							room_deleteappuser = 1;
						}
						if (extendslist[a].sonJdtionList[b].sonJdtionList[c].id == 444) {
							room_stopappuser = 1;
						}
						if (extendslist[a].sonJdtionList[b].sonJdtionList[c].id == 445) {
							room_recoveredappuser = 1;
						}
						if (extendslist[a].sonJdtionList[b].sonJdtionList[c].id == 446) {

							changedement = 1;
						}


					}

				}
			}

			var extendparam = {
				// mypark: mypark,
				buildingManagement: buildingManagement,
				parkuser: parkuser,
				parkAppuser: parkAppuser,
				parlog: parlog,
				// mybuild: mybuild,
				floorManagment: floorManagment,
				buildingUser: buildingUser,
				buildingAppuser: buildingAppuser,
				buildingLog: buildingLog,
				// myFloor: myFloor,
				roomManagement: roomManagement,
				floorUser: floorUser,
				floorAppuser: floorAppuser,
				floorLog: floorLog,
				// myRoom: myRoom,
				equipment: equipment,
				authorization: authorization,
				roomAppuser: roomAppuser,
				roomLog: roomLog,
				addbuild: addbuild,
				changebuild: changebuild,
				buildsetuser: buildsetuser,
				hostlist: hostlist,
				addfloor: addfloor,
				changefloor: changefloor,
				floorsetuser: floorsetuser,
				addroom: addroom,
				changeroom: changeroom,
				roomsetuser: roomsetuser,
				parkAdduser: parkAdduser,
				parkChangeuser: parkChangeuser,
				parkDeleteuser: parkDeleteuser,
				parkSetaccess: parkSetaccess,
				buildAdduser: buildAdduser,
				buildChangeuser: buildChangeuser,
				buildDeleteuser: buildDeleteuser,
				buildSetaccess: buildSetaccess,
				floorAdduser: floorAdduser,
				floorChangeuser: floorChangeuser,
				floorDeleteuser: floorDeleteuser,
				floorSetaccess: floorSetaccess,
				park_changeappuser: park_changeappuser,
				park_deleteappuser: park_deleteappuser,
				park_stopappuser: park_stopappuser,
				park_recoveredappuser: park_recoveredappuser,
				build_changeappuser: build_changeappuser,
				build_deleteappuser: build_deleteappuser,
				build_stopappuser: build_stopappuser,
				build_recoveredappuser: build_recoveredappuser,
				floor_changeappuser: floor_changeappuser,
				floor_deleteappuser: floor_deleteappuser,
				floor_stopappuser: floor_stopappuser,
				floor_recoveredappuser: floor_recoveredappuser,
				room_addappuser: room_addappuser,
				room_changeappuser: room_changeappuser,
				room_deleteappuser: room_deleteappuser,
				room_stopappuser: room_stopappuser,
				room_recoveredappuser: room_recoveredappuser,
				changedement: changedement,
				movequement: movequement,
				quementAuthor: quementAuthor,
				addAuthor: addAuthor,
				changeAuthor: changeAuthor,
				deleteAuthor: deleteAuthor

			}

			that.$store.commit('saveExtend', extendparam)
			if (that.$store.state.userinfo.userLevel == 1) {
				that.$store.commit('saveIndex', "1-1")
				that.$router.push('/garden/gardenManagement')

			} else if (that.$store.state.userinfo.userLevel == 2) {
				// if (mypark == 1) {
				that.$store.commit('saveIndex', "2-1")
				that.$router.push('/park/MyPark')
				// return;
				// }
				// } else if (buildingManagement == 1) {
				// 	that.$store.commit('saveIndex', "2-2")
				// 	that.$router.push('/park/buildingManagement')
				// 	return;
				// } else if (parkuser == 1) {
				// 	that.$store.commit('saveIndex', "2-3")
				// 	that.$router.push('/park/parkUser')
				// 	return;
				// } else if (parkAppuser == 1) {
				// 	that.$store.commit('saveIndex', "2-4")
				// 	that.$router.push('/park/parkAppuser')
				// 	return;
				// } else {
				// 	that.$message.error("您还没有权限")
				// }


			} else if (that.$store.state.userinfo.userLevel == 3) {
				// if (mybuild == 1) {
				that.$store.commit('saveIndex', "3-1")
				that.$router.push('/building/MyBuilding')
				return;
				// } 
				// else if (floorManagment == 1) {
				// 	that.$store.commit('saveIndex', "3-2")
				// 	that.$router.push('/building/floorManagment')
				// 	return;
				// } else if (buildingUser == 1) {
				// 	that.$store.commit('saveIndex', "3-3")
				// 	that.$router.push('/building/buildingUser')
				// 	return;
				// } else if (buildingAppuser == 1) {
				// 	that.$store.commit('saveIndex', "3-4")
				// 	that.$router.push('/building/buildingAppuser')
				// 	return;
				// } else {
				// 	that.$message.error("您还没有权限")
				// }

			} else if (that.$store.state.userinfo.userLevel == 4) {
				// if (myFloor == 1) {
				that.$store.commit('saveIndex', "4-1")

				that.$router.push('/floor/myFloor')
				return;
				// }
				//  else if (roomManagement == 1) {
				// 	that.$store.commit('saveIndex', "4-2")
				// 	that.$router.push('/floor/roomManagement')
				// 	return;
				// } else if (floorUser == 1) {
				// 	that.$store.commit('saveIndex', "4-3")
				// 	that.$router.push('/floor/floorUser')
				// 	return;
				// } else if (floorAppuser == 1) {
				// 	that.$store.commit('saveIndex', "4-4")
				// 	that.$router.push('/floor/floorAppuser')
				// 	return;
				// } else {
				// 	that.$message.error("您还没有权限")
				// }

			} else {
				// if (myRoom == 1) {
				that.$store.commit('saveIndex', "5-1")
				that.$router.push('/room/myRoom')
				// return;
				// } 
				// else if (equipment == 1) {
				// 	that.$store.commit('saveIndex', "5-2")
				// 	that.$router.push('/room/equipment')
				// 	return;
				// } else if (authorization == 1) {
				// 	that.$store.commit('saveIndex', "5-3")
				// 	that.$router.push('/room/authorization')
				// 	return;
				// } else if (roomAppuser == 1) {
				// 	that.$store.commit('saveIndex', "5-4")
				// 	that.$router.push('/room/roomAppuser')
				// 	return;
				// } else {
				// 	that.$message.error("您还没有权限")
				// }
			}
		},



	}
};