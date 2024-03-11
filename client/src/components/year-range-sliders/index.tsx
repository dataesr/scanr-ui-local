import React, { useMemo } from "react";
import cn from "classnames";
import {
  useSliderThumb,
  useFocusRing,
  VisuallyHidden,
  mergeProps,
  useNumberFormatter,
  useSlider,
} from "react-aria";
import { useSliderState } from "react-stately";
import styles from "./styles.module.scss";

function Thumb(props) {
  const { state, trackRef, index, name } = props;
  const inputRef = React.useRef(null);
  const { thumbProps, inputProps, isDragging } = useSliderThumb(
    {
      index,
      trackRef,
      inputRef,
      name,
    },
    state
  );

  const { focusProps, isFocusVisible } = useFocusRing();
  return (
    <div
      {...thumbProps}
      className={cn(styles.thumb, {
        [styles.focus]: isFocusVisible,
        [styles.dragging]: isDragging,
      })}
      data-value={state.values[index]}
    >
      <VisuallyHidden>
        <input ref={inputRef} {...mergeProps(inputProps, focusProps)} />
      </VisuallyHidden>
    </div>
  );
}


export function RangeSlider({ color, data: counts, height = "80px", tooltipLabel, ...props }) {
  const trackRef = React.useRef(null);
  const [tooltip, setTooltip] = React.useState(null);

  const numberFormatter = useNumberFormatter(props.formatOptions);
  const state = useSliderState({ ...props, numberFormatter });
  const { groupProps, trackProps, labelProps, outputProps } = useSlider(
    props,
    state,
    trackRef
  );

  const { minValue, maxValue } = props;
  const range = maxValue - minValue;
  const rangeArray = useMemo(() => Array.from(
    { length: range + 1 }, (_, i) => (i + minValue)), [range, minValue]);

  const isUnselected = (year) =>
    year < state.values[0] || year > state.values[1];

  const _100 = Math.max(...counts);
  const data = counts?.map((count) => {
    return count * 100 / _100;
  })

  return (
    <div {...groupProps} className={cn(styles.slider, styles[`slider--${color}`])}>
      {data.length ? <div className={cn(styles.histogram)} style={{ height }}>
        {data.map((count, i) => (
          <div
            onMouseEnter={() => setTooltip(`tooltip-${i}`)}
            onMouseLeave={() => setTooltip(null)}
            className={cn(styles.histogram__wrap)}
            key={i}
            aria-describedby={`tooltip-${i}`}
          >
            <div
              className={cn(styles.histogram__bar, { [styles.unselected]: isUnselected(rangeArray?.[i]) })}
              style={{ height: `${count}%` }}
            >
              {tooltipLabel && (<span
                className={cn(styles.tooltip, { [`${styles['tooltip-visible']}`]: tooltip === `tooltip-${i}` })}
                id={`tooltip-${i}`}
                role="tooltip"
                aria-hidden={tooltip === `tooltip-${i}`}
              >
                {tooltipLabel && typeof tooltipLabel === 'function' ? tooltipLabel(counts[i], rangeArray[i]) : tooltipLabel}
              </span>)}
            </div>
          </div>
        ))}
      </div> : null}
      <div
        {...trackProps}
        ref={trackRef}
        className={cn(styles.track, { [styles.disabled]: state.isDisabled })}
      >
        <Thumb index={0} state={state} trackRef={trackRef} />
        <Thumb index={1} state={state} trackRef={trackRef} />
      </div>
      {props.label && (
        <div className={styles["label-container"]}>
          <label {...labelProps}>{props.label}</label>
          <output {...outputProps}>
            {`${state.getThumbValueLabel(0)} - ${state.getThumbValueLabel(1)}`}
          </output>
        </div>
      )}
    </div>
  );
}
