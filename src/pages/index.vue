<template>
  <Card class="w-auto border-none rounded-none">
    <CardHeader>
      <CardTitle>机器远控</CardTitle>
      <CardDescription class="grid grid-cols-2">
        <span>当前: {{currentName}}</span>
        <span>状态: {{runStatus}}</span>
        <span>运行: {{runTime}}</span>
        <span>频道: 4</span>
      </CardDescription>
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
          <ScriptComponent :scripts="scripts" :currentScript="configs.scriptName" :currentStatus="status" @sendMessage="sendMessage"
                  @update:currentScript="configs.scriptName=$event" @toast="showToast"></ScriptComponent>
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

  <Toaster/>
</template>

<script setup lang="ts">
import Setting from '@/components/setting.vue'
import ScriptComponent from '@/components/script.vue'
import Monitor from '@/components/monitor.vue'
import Logger from '@/components/logger.vue'
import Role from '@/components/role.vue'
import {Button} from '@/components/ui/button'
import {Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle,} from '@/components/ui/card'
import {Check} from 'lucide-vue-next'
import {Tabs, TabsContent, TabsList, TabsTrigger} from '@/components/ui/tabs'
import {computed, onMounted, reactive, ref} from "vue"
import {Configs} from '@/types/configs'
import {Status} from "@/types/status.js";
import {v4 as uuidv4} from 'uuid'
import {useRoute} from "vue-router";
import {Toaster} from '@/components/ui/toast'
import {useToast} from '@/components/ui/toast/use-toast'
import {getTimeDifference} from "@/lib/utils.js";

const {toast} = useToast()

let ws: WebSocket
let webSocketUrl: string = ''
let from: string = uuidv4()
let to: string = ''

const initSocket = function () {
  ws = new WebSocket(webSocketUrl + from)
  ws.onopen = function () {
    console.log('WebSocket已连接')
    ws.send(JSON.stringify({from: from, to: to, action: 'getConfigs'}))
    ws.send(JSON.stringify({from: from, to: to, action: 'getScripts'}))
    ws.send(JSON.stringify({from: from, to: to, action: 'getStatus'}))
  }
  ws.onmessage = function (event) {
    // console.log('收到消息：' + event.data)
    const msg = JSON.parse(event.data)
    console.log(msg)
    switch (msg.action) {
      case 'loadConfigs':
        let item = msg.data;
        configs.checkHpMp = Boolean(item.checkHpMp)
        configs.mushroomHandle = item.mushroomHandle
        configs.offlineHandle = item.offlineHandle
        configs.smallBlackHandle = item.smallBlackHandle
        configs.runeHandle = item.runeHandle
        configs.deathHandle = item.deathHandle
        configs.changeLineInterval = parseInt(item.changeLineInterval)
        configs.someoneSecond = parseInt(item.someoneSecond)
        configs.taskName = item.taskName
        configs.scriptName = item.scriptName
        configs.roleName = item.roleName
        break
      case 'loadScripts':
        scripts.value = msg.data;
        break
      case 'loadStatus':
        status.isRun = Boolean(msg.data.isRun)
        status.isRecord = Boolean(msg.data.isRecord)
        status.runTime = msg.data.runTime
        intervalRunTime();
        break;
      case 'toast':
        toast({ title: '提示', description: msg.data, duration: 1000 })
        break;
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
let status: Status = reactive({
  isRun: false,
  isRecord: false,
  runTime: null
});

const setConfig = function (key: string, value: string) {
  console.log('setConfig:', key, value)
  // sendMessage('setConfig', `${key}=${value}`)
}
const sendMessage = function (action: string, data: any) {
  ws.send(JSON.stringify({from: from, to: to, action: action, data: data}))
}
const showToast = (msg: string) => {
  toast({
    title: '提示',
    description: msg,
    duration: 1000
  })
}

const currentName = computed(() => {
  if (configs.taskName === 'Execute' || configs.taskName === 'execute')
    return configs.scriptName.replace(/\.txt$/, '')
  else
    return configs.taskName
})
const runStatus = computed(() => {
  return status.isRun?'运行中':'未运行'
})

let runTime = ref('');
const intervalRunTime = () => {
  if (!runTime.value && status.runTime) {
      let time = getTimeDifference(new Date(status.runTime), new Date())
      runTime.value = time;
  }
  setInterval(() => {
    if (status.runTime) {
      let time = getTimeDifference(new Date(status.runTime), new Date())
      runTime.value = time;
    }
  }, 1000)
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
})
</script>

<style>
</style>
