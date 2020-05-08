<template>
    <div style="margin: auto">
        <div v-if="status">
            <p>
                {{ status.length }} 个存储对象，
                总计空间 <code>{{ getFullSize() | humanFileSize }}</code>
                ( 空闲 <code>{{ getFreeSize() | humanFileSize }}</code> ,
                已使用 <code>{{ getUsedSize() | humanFileSize }}</code> ,
                历史冗余 <code>{{ getRedundancySize() | humanFileSize }}</code> ,
                回收站 <code>{{ getTrashedSize() | humanFileSize }}</code>
                )
            </p>

            <Row type="flex" :gutter="16" style="margin-top: 10px">
                <Col v-for="(pan,index) in status" :key="index" span="6" style="margin-top: 15px;">
                    <p><b>{{ pan.id }}</b></p>
                    <Progress :percent="parseFloat((pan.status.used / pan.status.total * 100).toFixed(2))"
                              :stroke-width="20" :status="pan.enabled ? 'active' : 'normal'" text-inside/>

                </Col>
            </Row>
        </div>
    </div>
</template>

<script>
  const axios = require('axios').default;

  export default {
    name: "Status",
    data() {
      return {
        status: null
      }
    },
    methods: {
      getFreeSize() {
        return this.status.map((a) => {return a.status.free}).reduce((a,b) => {return a + b});
      },

      getRedundancySize() {
        return this.getFullSize() - this.getUsedSize() - this.getFreeSize() - this.getTrashedSize();
      },

      getUsedSize() {
        return this.status.map((a) => {return a.status.used}).reduce((a,b) => {return a + b});
      },

      getTrashedSize() {
        return this.status.map((a) => {return a.status.trashed}).reduce((a,b) => {return a + b});
      },

      getFullSize() {
        return this.status.map((a) => {return a.status.total}).reduce((a,b) => {return a + b});
      },

      getStatus() {
        this.$Loading.start();
        axios.get("//share-api.rhilip.info/status").then((response) => {
          this.$Loading.finish();
          if (response.status === 200) {
            let data = response.data;
            data.data.sort((a, b) => {
              return b.status.used - a.status.used
            });
            this.status = data.data;
          } else {
            this.$Loading.error();
          }
        })
      }
    },
    mounted() {
      if (!this.status) {
        this.getStatus();
      }
    }
  }
</script>

<style scoped>

</style>