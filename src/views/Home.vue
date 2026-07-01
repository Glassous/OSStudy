<template>
  <div class="py-10 w-full px-6 md:px-12 max-w-none">
    <!-- Header Section -->
    <header class="mb-16 text-center md:text-left">
      <h1 class="text-4xl md:text-5xl font-extrabold text-slate-950 tracking-tight mb-4">
        操作系统学习指南
      </h1>
    </header>

    <!-- Main Features Grid (Clickable Cards) -->
    <div class="grid grid-cols-1 md:grid-cols-2 gap-8 mb-8">
      
      <!-- Theory Card -->
      <router-link 
        to="/chapter1" 
        class="group block p-6 border border-slate-200 rounded-lg hover:border-indigo-500 hover:shadow-xs transition-all duration-300 bg-white"
      >
        <div class="flex items-center justify-between mb-4">
          <h2 class="text-xl font-extrabold text-slate-900 flex items-center gap-2 group-hover:text-indigo-600 transition-colors">
            <span>📚</span> 理论体系章节
          </h2>
          <span class="text-xs font-bold text-slate-400 group-hover:text-indigo-500 transition-colors">开始学习 &rarr;</span>
        </div>
        <p class="text-slate-600 text-sm leading-relaxed">
          系统化学术体系，精讲 11 大理论章节。内置考纲核心知识点大纲，课后同步习题原题全部覆盖，包含参考答案与深度剖析，为您梳理完整的操作系统知识脉络。
        </p>
      </router-link>

      <!-- Algorithm Card -->
      <router-link 
        to="/algorithm-cpu/fcfs" 
        class="group block p-6 border border-slate-200 rounded-lg hover:border-indigo-500 hover:shadow-xs transition-all duration-300 bg-white"
      >
        <div class="flex items-center justify-between mb-4">
          <h2 class="text-xl font-extrabold text-slate-900 flex items-center gap-2 group-hover:text-indigo-600 transition-colors">
            <span>⚡</span> 算法设计专题
          </h2>
          <span class="text-xs font-bold text-slate-400 group-hover:text-indigo-500 transition-colors">开始演练 &rarr;</span>
        </div>
        <p class="text-slate-600 text-sm leading-relaxed">
          精选操作系统六大硬核算法专题。包含详细解题步骤、数学公式及经典 PV 操作同步互斥代码，结合可视化图形交互计算器，帮您彻底攻克期末计算与设计难关。
        </p>
      </router-link>

    </div>

    <!-- Premium Resource Download Banner (Subtitle Removed) -->
    <div class="mb-16 p-6 border border-indigo-150 bg-indigo-50/30 rounded-lg flex flex-col md:flex-row items-center justify-between gap-6">
      <div class="space-y-1 text-center md:text-left">
        <h3 class="text-lg font-extrabold text-indigo-950 flex items-center justify-center md:justify-start gap-2">
          <span>📂</span> 操作系统学习课件与习题资源
        </h3>
      </div>
      <button 
        @click="isDownloadModalOpen = true"
        class="flex-shrink-0 px-5 py-2.5 bg-indigo-600 hover:bg-indigo-700 text-white rounded-lg text-sm font-bold shadow-xs hover:shadow-sm transition-all duration-300 select-none cursor-pointer"
      >
        资源下载中心 &rarr;
      </button>
    </div>

    <!-- Chapters & Algorithms Grid (Clickable Cards) -->
    <section class="mb-12">
      <h2 class="text-2xl font-extrabold text-slate-950 mb-8 border-b border-slate-100 pb-3">
        目录
      </h2>
      <div class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
        <router-link 
          v-for="(item, index) in dashboardItems" 
          :key="index"
          :to="item.link"
          class="group block p-5 border border-slate-200 rounded-lg hover:border-indigo-500 hover:shadow-xs transition-all duration-200 bg-white"
        >
          <div class="flex justify-between items-center mb-3">
            <span class="text-[10px] font-bold uppercase tracking-wider text-slate-400 group-hover:text-indigo-500">
              {{ item.type }}
            </span>
            <span class="text-[9px] font-bold px-2 py-0.5 rounded" :class="item.type === 'Theory' ? 'bg-indigo-50 text-indigo-700' : 'bg-amber-50 text-amber-700'">
              {{ item.tag }}
            </span>
          </div>
          <h3 class="font-extrabold text-slate-900 text-sm group-hover:text-indigo-600 transition-colors mb-1">
            {{ item.title }}
          </h3>
          <p class="text-[11px] text-slate-500 line-clamp-2 leading-relaxed">
            {{ item.desc }}
          </p>
        </router-link>
      </div>
    </section>

    <!-- Modal Popup for Resource Downloads (Subtitles Removed, Force Download and Preview buttons added) -->
    <div 
      v-if="isDownloadModalOpen" 
      class="fixed inset-0 bg-slate-900/40 backdrop-blur-xs z-50 flex items-center justify-center p-4 animate-fade-in"
      @click.self="isDownloadModalOpen = false"
    >
      <!-- Modal Content Card -->
      <div class="bg-white rounded-xl shadow-xl w-full max-w-lg max-h-[80vh] flex flex-col overflow-hidden">
        
        <!-- Header (Subtitle Removed) -->
        <div class="px-6 py-4 border-b border-slate-100 flex items-center justify-between bg-slate-50/50">
          <div>
            <h3 class="font-extrabold text-slate-900 text-base">学习资源下载中心</h3>
          </div>
          <button 
            @click="isDownloadModalOpen = false"
            class="w-8 h-8 rounded-full border border-slate-200 hover:bg-slate-100 flex items-center justify-center text-slate-500 transition-colors font-semibold text-lg cursor-pointer"
          >
            &times;
          </button>
        </div>

        <!-- Scrollable Resource List -->
        <div class="flex-1 overflow-y-auto p-6 space-y-3">
          <div 
            v-for="(res, idx) in downloadResources" 
            :key="idx"
            class="flex items-center justify-between p-3.5 border border-slate-200 rounded-lg hover:border-indigo-400 transition-colors bg-white shadow-2xs"
          >
            <div class="flex items-center gap-3">
              <span class="text-2xl select-none">{{ res.type === 'md' ? '📝' : '📕' }}</span>
              <div>
                <h4 class="text-xs font-bold text-slate-800 line-clamp-1 pr-4">{{ res.name }}</h4>
                <span class="text-[9px] font-bold text-slate-400 uppercase tracking-wider">{{ res.size }}</span>
              </div>
            </div>
            
            <div class="flex items-center gap-2 flex-shrink-0">
              <!-- Preview Button -->
              <button 
                @click="previewFile(res)"
                class="px-3 py-1.5 border border-slate-250 hover:bg-slate-50 text-[10px] font-bold rounded transition-colors cursor-pointer select-none text-slate-700 min-w-[56px]"
              >
                预览
              </button>
              
              <!-- Download Button (Triggers forced download helper) -->
              <button 
                @click="downloadFile(res)"
                class="px-3.5 py-1.5 bg-slate-950 hover:bg-indigo-600 text-white rounded text-[10px] font-bold transition-colors select-none text-center min-w-[56px] cursor-pointer"
              >
                下载
              </button>
            </div>
          </div>
        </div>
        
        <!-- Footer -->
        <div class="px-6 py-4 border-t border-slate-100 bg-slate-50/50 text-center">
          <button 
            @click="isDownloadModalOpen = false"
            class="px-5 py-2 border border-slate-200 rounded-md hover:bg-slate-100 text-xs font-bold text-slate-600 transition-colors cursor-pointer"
          >
            关闭窗口
          </button>
        </div>

      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, computed } from 'vue'

