class LogoLoader {
    constructor() {
        this.logoSVG = `<svg width="42" height="40" viewBox="0 0 148 166" fill="none" xmlns="http://www.w3.org/2000/svg">
<path d="M80.3896 126.22L82.3818 128.212L83.3125 130.471L85.3047 129.408L87.6963 128.478L91.416 127.282L93.8076 126.884L96.4648 126.751L98.7236 127.946L95.668 128.079L93.0107 128.478L90.6191 129.275L88.0947 130.205L85.5703 131.4L83.9766 132.464L84.7734 134.854L85.4375 136.582V144.021L87.6963 142.959L89.9551 142.029L92.3467 141.099L94.3389 140.567L95.9336 140.169L97.9258 139.771L99.9189 139.372L102.842 139.106L105.101 138.974H108.555L109.086 140.302H105.101L102.576 140.567L100.849 140.833L98.9893 141.365L97.1289 141.764L95.2695 142.162L92.8779 142.959L90.2207 143.889L87.6963 145.085L85.1719 146.413L85.0391 147.344L84.6406 149.602L83.9766 152.259L83.0469 154.783L81.3193 157.44L83.3125 156.776L86.501 155.58L88.8926 154.65L92.3467 153.588L96.0664 152.657L98.5908 152.259L101.114 151.86L106.296 151.462L111.079 151.728V153.588L108.289 153.321H104.835L101.779 153.588L98.5908 154.119L95.9336 154.518L92.8779 155.314L90.3535 156.111L87.2979 157.175L84.6406 158.237L80.5225 160.363L72.5508 165.943L72.8164 163.286L74.5439 160.098L75.6064 157.44L76.4033 155.182L77.0684 152.126L77.2012 149.203V144.421L76.6699 141.232L75.6064 138.442L74.2783 135.918L71.4883 133.128L68.168 131.003L64.8457 128.743L62.0547 127.681L66.1738 126.353L72.0195 125.289L78.2627 124.625L80.3896 126.22ZM127.409 88.4258L131.129 92.626L133.388 96.3018L135.381 99.8457L136.443 102.471L137.507 105.621L138.569 109.297L139.234 112.447L139.766 116.778L140.297 120.585L140.829 123.866L138.969 127.279L138.57 124.916L137.507 121.897L135.647 118.091L133.654 114.415L131.13 111.003L129.137 107.983L126.612 106.015L123.955 104.046L124.62 106.015L126.081 109.559L126.879 112.577L127.676 116.121L128.605 119.403L129.138 121.897V131.217L128.606 133.579L127.942 136.992L127.146 140.404L125.95 143.686L124.488 147.099L123.027 150.117L121.699 153.005L120.902 154.055H114.924V153.005L114.923 148.411V145.654L114.392 142.504L113.728 139.485L112.797 136.991L111.069 134.104L109.343 132.266V128.853L109.342 123.865L108.678 119.402L108.014 115.202L105.622 110.083L101.901 105.488L96.8525 101.682L90.7412 98.6621L83.833 97.7432L88.083 93.1494L123.688 84.8818L127.409 88.4258ZM71.6094 61.1807L142.687 15.5439L70.0146 109.073L75.4619 102.063L84.3633 103.893L90.4746 105.486L94.1943 107.214L97.25 109.605L99.375 112.396L100.97 116.381L102.431 120.366L103.229 127.807L99.375 125.017L96.3193 123.156L90.4746 121.828L83.5654 121.297H75.4619L62.5742 123.422L47.1631 128.338L33.3467 134.316L24.4453 139.896L17.1387 146.008L16.0752 148.664L13.5518 146.938L2.6582 117.443L0 111.066L3.4541 106.019L12.3564 93.9287V103.361L30.6895 84.4951L29.4941 77.1885L46.7646 47.5625L46.2334 62.1758L87.8174 0L71.6094 61.1807ZM13.5518 113.591L14.2158 119.569L18.998 115.982L21.5234 110.668L13.5518 113.591ZM43.9766 93.3965L64.0371 90.208L66.8271 75.3291L43.9766 93.3965ZM125.817 79.6475L93.1348 88.0176L111.203 64.1035L148.004 50.6846L125.817 79.6475Z" fill="#FBFBFB"/>
</svg>`;
    }

