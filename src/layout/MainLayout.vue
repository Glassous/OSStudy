<template>
  <div class="min-h-screen bg-slate-50 flex flex-col font-sans antialiased text-slate-800">
    
    <!-- Mobile Navbar Header -->
    <header class="md:hidden sticky top-0 z-30 bg-white border-b border-slate-200 px-4 py-3 flex items-center justify-between">
      <div class="flex items-center space-x-2">
        <!-- Logo Image replaces Icon -->
        <img src="/OSBook.png" alt="Logo" class="w-6 h-6 object-contain rounded" />
        <span class="font-extrabold text-slate-900 tracking-tight">OS Study Guide</span>
      </div>
      <button 
        @click="isMobileMenuOpen = !isMobileMenuOpen"
        class="p-2 border border-slate-200 rounded-md hover:bg-slate-50 transition-colors"
      >
        <component :is="isMobileMenuOpen ? XIcon : MenuIcon" class="w-5 h-5 text-slate-600" />
      </button>
    </header>

    <div class="flex flex-1 relative">
      <!-- Sidebar Container -->
      <aside 
        class="fixed inset-y-0 left-0 z-40 w-72 bg-white border-r border-slate-200 transform md:transform-none transition-transform duration-300 ease-in-out flex flex-col"
        :class="isMobileMenuOpen ? 'translate-x-0' : '-translate-x-full md:translate-x-0'"
      >
        <!-- Sidebar Header (desktop only) -->
        <div class="hidden md:flex items-center justify-between px-6 py-5 border-b border-slate-100 bg-white">
          <div class="flex items-center space-x-3">
            <!-- Logo Image replaces Icon -->
            <img src="/OSBook.png" alt="Logo" class="w-8 h-8 object-contain rounded shadow-xs" />
            <div>
              <h2 class="font-extrabold text-slate-950 text-base leading-tight tracking-tight">OS Study</h2>
              <p class="text-[10px] text-slate-400 font-bold uppercase tracking-wider">操作系统学习指南</p>
            </div>
          </div>
          <!-- GitHub Link -->
          <a 
            href="https://github.com/Glassous/OSStudy" 
            target="_blank" 
            rel="noopener noreferrer"
            class="text-slate-500 hover:text-slate-950 transition-colors p-1.5 hover:bg-slate-50 rounded-md"
            title="GitHub Repository"
          >
            <svg viewBox="0 0 16 16" width="20" height="20" fill="currentColor">
              <path d="M8 0c4.42 0 8 3.58 8 8a8.013 8.013 0 0 1-5.45 7.59c-.4.08-.55-.17-.55-.38 0-.27.01-1.13.01-2.2 0-.75-.25-1.23-.54-1.48 1.78-.2 3.65-.88 3.65-3.95 0-.88-.31-1.59-.82-2.15.08-.2.36-1.02-.08-2.12 0 0-.67-.22-2.2.82-.64-.18-1.32-.27-2-.27-.68 0-1.36.09-2 .27-1.53-1.03-2.2-.82-2.2-.82-.44 1.1-.16 1.92-.08 2.12-.51.56-.82 1.28-.82 2.15 0 3.06 1.86 3.75 3.64 3.95-.23.2-.44.55-.51 1.07-.46.21-1.61.55-2.33-.66-.15-.24-.6-.83-1.23-.82-.67.01-.27.38.01.53.34.19.73.9.82 1.13.16.45.68 1.35 3.12.88.01.64.01 1.25.01 1.48 0 .21-.15.48-.55.38A7.995 7.995 0 0 1 0 8c0-4.42 3.58-8 8-8z"/>
            </svg>
          </a>
        </div>

        <!-- Navigation Lists -->
        <nav class="flex-1 overflow-y-auto px-4 py-6 space-y-6">
          
          <!-- Home Link -->
          <div>
            <router-link 
              to="/" 
              class="flex items-center space-x-3 px-3 py-2.5 rounded-md text-sm font-semibold text-slate-700 hover:bg-slate-50 hover:text-slate-900 transition-colors"
              active-class="bg-indigo-50 text-indigo-700 hover:bg-indigo-50 hover:text-indigo-700"
              @click="closeMobileMenu"
            >
              <HomeIcon class="w-4 h-4 text-slate-450" />
              <span>指南首页</span>
            </router-link>
          </div>

          <!-- Chapters Section (11 Chapters flat) -->
          <div>
            <h3 class="text-[10px] font-bold text-slate-400 uppercase tracking-wider px-3 mb-2">理论知识体系</h3>
            <div class="space-y-0.5">
              <router-link 
                v-for="item in chapters" 
                :key="item.path" 
                :to="`/${item.path}`"
                class="flex items-center space-x-3 px-3 py-2.5 rounded-md text-xs font-semibold text-slate-600 hover:bg-slate-50 hover:text-slate-900 transition-colors"
                active-class="bg-indigo-50 text-indigo-700 font-bold hover:bg-indigo-50"
                @click="closeMobileMenu"
              >
                <BookOpenIcon class="w-3.5 h-3.5 text-slate-400" />
                <span class="truncate">{{ item.meta.title }}</span>
              </router-link>
            </div>
          </div>

          <!-- Algorithms Section (6 top-level modules listed directly) -->
          <div>
            <h3 class="text-[10px] font-bold text-slate-400 uppercase tracking-wider px-3 mb-2">算法与代码设计</h3>
            <div class="space-y-1">
              <div 
                v-for="mod in algorithmModules" 
                :key="mod.path" 
                class="rounded-md overflow-hidden"
              >
                <!-- Module Header Button -->
                <button 
                  @click="toggleModule(mod.path, $event)"
                  class="w-full flex items-center justify-between px-3 py-2.5 rounded-md text-xs font-bold text-slate-600 hover:bg-slate-50 hover:text-slate-900 transition-colors"
                  :class="isModuleActive(mod.path) ? 'text-indigo-600 font-bold bg-slate-50/50' : ''"
                >
                  <div class="flex items-center space-x-3 truncate">
                    <CpuIcon class="w-3.5 h-3.5 text-slate-400 flex-shrink-0" :class="isModuleActive(mod.path) ? 'text-indigo-500' : ''" />
                    <span class="truncate">{{ mod.meta.title }}</span>
                  </div>
                  <component 
                    :is="expandedModules[mod.path] ? ChevronDownIcon : ChevronRightIcon" 
                    class="w-3 h-3 text-slate-400 flex-shrink-0"
                  />
                </button>

                <!-- Sub-topics/Algorithms list -->
                <div 
                  v-show="expandedModules[mod.path]"
                  class="pl-4 pr-2 py-0.5 space-y-0.5 bg-slate-50/30 border-l border-slate-100 ml-5"
                >
                  <router-link 
                    v-for="child in mod.children" 
                    :key="child.path"
                    :to="`/${mod.path}/${child.path}`"
                    class="block px-3 py-1.5 rounded text-[11px] font-semibold text-slate-500 hover:text-slate-900 transition-colors"
                    active-class="text-indigo-600 font-bold bg-indigo-50/50 border-r-2 border-indigo-600"
                    @click="closeMobileMenu"
                  >
                    {{ child.meta.title }}
                  </router-link>
                </div>
              </div>
            </div>
          </div>

        </nav>
      </aside>

      <!-- Main Layout Content Area -->
      <main class="flex-1 md:pl-72 min-h-screen flex flex-col bg-slate-50/30">
        <div class="flex-1 py-6">
          <router-view />
        </div>
      </main>

      <!-- Mobile Backdrop -->
      <div 
        v-if="isMobileMenuOpen" 
        @click="isMobileMenuOpen = false"
        class="fixed inset-0 bg-slate-900/20 backdrop-blur-xs z-30 md:hidden"
      ></div>
    </div>
  </div>
