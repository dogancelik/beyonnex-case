type XYRect = { x: number; y: number };
type OffsetRect = { left: number; top: number };

// Calculate mouse coordinates relative to the slider element
export function calculateRelElementCoords(position: XYRect, sliderOffset: OffsetRect): XYRect {
    return {
        x: position.x - sliderOffset.left,
        y: position.y - sliderOffset.top,
    };
}

export function calculateDialCoords(radius: number, deg: number): [number, number] {
    return [
        Math.ceil((radius - 3) * Math.sin((deg * Math.PI) / 180)) + radius, // x
        Math.ceil((radius - 3) * -Math.cos((deg * Math.PI) / 180)) + radius, // y
    ];
}

export function calculateDegFromCoords(x: number, y: number, radius: number) {
    const atan = Math.atan2(x - radius, y - radius),
        deg = Math.ceil(-atan / (Math.PI / 180) + 180);
    return deg;
}
