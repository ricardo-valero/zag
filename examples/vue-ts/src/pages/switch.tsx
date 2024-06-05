import * as zagSwitch from "@zag-js/switch"
import { normalizeProps, useMachine } from "@zag-js/vue"
import { computed, defineComponent, h } from "vue"
import { switchControls } from "@zag-js/shared"
import { StateVisualizer } from "../components/state-visualizer"
import { Toolbar } from "../components/toolbar"
import { useControls } from "../hooks/use-controls"

export default defineComponent({
  name: "Switch",
  setup() {
    const controls = useControls(switchControls)

    const [state, send] = useMachine(
      zagSwitch.machine({
        name: "switch",
        id: "1",
      }),
      {
        context: controls.context,
      },
    )

    const apiRef = computed(() => zagSwitch.connect(state.value, send, normalizeProps))

    return () => {
      const api = apiRef.value

      return (
        <>
          <main class="switch">
            <label {...api.getRootProps()}>
              <input {...api.getHiddenInputProps()} />
              <span {...api.getControlProps()}>
                <span {...api.getThumbProps()} />
              </span>
              <span {...api.getLabelProps()}>Feature is {api.checked ? "enabled" : "disabled"}</span>
            </label>
          </main>

          <Toolbar controls={controls.ui}>
            <StateVisualizer state={state} />
          </Toolbar>
        </>
      )
    }
  },
})
