import { dataAttr, isDom } from "@zag-js/dom-query"
import type { NormalizeProps, PropTypes } from "@zag-js/types"
import { parts } from "./carousel.anatomy"
import { dom } from "./carousel.dom"
import type { IndicatorProps, ItemProps, ItemState, MachineApi, Send, State } from "./carousel.types"
import { getSlidesInView } from "./utils/get-slide-in-view"

export function connect<T extends PropTypes>(state: State, send: Send, normalize: NormalizeProps<T>): MachineApi<T> {
  const canScrollNext = state.context.canScrollNext
  const canScrollPrev = state.context.canScrollPrev
  const horizontal = state.context.isHorizontal
  const autoPlaying = state.matches("autoplay")

  const activeSnap = state.context.scrollSnaps[state.context.index]
  const slidesInView = isDom() ? getSlidesInView(state.context)(activeSnap) : []

  function getItemState(props: ItemProps): ItemState {
    const { index } = props
    return {
      valueText: `Slide ${index + 1}`,
      current: index === state.context.index,
      next: index === state.context.index + 1,
      previous: index === state.context.index - 1,
      inView: slidesInView.includes(index),
    }
  }

  return {
    index: state.context.index,
    scrollProgress: state.context.scrollProgress,
    autoPlaying,
    canScrollNext,
    canScrollPrev,
    scrollTo(index, jump) {
      send({ type: "GOTO", index, jump })
    },
    scrollToNext() {
      send("NEXT")
    },
    scrollToPrevious() {
      send("PREV")
    },
    getItemState: getItemState,
    play() {
      send("PLAY")
    },
    pause() {
      send("PAUSE")
    },

    getRootProps: () =>
      normalize.element({
        ...parts.root.attrs,
        id: dom.getRootId(state.context),
        role: "region",
        "aria-roledescription": "carousel",
        "data-orientation": state.context.orientation,
        dir: state.context.dir,
        "aria-label": "Carousel",
        style: {
          "--slide-spacing": state.context.spacing,
          "--slide-size": `calc(100% / ${state.context.slidesPerView} - var(--slide-spacing))`,
        },
      }),

    getViewportProps: () =>
      normalize.element({
        ...parts.viewport.attrs,
        dir: state.context.dir,
        id: dom.getViewportId(state.context),
        "data-orientation": state.context.orientation,
      }),

    getItemGroupProps: () =>
      normalize.element({
        ...parts.itemGroup.attrs,
        id: dom.getItemGroupId(state.context),
        "data-orientation": state.context.orientation,
        dir: state.context.dir,
        style: {
          display: "flex",
          flexDirection: horizontal ? "row" : "column",
          [horizontal ? "height" : "width"]: "auto",
          gap: "var(--slide-spacing)",
          transform: state.context.translateValue,
          transitionProperty: "transform",
          willChange: "transform",
          transitionTimingFunction: "cubic-bezier(0.4, 0, 0.2, 1)",
          transitionDuration: "0.3s",
        },
      }),

    getItemProps(props) {
      const { index } = props
      const sliderState = getItemState(props)

      return normalize.element({
        ...parts.item.attrs,
        id: dom.getItemId(state.context, index),
        dir: state.context.dir,
        "data-current": dataAttr(sliderState.current),
        "data-inview": dataAttr(sliderState.inView),
        role: "group",
        "aria-roledescription": "slide",
        "data-orientation": state.context.orientation,
        "aria-label": sliderState.valueText,
        style: {
          position: "relative",
          flex: "0 0 var(--slide-size)",
          [horizontal ? "minWidth" : "minHeight"]: "0px",
        },
      })
    },

    getPrevTriggerProps: () =>
      normalize.button({
        ...parts.prevTrigger.attrs,
        id: dom.getPrevTriggerId(state.context),
        type: "button",
        tabIndex: -1,
        disabled: !canScrollPrev,
        dir: state.context.dir,
        "aria-label": "Previous Slide",
        "data-orientation": state.context.orientation,
        "aria-controls": dom.getItemGroupId(state.context),
        onClick() {
          send("PREV")
        },
      }),

    getNextTriggerProps: () =>
      normalize.button({
        ...parts.nextTrigger.attrs,
        dir: state.context.dir,
        id: dom.getNextTriggerId(state.context),
        type: "button",
        tabIndex: -1,
        "aria-label": "Next Slide",
        "data-orientation": state.context.orientation,
        "aria-controls": dom.getItemGroupId(state.context),
        disabled: !canScrollNext,
        onClick() {
          send("NEXT")
        },
      }),

    getIndicatorGroupProps: () =>
      normalize.element({
        ...parts.indicatorGroup.attrs,
        dir: state.context.dir,
        id: dom.getIndicatorGroupId(state.context),
        "data-orientation": state.context.orientation,
      }),

    getIndicatorProps(props: IndicatorProps) {
      const { index, readOnly } = props
      return normalize.button({
        ...parts.indicator.attrs,
        dir: state.context.dir,
        id: dom.getIndicatorId(state.context, index),
        type: "button",
        "data-orientation": state.context.orientation,
        "data-index": index,
        "data-readonly": dataAttr(readOnly),
        "data-current": dataAttr(index === state.context.index),
        onClick() {
          if (readOnly) return
          send({ type: "GOTO", index })
        },
      })
    },
  }
}
