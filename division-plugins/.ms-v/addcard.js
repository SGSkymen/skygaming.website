const gameBanners = { 
    'bs': 'division-plugins/.wp-a/banner/team-bg-30fad560.jpg', 
    'chess': 'division-plugins/.wp-a/banner/team-bg-29fad560.jpg',
    'skg_academy': 'division-plugins/.wp-a/banner/team-bg-49fad560.jpg',
    'cs2': 'division-plugins/.wp-a/banner/team-bg-27fad560.jpg',
    'ms': 'division-plugins/.wp-a/banner/team-bg-25fad560.jpg'
};

function detectCurrentGame(){
    const path = window.location.pathname.toLowerCase();
    
    if (path.includes('game.family')) return 'ms';
    if (path.includes('game.bs')) return 'bs';
    if (path.includes('chess')) return 'chess';
    if (path.includes('game.cs2')) return 'cs2';
    if (path.includes('game.skg_academy') || path.includes('game.academy')) return 'skg_academy'; const backLink = document.querySelector('.back-link');
    if (backLink) { const text = backLink.textContent.toLowerCase();
        if (text.includes('academy')) return 'skg_academy';
        if (text.includes('family')) return 'ms';
        if (text.includes('brawl')) return 'bs';
        if (text.includes('chess')) return 'chess';
        if (text.includes('cs2')) return 'cs2';
    }
    
    return 'ms';
}

const playerBackgrounds = {
    '60d3a4c0fd3e00c80c84c45d': 'division-plugins/.wp-a/banner/family/misterfull_60d3a4c0fd3e00c80c84c45d.jpg',
    '60d3a4c0fd3e01c88c88c48d': 'division-plugins/.wp-a/banner/family/tarnashinskiy_60d3a4c0fd3e01c88c88c48d.jpg',
    '14d5a4c0fd3e00c80c84c45d': '',
    '44d3a4c0fd3e00c77c87c47d': 'division-plugins/.wp-a/banner/family/curnmen_44d3a4c0fd3e00c77c87c47d.jpg',
    '67d8a1c0fd3e00c88c88c44d': '',
    '6888bc802dad490028c3e106': '',
    '60d3a4c0fd3e00c88c84c41d': 'division-plugins/.wp-a/banner/family/buddy_t-rex_60d3a4c0fd3e00c88c84c41d.jpg',
    '76d6a4c9fd3e00c55c55c41d': '',
    '14d5a4c0fd3e01c80c85c48d': 'division-plugins/.wp-a/banner/family/inversion-meteor_14d5a4c0fd3e01c80c85c48d.jpg',
    '60d3a4c0fd3e03c85c89c22d': '',
    '76d3a4c0fd3e00c55c55c41d': '',
    '56d3a1c0fd3e00c88c84c40d': 'division-plugins/.wp-a/banner/family/pasha_56d3a1c0fd3e00c88c84c40d.jpg',
    '60d3a4c0fd4e00c44c44c44d': 'division-plugins/.wp-a/banner/family/morro_60d3a4c0fd4e00c44c44c44d.jpg',
    '67d8a1c0fd3e00c88c84c41d': 'division-plugins/.wp-a/banner/family/alavik_67d8a1c0fd3e00c88c84c41d.jpg',
    '60d3a4c0fd4e06c46c46c46d': '',
    '58d3a1c0fd3e00c03c01c48d': 'division-plugins/.wp-a/banner/bs/uncleshark_58d3a1c0fd3e00c03c01c48d.jpg',
    '57d3a1c0fd3e00c03c01c47d': '',
    '60d3a4c0fd3e00c88c87c47d': 'division-plugins/.wp-a/banner/chess/pogosov_60d3a4c0fd3e00c88c87c47d.jpg',
    '70d3a4c0fd3e01c88c88c48d': '',
    '70d3a6c0fd3e00c57c87c57d': '',
    '42d3a4c0fd3e00c52c87c47d': '',
    '7073a4c0fd3e00c28c82c22d': '',
    '79ga4c0fd3e00c21c81c11d' : '',
    '79ga4c0fd3e00c28c82c22d' : '',
    '7873a4c0fd3e00c28c82c22d': '',
};

const DEFAULT_BACKGROUND = 'division-plugins/.wp-a/banner/team-bg-29fad560.jpg';

function setBackground(imageUrl, backgroundElement){
    if (!backgroundElement) return; const img = new Image();

    img.onload = function(){ backgroundElement.style.backgroundImage = `url('${imageUrl}')`;};
    img.onerror = function(){
        if (imageUrl !== DEFAULT_BACKGROUND){
            backgroundElement.style.backgroundImage = `url('${DEFAULT_BACKGROUND}')`;
        }
    };
    img.src = imageUrl;
}

function getPlayerPhotoFromBackgrounds(playerElement){
    let pid = playerElement.id;
    if (pid.startsWith('player')){ 
        pid = pid.replace('player','');
    }
    if (window.playerBackgrounds && window.playerBackgrounds[pid]) {
        return window.playerBackgrounds[pid];
    }
    return null;
}

