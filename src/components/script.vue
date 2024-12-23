<template>
  <div class="flex items-center space-x-4 rounded-md border p-4 mb-1">
    <div class="flex-1 space-y-1">
      <p class="text-sm font-medium leading-none">
        选择脚本
      </p>
    </div>

    <Popover v-model:open="open">
      <PopoverTrigger as-child>
        <Button
            variant="outline"
            role="combobox"
            :aria-expanded="open"
            class="w-1/2 justify-between"
        >
          {{ value
            ? frameworks.find((framework) => framework.value === value)?.label
            : "未选" }}
          <ChevronsUpDown class="ml-2 h-4 w-4 shrink-0 opacity-50" />
        </Button>
      </PopoverTrigger>
      <PopoverContent class="w-full p-0">
        <Command>
          <CommandInput class="h-9" placeholder="搜索脚本" />
          <CommandEmpty>没有找到</CommandEmpty>
          <CommandList>
            <CommandGroup>
              <CommandItem
                  v-for="framework in frameworks"
                  :key="framework.value"
                  :value="framework.value"
                  @select="(ev) => {
                if (typeof ev.detail.value === 'string') {
                  value = ev.detail.value
                }
                open = false
              }"
              >
                {{ framework.label }}
                <Check
                    :class="cn(
                  'ml-auto h-4 w-4',
                  value === framework.value ? 'opacity-100' : 'opacity-0',
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
    <Button class="mr-1 bg-lime-500">
      <Videotape class="mr-2 h-4 w-4"/>
      录制脚本
    </Button>
    <Button class="ml-1 bg-red-600">
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
</template>

<script setup lang="ts">

import {cn} from "@/lib/utils.ts";
import {Command, CommandEmpty, CommandGroup, CommandInput, CommandItem, CommandList} from "@/components/ui/command";
import {Check, ChevronsUpDown, MonitorCheck, MonitorPause, Trash2, Videotape} from "lucide-vue-next";
import {Popover, PopoverContent, PopoverTrigger} from "@/components/ui/popover";
import {Button} from "@/components/ui/button";

import { ref } from 'vue'

const frameworks = [
{ value: 'next.js', label: 'Next.js' },
{ value: 'svelte_kit', label: 'SvelteKit' },
{ value: 'nuxt', label: 'Nuxt' },
{ value: 'remix', label: 'Remix' },
{ value: 'astro', label: 'Astro' },
]

const open = ref(false)
const value = ref('')
</script>

<style scoped>

</style>