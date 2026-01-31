n<template>
  <div class="min-h-screen bg-gradient-to-br from-slate-50 to-slate-100">
    <div class="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-8 sm:py-12 lg:py-16">
      <header class="text-center mb-8 sm:mb-12">
        <h1 class="text-2xl sm:text-3xl lg:text-4xl font-bold text-slate-800 tracking-tight">
          User-Agent 生成器
        </h1>
        <p class="mt-3 sm:mt-4 text-sm sm:text-base text-slate-600 max-w-xl mx-auto">
          快速生成自定义User-Agent字符串，支持多种浏览器、操作系统和设备类型
        </p>
      </header>
      
      <div class="grid grid-cols-1 lg:grid-cols-12 gap-6 lg:gap-8">
      <!-- 配置区域 -->
      <div class="col-span-1 lg:col-span-7">
        <div class="glass-card p-5 sm:p-6 lg:p-8 h-full">
          <h2 class="text-lg sm:text-xl font-semibold text-slate-800 mb-6">配置选项</h2>
          
          <div class="space-y-5 sm:space-y-6">
            <div>
              <label class="block text-sm font-semibold text-slate-700 mb-2.5">浏览器类型</label>
              <select class="glass-input w-full p-3 sm:p-3.5" v-model="browserType" @change="generateUA">
                <option value="chrome">Chrome</option>
                <option value="firefox">Firefox</option>
                <option value="safari">Safari</option>
                <option value="edge">Edge</option>
                <option value="opera">Opera</option>
              </select>
            </div>

            <div class="grid grid-cols-1 sm:grid-cols-2 gap-4 sm:gap-5">
              <div>
                <label class="block text-sm font-semibold text-slate-700 mb-2.5">浏览器版本</label>
                <input type="text" class="glass-input w-full p-3 sm:p-3.5" v-model="browserVersion" @input="generateUA">
              </div>
              <div>
                <label class="block text-sm font-semibold text-slate-700 mb-2.5">操作系统</label>
                <select class="glass-input w-full p-3 sm:p-3.5" v-model="os" @change="generateUA">
                  <option value="windows">Windows</option>
                  <option value="macos">macOS</option>
                  <option value="linux">Linux</option>
                  <option value="android">Android</option>
                  <option value="ios">iOS</option>
                </select>
              </div>
            </div>

            <div>
              <label class="block text-sm font-semibold text-slate-700 mb-3">设备类型</label>
              <div class="flex gap-6 sm:gap-8">
                <label class="flex items-center cursor-pointer">
                  <input class="mr-2.5 w-4 h-4" type="radio" name="deviceType" value="desktop" v-model="deviceType" @change="generateUA">
                  <span class="text-sm sm:text-base text-slate-700">桌面设备</span>
                </label>
                <label class="flex items-center cursor-pointer">
                  <input class="mr-2.5 w-4 h-4" type="radio" name="deviceType" value="mobile" v-model="deviceType" @change="generateUA">
                  <span class="text-sm sm:text-base text-slate-700">移动设备</span>
                </label>
              </div>
            </div>

            <div>
              <label class="block text-sm font-semibold text-slate-700 mb-2.5">自定义参数</label>
              <div class="flex gap-2.5 mb-3">
                <input type="text" class="glass-input flex-1 p-3 sm:p-3.5" v-model="customParamInput" placeholder="添加自定义参数">
                <button class="glass-button py-3 sm:py-3.5 px-5" @click="addCustomParam">添加</button>
              </div>
              <div class="flex flex-wrap gap-2">
                <span v-for="(param, index) in customParams" :key="index" class="bg-primary/90 text-white px-3 py-1.5 rounded-lg text-sm flex items-center gap-2">
                  {{ param }}
                  <button class="hover:bg-white/20 rounded-full w-4 h-4 flex items-center justify-center" @click="removeParam(index)">
                    <svg class="w-3 h-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12"></path>
                    </svg>
                  </button>
                </span>
              </div>
            </div>

            <div class="pt-4 border-t border-slate-200/50">
              <button class="w-full bg-gradient-to-r from-primary to-primary/90 text-white font-semibold py-4 sm:py-4.5 rounded-xl shadow-lg hover:shadow-xl hover:from-primary/95 hover:to-primary/85 transition-all duration-300 active:scale-[0.98]" @click="randomGenerate">
                <svg class="w-5 h-5 sm:w-6 sm:h-6 mr-2 inline-block" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 15m-15.356-2A8.001 8.001 0 0112 4.582m15.357 2H15"></path>
                </svg>
                随机生成
              </button>
            </div>
          </div>
        </div>
      </div>

      <!-- 预览区域 -->
      <div class="col-span-1 lg:col-span-5">
        <div class="glass-card p-5 sm:p-6 lg:p-8 h-full flex flex-col">
          <h2 class="text-lg sm:text-xl font-semibold text-slate-800 mb-6">生成结果</h2>
          <div class="preview-area flex-1 mb-6 p-4 sm:p-5 bg-white/40 backdrop-blur-sm border border-slate-200/30 rounded-xl">
            <p class="text-sm sm:text-base text-slate-700 break-all leading-relaxed">{{ generatedUA }}</p>
          </div>
          <div class="flex flex-col sm:flex-row gap-3 sm:gap-4 mt-auto">
            <button class="flex-1 bg-white/80 backdrop-blur-md border border-slate-300/50 hover:border-primary/50 text-slate-700 font-semibold py-4 sm:py-4.5 px-4 rounded-xl shadow-md hover:shadow-lg transition-all duration-300 active:scale-[0.98]" @click="copyUA">
              <svg class="w-5 h-5 sm:w-6 sm:h-6 mr-2 inline-block" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M8 16H6a2 2 0 01-2-2V6a2 2 0 012-2h8a2 2 0 012 2v8a2 2 0 01-2 2h-2m-4-4l4 4m0 0l-4-4"></path>
              </svg>
              复制到剪贴板
            </button>
            <button class="flex-1 bg-white/80 backdrop-blur-md border border-slate-300/50 hover:border-primary/50 text-slate-700 font-semibold py-4 sm:py-4.5 px-4 rounded-xl shadow-md hover:shadow-lg transition-all duration-300 active:scale-[0.98]" @click="exportUA">
              <svg class="w-5 h-5 sm:w-6 sm:h-6 mr-2 inline-block" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l4 4m0 0l-4-4"></path>
              </svg>
              导出为文本
            </button>
          </div>
        </div>
      </div>
    </div>
  </div>

  <!-- 页脚 -->
  <footer class="mt-12 sm:mt-16 lg:mt-20">
    <div class="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
      <div class="border-t border-slate-200 pt-6 sm:pt-8">
        <div class="flex flex-col sm:flex-row justify-between items-center gap-4 sm:gap-6">
          <div class="text-center sm:text-left">
            <p class="text-sm text-slate-600">
              © {{ new Date().getFullYear() }} UA-G. 保留所有权利.
            </p>
          </div>
          <div class="flex gap-4 sm:gap-6 text-sm">
            <a href="https://www.qixz.cn/" class="text-slate-600 hover:text-primary transition-colors">青序栈</a>
            <a href="https://github.com/scfc/ua-g" class="text-slate-600 hover:text-primary transition-colors">Github</a>
            <a href="#" class="text-slate-600 hover:text-primary transition-colors">常见问题</a>
          </div>
        </div>
      </div>
    </div>
  </footer>
