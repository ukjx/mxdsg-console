<template>
  <Card class="w-auto border-none rounded-none">
    <CardHeader>
      <CardTitle>机器远控</CardTitle>
      <CardDescription>当前:黑棋夏天4, 频道:4, 运行时长：5小时20分</CardDescription>
    </CardHeader>
    <CardContent class="grid gap-4">

      <Tabs default-value="setting" class="w-auto">
        <TabsList class="grid w-full grid-cols-4">
          <TabsTrigger value="setting">配置</TabsTrigger>
          <TabsTrigger value="script">脚本</TabsTrigger>
          <TabsTrigger value="monitor">监控</TabsTrigger>
          <TabsTrigger value="logger">日志</TabsTrigger>
        </TabsList>
        <TabsContent value="setting">
          <Setting></Setting>
        </TabsContent>
        <TabsContent value="script">
          <Script></Script>
        </TabsContent>
        <TabsContent value="monitor">
          <Monitor></Monitor>
        </TabsContent>
        <TabsContent value="logger">
          <Logger></Logger>
        </TabsContent>
      </Tabs>

    </CardContent>
    <CardFooter v-show="false">
      <Button class="w-full">
        <Check class="mr-2 h-4 w-4"/>
        重启机器
      </Button>
    </CardFooter>
  </Card>
</template>

<script setup lang="ts">
import Setting from '@/components/setting.vue'
import Script from '@/components/script.vue'
import Monitor from '@/components/monitor.vue'
import Logger from '@/components/logger.vue'
// import { Label } from '@/components/ui/label'
import {Button} from '@/components/ui/button'
import {Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle,} from '@/components/ui/card'
import {Check} from 'lucide-vue-next'
import {Tabs, TabsContent, TabsList, TabsTrigger} from '@/components/ui/tabs'
</script>

<style>
</style>
