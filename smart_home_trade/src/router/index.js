import Vue from 'vue'
import Router from 'vue-router'
import login from '@/view/login/login'

// home页面
import home from '@/view/home/home'

import asideBar from '@/view/home/asideBar'

//楼层管理员相关页面
// import floor from '@/view/home/floor/floor'
import myFloor from '@/view/home/floor/myFloor'
import floorUser from '@/view/home/floor/floorUser'
import roomManagement from '@/view/home/floor/roomManagement'
import floorAppuser from '@/view/home/floor/floorAppuser'
import floorLog from '@/view/home/floor/floorLog'
//园区管理员相关页面
// import park from '@/view/home/park/park'
import MyPark from '@/view/home/park/MyPark'
import buildingManagement from '@/view/home/park/buildingManagement'
import parkUser from '@/view/home/park/parkUser'
import HostListing from '@/view/home/park/HostListing'
import parkAppuser from '@/view/home/park/parkAppuser'
import parkLog from '@/view/home/park/parkLog'
import setAccess from '@/view/home/park/setAccess'


//大楼管理员相关页面
// import building from '@/view/home/building/building'
import MyBuilding from '@/view/home/building/MyBuilding'
import floorManagement from '@/view/home/building/floorManagement'
import buildingUser from '@/view/home/building/buildingUser'
import buildingAppuser from '@/view/home/building/buildingAppuser'
import buildingLog from '@/view/home/building/buildingLog'

//房间管理员相关页面
// import room from '@/view/home/room/room'
import myRoom from '@/view/home/room/myRoom'
import equipment from '@/view/home/room/equipment'
import authorization from '@/view/home/room/authorization'
import roomAppuser from '@/view/home/room/roomAppuser'
import roomLog from '@/view/home/room/roomLog'
import EquipmentAuthorization from '@/view/home/room/EquipmentAuthorization'

//系统管理员相关页面
// import garden from '@/view/home/garden/garden'
import gardenManagement from '@/view/home/garden/gardenManagement'
import gardenUser from '@/view/home/garden/gardenUser'
import masterplate from '@/view/home/garden/masterplate'
import gardenAppuser from '@/view/home/garden/gardenAppuser'
import gardenLog from '@/view/home/garden/gardenLog'


//列表
// import buildingList from '@/view/home/goList/buildingList'
// import floorList from '@/view/home/goList/floorList'
// import roomList from '@/view/home/goList/roomList'

// 设置管辖范围
import setScope from '@/view/home/garden/setScope'

// 返回
// import goback from '@/view/home/goback/goback'

Vue.use(Router)

