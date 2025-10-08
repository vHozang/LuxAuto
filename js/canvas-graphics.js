// Canvas graphics functionality for interactive car visualization
// Implements HTML5 Canvas API with animations and user interactions

document.addEventListener('DOMContentLoaded', function() {
    initCanvasGraphics();
});

let canvas, ctx;
let animationId;
let isAnimating = false;
let carPosition = { x: 50, y: 200 };
let carSpeed = { x: 2, y: 0 };
let carColor = '#2c5aa0';
let backgroundElements = [];

function initCanvasGraphics() {
    canvas = document.getElementById('carCanvas');
    if (!canvas) return;

    ctx = canvas.getContext('2d');
    
    // Set canvas size
    resizeCanvas();
    
    // Initialize scene
    initBackground();
    drawScene();
    
    // Event listeners
    initCanvasEvents();
    
    // Handle window resize
    window.addEventListener('resize', debounce(resizeCanvas, 250));
}

function resizeCanvas() {
    if (!canvas) return;
    
    const container = canvas.parentElement;
    const containerWidth = container.clientWidth;
    const aspectRatio = 2; // 2:1 ratio
    
    canvas.width = Math.min(containerWidth, 800);
    canvas.height = canvas.width / aspectRatio;
    
    // Adjust car position based on new canvas size
    carPosition.x = Math.min(carPosition.x, canvas.width - 100);
    carPosition.y = canvas.height / 2;
    
    // Redraw scene
    if (!isAnimating) {
        drawScene();
    }
}

function initBackground() {
    backgroundElements = [];
    
    // Generate road elements
    for (let i = 0; i < 5; i++) {
        backgroundElements.push({
            type: 'roadLine',
            x: i * 160,
            y: canvas.height / 2 + 10,
            width: 80,
            height: 4
        });
    }
    
    // Generate trees
    for (let i = 0; i < 4; i++) {
        backgroundElements.push({
            type: 'tree',
            x: 100 + i * 200,
            y: canvas.height / 2 - 80,
            width: 20,
            height: 60
        });
    }
    
    // Generate clouds
    for (let i = 0; i < 3; i++) {
        backgroundElements.push({
            type: 'cloud',
            x: 150 + i * 250,
            y: 50 + Math.random() * 50,
            width: 60,
            height: 30
        });
    }
    
    // Generate buildings
    for (let i = 0; i < 3; i++) {
        backgroundElements.push({
            type: 'building',
            x: 200 + i * 180,
            y: canvas.height / 2 - 120,
            width: 80,
            height: 100
        });
    }
}

function initCanvasEvents() {
    const animateBtn = document.getElementById('animateBtn');
    const resetBtn = document.getElementById('resetBtn');
    
    if (animateBtn) {
        animateBtn.addEventListener('click', toggleAnimation);
    }
    
    if (resetBtn) {
        resetBtn.addEventListener('click', resetScene);
    }
    
    // Canvas interactions
    canvas.addEventListener('click', handleCanvasClick);
    canvas.addEventListener('mousemove', handleCanvasHover);
    
    // Keyboard controls
    document.addEventListener('keydown', handleKeyDown);
    
    // Touch support for mobile
    canvas.addEventListener('touchstart', handleTouchStart);
    canvas.addEventListener('touchmove', handleTouchMove);
}

function drawScene() {
    // Clear canvas
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    
    // Draw sky gradient
    drawSky();
    
    // Draw background elements
    drawBackground();
    
    // Draw road
    drawRoad();
    
    // Draw car
    drawCar();
    
    // Draw UI elements
    drawUI();
}

function drawSky() {
    const gradient = ctx.createLinearGradient(0, 0, 0, canvas.height / 2);
    gradient.addColorStop(0, '#87CEEB');
    gradient.addColorStop(1, '#98E4FF');
    
    ctx.fillStyle = gradient;
    ctx.fillRect(0, 0, canvas.width, canvas.height / 2);
}

function drawBackground() {
    backgroundElements.forEach(element => {
        switch (element.type) {
            case 'roadLine':
                drawRoadLine(element);
                break;
            case 'tree':
                drawTree(element);
                break;
            case 'cloud':
                drawCloud(element);
                break;
            case 'building':
                drawBuilding(element);
                break;
        }
    });
}

function drawRoadLine(line) {
    ctx.fillStyle = '#FFFF00';
    ctx.fillRect(line.x, line.y, line.width, line.height);
}

