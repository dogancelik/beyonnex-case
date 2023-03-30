import { useCallback, useEffect, useRef, useState } from "react";
import classNames from "classnames";
import { pointerEvents, toggleEventListeners } from "@/utils/event";
import { offset } from "@/utils/element";
import { calculateRelElementCoords, calculateDegFromCoords, calculateDialCoords } from "@/utils/math";
import { HeaterTemperatureProps } from "./props";
import style from "./style.module.scss";

function TemperatureSlider({
  temperature: initialTemperature,
  minTemperature,
  maxTemperature,
  onChange,
}: HeaterTemperatureProps) {
  const [temperature, setTemperature] = useState(initialTemperature);
  const sliderEl = useRef<HTMLDivElement>(null);
  const canSlide = useRef(false);
  const lastPosition = useRef(0);
  const prevDeg = useRef(0);

  const rangeSliderInit = useCallback(() => {
    canSlide.current = true;
  }, []);

  const rangeSliderStop = useCallback(() => {
    canSlide.current = false;
  }, []);

  const rangeSliderUpdate = useCallback((e: MouseEvent | TouchEvent) => {
    if (!canSlide.current || maxTemperature == 0 || !sliderEl.current) return;

    const dial = sliderEl.current.querySelector(".dial")! as HTMLDivElement;
    const sliderOffset = offset(sliderEl.current);

    const position = pointerEvents(e),
      coords = calculateRelElementCoords(position, sliderOffset),
      radius = sliderEl.current.clientWidth / 2;
    let deg = calculateDegFromCoords(coords.x, coords.y, radius);

    if (prevDeg.current <= 1 && lastPosition.current - position.x >= 0) deg = 0;
    if (prevDeg.current >= 359 && lastPosition.current - position.x <= 0)
      deg = 360;

    const [x, y] = calculateDialCoords(radius, deg);
    const newTemperature = Math.ceil((deg * maxTemperature) / 360);
    dial.style.transform = `translate(${x}px, ${y}px)`;

    const rightBlocker = sliderEl.current.querySelector(".right .blocker")! as HTMLDivElement,
      leftBlocker = sliderEl.current.querySelector(".left .blocker")! as HTMLDivElement;

    if (deg <= 180) {
      rightBlocker.style.transform = `rotate(${deg}deg)`;
      leftBlocker.style.transform = "rotate(0)";
    } else {
      rightBlocker.style.transform = "rotate(180deg";
      leftBlocker.style.transform = `rotate(${deg - 180}deg)`;
    }

    setTemperature(newTemperature);
    onChange(newTemperature);
    prevDeg.current = deg;
    lastPosition.current = position.x;
  }, []);

  useEffect(() => {
    if (!sliderEl.current) return;
    const eventsRecord = {
      "mousedown touchstart": rangeSliderInit,
      "mousemove touchmove": rangeSliderUpdate as any,
      "mouseup touchend": rangeSliderStop,
    };
    toggleEventListeners(sliderEl.current, eventsRecord, true);
    return () => {
      if (!sliderEl.current) return;
      toggleEventListeners(sliderEl.current, eventsRecord, false);
    };
  }, []);

  return (
    <div className={style.range} ref={sliderEl}>
      <div className={style.range}>
        <input
          type="range"
          name="temperature"
          min={minTemperature}
          max={maxTemperature}
          value=""
          className={style.count}
        />
        <div className={classNames(style.slice, style.left, "left")}>
          <div className={classNames(style.blocker, "blocker")}></div>
        </div>
        <div className={classNames(style.slice, style.right, "right")}>
          <div className={classNames(style.blocker, "blocker")}></div>
        </div>
        <span className={style.info}></span>
        <span className={style.text}>
          <span className={style.count}>{temperature}</span>
          &#8451;
        </span>
        <div className={classNames(style.dial, "dial")} tabIndex={0}></div>
      </div>
    </div>
  );
}

export default TemperatureSlider;
