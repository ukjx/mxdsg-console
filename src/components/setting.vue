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
    <Switch :checked="WeChatNotice" @update:checked="handleChange('WeChatNotice')"/>
  </div>

  <div class="flex items-center space-x-4 rounded-md border p-4 mb-1">
    <Shuffle/>
    <div class="flex-1 space-y-1">
      <p class="text-sm font-medium leading-none">
        小黑换线
      </p>
    </div>
    <Switch/>
  </div>

  <div class="flex items-center space-x-4 rounded-md border p-4 mb-1">
    <LockKeyholeOpen/>
    <div class="flex-1 space-y-1">
      <p class="text-sm font-medium leading-none">
        自动解除符文
      </p>
    </div>
    <Switch :checked="true"/>
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
import {BellRing, Clock1, LockKeyholeOpen, PersonStanding, Shuffle} from "lucide-vue-next";
import {
  NumberField,
  NumberFieldContent,
  NumberFieldDecrement,
  NumberFieldIncrement,
  NumberFieldInput
} from "@/components/ui/number-field";
import {Switch} from "@/components/ui/switch";
import {onMounted, reactive, ref} from "vue";
import {$} from "@/lib/common.ts";

const WeChatNotice = ref(true);

function handleChange(key: string) {
  console.log(key);
  WeChatNotice.value = !WeChatNotice.value;
}

const config = reactive({
  checkHpMp: null,
  isDemonAvenger: null,
  weChatNotice: null,
  ignoreSmallBlack: null,
  runeHandle: null,
  changeLineInterval: null,
  someoneSecond: null,
  loadData: () => {
    $.post('getAllConfig', (res: any) => {
      console.log(res);
    });
  }
});

onMounted(() => {
  config.loadData();
});
</script>
<style scoped>

</style>