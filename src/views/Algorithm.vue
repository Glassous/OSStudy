<template>
  <div class="py-10 max-w-4xl mx-auto px-4">
    <!-- Breadcrumbs -->
    <nav class="flex items-center space-x-2 text-sm text-slate-500 mb-6">
      <router-link to="/" class="hover:text-indigo-600 transition-colors">首页</router-link>
      <span class="text-slate-300">/</span>
      <span class="text-slate-655">{{ parentTitle }}</span>
      <span class="text-slate-300">/</span>
      <span class="text-slate-900 font-bold">{{ routeMetaTitle }}</span>
    </nav>

    <!-- Header Section -->
    <header class="border-b border-slate-200 pb-6 mb-8">
      <h1 class="text-3xl font-extrabold text-slate-950 tracking-tight flex items-center gap-3">
        <span class="text-indigo-600">⚡</span> {{ routeMetaTitle }}
      </h1>
      <p class="text-sm text-slate-400 mt-2">所属模块：{{ parentTitle }}</p>
    </header>

    <!-- Content Area: Split into Theory and Simulator -->
    <div class="space-y-10">
      
      <!-- Part 1: Theory and Exam Templates -->
      <section class="bg-white p-6 border border-slate-200 rounded-lg">
        <h2 class="text-lg font-extrabold text-slate-900 mb-4 border-l-4 border-indigo-600 pl-3">
          📖 算法原理与做题模板
        </h2>
        
        <div v-math class="prose prose-slate max-w-none text-slate-600 text-sm leading-relaxed space-y-4">
          <!-- CPU Scheduling Theory -->
          <div v-if="activeType === 'cpu'" class="space-y-4">
            <div class="p-3 bg-slate-50 border border-slate-100 rounded text-xs font-semibold text-slate-600 space-y-1">
              <p>周转时间：$T = \text{完成时间} - \text{到达时间}$</p>
              <p>带权周转时间：$W = T / \text{服务时间}$</p>
              <p>等待时间：$T_{wait} = T - \text{服务时间}$</p>
            </div>
            
            <div v-if="route.name === 'algo-cpu-fcfs'">
              <p><strong>先来先服务 (FCFS) 决策逻辑：</strong> 按照进程到达 CPU 的先后顺序进行调度。非抢占式。</p>
              <p class="text-xs text-amber-700 bg-amber-50 p-2 border border-amber-100 rounded">⚠️ 易错细节：计算时注意前一个进程完成前，下一个进程是否已经到达。若有空闲期，CPU要处于等待状态。</p>
            </div>
            <div v-else-if="route.name === 'algo-cpu-sjf'">
              <p><strong>短作业优先 (SJF) 决策逻辑：</strong> 每次 CPU 空闲时，在<strong>已经到达</strong>的就绪进程中选择服务时间最短的进行调度。非抢占式。</p>
              <p class="text-xs text-amber-700 bg-amber-50 p-2 border border-amber-100 rounded">⚠️ 极易扣分点：必须先检查已到达！不能直接挑全局最短的，如果它还没到达就不能调度。</p>
            </div>
            <div v-else-if="route.name === 'algo-cpu-srtf'">
              <p><strong>抢占式短作业优先 (SRTF) 决策逻辑：</strong> 新进程到达时，或当前进程运行结束时。对比所有就绪进程的<strong>剩余运行时间</strong>，挑最短的抢占运行。</p>
              <p class="text-xs text-amber-700 bg-amber-50 p-2 border border-amber-100 rounded">⚠️ 提分细节：抢占发生后，原运行进程的“剩余运行时间”要扣减，并在草稿纸上记录好其未运行完的部分。</p>
            </div>
            <div v-else-if="route.name === 'algo-cpu-hrrn'">
              <p><strong>高响应比优先 (HRRN) 决策逻辑：</strong> CPU 空闲时，计算所有已到达进程的响应比 $R_p$，选择响应比最大者运行。非抢占式。</p>
              <p class="text-xs text-indigo-700 bg-indigo-50 p-2 border border-indigo-100 rounded">公式：$R_p = \frac{\text{等待时间} + \text{服务时间}}{\text{服务时间}} = 1 + \frac{\text{等待时间}}{\text{服务时间}}$</p>
            </div>
            <div v-else-if="route.name === 'algo-cpu-rr'">
              <p><strong>时间片轮转 (RR) 决策逻辑：</strong> 进程执行时间片 $q$ 耗尽，或者当前进程运行结束。按队列先进先出顺序轮转调度。</p>
              <p class="text-xs text-amber-700 bg-amber-50 p-2 border border-amber-100 rounded">⚠️ 队列入队规则：当在时刻 $t$，进程 A 刚好用完时间片退队，而进程 B 刚好在时刻 $t$ 到达。标准考法中：新到达的进程 B 先入队，用完时间片的进程 A 随后入队。队列变为：$[..., B, A]$。</p>
            </div>
          </div>

          <!-- Banker Theory -->
          <div v-else-if="activeType === 'banker'" class="space-y-4">
            <div v-if="route.name === 'algo-banker-theory'">
              <p>银行家算法是由 Dijkstra 提出的一种经典的<strong>避免死锁</strong>设计。</p>
              <p class="font-bold text-slate-800">一、核心数据结构</p>
              <ul class="list-disc list-inside space-y-1">
                <li><code>Max[i][j]</code>: 进程 $P_i$ 对资源 $R_j$ 的最大需求量。</li>
                <li><code>Allocation[i][j]</code>: 进程 $P_i$ 当前已分配的资源 $R_j$ 数量。</li>
                <li><code>Need[i][j]</code>: 进程 $P_i$ 还需要资源 $R_j$ 的数量：<strong>Need = Max - Allocation</strong>。</li>
                <li><code>Available[j]</code>: 系统当前可供分配的空闲资源 $R_j$ 数量。</li>
              </ul>
            </div>
            <div v-else-if="route.name === 'algo-banker-safety'">
              <p><strong>安全性检查算法流程：</strong></p>
              <ol class="list-decimal list-inside space-y-1">
                <li>设置工作向量 <code>Work = Available</code>，进程完成状态 <code>Finish[i] = false</code>。</li>
                <li>寻找是否有满足 <code>Need[i] &le; Work</code> 且 <code>Finish[i] == false</code> 的进程。</li>
                <li>若找到，说明该进程可顺利执行完成，回收其资源：<code>Work = Work + Allocation[i]</code>，置 <code>Finish[i] = true</code>。重复步骤2。</li>
                <li>若所有进程的 <code>Finish</code> 均能置为 true，则系统处于<strong>安全状态</strong>，记录的推进顺序即为<strong>安全序列</strong>。</li>
              </ol>
            </div>
          </div>

          <!-- Page Replacement Theory -->
          <div v-else-if="activeType === 'page'" class="space-y-4">
            <p><strong>缺页率公式：</strong> $\text{缺页率} = \text{缺页次数} / \text{总访问次数} \times 100\%$</p>
            <div v-if="route.name === 'algo-page-opt'">
              <p><strong>最佳置换算法 (OPT)：</strong> 淘汰<strong>未来最长时间内</strong>不会被访问，或者以后永不使用的页面。是理想的页面淘汰算法，不可实现，仅作为性能评估的基准线。</p>
            </div>
            <div v-else-if="route.name === 'algo-page-fifo'">
              <p><strong>先进先出算法 (FIFO)：</strong> 总是淘汰<strong>最早装入内存</strong>的页面。实现极为简单，但容易引发 <strong>Belady 异常</strong>（物理块增加，缺页率反而增高的现象）。</p>
            </div>
            <div v-else-if="route.name === 'algo-page-lru'">
              <p><strong>最近最久未使用算法 (LRU)：</strong> 淘汰<strong>最近最长一段时间内未被访问</strong>的页面。性能最接近于 OPT，但实现需要维护复杂的栈或时间戳，硬件开销大。</p>
            </div>
            <div v-else-if="route.name === 'algo-page-clock'">
              <p><strong>时钟置换算法 (CLOCK / 二次机会)：</strong> 折中算法。每个物理块赋予一个访问位 A（访问时置 1）。淘汰时指针循环扫描，若 $A=1$ 则置 $A=0$ 给二次机会，若 $A=0$ 则直接置换该页。</p>
            </div>
          </div>

          <!-- Disk Scheduling Theory -->
          <div v-else-if="activeType === 'disk'" class="space-y-4">
            <p><strong>磁盘物理读写时间 = 寻道时间 (最长) + 旋转延迟 + 数据传输时间</strong></p>
            <div v-if="route.name === 'algo-disk-fcfs'">
              <p><strong>先来先服务 (FCFS)：</strong> 按请求到达的顺序依次服务，公平且极其简单，但未对寻道做任何优化，磁头来回移动剧烈，寻道总长度很大。</p>
            </div>
            <div v-else-if="route.name === 'algo-disk-sstf'">
              <p><strong>最短寻道时间优先 (SSTF)：</strong> 每次选择与当前磁头所在位置<strong>距离最近</strong>的磁道进行服务。寻道总长度大幅降低，但可能会导致边缘请求发生<strong>饥饿</strong>。</p>
            </div>
            <div v-else-if="route.name === 'algo-disk-scan'">
              <p><strong>电梯双向扫描算法 (SCAN)：</strong> 磁头沿当前方向移动，依次服务沿途请求。只有当磁头移动到<strong>磁盘的最边缘物理界限 (本例中为0或199)</strong>时，才反向移动。</p>
            </div>
            <div v-else-if="route.name === 'algo-disk-cscan'">
              <p><strong>循环单向扫描算法 (C-SCAN)：</strong> 磁头单向移动服务（如只向大磁道方向）。到达边缘边界（199）后，<strong>直接跳回另一端起点（0）</strong>继续同向扫描，跳回过程不服务，提供最均匀的等待时间。</p>
            </div>
          </div>

          <!-- PV Operations Theory -->
          <div v-else-if="activeType === 'pv'" class="space-y-4">
            <p>PV操作利用记录型信号量实现进程间的同步与互斥。<code>P(S)</code> 消耗资源，<code>V(S)</code> 释放并唤醒。</p>
            <p v-if="route.name === 'algo-pv-producer-consumer'"><strong>生产者-消费者问题：</strong> 需同时解决缓冲池互斥（mutex = 1）和缓冲池满/空（full/empty）的同步控制。</p>
            <p v-else-if="route.name === 'algo-pv-reader-writer'"><strong>读者-写者问题（读者优先）：</strong> 第一个读者锁定写锁，最后一个读者释放写锁。读写互斥，允许多读并发。</p>
            <p v-else-if="route.name === 'algo-pv-philosophers'"><strong>哲学家进餐问题：</strong> 需解决筷子竞争死锁。这里采用“限制最大入座人数为 4 人”来规避死锁发生。</p>
            <p v-else-if="route.name === 'algo-pv-smokers'"><strong>吸烟者同步问题：</strong> 一个中介投放复合资源，多个吸烟者根据缺席资源进行定向同步（单中介多实体同步）。</p>
            <p v-else-if="route.name === 'algo-pv-bridge'"><strong>独木桥过桥问题：</strong> 限制单向互斥通车，同向在桥上不超过 $K$ 辆并发通行，为读者-写者与限流器的结合体。</p>
          </div>

          <!-- File System Theory -->
          <div v-else-if="activeType === 'file'" class="space-y-4">
            <div v-if="route.name === 'algo-file-capacity'">
              <p>混合索引地址计算：每个物理磁盘块包含 $Size_{block}$，每个指针包含 $Size_{ptr}$ 字节。一个磁盘块可容纳指针数为：$N = Size_{block} / Size_{ptr}$。</p>
              <p>系统设有直接地址 $D$ 个，1个一级间接，1个二级间接，1个三级间接。最大块数总和为：$D + N + N^2 + N^3$。最大容量为：$\text{块数总和} \times Size_{block}$。</p>
            </div>
            <div v-else-if="route.name === 'algo-file-access'">
              <p>磁盘读盘次数计算规则：若 FCB 已在内存中，要读取目标字节：</p>
              <ul class="list-disc list-inside space-y-1">
                <li>逻辑块号落在<strong>直接地址区间</strong>：只需 1 次读盘（直接读数据块）。</li>
                <li>逻辑块号落在<strong>一级间接区间</strong>：需 2 次读盘（1次读一级索引，1次读数据块）。</li>
                <li>逻辑块号落在<strong>二级间接区间</strong>：需 3 次读盘（1次二级索引，1次一级索引，1次数据块）。</li>
                <li>逻辑块号落在<strong>三级间接区间</strong>：需 4 次读盘（1次三级索引，1次二级索引，1次一级索引，1次数据块）。</li>
              </ul>
            </div>
          </div>
        </div>
      </section>

      <!-- Part 2: Interactive Dedicated Simulator/Code View -->
      <section class="bg-white p-6 border border-slate-200 rounded-lg">
        <h2 class="text-lg font-extrabold text-slate-900 mb-4 border-l-4 border-indigo-650 pl-3">
          ⚙️ 在线交互式模拟计算
        </h2>

        <!-- CPU Scheduling Simulator -->
        <div v-if="activeType === 'cpu'" class="space-y-6">
          <div class="overflow-x-auto border border-slate-100 rounded">
            <table class="min-w-full text-sm text-center">
              <thead class="bg-slate-50 text-slate-500 font-semibold">
                <tr>
                  <th class="px-4 py-2">进程名</th>
                  <th class="px-4 py-2">到达时间</th>
                  <th class="px-4 py-2">服务时间</th>
                  <th class="px-4 py-2">操作</th>
                </tr>
              </thead>
              <tbody>
                <tr v-for="(p, idx) in cpuProcesses" :key="idx" class="border-t border-slate-100">
                  <td class="px-4 py-2"><input v-model="p.name" type="text" class="w-16 border px-2 py-0.5 rounded text-center text-xs" /></td>
                  <td class="px-4 py-2"><input v-model.number="p.arrival" type="number" min="0" class="w-20 border px-2 py-0.5 rounded text-center text-xs" /></td>
                  <td class="px-4 py-2"><input v-model.number="p.service" type="number" min="1" class="w-20 border px-2 py-0.5 rounded text-center text-xs" /></td>
                  <td class="px-4 py-2"><button @click="removeCpuProcess(idx)" class="text-red-500 hover:text-red-700 text-xs font-bold cursor-pointer">删除</button></td>
                </tr>
              </tbody>
            </table>
          </div>
          
          <div class="flex gap-4">
            <button @click="addCpuProcess" class="px-3 py-1.5 border border-slate-200 rounded hover:bg-slate-50 text-xs font-bold text-slate-600 cursor-pointer">+ 添加进程</button>
            <button @click="runCpuScheduling" class="px-4 py-1.5 bg-indigo-600 hover:bg-indigo-700 text-white rounded text-xs font-bold cursor-pointer">开始调度计算</button>
          </div>

          <!-- CPU Results (With Step Controller) -->
          <div v-if="cpuResult" id="cpu-result" class="border-t border-slate-100 pt-6 space-y-6">
            <!-- Step controller -->
            <div class="flex items-center justify-between bg-indigo-50/50 p-3 rounded-lg border border-indigo-100 text-xs">
              <div class="flex items-center gap-2">
                <span class="font-bold text-indigo-900">分步模拟控制：</span>
                <span class="text-slate-600">当前步骤: <strong class="text-indigo-600">{{ currentStep + 1 }}</strong> / {{ totalSteps }}</span>
              </div>
              <div class="flex gap-2">
                <button @click="prevStep" :disabled="currentStep === 0" class="px-2.5 py-1 border border-slate-200 bg-white hover:bg-slate-50 text-[10px] font-bold rounded disabled:opacity-40 transition-colors cursor-pointer">&larr; 上一步</button>
                <button @click="nextStep" :disabled="currentStep === totalSteps - 1" class="px-2.5 py-1 border border-slate-200 bg-white hover:bg-slate-50 text-[10px] font-bold rounded disabled:opacity-40 transition-colors cursor-pointer">下一步 &rarr;</button>
                <button @click="completeAll" class="px-2.5 py-1 bg-slate-900 text-white hover:bg-indigo-600 text-[10px] font-bold rounded transition-colors cursor-pointer">一键完成</button>
              </div>
            </div>

            <div>
              <h4 class="font-bold text-slate-800 text-xs mb-2">🎨 调度轨迹甘特图</h4>
              <div class="flex flex-wrap border border-slate-200 rounded overflow-hidden text-xs bg-slate-50">
                <div v-for="(seg, idx) in displayedCpuGantt" :key="idx" class="border-r border-slate-200 p-2 text-center flex flex-col justify-between" :style="{ flexGrow: seg.duration, minWidth: '40px' }">
                  <span class="font-bold text-indigo-700">{{ seg.name }}</span>
                  <span class="text-[10px] text-slate-400 mt-1">{{ seg.start }} - {{ seg.end }}</span>
                </div>
              </div>
            </div>

            <div>
              <h4 class="font-bold text-slate-800 text-xs mb-2">📊 指标统计报表</h4>
              <div class="overflow-x-auto">
                <table class="min-w-full text-xs border border-slate-100 text-center">
                  <thead class="bg-slate-50 text-slate-500 font-bold">
                    <tr>
                      <th class="px-4 py-2">进程</th>
                      <th class="px-4 py-2">到达时间</th>
                      <th class="px-4 py-2">服务时间</th>
                      <th class="px-4 py-2">完成时间</th>
                      <th class="px-4 py-2">周转时间 (T)</th>
                      <th class="px-4 py-2">带权周转时间 (W)</th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr v-for="p in displayedCpuTable" :key="p.name" class="border-t border-slate-100">
                      <td class="px-4 py-2 font-bold text-slate-700">{{ p.name }}</td>
                      <td class="px-4 py-2">{{ p.arrival }}</td>
                      <td class="px-4 py-2">{{ p.service }}</td>
                      <td class="px-4 py-2 font-semibold">{{ p.completion }}</td>
                      <td class="px-4 py-2 text-indigo-600 font-semibold">{{ p.turnaround }}</td>
                      <td class="px-4 py-2">{{ p.weightedTurnaround }}</td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        </div>

        <!-- Banker Safety Check Simulator -->
        <div v-else-if="route.name === 'algo-banker-safety'" class="space-y-6">
          <div>
            <span class="block text-xs font-bold text-slate-500 mb-2">系统当前空闲资源 (Available)</span>
            <div class="flex gap-2">
              <div v-for="(v, i) in bankerAvailable" :key="i" class="flex items-center gap-1">
                <span class="text-xs text-slate-400 font-bold uppercase">{{ ['A','B','C'][i] }}:</span>
                <input v-model.number="bankerAvailable[i]" type="number" min="0" class="w-16 px-2 py-1 border border-slate-200 rounded text-center text-sm" />
              </div>
            </div>
          </div>

          <div>
            <span class="block text-xs font-bold text-slate-500 mb-2">配置 Max & Allocation 矩阵</span>
            <div class="overflow-x-auto border border-slate-100 rounded">
              <table class="min-w-full text-xs text-center">
                <thead class="bg-slate-50 text-slate-500 font-bold">
                  <tr>
                    <th class="px-2 py-2">进程</th>
                    <th class="px-2 py-2">最大需求 (Max)</th>
                    <th class="px-2 py-2">已分配 (Allocation)</th>
                    <th class="px-2 py-2">需求值 (Need)</th>
                  </tr>
                </thead>
                <tbody>
                  <tr v-for="(row, idx) in bankerRows" :key="idx" class="border-t border-slate-100">
                    <td class="px-2 py-2 font-bold">{{ row.name }}</td>
                    <td class="px-2 py-2">
                      <div class="flex gap-1 justify-center">
                        <input v-for="(v, i) in row.max" :key="i" v-model.number="row.max[i]" type="number" min="0" class="w-12 border border-slate-200 rounded text-center text-xs py-0.5" />
                      </div>
                    </td>
                    <td class="px-2 py-2">
                      <div class="flex gap-1 justify-center">
                        <input v-for="(v, i) in row.allocation" :key="i" v-model.number="row.allocation[i]" type="number" min="0" class="w-12 border border-slate-200 rounded text-center text-xs py-0.5" />
                      </div>
                    </td>
                    <td class="px-2 py-2 text-slate-400 font-bold">
                      ({{ row.max[0]-row.allocation[0] }}, {{ row.max[1]-row.allocation[1] }}, {{ row.max[2]-row.allocation[2] }})
                    </td>
                  </tr>
                </tbody>
              </table>
            </div>
            <div class="mt-4">
              <button @click="runBankerCheck" class="px-4 py-1.5 bg-indigo-600 hover:bg-indigo-700 text-white rounded text-xs font-bold cursor-pointer">开始安全性检查分析</button>
            </div>
          </div>

          <!-- Banker Results (With Step Controller) -->
          <div v-if="bankerResult" id="banker-result" class="border-t border-slate-100 pt-6">
            <h4 class="font-bold text-slate-800 text-sm mb-3">安全推导状态</h4>
            
            <div v-if="bankerResult.isSafe" class="space-y-4">
              <!-- Step controller -->
              <div class="flex items-center justify-between bg-indigo-50/50 p-3 rounded-lg border border-indigo-100 text-xs">
                <div class="flex items-center gap-2">
                  <span class="font-bold text-indigo-900">分步模拟控制：</span>
                  <span class="text-slate-600">当前步骤: <strong class="text-indigo-600">{{ currentStep + 1 }}</strong> / {{ totalSteps }}</span>
                </div>
                <div class="flex gap-2">
                  <button @click="prevStep" :disabled="currentStep === 0" class="px-2.5 py-1 border border-slate-200 bg-white hover:bg-slate-50 text-[10px] font-bold rounded disabled:opacity-40 transition-colors cursor-pointer">&larr; 上一步</button>
                  <button @click="nextStep" :disabled="currentStep === totalSteps - 1" class="px-2.5 py-1 border border-slate-200 bg-white hover:bg-slate-50 text-[10px] font-bold rounded disabled:opacity-40 transition-colors cursor-pointer">下一步 &rarr;</button>
                  <button @click="completeAll" class="px-2.5 py-1 bg-slate-900 text-white hover:bg-indigo-600 text-[10px] font-bold rounded transition-colors cursor-pointer">一键完成</button>
                </div>
              </div>

              <div class="p-3 bg-green-50 border border-green-200 text-green-800 rounded text-xs font-semibold">
                系统安全！安全推进顺序为：{{ displayedBankerSequence.join(' &rarr; ') }}
              </div>
              <div class="overflow-x-auto">
                <table class="min-w-full text-[11px] text-center border border-slate-100">
                  <thead class="bg-slate-50 text-slate-500 font-bold">
                    <tr>
                      <th class="px-3 py-1.5">步骤</th>
                      <th class="px-3 py-1.5">运行进程</th>
                      <th class="px-3 py-1.5">Work (可用)</th>
                      <th class="px-3 py-1.5">Need (需求)</th>
                      <th class="px-3 py-1.5">Allocation (分配)</th>
                      <th class="px-3 py-1.5">Work + Allocation</th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr v-for="(step, idx) in displayedBankerSteps" :key="idx" class="border-t border-slate-100">
                      <td class="px-3 py-1.5">{{ idx + 1 }}</td>
                      <td class="px-3 py-1.5 font-bold">{{ step.name }}</td>
                      <td class="px-3 py-1.5">({{ step.work.join(', ') }})</td>
                      <td class="px-3 py-1.5">({{ step.need.join(', ') }})</td>
                      <td class="px-3 py-1.5">({{ step.allocation.join(', ') }})</td>
                      <td class="px-3 py-1.5 font-semibold text-indigo-600">({{ step.newWork.join(', ') }})</td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </div>
            <div v-else class="p-3 bg-red-50 border border-red-200 text-red-800 rounded text-xs font-semibold">
              系统处于不安全状态！无法推导出完整的安全序列。
            </div>
          </div>
        </div>
        
        <div v-else-if="route.name === 'algo-banker-theory'" class="text-center py-8 text-slate-400 text-xs">
          本页面为理论原理，交互模拟请点击左侧侧栏下的
          <router-link to="/algorithm-banker/safety" class="text-indigo-600 hover:underline">安全性检查模拟</router-link>。
        </div>

        <!-- Page Replacement Simulator -->
        <div v-else-if="activeType === 'page'" class="space-y-4">
          <div class="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label class="block text-xs font-bold text-slate-500 mb-1">页面访问序列（逗号隔开）</label>
              <input v-model="pageSequenceStr" type="text" class="w-full px-3 py-1.5 border border-slate-300 rounded text-xs outline-none" />
            </div>
            <div>
              <label class="block text-xs font-bold text-slate-500 mb-1">物理空闲块数 (M)</label>
              <input v-model.number="pageFrameCount" type="number" min="1" max="5" class="w-24 px-3 py-1.5 border border-slate-300 rounded text-xs outline-none" />
            </div>
          </div>
          <div>
            <button @click="runPageSimulation" class="px-4 py-1.5 bg-indigo-600 hover:bg-indigo-700 text-white rounded text-xs font-bold cursor-pointer">运行当前置换置换模拟</button>
          </div>

          <!-- Page Results (With Step Controller) -->
          <div v-if="pageSimResult" id="page-result" class="border-t border-slate-100 pt-6 space-y-4">
            <!-- Step controller -->
            <div class="flex items-center justify-between bg-indigo-50/50 p-3 rounded-lg border border-indigo-100 text-xs">
              <div class="flex items-center gap-2">
                <span class="font-bold text-indigo-900">分步模拟控制：</span>
                <span class="text-slate-600">当前步骤: <strong class="text-indigo-600">{{ currentStep + 1 }}</strong> / {{ totalSteps }}</span>
              </div>
              <div class="flex gap-2">
                <button @click="prevStep" :disabled="currentStep === 0" class="px-2.5 py-1 border border-slate-200 bg-white hover:bg-slate-50 text-[10px] font-bold rounded disabled:opacity-40 transition-colors cursor-pointer">&larr; 上一步</button>
                <button @click="nextStep" :disabled="currentStep === totalSteps - 1" class="px-2.5 py-1 border border-slate-200 bg-white hover:bg-slate-50 text-[10px] font-bold rounded disabled:opacity-40 transition-colors cursor-pointer">下一步 &rarr;</button>
                <button @click="completeAll" class="px-2.5 py-1 bg-slate-900 text-white hover:bg-indigo-600 text-[10px] font-bold rounded transition-colors cursor-pointer">一键完成</button>
              </div>
            </div>

            <h4 class="font-bold text-slate-800 text-xs mb-3">置换物理块快照历史</h4>
            <div class="overflow-x-auto">
              <table class="min-w-full text-center text-xs border border-slate-100">
                <thead class="bg-slate-50 text-slate-500 font-bold">
                  <tr>
                    <th class="px-2 py-2">步骤</th>
                    <th class="px-2 py-2">访问页</th>
                    <th class="px-2 py-2">物理内存状态</th>
                    <th class="px-2 py-2">状态</th>
                    <th class="px-2 py-2">淘汰页</th>
                  </tr>
                </thead>
                <tbody>
                  <tr v-for="(s, idx) in displayedPageSteps" :key="idx" class="border-t border-slate-100 hover:bg-slate-50/50">
                    <td class="px-2 py-2 text-slate-400">{{ idx + 1 }}</td>
                    <td class="px-2 py-2 font-bold">{{ s.page }}</td>
                    <td class="px-2 py-2">
                      <span v-for="(item, iIdx) in s.frames" :key="iIdx" class="inline-block w-8 py-0.5 border border-slate-200 rounded mx-0.5 bg-slate-50 font-semibold">
                        {{ item !== null ? item : '-' }}
                      </span>
                    </td>
                    <td class="px-2 py-2">
                      <span v-if="s.isFault" class="text-red-650 bg-red-50 px-2 py-0.5 border border-red-100 rounded">缺页</span>
                      <span v-else class="text-green-650 bg-green-50 px-2 py-0.5 border border-green-100 rounded">命中</span>
                    </td>
                    <td class="px-2 py-2 text-slate-400">{{ s.replaced !== null ? s.replaced : '-' }}</td>
                  </tr>
                </tbody>
              </table>
            </div>
            <div class="mt-4 flex gap-8 text-xs font-semibold text-slate-700 bg-slate-50 p-3 rounded">
              <span>当前缺页次数: <strong class="text-red-600">{{ displayedPageFaults }}</strong></span>
              <span>缺页率: <strong class="text-slate-800">{{ (displayedPageFaults / (currentStep + 1) * 100).toFixed(1) }}%</strong></span>
            </div>
          </div>
        </div>

        <!-- Disk Scheduling Simulator -->
        <div v-else-if="activeType === 'disk'" class="space-y-4">
          <div class="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div class="md:col-span-2">
              <label class="block text-xs font-bold text-slate-500 mb-1">磁道请求队列（逗号隔开）</label>
              <input v-model="diskRequestsStr" type="text" class="w-full px-3 py-1.5 border border-slate-300 rounded text-xs outline-none" />
            </div>
            <div>
              <label class="block text-xs font-bold text-slate-500 mb-1">初始磁头位置</label>
              <input v-model.number="diskHeadStart" type="number" class="w-full px-3 py-1.5 border border-slate-300 rounded text-xs outline-none" />
            </div>
          </div>
          
          <div v-if="route.name === 'algo-disk-scan' || route.name === 'algo-disk-cscan'" class="w-72">
            <label class="block text-xs font-bold text-slate-500 mb-1">初始寻道方向</label>
            <select v-model="diskDirection" class="w-full px-3 py-1.5 border border-slate-300 rounded text-xs outline-none">
              <option value="up">向磁道增加方向 (磁道增大)</option>
              <option value="down">向磁道减小方向 (磁道减小)</option>
            </select>
          </div>

          <div>
            <button @click="runDiskSimulation" class="px-4 py-1.5 bg-indigo-600 hover:bg-indigo-700 text-white rounded text-xs font-bold cursor-pointer">运行当前磁盘调度</button>
          </div>

          <!-- Disk Results (With Step Controller) -->
          <div v-if="diskSimResult" id="disk-result" class="border-t border-slate-100 pt-6 space-y-4">
            <!-- Step controller -->
            <div class="flex items-center justify-between bg-indigo-50/50 p-3 rounded-lg border border-indigo-100 text-xs">
              <div class="flex items-center gap-2">
                <span class="font-bold text-indigo-900">分步模拟控制：</span>
                <span class="text-slate-600">当前步骤: <strong class="text-indigo-600">{{ currentStep + 1 }}</strong> / {{ totalSteps }}</span>
              </div>
              <div class="flex gap-2">
                <button @click="prevStep" :disabled="currentStep === 0" class="px-2.5 py-1 border border-slate-200 bg-white hover:bg-slate-50 text-[10px] font-bold rounded disabled:opacity-40 transition-colors cursor-pointer">&larr; 上一步</button>
                <button @click="nextStep" :disabled="currentStep === totalSteps - 1" class="px-2.5 py-1 border border-slate-200 bg-white hover:bg-slate-50 text-[10px] font-bold rounded disabled:opacity-40 transition-colors cursor-pointer">下一步 &rarr;</button>
                <button @click="completeAll" class="px-2.5 py-1 bg-slate-900 text-white hover:bg-indigo-600 text-[10px] font-bold rounded transition-colors cursor-pointer">一键完成</button>
              </div>
            </div>

            <h4 class="font-bold text-slate-800 text-xs">寻道移动顺序轨迹</h4>
            <div class="p-3 bg-slate-50 border border-slate-200 rounded text-xs font-mono break-all leading-relaxed">
              {{ displayedDiskPath.join(' &rarr; ') }}
            </div>
            <div class="overflow-x-auto">
              <table class="min-w-full text-center text-xs border border-slate-100">
                <thead class="bg-slate-50 text-slate-500 font-bold">
                  <tr>
                    <th class="px-3 py-2">步骤</th>
                    <th class="px-3 py-2">源磁道</th>
                    <th class="px-3 py-2">目的磁道</th>
                    <th class="px-3 py-2">跨越磁道数</th>
                  </tr>
                </thead>
                <tbody>
                  <tr v-for="(s, idx) in displayedDiskSteps" :key="idx" class="border-t border-slate-100">
                    <td class="px-3 py-2 text-slate-400">{{ idx + 1 }}</td>
                    <td class="px-3 py-2">{{ s.from }}</td>
                    <td class="px-3 py-2 font-bold">{{ s.to }}</td>
                    <td class="px-3 py-2 text-indigo-600 font-semibold">{{ s.distance }}</td>
                  </tr>
                </tbody>
              </table>
            </div>
            <div class="text-xs font-bold text-slate-700 bg-slate-50 p-3 rounded flex justify-between">
              <span>当前累积寻道跨越长度: <strong class="text-indigo-600 text-sm">{{ displayedDiskDistance }}</strong> 磁道</span>
              <span>平均寻道距离: <strong class="text-slate-800">{{ (displayedDiskDistance / (currentStep + 1)).toFixed(1) }}</strong> 磁道/次</span>
            </div>
          </div>
        </div>

        <!-- PV Operations Code Viewer -->
        <div v-else-if="activeType === 'pv'" class="space-y-4">
          <div class="bg-slate-900 text-slate-100 rounded-lg overflow-hidden font-mono text-xs shadow-sm">
            <div class="bg-slate-800 px-4 py-2 text-slate-400 flex justify-between items-center border-b border-slate-700">
              <span>满分同步互斥代码 C/C++ 模板</span>
            </div>
            <pre class="p-4 overflow-x-auto whitespace-pre-wrap leading-relaxed"><code>{{ pvCodeContent }}</code></pre>
          </div>
        </div>

        <!-- File System Calculators -->
        <div v-else-if="activeType === 'file'" class="space-y-6 text-sm">
          
          <!-- FS Capacity calc -->
          <div v-if="route.name === 'algo-file-capacity'" class="space-y-6">
            <div class="grid grid-cols-1 md:grid-cols-3 gap-4">
              <div>
                <label class="block text-xs font-bold text-slate-500 mb-1">物理磁盘块大小</label>
                <select v-model="fsBlockSize" class="w-full px-3 py-2 border border-slate-300 rounded text-xs outline-none">
                  <option :value="1024">1 KB</option>
                  <option :value="2048">2 KB</option>
                  <option :value="4096">4 KB</option>
                  <option :value="8192">8 KB</option>
                </select>
              </div>
              <div>
                <label class="block text-xs font-bold text-slate-500 mb-1">磁盘块指针项大小</label>
                <select v-model="fsPtrSize" class="w-full px-3 py-2 border border-slate-300 rounded text-xs outline-none">
                  <option :value="4">4 B</option>
                  <option :value="8">8 B</option>
                </select>
              </div>
              <div>
                <label class="block text-xs font-bold text-slate-500 mb-1">直接寻址项个数 (D)</label>
                <input v-model.number="fsDirectCount" type="number" min="0" class="w-full px-3 py-2 border border-slate-300 rounded text-xs outline-none" />
              </div>
            </div>
            <div class="grid grid-cols-1 md:grid-cols-3 gap-4">
              <div>
                <label class="block text-xs font-bold text-slate-500 mb-1">一级间接寻址个数</label>
                <input v-model.number="fsSingleCount" type="number" min="0" class="w-full px-3 py-2 border border-slate-300 rounded text-xs outline-none" />
              </div>
              <div>
                <label class="block text-xs font-bold text-slate-500 mb-1">二级间接寻址个数</label>
                <input v-model.number="fsDoubleCount" type="number" min="0" class="w-full px-3 py-2 border border-slate-300 rounded text-xs outline-none" />
              </div>
              <div>
                <label class="block text-xs font-bold text-slate-500 mb-1">三级间接寻址个数</label>
                <input v-model.number="fsTripleCount" type="number" min="0" class="w-full px-3 py-2 border border-slate-300 rounded text-xs outline-none" />
              </div>
            </div>

            <div class="bg-indigo-50/50 p-4 border border-indigo-100 rounded-lg">
              <h4 class="font-bold text-indigo-900 text-xs mb-3">🧮 最大文件容量计算报告</h4>
              <ul class="space-y-2 text-slate-700 text-xs font-semibold">
                <li>单个索引物理块指针容量 (N) = <span class="text-indigo-600">{{ fsIndexCapacity }}</span> 个指针项</li>
                <li>文件系统最大磁盘块存储总数 = <span class="text-indigo-600">{{ fsMaxTotalBlocks.toLocaleString() }}</span> 块</li>
                <li>支持的最大单个文件物理长度 = <strong class="text-indigo-600 text-sm">{{ fsMaxFileSizeFormatted }}</strong></li>
              </ul>
            </div>
          </div>

          <!-- FS Access read counts calc -->
          <div v-else-if="route.name === 'algo-file-access'" class="space-y-4">
            <div class="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label class="block text-xs font-bold text-slate-500 mb-1">物理磁盘块大小</label>
                <select v-model="fsBlockSize" class="w-full px-3 py-1.5 border border-slate-300 rounded text-xs outline-none">
                  <option :value="1024">1 KB</option>
                  <option :value="2048">2 KB</option>
                  <option :value="4096">4 KB</option>
                </select>
              </div>
              <div>
                <label class="block text-xs font-bold text-slate-500 mb-1">文件字节目标偏移量 (Offset)</label>
                <div class="flex gap-2">
                  <input v-model.number="fsOffsetVal" type="number" min="0" class="w-full px-3 py-1.5 border border-slate-300 rounded text-xs outline-none" />
                  <select v-model="fsOffsetUnit" class="w-24 px-3 py-1.5 border border-slate-300 rounded text-xs outline-none">
                    <option value="KB">KB</option>
                    <option value="MB">MB</option>
                  </select>
                </div>
              </div>
            </div>
            <div>
              <button @click="calcFsAccess" class="px-4 py-1.5 bg-indigo-600 hover:bg-indigo-700 text-white rounded text-xs font-bold cursor-pointer">计算磁盘读盘次数步骤</button>
            </div>

            <div v-if="fsAccessResult" id="file-result" class="p-4 bg-slate-50 border border-slate-200 rounded-lg text-xs leading-relaxed text-slate-700">
              <p class="mb-2 font-bold text-slate-800">目标定位结果：</p>
              <ul class="space-y-1 mb-4 list-disc list-inside">
                <li>访问字节对应的逻辑物理块号：<span class="text-indigo-600 font-bold">{{ fsAccessResult.targetBlock }}</span></li>
                <li>落入的磁盘寻址区间：<span class="font-bold text-slate-800">{{ fsAccessResult.range }}</span></li>
                <li>读取该段字节需经历的物理磁盘 I/O 读盘数：<strong class="text-indigo-600 text-sm">{{ fsAccessResult.totalReads }}</strong> 次</li>
              </ul>
              <p class="font-bold text-slate-800 mb-1">读盘加载寻址轨迹：</p>
              <ol class="list-decimal list-inside space-y-1 text-slate-550">
                <li v-for="(step, i) in fsAccessResult.steps" :key="i">
                  {{ step }}
                </li>
              </ol>
            </div>
          </div>
        </div>

      </section>

    </div>
  </div>
