<template>
  <div class="flex flex-wrap items-center rounded-md border p-4 mb-1">

    <div class="flex w-full items-center mb-2">
      <ScrollText/>
      <div class="flex-1 space-y-1">
        <p class="text-sm font-medium leading-none">
          选择角色
        </p>
      </div>
      <Select :modelValue="currentRole" @update:modelValue="roleChange">
        <SelectTrigger class="flex-1">
          <SelectValue placeholder="未选择"/>
        </SelectTrigger>
        <SelectContent>
          <SelectGroup>
            <SelectItem v-for="item in roles" :value="item">
              {{ item }}
            </SelectItem>
          </SelectGroup>
        </SelectContent>
      </Select>
    </div>

    <div class="flex w-full flex-wrap items-center mb-2">
      <div class="w-1/2 flex items-center mb-1">
        <p class="text-[0.850rem] font-medium leading-none mr-2">
          主攻按键
        </p>
        <Select class="" :model-value="roleConfig.attack" @update:modelValue="console.log(1)">
          <SelectTrigger class="flex-1">
            <SelectValue placeholder="未选择"/>
          </SelectTrigger>
          <SelectContent>
            <SelectGroup>
              <SelectItem v-for="item in keyData.keys()" :value="item">
                {{ keyData.get(item) }}
              </SelectItem>
            </SelectGroup>
          </SelectContent>
        </Select>
      </div>

      <div class="w-1/2 flex items-center mb-1">
        <p class="text-[0.850rem] font-medium leading-none m-2">
          跳跃按键
        </p>
        <Select :model-value="roleConfig.jump" @update:modelValue="console.log(1)">
          <SelectTrigger class="flex-1">
            <SelectValue placeholder="未选择"/>
          </SelectTrigger>
          <SelectContent>
            <SelectGroup>
              <SelectItem v-for="item in keyData.keys()" :value="item">
                {{ keyData.get(item) }}
              </SelectItem>
            </SelectGroup>
          </SelectContent>
        </Select>
      </div>

      <div class="w-1/2 flex items-center mb-1">
        <p class="text-[0.850rem] font-medium leading-none mr-2">
          上跳方式
        </p>
        <Select :model-value="roleConfig.upJumpMode" @update:modelValue="console.log(1)">
          <SelectTrigger class="flex-1">
            <SelectValue placeholder="未选择"/>
          </SelectTrigger>
          <SelectContent>
            <SelectGroup>
              <SelectItem :value="'绳索'">
                绳索
              </SelectItem>
              <SelectItem :value="'一键跳'">
                一键跳
              </SelectItem>
              <SelectItem :value="'跳上跳'">
                跳上跳
              </SelectItem>
              <SelectItem :value="'跳上上'">
                跳上上
              </SelectItem>
              <SelectItem :value="'跳上瞬移'">
                跳上瞬移
              </SelectItem>
            </SelectGroup>
          </SelectContent>
        </Select>
      </div>

      <div class="w-1/2 flex items-center mb-1">
        <p class="text-[0.850rem] font-medium leading-none m-2">
          上跳按键
        </p>
        <Select :model-value="roleConfig.upJump" @update:modelValue="console.log(1)">
          <SelectTrigger class="flex-1">
            <SelectValue placeholder="未选择"/>
          </SelectTrigger>
          <SelectContent>
            <SelectGroup>
              <SelectItem v-for="item in keyData.keys()" :value="item">
                {{ keyData.get(item) }}
              </SelectItem>
            </SelectGroup>
          </SelectContent>
        </Select>
      </div>

      <div class="w-1/2 flex items-center mb-1">
        <p class="text-[0.850rem] font-medium leading-none mr-2">
          前进模式
        </p>
        <Select :model-value="roleConfig.forwardMode" @update:modelValue="console.log(1)">
          <SelectTrigger class="flex-1">
            <SelectValue placeholder="未选择"/>
          </SelectTrigger>
          <SelectContent>
            <SelectGroup>
              <SelectItem :value="'二段跳'">
                二段跳
              </SelectItem>
              <SelectItem :value="'瞬移'">
                瞬移
              </SelectItem>
            </SelectGroup>
          </SelectContent>
        </Select>
      </div>

      <div class="w-1/2 flex items-center mb-1">
        <p class="text-[0.850rem] font-medium leading-none m-2">
          更换频道
        </p>
        <Select :model-value="roleConfig.changeLine" @update:modelValue="console.log(1)">
          <SelectTrigger class="flex-1">
            <SelectValue placeholder="未选择"/>
          </SelectTrigger>
          <SelectContent>
            <SelectGroup>
              <SelectItem v-for="item in keyData.keys()" :value="item">
                {{ keyData.get(item) }}
              </SelectItem>
            </SelectGroup>
          </SelectContent>
        </Select>
      </div>

      <div class="w-1/2 flex items-center mb-1">
        <p class="text-[0.850rem] font-medium leading-none mr-2">
          采集按键
        </p>
        <Select :model-value="roleConfig.npc" @update:modelValue="console.log(1)">
          <SelectTrigger class="flex-1">
            <SelectValue placeholder="未选择"/>
          </SelectTrigger>
          <SelectContent>
            <SelectGroup>
              <SelectItem v-for="item in keyData.keys()" :value="item">
                {{ keyData.get(item) }}
              </SelectItem>
            </SelectGroup>
          </SelectContent>
        </Select>
      </div>

      <div class="w-1/2 flex items-center mb-1">
        <p class="text-[0.850rem] font-medium leading-none m-2">
          怪物首领
        </p>
        <Select :model-value="roleConfig.boss" @update:modelValue="console.log(1)">
          <SelectTrigger class="flex-1">
            <SelectValue placeholder="未选择"/>
          </SelectTrigger>
          <SelectContent>
            <SelectGroup>
              <SelectItem v-for="item in keyData.keys()" :value="item">
                {{ keyData.get(item) }}
              </SelectItem>
            </SelectGroup>
          </SelectContent>
        </Select>
      </div>

      <div class="w-full flex items-center mb-1">
        <p class="w-20 text-[0.850rem] font-medium leading-none mr-2">
          跳跃延迟
        </p>
        <Input type="text" placeholder="上跳,下跳,二段跳" v-model="roleConfig.jumpDelay"/>
      </div>

      <div class="w-full flex items-center mb-1">
        <p class="w-20 text-[0.850rem] font-medium leading-none mr-2">
          地图定点
        </p>
        <Textarea placeholder="坐标系组X,Y" v-model="roleConfig.fixedPoint"/>
      </div>

    </div>
  </div>
</template>

<script setup lang="ts">

import {keyData} from "@/lib/dataDictionary.ts";
import {ScrollText} from "lucide-vue-next";
import {Select, SelectContent, SelectGroup, SelectItem, SelectTrigger, SelectValue} from "@/components/ui/select";
import {Textarea} from "@/components/ui/textarea";
import {Input} from "@/components/ui/input";
import {onMounted} from "vue";
import {RoleConfig} from "@/types/roleConfig.ts";
import {Status} from "@/types/status.ts";
import {Configs} from "@/types/configs.ts";

const props = defineProps<{ roles: string[], roleConfig: RoleConfig, currentRole: string, currentStatus: Status, configs: Configs }>()

const roleChange = (value: string) => {
  props.configs.roleName = value
  emit('sendMessage', 'role', 'setRoleName', value)
}

onMounted(() => {
})

const emit = defineEmits(['sendMessage', 'toast'])
</script>

<style scoped>

</style>