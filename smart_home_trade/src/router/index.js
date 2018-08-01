import Vue from 'vue'
import Router from 'vue-router'
import login from '@/view/login/login'
import building from '@/view/home/building/building'
import garden from '@/view/home/garden/garden'

import park from '@/view/home/park/park'
import room from '@/view/home/room/room'
import floor from '@/view/home/floor/floor'

import myFloor from '@/view/home/floor/myFloor'
import floorUser from '@/view/home/floor/floorUser'
import roomManagement from '@/view/home/floor/roomManagement'
import floorAppuser from '@/view/home/floor/floorAppuser'
import floorLog from '@/view/home/floor/floorLog'

import MyPark from '@/view/home/park/MyPark'
import buildingManagement from '@/view/home/park/buildingManagement'
import parkUser from '@/view/home/park/parkUser'
import HostListing from '@/view/home/park/HostListing'
import parkAppuser from '@/view/home/park/parkAppuser'
import parkLog from '@/view/home/park/parkLog'
import setAccess from '@/view/home/park/setAccess'

import MyBuilding from '@/view/home/building/MyBuilding'
import floorManagement from '@/view/home/building/floorManagement'
import buildingUser from '@/view/home/building/buildingUser'
import buildingAppuser from '@/view/home/building/buildingAppuser'
import buildingLog from '@/view/home/building/buildingLog'

import myRoom from '@/view/home/room/myRoom'
import equipment from '@/view/home/room/equipment'
import authorization from '@/view/home/room/authorization'
import roomAppuser from '@/view/home/room/roomAppuser'
import roomLog from '@/view/home/room/roomLog'

import gardenManagement from '@/view/home/garden/gardenManagement'
import gardenUser from '@/view/home/garden/gardenUser'
import masterplate from '@/view/home/garden/masterplate'
import gardenAppuser from '@/view/home/garden/gardenAppuser'
import gardenLog from '@/view/home/garden/gardenLog'


//列表
import buildingList from '@/view/home/goList/buildingList'
import floorList from '@/view/home/goList/floorList'
import roomList from '@/view/home/goList/roomList'

Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/',
      name: 'login',
      component: login
    },
    {
      path: '/building',
      name: 'building',
      component: building,
      children: [
        {
          path: '/building/MyBuilding',
          name: 'MyBuilding',
          component: MyBuilding
        },
        {
          path: '/building/floorManagment',
          name: 'floorManagement',
          component: floorManagement
        },
        {
          path: '/building/buildingUser',
          name: 'buildingUser',
          component: buildingUser
        },
        {
          path: '/building/buildingAppuser',
          name: 'buildingAppuser',
          component: buildingAppuser
        },
        {
          path: '/building/buildingLog',
          name: 'buildingLog',
          component: buildingLog
        }
      ]
    },
    {
      path: '/garden',
      name: 'garden',
      component: garden,
      children: [
        {
          path: '/garden/gardenManagement',
          name: 'gardenManagement',
          component: gardenManagement
        },
        {
          path: '/garden/masterplate',
          name: 'masterplate',
          component: masterplate
        },
        {
          path: '/garden/gardenUser',
          name: 'gardenUser',
          component: gardenUser
        },
        {
          path: '/garden/gardenAppuser',
          name: 'gardenAppuser',
          component: gardenAppuser
        },
        {
          path: '/garden/gardenLog',
          name: 'gardenLog',
          component: gardenLog
        },
        {
          path: '/garden/buildingList',
          name: 'buildingList',
          component: buildingList
        },
        {
          path: '/garden/floorList',
          name: 'floorList',
          component: floorList
        },
        {
          path: '/garden/roomList',
          name: 'roomList',
          component: roomList
        }
      ]
    },
    {
      path: '/park',
      name: 'park',
      component: park,
      children: [
        {
          path: '/park/MyPark',
          name: 'MyPark',
          component: MyPark
        },
        {
          path: '/park/buildingManagement',
          name: 'buildingManagement',
          component: buildingManagement
        },
        {
          path: '/park/parkUser',
          name: 'parkUser',
          component: parkUser
        },
        {
          path: '/park/HostListing',
          name: 'HostListing',
          component: HostListing
        },
        {
          path: '/park/parkAppuser',
          name: 'parkAppuser',
          component: parkAppuser
        },
        {
          path: '/park/setAccess',
          name: 'setAccess',
          component: setAccess
        },
        {
          path: '/park/parkLog',
          name: 'parkLog',
          component: parkLog
        },
        {
          path: '/park/buildingList',
          name: 'buildingList',
          component: buildingList
        }


      ]
    },
    {
      path: '/room',
      name: 'room',
      component: room,
      children: [
        {
          path: '/room/myRoom',
          name: 'myRoom',
          component: myRoom
        },
        {
          path: '/room/equipment',
          name: 'equipment',
          component: equipment
        },
        {
          path: '/room/authorization',
          name: 'authorization',
          component: authorization
        },
        {
          path: '/room/roomAppuser',
          name: 'roomAppuser',
          component: roomAppuser
        },
        {
          path: '/room/roomLog',
          name: 'roomLog',
          component: roomLog
        }
      ]
    },
    {
      path: '/floor',
      name: 'floor',
      component: floor,
      children: [
          {
            path: '/floor/myFloor',
            name: 'myFloor',
            component: myFloor
          },
          {
            path: '/floor/floorUser',
            name: 'floorUser',
            component: floorUser
          },
          {
            path: '/floor/roomManagement',
            name: 'roomManagement',
            component: roomManagement
          },
        {
          path: '/floor/floorAppuser',
          name: 'floorAppuser',
          component: floorAppuser
        },
        {
          path: '/floor/floorLog',
          name: 'floorLog',
          component: floorLog
        }
        ]
    }
  ]
})