</template>

<script setup>
import { ref, computed, watch, nextTick } from 'vue'
import { useRoute } from 'vue-router'

const route = useRoute()

// 标题元数据
const routeMetaTitle = computed(() => route.meta.title || '')
const parentTitle = computed(() => route.meta.parentTitle || '')
const parentPath = computed(() => route.meta.parentPath || '')

// 分步步骤管理状态
const currentStep = ref(0)

const prevStep = () => {
  if (currentStep.value > 0) currentStep.value--
}
const nextStep = () => {
  if (currentStep.value < totalSteps.value - 1) currentStep.value++
}
const completeAll = () => {
  currentStep.value = totalSteps.value - 1
}

// 自动向下滑动到计算结果区域
const scrollToResult = (id) => {
  nextTick(() => {
    const el = document.getElementById(id)
    if (el) {
      el.scrollIntoView({ behavior: 'smooth', block: 'start' })
    }
  })
}

// 检测当前子专题所属大类类型，用于有条件的渲染相关算法数据结构
const activeType = computed(() => {
  if (parentPath.value.includes('cpu')) return 'cpu'
  if (parentPath.value.includes('banker')) return 'banker'
  if (parentPath.value.includes('page')) return 'page'
  if (parentPath.value.includes('disk')) return 'disk'
  if (parentPath.value.includes('pv')) return 'pv'
  if (parentPath.value.includes('file')) return 'file'
  return ''
})

