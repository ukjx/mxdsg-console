<template>
  <Card class="w-auto border-none rounded-none">
    <CardHeader>
      <CardTitle>机器远控</CardTitle>
      <CardDescription>当前:黑棋夏天4, 频道:4, 运行时长：5小时20分</CardDescription>
    </CardHeader>
    <CardContent class="grid gap-5">

      <Tabs default-value="setting" class="w-auto">
        <TabsList class="grid w-full grid-cols-5">
          <TabsTrigger value="setting">配置</TabsTrigger>
          <TabsTrigger value="role">角色</TabsTrigger>
          <TabsTrigger value="script">脚本</TabsTrigger>
          <TabsTrigger value="monitor">监控</TabsTrigger>
          <TabsTrigger value="logger">日志</TabsTrigger>
        </TabsList>
        <TabsContent value="setting">
          <Setting :configs="configs" :scripts="scripts" @setConfig="setConfig"></Setting>
        </TabsContent>
        <TabsContent value="Role">
          <Role></Role>
        </TabsContent>
        <TabsContent value="script">
          <Script :scripts="scripts"></Script>
        </TabsContent>
        <TabsContent value="monitor">
          <Monitor></Monitor>
        </TabsContent>
        <TabsContent value="logger">
          <Logger></Logger>
        </TabsContent>
      </Tabs>

    </CardContent>
    <CardFooter v-show="false">
      <Button class="w-full">
        <Check class="mr-2 h-4 w-4"/>
        重启机器
      </Button>
    </CardFooter>
  </Card>
</template>

<script setup lang="ts">
import Setting from '@/components/setting.vue'
import Script from '@/components/script.vue'
import Monitor from '@/components/monitor.vue'
import Logger from '@/components/logger.vue'
import Role from '@/components/role.vue'
import {Button} from '@/components/ui/button'
import {Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle,} from '@/components/ui/card'
import {Check} from 'lucide-vue-next'
import {Tabs, TabsContent, TabsList, TabsTrigger} from '@/components/ui/tabs'
import {onMounted, reactive, ref} from "vue"
import {Configs} from '@/types/configs'
import {v4 as uuidv4} from 'uuid'
import {useRoute} from "vue-router";

let ws: WebSocket
let webSocketUrl: string = ''
let from: string = uuidv4()
let to: string = ''

const initSocket = function () {
  ws = new WebSocket(webSocketUrl + from)
  ws.onopen = function () {
    console.log('WebSocket已连接')
    ws.send(JSON.stringify({from: from, to: to, action: 'getConfigs'}))
  }
  ws.onmessage = function (event) {
    // console.log('收到消息：' + event.data)
    const msg = JSON.parse(event.data)
    console.log(msg)
    switch (msg.action) {
      case 'loadConfigs':
        const item = msg.data;
        configs.checkHpMp = Boolean(item.checkHpMp)
        configs.mushroomHandle = item.mushroomHandle
        configs.offlineHandle = item.offlineHandle
        configs.smallBlackHandle = item.smallBlackHandle
        configs.runeHandle = item.runeHandle
        configs.deathHandle = item.deathHandle
        configs.changeLineInterval = parseInt(item.changeLineInterval)
        configs.someoneSecond = parseInt(item.someoneSecond)
        configs.taskName = item.taskName
        break
      case 'loadScripts':
        scripts.value = msg.data;
        break
    }
  }
  ws.onclose = function () {
    console.log('WebSocket已关闭')
  }
}

let configs: Configs = reactive({
  checkHpMp: false,
  mushroomHandle: '',
  offlineHandle: '',
  smallBlackHandle: '',
  runeHandle: '',
  deathHandle: '',
  changeLineInterval: 0,
  someoneSecond: 0,
  taskName: '',
  scriptName: '',
  roleName: ''
})

let scripts = ref<string[]>([]);

const setConfig = function (key: string, value: string) {
  ws.send(JSON.stringify({from: from, to: to, action: 'setConfig', data: {key: key, value: value}}))
}

onMounted(() => {
  const route = useRoute()
  if (!route.query.param) return
  let base64EncodedString = route.query.param.toString()
  const decodedString = atob(base64EncodedString)
  const param = JSON.parse(decodedString)

  webSocketUrl = param['webSocketUrl']
  to = param['uniqueId']
  initSocket()
  scripts.value = ['黑骑夏天3.txt', '幻影蘑菇3.txt']
})
</script>

<style>
</style>
