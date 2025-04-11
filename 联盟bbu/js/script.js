// 获取当前日期和星期
function getCurrentDate() {
    const today = new Date();
    const year = today.getFullYear();
    const month = today.getMonth() + 1; // JS中月份从0开始计数
    const day = today.getDate();
    const weekdays = ["星期日", "星期一", "星期二", "星期三", "星期四", "星期五", "星期六"];
    const weekDay = weekdays[today.getDay()];
    const formattedDate = `${year}年${month}月${day}日 / ${weekDay}`;
    document.getElementById('date-info').innerText = formattedDate;
}

// 从JSON数据中渲染模块
async function renderModules() {
    try {
        const response = await fetch('data/modules.json');
        const data = await response.json();
        const container = document.querySelector('.container');
        container.innerHTML = ''; // 清除现有内容

        data.modules.forEach(module => {
            const section = document.createElement('div');
            section.className = 'section';
            
            const title = document.createElement('h2');
            title.textContent = module.title;
            section.appendChild(title);

            if (module.title === '考试查询') {
                const info = document.createElement('div');
                info.className = 'info';
                const dateInfo = document.createElement('span');
                dateInfo.id = 'date-info';
                dateInfo.className = 'right-align';
                info.appendChild(dateInfo);
                section.appendChild(info);
            }

            const grid = document.createElement('div');
            grid.className = 'grid';

            module.items.forEach(item => {
                const itemWrapper = document.createElement(item.url ? 'a' : 'div');
                if (item.url) {
                    itemWrapper.href = item.url;
                }

                const itemDiv = document.createElement('div');
                itemDiv.className = 'item';

                const img = document.createElement('img');
                img.src = item.icon;
                img.alt = item.text;

                const p = document.createElement('p');
                p.textContent = item.text;

                itemDiv.appendChild(img);
                itemDiv.appendChild(p);
                itemWrapper.appendChild(itemDiv);
                grid.appendChild(itemWrapper);
            });

            section.appendChild(grid);
            container.appendChild(section);
        });

        getCurrentDate(); // 渲染后更新日期
    } catch (error) {
        console.error('Error loading modules:', error);
    }
}

// 初始化页面
renderModules();

// function isWeixin() {
//     var ua = window.navigator.userAgent.toLowerCase();
//     if (ua.match(/MicroMessenger/i) == "micromessenger") {
//         return true;
//     } else {
//         return false;
//     }
// }

// if (!isWeixin()) {
//     // 如果不是在微信端打开，则跳转到其他页面或者显示提示信息
//     window.location.href = 'https://photo.xiangming.site/bbcimg/logo-2.png';
// }

