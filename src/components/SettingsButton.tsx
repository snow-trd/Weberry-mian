import React, { useState, useEffect } from 'react';
import { Settings, X, Palette, Globe, Zap, Monitor, Sun, Moon, Volume2, VolumeX } from 'lucide-react';

interface SettingsButtonProps {
  mousePosition: { x: number; y: number };
}

const SettingsButton: React.FC<SettingsButtonProps> = ({ mousePosition }) => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [language, setLanguage] = useState(() => localStorage.getItem('language') || 'zh-CN');
  const [theme, setTheme] = useState(() => localStorage.getItem('theme') || 'auto');
  const [animations, setAnimations] = useState(() => localStorage.getItem('animations') !== 'false');
  const [soundEnabled, setSoundEnabled] = useState(() => localStorage.getItem('soundEnabled') !== 'false');
  const [modalAnimation, setModalAnimation] = useState('');

  // 保存设置到localStorage
  useEffect(() => {
    localStorage.setItem('language', language);
    localStorage.setItem('theme', theme);
    localStorage.setItem('animations', animations.toString());
    localStorage.setItem('soundEnabled', soundEnabled.toString());
    
    // 应用主题
    applyTheme(theme);
    
    // 应用动画设置
    document.documentElement.style.setProperty('--animation-duration', animations ? '0.3s' : '0s');
  }, [language, theme, animations, soundEnabled]);

  const applyTheme = (selectedTheme: string) => {
    const root = document.documentElement;
    
    if (selectedTheme === 'dark') {
      root.classList.add('dark');
    } else if (selectedTheme === 'light') {
      root.classList.remove('dark');
    } else {
      // 跟随系统
      const prefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
      if (prefersDark) {
        root.classList.add('dark');
      } else {
        root.classList.remove('dark');
      }
    }
  };

  const openModal = () => {
    setModalAnimation('animate-in');
    setIsModalOpen(true);
    if (soundEnabled) {
      // 播放打开音效（这里可以添加实际的音频播放）
      console.log('播放打开音效');
    }
  };

  const closeModal = () => {
    setModalAnimation('animate-out');
    setTimeout(() => {
      setIsModalOpen(false);
      setModalAnimation('');
    }, 300);
    if (soundEnabled) {
      console.log('播放关闭音效');
    }
  };

  const languages = [
    { code: 'zh-CN', name: '简体中文', flag: '🇨🇳', nativeName: '简体中文' },
    { code: 'en-US', name: 'English', flag: '🇺🇸', nativeName: 'English' },
    { code: 'ja-JP', name: '日本語', flag: '🇯🇵', nativeName: '日本語' },
    { code: 'ko-KR', name: '한국어', flag: '🇰🇷', nativeName: '한국어' }
  ];

  const themes = [
    { value: 'auto', name: '跟随系统', icon: <Monitor className="w-5 h-5" />, description: '根据系统设置自动切换' },
    { value: 'light', name: '浅色模式', icon: <Sun className="w-5 h-5" />, description: '明亮清新的界面风格' },
    { value: 'dark', name: '深色模式', icon: <Moon className="w-5 h-5" />, description: '护眼的深色界面' }
  ];

  return (
    <>
      {/* Settings Button */}
      <div className="fixed top-6 right-6 z-50">
        <div 
          className="absolute inset-0 rounded-full opacity-20 pointer-events-none blur-xl"
          style={{
            background: `radial-gradient(circle at ${mousePosition.x * 0.1}% ${mousePosition.y * 0.1}%, rgba(59, 130, 246, 0.6) 0%, rgba(147, 51, 234, 0.4) 50%, transparent 70%)`,
            transform: `translate(${Math.sin(Date.now() * 0.002) * 3}px, ${Math.cos(Date.now() * 0.002) * 2}px)`,
          }}
        />
        
        <button
          onClick={openModal}
          className="relative backdrop-blur-2xl bg-white/20 rounded-full p-4 border border-white/30 shadow-2xl hover:bg-white/30 transition-all duration-500 hover:scale-110 group overflow-hidden"
        >
          <div className="absolute inset-1 rounded-full bg-gradient-to-br from-white/40 via-white/10 to-transparent opacity-60 pointer-events-none" />
          <div className="absolute inset-1 rounded-full bg-gradient-to-tl from-blue-200/20 via-transparent to-purple-200/20 opacity-80 pointer-events-none" />
          
          <Settings className="w-6 h-6 text-slate-700 group-hover:text-slate-900 transition-all duration-500 group-hover:rotate-180 relative z-10" />
          
          <div className="absolute bottom-0 left-2 right-2 h-px bg-gradient-to-r from-transparent via-white/60 to-transparent" />
          <div className="absolute top-0 left-2 right-2 h-px bg-gradient-to-r from-transparent via-white/40 to-transparent" />
        </button>
      </div>

      {/* Settings Modal */}
      {isModalOpen && (
        <div className={`fixed inset-0 z-[9998] flex items-center justify-center p-6 ${modalAnimation}`}>
          {/* Backdrop with blur effect */}
          <div 
            className="absolute inset-0 backdrop-blur-md transition-all duration-300"
            style={{
              background: `radial-gradient(circle at ${mousePosition.x}px ${mousePosition.y}px, rgba(59, 130, 246, 0.1) 0%, rgba(0, 0, 0, 0.3) 50%, rgba(0, 0, 0, 0.5) 100%)`
            }}
            onClick={closeModal}
          />
          
          {/* Modal Window */}
          <div className={`relative w-full max-w-2xl transform transition-all duration-500 ${
            modalAnimation === 'animate-in' ? 'scale-100 opacity-100 translate-y-0' : 
            modalAnimation === 'animate-out' ? 'scale-95 opacity-0 translate-y-4' : 
            'scale-100 opacity-100 translate-y-0'
          }`}>
            <div className="backdrop-blur-2xl bg-white/10 rounded-3xl border border-white/20 shadow-2xl overflow-hidden">
              {/* Glassmorphism effects */}
              <div className="absolute inset-0 bg-gradient-to-br from-white/20 via-white/5 to-transparent pointer-events-none" />
              <div className="absolute inset-0 bg-gradient-to-tl from-blue-500/10 via-transparent to-purple-500/10 pointer-events-none" />
              
              {/* Header */}
              <div className="relative px-8 py-6 border-b border-white/10 bg-gradient-to-r from-white/10 to-white/5">
                <div className="flex items-center justify-between">
                  <div className="flex items-center space-x-4">
                    <div className="w-12 h-12 rounded-2xl bg-gradient-to-br from-blue-400 to-purple-500 flex items-center justify-center text-white shadow-lg">
                      <Settings className="w-6 h-6" />
                    </div>
                    <div>
                      <h2 className="text-2xl font-bold text-white">设置中心</h2>
                      <p className="text-white/70 text-sm">个性化您的体验</p>
                    </div>
                  </div>
                  <button
                    onClick={closeModal}
                    className="p-2 rounded-xl hover:bg-white/10 transition-all duration-300 text-white/70 hover:text-white group"
                  >
                    <X className="w-6 h-6 group-hover:rotate-90 transition-transform duration-300" />
                  </button>
                </div>
              </div>

              {/* Content */}
              <div className="relative p-8 space-y-8 max-h-[70vh] overflow-y-auto">
                {/* Language Settings */}
                <div className="space-y-4">
                  <div className="flex items-center space-x-3 mb-6">
                    <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-green-400 to-emerald-500 flex items-center justify-center text-white">
                      <Globe className="w-5 h-5" />
                    </div>
                    <div>
                      <h3 className="text-xl font-semibold text-white">语言设置</h3>
                      <p className="text-white/60 text-sm">选择您偏好的界面语言</p>
                    </div>
                  </div>
                  <div className="grid grid-cols-2 gap-3">
                    {languages.map((lang) => (
                      <button
                        key={lang.code}
                        onClick={() => setLanguage(lang.code)}
                        className={`relative p-4 rounded-2xl transition-all duration-300 border-2 group ${
                          language === lang.code
                            ? 'bg-blue-500/20 border-blue-400/60 shadow-lg shadow-blue-500/20'
                            : 'bg-white/5 border-white/10 hover:bg-white/10 hover:border-white/20'
                        }`}
                      >
                        <div className="flex items-center space-x-3">
                          <span className="text-2xl">{lang.flag}</span>
                          <div className="text-left">
                            <div className="font-medium text-white">{lang.nativeName}</div>
                            <div className="text-xs text-white/60">{lang.name}</div>
                          </div>
                        </div>
                        {language === lang.code && (
                          <div className="absolute top-2 right-2 w-3 h-3 rounded-full bg-blue-400 shadow-lg shadow-blue-400/50" />
                        )}
                      </button>
                    ))}
                  </div>
                </div>

                {/* Theme Settings */}
                <div className="space-y-4">
                  <div className="flex items-center space-x-3 mb-6">
                    <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-purple-400 to-pink-500 flex items-center justify-center text-white">
                      <Palette className="w-5 h-5" />
                    </div>
                    <div>
                      <h3 className="text-xl font-semibold text-white">主题设置</h3>
                      <p className="text-white/60 text-sm">选择您喜欢的界面主题</p>
                    </div>
                  </div>
                  <div className="space-y-3">
                    {themes.map((themeOption) => (
                      <button
                        key={themeOption.value}
                        onClick={() => setTheme(themeOption.value)}
                        className={`w-full p-4 rounded-2xl transition-all duration-300 border-2 group ${
                          theme === themeOption.value
                            ? 'bg-purple-500/20 border-purple-400/60 shadow-lg shadow-purple-500/20'
                            : 'bg-white/5 border-white/10 hover:bg-white/10 hover:border-white/20'
                        }`}
                      >
                        <div className="flex items-center justify-between">
                          <div className="flex items-center space-x-4">
                            <div className={`p-2 rounded-lg ${theme === themeOption.value ? 'bg-purple-400/30' : 'bg-white/10'}`}>
                              {themeOption.icon}
                            </div>
                            <div className="text-left">
                              <div className="font-medium text-white">{themeOption.name}</div>
                              <div className="text-sm text-white/60">{themeOption.description}</div>
                            </div>
                          </div>
                          {theme === themeOption.value && (
                            <div className="w-3 h-3 rounded-full bg-purple-400 shadow-lg shadow-purple-400/50" />
                          )}
                        </div>
                      </button>
                    ))}
                  </div>
                </div>

                {/* Feature Settings */}
                <div className="space-y-4">
                  <div className="flex items-center space-x-3 mb-6">
                    <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-orange-400 to-red-500 flex items-center justify-center text-white">
                      <Zap className="w-5 h-5" />
                    </div>
                    <div>
                      <h3 className="text-xl font-semibold text-white">功能设置</h3>
                      <p className="text-white/60 text-sm">自定义界面行为和效果</p>
                    </div>
                  </div>
                  
                  <div className="space-y-4">
                    {/* Animation Toggle */}
                    <div className="flex items-center justify-between p-4 rounded-2xl bg-white/5 border border-white/10 hover:bg-white/10 transition-all duration-300">
                      <div className="flex items-center space-x-4">
                        <div className="p-2 rounded-lg bg-gradient-to-br from-blue-400 to-cyan-500 text-white">
                          <Zap className="w-5 h-5" />
                        </div>
                        <div>
                          <div className="font-medium text-white">动画效果</div>
                          <div className="text-sm text-white/60">启用界面动画和过渡效果</div>
                        </div>
                      </div>
                      <button
                        onClick={() => setAnimations(!animations)}
                        className={`relative w-14 h-8 rounded-full transition-all duration-300 ${
                          animations ? 'bg-gradient-to-r from-blue-500 to-cyan-500' : 'bg-white/20'
                        }`}
                      >
                        <div className={`absolute top-1 w-6 h-6 bg-white rounded-full shadow-lg transition-all duration-300 ${
                          animations ? 'translate-x-7' : 'translate-x-1'
                        }`} />
                      </button>
                    </div>

                    {/* Sound Toggle */}
                    <div className="flex items-center justify-between p-4 rounded-2xl bg-white/5 border border-white/10 hover:bg-white/10 transition-all duration-300">
                      <div className="flex items-center space-x-4">
                        <div className="p-2 rounded-lg bg-gradient-to-br from-green-400 to-emerald-500 text-white">
                          {soundEnabled ? <Volume2 className="w-5 h-5" /> : <VolumeX className="w-5 h-5" />}
                        </div>
                        <div>
                          <div className="font-medium text-white">音效反馈</div>
                          <div className="text-sm text-white/60">启用按钮点击和交互音效</div>
                        </div>
                      </div>
                      <button
                        onClick={() => setSoundEnabled(!soundEnabled)}
                        className={`relative w-14 h-8 rounded-full transition-all duration-300 ${
                          soundEnabled ? 'bg-gradient-to-r from-green-500 to-emerald-500' : 'bg-white/20'
                        }`}
                      >
                        <div className={`absolute top-1 w-6 h-6 bg-white rounded-full shadow-lg transition-all duration-300 ${
                          soundEnabled ? 'translate-x-7' : 'translate-x-1'
                        }`} />
                      </button>
                    </div>
                  </div>
                </div>

                {/* About Section */}
                <div className="pt-6 border-t border-white/10">
                  <div className="text-center space-y-3">
                    <div className="w-16 h-16 rounded-2xl bg-gradient-to-br from-indigo-400 to-purple-500 flex items-center justify-center text-white mx-auto shadow-lg">
                      <Settings className="w-8 h-8" />
                    </div>
                    <div>
                      <p className="text-lg font-semibold text-white">Weberry Studio</p>
                      <p className="text-sm text-white/60">版本 1.0.0 • 构建 20250105</p>
                      <p className="text-xs text-white/50 mt-2">© 2025 保留所有权利 • MIT License</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}

      <style jsx>{`
        .animate-in {
          animation: modalIn 0.5s cubic-bezier(0.34, 1.56, 0.64, 1);
        }
        
        .animate-out {
          animation: modalOut 0.3s cubic-bezier(0.4, 0, 0.2, 1);
        }
        
        @keyframes modalIn {
          0% {
            opacity: 0;
            transform: scale(0.8) translateY(20px);
          }
          100% {
            opacity: 1;
            transform: scale(1) translateY(0);
          }
        }
        
        @keyframes modalOut {
          0% {
            opacity: 1;
            transform: scale(1) translateY(0);
          }
          100% {
            opacity: 0;
            transform: scale(0.95) translateY(10px);
          }
        }
      `}</style>
    </>
  );
};

export default SettingsButton;