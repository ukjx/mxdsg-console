<template>
  <template v-for="(item, index) in logs" :key="item.LogId">
    <div class=" flex items-center space-x-4 rounded-md border p-3 pb-2 mb-1">
      <div class="flex-1">
        <div class="flex">
          <p class="flex-1 text-sm font-medium leading-none">
            {{index + 1}} {{ item.LogTitle }}
          </p>
          <p class="flex-1 text-sm text-muted-foreground leading-none text-right">
            {{ formatTime(item.LogTime) }}
          </p>
        </div>
        <div class="p-0 pt-0 mt-2">
          <div class="flex space-x-4 text-sm text-muted-foreground">
            <div class="flex items-center">
              <svg viewBox="0 0 15 15" width="1.2em" height="1.2em" class="mr-1 h-3 w-3 fill-sky-400 text-sky-400">
                <path fill="currentColor" fill-rule="evenodd"
                      d="M.877 7.5a6.623 6.623 0 1 1 13.246 0a6.623 6.623 0 0 1-13.246 0M7.5 1.827a5.673 5.673 0 1 0 0 11.346a5.673 5.673 0 0 0 0-11.346"
                      clip-rule="evenodd"></path>
              </svg>
              {{ item.LogContent }}
            </div>
          </div>
        </div>
      </div>
    </div>
  </template>

  <AlertDialog v-model:open="showMask">
    <AlertDialogContent class="w-[140px] p-2 text-center rounded-xl">
      <AlertDialogTitle>
        <AlertDialogDescription>
          <Label>{{maskText}}</Label>
        </AlertDialogDescription>
      </AlertDialogTitle>
    </AlertDialogContent>
  </AlertDialog>

  <Toaster/>
</template>

<script setup lang="ts">
import {onMounted, ref} from "vue";
import {Logs} from "@/types/logs.ts";
import {formatTime} from "@/lib/utils.ts";
import {AlertDialog, AlertDialogContent, AlertDialogDescription, AlertDialogTitle} from "@/components/ui/alert-dialog";
import {Label} from "@/components/ui/label";
import {Toaster} from "@/components/ui/toast";

defineProps<{ logs: Array<Logs> }>()

let showMask = ref(false)
let maskText = ref('')

onMounted(() => {
  // showMask.value = true
  // maskText.value = '加载中...'
  // setTimeout(() => {
  //   showMask.value = false
  // }, 100)
  // console.log(props.logs)
})
</script>

<style scoped>

</style>