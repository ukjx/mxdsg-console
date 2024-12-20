<template>
  <Card class="w-auto border-none rounded-none">
    <CardHeader>
      <CardTitle>机器远控</CardTitle>
      <CardDescription>当前:黑棋夏天4, 频道:4, 运行时长：5小时20分</CardDescription>
    </CardHeader>
    <CardContent class="grid gap-4">

      <Tabs default-value="setting" class="w-auto">
        <TabsList class="grid w-full grid-cols-4">
          <TabsTrigger value="setting">配置</TabsTrigger>
          <TabsTrigger value="script">脚本</TabsTrigger>
          <TabsTrigger value="monitor">监控</TabsTrigger>
          <TabsTrigger value="logger">日志</TabsTrigger>
        </TabsList>
        <TabsContent value="setting">
          <Setting :configs="configs" @setConfigs="setConfigs"></Setting>
        </TabsContent>
        <TabsContent value="script">
          <Script></Script>
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
import {Button} from '@/components/ui/button'
import {Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle,} from '@/components/ui/card'
import {Check} from 'lucide-vue-next'
import {Tabs, TabsContent, TabsList, TabsTrigger} from '@/components/ui/tabs'
import {onMounted, reactive} from "vue"
import {Configs} from '@/types/configs'

let ws: WebSocket

const initSocket = function () {
  ws = new WebSocket('ws://192.168.44.4:12581')
  ws.onopen = function () {
    console.log('WebSocket已连接')
    ws.send(JSON.stringify({action: 'getConfigs'}))
  }
  ws.onmessage = function (event) {
    // console.log('收到消息：' + event.data)
    const msg = JSON.parse(event.data)
    console.log(msg.data)
    switch (msg.action) {
      case 'setConfigs':
        configs = msg.data
        break
    }
  }
  ws.onclose = function () {
    console.log('WebSocket已关闭')
  }
}

let configs: Configs = reactive({
  checkHpMp: false,
  weChatNotice: false,
  ignoreSmallBlack: false,
  smallBlackHandle: 'ignore',
  changeLineInterval: 60,
  someoneSecond: 30,
  runeHandle: 'unlock'
})

const setConfigs = function (configs: Configs) {
  ws.send(JSON.stringify({action: 'setConfigs', data: configs}))
}

onMounted(() => {
  initSocket()
})
</script>

<style>
</style>
