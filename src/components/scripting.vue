<template>
  <div class="flex items-center space-x-4 rounded-md border p-2 mb-1">
    <Lightbulb/>
    <div class="flex-1 space-y-1">
      <p class="text-sm font-medium leading-none">
        执行任务
      </p>
    </div>
    <TooltipProvider>
      <Tooltip :open="taskTooltip">
        <TooltipTrigger class="w-1/2">
          <button v-if="disabled" @mousedown="triggerTaskTooltip" class="flex h-[2.2rem] w-full items-center justify-between rounded-md border border-input bg-background px-3 text-sm ring-offset-background cursor-not-allowed opacity-50 text-start flex-1">
            {{taskNameData.get(configs.taskName)}}
            <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="lucide lucide-chevron-down-icon w-4 h-4 opacity-50 shrink-0" aria-hidden="true"><path d="m6 9 6 6 6-6"></path></svg>
          </button>
          <div v-else class="w-full">
            <Select :modelValue="configs.taskName" @update:modelValue="taskChange" :disabled="disabled">
              <SelectTrigger class="flex-1">
                <SelectValue placeholder="未选择"/>
              </SelectTrigger>
              <SelectContent>
                <SelectGroup>
                  <SelectItem v-for="item in taskNameData.keys()" :value="item">
                    {{ taskNameData.get(item) }}
                  </SelectItem>
                </SelectGroup>
              </SelectContent>
            </Select>
          </div>
        </TooltipTrigger>
        <TooltipContent>
          <p>停止任务后才能修改</p>
        </TooltipContent>
      </Tooltip>
    </TooltipProvider>
  </div>

  <div v-if="configs.taskName == 'execute'" class="flex items-center space-x-4 rounded-md border p-4 mb-1">
    <ScrollText/>
    <div class="flex-1 space-y-1">
      <p class="text-sm font-medium leading-none">
        选择脚本
      </p>
    </div>

    <Popover v-model:open="open">
      <PopoverTrigger as-child>
        <Button variant="outline" role="combobox" :aria-expanded="open" class="w-1/2 justify-between">
          {{ currentScript ? scriptsObject.find((item) => item.value === currentScript)?.label : "未选" }}
          <ChevronsUpDown class="ml-2 h-4 w-4 shrink-0 opacity-50"/>
        </Button>
      </PopoverTrigger>
      <PopoverContent class="w-full p-0">
        <Command>
          <CommandInput class="h-9" placeholder="搜索脚本"/>
          <CommandEmpty>没有找到</CommandEmpty>
          <CommandList>
            <CommandGroup>
              <CommandItem v-for="item in scriptsObject" :key="item.value" :value="item.value" @select="(ev) => {
                if (typeof ev.detail.value === 'string') {
                  updateCurrentScript(ev.detail.value)
                }
                open = false
              }"
              >
                {{ item.label }}
                <Check :class="cn( 'ml-auto h-4 w-4', currentScript === item.value ? 'opacity-100' : 'opacity-0', )"/>
              </CommandItem>
            </CommandGroup>
          </CommandList>
        </Command>
      </PopoverContent>
    </Popover>
  </div>

  <div class="grid grid-cols-2 mt-2">
    <Button v-if="!currentStatus.isRunning" class="mr-1 bg-sky-500" @click="sendMessage('program', 'enable')">
      <MonitorCheck class="mr-2 h-4 w-4"/>
      运行任务(F9)
    </Button>
    <Button v-if="currentStatus.isRunning" class="mr-1 bg-gray-500" @click="sendMessage('program', 'disable')">
      <MonitorPause class="mr-2 h-4 w-4"/>
      停止任务(F9)
    </Button>
    <Button class="ml-1" variant="outline" @click="openExit = true">
      <MonitorX class="mr-2 h-4 w-4"/>
      退出程序(F10)
    </Button>
  </div>

  <div v-if="configs.taskName == 'execute'" class="grid grid-cols-2 mt-2">
    <Button v-if="!currentStatus.isRecord" @click="beginRecord" class="mr-1 bg-lime-500">
      <Videotape class="mr-2 h-4 w-4"/>
      开始录制
    </Button>
    <Button v-if="currentStatus.isRecord" @click="endRecord" class="mr-1 bg-emerald-600">
      <Videotape class="mr-2 h-4 w-4"/>
      停止录制
    </Button>
    <Button class="ml-1 bg-red-600" @click="deleteDialog = true">
      <Trash2 class="mr-2 h-4 w-4"/>
      删除脚本
    </Button>
  </div>

  <TooltipProvider>
    <Tooltip :open="recordTooltip">
      <TooltipTrigger v-if="configs.taskName == 'fixedPoint'" class="w-full">
        <div @mousedown="triggerRecordTooltip">
          <Button v-if="configs.taskName == 'fixedPoint' && !currentStatus.isRecord" :disabled="disabled" @click="beginRecord" class="w-full mt-2 bg-lime-500">
            <Videotape class="mr-2 h-4 w-4"/> 开始录制
          </Button>
          <Button v-if="configs.taskName == 'fixedPoint' && currentStatus.isRecord" :disabled="disabled" @click="endRecord" class="w-full mt-2 bg-emerald-600">
            <Videotape class="mr-2 h-4 w-4"/> 停止录制
          </Button>
        </div>
      </TooltipTrigger>
      <TooltipContent>
        <p>停止任务后才能录制</p>
      </TooltipContent>
    </Tooltip>
  </TooltipProvider>

  <Button class="w-full mt-2 bg-teal-600" @click="sendMessage('program', 'screenshot')">
    <Fullscreen class="mr-2 h-4 w-4"/>
    截屏(F11)
  </Button>

  <AlertDialog v-model:open="deleteDialog">
    <AlertDialogContent class="top-24">
      <AlertDialogHeader>
        <AlertDialogTitle>提示</AlertDialogTitle>
        <AlertDialogDescription>
          是否删除脚本？
        </AlertDialogDescription>
      </AlertDialogHeader>
      <AlertDialogFooter>
        <AlertDialogCancel>取消</AlertDialogCancel>
        <AlertDialogAction @click="deleteScript">确定</AlertDialogAction>
      </AlertDialogFooter>
    </AlertDialogContent>
  </AlertDialog>

  <AlertDialog v-model:open="saveScriptDialog">
    <AlertDialogContent class="top-24">
      <AlertDialogHeader>
        <AlertDialogTitle>提示</AlertDialogTitle>
        <AlertDialogDescription>
          请输入脚本文件名
        </AlertDialogDescription>
      </AlertDialogHeader>
      <Input type="text" placeholder="可输入职业和地图名" v-model="scriptName"/>
      <AlertDialogFooter>
        <AlertDialogAction @click="saveScript">保存</AlertDialogAction>
      </AlertDialogFooter>
    </AlertDialogContent>
  </AlertDialog>

  <AlertDialog v-model:open="openExit">
    <AlertDialogContent class="top-1/2" @openAutoFocus="(e)=>e.preventDefault()" @closeAutoFocus="(e)=>e.preventDefault()">
      <AlertDialogHeader>
        <AlertDialogTitle>提示</AlertDialogTitle>
        <AlertDialogDescription>确定要退出程序吗？</AlertDialogDescription>
      </AlertDialogHeader>
      <AlertDialogFooter>
        <div class="w-full flex items-center">
          <Button class="w-1/2 rounded-r-none border-r-0" variant="outline" @click="sendMessage('program', 'exit');openExit = false">确定</Button>
          <Button class="w-1/2 rounded-l-none" variant="outline" @click="openExit = false">取消</Button>
        </div>
      </AlertDialogFooter>
    </AlertDialogContent>
  </AlertDialog>