</div>

  <!-- Toast消息 -->
  <div v-if="showToast" class="toast-message show">{{ toastMessage }}</div>
</template>

<script setup lang="ts">
import { ref, onMounted } from 'vue';

// 类型定义
interface BrowserTemplates {
  chrome: string;
  firefox: string;
  safari: string;
  edge: string;
  opera: string;
}

interface PlatformTemplates {
  windows: {
    desktop: string;
    mobile: string;
  };
  macos: {
    desktop: string;
    mobile: string;
  };
  linux: {
    desktop: string;
    mobile: string;
  };
  android: string;
  ios: string;
}

// 模板定义
const templates: BrowserTemplates = {
  chrome: 'Mozilla/5.0 ({platform}) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/{version} Safari/537.36',
  firefox: 'Mozilla/5.0 ({platform}; rv:{version}) Gecko/20100101 Firefox/{version}',
  safari: 'Mozilla/5.0 ({platform}) AppleWebKit/605.1.15 (KHTML, like Gecko) Version/{version} Safari/605.1.15',
  edge: 'Mozilla/5.0 ({platform}) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/{version} Safari/605.1.15 Edg/{version}',
  opera: 'Mozilla/5.0 ({platform}) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/{version} Safari/537.36 OPR/{version}'
};

const platformTemplates: PlatformTemplates = {
  windows: {
    desktop: 'Windows NT 10.0; Win64; x64',
    mobile: 'Windows Phone 10.0; Android 4.2.1'
  },
  macos: {
    desktop: 'Macintosh; Intel Mac OS X 10_15_7',
    mobile: 'iPad; CPU OS 15_3 like Mac OS X'
  },
  linux: {
    desktop: 'X11; Linux x86_64',
    mobile: 'Linux; Android 11; Pixel 5'
  },
  android: 'Linux; Android 12; {model}',
  ios: 'iPhone; CPU iPhone OS 15_3 like Mac OS X'
};

