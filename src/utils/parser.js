/**
 * 解析习题及参考答案文本文件的状态机分析器
 * @param {string} rawText 原始文本内容
 * @returns {Array<{id: number, question: string, answer: string}>} 解析后的题目数组
 */
export function parseChapterQuestions(rawText) {
  if (!rawText) return []
  
  // 清洗特殊的 Wingdings 乱码和 bullet 字符，将类似空心方框的特殊字符统一替换为标准黑点 •
  const cleanedText = rawText
    .replace(/[\uf000-\uf0ff]/g, '• ') // 替换所有私有区域符号（通常是 Wingdings 字体引起的乱码方框）
    .replace(//g, '• ')               // 替换明确的黑点符号
    .replace(/\r\n/g, '\n')
    
  const lines = cleanedText.split('\n')
  const questions = []
  
  let currentQ = null
  let currentALines = []
  let isInAnswer = false
  let lastNum = 0
  
  for (let i = 0; i < lines.length; i++) {
    const line = lines[i]
    
    // 正则匹配行首的数字和点，如 "1. " 或 "12. "
    const match = line.match(/^(\d+)\.\s*(.*)/)
    
    let isNewQuestion = false
    if (match) {
      const num = parseInt(match[1], 10)
      // 使用状态机启发式判断是否为新题的起点：
      // 1. 如果是第一题 (lastNum === 0) 且数字是 1 或者是 2
      // 2. 或者数字是递增的，且增加量在合理范围 (lastNum + 1 到 lastNum + 3)
      if (lastNum === 0 && (num === 1 || num === 2)) {
        isNewQuestion = true
      } else if (num > lastNum && num <= lastNum + 3) {
        isNewQuestion = true
      }
    }
    
    if (isNewQuestion) {
      // 存入上一道题
      if (currentQ) {
        currentQ.answer = currentALines.join('\n').trim()
        questions.push(currentQ)
      }
      
      const num = parseInt(match[1], 10)
      currentQ = {
        id: num,
        question: match[2].trim(),
        answer: ''
      }
      currentALines = []
      isInAnswer = false
      lastNum = num
    } else {
      if (currentQ) {
        // 查找“答：”或“答:”作为答案部分的开始
        const ansIdx1 = line.indexOf('答：')
        const ansIdx2 = line.indexOf('答:')
        const ansIdx = ansIdx1 !== -1 ? ansIdx1 : ansIdx2
        
        if (ansIdx !== -1) {
          isInAnswer = true
          const afterAns = line.substring(ansIdx + 2).trim()
          if (afterAns) {
            currentALines.push(afterAns)
          }
        } else {
          if (isInAnswer) {
            currentALines.push(line)
          } else {
            // 支持跨行的题目文本描述
            currentQ.question += '\n' + line
          }
        }
      }
    }
  }
  
  // 存入最后一道题
  if (currentQ) {
    currentQ.answer = currentALines.join('\n').trim()
    questions.push(currentQ)
  }
  
  // 清理多余空行和字符
  questions.forEach(q => {
    q.question = q.question.trim()
  })
  
  return questions
}

/**
 * 自动为未缩进的 C 风格代码片段添加花括号级别的缩进
 * @param {string} codeText 原始扁平代码文本
 * @returns {string} 缩进排版后的代码文本
 */
function indentCode(codeText) {
  const lines = codeText.split('\n')
  let indentLevel = 0
  const indentSize = 4 // 每层缩进 4 个空格
  const formattedLines = []
  
  for (let i = 0; i < lines.length; i++) {
    const line = lines[i].trim()
    if (line === '') {
      formattedLines.push('')
      continue
    }
    
    // 如果行首是闭合括号，则提前减少缩进
    const startsWithCloseBrace = /^\s*[\}\)]/.test(line)
    if (startsWithCloseBrace) {
      indentLevel = Math.max(0, indentLevel - 1)
    }
    
    const indent = ' '.repeat(indentLevel * indentSize)
    formattedLines.push(indent + line)
    
    // 如果当前行以开括号 { 结尾，则后续行增加一层缩进
    const endsWithOpenBrace = /{\s*(\/\/.*)?$/.test(line)
    if (endsWithOpenBrace) {
      indentLevel++
    }
  }
  
  return formattedLines.join('\n')
}