function drawTree(tree) {
    // Tree trunk
    ctx.fillStyle = '#8B4513';
    ctx.fillRect(tree.x + tree.width/2 - 3, tree.y + tree.height - 20, 6, 20);
    
    // Tree foliage
    ctx.fillStyle = '#228B22';
    ctx.beginPath();
    ctx.arc(tree.x + tree.width/2, tree.y + tree.height - 20, 15, 0, Math.PI * 2);
    ctx.fill();
}

function drawCloud(cloud) {
    ctx.fillStyle = '#FFFFFF';
    ctx.globalAlpha = 0.8;
    
    // Draw multiple circles to form a cloud
    ctx.beginPath();
    ctx.arc(cloud.x, cloud.y, 15, 0, Math.PI * 2);
    ctx.arc(cloud.x + 20, cloud.y, 20, 0, Math.PI * 2);
    ctx.arc(cloud.x + 40, cloud.y, 15, 0, Math.PI * 2);
    ctx.arc(cloud.x + 10, cloud.y - 10, 12, 0, Math.PI * 2);
    ctx.arc(cloud.x + 30, cloud.y - 10, 12, 0, Math.PI * 2);
    ctx.fill();
    
    ctx.globalAlpha = 1;
}

function drawBuilding(building) {
    // Building body
    ctx.fillStyle = '#696969';
    ctx.fillRect(building.x, building.y, building.width, building.height);
    
    // Building windows
    ctx.fillStyle = '#FFD700';
    for (let row = 0; row < 4; row++) {
        for (let col = 0; col < 3; col++) {
            const windowX = building.x + 10 + col * 20;
            const windowY = building.y + 20 + row * 20;
            ctx.fillRect(windowX, windowY, 8, 8);
        }
    }
    
    // Building roof
    ctx.fillStyle = '#8B0000';
    ctx.beginPath();
    ctx.moveTo(building.x - 5, building.y);
    ctx.lineTo(building.x + building.width/2, building.y - 15);
    ctx.lineTo(building.x + building.width + 5, building.y);
    ctx.closePath();
    ctx.fill();
}

function drawRoad() {
    // Road surface
    ctx.fillStyle = '#404040';
    ctx.fillRect(0, canvas.height / 2, canvas.width, canvas.height / 2);
    
    // Road edges
    ctx.fillStyle = '#FFFFFF';
    ctx.fillRect(0, canvas.height / 2 - 2, canvas.width, 2);
    ctx.fillRect(0, canvas.height - 2, canvas.width, 2);
}

function drawCar() {
    const carWidth = 100;
    const carHeight = 40;
    
    ctx.save();
    ctx.translate(carPosition.x + carWidth/2, carPosition.y + carHeight/2);
    
    // Car body
    ctx.fillStyle = carColor;
    ctx.fillRect(-carWidth/2, -carHeight/2, carWidth, carHeight);
    
    // Car roof
    ctx.fillStyle = '#1a365d';
    ctx.fillRect(-carWidth/2 + 15, -carHeight/2 - 15, carWidth - 30, 15);
    
    // Car windows
    ctx.fillStyle = '#87CEEB';
    ctx.fillRect(-carWidth/2 + 20, -carHeight/2 - 12, 25, 8);
    ctx.fillRect(-carWidth/2 + 55, -carHeight/2 - 12, 25, 8);
    
    // Car wheels
    ctx.fillStyle = '#000000';
    ctx.beginPath();
    ctx.arc(-carWidth/2 + 20, carHeight/2, 12, 0, Math.PI * 2);
    ctx.arc(-carWidth/2 + 80, carHeight/2, 12, 0, Math.PI * 2);
    ctx.fill();
    
    // Wheel rims
    ctx.fillStyle = '#C0C0C0';
    ctx.beginPath();
    ctx.arc(-carWidth/2 + 20, carHeight/2, 6, 0, Math.PI * 2);
    ctx.arc(-carWidth/2 + 80, carHeight/2, 6, 0, Math.PI * 2);
    ctx.fill();
    
    // Headlights
    ctx.fillStyle = '#FFFF99';
    ctx.fillRect(carWidth/2 - 5, -10, 5, 8);
    ctx.fillRect(carWidth/2 - 5, 2, 5, 8);
    
    // Car details
    if (isAnimating) {
        // Motion lines
        ctx.strokeStyle = 'rgba(44, 90, 160, 0.3)';
        ctx.lineWidth = 2;
        for (let i = 1; i <= 3; i++) {
            ctx.beginPath();
            ctx.moveTo(-carWidth/2 - i * 10, -5);
            ctx.lineTo(-carWidth/2 - i * 20, -5);
            ctx.moveTo(-carWidth/2 - i * 10, 5);
            ctx.lineTo(-carWidth/2 - i * 20, 5);
            ctx.stroke();
        }
    }
    
    ctx.restore();
}