// 计算当前运行算法的总步数
const totalSteps = computed(() => {
  if (activeType.value === 'cpu' && cpuResult.value) {
    return cpuResult.value.gantt.length
  }
  if (route.name === 'algo-banker-safety' && bankerResult.value && bankerResult.value.isSafe) {
    return bankerResult.value.steps.length
  }
  if (activeType.value === 'page' && pageSimResult.value) {
    return pageSimResult.value.steps.length
  }
  if (activeType.value === 'disk' && diskSimResult.value) {
    return diskSimResult.value.steps.length
  }
  return 0
})

// ================== SHARED SIMULATION STATES ==================

// 1. CPU Scheduling
const cpuProcesses = ref([
  { name: 'P1', arrival: 0, service: 8 },
  { name: 'P2', arrival: 1, service: 4 },
  { name: 'P3', arrival: 2, service: 9 },
  { name: 'P4', arrival: 3, service: 5 }
])
const cpuResult = ref(null)

const addCpuProcess = () => {
  cpuProcesses.value.push({ name: `P${cpuProcesses.value.length + 1}`, arrival: 0, service: 1 })
}
const removeCpuProcess = (idx) => {
  cpuProcesses.value.splice(idx, 1)
}

const runCpuScheduling = () => {
  const list = cpuProcesses.value.map(p => ({
    name: p.name,
    arrival: p.arrival,
    service: p.service,
    remaining: p.service,
    completion: 0
  })).sort((a, b) => a.arrival - b.arrival)

  if (list.length === 0) return

  let currentTime = 0
  const gantt = []
  
  if (route.name === 'algo-cpu-fcfs') {
    list.forEach(p => {
      if (currentTime < p.arrival) currentTime = p.arrival
      gantt.push({ name: p.name, start: currentTime, duration: p.service, end: currentTime + p.service })
      currentTime += p.service
      p.completion = currentTime
    })
  } else if (route.name === 'algo-cpu-sjf') {
    const finished = new Set()
    while (finished.size < list.length) {
      const candidates = list.filter(p => p.arrival <= currentTime && !finished.has(p.name))
      if (candidates.length === 0) {
        currentTime = list.find(p => !finished.has(p.name)).arrival
        continue
      }
      candidates.sort((a, b) => a.service - b.service)
      const target = candidates[0]
      gantt.push({ name: target.name, start: currentTime, duration: target.service, end: currentTime + target.service })
      currentTime += target.service
      target.completion = currentTime
      finished.add(target.name)
    }
  } else if (route.name === 'algo-cpu-srtf') {
    let running = null
    while (list.some(p => p.remaining > 0)) {
      const candidates = list.filter(p => p.arrival <= currentTime && p.remaining > 0)
      if (candidates.length === 0) {
        currentTime = Math.min(...list.filter(p => p.remaining > 0).map(p => p.arrival))
        continue
      }
      candidates.sort((a, b) => a.remaining - b.remaining)
      const nextToRun = candidates[0]

      if (running !== nextToRun) {
        if (running) {
          const lastG = gantt[gantt.length - 1]
          lastG.end = currentTime
          lastG.duration = lastG.end - lastG.start
        }
        gantt.push({ name: nextToRun.name, start: currentTime, duration: 1, end: currentTime + 1 })
        running = nextToRun
      } else {
        const lastG = gantt[gantt.length - 1]
        lastG.end = currentTime + 1
        lastG.duration = lastG.end - lastG.start
      }
      running.remaining--
      currentTime++
      if (running.remaining === 0) {
        running.completion = currentTime
        running = null
      }
    }
  } else if (route.name === 'algo-cpu-hrrn') {
    const finished = new Set()
    while (finished.size < list.length) {
      const candidates = list.filter(p => p.arrival <= currentTime && !finished.has(p.name))
      if (candidates.length === 0) {
        currentTime = list.find(p => !finished.has(p.name)).arrival
        continue
      }
      candidates.forEach(p => {
        const wait = currentTime - p.arrival
        p.rp = 1 + (wait / p.service)
      })
      candidates.sort((a, b) => b.rp - a.rp)
      const target = candidates[0]
      gantt.push({ name: target.name, start: currentTime, duration: target.service, end: currentTime + target.service })
      currentTime += target.service
      target.completion = currentTime
      finished.add(target.name)
    }
  } else if (route.name === 'algo-cpu-rr') {
    const queue = []
    let pIdx = 0
    const qSize = 2 // 默认 q = 2
    
    const loadNew = () => {
      while (pIdx < list.length && list[pIdx].arrival <= currentTime) {
        queue.push(list[pIdx])
        pIdx++
      }
    }
    
    loadNew()
    if (queue.length === 0 && pIdx < list.length) {
      currentTime = list[pIdx].arrival
      loadNew()
    }
    
    while (queue.length > 0 || pIdx < list.length) {
      if (queue.length === 0) {
        currentTime = list[pIdx].arrival
        loadNew()
      }
      const target = queue.shift()
      const runTime = Math.min(target.remaining, qSize)
      gantt.push({ name: target.name, start: currentTime, duration: runTime, end: currentTime + runTime })
      currentTime += runTime
      target.remaining -= runTime
      loadNew()
      if (target.remaining > 0) {
        queue.push(target)
      } else {
        target.completion = currentTime
      }
    }
  }

  let totalT = 0
  let totalW = 0
  const tableData = list.map(p => {
    const turnaround = p.completion - p.arrival
    const weighted = parseFloat((turnaround / p.service).toFixed(3))
    totalT += turnaround
    totalW += weighted
    return { name: p.name, arrival: p.arrival, service: p.service, completion: p.completion, turnaround, weightedTurnaround: weighted }
  })

  cpuResult.value = {
    gantt,
    table: tableData,
    avgTurnaround: (totalT / list.length).toFixed(2),
    avgWeighted: (totalW / list.length).toFixed(2)
  }
  currentStep.value = 0 // 重置为分步的第一步
  scrollToResult('cpu-result') // 自动平滑滚动
}

