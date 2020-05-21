<template>
    <div style="margin: auto">
        <Row>
            <Col span="16" offset="4">
                <Input search enter-button placeholder="Enter something..." v-model="search_key" autofocus
                       @on-search="updateItems" @on-change="cleanSearchData" />
            </Col>
        </Row>
        <Row style="margin-top: 30px;">
            <Col span="20" offset="2">
                <Table stripe :columns="search_columns" :data="search_data"
                       :loading="search_data.length === 0 && search_load"
                       no-data-text="暂无数据，请点击搜索按钮或更换关键词"/>
                <Button type="primary" style="margin-top: 10px" v-if="!disable_load" :loading="search_load" @click="updateItems">下一页</Button>
            </Col>
        </Row>
    </div>
</template>

<script>
  const axios = require('axios').default;

  export default {
    name: "Search",
    data() {
      return {
        offset: 0,
        limit: 50,
        search_key : '',
        search_data: [],
        search_load: false,
        disable_load: false,
        search_columns: [
          {
            title: "标题", key: "title", ellipsis: true,
            render: (h, params) => {
              return h('router-link', {
                attrs: {
                  to: {
                    name: 'item_details',
                    params: {
                      'uuid': params.row.id
                    }
                  }
                }
              }, params.row.title);
            },
          },
          {
            title: "大小", key: "size", width: 120, align: "right",
            render: (h, params) => {
              return h('p', {}, this.$options.filters.humanFileSize(params.row.size));
            },
            className: "text-right"
          },
          {
            title: "添加时间", key: "add_at", width: 190, align: "center",
            render: (h, params) => {
              return h('p', {}, new Date(params.row.add_at * 1e3).toLocaleString());
            }
          }
        ]
      }
    },
    methods: {
      cleanSearchData() {
        this.search_data = [];
        this.limit = 50;
        this.offset = 0;
        this.disable_load = false;
      },

      updateItems() {
        this.search_load = true;
        this.$Loading.start();
        axios.get(`//share-api.rhilip.info/search${this.search_key ? '/' + this.search_key : ''}`,{
          params: {
            limit: this.limit,
            offset: this.offset,
          }
        }).then((response) => {
          this.search_load = false;
          this.$Loading.finish();
          this.search_data = this.search_data.concat(response.data.data);
          this.offset += 50;
        }).catch((error) => {
          this.search_load = false;
          this.disable_load = true;
          this.$Loading.error();
          console.log(error.message);
        })
      }
    },
    mounted() {
      this.updateItems();
    }
  }
</script>

<style scoped>

</style>