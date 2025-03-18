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
          <Setting :configs="configs" @setConfig="setConfig"></Setting>
        </TabsContent>
        <TabsContent value="role">
          <Role :roles="roles" :roleConfig="roleConfig" :currentRole="configs.roleName"
                :currentStatus="status"
                :configs="configs" @sendMessage="sendMessage" @toast="showToast"
          ></Role>
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
          <Logger :logs="logs" @clearLogs="firstLog=true" @sendMessage="sendMessage"></Logger>
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
import {Logs} from "@/types/logs.js";
import {RoleConfig} from "@/types/roleConfig.ts";
import {v4 as uuid} from 'uuid'
import {useRoute} from "vue-router";
import {Toaster} from '@/components/ui/toast'
import {useToast} from '@/components/ui/toast/use-toast'
import {getTimeDifference} from "@/lib/times.ts";
import {
  AlertDialog,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogTitle
} from "@/components/ui/alert-dialog";
import {Label} from "@/components/ui/label";
import {taskNameData} from '@/lib/dataDictionary.ts';

const {toast} = useToast()

let ws: WebSocket
let webSocketUrl: string = ''
let machineId: string = ''
let uniqueId: string = ''

const initSocket = function () {
  uniqueId = uuid()
  showMask.value = true
  ws = new WebSocket(`${webSocketUrl}?type=client&machineId=${machineId}&uniqueId=${uniqueId}`);
  ws.onopen = function () {
    console.log('WebSocket已连接')
    showMask.value = false;
    sendMessage('config', 'getConfigs')
    sendMessage('script', 'getScripts')
    sendMessage('program', 'getStatus')
    sendMessage('role', 'getRoles')
    sendMessage('role', 'getRoleConfig')
    // setConfig('ignoreSmallBlack', 'false')
  }
  ws.onmessage = function (event) {
    // console.log('收到消息：' + event.data)
    const msg = JSON.parse(event.data)
    // console.log(msg)
    switch (msg.action) {
      case 'loadConfigs':
        let item = msg.data;
        item.weChatNotice = item.weChatNotice.toLowerCase() === 'true'
        item.checkHp = item.checkHp.toLowerCase() === 'true'
        item.checkMp = item.checkMp.toLowerCase() === 'true'
        item.changeLineInterval = parseInt(item.changeLineInterval)
        item.someoneSecond = parseInt(item.someoneSecond)
        Object.assign(configs, item);
        break
      case 'loadScripts':
        scripts.value = msg.data;
        break
      case 'loadRoles':
        roles.value = msg.data.map((x: string) => x.replace(/\.txt$/, ''))
        break
      case 'loadRoleConfig':
          msg.data.forwardCount = parseInt(msg.data.forwardCount)
          Object.assign(roleConfig, msg.data);
        break;
      case 'loadStatus':
        status.isRunning = Boolean(msg.data.isRunning)
        status.isRecord = Boolean(msg.data.isRecord)
        status.runTime = msg.data.runTime
        status.lineNumber = msg.data.lineNumber
        // intervalRunTime()
        break;
      case 'loadLogs':
        if (firstLog.value) {
          firstLog.value = false
          logs.value = msg.data
        } else {
          logs.value = logs.value.concat(msg.data)
        }
        break;
      case 'toast':
        toast({ title: '提示', description: msg.data, duration: 1000 })
        break;
    case 'debug':
      console.log(msg.data)
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
  weChatNotice: false,
  checkHp: false,
  checkMp: false,
  smallBlackHandle: '',
  mushroomHandle: '',
  newTesterHandle: '',
  offlineHandle: '',
  runeHandle: '',
  deathHandle: '',
  changeLineInterval: 0,
  someoneSecond: 0,
  taskName: '',
  scriptName: '',
  roleName: ''
})

let scripts = ref<string[]>([]);
let roles = ref<string[]>([]);
let roleConfig: RoleConfig = reactive({
  hpKey: '',
  mpKey: '',
  fixedPoint: '',
  offset: '',
  attack: '',
  jump: '',
  upJumpMode: '',
  upJump: '',
  teleport: '',
  forwardMode: '',
  forwardCount: 1,
  changeLine: '',
  jumpDelay: '',
  npc: '',
  boss: '',
  guide: '',
  guideStep: '',
  amulet: '',
  dailyTask: '',
  buffs: [],
  attacks: []
});

let status: Status = reactive({
  isRunning: false,
  isRecord: false,
  runTime: null,
  lineNumber: null
});
let logs = ref<Logs[]>([]);
const updateCurrentScript = (value: string) => {
  configs.scriptName = value
  setConfig('scriptName', value)
}

const setConfig = function (key: string, value: string) {
  console.log('setConfig:', key, value)
  sendMessage('config', 'setConfig', `${key}=${value}`)
}
const sendMessage = function (service: string, action: string, data?: any) {
  ws.send(JSON.stringify({service: service, action: action, from: uniqueId, data: data}))
}
const showToast = (msg: string) => {
  toast({
    title: '提示',
    description: msg,
    duration: 1000
  })
}

const currentName = computed(() => {
  if (configs.taskName === 'execute')
    return configs.scriptName.replace(/\.txt$/, '')
  else
    return taskNameData.get(configs.taskName)
})
const runStatus = computed(() => {
  return status.isRunning?'运行中':'未运行'
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
let firstLog = ref(true)

onMounted(() => {
  const route = useRoute()
  if (route.query.param) {
    let base64EncodedString = route.query.param.toString()
    const decodedString = atob(base64EncodedString)
    const param = JSON.parse(decodedString)
    webSocketUrl = param['webSocketUrl']
    machineId = param['machineId']
  } else {
    webSocketUrl = `ws://${window.location.hostname}:12581/`
    machineId = '179B7EB6-FE0F-4646-A907-D1B80B7C088B'
  }
  maskText.value = '连接中...'
  initSocket()
  intervalRunTime()
  // http://localhost:5173/#/?param=ewogICAgIndlYlNvY2tldFVybCI6ICJ3czovLzE5Mi4xNjguNDQuNToxMjU4MS8iLAogICAgIm1hY2hpbmVJZCI6ICIxNzlCN0VCNi1GRTBGLTQ2NDYtQTkwNy1EMUI4MEI3QzA4OEIiCn0=
  // http://192.168.44.4:12580/#/?param=ewogICAgIndlYlNvY2tldFVybCI6ICJ3czovLzE5Mi4xNjguNDQuNToxMjU4MS8iLAogICAgIm1hY2hpbmVJZCI6ICIxNzlCN0VCNi1GRTBGLTQ2NDYtQTkwNy1EMUI4MEI3QzA4OEIiCn0=
})
</script>

<style>
</style>
