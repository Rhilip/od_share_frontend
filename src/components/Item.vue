<template>
    <div style="margin: auto">
        <Card>
            <div style="text-align:center">
                <div v-if="loading">
                    <Spin fix>加载中...</Spin>
                </div>
                <div v-else-if="item">
                    <h3>{{item.title}}</h3>
                    <div>
                        档案大小： <span>{{humanFileSize(item.size)}}</span>
                    </div>
                    <div>
                        档案链接： <a target="_blank" @click="openRawLink()">点击打开</a>
                    </div>
                </div>
                <div v-else>
                    未获取到档案信息，请重新检查
                </div>
            </div>
        </Card>
    </div>
</template>

<script>
  const axios = require('axios').default;

  export default {
    name: "Item",
    data() {
      return {
        item: null,
        loading: true,
      }
    },
    created () {
      // 组件创建完后获取数据，
      // 此时 data 已经被 observed 了
      this.getItemDetails()
    },
    watch: {
      // 如果路由有变化，会再次执行该方法
      '$route': 'getItemDetails'
    },
    methods: {
      humanFileSize(size) {
        let i = size === 0 ? 0 : Math.floor(Math.log(size) / Math.log(1024));
        return (size / Math.pow(1024, i)).toFixed(2) * 1 + ' ' + ['B', 'kB', 'MB', 'GB', 'TB'][i];
      },

      openRawLink() {
        window.open(this.item.raw_link,'_blank');
      },

      getItemDetails() {
        axios.get(`//share-api.rhilip.info/items/${this.$route.params.uuid}`).then((response) => {
          this.loading = false;
          this.item = response.data.data;
        });
      }
    }
  }
</script>

<style scoped>

</style>