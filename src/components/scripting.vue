<template>

  <div class="flex items-center space-x-4 rounded-md border p-4 mb-1">
    <Lightbulb/>
    <div class="flex-1 space-y-1">
      <p class="text-sm font-medium leading-none">
        执行任务
      </p>
    </div>
    <Select :modelValue="configs.taskName" @update:modelValue="taskChange">
      <SelectTrigger class="flex-1">
        <SelectValue placeholder="未选择"/>
      </SelectTrigger>
      <SelectContent>
        <SelectGroup>
          <SelectItem value="execute">
            执行脚本
          </SelectItem>
          <SelectItem value="darkKnight">
            黑骑士
          </SelectItem>
          <SelectItem value="phantom">
            幻影
          </SelectItem>
          <SelectItem value="paladin">
            圣骑士
          </SelectItem>
          <SelectItem value="wildHunter">
            豹弩游侠
          </SelectItem>
        </SelectGroup>
      </SelectContent>
    </Select>
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
                <Check :class="cn( 'ml-auto h-4 w-4', currentScript === item.value ? 'opacity-100' : 'opacity-0', )" />
              </CommandItem>
            </CommandGroup>
          </CommandList>
        </Command>
      </PopoverContent>
    </Popover>
  </div>
  <div class="grid grid-cols-2 mb-1">
    <Button v-if="!currentStatus.isRecord" @click="beginRecord" class="mr-1 bg-lime-500">
      <Videotape class="mr-2 h-4 w-4"/>
      开始录制(F8)
    </Button>
    <Button v-if="currentStatus.isRecord" @click="endRecord" class="mr-1 bg-emerald-600">
      <Videotape class="mr-2 h-4 w-4"/>
      停止录制(F8)
    </Button>
    <Button class="ml-1 bg-red-600" @click="deleteDialog = true">
      <Trash2 class="mr-2 h-4 w-4"/>
      删除脚本
    </Button>
  </div>

  <div class="grid grid-cols-2 mb-1">
    <Button v-if="!currentStatus.isRun" class="mr-1 bg-sky-500" @click="sendMessage('enable')">
      <MonitorCheck class="mr-2 h-4 w-4"/>
      运行任务(F9)
    </Button>
    <Button v-if="currentStatus.isRun" class="mr-1 bg-gray-500" @click="sendMessage('disable')">
      <MonitorPause class="mr-2 h-4 w-4"/>
      停止任务(F9)
    </Button>
    <Button class="ml-1 bg-black" @click="sendMessage('exit')">
      <MonitorX class="mr-2 h-4 w-4"/>
      退出程序(F10)
    </Button>
  </div>

  <Button class="w-full mt-1 bg-teal-600" @click="sendMessage('screenshot')">
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
</template>

<script setup lang="ts">

import {cn} from "@/lib/utils.ts";
import {Command, CommandEmpty, CommandGroup, CommandInput, CommandItem, CommandList} from "@/components/ui/command";
import {Check, ChevronsUpDown, Lightbulb, ScrollText, MonitorCheck, MonitorPause, MonitorX, Fullscreen, Trash2, Videotape} from "lucide-vue-next";
import {Popover, PopoverContent, PopoverTrigger} from "@/components/ui/popover";
import {Button} from "@/components/ui/button";
import {AlertDialog, AlertDialogContent, AlertDialogDescription, AlertDialogCancel, AlertDialogAction, AlertDialogFooter, AlertDialogHeader, AlertDialogTitle} from '@/components/ui/alert-dialog'
import {Input} from '@/components/ui/input'
import {computed, onMounted, ref} from 'vue'
import {Status} from "@/types/status.ts";
import {Select, SelectContent, SelectGroup, SelectItem, SelectTrigger, SelectValue} from "@/components/ui/select";
import {Configs} from "@/types/configs.ts";

const open = ref(false)
const isRecord = ref(false)
const deleteDialog = ref(false)
const saveScriptDialog = ref(false)
const scriptName = ref('')

const deleteScript = () => {
  emit('sendMessage', 'deleteScript', props.currentScript);
  deleteDialog.value = false
}
const beginRecord = () => {
  emit('sendMessage', 'beginRecord');
  isRecord.value = true
}
const endRecord = () => {
  emit('sendMessage', 'endRecord');
  isRecord.value = false
  saveScriptDialog.value = true
}
const saveScript = () => {
  console.log(scriptName.value)
  if (!scriptName.value) {
    emit('toast', '脚本文件名不能为空');
    return
  }
  emit('sendMessage', 'saveScript', scriptName.value);
  saveScriptDialog.value = false
}

const sendMessage = (action: string) => {
  emit('sendMessage', action);
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
  console.log('taskChange', value)
  props.configs.taskName = value
  emit('sendMessage', 'setConfig', `taskName=${value}`)
}

onMounted(() => {
})

const emit = defineEmits(['sendMessage', 'update:currentScript', 'toast'])
</script>

<style scoped>
</style>