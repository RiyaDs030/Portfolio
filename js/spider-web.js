document.addEventListener('DOMContentLoaded', () => {
    const spiderWeb = document.querySelector('.spider-web');
    const nodes = document.querySelectorAll('.spider-web-node');
    const lines = document.querySelectorAll('.spider-web-line');
    
    // Add mouse move effect
    document.addEventListener('mousemove', (e) => {
        const { clientX, clientY } = e;
        const centerX = window.innerWidth / 2;
        const centerY = window.innerHeight / 2;
        
        // Calculate distance from center
        const deltaX = (clientX - centerX) / centerX;
        const deltaY = (clientY - centerY) / centerY;
        
        // Apply subtle movement to the spider web
        spiderWeb.style.transform = `rotate(${deltaX * 5}deg) scale(${1 + Math.abs(deltaY) * 0.1})`;
    });
    
    // Add hover effects to nodes
    nodes.forEach(node => {
        node.addEventListener('mouseenter', () => {
            node.style.transform = 'scale(1.5)';
            node.style.background = 'var(--accent-color)';
            node.style.boxShadow = '0 0 25px var(--accent-color)';
            
            // Create ripple effect
            const ripple = document.createElement('div');
            ripple.className = 'ripple';
            node.appendChild(ripple);
            
            setTimeout(() => ripple.remove(), 1000);
        });
        
        node.addEventListener('mouseleave', () => {
            node.style.transform = 'scale(1)';
            node.style.background = 'var(--primary-color)';
            node.style.boxShadow = '0 0 15px var(--primary-color)';
        });
    });
    
    // Add hover effects to lines
    lines.forEach(line => {
        line.addEventListener('mouseenter', () => {
            line.style.height = '3px';
            line.style.background = 'var(--gradient-2)';
            line.style.boxShadow = '0 0 15px var(--accent-color)';
        });
        
        line.addEventListener('mouseleave', () => {
            line.style.height = '2px';
            line.style.background = 'linear-gradient(90deg, var(--primary-color), var(--secondary-color))';
            line.style.boxShadow = '0 0 5px var(--primary-color)';
        });
    });
    
    // Add dynamic line creation
    function createLine(startNode, endNode) {
        const line = document.createElement('div');
        line.className = 'spider-web-line';
        
        const startRect = startNode.getBoundingClientRect();
        const endRect = endNode.getBoundingClientRect();
        
        const startX = startRect.left + startRect.width / 2;
        const startY = startRect.top + startRect.height / 2;
        const endX = endRect.left + endRect.width / 2;
        const endY = endRect.top + endRect.height / 2;
        
        const length = Math.sqrt(Math.pow(endX - startX, 2) + Math.pow(endY - startY, 2));
        const angle = Math.atan2(endY - startY, endX - startX) * 180 / Math.PI;
        
        line.style.width = `${length}px`;
        line.style.left = `${startX}px`;
        line.style.top = `${startY}px`;
        line.style.transform = `rotate(${angle}deg)`;
        
        spiderWeb.appendChild(line);
    }
    
    // Create additional lines between nodes
    nodes.forEach((node, index) => {
        for (let i = index + 1; i < nodes.length; i++) {
            createLine(node, nodes[i]);
        }
    });
}); 