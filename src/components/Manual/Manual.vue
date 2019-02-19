<template>
  <div id="pageCard">
    <v-container
        grid-list-xl
        fluid>
      <v-layout
          row
          wrap>
        <v-flex sm12>
          <h3>常用功能</h3>
        </v-flex>
        <v-flex
            lg4
            sm12>
          <v-card
              color="purple"
              dark>
            <v-card-title class="pb-0">
              <h2>开始人员管理</h2>
            </v-card-title>
            <v-card-text>
              {{cardText}}
            </v-card-text>
            <v-card-actions>
              <v-btn
                  @click="$router.push('/users/user-table')"
                  flat
                  small>试一下</v-btn>
            </v-card-actions>
          </v-card>
        </v-flex>
        <v-flex
            lg4
            sm12>
          <v-card
              color="indigo"
              dark>
            <v-card-title class="pb-0">
              <h2>开始文件管理</h2>
            </v-card-title>
            <v-card-text>
              {{cardText}}
            </v-card-text>
            <v-card-actions>
              <v-btn
                  @click="$router.push('/document-table')"
                  flat
                  small>试一下</v-btn>
            </v-card-actions>
          </v-card>
        </v-flex>
        <v-flex
            lg4
            sm12>
          <v-card
              color="teal"
              dark>
            <v-card-title class="pb-0">
              <h2>开始机构管理</h2>
            </v-card-title>
            <v-card-text>
              {{cardText}}
            </v-card-text>
            <v-card-actions>
              <v-btn
                  @click="$router.push('/entity-table')"
                  flat
                  small>试一下</v-btn>
            </v-card-actions>
          </v-card>
        </v-flex>
      </v-layout>
      <v-layout
          row
          wrap>
        <v-flex sm12>
          <h3>查看操作实例，优化工作流程</h3>
        </v-flex>
        <v-flex
            lg4
            sm12>
          <v-card>
            <v-card-media
                :src="computeBg1"
                height="250">
              <h2 class="white--text pa-3">
                制作标准规范的人员编制表格
              </h2>
            </v-card-media>
            <v-card-text>
              <div>
                {{cardText}}
              </div>
            </v-card-text>
            <v-divider></v-divider>
            <v-card-actions>
              <v-btn
                  @click="$router.push('/users/user-table')"
                  flat
                  small>深入了解</v-btn>
            </v-card-actions>
          </v-card>
        </v-flex>
        <v-flex
            lg4
            sm12>
          <v-card>
            <v-card-media
                :src="computeBg10"
                height="250">
              <h2 class="white--text pa-3">
                记录每一份文档,并用Word模板输出打印
              </h2>
            </v-card-media>
            <v-card-text>
              <v-avatar
                  size="64px"
                  class="right mt-56">
                <img
                    :src="computeAvatarMan4"
                    alt="">
              </v-avatar>
              <div>
                {{cardText}}
              </div>
            </v-card-text>
            <v-divider></v-divider>
            <v-card-actions>
              <v-btn
                  @click="$router.push('/document-table')"
                  flat
                  small>深入了解</v-btn>
            </v-card-actions>
          </v-card>
        </v-flex>
        <v-flex
            lg4
            sm12>
          <v-card>
            <v-img
                :src="computeBg4"
                height="250">
              <h2 class="white--text pa-3">
                党员信息采集,组织关系转接,从未如此方便
              </h2>
            </v-img>
            <v-card-text>
              <v-btn
                  icon
                  fab
                  color="red"
                  dark
                  class="right mt-45">
                <v-icon>favorite</v-icon>
              </v-btn>
              <div>
                {{cardText}}
              </div>
            </v-card-text>
            <v-divider></v-divider>
            <v-card-actions>
              <v-btn
                  @click="$router.push('/users/militant')"
                  flat
                  small>深入了解</v-btn>
            </v-card-actions>
          </v-card>
        </v-flex>
      </v-layout>
      <v-layout
          row
          wrap>
        <v-flex sm12>
          <h3>已有自己的历史数据,导入导出让你事半功倍</h3>
        </v-flex>
        <v-flex
            lg4
            sm12>
          <v-carousel
              hide-controls
              hide-delimiters
              class="fill-height">
            <v-carousel-item>
              <v-card
                  color="indigo"
                  dark>
                <v-card-title class="pb-0">
                  <h3>导入数据</h3>
                </v-card-title>
                <v-card-text>
                  {{cardText}}
                </v-card-text>
                <v-card-actions>
                  <v-btn
                      @click="$router.push('/database-manager')"
                      flat
                      small>深入了解</v-btn>
                </v-card-actions>
              </v-card>
            </v-carousel-item>
            <v-carousel-item>
              <v-card
                  color="teal"
                  dark>
                <v-card-title class="pb-0">
                  <h3>导出数据</h3>
                </v-card-title>
                <v-card-text>
                  {{cardText}}
                </v-card-text>
                <v-card-actions>
                  <v-btn
                      @click="$router.push('/database-manager')"
                      flat
                      small>开始导出</v-btn>
                </v-card-actions>
              </v-card>
            </v-carousel-item>
            <v-carousel-item>
              <v-card
                  color="purple"
                  dark>
                <v-card-title class="pb-0">
                  <h3>导出到文档的template目录</h3>
                </v-card-title>
                <v-card-text>
                  {{cardText}}
                </v-card-text>
                <v-card-actions>
                  <v-btn
                      @click="$router.push('/database-manager')"
                      flat
                      small>深入了解</v-btn>
                </v-card-actions>
              </v-card>
            </v-carousel-item>
          </v-carousel>
        </v-flex>
      </v-layout>
    </v-container>
  </div>
</template>

<script>
import { join } from 'path'

export default {
  data() {
    return {
      show: true,
      cardText: '请查看手册, 了解具体使用方法'
    }
  },
  computed: {
    computeBg1: () => join(process.env.BASE_URL, 'bg/1.jpg'),
    computeBg2: () => join(process.env.BASE_URL, 'bg/2.jpg'),
    computeBg3: () => join(process.env.BASE_URL, 'bg/3.jpg'),
    computeBg4: () => join(process.env.BASE_URL, 'bg/4.jpg'),
    computeBg5: () => join(process.env.BASE_URL, 'bg/5.jpg'),
    computeBg6: () => join(process.env.BASE_URL, 'bg/6.jpg'),
    computeBg10: () => join(process.env.BASE_URL, 'bg/10.jpg'),
    computeAvatarMan4: () => join(process.env.BASE_URL, 'avatar/man_4.jpg')
  }
}
</script>
<style lang="stylus" scoped>
  .mt-45
    margin-top: -45px
  .mt-56
    margin-top: -56px
</style>