const isDownloadModalOpen = ref(false)

// 资源下载的列表，基于 file.glassous.top/OSStudy/
const downloadResources = [
  { name: '操作系统算法与代码设计题.md', type: 'md', size: '约 60 KB' },
  { name: '第1章-操作系统概述-习题及参考答案.pdf', type: 'pdf', size: '约 1.2 MB' },
  { name: '第2章-进程与线程-习题及参考答案.pdf', type: 'pdf', size: '约 1.5 MB' },
  { name: '第3章-进程同步-习题及参考答案.pdf', type: 'pdf', size: '约 2.1 MB' },
  { name: '第4章-处理机调度-习题及参考答案.pdf', type: 'pdf', size: '约 1.8 MB' },
  { name: '第5章-死锁-习题及参考答案.pdf', type: 'pdf', size: '约 1.4 MB' },
  { name: '第6章-内存管理-习题及参考答案.pdf', type: 'pdf', size: '约 2.3 MB' },
  { name: '第7章-虚拟存储管理-习题及参考答案.pdf', type: 'pdf', size: '约 1.9 MB' },
  { name: '第8章-设备管理-习题及参考答案.pdf', type: 'pdf', size: '约 1.6 MB' },
  { name: '第9章-文件管理-习题及参考答案.pdf', type: 'pdf', size: '约 2.0 MB' },
  { name: '第10章-系统安全-习题及参考答案.pdf', type: 'pdf', size: '约 1.1 MB' }
]

const getDownloadUrl = (fileName) => {
  return 'https://file.glassous.top/OSStudy/' + encodeURIComponent(fileName)
}

// 预览函数：PDF直接在新标签页打开，Markdown跳到自定义的 /preview 路由页面并在新标签页加载
const previewFile = (res) => {
  const url = getDownloadUrl(res.name)
  if (res.type === 'md') {
    window.open(`/preview?file=${encodeURIComponent(res.name)}`, '_blank')
  } else {
    window.open(url, '_blank')
  }
}