function drawUI() {
    // Draw performance info
    ctx.fillStyle = 'rgba(0, 0, 0, 0.7)';
    ctx.fillRect(10, 10, 200, 80);
    
    ctx.fillStyle = '#FFFFFF';
    ctx.font = '14px Inter, sans-serif';
    ctx.fillText('LuxAuto Visualization', 20, 30);
    ctx.fillText(`Position: ${Math.round(carPosition.x)}, ${Math.round(carPosition.y)}`, 20, 50);
    ctx.fillText(`Animation: ${isAnimating ? 'Running' : 'Stopped'}`, 20, 70);
    
    // Draw controls hint
    if (!isAnimating) {
        ctx.fillStyle = 'rgba(44, 90, 160, 0.8)';
        ctx.fillRect(canvas.width - 250, canvas.height - 40, 240, 30);
        
        ctx.fillStyle = '#FFFFFF';
        ctx.font = '12px Inter, sans-serif';
        ctx.fillText('Click anywhere to move car | Arrow keys to drive', canvas.width - 240, canvas.height - 22);
    }
}

function toggleAnimation() {
    const animateBtn = document.getElementById('animateBtn');
    
    if (isAnimating) {
        stopAnimation();
        animateBtn.textContent = 'Animate Car';
    } else {
        startAnimation();
        animateBtn.textContent = 'Stop Animation';
    }
}

function startAnimation() {
    if (isAnimating) return;
    
    isAnimating = true;
    carSpeed.x = 3;
    animate();
}

function stopAnimation() {
    if (!isAnimating) return;
    
    isAnimating = false;
    carSpeed.x = 0;
    carSpeed.y = 0;
    
    if (animationId) {
        cancelAnimationFrame(animationId);
    }
}

function animate() {
    if (!isAnimating) return;
    
    // Update car position
    carPosition.x += carSpeed.x;
    carPosition.y += carSpeed.y;
    
    // Bounce off edges
    if (carPosition.x > canvas.width - 100) {
        carPosition.x = canvas.width - 100;
        carSpeed.x = -Math.abs(carSpeed.x);
    }
    
    if (carPosition.x < 0) {
        carPosition.x = 0;
        carSpeed.x = Math.abs(carSpeed.x);
    }
    
    // Animate background elements
    animateBackground();
    
    // Change car color periodically
    if (Math.random() < 0.01) {
        carColor = getRandomCarColor();
    }
    
    // Draw scene
    drawScene();
    
    // Continue animation
    animationId = requestAnimationFrame(animate);
}

function animateBackground() {
    // Move road lines
    backgroundElements.forEach(element => {
        if (element.type === 'roadLine') {
            element.x -= carSpeed.x * 0.5;
            if (element.x < -element.width) {
                element.x = canvas.width;
            }
        }
        
        // Move clouds slowly
        if (element.type === 'cloud') {
            element.x -= carSpeed.x * 0.1;
            if (element.x < -element.width) {
                element.x = canvas.width;
            }
        }
        
        // Move buildings and trees
        if (element.type === 'building' || element.type === 'tree') {
            element.x -= carSpeed.x * 0.3;
            if (element.x < -element.width) {
                element.x = canvas.width;
            }
        }
    });
}

function resetScene() {
    stopAnimation();
    
    carPosition.x = 50;
    carPosition.y = canvas.height / 2;
    carSpeed = { x: 0, y: 0 };
    carColor = '#2c5aa0';
    
    initBackground();
    drawScene();
    
    const animateBtn = document.getElementById('animateBtn');
    if (animateBtn) {
        animateBtn.textContent = 'Animate Car';
    }
}

function handleCanvasClick(event) {
    if (isAnimating) return;
    
    const rect = canvas.getBoundingClientRect();
    const x = event.clientX - rect.left;
    const y = event.clientY - rect.top;
    
    // Move car to clicked position
    moveTo(x - 50, y - 20);
}

function handleCanvasHover(event) {
    if (isAnimating) return;
    
    const rect = canvas.getBoundingClientRect();
    const x = event.clientX - rect.left;
    const y = event.clientY - rect.top;
    
    // Change cursor style
    canvas.style.cursor = 'pointer';
}

