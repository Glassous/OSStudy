<template>
    <div class="pt-2 pb-10 w-full px-6 md:px-12 max-w-none">
    <!-- Header -->
    <header class="border-b border-slate-200 pb-6 mb-8">
      <div class="flex flex-wrap items-center gap-3">
        <h1 class="text-4xl font-extrabold text-slate-950 tracking-tight flex items-center gap-3">
          <span class="text-purple-600">🎮</span> 交互式算法演示
        </h1>
        <div class="flex items-center gap-3 ml-auto">
          <img
            src="https://file.glassous.top/OSStudy/images/imicola.png"
            alt="imicola 头像"
            class="w-9 h-9 rounded-full object-cover ring-2 ring-indigo-300 shadow-sm flex-shrink-0"
            @error="e => e.target.style.display='none'"
          />
          <span class="text-base font-medium text-slate-600">由 <span class="font-bold text-indigo-600 text-lg">imicola</span> 大佬制作</span>
          <a
            href="https://github.com/imicola"
            target="_blank"
            rel="noopener noreferrer"
            class="flex items-center gap-1 text-indigo-500 hover:text-indigo-700 transition-colors"
          >
            <svg viewBox="0 0 16 16" width="22" height="22" fill="currentColor"><path d="M8 0c4.42 0 8 3.58 8 8a8.013 8.013 0 0 1-5.45 7.59c-.4.08-.55-.17-.55-.38 0-.27.01-1.13.01-2.2 0-.75-.25-1.23-.54-1.48 1.78-.2 3.65-.88 3.65-3.95 0-.88-.31-1.59-.82-2.15.08-.2.36-1.02-.08-2.12 0 0-.67-.22-2.2.82-.64-.18-1.32-.27-2-.27-.68 0-1.36.09-2 .27-1.53-1.03-2.2-.82-2.2-.82-.44 1.1-.16 1.92-.08 2.12-.51.56-.82 1.28-.82 2.15 0 3.06 1.86 3.75 3.64 3.95-.23.2-.44.55-.51 1.07-.46.21-1.61.55-2.33-.66-.15-.24-.6-.83-1.23-.82-.67.01-.27.38.01.53.34.19.73.9.82 1.13.16.45.68 1.35 3.12.88.01.64.01 1.25.01 1.48 0 .21-.15.48-.55.38A7.995 7.995 0 0 1 0 8c0-4.42 3.58-8 8-8z"/></svg>

          </a>
        </div>
      </div>
    </header>


    <div class="flex flex-wrap gap-2 mb-6">
      <button
        v-for="tab in tabs"
        :key="tab.id"
        @click="activeTab = tab.id"
        class="px-4 py-2 rounded-lg text-xs font-bold transition-all border"
        :class="activeTab === tab.id
          ? 'bg-indigo-600 text-white border-indigo-600 shadow-sm'
          : 'bg-white text-slate-600 border-slate-200 hover:border-indigo-300 hover:text-indigo-600'"
      >
        {{ tab.icon }} {{ tab.label }}
      </button>
    </div>

    <!-- iframe Container -->
    <div class="bg-white border border-slate-200 rounded-xl overflow-hidden shadow-sm">
      <div class="w-full" style="height: 720px;">
        <iframe
          v-if="currentTab"
          :src="currentTab.url"
          :key="currentTab.id"
          class="w-full h-full border-0"
          allow="fullscreen"
          loading="lazy"
          :title="currentTab.label"
        ></iframe>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, computed } from 'vue'

const tabs = [
  { id: 'cpu', label: 'CPU 调度算法', icon: '⚡', url: '/InteractiveWebpage/cpu-scheduler/index.html' },
  { id: 'banker', label: '银行家安全算法', icon: '🏦', url: '/InteractiveWebpage/banker/index.html' },
  { id: 'page', label: '页面置换算法', icon: '📄', url: '/InteractiveWebpage/page-replacement/index.html' },
  { id: 'disk', label: '磁盘调度算法', icon: '💽', url: '/InteractiveWebpage/disk-scheduler/index.html' },
  { id: 'process', label: '进程状态转换', icon: '🔄', url: '/InteractiveWebpage/process-states/index.html' },
]

const activeTab = ref('cpu')

const currentTab = computed(() => tabs.find(t => t.id === activeTab.value))
</script>

<style scoped>
</style>
