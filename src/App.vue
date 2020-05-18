<template>
    <div id="app" class="layout">
        <img alt="Logo" src="./assets/logo.jpg" style="width: 200px;">
        <br>
        <h1> R酱的资源收纳库 </h1>
        <span>此处资源均为软件全自动搬运至OneDrive国际版分享，没有条理且未经任何整理辨别！！！！</span>
        <span>请善用搜索功能进行检索~</span>

        <Row type="flex">
            <Col span="20" offset="2">
                <Divider/>
                <transition>
                    <router-view/>
                </transition>
                <Divider/>
            </Col>
        </Row>

        <Breadcrumb>
            <BreadcrumbItem to="/">Home</BreadcrumbItem>
            <BreadcrumbItem to="/status">Status</BreadcrumbItem>
        </Breadcrumb>
    </div>
</template>

<script>
  export default {
    name: 'App',
  }
</script>

<style>
    #app {
        font-family: Avenir, Helvetica, Arial, sans-serif;
        -webkit-font-smoothing: antialiased;
        -moz-osx-font-smoothing: grayscale;
        text-align: center;
        color: #2c3e50;
        margin-top: 30px;
        margin-bottom: 30px;
    }
</style>