function addMobilePhotoToPlayer(playerElement){

    const oldPhoto = playerElement.querySelector('.team-player__mobile-img');
    if (oldPhoto) oldPhoto.remove();
    
    const photoUrl = getPlayerPhotoFromBackgrounds(playerElement);
    if (!photoUrl) return;
    
    const mobilePhotoDiv = document.createElement('div');
    mobilePhotoDiv.className = 'team-player__mobile-img';
    mobilePhotoDiv.innerHTML = `<img src="${photoUrl}" alt="player photo" loading="lazy">`;
    const headElement = playerElement.querySelector('.team-player__head');
    const nicknameElement = headElement?.querySelector('.team-player__nick');
    
    if (nicknameElement){
        headElement.insertBefore(mobilePhotoDiv,nicknameElement);
    } else if (headElement){
        headElement.insertBefore(mobilePhotoDiv,headElement.firstChild);
    }
}

function syncPlayerPhotosOnResize(){
    if (window.innerWidth <= 768){
        const activePlayer = document.querySelector('.team-player.active');
        if (activePlayer && !activePlayer.querySelector('.team-player__mobile-img')) {
            addMobilePhotoToPlayer(activePlayer);
        }
    } else {
        document.querySelectorAll('.team-player__mobile-img').forEach(photo => photo.remove());
    }
}

function openPlayerCard(player,pid,gameBanner,background){
    const body = player.querySelector('.team-player__body');
    
    document.querySelectorAll('.team-player').forEach(p => {
        p.classList.remove('active');
        const otherBody = p.querySelector('.team-player__body');
        if (otherBody) otherBody.style.display = 'none';

        const mobilePhoto = p.querySelector('.team-player__mobile-img');
        if (mobilePhoto) mobilePhoto.remove();
    });
    
    player.classList.add('active');
    if (body) body.style.display = 'block';
    
    if (playerBackgrounds[pid]) {
        setBackground(playerBackgrounds[pid],background);
    } else {
        setBackground(gameBanner,background);
    }

    if (window.innerWidth <= 768) {
        setTimeout(() => {
            addMobilePhotoToPlayer(player);
        }, 50);
    }
}

document.addEventListener('DOMContentLoaded', function() {
    const players = document.querySelectorAll('.team-player');
    const background = document.createElement('div');
    
    background.className = 'team-player-background';
    document.body.appendChild(background);
    
    const currentGame = detectCurrentGame();
    const gameBanner = gameBanners[currentGame] || DEFAULT_BACKGROUND;
    
    setBackground(gameBanner, background);
    background.classList.add('active');
    
    players.forEach(player => {
        const body = player.querySelector('.team-player__body');
        if (body) body.style.display = 'none';
        player.classList.remove('active');
    });
    
    players.forEach(player => {
        const head = player.querySelector('.team-player__head');
        const pid = player.id.replace('player', '');
        
        if (head) {
            head.style.cursor = 'pointer';
            head.addEventListener('click', function(e) {
                e.stopPropagation();
                openPlayerCard(player, pid, gameBanner, background);
            });
        }
    });

    document.addEventListener('click', function(e) {
        if (!e.target.closest('.team-player')) {
            players.forEach(player => {
                const body = player.querySelector('.team-player__body');
                if (body) body.style.display = 'none';
                player.classList.remove('active');
                const mobilePhoto = player.querySelector('.team-player__mobile-img');
                if (mobilePhoto) mobilePhoto.remove();
            });
            setBackground(gameBanner, background);
        }
    });
    
    document.addEventListener('keydown', function(e) {
        if (e.key === 'Escape') {
            players.forEach(player => {
                const body = player.querySelector('.team-player__body');
                if (body) body.style.display = 'none';
                player.classList.remove('active');
                const mobilePhoto = player.querySelector('.team-player__mobile-img');
                if (mobilePhoto) mobilePhoto.remove();
            });
            setBackground(gameBanner, background);
        }
    });
    
    const hash = window.location.hash;
    if (hash && hash.startsWith('#player')) {
        const playerPid = hash.substring(1);
        const targetPlayer = document.getElementById(playerPid);
        
        if (targetPlayer) {
            setTimeout(() => {
                openPlayerCard(targetPlayer, playerPid, gameBanner, background);
                setTimeout(() => {
                    targetPlayer.scrollIntoView({ behavior: 'smooth', block: 'start' });
                }, 100);
            }, 300);
        }
    }
});

window.addEventListener('resize', function() {
    syncPlayerPhotosOnResize();
});

window.addEventListener('hashchange', function() {
    const hash = window.location.hash;
    if (hash && hash.startsWith('#player')) {
        const playerPid = hash.substring(1);
        const targetPlayer = document.getElementById(playerPid);
        const background = document.querySelector('.team-player-background');
        const currentGame = detectCurrentGame();
        const gameBanner = gameBanners[currentGame] || DEFAULT_BACKGROUND;
        
        if (targetPlayer && background) {
            openPlayerCard(targetPlayer, playerPid, gameBanner, background);
            setTimeout(() => {
                targetPlayer.scrollIntoView({ behavior: 'smooth', block: 'start' });
            }, 100);
        }
    }
});

function preloadPlayerImages() {
    Object.values(playerBackgrounds).forEach(imageUrl => {
        if (imageUrl) {
            const img = new Image();
            img.src = imageUrl;
        }
    });
    const defaultImg = new Image();
    defaultImg.src = DEFAULT_BACKGROUND;
} 
window.playerBackgrounds = playerBackgrounds;