// Sliced reactive CPU results
const displayedCpuGantt = computed(() => {
  if (!cpuResult.value) return []
  return cpuResult.value.gantt.slice(0, currentStep.value + 1)
})

const currentEndTime = computed(() => {
  const g = displayedCpuGantt.value
  return g.length > 0 ? g[g.length - 1].end : 0
})

const displayedCpuTable = computed(() => {
  if (!cpuResult.value) return []
  return cpuResult.value.table.map(p => {
    const isCompleted = p.completion <= currentEndTime.value
    return {
      name: p.name,
      arrival: p.arrival,
      service: p.service,
      completion: isCompleted ? p.completion : '-',
      turnaround: isCompleted ? p.turnaround : '-',
      weightedTurnaround: isCompleted ? p.weightedTurnaround : '-'
    }
  })
})

// 2. Banker Safety Simulator
const bankerAvailable = ref([3, 3, 2])
const bankerRows = ref([
  { name: 'P0', max: [7, 5, 3], allocation: [0, 1, 0] },
  { name: 'P1', max: [3, 2, 2], allocation: [2, 0, 0] },
  { name: 'P2', max: [9, 0, 2], allocation: [3, 0, 2] },
  { name: 'P3', max: [2, 2, 2], allocation: [2, 1, 1] },
  { name: 'P4', max: [4, 3, 3], allocation: [0, 0, 2] }
])
const bankerResult = ref(null)