// 响应式数据
const browserType = ref('chrome');
const browserVersion = ref('98.0.4758.102');
const os = ref('windows');
const deviceType = ref('desktop');
const customParamInput = ref('');
const customParams = ref<string[]>([]);
const generatedUA = ref('');
const showToast = ref(false);
const toastMessage = ref('');

// 显示toast消息
function showToastMessage(message: string) {
  toastMessage.value = message;
  showToast.value = true;
  
  setTimeout(() => {
    showToast.value = false;
  }, 3000);
}

// 解析User-Agent字符串
function parseUA(ua: string) {
  let result = {
    browser: 'chrome' as string,
    version: '98.0.4758.102' as string,
    os: 'windows' as string,
    isMobile: false as boolean
  };
  
  // 检测浏览器类型
  if (ua.includes('Edg')) {
    result.browser = 'edge';
    const edgeMatch = ua.match(/Edg\/(\d+\.\d+\.\d+\.\d+)/);
    if (edgeMatch) result.version = edgeMatch[1];
  } else if (ua.includes('Firefox')) {
    result.browser = 'firefox';
    const firefoxMatch = ua.match(/Firefox\/(\d+\.\d+)/);
    if (firefoxMatch) result.version = firefoxMatch[1];
  } else if (ua.includes('Safari') && !ua.includes('Chrome')) {
    result.browser = 'safari';
    const safariMatch = ua.match(/Version\/(\d+\.\d+)/);
    if (safariMatch) result.version = safariMatch[1];
  } else if (ua.includes('OPR')) {
    result.browser = 'opera';
    const operaMatch = ua.match(/OPR\/(\d+\.\d+)/);
    if (operaMatch) result.version = operaMatch[1];
  } else if (ua.includes('Chrome')) {
    result.browser = 'chrome';
    const chromeMatch = ua.match(/Chrome\/(\d+\.\d+\.\d+\.\d+)/);
    if (chromeMatch) result.version = chromeMatch[1];
  }
  
  // 检测操作系统
  if (ua.includes('Windows')) {
    result.os = 'windows';
  } else if (ua.includes('Macintosh')) {
    result.os = 'macos';
  } else if (ua.includes('Linux') && !ua.includes('Android')) {
    result.os = 'linux';
  } else if (ua.includes('Android')) {
    result.os = 'android';
    result.isMobile = true;
  } else if (ua.includes('iPhone') || ua.includes('iPad')) {
    result.os = 'ios';
    result.isMobile = true;
  }
  
  return result;
}

