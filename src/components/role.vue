<template>
  <div ref="formRef" class="flex flex-wrap items-center rounded-md border p-4 mb-1">

    <div class="flex w-full items-center mb-2">
      <ScrollText/>
      <div class="w-16 space-y-1 ml-2">
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
      <Button class="ml-2" @click="roleAdd.open" variant="outline">新增</Button>
    </div>

    <div class="flex w-full flex-wrap items-center mb-2">
      <div class="w-1/2 flex items-center mb-1">
        <p class="text-[0.850rem] font-medium leading-none mr-2">
          主攻按键
        </p>
        <Select :modelValue="roleConfig.attack" @update:modelValue="selectChange('主攻键', 'attack', $event)">
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
        <p class="text-[0.850rem] font-medium leading-none mx-2">
          跳跃键
        </p>
        <Select :modelValue="roleConfig.jump" @update:modelValue="selectChange('跳跃键', 'jump', $event)">
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
        <Select :modelValue="roleConfig.upJumpMode" @update:modelValue="selectChange('上跳方式', 'upJumpMode', $event)">
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
        <p class="text-[0.850rem] font-medium leading-none mx-2">
          上跳键
        </p>
        <Select :modelValue="roleConfig.upJump" @update:modelValue="selectChange('上跳键', 'upJump', $event)">
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
          前进方式
        </p>
        <Select :modelValue="roleConfig.forwardMode" @update:modelValue="selectChange('前进方式', 'forwardMode', $event)">
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
        <p class="text-[0.850rem] font-medium leading-none mx-2">
          瞬移键
        </p>
        <Select :modelValue="roleConfig.teleport" @update:modelValue="selectChange('瞬移键', 'teleport', $event)">
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
        <Select :modelValue="roleConfig.npc" @update:modelValue="selectChange('采集按键', 'npc', $event)">
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
        <p class="text-[0.850rem] font-medium leading-none mx-2">
          更换频道
        </p>
        <Select :modelValue="roleConfig.changeLine" @update:modelValue="selectChange('更换频道', 'changeLine', $event)">
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
          怪物首领
        </p>
        <Select :modelValue="roleConfig.boss" @update:modelValue="selectChange('怪物首领', 'boss', $event)">
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
        <p class="text-[0.850rem] font-medium leading-none mx-2">
          向导按键
        </p>
        <Select :modelValue="roleConfig.guide" @update:modelValue="selectChange('向导按键', 'guide', $event)">
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
        <p class="w-20 text-[0.850rem] font-medium leading-none">
          向导步骤
        </p>
        <Input type="text" placeholder="快速移动序号,传送口方向和序号" v-model="roleConfig.guideStep" @update:modelValue="selectChange('向导步骤', 'guideStep', $event)" />
      </div>

      <div class="w-full flex items-center mb-1">
        <p class="w-20 text-[0.850rem] font-medium leading-none">
          跳跃延迟
        </p>
        <Input type="text" placeholder="上跳,下跳,二段跳" v-model="roleConfig.jumpDelay" @update:modelValue="selectChange('跳跃延迟', 'jumpDelay', $event)" />
      </div>

      <div class="w-full flex items-center mb-1">
        <p class="w-20 text-[0.850rem] font-medium leading-none">
          地图定点
        </p>
        <Textarea class="w-10/12 rounded-r-none border-r-0" placeholder="坐标系组X,Y" v-model="roleConfig.fixedPoint" @update:modelValue="selectChange('地图定点', 'fixedPoint', $event)" />
        <Button variant="outline" class="w-2/12 min-h-[60px] py-2 rounded-l-none" @click="copyText(roleConfig.fixedPoint)">复制</Button>
      </div>

      <div class="w-full flex flex-wrap items-center mb-1">
        <p class="w-full text-[0.850rem] font-medium leading-none">
          增益组
        </p>
        <template v-for="(item, index) in roleConfig.buffs">
          <div class="w-full flex mt-1 items-center overflow-auto">
            <Input class="w-10/12 rounded-r-none border-r-0" readonly type="text" @click="keyUnitForm.edit('增益组', index, item)" :data-index="index" v-model="item.text" />
            <Button variant="outline" class="w-2/12 h-10 py-2 rounded-l-none" @click="keyUnitDelete.confirm('增益组', item)">删除</Button>
          </div>
        </template>
        <Button variant="outline" class="w-full mt-1" @click="keyUnitForm.add('增益组')">新增</Button>
      </div>

      <div class="w-full flex flex-wrap items-center mb-1">
        <p class="w-full text-[0.850rem] font-medium leading-none">
          全屏组
        </p>
        <template v-for="(item, index) in roleConfig.attacks">
          <div class="w-full flex mt-1 items-center overflow-auto">
            <Input class="w-10/12 rounded-r-none border-r-0" readonly type="text" @click="keyUnitForm.edit('全屏组', index, item)" :data-index="index" v-model="item.text" />
            <Button variant="outline" class="w-2/12 h-10 py-2 rounded-l-none" @click="keyUnitDelete.confirm('全屏组', item)">删除</Button>
          </div>
        </template>
        <Button variant="outline" class="w-full mt-1" @click="keyUnitForm.add('全屏组')">新增</Button>
      </div>

    </div>
  </div>

  <AlertDialog v-model:open="keyUnitForm.isOpen">
    <AlertDialogContent class="top-1/2" @openAutoFocus="(e)=>e.preventDefault()" @closeAutoFocus="(e)=>e.preventDefault()">
      <AlertDialogHeader>
        <AlertDialogTitle>{{keyUnitForm.name.replace('组', '')}}修改</AlertDialogTitle>
        <AlertDialogDescription></AlertDialogDescription>
      </AlertDialogHeader>
      <div class="flex flex-wrap items-center m-1">
        <div class="w-full flex flex-wrap items-center mb-1">
          <p class="w-10 text-[0.850rem] font-medium leading-none mr-2">
            按键
          </p>
          <Select :model-value="keyUnitForm.key" @update:modelValue="keyUnitForm.key=$event;keyUnitForm.valid()">
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
          <p v-if="keyUnitForm.keyWarn" class="w-full mt-1 ml-12 text-sm text-red-500">* {{keyUnitForm.keyWarn}}</p>
        </div>
        <div class="w-full flex flex-wrap items-center mb-1">
          <p class="w-10 text-[0.850rem] font-medium leading-none mr-2">
            秒数
          </p>
          <Input class="flex-1" type="number" v-model="keyUnitForm.second" @update:modelValue="keyUnitForm.valid" placeholder="间隔秒数" />
          <p v-if="keyUnitForm.secondWarn" class="w-full mt-1 ml-12 text-sm text-red-500">* {{keyUnitForm.secondWarn}}</p>
        </div>
        <div class="w-full flex flex-wrap items-center mb-1">
          <p class="w-10 text-[0.850rem] font-medium leading-none mr-2">
            说明
          </p>
          <Input class="flex-1" type="text" v-model="keyUnitForm.mark" @update:modelValue="keyUnitForm.valid" placeholder="按键说明" />
          <p v-if="keyUnitForm.markWarn" class="w-full mt-1 ml-12 text-sm text-red-500">* {{keyUnitForm.markWarn}}</p>
        </div>
      </div>
      <AlertDialogFooter>
        <div class="w-full flex items-center">
          <Button class="w-1/2 rounded-r-none border-r-0" variant="outline" @click="keyUnitForm.save">保存</Button>
          <Button class="w-1/2 rounded-l-none" variant="outline" @click="keyUnitForm.close">取消</Button>
        </div>
      </AlertDialogFooter>
    </AlertDialogContent>
  </AlertDialog>

