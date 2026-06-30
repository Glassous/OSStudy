<template>
  <div class="py-10 max-w-4xl mx-auto px-4">
    <!-- Breadcrumbs -->
    <nav class="flex items-center space-x-2 text-sm text-slate-500 mb-6">
      <router-link to="/" class="hover:text-indigo-600 transition-colors">首页</router-link>
      <span class="text-slate-300">/</span>
      <span class="text-slate-900 font-medium">{{ title }}</span>
    </nav>

    <!-- Chapter Header -->
    <header class="border-b border-slate-200 pb-6 mb-8">
      <h1 class="text-3xl font-extrabold text-slate-950 tracking-tight">
        {{ title }}
      </h1>
      <p class="text-sm text-slate-400 mt-2">理论章节与课后例题习题库</p>
    </header>

    <!-- Custom Tabs Navigation (Only 2 Tabs) -->
    <div class="flex border-b border-slate-200 mb-8 space-x-8">
      <button 
        v-for="tab in tabs" 
        :key="tab.id"
        @click="activeTab = tab.id"
        class="pb-4 text-sm font-bold relative transition-colors duration-200"
        :class="activeTab === tab.id ? 'text-indigo-600' : 'text-slate-500 hover:text-slate-800'"
      >
        <span class="flex items-center gap-2">
          <span>{{ tab.icon }}</span>
          {{ tab.name }}
        </span>
        <span 
          v-if="activeTab === tab.id" 
          class="absolute bottom-0 left-0 right-0 h-0.5 bg-indigo-600 rounded-full"
        ></span>
      </button>
    </div>

    <!-- Active Tab Content Area -->
    <div class="min-h-[400px]">
      
      <!-- 1. 核心内容讲解 -->
      <div v-math v-if="activeTab === 'lecture'" class="space-y-8 animate-fade-in">
        <!-- Chapter Lecture Overview -->
        <div class="p-5 bg-indigo-50/50 border border-indigo-100/50 rounded-lg">
          <h3 class="text-xs font-bold text-indigo-700 uppercase tracking-wider mb-2">本章核心导学</h3>
          <p class="text-slate-600 text-sm leading-relaxed">
            {{ lectureData?.overview || '正在加载本章理论概要...' }}
          </p>
        </div>

        <!-- Lecture Sections -->
        <div class="space-y-8 mt-6">
          <section 
            v-for="(sect, idx) in lectureData?.sections" 
            :key="idx"
            class="bg-white p-6 border border-slate-200 rounded-lg"
          >
            <h2 class="text-lg font-extrabold text-slate-900 mb-4 border-l-4 border-indigo-600 pl-3 flex items-center justify-between">
              <span>{{ sect.title }}</span>
              <span class="text-xs font-bold text-slate-300">SECTION 0{{ idx + 1 }}</span>
            </h2>
            <div 
              class="prose prose-slate max-w-none text-slate-650 text-sm leading-relaxed" 
              v-html="sect.content"
            ></div>
          </section>
          
          <div v-if="!lectureData?.sections || lectureData.sections.length === 0" class="text-center py-12 text-slate-400">
            暂无本章详细讲解内容
          </div>
        </div>
      </div>

      <!-- 2. 章节同步例题 (包含题目、参考答案与嵌入式代码块/公式块、以及深度解析) -->
      <div v-math v-else-if="activeTab === 'questions'" class="space-y-6 animate-fade-in">
        <div class="flex items-center justify-between mb-4">
          <p class="text-sm text-slate-500">本章共收录 <strong>{{ parsedQuestions.length }}</strong> 道课后例题。以下包含标准答案及考点解析。</p>
          <button 
            @click="toggleAllSolutions"
            class="text-xs font-bold text-indigo-600 hover:text-indigo-800 transition-colors cursor-pointer"
          >
            {{ allExpanded ? '折叠全部深度解析' : '展开全部深度解析' }}
          </button>
        </div>

        <div class="space-y-6">
          <div 
            v-for="(q, idx) in parsedQuestions" 
            :key="idx"
            class="p-6 border border-slate-200 rounded-lg bg-white shadow-xs"
          >
            <!-- Question Title with Fixed Consecutive Numbers -->
            <div class="flex items-start gap-4 mb-4">
              <span class="flex-shrink-0 w-8 h-8 rounded-full bg-slate-100 flex items-center justify-center text-xs font-bold text-slate-600">
                {{ idx + 1 }}
              </span>
              <h4 class="font-extrabold text-slate-900 text-base leading-relaxed pt-0.5">
                {{ q.question }}
              </h4>
            </div>
            
            <!-- Answer Area (With Code Blocks and Formula Blocks) -->
            <div class="pl-12 border-t border-slate-100 pt-4 mt-3">
              <div class="flex gap-2 mb-2">
                <span class="px-2 py-0.5 text-[10px] font-bold uppercase tracking-wider bg-green-50 text-green-700 border border-green-100 rounded">
                  参考答案
                </span>
              </div>
              <!-- Code and formulas rendered as clean custom styled blocks -->
              <div 
                class="text-slate-650 text-sm leading-relaxed" 
                v-html="formatContentToHtml(q.answer)"
              ></div>
            </div>

            <!-- Embedded Deep AI Analysis (Collapsible Accordion inside the card) -->
            <div class="pl-12 mt-4 pt-3 border-t border-dashed border-slate-100">
              <button 
                @click="toggleSolution(idx)"
                class="flex items-center gap-1.5 text-xs font-bold text-indigo-600 hover:text-indigo-850 transition-colors cursor-pointer"
              >
                <span>{{ expandedSolutions[idx] ? '▲ 折叠深度解析' : '▼ 展开深度解析 / 考点剖析' }}</span>
              </button>
              
              <div 
                v-show="expandedSolutions[idx]"
                class="mt-3 p-4 bg-slate-50 border border-slate-200 rounded text-xs text-slate-600 leading-relaxed whitespace-pre-line font-sans"
              >
                {{ getExplanationFor(q.id, q.question, q.answer) }}
              </div>
            </div>

          </div>
        </div>

        <div v-if="parsedQuestions.length === 0" class="text-center py-20 bg-slate-50 rounded-lg">
          <span class="text-3xl block mb-2">📋</span>
          <p class="text-slate-400 text-sm">本章暂无习题数据</p>
        </div>
      </div>

    </div>


  </div>
