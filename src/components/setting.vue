<template>
    <div class="flex items-center space-x-4 rounded-md border p-4 mb-1">
      <BatteryLow/>
      <div class="flex-1 space-y-1">
        <p class="text-sm font-medium leading-none">
          血量魔量检测
        </p>
      </div>
      <Switch v-model:checked="configs.checkHpMp" @update:checked="changeConfig('checkHpMp', $event)"/>
    </div>

  <div class="flex items-center space-x-4 rounded-md border p-4 mb-1">
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
          <SelectItem value="none">
            忽略
          </SelectItem>
          <SelectItem value="avoid">
            躲避
          </SelectItem>
          <SelectItem value="change">
            换线
          </SelectItem>
        </SelectGroup>
      </SelectContent>
    </Select>
  </div>

  <div class="flex items-center space-x-4 rounded-md border p-4 mb-1">
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
          <SelectItem value="none">
            忽略
          </SelectItem>
          <SelectItem value="disable">
            停用并通知
          </SelectItem>
        </SelectGroup>
      </SelectContent>
    </Select>
  </div>

  <div class="flex items-center space-x-4 rounded-md border p-4 mb-1">
    <TrainFront/>
    <div class="flex-1 space-y-1">
      <p class="text-sm font-medium leading-none">
        小黑处理
      </p>
    </div>
    <Select :modelValue="configs.smallBlackHandle" @update:modelValue="changeConfig('smallBlackHandle', $event)">
      <SelectTrigger class="flex-1">
        <SelectValue placeholder="未选择"/>
      </SelectTrigger>
      <SelectContent>
        <SelectGroup>
          <SelectItem value="none">
            忽略
          </SelectItem>
          <SelectItem value="change">
            换线
          </SelectItem>
        </SelectGroup>
      </SelectContent>
    </Select>
  </div>

  <div class="flex items-center space-x-4 rounded-md border p-4 mb-1">
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
          <SelectItem value="unlock">
            解锁
          </SelectItem>
          <SelectItem value="notice">
            通知
          </SelectItem>
        </SelectGroup>
      </SelectContent>
    </Select>
  </div>

  <div class="flex items-center space-x-4 rounded-md border p-4 mb-1">
    <Skull/>
    <div class="flex-1 space-y-1">
      <p class="text-sm font-medium leading-none">
        死亡处理
      </p>
      <p class="text-sm text-muted-foreground">
        需要配置引路
      </p>
    </div>
    <Select :modelValue="configs.deathHandle" @update:modelValue="changeConfig('deathHandle', $event)">
      <SelectTrigger class="flex-1">
        <SelectValue placeholder="未选择"/>
      </SelectTrigger>
      <SelectContent>
        <SelectGroup>
          <SelectItem value="home">
            回城
          </SelectItem>
          <SelectItem value="back">
            回到原图
          </SelectItem>
        </SelectGroup>
      </SelectContent>
    </Select>
  </div>

  <div class="flex items-center space-x-4 rounded-md border p-4 mb-1">
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

  <div class="flex items-center space-x-4 rounded-md border p-4 mb-1">
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

</template>

<script setup lang="ts">
import {BatteryLow, Target, TrainFront, Clock1, LockKeyholeOpen, Skull, PersonStanding, Shuffle} from "lucide-vue-next"
import {NumberField, NumberFieldContent, NumberFieldDecrement, NumberFieldIncrement, NumberFieldInput} from "@/components/ui/number-field"
import {Select, SelectContent, SelectGroup, SelectItem, SelectTrigger, SelectValue} from '@/components/ui/select'
import {Switch} from "@/components/ui/switch"
import {onMounted} from "vue"
import {Configs} from '@/types/configs'

const changeConfig = (key: string, value: any) => {
  emit('setConfig', key, String(value));
}

defineProps<{ configs: Configs }>()

onMounted(() => {
})

const emit = defineEmits(['setConfig'])
</script>
<style scoped>

</style>