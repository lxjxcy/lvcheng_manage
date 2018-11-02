import Vue from 'vue'
import Router from 'vue-router'
// import login from '@/view/login/login'
// import unfind from '@/view/login/unfind'
// home页面
// import home from '@/view/home/home'

// import asideBar from '@/view/home/asideBar'

//楼层管理员相关页面
// import floor from '@/view/home/floor/floor'
// import myFloor from '@/view/home/floor/myFloor'

// import roomManagement from '@/view/home/floor/roomManagement'

// import floorLog from '@/view/home/floor/floorLog'
//园区管理员相关页面
// import park from '@/view/home/park/park'
// import MyPark from '@/view/home/park/MyPark'
// import buildingManagement from '@/view/home/park/buildingManagement'

// import HostListing from '@/view/home/park/HostListing'



// import myEquipment from '@/view/home/park/myEquipment'


//大楼管理员相关页面
// import building from '@/view/home/building/building'
// import MyBuilding from '@/view/home/building/MyBuilding'
// import floorManagement from '@/view/home/building/floorManagement'
// import buildingUser from '@/view/home/building/buildingUser'

// import buildingLog from '@/view/home/building/buildingLog'

//房间管理员相关页面
// import room from '@/view/home/room/room'
// import myRoom from '@/view/home/room/myRoom'
// import equipment from '@/view/home/room/equipment'
// import EquipmentAuthorization from '@/view/home/room/EquipmentAuthorization'
// import authorization from "@/view/home/room/authorization"
// import authorManagement from "@/view/home/room/authorManagement"
// import roomAppuser from '@/view/home/room/roomAppuser'
// import roomLog from '@/view/home/room/roomLog'
// import EquipmentAuthorization from '@/view/home/room/EquipmentAuthorization'
// import userAuthorization from '@/view/home/room/userAuthorization'
//系统管理员相关页面
// import garden from '@/view/home/garden/garden'
// import gardenManagement from '@/view/home/garden/gardenManagement'
// import gardenUser from '@/view/home/garden/gardenUser'
// import masterplate from '@/view/home/garden/masterplate'

// import gardenLog from '@/view/home/garden/gardenLog'



//列表
// import buildingList from '@/view/home/goList/buildingList'
// import floorList from '@/view/home/goList/floorList'
// import roomList from '@/view/home/goList/roomList'

// 设置管辖范围
// import setScope from '@/view/home/garden/setScope'

// 返回
// import goback from '@/view/home/goback/goback'

Vue.use(Router)

