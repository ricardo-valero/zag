import * as select from "@zag-js/select"
import { selectControls, selectData } from "@zag-js/shared"
import { normalizeProps, useMachine } from "@zag-js/solid"
import serialize from "form-serialize"
import { Index, createMemo, createUniqueId } from "solid-js"
import { Portal } from "solid-js/web"
import { StateVisualizer } from "~/components/state-visualizer"
import { Toolbar } from "~/components/toolbar"
import { useControls } from "~/hooks/use-controls"

export default function Page() {
  const controls = useControls(selectControls)

  const service = useMachine(select.machine, () => ({
    ...controls.state(),
    id: createUniqueId(),
    collection: select.collection({ items: selectData }),
  }))

  const api = createMemo(() => select.connect(service, normalizeProps))

  return (
    <>
      <main class="select">
        <div {...api().getRootProps()}>
          {/* control */}
          <div {...api().getControlProps()}>
            <label {...api().getLabelProps()}>Label</label>
            <button {...api().getTriggerProps()}>
              {api().valueAsString || "Select option"}
              <span {...api().getIndicatorProps()}>▼</span>
            </button>
          </div>

          <form
            onInput={(e) => {
              const formData = serialize(e.currentTarget, { hash: true })
              console.log(formData)
            }}
          >
            {/* Hidden select */}
            <select {...api().getHiddenSelectProps()}>
              <Index each={selectData}>{(option) => <option value={option().value}>{option().label}</option>}</Index>
            </select>
          </form>

          {/* UI select */}
          <Portal>
            <div {...api().getPositionerProps()}>
              <ul {...api().getContentProps()}>
                <Index each={selectData}>
                  {(item) => (
                    <li {...api().getItemProps({ item: item() })}>
                      <span {...api().getItemTextProps({ item: item() })}>{item().label}</span>
                      <span {...api().getItemIndicatorProps({ item: item() })}>✓</span>
                    </li>
                  )}
                </Index>
              </ul>
            </div>
          </Portal>
        </div>
      </main>

      <Toolbar controls={controls}>
        <StateVisualizer state={service} omit={["collection"]} />
      </Toolbar>
    </>
  )
}