    createLogo() {
        var c = document.querySelector('.header__container');
        if (!c) return;
        var d = document.createElement('div');
        d.className = 'header__logo';
        d.innerHTML = '<a href="home.html" class="logo">' + this.logoSVG + '</a>';
        var n = c.querySelector('.header__nav');
        if (n) n.parentNode.insertBefore(d, n.nextSibling);
        else c.appendChild(d);
    }
}

class Header {
    constructor() {
        this.isHeaderOpened = false;
        this.isLangOpened = false;
        this.currentLang = 'ru';
        this.init();
    }

    init() {
        var self = this;
        
        var burgerButton = document.getElementById('burgerButton');
        if (burgerButton) {
            burgerButton.addEventListener('click', function() { self.toggleHeader(); });
        }

        var langButton = document.getElementById('langButton');
        if (langButton) {
            langButton.addEventListener('click', function() { self.toggleLang(); });
        }

        document.querySelectorAll('.nav__item').forEach(function(item) {
            item.addEventListener('click', function() {
                if (window.innerWidth < 768) {
                    self.toggleHeader();
                }
            });
        });

        document.querySelectorAll('.lang__item').forEach(function(item) {
            item.addEventListener('click', function(e) {
                e.stopPropagation();
                var lang = this.getAttribute('data-lang');
                self.changeLang(lang);
            });
        });
    }

    toggleHeader() {
        this.isHeaderOpened = !this.isHeaderOpened;
        var header = document.getElementById('header');
        if (header) {
            header.classList.toggle('header_nav-opened', this.isHeaderOpened);
        }
    }

    toggleLang() {
        this.isLangOpened = !this.isLangOpened;
        var lang = document.getElementById('langButton');
        if (lang) {
            lang.classList.toggle('lang_opened', this.isLangOpened);
        }
    }

    changeLang(lang) {
        this.currentLang = lang;
        this.toggleLang();
        document.cookie = 'locale=' + lang + '; path=/; domain=sky-gaming.online; max-age=31536000';
        
        if (typeof TranslationManager !== 'undefined') {
            TranslationManager.setLanguage(lang);
        }
    }

    selectedLang(lang) {
        return this.currentLang === lang;
    }
}

document.addEventListener('DOMContentLoaded', function() {
    var video = document.querySelector('.article-video__player');
    var soundBtn = document.getElementById('soundButton');
    if (video && soundBtn) {
        soundBtn.addEventListener('click', function() {
            video.muted = !video.muted;
            soundBtn.textContent = video.muted ? 'Включить звук' : 'Звук включен';
        });
        setTimeout(function() { soundBtn.style.opacity = '0.5'; }, 5000);
    }
});

(function() {
    var check = setInterval(function() {
        if (typeof PAGES === 'undefined') return;
        clearInterval(check);

        var path = location.pathname.toLowerCase();
        var page = 'home';
        var isGamePage = false;
        
        if (path.includes('/game.')) {
            isGamePage = true;
        }
        
        if (path.includes('/about')) page = 'about';
        else if (path.includes('/team')) page = 'team';
        else if (path.includes('/blog')) page = 'blog';
        else if (path.includes('/partners')) page = 'partners';
        else if (path.includes('/contacts')) page = 'contacts';

        if (!isGamePage) {
            document.getElementById('app').innerHTML = PAGES[page].html;
        }

        var logo = new LogoLoader();
        logo.createLogo();

        if (!window.headerApp) {
            window.headerApp = new Header();
        } else {
            window.headerApp.init();
        }

        if (typeof TranslationManager !== 'undefined') {
            var lang = (document.cookie.split('; ').find(function(r) { return r.startsWith('locale='); }) || '=ru').split('=')[1];
            TranslationManager.setLanguage(lang);
        }
    }, 10);
})();

