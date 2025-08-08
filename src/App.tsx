import React, { useEffect, useState } from 'react';
import { ExternalLink, Code, Music, Timer, Gamepad2, Palette, Globe, Zap, Users, Eye, Calendar, Clock, ChevronDown, Home, Handshake, Info } from 'lucide-react';

function App() {
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
  const [scrollY, setScrollY] = useState(0);
  const [displayedText, setDisplayedText] = useState('');
  const [isTyping, setIsTyping] = useState(true);
  const [runtime, setRuntime] = useState('');
  const [hoveredElement, setHoveredElement] = useState<string | null>(null);
  const [currentPage, setCurrentPage] = useState('home');
  const [activeTab, setActiveTab] = useState(0);
  
  const fullText = 'Weberry';

  const navItems = [
    { id: 'home', label: '首页', icon: <Home className="w-5 h-5" /> },
    { id: 'cooperation', label: '合作', icon: <Handshake className="w-5 h-5" /> },
    { id: 'about', label: '关于', icon: <Info className="w-5 h-5" /> }
  ];

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      setMousePosition({ x: e.clientX, y: e.clientY });
    };

    const handleScroll = () => {
      setScrollY(window.scrollY);
    };

    window.addEventListener('mousemove', handleMouseMove);
    window.addEventListener('scroll', handleScroll);
    
    return () => {
      window.removeEventListener('mousemove', handleMouseMove);
      window.removeEventListener('scroll', handleScroll);
    };
  }, []);

  // 计算网站运行时间
  useEffect(() => {
    const startTime = new Date('2025-08-04T10:44:00').getTime();
    
    const updateRuntime = () => {
      const now = new Date().getTime();
      const diff = now - startTime;
      
      if (diff < 0) {
        setRuntime('网站尚未启动');
        return;
      }
      
      const days = Math.floor(diff / (1000 * 60 * 60 * 24));
      const hours = Math.floor((diff % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
      const minutes = Math.floor((diff % (1000 * 60 * 60)) / (1000 * 60));
      const seconds = Math.floor((diff % (1000 * 60)) / 1000);
      
      setRuntime(`${days}天 ${hours}小时 ${minutes}分钟 ${seconds}秒`);
    };
    
    updateRuntime();
    const interval = setInterval(updateRuntime, 1000);
    
    return () => clearInterval(interval);
  }, []);

  useEffect(() => {
    let currentIndex = 0;
    const typingInterval = setInterval(() => {
      if (currentIndex <= fullText.length) {
        setDisplayedText(fullText.slice(0, currentIndex));
        currentIndex++;
      } else {
        setIsTyping(false);
        clearInterval(typingInterval);
      }
    }, 200);

    return () => clearInterval(typingInterval);
  }, []);

  const projects = [
    {
      name: 'XYCRAFT 2025 (Pre5 1.04922)',
      description: '使用WebGL高仿版我的世界3D游戏体验（鸽了n年的XYCRAFT续作）（如果加载失败就刷新几次）',
      icon: <Gamepad2 className="w-8 h-8" />,
      gradient: 'from-emerald-400 to-teal-600',
      link: 'https://majestic-lolly-f62d2c.netlify.app/'
    },
    {
      name: '破忒头 Focus',
      description: '专注番茄钟  极致体验   超多功能（音乐播放，未来倒计时，全屏时钟，白噪音）（tips：计时按暂停无效）',
      icon: <Timer className="w-8 h-8" />,
      gradient: 'from-orange-400 to-red-500',
      link: 'https://potofocus.netlify.app/'
    },
    {
      name: 'weberry音乐',
      description: 'HTML开发  网易云音乐超大曲库  极简设计理念  轻量级音乐播放器 支持全设备访问',
      icon: <Music className="w-8 h-8" />,
      gradient: 'from-purple-400 to-pink-500',
      link: 'https://weberry.netlify.app/'
    }
  ];

  const recommendations = [
    {
      name: '有趣小功能',
      description: '实用工具集合',
      icon: <Zap className="w-6 h-6" />,
      link: 'https://tools.miku.ac/',
      color: 'text-yellow-500'
    },
    {
      name: '有趣网站推荐',
      description: '精选网站导航',
      icon: <Globe className="w-6 h-6" />,
      link: 'https://lkssite.vip/',
      color: 'text-blue-500'
    },
    {
      name: 'Emoji Mix',
      description: '表情符号生成器',
      icon: <Palette className="w-6 h-6" />,
      link: 'https://tikolu.net/emojimix/',
      color: 'text-pink-500'
    },
    {
      name: '我的世界网页版',
      description: '在线游戏体验',
      icon: <Code className="w-6 h-6" />,
      link: 'https://www.mc.js.cool/',
      color: 'text-green-500'
    }
  ];

  const stats = [
    { label: '总访问量', id: 'busuanzi_site_pv', icon: <Eye className="w-5 h-5" /> },
    { label: '总访客数', id: 'busuanzi_site_uv', icon: <Users className="w-5 h-5" /> },
    { label: '今日访问量', id: 'busuanzi_today_site_pv', icon: <Calendar className="w-5 h-5" /> },
    { label: '今日访客数', id: 'busuanzi_today_site_uv', icon: <Clock className="w-5 h-5" /> }
  ];

  const scrollToContent = () => {
    window.scrollTo({
      top: window.innerHeight,
      behavior: 'smooth'
    });
  };

  const handleTabClick = (index: number, pageId: string) => {
    setActiveTab(index);
    setCurrentPage(pageId);
  };

  const renderHomePage = () => (
    <>
      {/* Hero Section - Full Screen */}
      <section className="min-h-screen flex items-center justify-center relative z-10">
        <div className="text-center px-6">
          <div 
            style={{
              transform: `translateY(${scrollY * 0.1}px)`,
            }}
          >
            <h1 className="text-[8rem] md:text-[12rem] lg:text-[16rem] xl:text-[20rem] font-bold bg-gradient-to-r from-slate-900 via-blue-900 to-indigo-900 bg-clip-text text-transparent mb-8 leading-none">
              {displayedText}
              {isTyping && <span className="animate-pulse border-b-8 border-slate-900 inline-block align-bottom">_</span>}
            </h1>
            <h2 className="text-6xl md:text-7xl lg:text-8xl font-light text-slate-700 mb-16 tracking-wide">
              Studio
            </h2>
            <p className="text-2xl md:text-3xl lg:text-4xl text-slate-600 max-w-5xl mx-auto leading-relaxed mb-20">
              工作室？（就一个人...<br />
            </p>
            
            {/* Scroll indicator */}
            <button 
              onClick={scrollToContent}
              className="group inline-flex flex-col items-center text-slate-500 hover:text-slate-700 transition-all duration-300 animate-bounce"
            >
              <span className="text-lg mb-3 opacity-70">探索更多</span>
              <ChevronDown className="w-8 h-8 group-hover:scale-110 transition-transform duration-300" />
            </button>
          </div>
        </div>
      </section>

      {/* Projects Section */}
      <section className="py-32 px-6 relative z-10">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-20">
            <h2 className="text-5xl md:text-6xl font-bold bg-gradient-to-r from-slate-800 to-slate-600 bg-clip-text text-transparent mb-6">
              我们的项目
            </h2>
            <p className="text-xl text-slate-600 max-w-2xl mx-auto">
              每一个项目都有数不尽的bug...
            </p>
          </div>
          
          <div className="grid md:grid-cols-3 gap-8">
            {projects.map((project, index) => (
              <div
                key={project.name}
                className="group relative backdrop-blur-2xl bg-white/30 rounded-3xl p-10 border border-white/40 shadow-2xl hover:shadow-3xl transition-all duration-700 hover:scale-110 hover:bg-white/50 hover:z-10 peer overflow-hidden"
                style={{ 
                  animationDelay: `${index * 200}ms`,
                  transform: `translateY(${Math.max(0, scrollY - 800) * -0.1}px)`
                }}
                onMouseEnter={() => setHoveredElement(`project-${index}`)}
                onMouseLeave={() => setHoveredElement(null)}
              >
                {/* Mouse follower text effect */}
                {hoveredElement === `project-${index}` && (
                  <div
                    className="fixed pointer-events-none z-50 text-6xl font-bold text-white/80 transition-all duration-300 ease-out"
                    style={{
                      left: mousePosition.x - 100,
                      top: mousePosition.y - 30,
                      textShadow: '0 0 20px rgba(255,255,255,0.5), 0 0 40px rgba(59,130,246,0.3)',
                      transform: 'scale(1.5)',
                    }}
                  >
                    {project.name.split(' ')[0]}
                  </div>
                )}
                <div className={`w-20 h-20 rounded-3xl bg-gradient-to-br ${project.gradient} flex items-center justify-center text-white mb-8 group-hover:scale-110 group-hover:rotate-3 transition-all duration-500 shadow-lg`}>
                  {project.icon}
                </div>
                <h3 className="text-2xl font-bold text-slate-800 mb-4">{project.name}</h3>
                <p className="text-slate-600 mb-8 leading-relaxed text-lg">{project.description}</p>
                {project.link !== '#' && (
                  <a
                    href={project.link}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-3 text-blue-600 hover:text-blue-700 font-semibold text-lg group-hover:translate-x-2 transition-all duration-300"
                  >
                    访问项目 <ExternalLink className="w-5 h-5" />
                  </a>
                )}
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Recommendations Section */}
      <section className="py-32 px-6 relative z-10">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-20">
            <h2 className="text-5xl md:text-6xl font-bold bg-gradient-to-r from-slate-800 to-slate-600 bg-clip-text text-transparent mb-6">
              推荐链接
            </h2>
            <p className="text-xl text-slate-600 max-w-2xl mx-auto">
              精心挑选的优质资源与工具
            </p>
          </div>
          
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            {recommendations.map((item, index) => (
              <a
                key={item.name}
                href={item.link}
                target="_blank"
                rel="noopener noreferrer"
                className="group block backdrop-blur-2xl bg-white/30 rounded-3xl p-8 border border-white/40 shadow-xl hover:shadow-2xl transition-all duration-500 hover:scale-105 hover:bg-white/50 overflow-hidden"
                style={{ 
                  animationDelay: `${index * 100}ms`,
                  transform: `translateY(${Math.max(0, scrollY - 1400) * -0.05}px)`
                }}
                onMouseEnter={() => setHoveredElement(`rec-${index}`)}
                onMouseLeave={() => setHoveredElement(null)}
              >
                {/* Mouse follower text effect for recommendations */}
                {hoveredElement === `rec-${index}` && (
                  <div
                    className="fixed pointer-events-none z-50 text-4xl font-bold text-white/80 transition-all duration-300 ease-out"
                    style={{
                      left: mousePosition.x - 80,
                      top: mousePosition.y - 20,
                      textShadow: '0 0 15px rgba(255,255,255,0.5), 0 0 30px rgba(59,130,246,0.3)',
                      transform: 'scale(1.3)',
                    }}
                  >
                    {item.name}
                  </div>
                )}
                <div className={`${item.color} mb-6 group-hover:scale-125 group-hover:rotate-12 transition-all duration-500`}>
                  {item.icon}
                </div>
                <h3 className="text-xl font-semibold text-slate-800 mb-3">{item.name}</h3>
                <p className="text-slate-600 leading-relaxed">{item.description}</p>
              </a>
            ))}
          </div>
        </div>
      </section>

      {/* Statistics Section */}
      <section className="py-32 px-6 relative z-10">
        <div className="max-w-5xl mx-auto">
          <div className="backdrop-blur-2xl bg-white/30 rounded-[3rem] p-12 md:p-16 border border-white/40 shadow-2xl">
            <h2 className="text-4xl md:text-5xl font-bold text-center mb-16 bg-gradient-to-r from-slate-800 to-slate-600 bg-clip-text text-transparent">
              访问统计
            </h2>
            <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
              {stats.map((stat, index) => (
                <div
                  key={stat.id}
                  className="text-center backdrop-blur-sm bg-white/20 rounded-3xl p-8 border border-white/30 hover:bg-white/40 transition-all duration-500 hover:scale-110 group"
                >
                  <div className="flex justify-center mb-4 text-blue-600 group-hover:scale-125 transition-transform duration-300">
                    {stat.icon}
                  </div>
                  <div className="text-3xl font-bold text-slate-800 mb-2">
                    <span id={stat.id}>加载中...</span>
                  </div>
                  <div className="text-slate-600 font-medium">{stat.label}</div>
                </div>
              ))}
            </div>
            
            {/* Additional stats */}
            <div className="mt-12 pt-8 border-t border-white/20">
              <div className="grid md:grid-cols-2 gap-6 text-center">
                <div className="backdrop-blur-sm bg-white/20 rounded-2xl p-6 border border-white/30">
                  <div className="text-lg text-slate-600 mb-1">本页阅读量</div>
                  <div className="text-2xl font-bold text-slate-800">
                    <span id="busuanzi_page_pv">加载中...</span> 次
                  </div>
                </div>
                <div className="backdrop-blur-sm bg-white/20 rounded-2xl p-6 border border-white/30">
                  <div className="text-lg text-slate-600 mb-1">本页访客数</div>
                  <div className="text-2xl font-bold text-slate-800">
                    <span id="busuanzi_page_uv">加载中...</span> 人
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  );

  const renderCooperationPage = () => (
    <section className="min-h-screen py-32 px-6 relative z-10">
      <div className="max-w-4xl mx-auto">
        <div className="text-center mb-20">
          <h1 className="text-6xl md:text-7xl font-bold bg-gradient-to-r from-slate-800 to-slate-600 bg-clip-text text-transparent mb-8">
            合作伙伴
          </h1>
          <p className="text-2xl text-slate-600 max-w-2xl mx-auto leading-relaxed">
            与我们一起创造更美好的数字世界
          </p>
        </div>

        <div className="backdrop-blur-2xl bg-white/30 rounded-[3rem] p-12 md:p-16 border border-white/40 shadow-2xl">
          <div className="text-center mb-12">
            <div className="w-24 h-24 bg-gradient-to-br from-blue-500 to-purple-600 rounded-3xl flex items-center justify-center text-white mb-8 mx-auto shadow-2xl">
              <Handshake className="w-12 h-12" />
            </div>
            <h2 className="text-4xl font-bold text-slate-800 mb-6">洛谷团队</h2>
            <p className="text-xl text-slate-600 mb-8 leading-relaxed">
              我们在洛谷平台上建立了专业的开发团队，致力于算法学习、编程竞赛和技术交流。
              欢迎有志于编程和算法的朋友加入我们！
            </p>
            
            <div className="grid md:grid-cols-2 gap-8 mb-12">
              <div className="backdrop-blur-sm bg-white/20 rounded-2xl p-8 border border-white/30">
                <h3 className="text-2xl font-semibold text-slate-800 mb-4">团队特色</h3>
                <ul className="text-slate-600 space-y-3 text-left">
                  <li className="flex items-center">
                    <div className="w-2 h-2 bg-blue-500 rounded-full mr-3"></div>
                    算法竞赛指导与训练
                  </li>
                  <li className="flex items-center">
                    <div className="w-2 h-2 bg-blue-500 rounded-full mr-3"></div>
                    编程技能提升交流
                  </li>
                  <li className="flex items-center">
                    <div className="w-2 h-2 bg-blue-500 rounded-full mr-3"></div>
                    项目开发合作机会
                  </li>
                  <li className="flex items-center">
                    <div className="w-2 h-2 bg-blue-500 rounded-full mr-3"></div>
                    技术分享与学习
                  </li>
                </ul>
              </div>
              
              <div className="backdrop-blur-sm bg-white/20 rounded-2xl p-8 border border-white/30">
                <h3 className="text-2xl font-semibold text-slate-800 mb-4">加入条件</h3>
                <ul className="text-slate-600 space-y-3 text-left">
                  <li className="flex items-center">
                    <div className="w-2 h-2 bg-green-500 rounded-full mr-3"></div>
                    热爱编程与算法
                  </li>
                  <li className="flex items-center">
                    <div className="w-2 h-2 bg-green-500 rounded-full mr-3"></div>
                    积极参与团队活动
                  </li>
                  <li className="flex items-center">
                    <div className="w-2 h-2 bg-green-500 rounded-full mr-3"></div>
                    乐于分享与学习
                  </li>
                  <li className="flex items-center">
                    <div className="w-2 h-2 bg-green-500 rounded-full mr-3"></div>
                    具备基础编程能力
                  </li>
                </ul>
              </div>
            </div>

            <a
              href="https://www.luogu.com.cn/team/110445"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-4 bg-gradient-to-r from-blue-600 to-purple-600 text-white px-12 py-6 rounded-2xl font-semibold text-xl hover:from-blue-700 hover:to-purple-700 transition-all duration-300 shadow-2xl hover:shadow-3xl hover:scale-105"
            >
              <Handshake className="w-6 h-6" />
              访问洛谷团队
              <ExternalLink className="w-6 h-6" />
            </a>
          </div>
        </div>

        <div className="mt-16 text-center">
          <div className="backdrop-blur-sm bg-white/20 rounded-2xl p-8 border border-white/30 max-w-2xl mx-auto">
            <h3 className="text-2xl font-semibold text-slate-800 mb-4">商务合作</h3>
            <p className="text-slate-600 leading-relaxed">
              如果您有项目合作、技术咨询或其他商务需求，欢迎通过洛谷团队页面联系我们。
              我们期待与您携手创造更多精彩的项目！
            </p>
          </div>
        </div>
      </div>
    </section>
  );

  const renderAboutPage = () => (
    <section className="min-h-screen py-32 px-6 relative z-10">
      <div className="max-w-4xl mx-auto">
        <div className="text-center mb-20">
          <h1 className="text-6xl md:text-7xl font-bold bg-gradient-to-r from-slate-800 to-slate-600 bg-clip-text text-transparent mb-8">
            关于我们
          </h1>
          <p className="text-2xl text-slate-600 max-w-2xl mx-auto leading-relaxed">
            了解 Weberry Studio 的理念与愿景
          </p>
        </div>

        <div className="space-y-8">
          {/* MIT License Section */}
          <div className="backdrop-blur-2xl bg-white/30 rounded-[3rem] p-12 md:p-16 border border-white/40 shadow-2xl">
            <div className="text-center mb-12">
              <div className="w-24 h-24 bg-gradient-to-br from-green-500 to-teal-600 rounded-3xl flex items-center justify-center text-white mb-8 mx-auto shadow-2xl">
                <Code className="w-12 h-12" />
              </div>
              <h2 className="text-4xl font-bold text-slate-800 mb-6">开源许可</h2>
              <p className="text-xl text-slate-600 mb-8 leading-relaxed">
                我们的项目采用 MIT 许可证，致力于推动开源社区的发展
              </p>
            </div>

            <div className="backdrop-blur-sm bg-white/20 rounded-2xl p-8 border border-white/30 mb-8">
              <h3 className="text-2xl font-semibold text-slate-800 mb-6 text-center">MIT License</h3>
              <div className="text-slate-700 leading-relaxed space-y-4 font-mono text-sm bg-slate-50/50 rounded-xl p-6">
                <p>Copyright (c) 2025 Weberry Studio</p>
                <p>
                  Permission is hereby granted, free of charge, to any person obtaining a copy
                  of this software and associated documentation files (the "Software"), to deal
                  in the Software without restriction, including without limitation the rights
                  to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
                  copies of the Software, and to permit persons to whom the Software is
                  furnished to do so, subject to the following conditions:
                </p>
                <p>
                  The above copyright notice and this permission notice shall be included in all
                  copies or substantial portions of the Software.
                </p>
                <p>
                  THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
                  IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
                  FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
                  AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
                  LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
                  OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE
                  SOFTWARE.
                </p>
              </div>
            </div>

            <div className="grid md:grid-cols-3 gap-6">
              <div className="text-center backdrop-blur-sm bg-white/20 rounded-2xl p-6 border border-white/30">
                <h4 className="text-lg font-semibold text-slate-800 mb-3">自由使用</h4>
                <p className="text-slate-600 text-sm">可以自由使用、修改和分发我们的开源项目</p>
              </div>
              <div className="text-center backdrop-blur-sm bg-white/20 rounded-2xl p-6 border border-white/30">
                <h4 className="text-lg font-semibold text-slate-800 mb-3">商业友好</h4>
                <p className="text-slate-600 text-sm">支持商业用途，无需支付额外费用</p>
              </div>
              <div className="text-center backdrop-blur-sm bg-white/20 rounded-2xl p-6 border border-white/30">
                <h4 className="text-lg font-semibold text-slate-800 mb-3">社区驱动</h4>
                <p className="text-slate-600 text-sm">欢迎社区贡献，共同完善项目</p>
              </div>
            </div>
          </div>

          {/* Studio Info Section */}
          <div className="backdrop-blur-2xl bg-white/30 rounded-[3rem] p-12 md:p-16 border border-white/40 shadow-2xl">
            <div className="text-center mb-12">
              <div className="w-24 h-24 bg-gradient-to-br from-purple-500 to-pink-600 rounded-3xl flex items-center justify-center text-white mb-8 mx-auto shadow-2xl">
                <Info className="w-12 h-12" />
              </div>
              <h2 className="text-4xl font-bold text-slate-800 mb-6">工作室简介</h2>
            </div>

            <div className="grid md:grid-cols-2 gap-8">
              <div className="backdrop-blur-sm bg-white/20 rounded-2xl p-8 border border-white/30">
                <h3 className="text-2xl font-semibold text-slate-800 mb-4">我们的使命</h3>
                <p className="text-slate-600 leading-relaxed">
                  Weberry Studio 致力于创造有趣、实用的数字产品，通过技术创新为用户带来更好的体验。
                  我们相信每一个创意都值得被精心雕琢，每一行代码都承载着对美好的追求。
                </p>
              </div>
              
              <div className="backdrop-blur-sm bg-white/20 rounded-2xl p-8 border border-white/30">
                <h3 className="text-2xl font-semibold text-slate-800 mb-4">技术栈</h3>
                <div className="flex flex-wrap gap-2">
                  {['React', 'TypeScript', 'Tailwind CSS', 'WebGL', 'Node.js', 'HTML5', 'CSS3', 'JavaScript'].map((tech) => (
                    <span key={tech} className="px-3 py-1 bg-blue-100/50 text-blue-800 rounded-full text-sm font-medium">
                      {tech}
                    </span>
                  ))}
                </div>
              </div>
            </div>

            <div className="mt-8 text-center">
              <div className="backdrop-blur-sm bg-white/20 rounded-2xl p-8 border border-white/30">
                <h3 className="text-2xl font-semibold text-slate-800 mb-4">联系我们</h3>
                <p className="text-slate-600 leading-relaxed">
                  虽然目前工作室只有一个人，但我们对每个项目都倾注了全部的热情与专业。
                  如果您对我们的项目感兴趣，或者有任何建议和想法，欢迎通过洛谷团队页面与我们交流！
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );

  return (
    <div className="bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-100 relative overflow-hidden cursor-none">
      {/* Custom cursor */}
      <div 
        className="fixed w-8 h-8 backdrop-blur-md bg-white/30 rounded-full pointer-events-none z-50 border border-white/50 shadow-2xl transition-transform duration-150 ease-out"
        style={{
          left: mousePosition.x - 16,
          top: mousePosition.y - 16,
          boxShadow: '0 8px 32px rgba(255, 255, 255, 0.3), 0 0 0 1px rgba(255, 255, 255, 0.2), inset 0 1px 0 rgba(255, 255, 255, 0.4)',
        }}
      />
      <div 
        className="fixed w-2 h-2 bg-white/80 rounded-full pointer-events-none z-50 shadow-sm"
        style={{
          left: mousePosition.x - 4,
          top: mousePosition.y - 4,
        }}
      />
      
      {/* Animated background elements */}
      <div 
        className="fixed inset-0 pointer-events-none z-0"
        style={{
          background: `radial-gradient(800px circle at ${mousePosition.x}px ${mousePosition.y}px, rgba(59, 130, 246, 0.1), transparent 40%)`
        }}
      />
      
      {/* Floating elements */}
      <div className="absolute top-20 left-10 w-96 h-96 bg-gradient-to-br from-blue-200 to-indigo-300 rounded-full opacity-20 blur-3xl animate-pulse" />
      <div className="absolute bottom-20 right-10 w-80 h-80 bg-gradient-to-br from-teal-200 to-cyan-300 rounded-full opacity-20 blur-3xl animate-pulse delay-1000" />

      {/* Navigation Bar */}
      <nav className="fixed top-8 left-1/2 transform -translate-x-1/2 z-40">
        <div className="relative backdrop-blur-2xl bg-white/20 rounded-2xl border border-white/30 shadow-2xl overflow-hidden">
          {/* Glass reflection effect */}
          <div className="absolute inset-0 bg-gradient-to-br from-white/40 via-transparent to-transparent opacity-50 pointer-events-none" />
          <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-transparent via-white/60 to-transparent" />
          
          <div className="relative flex items-center p-2">
            {navItems.map((item, index) => (
              <button
                key={item.id}
                onClick={() => handleTabClick(index, item.id)}
                className={`relative flex items-center gap-3 px-6 py-3 rounded-xl font-medium transition-all duration-300 ${
                  activeTab === index
                    ? 'text-white shadow-lg'
                    : 'text-slate-700 hover:text-slate-900 hover:bg-white/20'
                }`}
              >
                {item.icon}
                <span>{item.label}</span>
                
                {/* Active tab background with glass effect */}
                {activeTab === index && (
                  <div className="absolute inset-0 bg-gradient-to-r from-blue-500/80 to-purple-500/80 rounded-xl backdrop-blur-sm border border-white/20 shadow-xl">
                    <div className="absolute inset-0 bg-gradient-to-br from-white/30 via-transparent to-transparent rounded-xl" />
                    <div className="absolute top-0 left-0 w-full h-0.5 bg-gradient-to-r from-transparent via-white/80 to-transparent" />
                  </div>
                )}
              </button>
            ))}
          </div>
          
          {/* Animated underline */}
          <div 
            className="absolute bottom-0 h-1 bg-gradient-to-r from-blue-500 to-purple-500 rounded-full transition-all duration-500 ease-out shadow-lg"
            style={{
              left: `${(activeTab * 100) / navItems.length + 8}%`,
              width: `${100 / navItems.length - 16}%`,
              boxShadow: '0 0 20px rgba(59, 130, 246, 0.5), 0 0 40px rgba(147, 51, 234, 0.3)'
            }}
          />
        </div>
      </nav>

      {/* Page Content */}
      <main className="relative z-10">
        {currentPage === 'home' && renderHomePage()}
        {currentPage === 'cooperation' && renderCooperationPage()}
        {currentPage === 'about' && renderAboutPage()}
      </main>

      {/* Footer */}
      <footer className="py-20 px-6 text-center relative z-10">
        <div className="backdrop-blur-2xl bg-white/20 rounded-3xl max-w-3xl mx-auto p-12 border border-white/30 shadow-xl">
          <h3 className="text-2xl font-bold text-slate-800 mb-4">Weberry Studio</h3>
          <div className="mb-6 p-4 backdrop-blur-sm bg-white/20 rounded-2xl border border-white/30">
            <div className="text-lg text-slate-600 mb-2">网站已运行</div>
            <div className="text-2xl font-bold text-slate-800 font-mono">
              {runtime}
            </div>
          </div>
          <p className="text-slate-600 mb-6 text-lg">
            © 2025 Weberry Studio - 专注创新与美学
          </p>
          <p className="text-slate-500">
            让每一个创意都闪闪发光 ✨
          </p>
        </div>
      </footer>
    </div>
  );
}

export default App;