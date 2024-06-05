import * as colorPicker from "@zag-js/color-picker"
import { colorPickerControls } from "@zag-js/shared"
import { normalizeProps, useMachine } from "@zag-js/solid"
import serialize from "form-serialize"
import { Index, Show, createMemo, createUniqueId } from "solid-js"
import { StateVisualizer } from "~/components/state-visualizer"
import { Toolbar } from "~/components/toolbar"
import { useControls } from "~/hooks/use-controls"

const presets = ["#f47373", "#697689"]

const EyeDropIcon = () => (
  <svg
    stroke="currentColor"
    fill="currentColor"
    stroke-width="0"
    viewBox="0 0 24 24"
    height="1em"
    width="1em"
    xmlns="http://www.w3.org/2000/svg"
  >
    <path d="m4 15.76-1 4A1 1 0 0 0 3.75 21a1 1 0 0 0 .49 0l4-1a1 1 0 0 0 .47-.26L17 11.41l1.29 1.3 1.42-1.42-1.3-1.29L21 7.41a2 2 0 0 0 0-2.82L19.41 3a2 2 0 0 0-2.82 0L14 5.59l-1.3-1.3-1.42 1.42L12.58 7l-8.29 8.29a1 1 0 0 0-.29.47zm1.87.75L14 8.42 15.58 10l-8.09 8.1-2.12.53z"></path>
  </svg>
)

export default function Page() {
  const controls = useControls(colorPickerControls)

  const [state, send] = useMachine(
    colorPicker.machine({
      id: createUniqueId(),
      name: "color",
      format: "hsla",
      value: colorPicker.parse("hsl(0, 100%, 50%)"),
    }),
    {
      context: controls.context,
    },
  )

  const api = createMemo(() => colorPicker.connect(state, send, normalizeProps))

  return (
    <>
      <main class="color-picker">
        <form
          onChange={(e) => {
            console.log("change:", serialize(e.currentTarget, { hash: true }))
          }}
        >
          <input {...api().getHiddenInputProps()} />
          <div {...api().getRootProps()}>
            <label {...api().getLabelProps()}>
              Select Color: <span data-testid="value-text">{api().valueAsString}</span>
            </label>

            <div {...api().getControlProps()}>
              <button {...api().getTriggerProps()}>
                <div {...api().getTransparencyGridProps({ size: "10px" })} />
                <div {...api().getSwatchProps({ value: api().value })} />
              </button>
              <input {...api().getChannelInputProps({ channel: "hex" })} />
              <input {...api().getChannelInputProps({ channel: "alpha" })} />
            </div>

            <div {...api().getPositionerProps()}>
              <div {...api().getContentProps()}>
                <div class="content__inner">
                  <div {...api().getAreaProps()}>
                    <div {...api().getAreaBackgroundProps()} />
                    <div {...api().getAreaThumbProps()} />
                  </div>

                  <div {...api().getChannelSliderProps({ channel: "hue" })}>
                    <div {...api().getChannelSliderTrackProps({ channel: "hue" })} />
                    <div {...api().getChannelSliderThumbProps({ channel: "hue" })} />
                  </div>

                  <div {...api().getChannelSliderProps({ channel: "alpha" })}>
                    <div {...api().getTransparencyGridProps({ size: "12px" })} />
                    <div {...api().getChannelSliderTrackProps({ channel: "alpha" })} />
                    <div {...api().getChannelSliderThumbProps({ channel: "alpha" })} />
                  </div>

                  <Show when={api().format.startsWith("hsl")}>
                    <div style={{ display: "flex", width: "100%" }}>
                      <span>H</span> <input {...api().getChannelInputProps({ channel: "hue" })} />
                      <span>S</span> <input {...api().getChannelInputProps({ channel: "saturation" })} />
                      <span>L</span> <input {...api().getChannelInputProps({ channel: "lightness" })} />
                      <span>A</span> <input {...api().getChannelInputProps({ channel: "alpha" })} />
                    </div>
                  </Show>

                  <Show when={api().format.startsWith("rgb")}>
                    <div style={{ display: "flex", width: "100%" }}>
                      <span>R</span> <input {...api().getChannelInputProps({ channel: "red" })} />
                      <span>G</span> <input {...api().getChannelInputProps({ channel: "green" })} />
                      <span>B</span> <input {...api().getChannelInputProps({ channel: "blue" })} />
                      <span>A</span> <input {...api().getChannelInputProps({ channel: "alpha" })} />
                    </div>
                  </Show>

                  <Show when={api().format.startsWith("hsb")}>
                    <div style={{ display: "flex", width: "100%" }}>
                      <span>H</span> <input {...api().getChannelInputProps({ channel: "hue" })} />
                      <span>S</span> <input {...api().getChannelInputProps({ channel: "saturation" })} />
                      <span>B</span> <input {...api().getChannelInputProps({ channel: "brightness" })} />
                      <span>A</span> <input {...api().getChannelInputProps({ channel: "alpha" })} />
                    </div>
                  </Show>

                  <div style={{ display: "flex", gap: "10px", "align-items": "center" }}>
                    <div style={{ position: "relative" }}>
                      <div {...api().getTransparencyGridProps({ size: "4px" })} />
                      <div {...api().getSwatchProps({ value: api().value })} />
                    </div>
                    <p data-testid="value-text">{api().valueAsString}</p>
                  </div>

                  <input {...api().getChannelInputProps({ channel: "hex" })} />

                  <div {...api().getSwatchGroupProps()} style={{ display: "flex", gap: "10px" }}>
                    <Index each={presets}>
                      {(preset) => (
                        <button {...api().getSwatchTriggerProps({ value: preset() })}>
                          <div style={{ position: "relative" }}>
                            <div {...api().getTransparencyGridProps({ size: "4px" })} />
                            <div {...api().getSwatchProps({ value: preset() })} />
                          </div>
                        </button>
                      )}
                    </Index>
                  </div>

                  <button {...api().getEyeDropperTriggerProps()}>
                    <EyeDropIcon />
                  </button>
                </div>
              </div>
            </div>
          </div>
          <button type="submit">Submit</button>
          <button type="reset">Reset</button>
        </form>
      </main>

      <Toolbar viz controls={controls.ui}>
        <StateVisualizer state={state} />
      </Toolbar>
    </>
  )
}
