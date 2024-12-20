<template>
  <div class="flex items-center space-x-4 rounded-md border p-4 mb-1">
    <BellRing/>
    <div class="flex-1 space-y-1">
      <p class="text-sm font-medium leading-none">
        微信通知
      </p>
      <p class="text-sm text-muted-foreground">
        适用于蘑菇、测谎、掉线
      </p>
    </div>
    <Switch :checked="configs.weChatNotice" @update:checked="changeConfigValue('weChatNotice', !configs.weChatNotice)"/>
  </div>

  <div class="flex items-center space-x-4 rounded-md border p-4 mb-1">
    <Shuffle/>
    <div class="flex-1 space-y-1">
      <p class="text-sm font-medium leading-none">
        小黑处理
      </p>
    </div>
    <!--    <Switch :checked="configs.ignoreSmallBlack"-->
    <!--            @update:checked="changeConfigValue('ignoreSmallBlack', !configs.ignoreSmallBlack)"/>-->

    <Select :defaultValue="configs.smallBlackHandle">
      <SelectTrigger class="flex-1">
        <SelectValue placeholder="Select a fruit"/>
      </SelectTrigger>
      <SelectContent>
        <SelectGroup>
          <SelectItem value="ignore">
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
    <!--    <Switch :checked="true"/>-->

    <Select :defaultValue="configs.runeHandle">
      <SelectTrigger class="flex-1">
        <SelectValue placeholder="Select a fruit"/>
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
    <Clock1/>
    <div class="flex-1 space-y-1">
      <p class="text-sm font-medium leading-none">
        定时换线
      </p>
      <p class="text-sm text-muted-foreground">
        分钟 0为不换
      </p>
    </div>
    <NumberField class="flex-1" id="minute" :default-value="60" :min="0">
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
    <NumberField class="flex-1" id="second" :default-value="1" :min="0">
      <NumberFieldContent>
        <NumberFieldDecrement/>
        <NumberFieldInput/>
        <NumberFieldIncrement/>
      </NumberFieldContent>
    </NumberField>
  </div>
</template>

<script setup lang="ts">
import {BellRing, Clock1, LockKeyholeOpen, PersonStanding, Shuffle} from "lucide-vue-next"
import {
  NumberField,
  NumberFieldContent,
  NumberFieldDecrement,
  NumberFieldIncrement,
  NumberFieldInput
} from "@/components/ui/number-field"
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select'
import {Switch} from "@/components/ui/switch"
import {onMounted, defineProps} from "vue"
import {Configs} from '@/types/configs'

function changeConfigValue<T extends keyof Configs>(configKey: T, value: Configs[T]) {
  props.configs[configKey] = value;
  emit('setConfigs', props.configs);
}

const props = defineProps<{ configs: Configs }>()

// defineProps({
//   configs: Config
// })

onMounted(() => {
  // config.loadData()
})

const emit = defineEmits(['setConfigs'])
</script>
<style scoped>

</style>