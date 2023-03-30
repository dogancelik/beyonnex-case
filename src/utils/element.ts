export function offset(element: HTMLElement): { top: number; left: number } {
    const rect = element.getBoundingClientRect();
    return {
        top: rect.top + window.pageYOffset, // or + window.scrollY,
        left: rect.left + window.pageXOffset, // or + window.scrollX,
    };
}