</template>

<script setup lang="ts">
import {cn} from "@/lib/utils.ts";
import {Command, CommandEmpty, CommandGroup, CommandInput, CommandItem, CommandList} from "@/components/ui/command";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger
} from '@/components/ui/tooltip'
import {
  Check,
  ChevronsUpDown,
  Lightbulb,
  ScrollText,
  MonitorCheck,
  MonitorPause,
  MonitorX,
  Fullscreen,
  Trash2,
  Videotape,
  // Target
} from "lucide-vue-next";
import {Popover, PopoverContent, PopoverTrigger} from "@/components/ui/popover";
import {Button} from "@/components/ui/button";
import {
  AlertDialog,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogCancel,
  AlertDialogAction,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle
} from '@/components/ui/alert-dialog'
import {Input} from '@/components/ui/input'
import {computed, onMounted, ref} from 'vue'
import {Select, SelectContent, SelectGroup, SelectItem, SelectTrigger, SelectValue} from "@/components/ui/select";
import {taskNameData} from '@/lib/dataDictionary.ts';
import {Status} from "@/types/status.ts";
import {Configs} from "@/types/configs.ts";

const open = ref(false)
const isRecord = ref(false)
const deleteDialog = ref(false)
const saveScriptDialog = ref(false)
const scriptName = ref('')
const openExit = ref(false)

const taskTooltip = ref(false)
const triggerTaskTooltip = () => {
  if (!disabled) return
  taskTooltip.value = true
  setTimeout(() => {
    taskTooltip.value = false
  }, 1500)
}

const recordTooltip = ref(false)
const triggerRecordTooltip = () => {
  if (!disabled) return
  recordTooltip.value = true
  setTimeout(() => {
    recordTooltip.value = false
  }, 1500)
}

const deleteScript = () => {
  emit('sendMessage', 'deleteScript', props.currentScript);
  deleteDialog.value = false
}
const beginRecord = () => {
  emit('sendMessage', 'point', 'beginRecord');
  isRecord.value = true
}
const endRecord = () => {
  emit('sendMessage', 'point', 'endRecord');
  isRecord.value = false
  // saveScriptDialog.value = true
}
const saveScript = () => {
  console.log(scriptName.value)
  if (!scriptName.value) {
    emit('toast', '脚本文件名不能为空');
    return
  }
  emit('sendMessage', 'script', 'saveScript', scriptName.value);
  saveScriptDialog.value = false
}

const sendMessage = (service: string, action: string) => {
  emit('sendMessage', service, action);
}

const updateCurrentScript = (newValue: string) => {
  emit('update:currentScript', newValue);
}

const props = defineProps<{ scripts: string[], currentScript: string, currentStatus: Status, configs: Configs }>()

const scriptsObject = computed(() => {
  return props.scripts.map(x => {
    return {label: x.replace(/\.txt$/, ''), value: x}
  })
})

const taskChange = (value: string) => {
  props.configs.taskName = value
  emit('sendMessage', 'config', 'setConfig', `taskName=${value}`)
}

const disabled = computed(() => {
  return props.currentStatus.isRunning
})

onMounted(() => {
})

const emit = defineEmits(['sendMessage', 'update:currentScript', 'toast'])
</script>

<style scoped>
</style>