const runBankerCheck = () => {
  const processes = bankerRows.value.map(r => {
    const need = [r.max[0] - r.allocation[0], r.max[1] - r.allocation[1], r.max[2] - r.allocation[2]]
    return { name: r.name, allocation: [...r.allocation], need, finish: false }
  })

  let work = [...bankerAvailable.value]
  const sequence = []
  const steps = []
  let safe = true

  for (let c = 0; c < processes.length; c++) {
    let found = false
    for (let i = 0; i < processes.length; i++) {
      const p = processes[i]
      if (!p.finish && p.need[0] <= work[0] && p.need[1] <= work[1] && p.need[2] <= work[2]) {
        const newWork = [work[0] + p.allocation[0], work[1] + p.allocation[1], work[2] + p.allocation[2]]
        steps.push({ name: p.name, work: [...work], need: [...p.need], allocation: [...p.allocation], newWork })
        work = newWork
        p.finish = true
        sequence.push(p.name)
        found = true
        break
      }
    }
    if (!found) {
      safe = false
      break
    }
  }

  bankerResult.value = { isSafe: safe, sequence, steps }
  currentStep.value = 0
  scrollToResult('banker-result') // 自动平滑滚动
}

// Sliced Banker Results
const displayedBankerSteps = computed(() => {
  if (!bankerResult.value) return []
  return bankerResult.value.steps.slice(0, currentStep.value + 1)
})
const displayedBankerSequence = computed(() => {
  if (!bankerResult.value) return []
  return bankerResult.value.sequence.slice(0, currentStep.value + 1)
})

