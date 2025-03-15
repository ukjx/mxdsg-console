<template>
  <div class="flex items-center flex-wrap rounded-md border p-4 mb-1">
    <div class="flex w-full items-center space-x-4 h-11 border-b border-t pt-2 pb-1">
      <Bell/>
      <div class="flex-1 space-y-1 ">
        <p class="text-sm font-medium leading-none">
          微信通知
        </p>
        <p class="text-sm text-muted-foreground">
          全局微信通知开关
        </p>
      </div>
      <Switch v-model:checked="configs.weChatNotice" @update:checked="changeConfig('weChatNotice', $event)"/>
    </div>
    <div class="flex w-full items-center space-x-4 h-11 border-b border-t mt-1 pb-1">
      <BatteryLow/>
      <div class="flex-1 space-y-1">
        <p class="text-sm font-medium leading-none">
          血量检测
        </p>
      </div>
      <Switch v-model:checked="configs.checkHp" @update:checked="changeConfig('checkHp', $event)"/>
    </div>
    <div class="flex w-full items-center space-x-4 h-11 border-b border-t mt-1 pt-2 pb-1">
      <BatteryLow/>
      <div class="flex-1 space-y-1">
        <p class="text-sm font-medium leading-none">
          魔量检测
        </p>
        <p class="text-sm text-muted-foreground">
          白毛这里检测血量
        </p>
      </div>
      <Switch v-model:checked="configs.checkMp" @update:checked="changeConfig('checkMp', $event)"/>
    </div>

    <div class="flex w-full items-center space-x-4 h-11 border-b mt-1 pb-1">
      <TrainFront/>
      <div class="flex-1 space-y-1">
        <p class="text-sm font-medium leading-none">
          小黑处理
        </p>
      </div>
      <Select :model-value="configs.smallBlackHandle" @update:modelValue="changeConfig('smallBlackHandle', $event)">
        <SelectTrigger class="flex-1">
          <SelectValue placeholder="未选择"/>
        </SelectTrigger>
        <SelectContent>
          <SelectGroup>
            <SelectItem value="ignore">
              忽略
            </SelectItem>
            <SelectItem value="notice">
              通知
            </SelectItem>
            <SelectItem value="changeLine">
              换线
            </SelectItem>
            <SelectItem value="noticeAndChangeLine">
              通知并换线
            </SelectItem>
          </SelectGroup>
        </SelectContent>
      </Select>
    </div>

    <div class="flex w-full items-center space-x-4 h-11 border-b mt-1 pb-1">
      <Target/>
      <div class="flex-1 space-y-1">
        <p class="text-sm font-medium leading-none">
          蘑菇处理
        </p>
      </div>
      <Select :model-value="configs.mushroomHandle" @update:modelValue="changeConfig('mushroomHandle', $event)">
        <SelectTrigger class="flex-1">
          <SelectValue placeholder="未选择"/>
        </SelectTrigger>
        <SelectContent>
          <SelectGroup>
            <SelectItem value="avoid">
              躲避
            </SelectItem>
            <SelectItem value="noticeAndAvoid">
              通知并躲避
            </SelectItem>
          </SelectGroup>
        </SelectContent>
      </Select>
    </div>

    <div class="flex w-full items-center space-x-4 h-11 border-b mt-1 pb-1">
      <Accessibility/>
      <div class="flex-1 space-y-1">
        <p class="text-sm font-medium leading-none">
          新测谎处理
        </p>
      </div>
      <Select :model-value="configs.newTesterHandle" @update:modelValue="changeConfig('newTesterHandle', $event)">
        <SelectTrigger class="flex-1">
          <SelectValue placeholder="未选择"/>
        </SelectTrigger>
        <SelectContent>
          <SelectGroup>
            <SelectItem value="avoid">
              躲避
            </SelectItem>
            <SelectItem value="noticeAndAvoid">
              通知并躲避
            </SelectItem>
          </SelectGroup>
        </SelectContent>
      </Select>
    </div>

    <div class="flex w-full items-center space-x-4 h-11 border-b mt-1 pb-1">
      <Shuffle/>
      <div class="flex-1 space-y-1">
        <p class="text-sm font-medium leading-none">
          掉线处理
        </p>
      </div>
      <Select :modelValue="configs.offlineHandle" @update:modelValue="changeConfig('offlineHandle', $event)">
        <SelectTrigger class="flex-1">
          <SelectValue placeholder="未选择"/>
        </SelectTrigger>
        <SelectContent>
          <SelectGroup>
            <SelectItem value="ignore">
              忽略
            </SelectItem>
            <SelectItem value="notice">
              通知
            </SelectItem>
          </SelectGroup>
        </SelectContent>
      </Select>
    </div>

    <div class="flex w-full items-center space-x-4 h-11 border-b mt-1 pb-1">
      <LockKeyholeOpen/>
      <div class="flex-1 space-y-1">
        <p class="text-sm font-medium leading-none">
          符文处理
        </p>
      </div>
      <Select :modelValue="configs.runeHandle" @update:modelValue="changeConfig('runeHandle', $event)">
        <SelectTrigger class="flex-1">
          <SelectValue placeholder="未选择"/>
        </SelectTrigger>
        <SelectContent>
          <SelectGroup>
            <SelectItem value="ignore">
              忽略
            </SelectItem>
            <SelectItem value="notice">
              通知
            </SelectItem>
            <SelectItem value="unlock">
              解锁
            </SelectItem>
            <SelectItem value="noticeAndUnlock">
              通知并解锁
            </SelectItem>
          </SelectGroup>
        </SelectContent>
      </Select>
    </div>

    <div class="flex w-full items-center space-x-4 h-11 border-b mt-1 pb-1">
      <Skull/>
      <div class="flex-1 space-y-1">
        <p class="text-sm font-medium leading-none">
          死亡处理
        </p>
        <p class="text-sm text-muted-foreground">
          回图向导配置
        </p>
      </div>
      <Select :modelValue="configs.deathHandle" @update:modelValue="changeConfig('deathHandle', $event)">
        <SelectTrigger class="flex-1">
          <SelectValue placeholder="未选择"/>
        </SelectTrigger>
        <SelectContent>
          <SelectGroup>
            <SelectItem value="goCity">
              回城
            </SelectItem>
            <SelectItem value="noticeGoCity">
              通知并回城
            </SelectItem>
            <SelectItem value="backMap">
              回到原图
            </SelectItem>
            <SelectItem value="noticeAndBackMap">
              通知并回到原图
            </SelectItem>
          </SelectGroup>
        </SelectContent>
      </Select>
    </div>

    <div class="flex w-full items-center space-x-4 h-11 border-b mt-1 pb-1">
      <Clock1/>
      <div class="flex-1 space-y-1">
        <p class="text-sm font-medium leading-none">
          定时换线
        </p>
        <p class="text-sm text-muted-foreground">
          分钟 0为不换
        </p>
      </div>
      <NumberField class="flex-1" id="minute" :modelValue="configs.changeLineInterval" :min="0"
                   @update:modelValue="changeConfig('changeLineInterval', $event)">
        <NumberFieldContent>
          <NumberFieldDecrement/>
          <NumberFieldInput/>
          <NumberFieldIncrement/>
        </NumberFieldContent>
      </NumberField>
    </div>

    <div class="flex w-full items-center space-x-4 h-11 border-b mt-1 pb-1">
      <PersonStanding/>
      <div class="flex-1 space-y-1">
        <p class="text-sm font-medium leading-none">
          来人换线
        </p>
        <p class="text-sm text-muted-foreground">
          秒数 1秒换 0不换
        </p>
      </div>
      <NumberField class="flex-1" id="second" :modelValue="configs.someoneSecond" :min="0"
                   @update:modelValue="changeConfig('someoneSecond', $event)">
        <NumberFieldContent>
          <NumberFieldDecrement/>
          <NumberFieldInput/>
          <NumberFieldIncrement/>
        </NumberFieldContent>
      </NumberField>
    </div>
  </div>

</template>

<script setup lang="ts">
import {Bell, BatteryLow, Target, Accessibility, TrainFront, Clock1, LockKeyholeOpen, Skull, PersonStanding, Shuffle} from "lucide-vue-next"
import {
  NumberField,
  NumberFieldContent,
  NumberFieldDecrement,
  NumberFieldIncrement,
  NumberFieldInput
} from "@/components/ui/number-field"
import {Select, SelectContent, SelectGroup, SelectItem, SelectTrigger, SelectValue} from '@/components/ui/select'
import {Switch} from "@/components/ui/switch"
import {onMounted} from "vue"
import {Configs} from '@/types/configs'

const changeConfig = (key: string, value: any) => {
  let val = String(value)
  val = val == 'true' ? 'True' : val
  val = val == 'false' ? 'False' : val
  emit('setConfig', key, val);
}

defineProps<{ configs: Configs }>()

onMounted(() => {
})

const emit = defineEmits(['setConfig'])
</script>
<style scoped>

</style>