<AlertDialog v-model:open="keyUnitDelete.isOpen">
<AlertDialogContent class="top-1/2" @openAutoFocus="(e)=>e.preventDefault()" @closeAutoFocus="(e)=>e.preventDefault()">
  <AlertDialogHeader>
    <AlertDialogTitle>提示</AlertDialogTitle>
    <AlertDialogDescription>确定要删除吗？</AlertDialogDescription>
  </AlertDialogHeader>
  <AlertDialogFooter>
    <div class="w-full flex items-center">
      <Button class="w-1/2 rounded-r-none border-r-0" variant="outline" @click="keyUnitDelete.delete">确定</Button>
      <Button class="w-1/2 rounded-l-none" variant="outline" @click="keyUnitDelete.close">取消</Button>
    </div>
  </AlertDialogFooter>
</AlertDialogContent>
</AlertDialog>

  <AlertDialog v-model:open="roleAdd.isOpen">
    <AlertDialogContent class="top-1/2" @openAutoFocus="(e)=>e.preventDefault()" @closeAutoFocus="(e)=>e.preventDefault()">
      <AlertDialogHeader>
        <AlertDialogTitle>新增角色</AlertDialogTitle>
        <AlertDialogDescription></AlertDialogDescription>
      </AlertDialogHeader>
      <div class="flex flex-wrap items-center m-1">
        <div class="w-full flex flex-wrap items-center mb-1">
          <p class="w-10 text-[0.850rem] font-medium leading-none mr-2">
            角色
          </p>
          <Input class="flex-1" type="text" v-model="roleAdd.roleName" @update:modelValue="roleAdd.valid" placeholder="角色名称" />
          <p v-if="roleAdd.roleNameWarn" class="w-full mt-1 ml-12 text-sm text-red-500">* {{roleAdd.roleNameWarn}}</p>
        </div>
      </div>
      <AlertDialogFooter>
        <div class="w-full flex items-center">
          <Button class="w-1/2 rounded-r-none border-r-0" variant="outline" @click="roleAdd.save">保存</Button>
          <Button class="w-1/2 rounded-l-none" variant="outline" @click="roleAdd.close">取消</Button>
        </div>
      </AlertDialogFooter>
    </AlertDialogContent>
  </AlertDialog>