// 3. Page Replacement
const pageSequenceStr = ref('7,0,1,2,0,3,0,4,2,3,0,3,2,1,2,0,1,7,0,1')
const pageFrameCount = ref(3)
const pageSimResult = ref(null)

const runPageSimulation = () => {
  const pages = pageSequenceStr.value.split(',').map(p => p.trim()).filter(p => p !== '').map(p => parseInt(p, 10))
  if (pages.some(isNaN)) {
    alert('请输入正确的数字序列')
    return
  }
  const m = pageFrameCount.value
  const frames = Array(m).fill(null)
  const steps = []
  let faults = 0
  
  const algo = route.name.replace('algo-page-', '').toUpperCase() // OPT, FIFO, LRU, CLOCK

  if (algo === 'FIFO') {
    const queue = []
    pages.forEach(p => {
      const isHit = frames.includes(p)
      let replaced = null
      let isFault = false
      if (!isHit) {
        isFault = true
        faults++
        if (queue.length < m) {
          const emptyIdx = frames.indexOf(null)
          frames[emptyIdx] = p
          queue.push(p)
        } else {
          replaced = queue.shift()
          const replaceIdx = frames.indexOf(replaced)
          frames[replaceIdx] = p
          queue.push(p)
        }
      }
      steps.push({ page: p, frames: [...frames], isFault, replaced })
    })
  } else if (algo === 'LRU') {
    const lru = []
    pages.forEach(p => {
      const isHit = frames.includes(p)
      let replaced = null
      let isFault = false
      if (isHit) {
        lru.splice(lru.indexOf(p), 1)
        lru.push(p)
      } else {
        isFault = true
        faults++
        if (frames.includes(null)) {
          const emptyIdx = frames.indexOf(null)
          frames[emptyIdx] = p
          lru.push(p)
        } else {
          replaced = lru.shift()
          const replaceIdx = frames.indexOf(replaced)
          frames[replaceIdx] = p
          lru.push(p)
        }
      }
      steps.push({ page: p, frames: [...frames], isFault, replaced })
    })
  } else if (algo === 'OPT') {
    pages.forEach((p, idx) => {
      const isHit = frames.includes(p)
      let replaced = null
      let isFault = false
      if (!isHit) {
        isFault = true
        faults++
        if (frames.includes(null)) {
          const emptyIdx = frames.indexOf(null)
          frames[emptyIdx] = p
        } else {
          let farIdx = -1
          for (let f = 0; f < m; f++) {
            const block = frames[f]
            const nextIdx = pages.slice(idx + 1).indexOf(block)
            if (nextIdx === -1) {
              replaced = block
              break
            } else if (nextIdx > farIdx) {
              farIdx = nextIdx
              replaced = block
            }
          }
          frames[frames.indexOf(replaced)] = p
        }
      }
      steps.push({ page: p, frames: [...frames], isFault, replaced })
    })
  } else if (algo === 'CLOCK') {
    const bits = Array(m).fill(0)
    let ptr = 0
    pages.forEach(p => {
      const isHit = frames.includes(p)
      let replaced = null
      let isFault = false
      if (isHit) {
        bits[frames.indexOf(p)] = 1
      } else {
        isFault = true
        faults++
        if (frames.includes(null)) {
          const emptyIdx = frames.indexOf(null)
          frames[emptyIdx] = p
          bits[emptyIdx] = 1
          ptr = (emptyIdx + 1) % m
        } else {
          while (true) {
            if (bits[ptr] === 0) {
              replaced = frames[ptr]
              frames[ptr] = p
              bits[ptr] = 1
              ptr = (ptr + 1) % m
              break
            } else {
              bits[ptr] = 0
              ptr = (ptr + 1) % m
            }
          }
        }
      }
      steps.push({ page: p, frames: [...frames], isFault, replaced })
    })
  }

  pageSimResult.value = { algorithm: algo, steps, faults, total: pages.length }
  currentStep.value = 0
  scrollToResult('page-result') // 自动平滑滚动
}