export default new Router({
    // mode: 'history',
    routes: [
        //登陆
        {
            path: '/',
            name: 'login',
            // component: login,
            component: resolve => require(['@/view/login/login'], resolve)
        }, {
            path: '/404',
            name: 'unfind',
            // component: unfind
            component: resolve => require(['@/view/login/unfind'], resolve)
        }, {
            path: '/home',
            name: 'home',
            // component: home,
            component: resolve => require(['@/view/home/home'], resolve),
            children: [{
                path: '/asideBar',
                // redirect: '/building/MyBuilding',
                name: 'asideBar',
                // component: asideBar,
                component: resolve => require(['@/view/home/asideBar'], resolve),
                children: [
                    // 大楼管理
                    {
                        path: '/building/MyBuilding',
                        name: 'MyBuilding',
                        meta: {
                            Auth: true,
                        },
                        // component: MyBuilding,
                        component: resolve => require(['@/view/home/building/MyBuilding'], resolve)
                    }, {
                        path: '/building/floorManagment',
                        name: 'floorManagement',
                        meta: {
                            Auth: true,
                        },
                        component: resolve => require(['@/view/home/building/floorManagement'], resolve)
                        // component: floorManagement
                    }, {
                        path: '/building/buildingUser',
                        name: 'gardenUser',
                        meta: {
                            Auth: true,
                        },
                        component: resolve => require(['@/view/home/garden/gardenUser'], resolve)
                        // component: gardenUser
                    }, {
                        path: '/building/buildingAppuser',
                        name: 'roomAppuser',
                        meta: {
                            Auth: true,
                        },
                        component: resolve => require(['@/view/home/room/roomAppuser'], resolve)
                        // component: roomAppuser
                    }, {
                        path: '/building/buildingLog',
                        name: 'roomLog',
                        meta: {
                            Auth: true,
                        },
                        component: resolve => require(['@/view/home/room/roomLog'], resolve)
                        // component: buildingLog
                    }, {
                        path: '/building/roomList',
                        name: 'roomManagement',
                        meta: {
                            Auth: true,
                        },

                        // component: roomManagement
                        component: resolve => require(['@/view/home/floor/roomManagement'], resolve)
                    }, {
                        path: '/building/roomList/equimentList',
                        name: 'equipment',
                        meta: {
                            Auth: true,
                        },
                        component: resolve => require(['@/view/home/room/equipment'], resolve)
                        // component: equipment
                    }, {
                        path: '/building/myEquipment',
                        name: 'myEquipment',
                        meta: {
                            Auth: true,
                        },
                        component: resolve => require(['@/view/home/park/myEquipment'], resolve)
                        // component: myEquipment
                    }, {
                        path: '/building/authorManagement',
                        name: 'authorManagement',
                        redirect: "/building/authorManagement/user",
                        meta: {
                            Auth: true,
                        },
                        component: resolve => require(['@/view/home/room/authorManagement'], resolve),
                        // component: authorManagement,
                        children: [{
                                path: '/building/authorManagement/user',
                                name: 'userAuthorization',

                                meta: {
                                    Auth: true,
                                },
                                component: resolve => require(['@/view/home/room/userAuthorization'], resolve)
                                // component: userAuthorization,
                            }, {
                                path: '/building/authorManagement/equipment',
                                name: 'EquipmentAuthorization',
                                meta: {
                                    Auth: true,
                                },
                                component: resolve => require(['@/view/home/room/EquipmentAuthorization'], resolve),
                                // component: EquipmentAuthorization,
                            },

                        ]
                    }, {
                        path: '/building/authorizationInfo',
                        name: 'authorization',
                        meta: {
                            Auth: true,
                        },
                        component: resolve => require(['@/view/home/room/authorization'], resolve),
                        // component: authorization,
                    },
                    // 系统管理
                    {
                        path: '/garden/gardenManagement',
                        name: 'gardenManagement',
                        meta: {
                            Auth: true,
                        },
                        component: resolve => require(['@/view/home/garden/gardenManagement'], resolve)
                        // component: gardenManagement
                    }, {
                        path: '/garden/masterplate',
                        name: 'masterplate',
                        meta: {
                            Auth: true,
                        },
                        component: resolve => require(['@/view/home/garden/masterplate'], resolve)
                        // component: masterplate
                    }, {
                        path: '/garden/gardenUser',
                        name: 'gardenUser',
                        meta: {
                            Auth: true,
                        },
                        component: resolve => require(['@/view/home/garden/gardenUser'], resolve)
                        // component: gardenUser
                    }, {
                        path: '/garden/gardenLog',
                        name: 'roomLog',
                        meta: {
                            Auth: true,
                        },
                        component: resolve => require(['@/view/home/room/roomLog'], resolve)
                        // component: gardenLog
                    },


                    // 园区管理
                    {
                        path: '/park/MyPark',
                        name: 'MyPark',
                        meta: {
                            Auth: true,
                        },
                        component: resolve => require(['@/view/home/park/MyPark'], resolve)
                        // component: MyPark
                    }, {
                        path: '/park/buildingManagement',
                        name: 'buildingManagement',
                        meta: {
                            Auth: true,
                        },
                        component: resolve => require(['@/view/home/park/buildingManagement'], resolve)
                        // component: buildingManagement
                    }, {
                        path: '/park/parkUser',
                        name: 'gardenUser',
                        meta: {
                            Auth: true,
                        },
                        component: resolve => require(['@/view/home/garden/gardenUser'], resolve)
                        // component: gardenUser
                    },
                    // {
                    //     path: '/park/HostListing',
                    //     name: 'HostListing',
                    //     meta: {
                    //         Auth: true,
                    //     },
                    //     component:resolve=>require(['@/view/login/login'],resolve)
                    //     // component: HostListing
                    // }, 
                    {
                        path: '/park/parkAppuser',
                        name: 'roomAppuser',
                        meta: {
                            Auth: true,
                        },
                        component: resolve => require(['@/view/home/room/roomAppuser'], resolve)
                        // component: roomAppuser
                    }, {
                        path: '/park/parkLog',
                        name: 'roomLog',
                        meta: {
                            Auth: true,
                        },
                        component: resolve => require(['@/view/home/room/roomLog'], resolve)
                        // component: gardenLog
                    }, {
                        path: '/park/floorList',
                        name: 'floorManagement',
                        meta: {
                            Auth: true,
                        },
                        component: resolve => require(['@/view/home/building/floorManagement'], resolve)
                        // component: floorManagement
                    }, {
                        path: '/park/floorList/roomList',
                        name: 'roomManagement',
                        meta: {
                            Auth: true,
                        },
                        component: resolve => require(['@/view/home/floor/roomManagement'], resolve)
                        // component: roomManagement
                    }, {
                        path: '/park/floorList/roomList/equimentList',
                        name: 'equipment',
                        meta: {
                            Auth: true,
                        },
                        component: resolve => require(['@/view/home/room/equipment'], resolve)
                        // component: equipment
                    }, {
                        path: '/park/myEquipment',
                        name: 'myEquipment',
                        meta: {
                            Auth: true,
                        },
                        component: resolve => require(['@/view/home/park/myEquipment'], resolve)
                        // component: myEquipment
                    }, {
                        path: '/park/authorManagement',
                        name: 'authorManagement',
                        redirect: "/park/authorManagement/user",
                        meta: {
                            Auth: true,
                        },
                        component: resolve => require(['@/view/home/room/authorManagement'], resolve),
                        // component: authorManagement,
                        children: [{
                                path: '/park/authorManagement/user',
                                name: 'userAuthorization',

                                meta: {
                                    Auth: true,
                                },
                                component: resolve => require(['@/view/home/room/userAuthorization'], resolve),
                                // component: userAuthorization,
                            }, {
                                path: '/park/authorManagement/equipment',
                                name: 'EquipmentAuthorization',
                                meta: {
                                    Auth: true,
                                },
                                component: resolve => require(['@/view/home/room/EquipmentAuthorization'], resolve),
                                // component: EquipmentAuthorization,
                            },

                        ]
                    }, {
                        path: '/park/authorizationInfo',
                        name: 'authorization',
                        meta: {
                            Auth: true,
                        },
                        component: resolve => require(['@/view/home/room/authorization'], resolve),
                        // component: authorization,
                    },
                    //房间

                    {
                        path: '/room/myRoom',
                        name: 'myRoom',
                        meta: {
                            Auth: true,
                        },
                        component: resolve => require(['@/view/home/room/myRoom'], resolve),
                        // component: myRoom
                    }, {
                        path: '/room/equipment',
                        name: 'equipment',
                        meta: {
                            Auth: true,
                        },
                        component: resolve => require(['@/view/home/room/equipment'], resolve)
                        // component: equipment
                    }, {
                        path: '/room/authorManagement',
                        name: 'authorManagement',
                        redirect: "/room/authorManagement/user",
                        meta: {
                            Auth: true,
                        },
                        component: resolve => require(['@/view/home/room/authorManagement'], resolve),
                        // component: authorManagement,
                        children: [{
                                path: '/room/authorManagement/user',
                                name: 'userAuthorization',

                                meta: {
                                    Auth: true,
                                },
                                component: resolve => require(['@/view/home/room/userAuthorization'], resolve),
                                // component: userAuthorization,
                            }, {
                                path: '/room/authorManagement/equipment',
                                name: 'EquipmentAuthorization',
                                meta: {
                                    Auth: true,
                                },
                                component: resolve => require(['@/view/home/room/EquipmentAuthorization'], resolve)
                                // component: EquipmentAuthorization,
                            },


                        ]
                    }, {
                        path: '/room/authorizationInfo',
                        name: 'authorization',
                        meta: {
                            Auth: true,
                        },
                        component: resolve => require(['@/view/home/room/authorization'], resolve)
                        // component: authorization,
                    }, {
                        path: '/room/roomAppuser',
                        name: 'roomAppuser',
                        meta: {
                            Auth: true,
                        },
                        component: resolve => require(['@/view/home/room/roomAppuser'], resolve),
                        // component: roomAppuser
                    }, {
                        path: '/room/roomLog',
                        name: 'roomLog',
                        meta: {
                            Auth: true,
                        },
                        component: resolve => require(['@/view/home/room/roomLog'], resolve)
                        // component: roomLog
                    },
                    // 楼层
                    {
                        path: '/floor/myFloor',
                        name: 'myFloor',
                        meta: {
                            Auth: true,
                        },
                        component: resolve => require(['@/view/home/floor/myFloor'], resolve)
                        // component: myFloor
                    }, {
                        path: '/floor/floorUser',
                        name: 'gardenUser',
                        meta: {
                            Auth: true,
                        },
                        component: resolve => require(['@/view/home/garden/gardenUser'], resolve)
                        // component: gardenUser
                    }, {
                        path: '/floor/roomManagement',
                        name: 'roomManagement',
                        meta: {
                            Auth: true,
                        },
                        component: resolve => require(['@/view/home/floor/roomManagement'], resolve)
                        // component: roomManagement
                    }, {
                        path: '/floor/floorAppuser',
                        name: 'roomAppuser',
                        meta: {
                            Auth: true,
                        },
                        component: resolve => require(['@/view/home/room/roomAppuser'], resolve)
                        // component: roomAppuser
                    }, {
                        path: '/floor/floorLog',
                        name: 'roomLog',
                        meta: {
                            Auth: true,
                        },
                        component: resolve => require(['@/view/home/room/roomLog'], resolve)
                        // component: floorLog
                    }, {
                        path: '/floor/equimentList',
                        name: 'equipment',
                        meta: {
                            Auth: true,
                        },
                        component: resolve => require(['@/view/home/room/equipment'], resolve)
                        // component: equipment
                    }, {
                        path: '/floor/myEquipment',
                        name: 'myEquipment',
                        meta: {
                            Auth: true,
                        },
                        component: resolve => require(['@/view/home/park/myEquipment'], resolve)
                        // component: myEquipment
                    }, {
                        path: '/floor/authorManagement',
                        name: 'authorManagement',
                        redirect: "/floor/authorManagement/user",
                        meta: {
                            Auth: true,
                        },
                        component: resolve => require(['@/view/home/room/authorManagement'], resolve),
                        // component: authorManagement,
                        children: [{
                                path: '/floor/authorManagement/user',
                                name: 'userAuthorization',

                                meta: {
                                    Auth: true,
                                },
                                component: resolve => require(['@/view/home/room/userAuthorization'], resolve),
                                // component: userAuthorization,
                            }, {
                                path: '/floor/authorManagement/equipment',
                                name: 'EquipmentAuthorization',
                                meta: {
                                    Auth: true,
                                },
                                component: resolve => require(['@/view/home/room/EquipmentAuthorization'], resolve),
                                // component: EquipmentAuthorization,
                            },

                        ]
                    }, {
                        path: '/floor/authorizationInfo',
                        name: 'authorization',
                        meta: {
                            Auth: true,
                        },
                        component: resolve => require(['@/view/home/room/authorization'], resolve)
                        // component: authorization,
                    },

                ]
            }]
        }
    ]
})