</template>

<script setup lang="ts">

import {keyData} from "@/lib/dataDictionary.ts";
import {ScrollText} from "lucide-vue-next";
import {Select, SelectContent, SelectGroup, SelectItem, SelectTrigger, SelectValue} from "@/components/ui/select";
import {Textarea} from "@/components/ui/textarea";
import {Button} from "@/components/ui/button";
import {Input} from "@/components/ui/input";
import {onMounted, onUnmounted, reactive, ref, watch} from "vue";
import {RoleConfig} from "@/types/roleConfig.ts";
import {Status} from "@/types/status.ts";
import {Configs} from "@/types/configs.ts";
import {
  AlertDialog,
  AlertDialogContent, AlertDialogDescription,
  AlertDialogFooter, AlertDialogHeader, AlertDialogTitle
} from "@/components/ui/alert-dialog";
import {KeyUnit} from "@/types/keyUnit.ts";
import {$} from "@/lib/common.ts";

const props = defineProps<{ roles: string[], roleConfig: RoleConfig, currentRole: string, currentStatus: Status, configs: Configs }>()
const formRef = ref<HTMLElement | null>(null)

type RoleConfigKey = keyof RoleConfig;

const keyUnitForm = reactive({
  isOpen: false,
  name: '增益组|全屏组',
  groupNo: 0,
  text: '',
  key: '',
  second: '',
  mark: '',
  keyWarn: '',
  secondWarn: '',
  markWarn: '',
  add: (name: string) => {
    keyUnitForm.clear()
    keyUnitForm.name = name
    keyUnitForm.groupNo = 0
    keyUnitForm.text = ''
    keyUnitForm.key = ''
    keyUnitForm.second = ''
    keyUnitForm.mark = ''
    keyUnitForm.isOpen = true
  },
  edit: (name: string, index: number, keyUnit: KeyUnit) => {
    keyUnitForm.clear()
    keyUnitForm.name = name
    keyUnitForm.groupNo = index + 1
    keyUnitForm.text = keyUnit.text
    keyUnitForm.key = keyUnit.key
    keyUnitForm.second = keyUnit.second == undefined ? '' : keyUnit.second.toString()
    keyUnitForm.mark = keyUnit.mark
    keyUnitForm.isOpen = true
  },
  save: () => {
    if (keyUnitForm.valid()) {
      let value = `${keyUnitForm.key},${keyUnitForm.second},${keyUnitForm.mark}`
      setRoleConfig(keyUnitForm.name, value, keyUnitForm.groupNo)
      keyUnitForm.close()
    }
  },
  valid: () => {
    keyUnitForm.keyWarn = $.isEmpty(keyUnitForm.key) ? '请选择按键' : keyUnitForm.repeat()
    keyUnitForm.secondWarn = $.isEmpty(keyUnitForm.second) ? '请输入秒数' :
        (!$.isPositiveInteger(keyUnitForm.second) ? '请输入数字秒数' : '')
    keyUnitForm.markWarn = $.isEmpty(keyUnitForm.mark) ? '请输入说明' : ''
    return keyUnitForm.keyWarn == '' && keyUnitForm.secondWarn == '' && keyUnitForm.markWarn == ''
  },
  clear: () => {
    keyUnitForm.keyWarn = ''
    keyUnitForm.secondWarn = ''
    keyUnitForm.markWarn = ''
  },
  repeat: () => {
    let idx = keyUnitForm.groupNo - 1
    let key: RoleConfigKey = keyUnitForm.name == '增益组' ? 'buffs':'attacks'
    for (let [index, item] of props.roleConfig[key].entries()) {
        if (index != idx && item.key == keyUnitForm.key) {
        return '按键重复'
      }
    }
    return ''
  },
  close: () => {
    keyUnitForm.isOpen = false
  }
})