// Sliced Page results
const displayedPageSteps = computed(() => {
  if (!pageSimResult.value) return []
  return pageSimResult.value.steps.slice(0, currentStep.value + 1)
})
const displayedPageFaults = computed(() => {
  return displayedPageSteps.value.filter(s => s.isFault).length
})

// 4. Disk Scheduling
const diskRequestsStr = ref('98, 183, 37, 122, 14, 124, 65, 67')
const diskHeadStart = ref(53)
const diskDirection = ref('up')
const diskSimResult = ref(null)

const runDiskSimulation = () => {
  const reqs = diskRequestsStr.value.split(',').map(r => r.trim()).filter(r => r !== '').map(r => parseInt(r, 10))
  if (reqs.some(isNaN)) {
    alert('请输入正确的请求序列')
    return
  }
  const start = diskHeadStart.value
  const steps = []
  const path = [start]
  let current = start
  
  const algo = route.name.replace('algo-disk-', '').toUpperCase() // FCFS, SSTF, SCAN, CSCAN

  if (algo === 'FCFS') {
    reqs.forEach(to => {
      steps.push({ from: current, to, distance: Math.abs(to - current) })
      path.push(to)
      current = to
    })
  } else if (algo === 'SSTF') {
    const queue = [...reqs]
    while (queue.length > 0) {
      queue.sort((a, b) => Math.abs(a - current) - Math.abs(b - current))
      const to = queue.shift()
      steps.push({ from: current, to, distance: Math.abs(to - current) })
      path.push(to)
      current = to
    }
  } else if (algo === 'SCAN') {
    const queue = [...reqs].sort((a, b) => a - b)
    const upper = queue.filter(r => r >= start)
    const lower = queue.filter(r => r < start).reverse()

    if (diskDirection.value === 'up') {
      upper.forEach(to => {
        steps.push({ from: current, to, distance: Math.abs(to - current) })
        path.push(to)
        current = to
      })
      if (lower.length > 0) {
        steps.push({ from: current, to: 199, distance: Math.abs(199 - current) })
        path.push(199)
        current = 199
        lower.forEach(to => {
          steps.push({ from: current, to, distance: Math.abs(to - current) })
          path.push(to)
          current = to
        })
      }
    } else {
      lower.reverse().forEach(to => {
        steps.push({ from: current, to, distance: Math.abs(to - current) })
        path.push(to)
        current = to
      })
      if (upper.length > 0) {
        steps.push({ from: current, to: 0, distance: Math.abs(0 - current) })
        path.push(0)
        current = 0
        upper.forEach(to => {
          steps.push({ from: current, to, distance: Math.abs(to - current) })
          path.push(to)
          current = to
        })
      }
    }
  } else if (algo === 'CSCAN') {
    const queue = [...reqs].sort((a, b) => a - b)
    const upper = queue.filter(r => r >= start)
    const lower = queue.filter(r => r < start)

    if (diskDirection.value === 'up') {
      upper.forEach(to => {
        steps.push({ from: current, to, distance: Math.abs(to - current) })
        path.push(to)
        current = to
      })
      steps.push({ from: current, to: 199, distance: Math.abs(199 - current) })
      path.push(199)
      steps.push({ from: 199, to: 0, distance: 199 })
      path.push(0)
      current = 0
      lower.forEach(to => {
        steps.push({ from: current, to, distance: Math.abs(to - current) })
        path.push(to)
        current = to
      })
    } else {
      const uRev = [...upper].reverse()
      const lRev = [...lower].reverse()
      lRev.forEach(to => {
        steps.push({ from: current, to, distance: Math.abs(to - current) })
        path.push(to)
        current = to
      })
      steps.push({ from: current, to: 0, distance: Math.abs(0 - current) })
      path.push(0)
      steps.push({ from: 0, to: 199, distance: 199 })
      path.push(199)
      current = 199
      uRev.forEach(to => {
        steps.push({ from: current, to, distance: Math.abs(to - current) })
        path.push(to)
        current = to
      })
    }
  }

  diskSimResult.value = { steps, path, totalDistance: steps.reduce((s, x) => s + x.distance, 0) }
  currentStep.value = 0
  scrollToResult('disk-result') // 自动平滑滚动
}

// Sliced disk results
const displayedDiskSteps = computed(() => {
  if (!diskSimResult.value) return []
  return diskSimResult.value.steps.slice(0, currentStep.value + 1)
})
const displayedDiskPath = computed(() => {
  if (!diskSimResult.value) return []
  return diskSimResult.value.path.slice(0, currentStep.value + 2)
})
const displayedDiskDistance = computed(() => {
  return displayedDiskSteps.value.reduce((s, x) => s + x.distance, 0)
})

