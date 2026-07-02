<template>
  <div class="py-10 w-full px-6 md:px-12 max-w-none">
    <!-- Breadcrumbs -->
    <nav class="flex items-center space-x-2 text-sm text-slate-500 mb-6">
      <router-link to="/" class="hover:text-indigo-600 transition-colors">首页</router-link>
      <span class="text-slate-300">/</span>
      <span class="text-slate-900 font-bold">必会知识点</span>
    </nav>

    <!-- Header Section -->
    <header class="border-b border-slate-200 pb-6 mb-8">
      <h1 class="text-4xl font-extrabold text-slate-950 tracking-tight flex items-center gap-3">
        <span class="text-indigo-600">🎯</span> 核心必会知识点复习
      </h1>
      <p class="text-base text-slate-400 mt-2">精选期末与考研高频考点，涵盖简答、应用及算法设计题</p>
    </header>

    <!-- Navigation Tabs -->
    <div class="flex border-b border-slate-200 mb-8 space-x-8">
      <button 
        v-for="tab in tabs" 
        :key="tab.id"
        @click="activeTab = tab.id"
        class="pb-4 text-base font-bold relative transition-colors duration-250 cursor-pointer"
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
    <div class="space-y-6 min-h-[400px]">

      <!-- 1. 简答题板块 -->
      <div v-if="activeTab === 'short'" v-math class="space-y-6 animate-fade-in">
        <p class="text-slate-655 text-base md:text-lg leading-relaxed">
          共收录 <strong>{{ shortAnswers.length }}</strong> 道高频核心简答题。
        </p>

        <div class="space-y-6">
          <div 
            v-for="(item, idx) in shortAnswers" 
            :key="idx"
            class="border border-slate-200 rounded-lg bg-white overflow-hidden shadow-xs hover:border-slate-350 transition-all duration-205"
          >
            <!-- Header (Question) -->
            <div class="px-6 py-4 bg-slate-50/50 border-b border-slate-100">
              <div class="flex items-start gap-3">
                <span class="inline-flex items-center justify-center w-6 h-6 rounded bg-indigo-50 text-indigo-700 text-xs font-bold flex-shrink-0 select-none">Q{{ idx + 1 }}</span>
                <h4 class="font-extrabold text-slate-900 text-lg md:text-xl leading-relaxed">{{ item.question }}</h4>
              </div>
            </div>

            <!-- Body (Answer) -->
            <div class="px-6 py-5 bg-white">
              <div class="text-slate-655 text-base md:text-lg leading-relaxed prose prose-slate max-w-none" v-html="renderMarkdown(item.answer)"></div>
            </div>
          </div>
        </div>
      </div>

      <!-- 2. 应用题板块 -->
      <div v-else-if="activeTab === 'app'" v-math class="space-y-8 animate-fade-in">
        <div class="bg-indigo-50/50 border border-indigo-100 p-5 rounded-lg text-slate-700 text-base md:text-lg leading-relaxed">
          💡 <strong>应用题复习指南：</strong> 以下梳理了本项目涉及的所有核心计算与推导算法。带 <span class="inline-flex items-center px-1.5 py-0.5 rounded text-xs font-bold bg-amber-100 text-amber-800">★ 重点</span> 标记的为大纲及考研最核心考点，需熟练掌握其计算细节。
        </div>

        <div class="grid grid-cols-1 gap-6">
          <!-- 1. 处理机调度 -->
          <div class="bg-white p-6 border border-slate-200 rounded-lg">
            <h3 class="text-xl font-extrabold text-slate-900 mb-4 border-l-4 border-indigo-600 pl-3 flex items-center justify-between">
              <span>1. 处理机调度算法</span>
              <span class="text-xs font-bold text-slate-350">CPU Scheduling</span>
            </h3>
            <div class="space-y-4">
              <p class="text-slate-655 text-base md:text-lg leading-relaxed">本项目中涵盖以下 8 种 CPU 调度算法：</p>
              <div class="grid grid-cols-1 md:grid-cols-2 gap-3">
                <div v-for="algo in cpuAlgos" :key="algo.name" class="p-4 border rounded-lg flex flex-col justify-between" :class="algo.important ? 'border-amber-200 bg-amber-50/30' : 'border-slate-100 bg-slate-50/30'">
                  <div class="flex items-center justify-between">
                    <span class="font-bold text-base" :class="algo.important ? 'text-slate-900' : 'text-slate-700'">{{ algo.name }}</span>
                    <span v-if="algo.important" class="inline-flex items-center px-1.5 py-0.5 rounded text-xs font-bold bg-amber-100 text-amber-800">★ 重点</span>
                  </div>
                  <span class="text-slate-550 text-sm md:text-base leading-relaxed mt-2">{{ algo.desc }}</span>
                </div>
              </div>
            </div>
          </div>

          <!-- 2. 银行家算法 -->
          <div class="bg-white p-6 border border-slate-200 rounded-lg">
            <h3 class="text-xl font-extrabold text-slate-900 mb-4 border-l-4 border-indigo-600 pl-3 flex items-center justify-between">
              <span>2. 银行家算法 (Banker's Algorithm)</span>
              <span class="text-xs font-bold text-slate-350">Deadlock Avoidance</span>
            </h3>
            <div class="space-y-4 text-slate-655 text-base md:text-lg leading-relaxed">
              <p>银行家算法是最经典的<strong>死锁避免</strong>算法，通过在资源分配前进行“安全性检查”来确保系统始终处于安全状态。</p>
              <div class="p-5 bg-slate-50 border border-slate-200 rounded-lg space-y-2">
                <p class="font-bold text-slate-800 text-sm">⚠️ 核心计算要点：</p>
                <ul class="list-disc list-inside space-y-1.5 text-slate-600 text-sm md:text-base leading-relaxed">
                  <li><strong>矩阵公式：</strong> $\text{Need} = \text{Max} - \text{Allocation}$</li>
                  <li><strong>安全性条件：</strong> 寻找安全序列。当发现存在一个进程满足 $\text{Need}_i \le \text{Available}$，则假设该进程可顺利执行完毕，并回收其资源 $\text{Available} = \text{Available} + \text{Allocation}_i$。</li>
                  <li><strong>试分配规则：</strong> 进程提出 Request 后，先检查 $\text{Request}_i \le \text{Need}_i$ 且 $\text{Request}_i \le \text{Available}$。试分配后运行“安全性检查原语”，安全则分配，否则拒绝并令其等待。</li>
                </ul>
              </div>
            </div>
          </div>

          <!-- 3. 磁盘调度算法 -->
          <div class="bg-white p-6 border border-slate-200 rounded-lg">
            <h3 class="text-xl font-extrabold text-slate-900 mb-4 border-l-4 border-indigo-600 pl-3 flex items-center justify-between">
              <span>3. 磁盘调度算法</span>
              <span class="text-xs font-bold text-slate-350">Disk Scheduling</span>
            </h3>
            <div class="space-y-4">
              <p class="text-slate-655 text-base md:text-lg leading-relaxed">本项目中涵盖以下 5 种磁盘调度算法：</p>
              <div class="grid grid-cols-1 md:grid-cols-2 gap-3">
                <div v-for="algo in diskAlgos" :key="algo.name" class="p-4 border rounded-lg flex flex-col justify-between" :class="algo.important ? 'border-amber-200 bg-amber-50/30' : 'border-slate-100 bg-slate-50/30'">
                  <div class="flex items-center justify-between">
                    <span class="font-bold text-base" :class="algo.important ? 'text-slate-900' : 'text-slate-700'">{{ algo.name }}</span>
                    <span v-if="algo.important" class="inline-flex items-center px-1.5 py-0.5 rounded text-xs font-bold bg-amber-100 text-amber-800">★ 重点</span>
                  </div>
                  <span class="text-slate-550 text-sm md:text-base leading-relaxed mt-2">{{ algo.desc }}</span>
                </div>
              </div>
            </div>
          </div>

          <!-- 4. 页面置换算法 -->
          <div class="bg-white p-6 border border-slate-200 rounded-lg">
            <h3 class="text-xl font-extrabold text-slate-900 mb-4 border-l-4 border-indigo-600 pl-3 flex items-center justify-between">
              <span>4. 页面置换算法</span>
              <span class="text-xs font-bold text-slate-350">Page Replacement</span>
            </h3>
            <div class="space-y-4">
              <p class="text-slate-655 text-base md:text-lg leading-relaxed">本项目中涵盖以下 5 种页面置换算法：</p>
              <div class="grid grid-cols-1 md:grid-cols-2 gap-3">
                <div v-for="algo in pageAlgos" :key="algo.name" class="p-4 border rounded-lg flex flex-col justify-between" :class="algo.important ? 'border-amber-200 bg-amber-50/30' : 'border-slate-100 bg-slate-50/30'">
                  <div class="flex items-center justify-between">
                    <span class="font-bold text-base" :class="algo.important ? 'text-slate-900' : 'text-slate-700'">{{ algo.name }}</span>
                    <span v-if="algo.important" class="inline-flex items-center px-1.5 py-0.5 rounded text-xs font-bold bg-amber-100 text-amber-800">★ 重点</span>
                  </div>
                  <span class="text-slate-550 text-sm md:text-base leading-relaxed mt-2">{{ algo.desc }}</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <!-- 3. 算法设计题板块 -->
      <div v-else-if="activeTab === 'algo'" class="space-y-6 animate-fade-in">
        <div class="bg-white p-6 border border-slate-200 rounded-lg space-y-6">
          <h3 class="text-xl font-extrabold text-slate-900 border-l-4 border-indigo-600 pl-3 flex items-center justify-between">
            <span>1. 信号量 (Semaphore) 与 PV 操作算法设计</span>
            <span class="text-xs font-bold text-slate-350">Semaphore & PV Operations</span>
          </h3>

          <div class="text-slate-655 text-base md:text-lg leading-relaxed space-y-4">
            <p>信号量设计题是操作系统大题中的重难点，用于解决进程间的<strong>同步</strong>（合作）和<strong>互斥</strong>（竞争）关系。</p>
            
            <h4 class="font-bold text-slate-800 text-base">💡 解题通用模板（三步法）：</h4>
            <ol class="list-decimal list-inside space-y-1.5 text-slate-600">
              <li><strong>分析关系：</strong> 找出有哪些进程，它们之间是同步关系还是互斥关系。</li>
              <li><strong>定义信号量：</strong>
                <ul class="list-disc list-inside pl-6 mt-1 space-y-1">
                  <li><strong>互斥信号量：</strong> 控制对共享临界资源的访问，初值一般设为 <code>1</code>（例如 <code>mutex = 1</code>）。</li>
                  <li><strong>同步信号量：</strong> 控制进程的执行先后顺序，初值通常等于初始状态下对应资源的可利用数量（例如 <code>empty = N, full = 0</code>）。</li>
                </ul>
              </li>
              <li><strong>编写伪代码：</strong> 进程必须是无限循环结构（<code>while(true)</code>），P 操作在前，V 操作在后。互斥的 P、V 夹紧临界区代码，且<strong>同步 P 操作必须在互斥 P 操作之前</strong>（否则易引起死锁）。</li>
            </ol>

            <div class="bg-slate-900 text-slate-100 rounded-lg overflow-hidden font-mono text-sm shadow-sm mt-6">
              <div class="bg-slate-800 px-4 py-2 text-slate-400 flex justify-between items-center border-b border-slate-700">
                <span>经典“生产者-消费者”同步互斥代码模板</span>
              </div>
              <pre class="p-4 overflow-x-auto whitespace-pre-wrap leading-relaxed"><code>// ================== 信号量与缓冲区 definition ==================
semaphore mutex = 1;      // 互斥信号量，控制对缓冲区的互斥访问
semaphore empty = N;      // 同步信号量，表示空闲缓冲区槽位数
semaphore full = 0;       // 同步信号量，表示已填充缓冲区槽位数
Item buffer[N];           // 环形缓冲池
int in = 0, out = 0;      // 存、取指针

// ================== 生产者进程 ==================
void Producer() {
    while(true) {
        Item item = produce_item(); // 生产数据项
        
        P(empty);                  // 申请空缓冲区（同步）
        P(mutex);                  // 锁住缓冲区（互斥）
        
        buffer[in] = item;         // 放入数据
        in = (in + 1) % N;
        
        V(mutex);                  // 释放缓冲区（互斥）
        V(full);                   // 增加满缓冲区计数（同步）
    }
}

// ================== 消费者进程 ==================
void Consumer() {
    while(true) {
        P(full);                   // 申请满数据缓冲区（同步）
        P(mutex);                  // 锁住缓冲区（互斥）
        
        Item item = buffer[out];   // 取出数据
        out = (out + 1) % N;
        
        V(mutex);                  // 释放缓冲区（互斥）
        V(empty);                  // 增加空槽位计数（同步）
        
        consume_item(item);        // 消费数据项
    }
}</code></pre>
            </div>
          </div>
        </div>
      </div>

    </div>
  </div>
</template>

<script setup>
import { ref } from 'vue'
import { marked } from 'marked'

const renderMarkdown = (text) => {
  return marked.parse(text || '')
}

const tabs = [
  { id: 'short', name: '简答题精选', icon: '📝' },
  { id: 'app', name: '应用题考点', icon: '📊' },
  { id: 'algo', name: '算法设计题专题', icon: '⚙️' }
]

const activeTab = ref('short')

// 简答题数据
const shortAnswers = [
  {
    question: '操作系统的定义及作用',
    answer: '**一、操作系统的定义**\n操作系统（Operating System, OS）是计算机系统中最基本、最核心的**系统软件**。它是一组**有效管理和控制计算机系统硬件和软件资源**、合理组织和控制计算机工作流程，并**方便用户使用计算机**的程序和数据的集合。\n\n**二、操作系统的作用**\n操作系统在计算机系统中所起的作用主要体现在以下三个方面：\n\n1. **作为用户与计算机硬件系统之间的接口**：\n   OS 处于用户与硬件之间，方便用户操纵硬件和运行程序。通常提供以下三种接口：\n   - **命令行接口（CLI）**：如命令提示符、Terminal Shell 等，用户通过输入指令使用计算机。\n   - **图形用户接口（GUI）**：如窗口、图标、菜单等，允许用户直观交互。\n   - **系统调用（System Call）**：OS 提供给应用程序的编程接口（API），如进程创建中的 `fork`。\n\n2. **作为计算机系统资源的管理者**：\n   负责对系统资源进行有效管理与合理分配，资源主要包括：\n   - **处理器管理**：处理器的分配与控制。\n   - **存储器管理**：内存的分配、保护和回收。\n   - **I/O 设备管理**：设备的分配、回收与操纵。\n   - **文件管理**：文件的存取、共享和保护。\n\n3. **作为扩展机（虚拟机，Virtual Machine）**：\n   In 裸机（Bare Machine）上覆盖一层层系统软件，向用户呈现一台功能更强、使用更方便的抽象虚拟机，屏蔽了底层硬件操作的复杂细节。'
  },
  {
    question: '进程的5种状态和PCB',
    answer: '通常情况下，进程在执行过程中有5种状态：\n\n1. **创建态（New）：** 进程正在被创建，尚未插入到就绪队列中，通常是在为其分配 PCB 和必要内存。\n2. **就绪态（Ready）：** 进程已具备运行条件，已获得除 CPU 之外的全部所需资源，正在排队等待分配 CPU 运行。\n3. **运行态（Running）：** 进程占有 CPU 资源，其程序正在处理机上执行。\n4. **阻塞态（Blocked / Wait）：** 进程因等待某事件发生（如 I/O 请求、申请缓冲区、信号量）而暂时无法运行，即使 CPU 空闲也无法执行。\n5. **终止态（Terminated）：** 进程结束运行或因异常被撤销，系统正在回收其所占资源并准备回收 PCB。\n\n**PCB（进程控制块，Process Control Block）：**\n- **定义：** PCB 是操作系统专门为每个进程定义的数据结构，用于描述 and 记录进程的运行状态及控制信息。\n- **作用：** PCB 是进程实体的一部分，是<strong>进程存在的唯一标志</strong>。系统根据 PCB 来感知和管理进程，完成对进程的创建、调度和撤销。'
  },
  {
    question: '死锁的定义和产生死锁的必要条件，处理策略',
    answer: '**一、死锁的定义**\n死锁是指两个或多个进程在运行过程中，因争夺共享资源而造成的一种互相等待的僵局（僵持状态）。若无外力作用，这些进程都将无法向前推进。\n\n**二、产生死锁的4个必要条件**\n1. **互斥条件：** 一个资源在一段时间内只能由一个进程独占使用。\n2. **请求并保持条件：** 进程已占有了至少一个资源，但又提出了新的资源请求，而该资源已被其他进程占有，此时该进程阻塞，但对已获得的资源保持不放。\n3. **不可剥夺条件：** 进程已获得的资源在未使用完之前，不能被强行剥夺，只能由该进程自愿释放。\n4. **循环等待条件：** 存在一个进程链，链中每个进程都在等待下一个进程所占有的资源（例如 $P_0$ 等待 $P_1$ 占有的资源，$P_1$ 等待 $P_0$ 占有的资源）。\n\n**三、死锁的处理策略**\n1. **预防死锁：** 通过设置某些严格限制条件，破坏产生死锁的 4 个必要条件之一（由于互斥条件通常不可改变，主要通过破坏另外 3 个条件）。例如一次性分配所有资源（破坏请求并保持）或按顺序编号申请资源（破坏循环等待）。\n2. **避免死锁：** 在资源动态分配过程中，用某种方法（如**银行家算法**）计算资源分配的安全状态。如果分配会导致系统进入不安全状态（可能产生死锁），则拒绝分配，否则予以分配。\n3. **检测并解除死锁：** 允许系统发生死锁。通过定时运行死锁检测算法（如资源分配图简化）来判定是否发生死锁，一旦发现，通过撤销进程、强行剥夺资源等手段解除死锁。\n4. **忽略死锁：** 鸵鸟算法，即不承认死锁可能发生。多用于一般商用操作系统（如 Windows, Linux），因为预防和检测死锁的开销通常大发生死锁实际发生的危害。'
  },
  {
    question: '分页存储的逻辑地址物理地址转换',
    answer: '分页存储管理中，用户的逻辑地址空间被划分为若干个固定大小的页（Page），物理内存空间被划分为相同大小的块（Frame）。\n\n**地址转换公式与步骤：**\n1. **解析逻辑地址：** 将用户的逻辑地址 $A$ 拆分为**页号 $P$** 和**页内偏移量 $d$**：\n   - $P = A / L$ （$L$ 为页大小）\n   - $d = A \\pmod L$\n   *(若页大小为 $2^K$ 字节，则逻辑地址的高位部分直接为页号 $P$，低位 $K$ 位直接为页内偏移 $d$)*。\n2. **越界检查：** 比较页号 $P$ 与页表寄存器中的页表长度 $M$。若 $P \\ge M$，则产生越界中断（越界错误）。\n3. **查表定位物理块号：** 根据页表始址 $F$ 和页号 $P$ 检索页表，找到对应的页表项。取出该页对应的**物理块号 $b$**。\n4. **生成物理地址：** 物理地址 $\\text{Address}_{phy} = b \\times L + d$。或者如果页大小为 $2^K$ 字节，直接将块号 $b$ 的二进制形式与页内偏移 $d$ 进行拼接得到物理地址。\n\n<hr class="my-6 border-t border-slate-200" />\n\n**💡 实战典型例题：**\n在一分页存储管理系统中，某作业的页表如下：\n\n| 页号 | 块号 |\n| :---: | :---: |\n| 0 | 3 |\n| 1 | 5 |\n| 2 | 6 |\n| 3 | 2 |\n\n已知页面大小为 1024 字节，试求逻辑地址 $[0, 100]$、$[1, 179]$、$[2, 785]$ 和 $[3, 1050]$ 对应的物理地址。\n\n**【答案及解析】**\n- **逻辑地址 $[0, 100]$**：页号为 0，页内偏移量为 100。查页表，页号 0 对应的物理块号为 3。物理地址 = $3 \\times 1024 + 100 = 3172$。\n- **逻辑地址 $[1, 179]$**：页号为 1，页内偏移量为 179。查页表，页号 1 对应的物理块号为 5。物理地址 = $5 \\times 1024 + 179 = 5299$。\n- **逻辑地址 $[2, 785]$**：页号为 2，页内偏移量为 785。查页表，页号 2 对应的物理块号为 6。物理地址 = $6 \\times 1024 + 785 = 6929$。\n- **逻辑地址 $[3, 1050]$**：页号为 3，页内偏移量为 1050。由于偏移量 $1050 \\ge 1024$（页面大小），属于**页内偏移量越界**，该逻辑地址非法，系统将产生越界中断。'
  },
  {
    question: '分段存储的逻辑地址物理地址转换',
    answer: '分段存储管理中，作业的逻辑地址空间被划分为若干个长度不同的段（Segment），每个段定义了一组相对完整的信息（如主程序段、数据段）。\n\n**地址转换公式与步骤：**\n1. **解析逻辑地址：** 逻辑地址由两部分组成：**段号 $S$** 和**段内偏移量 $d$**。\n2. **越界检查（段号）：** 比较段号 $S$ 与段表寄存器中的段表长度 $M$。若 $S \\ge M$，则产生段越界中断。\n3. **查表定位段属性：** 根据段表始址，以段号 $S$ 查段表，读出该段的**段长 $L$** 和在内存中的**基址（起点物理地址） $b$**。\n4. **越界检查（段内偏移）：** 比较段内偏移量 $d$ 与段长 $L$。若 $d \\ge L$，则说明超出了该段的合法边界，产生段内越界中断。\n5. **计算物理地址：** 物理地址 $\\text{Address}_{phy} = b + d$。\n\n<hr class="my-6 border-t border-slate-200" />\n\n**💡 实战典型例题：**\n某分段存储管理系统中，采用如下段表：\n\n| 段号 | 段的长度 | 内存起始地址（字节） |\n| :---: | :---: | :---: |\n| 0 | 660 | 219 |\n| 1 | 14 | 3330 |\n| 2 | 100 | 90 |\n| 3 | 580 | 1237 |\n| 4 | 96 | 1952 |\n\n试求逻辑地址 $[0, 100]$、$[2, 300]$ 和 $[5, 30]$ 对应的物理地址。\n\n**【答案及解析】**\n- **逻辑地址 $[0, 100]$**：段号为 0，段内偏移量为 100。查段表，段号 0 的段长度为 660，由于偏移量 $100 < 660$，地址合法。物理地址 = 起始物理地址 + 偏移量 = $219 + 100 = 319$。\n- **逻辑地址 $[2, 300]$**：段号为 2，段内偏移量为 300。查段表，段号 2 的段长度为 100，由于偏移量 $300 \\ge 100$，属于**段内偏移量越界**，该地址非法，系统将产生越界中断。\n- **逻辑地址 $[5, 30]$**：段号为 5，段内偏移量为 30。查段表，该系统段表的最大有效段号为 4，段号 5 越出了段表的范围，属于**段号越界**，该地址非法，系统将产生越界中断。'
  },
  {
    question: '文件系统和目录，磁盘存储空间管理',
    answer: '**一、文件系统与目录管理**\n- **文件系统：** 操作系统中负责管理和存取文件信息的软件机构，它将外存（磁盘）上的数据以文件形式组织，并为用户提供“按名存取”的统一接口。\n- **文件目录：** 目录是实现“按名存取”的关键数据结构。它将文件名与文件控制块（FCB，包含文件属性、物理位置等）进行关联。常用的是**树形目录结构**，支持多级路径（如绝对路径、相对路径），能解决文件名重名冲突并方便文件分类和共享。\n\n**二、磁盘存储空间管理**\n为了能给文件分配外存空间，系统必须记录和管理外存上所有空闲盘块。常见的空闲空间管理方法有：\n1. **空闲表法：** 系统为外存上的所有空闲区建立一张空闲表，记录每个空闲区的起始盘块号 and 盘块数。适用于连续分配方式。\n2. **空闲链表法：** 将所有空闲盘块或空闲区链接成一条链表。分配时从链首取出空闲块，回收时挂入链尾。\n3. **位示图法（Bitmap）：** 利用二进制的一位（bit）来表示磁盘中一个盘块的使用状态（0 表示空闲，1 表示已分配）。位示图空间占用小，易于在内存中维护，且能极快地找到连续的空闲盘块。\n4. **成组链接法：** Unix 系统所采用的方法。将所有空闲盘块按固定数量（如 100 块）分成若干组，每组的第一块记录下一组的所有块号及数量，将多块空闲盘块成组地链接在一起。兼顾了链表法的灵活与位示图的高效，适合大型文件系统。'
  }
]

// 应用题算法数据
const cpuAlgos = [
  { name: '先来先服务 (FCFS)', important: true, desc: '按照进程到达 CPU 的先后顺序进行调度。非抢占式。计算简单，但对短进程不友好，易产生“护送效应”。' },
  { name: '非抢占短作业优先 (SJF)', important: true, desc: '每次调度时选择已到达且服务时间最短的进程。非抢占式。能获得最小的平均等待时间和平均周转时间。' },
  { name: '抢占式短作业优先 (SRTF)', important: false, desc: '又称最短剩余时间优先。新进程到达时，若其剩余运行时间比当前运行进程短，则抢占 CPU 运行。' },
  { name: '时间片轮转 (RR)', important: false, desc: '按到达顺序排队，每个进程每次最多运行一个固定时间片 q，用完则排到队尾，主要用于分时系统。' },
  { name: '优先级调度 (Priority)', important: true, desc: '每个进程赋予优先级，每次调度选择就绪队列中优先级最高（值通常越小越高）的进程运行。支持抢占或非抢占。' },
  { name: '高响应比优先 (HRRN)', important: false, desc: '非抢占式。每次调度计算响应比 Rp = (等待时间 + 服务时间) / 服务时间，选择 Rp 最大者。折中了 FCFS 和 SJF。' },
  { name: '多级反馈队列调度 (MFQ)', important: false, desc: '设置多个优先级递减、时间片递增的就绪队列。新进程进入最高级队列，未运行完则降级，最全面的 CPU 调度算法。' },
  { name: '基于公平原则的调度', important: false, desc: '类似 Linux CFS 调度。根据权重分配 CPU 份额，调度器总是挑选虚拟运行时间 vruntime 最小的进程执行。' }
]

const diskAlgos = [
  { name: '先来先服务 (FCFS)', important: true, desc: '按请求到达的先后顺序进行磁头移动服务。公平简单，但未做寻道优化，平均寻道长度很大。' },
  { name: '最短寻道时间优先 (SSTF)', important: true, desc: '每次选择与当前磁头所在位置距离最近的磁道服务。寻道总长度大幅降低，但在高负荷下可能导致两端请求发生“饥饿”。' },
  { name: '扫描算法 / 电梯算法 (SCAN)', important: true, desc: '磁头向一个方向移动，沿途服务请求，直到抵达磁盘最边缘（例如 0 或 199 磁道）才反向移动，解决了 SSTF 的饥饿问题。' },
  { name: '循环扫描 (C-SCAN)', important: false, desc: '磁头单向服务（如仅向大磁道方向），到达最边缘（199）后直接快速返回到另一端起点（0）重新开始，返回途中不服务。' },
  { name: 'N步扫描 (N-Step SCAN)', important: false, desc: '将磁盘请求队列分成若干个长度为 N 的子队列。通过 SCAN 调度服务一个子队列，服务期间新请求加入新队列，避免“磁臂粘着”。' }
]

const pageAlgos = [
  { name: '最佳置换算法 (OPT)', important: true, desc: '淘汰未来最长时间内不会被访问，或以后永不使用的页面。是理想的页面置换算法，由于无法预知未来，实际不可实现，仅作性能基准。' },
  { name: '先进先出置换 (FIFO)', important: true, desc: '总是淘汰最早进入内存的页面。实现极为简单，但容易发生 Belady 异常（分配物理块数增加，缺页率反而上升）。' },
  { name: '最近最久未使用 (LRU)', important: true, desc: '根据页面被访问的历史记录，淘汰最近最长一段时间内没有被访问过的页面。性能非常接近 OPT，关需要硬件（如寄存器、栈）支持。' },
  { name: '时钟置换算法 (CLOCK)', important: false, desc: '又称二次机会算法。物理块循环成环，页面置访问位 A。扫描时 A=1 则置 A=0，若 A=0 则淘汰置换。是一种折中的高效算法。' },
  { name: '最近最少使用 (LFU)', important: false, desc: '淘汰最近一段时间内被访问频次、次数最少的页面。为每个页面维护访问计数器。' }
]
</script>

<style scoped>
:deep(table) {
  width: 100%;
  border-collapse: collapse;
  margin: 1.5rem 0;
}
:deep(th), :deep(td) {
  border: 1px solid #e2e8f0;
  padding: 0.75rem 1rem;
  text-align: center;
}
:deep(th) {
  background-color: #f8fafc;
  font-weight: bold;
}
:deep(hr) {
  border: 0;
  border-top: 1px solid #e2e8f0;
  margin: 2rem 0;
}
.animate-fade-in {
  animation: fadeIn 0.25s cubic-bezier(0.4, 0, 0.2, 1) forwards;
}
@keyframes fadeIn {
  from { opacity: 0; transform: translateY(6px); }
  to { opacity: 1; transform: translateY(0); }
}
</style>