function handleKeyDown(event) {
    if (!canvas || isAnimating) return;
    
    const speed = 10;
    
    switch (event.key) {
        case 'ArrowLeft':
            event.preventDefault();
            moveTo(Math.max(0, carPosition.x - speed), carPosition.y);
            break;
        case 'ArrowRight':
            event.preventDefault();
            moveTo(Math.min(canvas.width - 100, carPosition.x + speed), carPosition.y);
            break;
        case 'ArrowUp':
            event.preventDefault();
            moveTo(carPosition.x, Math.max(canvas.height / 2 - 50, carPosition.y - speed));
            break;
        case 'ArrowDown':
            event.preventDefault();
            moveTo(carPosition.x, Math.min(canvas.height - 60, carPosition.y + speed));
            break;
        case ' ':
            event.preventDefault();
            toggleAnimation();
            break;
    }
}

function moveTo(x, y) {
    carPosition.x = x;
    carPosition.y = y;
    drawScene();
}

// Touch support
let touchStartX = 0;
let touchStartY = 0;

function handleTouchStart(event) {
    event.preventDefault();
    const touch = event.touches[0];
    const rect = canvas.getBoundingClientRect();
    touchStartX = touch.clientX - rect.left;
    touchStartY = touch.clientY - rect.top;
}

function handleTouchMove(event) {
    event.preventDefault();
    if (isAnimating) return;
    
    const touch = event.touches[0];
    const rect = canvas.getBoundingClientRect();
    const x = touch.clientX - rect.left;
    const y = touch.clientY - rect.top;
    
    moveTo(x - 50, y - 20);
}

function getRandomCarColor() {
    const colors = [
        '#2c5aa0', // Blue
        '#dc3545', // Red
        '#28a745', // Green
        '#ffc107', // Yellow
        '#6f42c1', // Purple
        '#fd7e14', // Orange
        '#20c997', // Teal
        '#e83e8c'  // Pink
    ];
    
    return colors[Math.floor(Math.random() * colors.length)];
}

// Utility function for debouncing
function debounce(func, wait) {
    let timeout;
    return function executedFunction(...args) {
        const later = () => {
            clearTimeout(timeout);
            func(...args);
        };
        clearTimeout(timeout);
        timeout = setTimeout(later, wait);
    };
}

// Add canvas-specific styles
const canvasStyles = document.createElement('style');
canvasStyles.textContent = `
    .graphics-section {
        background: linear-gradient(135deg, #f8f9fa 0%, #e9ecef 100%);
        position: relative;
        overflow: hidden;
    }

    .graphics-section::before {
        content: '';
        position: absolute;
        top: 0;
        left: 0;
        right: 0;
        bottom: 0;
        background: url('data:image/svg+xml,<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 100 100"><defs><pattern id="grid" width="10" height="10" patternUnits="userSpaceOnUse"><path d="M 10 0 L 0 0 0 10" fill="none" stroke="%23e1e5e9" stroke-width="0.5"/></pattern></defs><rect width="100" height="100" fill="url(%23grid)"/></svg>');
        opacity: 0.3;
    }

    .canvas-container {
        position: relative;
        z-index: 2;
    }

    #carCanvas {
        border: 3px solid #2c5aa0;
        border-radius: 16px;
        background: linear-gradient(180deg, #87CEEB 0%, #98E4FF 50%, #404040 50%, #404040 100%);
        box-shadow: 0 8px 30px rgba(0, 0, 0, 0.2);
        cursor: crosshair;
        transition: all 0.3s ease;
        display: block;
        margin: 0 auto;
    }

    #carCanvas:hover {
        box-shadow: 0 12px 40px rgba(0, 0, 0, 0.3);
        transform: translateY(-2px);
    }

    .canvas-controls {
        margin-top: 2rem;
        display: flex;
        gap: 1rem;
        justify-content: center;
        flex-wrap: wrap;
    }

    .canvas-controls .btn {
        min-width: 150px;
        font-weight: 600;
        text-transform: uppercase;
        letter-spacing: 0.5px;
    }

    @media (max-width: 768px) {
        #carCanvas {
            border-width: 2px;
            border-radius: 12px;
        }
        
        .canvas-controls {
            flex-direction: column;
            align-items: center;
        }
        
        .canvas-controls .btn {
            width: 200px;
        }
    }

    @media (max-width: 480px) {
        .canvas-container {
            padding: 0 1rem;
        }
        
        #carCanvas {
            max-width: calc(100vw - 2rem);
        }
    }
`;
document.head.appendChild(canvasStyles);

// Export functions for global access
window.toggleAnimation = toggleAnimation;
window.resetScene = resetScene;