// 5. PV Operations Code blocks mapping
const pvCodes = {
  'algo-pv-producer-consumer': `// ================== 信号量与共享缓冲区定义 ==================
semaphore mutex_in = 1;  // 互斥装入缓冲区指针操作
semaphore mutex_out = 1; // 互斥取出缓冲区指针操作
semaphore empty = N;     // 空槽位数量（同步信号量）
semaphore full = 0;      // 满槽位数量（同步信号量）
int in = 0, out = 0;     // 缓冲区循环读写索引

// ================== 生产者进程 ==================
void Producer() {
    while(true) {
        // 1. 产生数据项目 item
        P(empty);            // 检查并等待有空槽位
        P(mutex_in);         // 锁定写入共享区入口
        
        buffer[in] = item;   // 装入缓冲区
        in = (in + 1) % N;   // 循环移动指针
        
        V(mutex_in);         // 解除写入锁定
        V(full);             // 满槽增加，唤醒等待消费的进程
    }
}

// ================== 消费者进程 ==================
void Consumer() {
    while(true) {
        P(full);             // 等待有填充数据的物理块
        P(mutex_out);        // 锁定读出共享区出口
        
        item = buffer[out];  // 取出数据
        out = (out + 1) % N; // 循环移动读指针
        
        V(mutex_out);        // 释放读取通道
        V(empty);            // 空槽增加，唤醒等待生产的进程
        // 2. 消费及处理数据项目 item
    }
}`,
  'algo-pv-reader-writer': `// ================== 信号量与计数器定义 ==================
semaphore db = 1;       // 保护数据库文件的互斥共享锁
semaphore mutex = 1;    // 保护对共享变量 read_count 修改的互斥锁
int read_count = 0;     // 正在读的读者进程计数器

// ================== 写者进程 ==================
void Writer() {
    while(true) {
        P(db);              // 写者直接尝试锁定文件数据库（阻止其他读者和写者进入）
        // 1. 写入更新文件...
        V(db);              // 完成后释放共享库锁
    }
}

// ================== 读者进程 ==================
void Reader() {
    while(true) {
        P(mutex);           // 锁住计数器修改操作
        if (read_count == 0) {
            P(db);          // 如果是第一个进来的读者，必须去锁住数据库，阻止写者进入
        }
        read_count++;
        V(mutex);           // 释放计数器修改锁
        
        // 2. 在非独占模式下进行文件读取...
        
        P(mutex);           // 读完后锁住计数器修改操作
        read_count--;
        if (read_count == 0) {
            V(db);          // 如果是最后一个离开的读者，必须释放数据库锁，允许写者介入
        }
        V(mutex);           // 释放计数器修改锁
    }
}`,
  'algo-pv-philosophers': `// ================== 信号量定义 ==================
semaphore chopstick[5] = {1, 1, 1, 1, 1}; // 5根筷子分配锁
semaphore count = 4;                       // 限制最多只允许4名哲学家同时尝试进餐

// ================== 哲学家进程 i (0 ~ 4) ==================
void Philosopher(int i) {
    while(true) {
        // 1. 独立思考中...
        
        P(count);               // 尝试获取进餐位（防止5人同时拿筷产生死锁死循环）
        P(chopstick[i]);        // 拿取左侧筷子
        P(chopstick[(i + 1) % 5]); // 拿取右侧筷子
        
        // 2. 享用晚餐...
        
        V(chopstick[i]);        // 放下左侧筷子
        V(chopstick[(i + 1) % 5]); // 放下右侧筷子
        V(count);               // 归还进餐席位
    }
}`,
  'algo-pv-smokers': `// ================== 信号量与中介定义 ==================
semaphore offer1 = 0;   // 同步信号：中介供应了 组合1（纸+火柴）
semaphore offer2 = 0;   // 同步信号：中介供应了 组合2（烟草+火柴）
semaphore offer3 = 0;   // 同步信号：中介供应了 组合3（烟草+纸）
semaphore finish = 1;   // 抽烟完成信号锁（初始化为1，表示允许供应者摆放料包）

// ================== 中介/供应者进程 ==================
void Agent() {
    while(true) {
        P(finish);          // 阻塞等待，确保前一个吸烟者已抽完
        int rand_val = rand() % 3;
        if (rand_val == 0) {
            V(offer1);      // 摆放纸+火柴，唤醒吸烟者 A (有烟草)
        } else if (rand_val == 1) {
            V(offer2);      // 摆放烟草+火柴，唤醒吸烟者 B (有纸)
        } else {
            V(offer3);      // 摆放烟草+纸，唤醒吸烟者 C (有火柴)
        }
    }
}

// ================== 吸烟者 A (拥有烟草) ==================
void SmokerA() {
    while(true) {
        P(offer1);          // 等待中介给的纸和火柴
        // 卷烟，吸烟...
        V(finish);          // 释放同步完成，通知中介可继续投放
    }
}`,
  'algo-pv-bridge': `// ================== 互斥与方向定义 ==================
semaphore bridge = 1;       // 桥的占用互斥锁（东西两个反方向车辆冲突）
semaphore mutex_east = 1;   // 保护东向车流计数器 count_east 修改的锁
semaphore mutex_west = 1;   // 保护西向车流计数器 count_west 修改的锁
semaphore limit = K;        // 限制同向桥上最大车辆数不能超过 K 辆
int count_east = 0;         // 桥上正在行驶的东向车辆计数
int count_west = 0;         // 桥上正在行驶的西向车辆计数

// ================== 东向西车辆进程 ==================
void East_to_West() {
    P(mutex_east);
    if (count_east == 0) {
        P(bridge);          // 首辆东向车辆，抢占桥的单向通车权，阻塞西向车流
    }
    count_east++;
    V(mutex_east);

    P(limit);               // 检查桥上同向是否达到上限 K
    // 行车过桥中...
    V(limit);               // 顺利出桥，释放占有位置

    P(mutex_east);
    count_east--;
    if (count_east == 0) {
        V(bridge);          // 最后一辆出桥，释放桥方向使用权，允许对向过桥
    }
    V(mutex_east);
}`
}

const pvCodeContent = computed(() => {
  return pvCodes[route.name] || ''
})

// 6. File System Calculators
const fsBlockSize = ref(1024)
const fsPtrSize = ref(4)
const fsDirectCount = ref(10)
const fsSingleCount = ref(1)
const fsDoubleCount = ref(1)
const fsTripleCount = ref(0)
const fsOffsetVal = ref(10)
const fsOffsetUnit = ref('KB')
const fsAccessResult = ref(null)

const fsIndexCapacity = computed(() => fsBlockSize.value / fsPtrSize.value)
const fsMaxTotalBlocks = computed(() => {
  const n = fsIndexCapacity.value
  return fsDirectCount.value + (fsSingleCount.value * n) + (fsDoubleCount.value * n * n) + (fsTripleCount.value * n * n * n)
})
const fsMaxFileSizeFormatted = computed(() => {
  const bytes = fsMaxTotalBlocks.value * fsBlockSize.value
  const kb = bytes / 1024
  if (kb < 1024) return `${kb.toFixed(1)} KB`
  const mb = kb / 1024
  if (mb < 1024) return `${mb.toFixed(2)} MB`
  return `${(mb / 1024).toFixed(2)} GB`
})

const calcFsAccess = () => {
  let bytes = fsOffsetVal.value * 1024
  if (fsOffsetUnit.value === 'MB') bytes *= 1024
  const targetBlock = Math.floor(bytes / fsBlockSize.value)
  const n = fsIndexCapacity.value
  const d = fsDirectCount.value
  const s = fsSingleCount.value
  
  let range = ''
  let totalReads = 0
  const steps = []

  if (targetBlock < d) {
    range = '直接寻址区'
    totalReads = 1
    steps.push(`根据FCB的第 ${targetBlock} 个直接地址项，直接读物理磁盘块 ${targetBlock}`)
  } else if (targetBlock < d + s * n) {
    range = '一级间接寻址区'
    totalReads = 2
    steps.push(`1. 读取一级间接索引块，定位得到其中的指针地址`)
    steps.push(`2. 访问对应的物理磁盘块，取出数据`)
  } else if (targetBlock < d + s * n + fsDoubleCount.value * n * n) {
    range = '二级间接寻址区'
    totalReads = 3
    steps.push(`1. 读取二级间接索引块，定位指向一级索引块 the block pointer`)
    steps.push(`2. 读取该一级索引块，定位指向目标数据磁盘块 the block pointer`)
    steps.push(`3. 读取具体的目标物理数据磁盘块`)
  } else {
    range = '超出当前表示范围'
    totalReads = 0
    steps.push('寻址越界')
  }
  fsAccessResult.value = { targetBlock, range, totalReads, steps }
  scrollToResult('file-result') // 自动平滑滚动
}

// Reset results on route changes
watch(() => route.path, () => {
  cpuResult.value = null
  bankerResult.value = null
  pageSimResult.value = null
  diskSimResult.value = null
  fsAccessResult.value = null
})
</script>

<style scoped>
.animate-fade-in {
  animation: fadeIn 0.2s cubic-bezier(0.4, 0, 0.2, 1) forwards;
}
@keyframes fadeIn {
  from { opacity: 0; transform: translateY(4px); }
  to { opacity: 1; transform: translateY(0); }
}
</style>
