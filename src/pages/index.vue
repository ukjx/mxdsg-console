<template>
  <Card class="w-auto border-none rounded-none">
    <CardHeader>
      <CardTitle>机器远控</CardTitle>
      <CardDescription class="grid grid-cols-2">
        <span>当前: {{currentName}}</span>
        <span>状态: {{runStatus}}</span>
        <span>运行: {{runTime}}</span>
        <span v-if="status.lineNumber">频道: {{status.lineNumber}}线</span>
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
          <Scripting :scripts="scripts" :currentScript="configs.scriptName" :currentStatus="status"
                     :configs="configs" @sendMessage="sendMessage"
                  @update:currentScript="updateCurrentScript" @toast="showToast"></Scripting>
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

  <AlertDialog v-model:open="showMask">
    <AlertDialogContent class="w-[140px] p-2 text-center rounded-xl">
      <AlertDialogTitle>
        <AlertDialogDescription>
          <Label>{{maskText}}</Label>
        </AlertDialogDescription>
      </AlertDialogTitle>
    </AlertDialogContent>
  </AlertDialog>

  <Toaster/>
</template>

<script setup lang="ts">
import Setting from '@/components/setting.vue'
import Scripting from '@/components/scripting.vue'
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
import {v4 as uuid} from 'uuid'
import {useRoute} from "vue-router";
import {Toaster} from '@/components/ui/toast'
import {useToast} from '@/components/ui/toast/use-toast'
import {getTimeDifference} from "@/lib/utils.js";
import {
  AlertDialog,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogTitle
} from "@/components/ui/alert-dialog";
import {Label} from "@/components/ui/label";

const {toast} = useToast()

let ws: WebSocket
let webSocketUrl: string = ''
let machineId: string = ''

const initSocket = function () {
  let uniqueId: string = uuid()
  showMask.value = true
  ws = new WebSocket(`${webSocketUrl}?type=client&machineId=${machineId}&uniqueId=${uniqueId}`);
  ws.onopen = function () {
    console.log('WebSocket已连接')
    showMask.value = false;
    sendMessage('getConfigs')
    sendMessage('getScripts')
    sendMessage('getStatus')
  }
  ws.onmessage = function (event) {
    // console.log('收到消息：' + event.data)
    const msg = JSON.parse(event.data)
    // console.log(msg)
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
        status.lineNumber = msg.data.lineNumber
        // intervalRunTime()
        break;
      case 'toast':
        toast({ title: '提示', description: msg.data, duration: 1000 })
        break;
    }
  }
  ws.onerror = function (event) {
    console.log('WebSocket报错')
    console.log(event)
  }
  ws.onclose = function () {
    console.log('WebSocket已关闭')
    maskText.value = '重新连接...'
    initSocket()
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
  runTime: null,
  lineNumber: null
});
const updateCurrentScript = (value: string) => {
  configs.scriptName = value
  setConfig('scriptName', value)
}

const setConfig = function (key: string, value: string) {
  console.log('setConfig:', key, value)
  sendMessage('setConfig', `${key}=${value}`)
}
const sendMessage = function (action: string, data?: any) {
  ws.send(JSON.stringify({action: action, data: data}))
}
const showToast = (msg: string) => {
  toast({
    title: '提示',
    description: msg,
    duration: 1000
  })
}

const currentName = computed(() => {
  if (configs.taskName === 'execute' || configs.taskName === 'Execute')
    return configs.scriptName.replace(/\.txt$/, '')
  else if (configs.taskName === 'darkKnight' || configs.taskName === 'DarkKnight')
    return '黑骑士'
  else if (configs.taskName === 'phantom' || configs.taskName === 'Phantom')
    return '幻影'
  else
    return configs.taskName
})
const runStatus = computed(() => {
  return status.isRun?'运行中':'未运行'
})

let runTime = ref('')
const intervalRunTime = () => {
  setInterval(() => {
    if (status.runTime) {
      runTime.value = getTimeDifference(status.runTime);
    }
  }, 1000)
}
let showMask = ref(false)
let maskText = ref('')

onMounted(() => {
  const route = useRoute()
  if (!route.query.param) return
  let base64EncodedString = route.query.param.toString()
  const decodedString = atob(base64EncodedString)
  const param = JSON.parse(decodedString)

  webSocketUrl = param['webSocketUrl']
  machineId = param['machineId']
  maskText.value = '连接中...'
  initSocket()
  intervalRunTime()
})
</script>

<style>
</style>
