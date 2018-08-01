<template>
    <div class="setAccess">
      <div class="goback">
        <Breadcrumb separator=">">
          <BreadcrumbItem to="/park/parkUser">用户管理</BreadcrumbItem>
          <BreadcrumbItem>设置权限</BreadcrumbItem>
        </Breadcrumb>
      </div>
      <div class="set-title">
        设置权限
      </div>
      <div class="active">
        <div class="scope">
          <h2>管辖范围</h2>
          <ui>
            <li class="l">
              <el-tree
                :data="data2"
                show-checkbox
                node-key="id"
                ref="tree"
                :props="defaultProps">
              </el-tree>
            </li>
            <li class="l list-s2">
              <div class="sured" @click="getCheckedKeys()">---》授权</div>
              <div class="closed">《---取消</div>
            </li>
            <li class="l"></li>
          </ui>

        </div>
        <div class="set">
          <h2 class="set-h2">设置权限</h2>
          <el-radio v-model="radio" label="1">查看</el-radio>
          <el-radio v-model="radio" label="2">设置</el-radio>
        </div>
        <div class="Operate set">
          <h2 class="set-h2">操作权限</h2>
          <el-tree
            :data="data3"
            show-checkbox
            node-key="id"
            :props="defaultProps">
          </el-tree>


        </div>
      </div>

    </div>
</template>