export default new Router({
    routes: [
        //登陆
        {
            path: '/login',
            name: 'login',
            component: login
        }, {
            path: '/home',
            name: 'home',
            component: home,
            children: [{
                path: '/asideBar',
                // redirect: '/building/MyBuilding',
                name: 'asideBar',
                component: asideBar,
                children: [{
                        path: '/building/MyBuilding',
                        name: 'MyBuilding',
                        meta: {
                            Auth: true,
                        },
                        component: MyBuilding
                    },
                    // 大楼管理
                    {
                        path: '/building/MyBuilding',
                        name: 'MyBuilding',
                        meta: {
                            Auth: true,
                        },
                        component: MyBuilding
                    }, {
                        path: '/building/floorManagment',
                        name: 'floorManagement',
                        meta: {
                            Auth: true,
                        },
                        component: floorManagement
                    }, {
                        path: '/building/buildingUser',
                        name: 'buildingUser',
                        meta: {
                            Auth: true,
                        },
                        component: buildingUser
                    }, {
                        path: '/building/buildingAppuser',
                        name: 'buildingAppuser',
                        meta: {
                            Auth: true,
                        },
                        component: buildingAppuser
                    }, {
                        path: '/building/buildingLog',
                        name: 'buildingLog',
                        meta: {
                            Auth: true,
                        },
                        component: buildingLog
                    }, {
                        path: '/building/roomList',
                        name: 'roomManagement',
                        meta: {
                            Auth: true,
                        },
                        component: roomManagement
                    }, {
                        path: '/building/roomList/equimentList',
                        name: 'equipment',
                        meta: {
                            Auth: true,
                        },
                        component: equipment
                    },
                    // 系统管理
                    {
                        path: '/garden/gardenManagement',
                        name: 'gardenManagement',
                        meta: {
                            Auth: true,
                        },
                        component: gardenManagement
                    }, {
                        path: '/garden/masterplate',
                        name: 'masterplate',
                        meta: {
                            Auth: true,
                        },
                        component: masterplate
                    }, {
                        path: '/garden/gardenUser',
                        name: 'gardenUser',
                        meta: {
                            Auth: true,
                        },
                        component: gardenUser
                    }, {
                        path: '/garden/gardenAppuser',
                        name: 'gardenAppuser',
                        meta: {
                            Auth: true,
                        },
                        component: gardenAppuser
                    }, {
                        path: '/garden/gardenLog',
                        name: 'gardenLog',
                        meta: {
                            Auth: true,
                        },
                        component: gardenLog
                    }, {
                        path: '/garden/setScope',
                        name: 'setScope',
                        meta: {
                            Auth: true,
                        },
                        component: setScope
                    },
                    // 园区管理
                    {
                        path: '/park/MyPark',
                        name: 'MyPark',
                        meta: {
                            Auth: true,
                        },
                        component: MyPark
                    }, {
                        path: '/park/buildingManagement',
                        name: 'buildingManagement',
                        meta: {
                            Auth: true,
                        },
                        component: buildingManagement
                    }, {
                        path: '/park/parkUser',
                        name: 'parkUser',
                        meta: {
                            Auth: true,
                        },
                        component: parkUser
                    }, {
                        path: '/park/HostListing',
                        name: 'HostListing',
                        meta: {
                            Auth: true,
                        },
                        component: HostListing
                    }, {
                        path: '/park/parkAppuser',
                        name: 'parkAppuser',
                        meta: {
                            Auth: true,
                        },
                        component: parkAppuser
                    }, {
                        path: '/park/setAccess',
                        name: 'setAccess',
                        meta: {
                            Auth: true,
                        },
                        component: setAccess
                    }, {
                        path: '/park/parkLog',
                        name: 'parkLog',
                        meta: {
                            Auth: true,
                        },
                        component: parkLog
                    }, {
                        path: '/park/floorList',
                        name: 'floorManagement',
                        meta: {
                            Auth: true,
                        },
                        component: floorManagement
                    }, {
                        path: '/park/floorList/roomList',
                        name: 'roomManagement',
                        meta: {
                            Auth: true,
                        },
                        component: roomManagement
                    }, {
                        path: '/park/floorList/roomList/equimentList',
                        name: 'equipment',
                        meta: {
                            Auth: true,
                        },
                        component: equipment
                    },
                    //房间

                    {
                        path: '/room/myRoom',
                        name: 'myRoom',
                        meta: {
                            Auth: true,
                        },
                        component: myRoom
                    }, {
                        path: '/room/equipment',
                        name: 'equipment',
                        meta: {
                            Auth: true,
                        },
                        component: equipment
                    }, {
                        path: '/room/authorization',
                        name: 'authorization',
                        meta: {
                            Auth: true,
                        },
                        component: authorization
                    }, {
                        path: '/room/roomAppuser',
                        name: 'roomAppuser',
                        meta: {
                            Auth: true,
                        },
                        component: roomAppuser
                    }, {
                        path: '/room/roomLog',
                        name: 'roomLog',
                        meta: {
                            Auth: true,
                        },
                        component: roomLog
                    }, {
                        path: '/room/EquipmentAuthorization',
                        name: 'EquipmentAuthorization',
                        meta: {
                            Auth: true,
                        },
                        component: EquipmentAuthorization
                    },
                    // 楼层
                    {
                        path: '/floor/myFloor',
                        name: 'myFloor',
                        meta: {
                            Auth: true,
                        },
                        component: myFloor
                    }, {
                        path: '/floor/floorUser',
                        name: 'floorUser',
                        meta: {
                            Auth: true,
                        },
                        component: floorUser
                    }, {
                        path: '/floor/roomManagement',
                        name: 'roomManagement',
                        meta: {
                            Auth: true,
                        },
                        component: roomManagement
                    }, {
                        path: '/floor/floorAppuser',
                        name: 'floorAppuser',
                        meta: {
                            Auth: true,
                        },
                        component: floorAppuser
                    }, {
                        path: '/floor/floorLog',
                        name: 'floorLog',
                        meta: {
                            Auth: true,
                        },
                        component: floorLog
                    }, {
                        path: '/floor/equimentList',
                        name: 'equipment',
                        meta: {
                            Auth: true,
                        },
                        component: equipment
                    }
                ]
            }]
        }
    ]
})



//大楼管理
// {
//     path: '/building',
//     redirect: '/building/MyBuilding',
//     name: 'building',
//     component: building,
//     children: [{
//         path: '/building/MyBuilding',
//         name: 'MyBuilding',
//         meta: {
//             Auth: true,
//         },
//         component: MyBuilding
//     }, {
//         path: '/building/floorManagment',
//         name: 'floorManagement',
//         meta: {
//             Auth: true,
//         },
//         component: floorManagement
//     }, {
//         path: '/building/buildingUser',
//         name: 'buildingUser',
//         meta: {
//             Auth: true,
//         },
//         component: buildingUser
//     }, {
//         path: '/building/buildingAppuser',
//         name: 'buildingAppuser',
//         meta: {
//             Auth: true,
//         },
//         component: buildingAppuser
//     }, {
//         path: '/building/buildingLog',
//         name: 'buildingLog',
//         meta: {
//             Auth: true,
//         },
//         component: buildingLog
//     }, {
//         path: '/building/roomList',
//         name: 'roomManagement',
//         meta: {
//             Auth: true,
//         },
//         component: roomManagement
//     }, {
//         path: '/building/roomList/equimentList',
//         name: 'equipment',
//         meta: {
//             Auth: true,
//         },
//         component: equipment
//     }, ]
// },
//系统管理
// {
//     path: '/garden',
//     redirect: '/garden/gardenManagement',
//     name: 'garden',
//     component: garden,
//     children: [{
//         path: '/garden/gardenManagement',
//         name: 'gardenManagement',
//         meta: {
//             Auth: true,
//         },
//         component: gardenManagement
//     }, {
//         path: '/garden/masterplate',
//         name: 'masterplate',
//         meta: {
//             Auth: true,
//         },
//         component: masterplate
//     }, {
//         path: '/garden/gardenUser',
//         name: 'gardenUser',
//         meta: {
//             Auth: true,
//         },
//         component: gardenUser
//     }, {
//         path: '/garden/gardenAppuser',
//         name: 'gardenAppuser',
//         meta: {
//             Auth: true,
//         },
//         component: gardenAppuser
//     }, {
//         path: '/garden/gardenLog',
//         name: 'gardenLog',
//         meta: {
//             Auth: true,
//         },
//         component: gardenLog
//     }, {
//         path: '/garden/setScope',
//         name: 'setScope',
//         meta: {
//             Auth: true,
//         },
//         component: setScope
//     }]
// },
//园区管理
// {
//     path: '/park',
//     redirect: '/park/MyPark',
//     name: 'park',
//     component: park,