/**
 * 格式化内容，自动将纯文本中的代码行段落转换为代码块，数学公式转换为公式块，列表项进行缩进和加粗
 * @param {string} text 原始文本段落
 * @returns {string} 包含 HTML 标记的格式化字符串
 */
export function formatContentToHtml(text) {
  if (!text) return ''
  
  let formattedText = text
  const tablePlaceholders = []
  
  formattedText = formattedText.replace(/<table[\s\S]*?<\/table>/gi, (match) => {
    const placeholder = `\n___TABLE_PLACEHOLDER_${tablePlaceholders.length}___\n`
    let styledTable = match
      .replace(/<table([^>]*)>/gi, '<div class="overflow-x-auto my-4 border border-slate-200 rounded-lg shadow-sm"><table class="min-w-full divide-y divide-slate-200 text-sm" $1>')
      .replace(/<\/table>/gi, '</table></div>')
      .replace(/<thead([^>]*)>/gi, '<thead class="bg-slate-50 font-semibold text-slate-700" $1>')
      .replace(/<tbody([^>]*)>/gi, '<tbody class="divide-y divide-slate-150 bg-white text-slate-650" $1>')
      .replace(/<tr([^>]*)>/gi, '<tr class="hover:bg-slate-50/50 transition-colors" $1>')
      .replace(/<th([^>]*)>/gi, '<th class="px-4 py-3 text-left font-semibold border-r border-slate-200 last:border-0" $1>')
      .replace(/<td([^>]*)>/gi, '<td class="px-4 py-2.5 border-r border-slate-150 last:border-0 whitespace-pre-wrap" $1>')
    
    tablePlaceholders.push(styledTable)
    return placeholder
  })
  
  const lines = formattedText.split('\n')
  const blocks = []
  let currentBlock = []
  let isCurrentBlockCode = false
  
  // 匹配代码特征的正则规则列表
  const codePatterns = [
    // 变量/类型声明，如 semaphore empty = 1;, int count = 0;, void producer()
    /^\s*(semaphore|int|void|struct|double|float|char|condition|Monitor)\b/,
    // 标准的 PV 操作或同步等待操作，如 wait(empty);, signal(mutex);, P(empty);, wait(mutex);
    /\b(wait|signal|P|V)\b\s*\(.*\)\s*;?/,
    // 带有条件变量的管程操作，如 notFull.wait();
    /\b\w+\.(wait|signal)\b\s*\(.*\)\s*;?/,
    // 控制流逻辑，如 while (true), if (count >= n)
    /^\s*(while|if|for)\b\s*\(.*\)/,
    // 左右大括号或闭合结构，如 {, }, };
    /^\s*[\{\}\(\)]\s*;?$/,
    // 赋值或自增语句且以分号结尾，例如 in = (in + 1) % n;, count++; 以及中文伪代码语句，如 生产一个产品; 将产品放入缓冲区;
    /;\s*(\/\/.*)?$/,
    // 纯注释行
    /^\s*(\/\/|\/\*|\*)/,
    // 特殊的代码关键字独立行，如 Monitor ProducerConsumer
    /^\s*Monitor\b/
  ]
  
  function isCodeLine(line) {
    const trimmed = line.trim()
    if (trimmed === '') return false
    return codePatterns.some(p => p.test(line))
  }
  
  for (let i = 0; i < lines.length; i++) {
    const line = lines[i]
    const isCode = isCodeLine(line)
    
    if (isCode) {
      if (!isCurrentBlockCode && currentBlock.length > 0) {
        blocks.push({ type: 'text', content: currentBlock.join('\n') })
        currentBlock = []
      }
      isCurrentBlockCode = true
      currentBlock.push(line)
    } else {
      // 允许代码块中包含空行
      if (isCurrentBlockCode && line.trim() === '' && i + 1 < lines.length && isCodeLine(lines[i + 1])) {
        currentBlock.push(line)
      } else {
        if (isCurrentBlockCode && currentBlock.length > 0) {
          blocks.push({ type: 'code', content: currentBlock.join('\n') })
          currentBlock = []
        }
        isCurrentBlockCode = false
        currentBlock.push(line)
      }
    }
  }
  
  if (currentBlock.length > 0) {
    blocks.push({
      type: isCurrentBlockCode ? 'code' : 'text',
      content: currentBlock.join('\n')
    })
  }
  
  // 转为带样式的 HTML
  return blocks.map(b => {
    if (b.type === 'code') {
      const indented = indentCode(b.content)
      return `<pre class="bg-slate-900 text-slate-100 p-4 my-4 rounded-lg font-mono text-sm overflow-x-auto border border-slate-800 leading-relaxed shadow-sm w-full max-w-full">${highlightCode(indented)}</pre>`
    } else {
      // 解析普通文本行，以行为单位检测列表、缩进和加粗
      const textLines = b.content.split('\n')
      const renderedLines = []
      
      for (let j = 0; j < textLines.length; j++) {
        const rawLine = textLines[j]
        const trimmed = rawLine.trim()
        if (!trimmed) {
          renderedLines.push('<div class="h-2"></div>')
          continue
        }
        
        // 0. 匹配并提取图片标签占位符，防止在后续的 HTML 实体转义和加粗逻辑中被损坏
        let lineVal = trimmed
        const imgPlaceholders = []
        
        lineVal = lineVal.replace(/<img\s+[^>]*src=["']([^"']+)["'][^>]*\/?>/gi, (match, src) => {
          const placeholder = `___IMG_PLACEHOLDER_${imgPlaceholders.length}___`
          let absoluteSrc = src
          if (!src.startsWith('http')) {
            absoluteSrc = `https://file.glassous.top/OSStudy/images/${src}`
          }
          imgPlaceholders.push(`<div class="my-4 flex justify-center"><img class="max-w-xs sm:max-w-md md:max-w-lg lg:max-w-xl h-auto rounded-lg shadow-sm border border-slate-200/80" src="${absoluteSrc}" alt="Image" /></div>`)
          return placeholder
        })
        
        // 如果整行是一个表格占位符，直接输出其渲染后的 HTML
        const singleTableMatch = lineVal.match(/^___TABLE_PLACEHOLDER_(\d+)___$/)
        if (singleTableMatch) {
          const idx = parseInt(singleTableMatch[1], 10)
          renderedLines.push(tablePlaceholders[idx])
          continue
        }
        
        // 如果整行只是一个图片占位符，直接输出，不包裹在段落中
        const singleImgMatch = lineVal.match(/^___IMG_PLACEHOLDER_(\d+)___$/)
        if (singleImgMatch) {
          const idx = parseInt(singleImgMatch[1], 10)
          renderedLines.push(imgPlaceholders[idx])
          continue
        }
        
        const restorePlaceholders = (text) => {
          let res = text
          for (let k = 0; k < imgPlaceholders.length; k++) {
            res = res.replace(`___IMG_PLACEHOLDER_${k}___`, imgPlaceholders[k])
          }
          return res
        }
        
        // 1. 匹配独立的公式定义，例如 "Rp = 1 + 等待时间/服务时间"
        if (/^\s*[a-zA-Z_0-9\s\*\+\-\/\(\)\[\]\{\}\=\>\<]+$/.test(lineVal) && lineVal.includes('=')) {
          renderedLines.push(`<div class="bg-indigo-50/50 border-l-4 border-indigo-500 p-3 my-3 text-slate-700 font-mono text-base rounded-r">${escapeHtml(lineVal)}</div>`)
          continue
        }
        
        // 2. 匹配 Bullet 点开头的行 (•)
        if (lineVal.startsWith('•')) {
          const content = lineVal.substring(1).trim()
          const boldedContent = restorePlaceholders(boldKeyTerms(content))
          renderedLines.push(`<div class="pl-6 py-1 flex items-start gap-2 text-slate-600 text-base md:text-lg leading-relaxed"><span class="text-indigo-500 select-none mt-0.5">•</span><span class="flex-1">${boldedContent}</span></div>`)
          continue
        }
        
        // 3. 匹配 "（1）"、"（一）" 开头的行（进行缩进并加粗首部标题）
        const braceListMatch = lineVal.match(/^([（\(]\d+[）\)]|[（\(][一二三四五六七八九十]+[）\)])(.*)/)
        if (braceListMatch) {
          const listNum = braceListMatch[1]
          const rest = braceListMatch[2].trim()
          const boldedRest = restorePlaceholders(boldKeyTerms(rest))
          renderedLines.push(`<div class="pl-8 py-1 text-slate-600 text-base md:text-lg leading-relaxed"><strong>${listNum}</strong> ${boldedRest}</div>`)
          continue
        }
        
        // 4. 匹配 "1. "、"一、"、"① " 开头的行（进行缩进并加粗首部标题）
        const numListMatch = lineVal.match(/^(\d+\.|[一二三四五六七八九十]+、|[①②③④⑤⑥⑦⑧⑨⑩])(.*)/)
        if (numListMatch) {
          const listNum = numListMatch[1]
          const rest = numListMatch[2].trim()
          const boldedRest = restorePlaceholders(boldKeyTerms(rest))
          renderedLines.push(`<div class="pl-6 py-1 text-slate-600 text-base md:text-lg leading-relaxed"><strong>${listNum}</strong> ${boldedRest}</div>`)
          continue
        }
        
        // 5. 普通文本行，可加粗重点词汇
        const boldedLine = restorePlaceholders(boldKeyTerms(lineVal))
        renderedLines.push(`<p class="text-slate-600 text-base md:text-lg leading-relaxed mb-2">${boldedLine}</p>`)
      }
      
      return renderedLines.join('')
    }
  }).join('')
}

