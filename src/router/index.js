import { createRouter, createWebHistory } from 'vue-router'
import MainLayout from '../layout/MainLayout.vue'
import Home from '../views/Home.vue'
import ChapterBase from '../views/ChapterBase.vue'
import Algorithm from '../views/Algorithm.vue'
import Preview from '../views/Preview.vue'

// 侧栏及目录结构：普通章节依然直接跳转，算法专题则重构为 6 个独立的顶级模块
// 每个模块下细分出专门的子专题（每个算法有单独的页面与路由）
export const menuStructure = [
  { path: 'chapter1', name: 'chapter1', meta: { title: '第1章 操作系统概述' } },
  { path: 'chapter2', name: 'chapter2', meta: { title: '第2章 进程与线程' } },
  { path: 'chapter3', name: 'chapter3', meta: { title: '第3章 进程同步' } },
  { path: 'chapter4', name: 'chapter4', meta: { title: '第4章 处理机调度' } },
  { path: 'chapter5', name: 'chapter5', meta: { title: '第5章 死锁' } },
  { path: 'chapter6', name: 'chapter6', meta: { title: '第6章 内存管理' } },
  { path: 'chapter7', name: 'chapter7', meta: { title: '第7章 虚拟存储管理' } },
  { path: 'chapter8', name: 'chapter8', meta: { title: '第8章 设备管理' } },
  { path: 'chapter9', name: 'chapter9', meta: { title: '第9章 文件管理' } },
  { path: 'chapter10', name: 'chapter10', meta: { title: '第10章 系统安全' } },
  { path: 'chapter11', name: 'chapter11', meta: { title: '第11章 操作系统接口' } },
  
  // 顶级模块一
  {
    path: 'algorithm-cpu',
    name: 'algorithm-cpu',
    meta: { title: '模块一：CPU 调度算法' },
    children: [
      { path: 'fcfs', name: 'algo-cpu-fcfs', meta: { title: '先来先服务 (FCFS)' } },
      { path: 'sjf', name: 'algo-cpu-sjf', meta: { title: '非抢占短作业优先 (SJF)' } },
      { path: 'srtf', name: 'algo-cpu-srtf', meta: { title: '抢占式短作业优先 (SRTF)' } },
      { path: 'rr', name: 'algo-cpu-rr', meta: { title: '时间片轮转 (RR)' } },
      { path: 'priority', name: 'algo-cpu-priority', meta: { title: '优先级调度' } },
      { path: 'hrrn', name: 'algo-cpu-hrrn', meta: { title: '高响应比优先 (HRRN)' } },
      { path: 'mfq', name: 'algo-cpu-mfq', meta: { title: '多级反馈队列调度 (MFQ)' } },
      { path: 'fair', name: 'algo-cpu-fair', meta: { title: '基于公平原则的调度' } }
    ]
  },
  // 顶级模块二
  {
    path: 'algorithm-banker',
    name: 'algorithm-banker',
    meta: { title: '模块二：银行家安全算法' },
    children: [
      { path: 'theory', name: 'algo-banker-theory', meta: { title: '银行家算法基本原理' } },
      { path: 'safety', name: 'algo-banker-safety', meta: { title: '安全性检查模拟' } }
    ]
  },
  // 顶级模块三
  {
    path: 'algorithm-page',
    name: 'algorithm-page',
    meta: { title: '模块三：页面置换算法' },
    children: [
      { path: 'opt', name: 'algo-page-opt', meta: { title: '最佳置换算法 (OPT)' } },
      { path: 'fifo', name: 'algo-page-fifo', meta: { title: '先进先出置换 (FIFO)' } },
      { path: 'lru', name: 'algo-page-lru', meta: { title: '最近最久未使用 (LRU)' } },
      { path: 'clock', name: 'algo-page-clock', meta: { title: '时钟置换算法 (CLOCK)' } },
      { path: 'lfu', name: 'algo-page-lfu', meta: { title: '最近最少使用 (LFU)' } }
    ]
  },
  // 顶级模块四
  {
    path: 'algorithm-disk',
    name: 'algorithm-disk',
    meta: { title: '模块四：磁盘调度算法' },
    children: [
      { path: 'fcfs', name: 'algo-disk-fcfs', meta: { title: '先来先服务 (FCFS)' } },
      { path: 'sstf', name: 'algo-disk-sstf', meta: { title: '最短寻道时间优先 (SSTF)' } },
      { path: 'scan', name: 'algo-disk-scan', meta: { title: '扫描算法 / 电梯算法 (SCAN)' } },
      { path: 'c-scan', name: 'algo-disk-cscan', meta: { title: '循环扫描 (C-SCAN)' } },
      { path: 'nstep-scan', name: 'algo-disk-nstep', meta: { title: 'N步扫描 (N-Step SCAN)' } }
    ]
  },
  // 顶级模块五
  {
    path: 'algorithm-pv',
    name: 'algorithm-pv',
    meta: { title: '模块五：经典 PV 操作代码' },
    children: [
      { path: 'producer-consumer', name: 'algo-pv-producer-consumer', meta: { title: '生产者-消费者问题' } },
      { path: 'reader-writer', name: 'algo-pv-reader-writer', meta: { title: '读者-写者问题' } },
      { path: 'philosophers', name: 'algo-pv-philosophers', meta: { title: '哲学家进餐问题' } }
    ]
  },
  // 顶级模块六
  {
    path: 'algorithm-file',
    name: 'algorithm-file',
    meta: { title: '模块六：文件系统空间与索引' },
    children: [
      { path: 'capacity', name: 'algo-file-capacity', meta: { title: '混合索引容量计算' } },
      { path: 'access', name: 'algo-file-access', meta: { title: '寻址读盘次数计算' } }
    ]
  }
]

// 生成 Vue Router 路由表
const generateRoutes = () => {
  const routes = [
    {
      path: '/',
      component: MainLayout,
      children: [
        {
          path: '',
          name: 'home',
          component: Home,
          meta: { title: '首页' }
        }
      ]
    },
    {
      path: '/preview',
      name: 'preview',
      component: Preview,
      meta: { title: '在线文档预览' }
    }
  ]

  // 构建路由映射表，普通章节映射到 ChapterBase，算法的每一个子专题均映射到 Algorithm
  menuStructure.forEach(item => {
    if (item.children) {
      // 算法模块路由组
      const algoParentRoute = {
        path: item.path,
        children: []
      }
      
      item.children.forEach(child => {
        algoParentRoute.children.push({
          path: child.path,
          name: child.name,
          component: Algorithm,
          meta: { 
            title: child.meta.title,
            parentTitle: item.meta.title,
            parentPath: item.path
          }
        })
      })
      
      routes[0].children.push(algoParentRoute)
    } else {
      // 理论章节路由
      routes[0].children.push({
        path: item.path,
        name: item.name,
        component: ChapterBase,
        meta: { 
          title: item.meta.title,
          parentTitle: '理论章节',
          parentPath: item.path
        }
      })
    }
  })

  return routes
}

const router = createRouter({
  history: createWebHistory(),
  routes: generateRoutes(),
  scrollBehavior() {
    return { top: 0 }
  }
})

export default router
