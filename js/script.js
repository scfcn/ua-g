const templates = {
        chrome: 'Mozilla/5.0 ({platform}) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/{version} Safari/537.36',
        firefox: 'Mozilla/5.0 ({platform}; rv:{version}) Gecko/20100101 Firefox/{version}',
        safari: 'Mozilla/5.0 ({platform}) AppleWebKit/605.1.15 (KHTML, like Gecko) Version/{version} Safari/605.1.15',
        edge: 'Mozilla/5.0 ({platform}) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/{version} Safari/537.36 Edg/{version}',
        opera: 'Mozilla/5.0 ({platform}) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/{version} Safari/537.36 OPR/{version}'
    };

    const platformTemplates = {
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

    let customParams = [];

    function generateUA() {
        const browserType = document.getElementById('browserType').value;
        const version = document.getElementById('browserVersion').value;
        const os = document.getElementById('os').value;
        const isMobile = document.getElementById('mobile').checked;
        const deviceType = isMobile ? 'mobile' : 'desktop';

        let platform = '';
        if (os === 'android' || os === 'ios') {
            platform = platformTemplates[os];
        } else {
            platform = platformTemplates[os][deviceType];
        }

        let ua = templates[browserType]
            .replace('{platform}', platform)
            .replace(/{version}/g, version);

        if (customParams.length > 0) {
            ua = ua.replace(')', `; ${customParams.join('; ')})`);
        }

        document.getElementById('uaPreview').textContent = ua;
    }

    function addCustomParam() {
        const paramInput = document.getElementById('customParam');
        if (paramInput.value.trim()) {
            customParams.push(paramInput.value.trim());
            updateCustomParamsDisplay();
            paramInput.value = '';
            generateUA();
        }
    }

    function updateCustomParamsDisplay() {
        const container = document.getElementById('customParamsList');
        container.innerHTML = customParams.map((param, index) => `
            <span class="badge bg-primary d-flex align-items-center gap-1">
                ${param}
                <button class="btn-close btn-close-white" style="font-size:10px" 
                        onclick="removeParam(${index})"></button>
            </span>
        `).join('');
    }

    function removeParam(index) {
        customParams.splice(index, 1);
        updateCustomParamsDisplay();
        generateUA();
    }

    // 显示toast消息
    function showToast(message) {
        // 创建toast元素
        let toast = document.createElement('div');
        toast.className = 'toast-message';
        toast.textContent = message;
        document.body.appendChild(toast);
        
        // 显示toast
        setTimeout(() => {
            toast.classList.add('show');
        }, 100);
        
        // 3秒后隐藏并移除toast
        setTimeout(() => {
            toast.classList.remove('show');
            setTimeout(() => {
                document.body.removeChild(toast);
            }, 300);
        }, 3000);
    }
    
    function copyUA() {
        const ua = document.getElementById('uaPreview').textContent;
        navigator.clipboard.writeText(ua).then(() => {
            showToast('已复制到剪贴板！');
        });
    }

    function exportUA() {
        const ua = document.getElementById('uaPreview').textContent;
        const blob = new Blob([ua], { type: 'text/plain' });
        const url = URL.createObjectURL(blob);
        const a = document.createElement('a');
        a.href = url;
        a.download = 'custom_user_agent.txt';
        a.click();
        URL.revokeObjectURL(url);
    }

    // 解析User-Agent字符串，提取浏览器和操作系统信息
    function parseUA(ua) {
        let result = {
            browser: 'chrome',
            version: '98.0.4758.102',
            os: 'windows',
            isMobile: false
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
    
    // 初始显示访问者的真实User-Agent并同步配置选项
    window.onload = function() {
        const realUA = navigator.userAgent;
        document.getElementById('uaPreview').textContent = realUA;
        
        // 解析UA并更新配置选项
        const parsedUA = parseUA(realUA);
        document.getElementById('browserType').value = parsedUA.browser;
        document.getElementById('browserVersion').value = parsedUA.version;
        document.getElementById('os').value = parsedUA.os;
        document.getElementById(parsedUA.isMobile ? 'mobile' : 'desktop').checked = true;
    };
    
    // 初始化事件监听
    document.querySelectorAll('select, input, radio').forEach(element => {
        element.addEventListener('change', generateUA);
    });
    document.getElementById('browserVersion').addEventListener('input', generateUA);