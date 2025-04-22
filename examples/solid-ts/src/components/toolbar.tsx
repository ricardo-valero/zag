import { dataAttr } from "@zag-js/dom-query"
import { createSignal, JSX, Show } from "solid-js"
import { UseControlsReturn } from "~/hooks/use-controls"
import { Controls } from "./controls"

export function Toolbar<T extends object>(props: {
  controls?: UseControlsReturn<T> | null
  children?: JSX.Element
  viz?: boolean
}) {
  const [active, setActive] = createSignal(props.viz ? 1 : !props.controls ? 1 : 0)

  return (
    <div class="toolbar">
      <nav>
        <Show when={props.controls}>
          <button data-active={dataAttr(active() === 0)} onClick={() => setActive(0)}>
            Controls
          </button>
        </Show>
        <button data-active={dataAttr(active() === 1)} onClick={() => setActive(1)}>
          Visualizer
        </button>
      </nav>
      <div>
        <Show when={props.controls}>
          {(controls) => (
            <div data-content data-active={dataAttr(active() === 0)}>
              <Controls store={controls()} />
            </div>
          )}
        </Show>
        <div data-content data-active={dataAttr(active() === 1)}>
          {props.children}
        </div>
      </div>
    </div>
  )
}