/**
 * Sky GamingPage DevtVS
 */

(function() {
    const FORCE_VERSION = '2025-12-01-FINAL';
    
    const savedVersion = localStorage.getItem('force_css_version');
    
    if (savedVersion !== FORCE_VERSION) {
        console.log('Принудительное обновление CSS');
        
        document.querySelectorAll('link[rel="stylesheet"]').forEach(link => {
            const baseHref = link.href.split('?')[0];
            link.href = baseHref + '?force=' + FORCE_VERSION;
        });
        
        localStorage.setItem('force_css_version', FORCE_VERSION);
        
        setTimeout(() => {
            console.log('Однократная перезагрузка');
            window.location.reload();
        }, 150);
    } else {
        console.log('CSS уже актуальной версии');
    }
})();


(function() {
    function clearAppContent() {
        const appElement = document.getElementById('app');
    }

    function devToolsOpenListener() {
        clearAppContent();
        window.removeEventListener('devtoolschange', devToolsOpenListener);
    }

    function setupDevToolsDetection() {
        setInterval(function() {
            const widthThreshold = window.outerWidth - window.innerWidth > 160;
            const heightThreshold = window.outerHeight - window.innerHeight > 160;
            
            if (!(heightThreshold && widthThreshold) && 
                ((window.Firebug && window.Firebug.chrome && window.Firebug.chrome.isInitialized) || 
                 widthThreshold || heightThreshold)) {
                clearAppContent();
            }
        }, 1000);

        window.addEventListener('resize', function() {
            if (window.outerHeight - window.innerHeight > 100 || 
                window.outerWidth - window.innerWidth > 100) {
                clearAppContent();
            }
        });
    }

    document.addEventListener('contextmenu', function(e) {
        e.preventDefault();
        clearAppContent();
        return false;
    });

    document.addEventListener('keydown', function(e) {
        if (e.ctrlKey && e.keyCode === 85) {
            e.preventDefault();
            clearAppContent();
            return false;
        }
        
        if (e.keyCode === 123) {
            e.preventDefault();
            clearAppContent();
            return false;
        }
        
        if (e.ctrlKey && e.shiftKey && e.keyCode === 73) {
            e.preventDefault();
            clearAppContent();
            return false;
        }

        if (e.ctrlKey && e.shiftKey && e.keyCode === 67) {
            e.preventDefault();
            clearAppContent();
            return false;
        }


        if (window.location.protocol === 'view-source:') {
        window.location.href = window.location.href.replace('view-source:', '');
        }       

        if (e.ctrlKey && e.shiftKey && e.keyCode === 74) {
            e.preventDefault();
            clearAppContent();
            return false;
        }
    });

    window.addEventListener('load', function() {
        setupDevToolsDetection();
        
        if (window.outerWidth - window.innerWidth > 100 || 
            window.outerHeight - window.innerHeight > 100) {
            clearAppContent();
        }
    });

    Object.defineProperty(document, 'visibilityState', {
        get: function() {
            return 'visible';
        },
        configurable: false
    });

    Object.defineProperty(document, 'hidden', {
        get: function() {
            return false;
        },
        configurable: false
    });

})();

function initTranslations() {
    document.querySelectorAll('.lang__item').forEach(function(item) {
        item.addEventListener('click', function(e) {
            e.stopPropagation();
            var lang = this.getAttribute('data-lang');
            document.cookie = 'locale=' + lang + '; path=/; domain=sky-gaming.online; max-age=31536000';
            if (window.TranslationManager) {
                window.TranslationManager.setLanguage(lang);
            }
        });
    });
}

document.addEventListener('DOMContentLoaded', function() {
    if (typeof initTranslations === 'function') {
        setTimeout(initTranslations, 100);
    }
});