<script>
    export default {
        name: "setAccess",
      data() {
        return {
          checkAll: false,
          checkedCities: [],
          radio: '',
          data2: [{
            id: 1,
            label: '高科技产业园1',
            children: [{
              id: 2,
              label: '一号楼',
              children: [{
                id: 3,
                label: '第一层',
                children:[
                  {
                    id: 4,
                    label: '101',
                  },
                  {
                    id: 5,
                    label: '102',
                  },

                ]
              }, {
                id: 6,
                label: '第二层',
                children:[
                  {
                    id: 7,
                    label: '201',
                  },
                  {
                    id: 8,
                    label: '202',
                  },

                ]
              }]
            },
              {
                id: 9,
                label: '一号楼',
                children: [{
                  id: 10,
                  label: '第一层',
                  children:[
                    {
                      id: 11,
                      label: '101',
                    },
                    {
                      id: 12,
                      label: '102',
                    },

                  ]
                }, {
                  id: 13,
                  label: '第二层',
                  children:[
                    {
                      id: 14,
                      label: '201',
                    },
                    {
                      id: 15,
                      label: '202',
                    },

                  ]
                }]
              },

            ]},
            {
              id: 16,
              label: '高科技产业园2',
              children: [{
                id: 17,
                label: '一号楼',
                children: [{
                  id: 18,
                  label: '第一层',
                  children:[
                    {
                      id: 19,
                      label: '101',
                      disabled: true
                    },
                    {
                      id: 20,
                      label: '102',
                    },

                  ]
                }, {
                  id: 21,
                  label: '第二层',
                  children:[
                    {
                      id: 22,
                      label: '201',
                    },
                    {
                      id: 23,
                      label: '202',
                    },

                  ]
                }]
              },
                {
                  id: 24,
                  label: '一号楼',
                  children: [{
                    id: 25,
                    label: '第一层',
                    children:[
                      {
                        id: 26,
                        label: '101',
                      },
                      {
                        id: 27,
                        label: '102',
                      },

                    ]
                  }, {
                    id: 28,
                    label: '第二层',
                    children:[
                      {
                        id: 29,
                        label: '201',
                      },
                      {
                        id: 30,
                        label: '202',
                      },

                    ]
                  }]
                },

              ]
            }],
          defaultProps: {
            children: 'children',
            label: 'label'
          },

          data3: [
            {
            id: 1,
            label: '园区管理',
            children: [{
              id: 11,
              label: '我的园区',
            },
              {
                id: 12,
                label: '大楼管理',
                children: [{
                  id: 121,
                  label: '添加'
                }, {
                  id: 122,
                  label: '修改'
                },
                  {
                    id: 123,
                    label: '删除'
                  },
                  {
                    id: 124,
                    label: '设置管理员'
                  },
                  {
                    id: 125,
                    label: '主机清单'
                  }]
              },
              {
                id: 13,
                label: '账户管理',
                children: [{
                  id: 131,
                  label: '添加'
                }, {
                  id: 132,
                  label: '修改'
                },
                  {
                    id: 133,
                    label: '删除'
                  },
                  {
                    id: 134,
                    label: '设置权限'
                  }]
              },
              {
                id: 14,
                label: 'App用户管理',
                children: [{
                  id: 141,
                  label: '修改'
                },
                  {
                    id: 142,
                    label: '删除'
                  },
                  {
                    id: 143,
                    label: '暂停'
                  },
                  {
                    id: 144,
                    label: '恢复'
                  }]
              },
              {
                id: 15,
                label: '日志管理',
              },]
          },
            {
              id: 2,
              label: '大楼管理',
              children: [{
                id: 21,
                label: '我的大楼',
              },
                {
                  id: 22,
                  label: '楼层管理',
                  children: [{
                    id: 221,
                    label: '添加'
                  }, {
                    id: 222,
                    label: '修改'
                  },
                    {
                      id: 223,
                      label: '删除'
                    },
                    {
                      id: 224,
                      label: '设置管理员'
                    }]
                },
                {
                  id: 23,
                  label: '账户管理',
                  children: [{
                    id: 231,
                    label: '添加'
                  }, {
                    id: 232,
                    label: '修改'
                  },
                    {
                      id: 233,
                      label: '删除'
                    },
                    {
                      id: 234,
                      label: '设置权限'
                    }]
                },
                {
                  id: 24,
                  label: 'App用户管理',
                  children: [{
                    id: 241,
                    label: '修改'
                  },
                    {
                      id: 242,
                      label: '删除'
                    },
                    {
                      id: 243,
                      label: '暂停'
                    },
                    {
                      id: 244,
                      label: '恢复'
                    }]
                },
                {
                  id: 25,
                  label: '日志管理',
                },]
            },
            {
              id: 3,
              label: '楼层管理',
              children: [{
                id: 31,
                label: '我的楼层',
              },
                {
                  id: 32,
                  label: '房间管理',
                  children: [{
                    id: 321,
                    label: '添加'
                  }, {
                    id: 322,
                    label: '修改'
                  },
                    {
                      id: 323,
                      label: '删除'
                    },
                    {
                      id: 324,
                      label: '设置管理员'
                    },
                    {
                      id: 325,
                      label: '主机清单'
                    }]
                },
                {
                  id: 33,
                  label: '账户管理',
                  children: [{
                    id: 331,
                    label: '添加'
                  }, {
                    id: 332,
                    label: '修改'
                  },
                    {
                      id:333,
                      label: '删除'
                    },
                    {
                      id: 334,
                      label: '设置权限'
                    }]
                },
                {
                  id: 34,
                  label: 'App用户管理',
                  children: [{
                    id: 341,
                    label: '修改'
                  },
                    {
                      id: 342,
                      label: '删除'
                    },
                    {
                      id: 343,
                      label: '暂停'
                    },
                    {
                      id: 344,
                      label: '恢复'
                    }]
                },
                {
                  id: 35,
                  label: '日志管理',
                },]
            },
            {
              id: 4,
              label: '房间管理',
              children: [{
                id: 41,
                label: '我的房间',
              },
                {
                  id: 42,
                  label: '设备管理',
                  children: [{
                    id: 421,
                    label: '设备迁移'
                  }, {
                    id: 422,
                    label: '设备授权'
                  }]
                },
                {
                  id: 43,
                  label: '授权管理',
                  children: [{
                    id: 431,
                    label: '添加'
                  }, {
                    id: 432,
                    label: '修改'
                  },
                    {
                      id:433,
                      label: '删除'
                    }]
                },
                {
                  id: 44,
                  label: 'App用户管理',
                  children: [{
                    id: 441,
                    label: '修改'
                  },
                    {
                      id: 442,
                      label: '删除'
                    },
                    {
                      id: 443,
                      label: '暂停'
                    },
                    {
                      id: 444,
                      label: '恢复'
                    }]
                },
                {
                  id: 45,
                  label: '日志管理',
                },]
            },



          ],




        };
      },
      methods:{
        getCheckedKeys() {
          console.log(this.$refs.tree.getCheckedNodes());
        },


      }
    }
</script>

<style scoped>
  .set-h2{
    margin-bottom: 10px;
  }
  .active{
    padding-left: 20px;
  }


</style>