</template>

<script setup>
import { ref, reactive, computed, watch, nextTick } from 'vue'
import { useRoute } from 'vue-router'
import { menuStructure } from '../router'
import { 
  BookOpen as BookOpenIcon, 
  Cpu as CpuIcon, 
  Home as HomeIcon, 
  ChevronDown as ChevronDownIcon, 
  ChevronRight as ChevronRightIcon,
  Menu as MenuIcon,
  X as XIcon
} from '@lucide/vue'

const route = useRoute()
const isMobileMenuOpen = ref(false)

// 拆分理论章节与算法模块
const chapters = computed(() => {
  return menuStructure.filter(item => !item.children)
})

const algorithmModules = computed(() => {
  return menuStructure.filter(item => !!item.children)
})

// 默认展开当前访问的算法模块
const expandedModules = reactive({})

watch(() => route.path, () => {
  algorithmModules.value.forEach(mod => {
    if (route.path.startsWith(`/${mod.path}`)) {
      expandedModules[mod.path] = true
    }
  })
}, { immediate: true })

const toggleModule = (path, event) => {
  expandedModules[path] = !expandedModules[path]
  if (expandedModules[path] && event) {
    nextTick(() => {
      const btn = event.target.closest('button')
      if (btn) {
        btn.scrollIntoView({ behavior: 'smooth', block: 'nearest' })
      }
    })
  }
}

const isModuleActive = (path) => {
  return route.path.startsWith(`/${path}`)
}

const closeMobileMenu = () => {
  isMobileMenuOpen.value = false
}
</script>

<style scoped>
</style>