</template>

<script setup>
import { ref, computed, watch, reactive } from 'vue'
import { useRoute } from 'vue-router'
import { rawTexts } from '../data/chaptersRaw.js'
import { chapterLectures } from '../data/chapterLectures.js'
import { customExplanations, generateFallbackExplanation } from '../data/chaptersExplanation.js'
import { parseChapterQuestions, formatContentToHtml } from '../utils/parser.js'

const route = useRoute()

const activeTab = ref('lecture')
const expandedSolutions = reactive({})
const allExpanded = ref(false)

// 只保留前两个 Tab
const tabs = [
  { id: 'lecture', name: '核心内容讲解', icon: '📖' },
  { id: 'questions', name: '章节同步例题', icon: '✏️' }
]

// 基础元数据
const title = computed(() => route.meta.title || '')
const chapterPath = computed(() => route.name || '')

// 获取并解析当前章节的题目
const parsedQuestions = computed(() => {
  const rawText = rawTexts[chapterPath.value] || ''
  return parseChapterQuestions(rawText)
})

// 获取当前章节的讲解内容
const lectureData = computed(() => {
  return chapterLectures[chapterPath.value] || null
})

// 生成题目对应的专属解析或通用分析
const getExplanationFor = (qId, question, answer) => {
  const key = `${chapterPath.value}-${qId}`
  if (customExplanations[key]) {
    return customExplanations[key]
  }
  return generateFallbackExplanation(qId, question, answer)
}

// 初始化全部解析展开状态为关闭
watch(parsedQuestions, (newVal) => {
  newVal.forEach((q, idx) => {
    expandedSolutions[idx] = false
  })
  allExpanded.value = false
}, { immediate: true })

// 监听路由改变，重置当前 Tab
watch(() => route.path, () => {
  activeTab.value = 'lecture'
})

const toggleSolution = (idx) => {
  expandedSolutions[idx] = !expandedSolutions[idx]
}

const toggleAllSolutions = () => {
  allExpanded.value = !allExpanded.value
  parsedQuestions.value.forEach((q, idx) => {
    expandedSolutions[idx] = allExpanded.value
  })
}


</script>

<style scoped>
.animate-fade-in {
  animation: fadeIn 0.2s cubic-bezier(0.4, 0, 0.2, 1) forwards;
}

@keyframes fadeIn {
  from {
    opacity: 0;
    transform: translateY(4px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
}
</style>