// 生成User-Agent
function generateUA() {
  let platform = '';
  if (os.value === 'android' || os.value === 'ios') {
    platform = platformTemplates[os.value as keyof typeof platformTemplates] as string;
  } else {
    platform = (platformTemplates[os.value as keyof typeof platformTemplates] as any)[deviceType.value];
  }

  let ua = templates[browserType.value as keyof typeof templates]
    .replace('{platform}', platform)
    .replace(/{version}/g, browserVersion.value);

  if (customParams.value.length > 0) {
    ua = ua.replace(')', `; ${customParams.value.join('; ')})`);
  }

  generatedUA.value = ua;
}

// 添加自定义参数
function addCustomParam() {
  if (customParamInput.value.trim()) {
    customParams.value.push(customParamInput.value.trim());
    customParamInput.value = '';
    generateUA();
  }
}

// 移除自定义参数
function removeParam(index: number) {
  customParams.value.splice(index, 1);
  generateUA();
}

// 复制到剪贴板
function copyUA() {
  navigator.clipboard.writeText(generatedUA.value).then(() => {
    showToastMessage('已复制到剪贴板！');
  });
}

// 导出为文本
function exportUA() {
  const blob = new Blob([generatedUA.value], { type: 'text/plain' });
  const url = URL.createObjectURL(blob);
  const a = document.createElement('a');
  a.href = url;
  a.download = 'custom_user_agent.txt';
  a.click();
  URL.revokeObjectURL(url);
}

// 随机生成User-Agent
function randomGenerate() {
  // 随机浏览器类型
  const browsers = ['chrome', 'firefox', 'safari', 'edge', 'opera'];
  browserType.value = browsers[Math.floor(Math.random() * browsers.length)];
  
  // 随机浏览器版本号
  if (browserType.value === 'chrome' || browserType.value === 'edge') {
    // Chrome/Edge版本格式: X.X.XXXX.XXX
    browserVersion.value = `${Math.floor(Math.random() * 30) + 90}.${Math.floor(Math.random() * 10)}.${Math.floor(Math.random() * 10000)}.${Math.floor(Math.random() * 1000)}`;
  } else if (browserType.value === 'firefox') {
    // Firefox版本格式: X.X
    browserVersion.value = `${Math.floor(Math.random() * 20) + 80}.${Math.floor(Math.random() * 10)}`;
  } else if (browserType.value === 'safari') {
    // Safari版本格式: X.X
    browserVersion.value = `${Math.floor(Math.random() * 5) + 14}.${Math.floor(Math.random() * 5)}`;
  } else if (browserType.value === 'opera') {
    // Opera版本格式: X.X
    browserVersion.value = `${Math.floor(Math.random() * 30) + 70}.${Math.floor(Math.random() * 10)}`;
  }
  
  // 随机操作系统
  const osTypes = ['windows', 'macos', 'linux', 'android', 'ios'];
  os.value = osTypes[Math.floor(Math.random() * osTypes.length)];
  
  // 随机设备类型
  deviceType.value = Math.random() > 0.5 ? 'desktop' : 'mobile';
  
  // 清空自定义参数
  customParams.value = [];
  customParamInput.value = '';
  
  // 生成新的UA
  generateUA();
  showToastMessage('已随机生成User-Agent！');
}

// 初始化
onMounted(() => {
  // 显示访问者的真实User-Agent
  const realUA = navigator.userAgent;
  generatedUA.value = realUA;
  
  // 解析UA并更新配置
  const parsedUA = parseUA(realUA);
  browserType.value = parsedUA.browser;
  browserVersion.value = parsedUA.version;
  os.value = parsedUA.os;
  deviceType.value = parsedUA.isMobile ? 'mobile' : 'desktop';
});
</script>

<style scoped>
/* 组件级样式已移至全局style.css */
</style>