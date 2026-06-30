export const chapterLectures = {
  chapter1: {
    overview: '操作系统概述是整个课程的基石。主要介绍操作系统的基本概念、特征、发展历史以及核心功能模块。',
    sections: [
      {
        title: '操作系统的定义与地位',
        content: '<p class="leading-relaxed mb-4">操作系统 (Operating System, OS) 是控制和管理整个计算机系统的硬件与软件资源、合理地组织和调度计算机工作和资源分配，并为用户和其他软件提供方便接口与环境的程序集合。它是计算机系统中最基本的<strong>系统软件</strong>，上接应用软件与用户，下控裸机硬件。</p>'
      },
      {
        title: '操作系统的四大特征',
        content: '<ul class="list-disc list-inside space-y-2 mb-4"><li><strong>并发 (Concurrency)：</strong>指两个或多个事件在同一时间间隔内发生。并发是操作系统的最基本特征。</li><li><strong>共享 (Sharing)：</strong>指系统中的资源可供内存中多个并发执行的进程共同使用。方式包括：互斥共享（如打印机）和同时共享（如磁盘）。</li><li><strong>虚拟 (Virtualization)：</strong>通过某种技术把一个物理实体变为若干个逻辑上的对应物。例如：时钟分时、虚拟内存。</li><li><strong>异步 (Asynchrony)：</strong>多道程序环境下，各程序由于资源有限而以“停停走走”的非连续方式运行，其推进速度是预先无法确定的。</li></ul>'
      },
      {
        title: '操作系统的分类与演进',
        content: '<ol class="list-decimal list-inside space-y-2 mb-4"><li><strong>单道批处理系统：</strong>解决人机矛盾，但CPU在I/O时空闲，利用率低。</li><li><strong>多道批处理系统：</strong>利用多道程序设计技术，允许进程交替运行，大幅提高CPU和外设利用率，但缺乏交互能力。</li><li><strong>分时操作系统：</strong>采用时间片轮转，提供人机交互，具有同时性、独立性、交互性、及时性。</li><li><strong>实时操作系统：</strong>在严格时间约束内响应和处理事件，分为硬实时和软实时，强调高可靠性与及时性。</li><li><strong>微内核操作系统：</strong>将非核心功能（如文件系统、驱动）移至用户态服务进程中，内核只保留最基本的功能。结构清晰、扩展性好、安全可靠，但由于频繁的用户/内核态切换，存在一定性能开销。</li></ol>'
      },
      {
        title: '核心管理功能',
        content: '<ul class="list-disc list-inside space-y-2 mb-4"><li><strong>处理器管理：</strong>进程控制、同步、通信、调度。</li><li><strong>存储器管理：</strong>内存分配与回收、地址映射、内存保护与扩充。</li><li><strong>设备管理：</strong>设备分配、设备处理、缓冲管理。</li><li><strong>文件管理：</strong>外存空间管理、目录管理、读写管理与存取控制。</li></ul>'
      }
    ]
  },
  chapter2: {
    overview: '进程与线程是操作系统的核心调度实体。主要介绍并发程序特征、进程实体构成、进程状态机变化、线程以及进程通信。',
    sections: [
      {
        title: '程序顺序执行与并发执行的特征',
        content: '<ul class="list-disc list-inside space-y-2 mb-4"><li><strong>顺序执行：</strong>具有顺序性、封闭性、可再现性（结果与执行速度无关）。</li><li><strong>并发执行：</strong>失去封闭性、不可再现性（执行结果受并发时序影响），且具有间断性（“执行-暂停-执行”）。</li></ul>'
      },
      {
        title: '进程的定义与PCB',
        content: '<p class="leading-relaxed mb-4">进程是程序在一个数据集合上的运行过程，是系统进行资源分配和调度的一个独立单位。进程由<strong>程序段</strong>、<strong>相关数据段</strong>和<strong>进程控制块 (PCB)</strong> 组成。PCB是进程存在的唯一标志，操作系统通过PCB来控制和管理进程。</p>'
      },
      {
        title: '进程的五态模型与转换',
        content: '<p class="leading-relaxed mb-4">进程的五种基本状态包括：<strong>创建态、就绪态、运行态、阻塞态（等待态）、终止态</strong>。</p><ul class="list-disc list-inside space-y-2 mb-4"><li><strong>就绪 &rarr; 运行：</strong>进程调度程序选中并分配CPU。</li><li><strong>运行 &rarr; 就绪：</strong>时间片用完，或有高优先级进程抢占。</li><li><strong>运行 &rarr; 阻塞：</strong>进程请求I/O或等待某事件发生（主动行为）。</li><li><strong>阻塞 &rarr; 就绪：</strong>进程等待的事件已发生（被动行为）。</li></ul>'
      },
      {
        title: '线程的基本概念',
        content: '<p class="leading-relaxed mb-4">线程是进程内的一个执行单元，也是CPU<strong>独立调度的基本单位</strong>。引入线程是为了减少并发执行时的时空开销（线程创建、销毁和切换速度远快于进程）。线程分为<strong>用户级线程 (ULT)</strong> 和<strong>内核级线程 (KLT)</strong>。同一个进程中的线程共享进程的所有资源（如地址空间、打开的文件等），但每个线程拥有独立的栈和寄存器上下文。</p>'
      },
      {
        title: '进程通信 (IPC) 方式',
        content: '<ul class="list-disc list-inside space-y-2 mb-4"><li><strong>共享内存：</strong>在内存中分配一块共享区域，进程直接读写，速度最快。</li><li><strong>管道 (Pipe)：</strong>单向、先进先出的字节流通道。半双工通信。</li><li><strong>消息队列：</strong>由格式化消息组成的链表，存放在内核中，支持按类型存取。</li><li><strong>套接字 (Socket)：</strong>可在不同主机间的进程进行双向通信。</li></ul>'
      }
    ]
  },
  chapter3: {
    overview: '进程同步讨论在并发环境下如何协调协作进程的执行顺序及对共享资源的互斥访问，避免竞争条件。',
    sections: [
      {
        title: '同步与互斥的概念',
        content: '<ul class="list-disc list-inside space-y-2 mb-4"><li><strong>进程互斥：</strong>多个并发进程因争夺共享的临界资源而产生的间接制约关系。同一时间只允许一个进程访问。</li><li><strong>进程同步：</strong>多个协作进程为完成共同任务，按某种预定顺序交替执行的直接制约关系。</li></ul>'
      },
      {
        title: '临界资源与临界区访问准则',
        content: '<p class="leading-relaxed mb-4"><strong>临界资源</strong>是一段时间内仅允许一个进程访问的资源。访问临界资源的代码称为<strong>临界区</strong>。访问准则包括：</p><ol class="list-decimal list-inside space-y-2 mb-4"><li><strong>空闲让进：</strong>临界区空闲时，应允许请求进程立即进入。</li><li><strong>忙则等待：</strong>临界区被占用时，其他试图进入的进程必须等待。</li><li><strong>有限等待：</strong>保证请求进程在有限时间内能进入临界区，避免死锁或饥饿。</li><li><strong>让权等待：</strong>进程不能进入临界区时，应立即释放CPU，进入阻塞状态。</li></ol>'
      },
      {
        title: '信号量与PV操作',
        content: '<p class="leading-relaxed mb-4">信号量 (Semaphore) 是一种常用于同步和互斥的机制。通过 <code>P(S)</code> (或 <code>wait(S)</code>) 和 <code>V(S)</code> (或 <code>signal(S)</code>) 两个原子操作进行控制。</p><ul class="list-disc list-inside space-y-2 mb-4"><li><code>P(S)</code>：S减1，若 S < 0，则进程阻塞并加入等待队列。</li><li><code>V(S)</code>：S加1，若 S &le; 0，则唤醒等待队列中的一个进程。</li></ul>'
      },
      {
        title: '经典同步互斥问题',
        content: '<p class="leading-relaxed mb-4">操作系统经典同步模型包括：</p><ul class="list-disc list-inside space-y-2 mb-4"><li><strong>生产者-消费者问题：</strong>协调生产者写和消费者读，需解决缓冲区满/空同步以及缓冲区互斥访问。</li><li><strong>读者-写者问题：</strong>允许多个读者同时读，但写者与读者、写者与写者互斥。</li><li><strong>哲学家进餐问题：</strong>防止由于并发死锁而导致所有哲学家都拿不到双筷子。</li></ul>'
      }
    ]
  },
  chapter4: {
    overview: '处理机调度决定当CPU空闲时将处理机分配给哪个进程。主要介绍调度层次、时机和经典调度算法。',
    sections: [
      {
        title: '处理机调度的层次',
        content: '<ul class="list-disc list-inside space-y-2 mb-4"><li><strong>高级调度（作业调度）：</strong>从外存后备作业队列中挑选作业装入内存，并创建进程。</li><li><strong>中级调度（内存调度）：</strong>将暂时不能运行的进程对换到外存挂起，当内存空闲且进程具备运行条件时再调入内存。</li><li><strong>低级调度（进程调度）：</strong>从就绪队列中选择进程分配CPU。频率最高。</li></ul>'
      },
      {
        title: '调度时机与不能调度的情况',
        content: '<p class="leading-relaxed mb-4"><strong>不能进行进程调度的情况：</strong></p><ul class="list-disc list-inside space-y-2 mb-4"><li>在中断处理过程中。</li><li>在内核程序临界区内（注意：普通临界区可以调度）。</li><li>在原子操作过程中（如关中断状态下）。</li></ul>'
      },
      {
        title: '典型调度算法',
        content: '<ul class="list-disc list-inside space-y-2 mb-4"><li><strong>先来先服务 (FCFS)：</strong>简单，对长作业有利，对短作业不利。</li><li><strong>短作业优先 (SJF)：</strong>选择执行时间最短的进程。平均等待时间最短，但可能导致长作业饥饿。</li><li><strong>时间片轮转 (RR)：</strong>分时系统使用。各进程轮流运行一个时间片，超时则送回就绪队列尾部。</li><li><strong>高响应比优先 (HRRN)：</strong>响应比 Rp = (等待时间 + 要求服务时间) / 要求服务时间。兼顾短作业和等待时间长的长作业。</li><li><strong>多级反馈队列：</strong>最公认的调度算法。设置多个优先级递减、时间片递增的队列，新进程先进入高优先级队列，超时则降级。</li></ul>'
      }
    ]
  },
  chapter5: {
    overview: '死锁是指多个进程因竞争资源而造成的一种僵局，若无外力作用，它们都将无法向前推进。',
    sections: [
      {
        title: '死锁的概念与原因',
        content: '<p class="leading-relaxed mb-4">死锁的产生主要是由于<strong>资源竞争</strong>和<strong>进程推进顺序非法</strong>。</p>'
      },
      {
        title: '死锁产生的四个必要条件',
        content: '<ul class="list-disc list-inside space-y-2 mb-4"><li><strong>互斥条件：</strong>资源在一段时间内只能由一个进程独占。</li><li><strong>请求与保持条件：</strong>进程已占有至少一个资源，但又提出新的资源请求，而该资源被其他进程占有，此时请求进程阻塞，但对已占有资源保持不放。</li><li><strong>非抢占条件：</strong>进程已获得的资源在未使用完之前不能被强行剥夺。</li><li><strong>循环等待条件：</strong>存在一个进程链，每个进程都在等待链中下一个进程所占有的资源。</li></ul>'
      },
      {
        title: '死锁处理策略',
        content: '<ol class="list-decimal list-inside space-y-2 mb-4"><li><strong>预防死锁：</strong>通过限制进程的资源申请条件，破坏死锁四个必要条件中的一个或多个。开销大，资源利用率低。</li><li><strong>避免死锁：</strong>在资源分配过程中，动态评估分配是否安全，拒绝进入不安全状态。代表算法为<strong>银行家算法</strong>。</li><li><strong>死锁检测与解除：</strong>允许死锁发生，但通过资源分配图简化等方法检测死锁，并通过剥夺资源、撤销进程等方式解除死锁。</li></ol>'
      }
    ]
  },
  chapter6: {
    overview: '内存管理负责内存分配、地址重定位、共享与保护，将逻辑地址空间映射到物理内存中。',
    sections: [
      {
        title: '连续分配管理方式',
        content: '<ul class="list-disc list-inside space-y-2 mb-4"><li><strong>单一连续分配：</strong>只用于单用户单任务系统，内存分系统区和用户区。</li><li><strong>固定分区分配：</strong>将用户空间划分为若干个固定大小分区，易产生<strong>内部碎片</strong>。</li><li><strong>动态分区分配：</strong>根据进程大小动态划分分区。易产生<strong>外部碎片</strong>（可通过“紧凑/拼接”技术解决）。常见分配算法：首次适应 (FF)、最佳适应 (BF)、最坏适应 (WF)。</li></ul>'
      },
      {
        title: '地址转换与内存保护',
        content: '<ul class="list-disc list-inside space-y-2 mb-4"><li><strong>逻辑地址与物理地址：</strong>逻辑地址是程序编译后的相对地址（从0开始），物理地址是内存的实际物理单元地址。</li><li><strong>地址重定位：</strong>把逻辑地址转换为物理地址。分为静态重定位（装入时转换）和动态重定位（运行时结合重定位寄存器转换）。</li><li><strong>内存保护：</strong>由界地址寄存器（限长寄存器）或上下限寄存器实现，防止进程越界访问其他进程或系统区域。</li></ul>'
      },
      {
        title: '基本分页与分段存储管理',
        content: '<ul class="list-disc list-inside space-y-2 mb-4"><li><strong>基本分页管理：</strong>将内存划分为大小相等的物理块，进程逻辑地址划分为页。页表记录页号到物理块号的映射。<strong>目的是提高内存利用率，离散分配。无外部碎片，有微小页内碎片。</strong></li><li><strong>基本分段管理：</strong>按程序的逻辑结构划分段（如主程序、子程序、数据段等）。段表记录段号、段长和基址。<strong>目的是方便程序员编程、共享和保护。</strong>有外部碎片，无内部碎片。</li><li><strong>段页式存储管理：</strong>结合两者的优点。先将用户程序分成若干段，再把段分成若干页。每个进程有一个段表，每个段对应一个页表。</li></ul>'
      }
    ]
  },
  chapter7: {
    overview: '虚拟存储管理扩展了物理内存的逻辑限制。通过请求分页或分段，使得程序无需全部装入即可运行，实现“大内存”的幻觉。',
    sections: [
      {
        title: '虚拟存储器的概念与特征',
        content: '<p class="leading-relaxed mb-4">虚拟存储器是指具有请求调入功能和置换功能，能从逻辑上对内存容量进行扩充的一种存储器系统。其特征包括：<strong>多次性</strong>（程序分段分批装入）、<strong>对换性</strong>（内存外存对换）和<strong>虚拟性</strong>（逻辑上扩大物理内存）。</p>'
      },
      {
        title: '请求分页存储管理',
        content: '<p class="leading-relaxed mb-4">在基本分页基础上，增加了<strong>页表项状态位</strong>（存在位、修改位、访问位、外存地址），当访问的页不在内存中时，触发<strong>缺页中断</strong>，由操作系统将缺页从外存调入内存，并修改页表。</p>'
      },
      {
        title: '页面置换算法 (Page Replacement)',
        content: '<p class="leading-relaxed mb-4">当内存满且发生缺页时，选择淘汰哪个页面的算法：</p><ul class="list-disc list-inside space-y-2 mb-4"><li><strong>最佳置换算法 (OPT)：</strong>淘汰以后永不使用或最长时期内不使用的页面。理想算法，无法实际实现。</li><li><strong>先进先出 (FIFO)：</strong>淘汰最早进入内存的页面。实现简单，但可能产生 <strong>Belady 异常</strong>。</li><li><strong>最近最久未使用 (LRU)：</strong>淘汰最近最长时间未被访问的页面。需要硬件支持（栈或计数器），性能最接近 OPT。</li><li><strong>时钟置换算法 (CLOCK)：</strong>折中算法。给每页设置访问位，循环扫描，若访问位为0则置换，为1则清0并继续扫描。</li></ul>'
      },
      {
        title: '抖动与工作集',
        content: '<p class="leading-relaxed mb-4"><strong>抖动 (Thrashing)：</strong>指刚被换出的页面又立即要被换入，刚被换入的页面又立即被换出，使得系统排队换页的时间远大于程序运行时间，系统效率急剧下降。原因主要是并发进程数过多，分配给每个进程的物理块数不足。<strong>工作集</strong>是指进程在某段时间内实际访问的页面的集合，分配给进程的物理块数应大于或等于其工作集大小以避免抖动。</p>'
      }
    ]
  },
  chapter8: {
    overview: '设备管理（I/O管理）负责管理各种外部设备，提供统一的I/O接口，缓和CPU与外设的速度矛盾，提高设备利用率。',
    sections: [
      {
        title: 'I/O 控制方式的演进',
        content: '<ul class="list-disc list-inside space-y-2 mb-4"><li><strong>程序I/O（查询方式）：</strong>CPU循环查询设备状态，极度浪费CPU时间。</li><li><strong>中断驱动方式：</strong>I/O启动后CPU继续工作，设备就绪后发中断通知CPU。以字节为单位，中断开销仍然较大。</li><li><strong>直接内存存取 (DMA) 方式：</strong>由DMA控制器控制。在设备与内存间以“块”为单位直接传输数据，仅在块传输结束时发出中断。</li><li><strong>通道控制方式：</strong>引入特殊的通道协处理器，CPU只需发布通道命令，通道自行控制复杂的I/O操作及多块数据传输，极大解放CPU。</li></ul>'
      },
      {
        title: '缓冲管理',
        content: '<p class="leading-relaxed mb-4">引入缓冲区的目的是缓和CPU与I/O设备速度不匹配的矛盾，提高它们之间的并行性。缓冲区分为：单缓冲、双缓冲、循环缓冲和缓冲池（公用缓冲区，由空缓冲区队列、输入队列、输出队列组成）。</p>'
      },
      {
        title: 'SPOOLing (假脱机) 技术',
        content: '<p class="leading-relaxed mb-4">SPOOLing（Simultaneous Peripheral Operations On-Line）是在多道程序环境下，利用外存（磁盘）的输入输出井，将独占设备改造成共享虚拟设备的技术。例如，多台电脑共享一台物理打印机时，打印数据先写入磁盘输入井队列，再由打印进程依次调出打印。</p>'
      },
      {
        title: '磁盘调度算法',
        content: '<p class="leading-relaxed mb-4">磁盘物理读写时间 = 寻道时间 + 旋转延迟 + 传输时间。其中<strong>寻道时间最长</strong>，因此磁盘调度算法主要优化寻道磁头移动顺序：</p><ul class="list-disc list-inside space-y-2 mb-4"><li><strong>FCFS：</strong>按请求磁道顺序服务。</li><li><strong>SSTF (最短寻道时间优先)：</strong>每次选择与当前磁头距离最近的磁道。寻道效率高，但可能产生边缘磁道的<strong>饥饿</strong>。</li><li><strong>SCAN (电梯调度)：</strong>磁头沿一个方向移动，直到该方向无请求或到达边界才反向。避免了饥饿，性能较好。</li><li><strong>LOOK：</strong>对 SCAN 的改进。移动方向上如果已无请求，就立即反向，无需移到磁盘最边缘。</li></ul>'
      }
    ]
  },
  chapter9: {
    overview: '文件管理是操作系统为用户提供的数据存取接口。主要介绍文件的逻辑和物理结构、目录管理以及外存空间管理。',
    sections: [
      {
        title: '文件的逻辑结构与物理分配',
        content: '<ul class="list-disc list-inside space-y-2 mb-4"><li><strong>逻辑结构（用户视角）：</strong>分为无结构文件（字节流）和有结构文件（记录文件，如顺序、索引、索引顺序文件）。</li><li><strong>物理分配结构（物理块视角）：</strong><br>- <em>顺序分配：</em>分配连续物理块。读写速度快，支持随机存取，但容易产生碎片，不便动态扩充。<br>- <em>链接分配：</em>通过链表指针将分散的物理块连接起来（分为隐式链接和显式链接FAT）。解决了碎片，便于动态扩充，但隐式链接不支持随机存取，且指针占用空间，容易断链。<br>- <em>索引分配：</em>为每个文件建立一个索引块，记录该文件占用的所有物理块号。支持随机存取，无碎片，便于大文件管理（支持多级索引）。</li></ul>'
      },
      {
        title: '目录管理',
        content: '<p class="leading-relaxed mb-4">目录管理的主要任务是实现“按名存取”、提高文件检索速度和实现文件共享。现代OS普遍采用<strong>树形目录结构</strong>。为了提高检索速度，可将目录项中的文件名与文件描述信息分离，使目录项仅包含文件名和指向<strong>索引节点 (inode)</strong> 的指针，从而减少目录文件占用的磁盘块数。</p>'
      },
      {
        title: '磁盘存储空间管理',
        content: '<ul class="list-disc list-inside space-y-2 mb-4"><li><strong>空闲表法：</strong>适用于顺序分配方式。</li><li><strong>空闲链表法：</strong>将所有空闲物理块连接成链表。</li><li><strong>位示图法 (Bitmap)：</strong>利用二进制位（0或1）表示磁盘上各个物理块的空闲状态。易于在内存中缓存，查找速度快。</li><li><strong>成组链接法：</strong>将空闲物理块分成若干组，每组的第一块记录下一组的空闲块数和物理块号。Unix系统采用此法，效率极高。</li></ul>'
      }
    ]
  },
  chapter10: {
    overview: '系统安全介绍操作系统层面的安全威胁、访问控制机制以及系统保护技术。',
    sections: [
      {
        title: '安全威胁与系统保护',
        content: '<p class="leading-relaxed mb-4">操作系统面临的安全威胁包括：特洛伊木马、后门、计算机病毒、蠕虫、拒绝服务攻击（DoS）等。系统保护的目标是保护计算机中的信息资源，防止未经授权的修改、破坏和窃取。</p>'
      },
      {
        title: '访问控制矩阵与策略',
        content: '<p class="leading-relaxed mb-4">为了实现对资源的精细化访问控制，通常使用<strong>访问控制矩阵</strong>。它记录了“主体（Subject，如进程、用户）”对“客体（Object，如文件、设备）”的访问权限（读、写、执行等）。</p><ul class="list-disc list-inside space-y-2 mb-4"><li><strong>访问控制列表 (ACL)：</strong>以客体为核心，对每个客体附加一个允许访问它的主体及权限的列表。</li><li><strong>能力表 (Capabilities)：</strong>以主体为核心，对每个主体附加一个它所拥有的客体及访问权限的列表。</li></ul>'
      }
    ]
  },
  chapter11: {
    overview: '操作系统接口是连接用户、开发人员与系统内核的桥梁。主要介绍命令行、图形接口以及底层的系统调用机制。',
    sections: [
      {
        title: '操作系统接口分类',
        content: '<ul class="list-disc list-inside space-y-2 mb-4"><li><strong>用户交互接口：</strong>命令行接口 (CLI) 和图形用户接口 (GUI)。</li><li><strong>程序接口（编程接口）：</strong>由系统调用 (System Call) 组成，供用户程序访问系统资源和内核服务。</li></ul>'
      },
      {
        title: '系统调用 (System Call) 机制',
        content: '<p class="leading-relaxed mb-4">系统调用是操作系统提供给应用程序的唯一接口。当程序需要访问受保护资源（如读写磁盘、创建进程等）时，必须通过<strong>系统调用</strong>请求内核帮忙完成。</p><p class="leading-relaxed mb-4"><strong>执行过程：</strong></p><ol class="list-decimal list-inside space-y-2 mb-4"><li>用户程序设置调用参数。</li><li>执行<strong>访管指令/陷阱指令 (Trap)</strong>。</li><li>触发 CPU 中断，CPU 硬件自动切换到<strong>核心态 (Kernel Mode)</strong>。</li><li>中断向量查找到对应的系统调用处理子程序。</li><li>执行内核态操作，完成后切换回<strong>用户态 (User Mode)</strong> 归还控制权。</li></ol>'
      },
      {
        title: 'API 与系统调用的区别',
        content: '<p class="leading-relaxed mb-4"><strong>API (应用程序接口)</strong> 是在用户态库中定义的接口规范（如 POSIX API，Windows API），而<strong>系统调用</strong>是内核提供的受保护入口。许多 API 底层调用了系统调用（如 C语言的 <code>printf</code> 底层调用了 <code>write</code> 系统调用），但也有一些 API 完全在用户态实现（如数学计算函数 <code>abs</code>）。</p>'
      }
    ]
  }
}
