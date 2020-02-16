<template>
    <div style="margin: auto">
        <Row>
            <Col span="16" offset="4">
                <Input search enter-button placeholder="Enter something..." v-model="search_key" @on-search="updateItems" />
            </Col>
        </Row>
        <Row style="margin-top: 30px;">
            <Col span="20" offset="2">
                <Table stripe :columns="search_columns" :data="search_data"
                       :loading="search_load"
                       no-data-text="搜索失败，请更换关键词"/>
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
        search_key : '',
        search_data: [],
        search_load: false,
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
              return h('p', {}, this.humanFileSize(params.row.size));
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
      humanFileSize(size) {
        let i = size === 0 ? 0 : Math.floor(Math.log(size) / Math.log(1024));
        return (size / Math.pow(1024, i)).toFixed(2) * 1 + ' ' + ['B', 'kB', 'MB', 'GB', 'TB'][i];
      },

      updateItems() {
        this.search_data = [];
        this.search_load = true;
        this.$Loading.start();
        axios.get(`http://share-api.rhilip.info/search${this.search_key ? '/' + this.search_key : ''}`).then((response) => {
          this.search_load = false;
          this.$Loading.finish();
          this.search_data = response.data.data;
        }).catch((error) => {
          this.search_load = false;
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