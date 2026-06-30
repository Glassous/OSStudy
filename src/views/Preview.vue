<template>
  <div class="min-h-screen bg-slate-50 py-4 px-4 flex flex-col items-center">
    <div class="w-full max-w-full bg-white border border-slate-200 rounded-xl shadow-xs overflow-hidden flex flex-col">
      <!-- Preview Header -->
      <header class="px-6 py-4 border-b border-slate-100 flex items-center justify-between bg-slate-50/50">
        <div>
          <h1 class="font-extrabold text-slate-900 text-sm flex items-center gap-2">
            <span>📄</span> 在线文档预览中心
          </h1>
          <p class="text-[10px] text-slate-400 font-bold uppercase tracking-wider mt-0.5">
            当前文件: {{ fileName }}
          </p>
        </div>
        <button 
          @click="closeWindow" 
          class="px-3.5 py-1.5 border border-slate-200 bg-white hover:bg-slate-100 rounded text-xs font-bold text-slate-600 transition-colors cursor-pointer"
        >
          关闭当前页
        </button>
      </header>

      <!-- Loading / Error states -->
      <div v-if="loading" class="p-20 text-center text-slate-400 space-y-3">
        <div class="inline-block w-8 h-8 border-4 border-indigo-600 border-t-transparent rounded-full animate-spin"></div>
        <p class="text-[10px] font-bold uppercase tracking-wider">正在加载文档并解析...</p>
      </div>
      <div v-else-if="error" class="p-20 text-center text-red-500 font-semibold space-y-3">
        <p class="text-xs">⚠️ {{ error }}</p>
        <button @click="fetchMarkdown" class="px-4 py-1.5 bg-indigo-600 text-white rounded text-xs font-bold hover:bg-indigo-700">重新加载</button>
      </div>

      <!-- Rendered HTML Content -->
      <div v-else class="p-8 prose prose-slate max-w-none text-slate-700 leading-relaxed font-sans overflow-x-auto">
        <div v-math v-html="renderedHtml" class="markdown-preview"></div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted } from 'vue'
import { useRoute } from 'vue-router'
import { marked } from 'marked'

const route = useRoute()
const fileName = ref(route.query.file || '')
const loading = ref(true)
const error = ref(null)
const renderedHtml = ref('')

const closeWindow = () => {
  window.close()
}

const fetchMarkdown = async () => {
  if (!fileName.value) {
    error.value = '未指定有效的文件名'
    loading.value = false
    return
  }
  
  loading.value = true
  error.value = null
  
  try {
    const url = 'https://file.glassous.top/OSStudy/' + encodeURIComponent(fileName.value)
    const res = await fetch(url)
    if (!res.ok) {
      throw new Error(`加载失败，HTTP 状态码: ${res.status}`)
    }
    const rawText = await res.text()
    
    // 配置 marked 选项
    marked.setOptions({
      gfm: true,
      breaks: true
    })
    
    renderedHtml.value = marked(rawText)
  } catch (err) {
    error.value = `获取文档内容失败: ${err.message}`
  } finally {
    loading.value = false
  }
}

onMounted(() => {
  fetchMarkdown()
})
</script>

<style>
/* Custom styled markdown elements matching site aesthetic */
.markdown-preview h1 {
  font-size: 1.4rem;
  font-weight: 800;
  color: #0f172a;
  margin-top: 1.6rem;
  margin-bottom: 0.8rem;
  border-bottom: 1px solid #f1f5f9;
  padding-bottom: 0.4rem;
}
.markdown-preview h2 {
  font-size: 1.2rem;
  font-weight: 700;
  color: #1e293b;
  margin-top: 1.4rem;
  margin-bottom: 0.6rem;
}
.markdown-preview h3 {
  font-size: 1.05rem;
  font-weight: 700;
  color: #334155;
  margin-top: 1.2rem;
  margin-bottom: 0.4rem;
}
.markdown-preview p {
  font-size: 0.825rem;
  margin-bottom: 0.8rem;
  color: #475569;
}
.markdown-preview pre {
  background-color: #0f172a;
  color: #f1f5f9;
  padding: 1rem;
  border-radius: 0.5rem;
  font-family: monospace;
  font-size: 0.75rem;
  overflow-x: auto;
  margin: 1rem 0;
  line-height: 1.6;
}
.markdown-preview code {
  font-family: monospace;
  background-color: #f1f5f9;
  color: #0f172a;
  padding: 0.1rem 0.3rem;
  border-radius: 0.2rem;
  font-size: 0.8em;
}
.markdown-preview pre code {
  background-color: transparent;
  color: inherit;
  padding: 0;
  border-radius: 0;
  font-size: inherit;
}
.markdown-preview ul {
  list-style-type: disc;
  list-style-position: inside;
  margin-bottom: 0.8rem;
  padding-left: 0.5rem;
  font-size: 0.825rem;
  color: #475569;
}
.markdown-preview ol {
  list-style-type: decimal;
  list-style-position: inside;
  margin-bottom: 0.8rem;
  padding-left: 0.5rem;
  font-size: 0.825rem;
  color: #475569;
}
.markdown-preview table {
  width: 100%;
  border-collapse: collapse;
  margin: 1rem 0;
  font-size: 0.75rem;
}
.markdown-preview th, .markdown-preview td {
  border: 1px solid #e2e8f0;
  padding: 0.5rem;
  text-align: left;
}
.markdown-preview th {
  background-color: #f8fafc;
  font-weight: bold;
  color: #1e293b;
}
.markdown-preview td {
  color: #475569;
}
.markdown-preview blockquote {
  border-left: 4px solid #4f46e5;
  padding-left: 1rem;
  color: #475569;
  font-style: italic;
  margin: 1rem 0;
}
</style>
