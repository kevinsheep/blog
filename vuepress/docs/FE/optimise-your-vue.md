---
updateTime: 2019/01/31
---

# vue 代码优化

## iView “多列指标筛选的表格”
[展示效果及示例代码](https://www.iviewui.com/components/table#GJSL)  
此处原样引用，作为对比
```vue
<template>
  <Checkbox-group v-model="tableColumnsChecked" @on-change="changeTableColumns">
    <Checkbox label="show">Show</Checkbox>
    <Checkbox label="weak">Weak</Checkbox>
    <Checkbox label="signin">Signin</Checkbox>
    <Checkbox label="click">Click</Checkbox>
    <Checkbox label="active">Active</Checkbox>
    <Checkbox label="day7">7, retained</Checkbox>
    <Checkbox label="day30">30, retained</Checkbox>
    <Checkbox label="tomorrow">The next day left</Checkbox>
    <Checkbox label="day">Day Active</Checkbox>
    <Checkbox label="week">Week Active</Checkbox>
    <Checkbox label="month">Month Active</Checkbox>
  </Checkbox-group>
  <Table :data="tableData2" :columns="tableColumns2" border></Table>
</template>
<script>
  export default {
    data() {
      return {
        tableData2: this.mockTableData2(),
        tableColumns2: [],
        tableColumnsChecked: ['show', 'weak', 'signin', 'click', 'active', 'day7', 'day30', 'tomorrow', 'day', 'week', 'month']
      }
    },
    methods: {
      mockTableData2() {
        let data = [];

        function getNum() {
          return Math.floor(Math.random() * 10000 + 1);
        }
        for (let i = 0; i < 10; i++) {
          data.push({
            name: 'Name ' + (i + 1),
            fav: 0,
            show: getNum(),
            weak: getNum(),
            signin: getNum(),
            click: getNum(),
            active: getNum(),
            day7: getNum(),
            day30: getNum(),
            tomorrow: getNum(),
            day: getNum(),
            week: getNum(),
            month: getNum()
          })
        }
        return data;
      },
      getTable2Columns() {
        const table2ColumnList = {
          name: {
            title: 'Name',
            key: 'name',
            fixed: 'left',
            width: 200,
            render: (h, params) => {
              const fav = this.tableData2[params.index].fav;
              const style = fav === 0 ? {
                cursor: 'pointer'
              } : {
                cursor: 'pointer',
                color: '#f50'
              };

              return h('div', [
                h('Icon', {
                  style: style,
                  props: {
                    type: fav === 0 ? 'ios-star-outline' : 'ios-star'
                  },
                  nativeOn: {
                    click: () => {
                      this.toggleFav(params.index);
                    }
                  }
                }),
                h('span', ' ' + params.row.name)
              ]);
            }
          },
          show: {
            title: 'Show',
            key: 'show',
            width: 150,
            sortable: true
          },
          weak: {
            title: 'Weak',
            key: 'weak',
            width: 150,
            sortable: true
          },
          signin: {
            title: 'Signin',
            key: 'signin',
            width: 150,
            sortable: true
          },
          click: {
            title: 'Click',
            key: 'click',
            width: 150,
            sortable: true
          },
          active: {
            title: 'Active',
            key: 'active',
            width: 150,
            sortable: true
          },
          day7: {
            title: '7, retained',
            key: 'day7',
            width: 150,
            sortable: true
          },
          day30: {
            title: '30, retained',
            key: 'day30',
            width: 150,
            sortable: true
          },
          tomorrow: {
            title: 'The next day left',
            key: 'tomorrow',
            width: 150,
            sortable: true
          },
          day: {
            title: 'Day Active',
            key: 'day',
            width: 150,
            sortable: true
          },
          week: {
            title: 'Week Active',
            key: 'week',
            width: 150,
            sortable: true
          },
          month: {
            title: 'Month Active',
            key: 'month',
            width: 150,
            sortable: true
          }
        };

        let data = [table2ColumnList.name];

        this.tableColumnsChecked.forEach(col => data.push(table2ColumnList[col]));

        return data;
      },
      changeTableColumns() {
        this.tableColumns2 = this.getTable2Columns();
      },
      toggleFav(index) {
        this.tableData2[index].fav = this.tableData2[index].fav === 0 ? 1 : 0;
      }
    },
    mounted() {
      this.changeTableColumns();
    }
  }
</script>
```

以上虽然能起到预期的演示作用，但代码略显冗繁，定义重复。  
其实可好好利用 `vue` 的 `computed`，既减少重复的数据结构定义，又能自动实现数据的响应，且不必监听 `change` 事件。  
稍作优化如下：

```vue
<template>
  <Checkbox-group v-model="tableColumnsChecked">
    <Checkbox v-for="c in tableColumns2" :label="c.key" :key="c.key">{{ c.title }}</Checkbox> <!--此处由数据自动遍历即可，不必一个个写出来-->
  </Checkbox-group>
  <Table :data="tableData2" :columns="selTableColumns2" border></Table>
</template>
<script>
  export default {
    data() {
      return {
        tableData2: this.mockTableData2(),
        //分拆tableColumns2，提出“固定列”部分，方便控制
        fixColumn: {
          title: 'Name',
          key: 'name',
          fixed: 'left',
          width: 200,
          render: (h, params) => {
            const fav = this.tableData2[params.index].fav;
            const style = fav ? {
              cursor: 'pointer'
            } : {
              cursor: 'pointer',
              color: '#f50'
            };

            return h('div', [
              h('Icon', {
                style: style,
                props: {
                  type: fav ? 'ios-star-outline' : 'ios-star'
                },
                nativeOn: {
                  click: () => {
                    this.toggleFav(params.index);
                  }
                }
              }),
              h('span', ' ' + params.row.name)
            ]);
          }
        },
        //除固定列外，其他列的数据，默认全部选中
        tableColumns2: [
          {
            title: 'Show',
            key: 'show',
            width: 150,
            sortable: true
          },
          {
            title: 'Weak',
            key: 'weak',
            width: 150,
            sortable: true
          },
          {
            title: 'Signin',
            key: 'signin',
            width: 150,
            sortable: true
          },
          {
            title: 'Click',
            key: 'click',
            width: 150,
            sortable: true
          },
          {
            title: 'Active',
            key: 'active',
            width: 150,
            sortable: true
          },
          {
            title: '7, retained',
            key: 'day7',
            width: 150,
            sortable: true
          },
          {
            title: '30, retained',
            key: 'day30',
            width: 150,
            sortable: true
          },
          {
            title: 'The next day left',
            key: 'tomorrow',
            width: 150,
            sortable: true
          },
          {
            title: 'Day Active',
            key: 'day',
            width: 150,
            sortable: true
          },
          {
            title: 'Week Active',
            key: 'week',
            width: 150,
            sortable: true
          },
          {
            title: 'Month Active',
            key: 'month',
            width: 150,
            sortable: true
          }
        ],
        //选中的列的key
        tableColumnsChecked: []
      }
    },
    methods: {
      //模拟表体数据
      mockTableData2() {
        let data = [];

        function getNum() {
          return Math.floor(Math.random() * 10000 + 1);
        }
        for (let i = 0; i < 10; i++) {
          data.push({
            name: 'Name ' + (i + 1),
            fav: false,//改数值为布尔值，控制更方便
            show: getNum(),
            weak: getNum(),
            signin: getNum(),
            click: getNum(),
            active: getNum(),
            day7: getNum(),
            day30: getNum(),
            tomorrow: getNum(),
            day: getNum(),
            week: getNum(),
            month: getNum()
          })
        }
        return data;
      },
      toggleFav(index) {
        this.tableData2[index].fav = !this.tableData2[index].fav;
      }
    },
    mounted() {
      //默认选中所有列
      this.tableColumnsChecked = this.tableColumns2.map(item => item.title)
    },
    computed: {
      //根据tableColumnsChecked筛选‘已选中’的列
      selTableColumns2() {
        return this.tableColumns2
                    .filter(col => this.tableColumnsChecked.includes(col.key))
                    .unshift(this.fixColumn) //在前面加入固定列
      }
    },
  }
</script>
```