const keyUnitDelete = reactive({
  isOpen: false,
  name: '增益组|全屏组',
  text: '',
  key: '',
  second: '',
  mark: '',
  confirm: (name: string, keyUnit: KeyUnit) => {
    keyUnitDelete.name = name
    keyUnitDelete.text = keyUnit.text
    keyUnitDelete.key = keyUnit.key
    keyUnitDelete.second = keyUnit.second == undefined ? '' : keyUnit.second.toString()
    keyUnitDelete.mark = keyUnit.mark
    keyUnitDelete.isOpen = true
  },
  delete: () => {
    let value = `${keyUnitDelete.key},${keyUnitDelete.second},${keyUnitDelete.mark}`
    setRoleConfig(keyUnitDelete.name, value, -1)
    keyUnitDelete.close()
  },
  close: () => {
    keyUnitDelete.isOpen = false
  }
})

const roleAdd = reactive({
  isOpen: false,
  roleName: '',
  roleNameWarn: '',
  open: () => {
    roleAdd.isOpen = true
  },
  save: () => {
    if (roleAdd.valid()) {
      console.log(roleAdd.roleName)
      emit('sendMessage', 'role', 'addRole', roleAdd.roleName)
      roleAdd.close()
    }
  },
  valid: () => {
    if ($.isEmpty(roleAdd.roleName)) {
      roleAdd.roleNameWarn = '角色名称不能为空'
    } else if(props.roles.indexOf(roleAdd.roleName) >= 0) {
        roleAdd.roleNameWarn = '角色名称已存在'
    } else {
      roleAdd.roleNameWarn = ''
    }
    return roleAdd.roleNameWarn == ''
  },
  close: () => {
    roleAdd.isOpen = false
  }
})

const roleChange = (value: string) => {
  props.configs.roleName = value
  emit('sendMessage', 'role', 'setRoleName', value)
}

const setRoleConfig = (name: string, value: string, groupNo: number) => {
  let data = `${name}|${value}|${groupNo}`
  console.log(data)
  emit('sendMessage', 'role','setRoleConfig', data)
}

const selectChange = (name: string, key: RoleConfigKey, value: any) => {
  props.roleConfig[key] = value
  setRoleConfig(name, value, 0);
}

const copyText = (text: string) => {
  navigator.clipboard.writeText(text)
  emit('toast', '复制完成')
}

watch(() => props.currentStatus.isRunning, (isRunning) => {
  toggleControlStatus(isRunning)
});

function toggleControlStatus(isRunning: boolean) {
  if (!formRef.value) return
  const controls = formRef.value.querySelectorAll('input,textarea,select,button');
  controls.forEach((item) => {
    const element = item as HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement | HTMLButtonElement;
    element.disabled = isRunning
    element.style.pointerEvents = isRunning ? 'none' : 'auto'
  })
}

const handleFormClick = (event: MouseEvent) => {
  const target = event.target as HTMLElement;
  if (target.querySelectorAll('input,textarea,select,button').length > 0) {
    if (props.currentStatus.isRunning) {
      emit('toast', '停止任务后才能修改')
    }
  }
};

onMounted(() => {
  toggleControlStatus(props.currentStatus.isRunning)
  if (!formRef.value) return
  formRef.value.addEventListener('click', handleFormClick);
})

onUnmounted(() => {
  if (!formRef.value) return
  formRef.value.removeEventListener('click', handleFormClick);
})

const emit = defineEmits(['sendMessage', 'toast'])
</script>

<style scoped>
</style>