//     children: [{
//         path: '/park/MyPark',
//         name: 'MyPark',
//         meta: {
//             Auth: true,
//         },
//         component: MyPark
//     }, {
//         path: '/park/buildingManagement',
//         name: 'buildingManagement',
//         meta: {
//             Auth: true,
//         },
//         component: buildingManagement
//     }, {
//         path: '/park/parkUser',
//         name: 'parkUser',
//         meta: {
//             Auth: true,
//         },
//         component: parkUser
//     }, {
//         path: '/park/HostListing',
//         name: 'HostListing',
//         meta: {
//             Auth: true,
//         },
//         component: HostListing
//     }, {
//         path: '/park/parkAppuser',
//         name: 'parkAppuser',
//         meta: {
//             Auth: true,
//         },
//         component: parkAppuser
//     }, {
//         path: '/park/setAccess',
//         name: 'setAccess',
//         meta: {
//             Auth: true,
//         },
//         component: setAccess
//     }, {
//         path: '/park/parkLog',
//         name: 'parkLog',
//         meta: {
//             Auth: true,
//         },
//         component: parkLog
//     }, {
//         path: '/park/floorList',
//         name: 'floorManagement',
//         meta: {
//             Auth: true,
//         },
//         component: floorManagement
//     }, {
//         path: '/park/floorList/roomList',
//         name: 'roomManagement',
//         meta: {
//             Auth: true,
//         },
//         component: roomManagement
//     }, {
//         path: '/park/floorList/roomList/equimentList',
//         name: 'equipment',
//         meta: {
//             Auth: true,
//         },
//         component: equipment
//     }]
// },
//房间管理
// {
//     path: '/room',
//     redirect: '/room/myRoom',
//     name: 'room',
//     component: room,
//     children: [{
//         path: '/room/myRoom',
//         name: 'myRoom',
//         meta: {
//             Auth: true,
//         },
//         component: myRoom
//     }, {
//         path: '/room/equipment',
//         name: 'equipment',
//         meta: {
//             Auth: true,
//         },
//         component: equipment
//     }, {
//         path: '/room/authorization',
//         name: 'authorization',
//         meta: {
//             Auth: true,
//         },
//         component: authorization
//     }, {
//         path: '/room/roomAppuser',
//         name: 'roomAppuser',
//         meta: {
//             Auth: true,
//         },
//         component: roomAppuser
//     }, {
//         path: '/room/roomLog',
//         name: 'roomLog',
//         meta: {
//             Auth: true,
//         },
//         component: roomLog
//     }, {
//         path: '/room/EquipmentAuthorization',
//         name: 'EquipmentAuthorization',
//         meta: {
//             Auth: true,
//         },
//         component: EquipmentAuthorization
//     }]
// },
//楼层管理
// {
//     path: '/floor',
//     redirect: '/floor/myFloor',
//     name: 'floor',
//     component: floor,
//     children: [{
//             path: '/floor/myFloor',
//             name: 'myFloor',
//             meta: {
//                 Auth: true,
//             },
//             component: myFloor
//         }, {
//             path: '/floor/floorUser',
//             name: 'floorUser',
//             meta: {
//                 Auth: true,
//             },
//             component: floorUser
//         }, {
//             path: '/floor/roomManagement',
//             name: 'roomManagement',
//             meta: {
//                 Auth: true,
//             },
//             component: roomManagement
//         }, {
//             path: '/floor/floorAppuser',
//             name: 'floorAppuser',
//             meta: {
//                 Auth: true,
//             },
//             component: floorAppuser
//         }, {
//             path: '/floor/floorLog',
//             name: 'floorLog',
//             meta: {
//                 Auth: true,
//             },
//             component: floorLog
//         }, {
//             path: '/floor/equimentList',
//             name: 'equipment',
//             meta: {
//                 Auth: true,
//             },
//             component: equipment
//         }