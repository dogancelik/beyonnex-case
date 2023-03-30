export function toggleEventListeners(
    element: HTMLElement,
    eventsRecord: Record<string, EventListener>,
    addEvent: boolean
) {

    const method = addEvent ? 'addEventListener' : 'removeEventListener';
    Object.entries(eventsRecord).forEach(([events, listener]) => {
        events.split(' ').forEach(event => {
            element[method](event, listener);
        });
    });
}

export function pointerEvents(event: MouseEvent | TouchEvent) {
    const pos = { x: 0, y: 0 };

    if (
        event.type == "touchstart" ||
        event.type == "touchmove" ||
        event.type == "touchend" ||
        event.type == "touchcancel"
    ) {
        const touch = (event as TouchEvent).changedTouches[0];
        pos.x = touch.pageX;
        pos.y = touch.pageY;
    } else if (
        event.type == "mousedown" ||
        event.type == "mouseup" ||
        event.type == "mousemove" ||
        event.type == "mouseover" ||
        event.type == "mouseout" ||
        event.type == "mouseenter" ||
        event.type == "mouseleave"
    ) {
        pos.x = (event as MouseEvent).pageX;
        pos.y = (event as MouseEvent).pageY;
    }

    return pos;
}
