<template>
  <template v-for="(item, index) in logs">
    <div class=" flex items-center space-x-4 rounded-md border p-3 pb-2 mb-1">
      <div class="flex-1">
        <div class="flex">
          <p class="flex-1 text-sm font-medium leading-none">
            {{ index + 1 }}.{{ item.logTitle }}
          </p>
          <p class="flex text-sm text-muted-foreground leading-none text-right">
            {{ formatTime(item.logTime) }}
          </p>
        </div>
        <div class="p-0 pt-0 mt-2">
          <div class="flex space-x-4 text-sm text-muted-foreground">
            <div class="flex items-center break-words break-word-custom">
              <svg viewBox="0 0 15 15" width="1.2em" height="1.2em" class="mr-1 h-3 w-3 fill-sky-400 text-sky-400">
                <path fill="currentColor" fill-rule="evenodd"
                      d="M.877 7.5a6.623 6.623 0 1 1 13.246 0a6.623 6.623 0 0 1-13.246 0M7.5 1.827a5.673 5.673 0 1 0 0 11.346a5.673 5.673 0 0 0 0-11.346"
                      clip-rule="evenodd"></path>
              </svg>
              {{ item.logContent }}
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
          <Label>{{ maskText }}</Label>
        </AlertDialogDescription>
      </AlertDialogTitle>
    </AlertDialogContent>
  </AlertDialog>

  <Toaster/>
</template>

<script setup lang="ts">
import {onMounted, onUnmounted, ref} from "vue";
import {Logs} from "@/types/logs.ts";
import {formatTime} from "@/lib/utils.ts";
import {AlertDialog, AlertDialogContent, AlertDialogDescription, AlertDialogTitle} from "@/components/ui/alert-dialog";
import {Label} from "@/components/ui/label";
import {Toaster} from "@/components/ui/toast";

defineProps<{ logs: Array<Logs> }>()
const emit = defineEmits(['clearLogs', 'sendMessage'])

const pageNumber = ref(1);
let showMask = ref(false)
let maskText = ref('')
const isScrollToBottom = ref(false);
const isScrollToTop = ref(false);

const onScroll = () => {
  // const scrollTop = window.pageYOffset || document.documentElement.scrollTop;
  // const windowHeight = window.innerHeight || document.documentElement.clientHeight;
  const scrollTop = document.documentElement.scrollTop;
  const windowHeight = window.innerHeight;
  const documentHeight = document.documentElement.scrollHeight;

  if (scrollTop === 0) {
    isScrollToTop.value = true;
    isScrollToBottom.value = false;
  } else if (scrollTop + windowHeight >= documentHeight) {
    isScrollToBottom.value = true;
    isScrollToTop.value = false;
  } else {
    isScrollToTop.value = false;
    isScrollToBottom.value = false;
  }

  if (isScrollToBottom.value) {
    pageNumber.value += 1;
    emit('sendMessage', 'log', 'getLogs', pageNumber.value)
  } else if (isScrollToTop.value) {
    pageNumber.value = 1;
    emit('clearLogs')
    emit('sendMessage', 'log', 'getLogs', pageNumber.value)
  }
};

onMounted(() => {
  emit('sendMessage', 'log', 'getLogs', pageNumber.value)
  window.addEventListener('scroll', onScroll);
});

onUnmounted(() => {
  window.removeEventListener('scroll', onScroll);
});
</script>

<style scoped>
.break-word-custom {
  word-break: break-word;
}
</style>