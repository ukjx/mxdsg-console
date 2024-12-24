<template>
  <div class="flex items-center space-x-4 rounded-md border p-4 mb-1">
    <div class="flex-1 space-y-1">
      <p class="text-sm font-medium leading-none">
        选择脚本
      </p>
    </div>

    <Popover v-model:open="open">
      <PopoverTrigger as-child>
        <Button variant="outline" role="combobox" :aria-expanded="open" class="w-1/2 justify-between">
          {{ value ? scriptsObject.find((item) => item.value === value)?.label : "未选" }}
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
                  value = ev.detail.value
                }
                open = false
              }"
              >
                {{ item.label }}
                <Check
                    :class="cn(
                  'ml-auto h-4 w-4',
                  value === item.value ? 'opacity-100' : 'opacity-0',
                )"
                />
              </CommandItem>
            </CommandGroup>
          </CommandList>
        </Command>
      </PopoverContent>
    </Popover>
  </div>
  <div class="grid grid-cols-2 mb-1">
    <Button v-if="!isRecord" @click="isRecord=true" class="mr-1 bg-lime-500">
      <Videotape class="mr-2 h-4 w-4"/>
      开始录制
    </Button>
    <Button v-if="isRecord" @click="endRecord" class="mr-1 bg-emerald-600">
      <Videotape class="mr-2 h-4 w-4"/>
      停止录制
    </Button>
    <Button class="ml-1 bg-red-600" @click="showDeleteScript">
      <Trash2 class="mr-2 h-4 w-4"/>
      删除脚本
    </Button>
  </div>
  <Button class="w-full mb-1 bg-sky-500">
    <MonitorCheck class="mr-2 h-4 w-4"/>
    运行脚本
  </Button>
  <Button class="w-full mb-1 bg-gray-500">
    <MonitorPause class="mr-2 h-4 w-4"/>
    停止脚本
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
      <Input type="text" placeholder="可输入职业和地图名" :model-value="scriptName"/>
      <AlertDialogFooter>
        <AlertDialogAction @click="saveScript">保存</AlertDialogAction>
      </AlertDialogFooter>
    </AlertDialogContent>
  </AlertDialog>

  <Toaster class="top-0 left-0 w-full"/>
</template>

<script setup lang="ts">

import {cn} from "@/lib/utils.ts";
import {Command, CommandEmpty, CommandGroup, CommandInput, CommandItem, CommandList} from "@/components/ui/command";
import {Check, ChevronsUpDown, MonitorCheck, MonitorPause, Trash2, Videotape} from "lucide-vue-next";
import {Popover, PopoverContent, PopoverTrigger} from "@/components/ui/popover";
import {Button} from "@/components/ui/button";
import {AlertDialog, AlertDialogContent, AlertDialogDescription, AlertDialogCancel, AlertDialogAction, AlertDialogFooter, AlertDialogHeader, AlertDialogTitle} from '@/components/ui/alert-dialog'
import {Input} from '@/components/ui/input'
import {Toaster} from '@/components/ui/toast'
import {useToast} from '@/components/ui/toast/use-toast'
import {computed, onMounted, ref} from 'vue'

const {toast} = useToast()

const open = ref(false)
const value = ref('')

const isRecord = ref(false)
const deleteDialog = ref(false)
const saveScriptDialog = ref(false)
const scriptName = ref('')

const showDeleteScript = () => {
  deleteDialog.value = true
}
const showSaveScriptDialog = () => {
  saveScriptDialog.value = true
}
const deleteScript = () => {
  deleteDialog.value = false
  emit('sendMessage', {
    action: 'deleteScript',
    // data: scriptName
  });
  toast({
    title: '删除成功',
    description: '脚本已删除',
    duration: 1000
  })
}
const endRecord = () => {
  isRecord.value = false
  showSaveScriptDialog();
}
const saveScript = () => {
  saveScriptDialog.value = false
  toast({
    title: '保存成功',
    description: '脚本已保存',
    duration: 1000
  })
}

const props = defineProps<{ scripts: string[] }>()

const scriptsObject = computed(() => {
  return props.scripts.map(x => {
    return {label: x.replace(/\.txt$/, ''), value: x}
  });
});

onMounted(() => {
  console.log(scriptsObject.value)
})

const emit = defineEmits(['sendMessage'])
</script>

<style scoped>
</style>