// 辅助函数：自动加粗标题项或冒号前的关键词，如 "顺序性。主程序..." -> "<strong>顺序性。</strong>主程序..."
function boldKeyTerms(text) {
  let temp = escapeHtml(text)
  
  // 1. 匹配冒号结尾的短句进行加粗，例如 "物理分配结构：" -> "<strong>物理分配结构：</strong>"
  temp = temp.replace(/^([^：:。]{1,20}[：:])/, '<strong>$1</strong>')
  
  // 2. 匹配句号结尾的名词解释短句进行加粗，如 "顺序性。处理器的操作..." -> "<strong>顺序性。</strong>处理器的操作..."
  // 注意，我们要防止加粗整句话，所以字数限制在 12 字内
  temp = temp.replace(/^([^。，]{1,12}。)/, '<strong>$1</strong>')
  
  return temp
}

function escapeHtml(text) {
  return text
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&#039;')
}

export function highlightCode(codeText) {
  let escaped = escapeHtml(codeText)
  
  const placeholders = []
  
  // 1. Comments: // ...
  escaped = escaped.replace(/(\/\/.*)/g, (match) => {
    const id = `___COMMENT_PLACEHOLDER_${placeholders.length}___`
    placeholders.push(`<span class="text-slate-500 italic">${match}</span>`)
    return id
  })
  
  // 2. Numbers (Process first before any class names like text-sky-400 are introduced)
  escaped = escaped.replace(/\b(\d+)\b/g, '<span class="text-teal-300">$1</span>')
  
  // 3. Keywords (C/C++ and pseudo-code syntax)
  const keywords = [
    'semaphore', 'int', 'void', 'struct', 'double', 'float', 'char', 
    'condition', 'Monitor', 'while', 'if', 'for', 'else', 'return', 
    'true', 'false', 'break', 'continue', 'cobegin', 'coend'
  ]
  const keywordRegex = new RegExp(`\\b(${keywords.join('|')})\\b`, 'g')
  escaped = escaped.replace(keywordRegex, '<span class="text-sky-400 font-semibold">$1</span>')
  
  // 4. PV operations & common procedures
  const funcs = ['wait', 'signal', 'P', 'V']
  const funcRegex = new RegExp(`\\b(${funcs.join('|')})\\b(?=\\s*\\()`, 'g')
  escaped = escaped.replace(funcRegex, '<span class="text-amber-400 font-bold">$1</span>')
  
  // 5. Restore comments
  for (let i = 0; i < placeholders.length; i++) {
    escaped = escaped.replace(`___COMMENT_PLACEHOLDER_${i}___`, placeholders[i])
  }
  
  return escaped
}