// 强制下载函数：通过 Fetch 请求资源 Blob 并创建 Object URL 触发客户端下载，绕过跨域直接打开的限制
const downloadFile = async (res) => {
  const url = getDownloadUrl(res.name)
  try {
    const response = await fetch(url)
    if (!response.ok) throw new Error('网络请求异常')
    const blob = await response.blob()
    const blobUrl = URL.createObjectURL(blob)
    
    const a = document.createElement('a')
    a.href = blobUrl
    a.download = res.name
    document.body.appendChild(a)
    a.click()
    document.body.removeChild(a)
    URL.revokeObjectURL(blobUrl)
  } catch (err) {
    // 降级策略：在无法 Fetch 时使用新页面打开
    window.open(url, '_blank')
  }
}

const dashboardItems = computed(() => [
  { type: 'Theory', tag: '理论', title: '第1章 操作系统概述', desc: '操作系统的基本定义、特征、历史发展与分类、以及微内核等核心基础概念。', link: '/chapter1' },
  { type: 'Theory', tag: '理论', title: '第2章 进程与线程', desc: '程序并发执行、进程状态机变换、线程概念与分类，以及消息队列等进程通信。', link: '/chapter2' },
  { type: 'Theory', tag: '理论', title: '第3章 进程同步', desc: '临界区互斥、PV 操作原语规则、管程与条件变量，以及经典的生产者消费者问题。', link: '/chapter3' },
  { type: 'Theory', tag: '理论', title: '第4章 处理机调度', desc: '高、中、低三级处理机调度，调度时机选择，以及 FCFS、SJF、HRRN 算法原理。', link: '/chapter4' },
  { type: 'Theory', tag: '理论', title: '第5章 死锁', desc: '死锁的特征原因，产生死锁的 4 个必要条件，预防避免与银行家算法原理。', link: '/chapter5' },
  { type: 'Theory', tag: '理论', title: '第6章 内存管理', desc: '分区连续分配，物理与逻辑地址转换，重定位技术，以及基本分页分段管理。', link: '/chapter6' },
  { type: 'Theory', tag: '理论', title: '第7章 虚拟存储管理', desc: '请求分页存储管理、缺页中断，OPT/FIFO/LRU 页面置换，以及系统抖动与工作集。', link: '/chapter7' },
  { type: 'Theory', tag: '理论', title: '第8章 设备管理', desc: '中断/DMA/通道 I/O 控制演进，缓冲区管理，SPOOLing 假脱机以及磁盘访问。', link: '/chapter8' },
  { type: 'Theory', tag: '理论', title: '第9章 文件管理', desc: '文件逻辑物理块分配（链接/索引），树形文件目录 inode 索引，及外存空间成组链接。', link: '/chapter9' },
  { type: 'Theory', tag: '理论', title: '第10章 系统安全', desc: '操作系统面临的安全威胁（木马/蠕虫），访问控制矩阵、控制列表与能力表。', link: '/chapter10' },
  { type: 'Theory', tag: '理论', title: '第11章 操作系统接口', desc: '命令行及图形用户接口，系统调用（陷阱/访管指令）运行机制，及 API 区别。', link: '/chapter11' },
  
  { type: 'Algorithm', tag: '算法', title: '模块一：CPU 调度算法', desc: '集成 FCFS, SJF, SRTF, RR, 优先级, HRRN, MFQ, 公平调度算法计算器与甘特图绘制器。', link: '/algorithm-cpu/fcfs' },
  { type: 'Algorithm', tag: '算法', title: '模块二：银行家安全算法', desc: '死锁避免银行家算法求取安全序列，动态展示 Work-Need 检查表的执行逻辑。', link: '/algorithm-banker/theory' },
  { type: 'Algorithm', tag: '算法', title: '模块三：页面置换算法', desc: '计算 OPT, FIFO, LRU, CLOCK, LFU 的页面调度轨迹，统计总缺页率与命中率。', link: '/algorithm-page/opt' },
  { type: 'Algorithm', tag: '算法', title: '模块四：磁盘调度算法', desc: '模拟计算 FCFS, SSTF, SCAN, C-SCAN, N-Step SCAN 的寻道磁道轨迹及计算总移动长度。', link: '/algorithm-disk/fcfs' },
  { type: 'Algorithm', tag: '算法', title: '模块五：经典 PV 操作', desc: '整理生产者消费者、读者写者、哲学家进餐 3 大经典同步问题满分代码。', link: '/algorithm-pv/producer-consumer' },
  { type: 'Algorithm', tag: '算法', title: '模块六：文件系统空间与索引', desc: '计算多级混合索引支持的最大文件物理长度，推导任意字节偏移的磁盘读盘次数。', link: '/algorithm-file/capacity' }
])
</script>

<style scoped>
.animate-fade-in {
  animation: fadeIn 0.25s cubic-bezier(0.4, 0, 0.2, 1) forwards;
}

@keyframes fadeIn {
  from {
    opacity: 0;
    transform: scale(0.95);
  }
  to {
    opacity: 1;
    transform: scale(1);
  }
}
</style>
