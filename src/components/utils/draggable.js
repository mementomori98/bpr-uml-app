export function draggable(node) {
    // setup
    let x;
    let y;
    function handleMouseDown(e) {
        if (e.button !== 0)
            return;
        [x, y] = [e.clientX, e.clientY];
        node.dispatchEvent(new CustomEvent('panstart', {
            detail: { x, y }
        }));
        window.addEventListener('mousemove', handleMouseMove);
        window.addEventListener('mouseup', handleMouseUp);
    }
    function handleMouseMove(e) {
        const [dx, dy] = [e.clientX - x, e.clientY - y];
        node.dispatchEvent(new CustomEvent('panmove', {
            detail: { x, y, dx, dy }
        }));
    }
    function handleMouseUp(e) {
        if (e.button !== 0)
            return;
        const [dx, dy] = [e.clientX - x, e.clientY - y];
        node.dispatchEvent(new CustomEvent('panend', {
            detail: { x, y, dx, dy }
        }));
        window.removeEventListener('mousemove', handleMouseMove);
        window.removeEventListener('mouseup', handleMouseUp);
    }
    node.addEventListener('mousedown', handleMouseDown);
    return {
        destroy() {
            node.removeEventListener('mousedown', handleMouseDown);
        }
    };
}
//# sourceMappingURL=draggable.js.map