import { normalizeProps, useMachine } from "@zag-js/react"
import { splitterControls } from "@zag-js/shared"
import * as splitter from "@zag-js/splitter"
import { useId } from "react"
import { StateVisualizer } from "../components/state-visualizer"
import { Toolbar } from "../components/toolbar"
import { useControls } from "../hooks/use-controls"

export default function Page() {
  const controls = useControls(splitterControls)

  const service = useMachine(splitter.machine, {
    id: useId(),
    panels: [
      { id: "a", collapsible: true, collapsedSize: 5, minSize: 10, maxSize: 20 },
      { id: "b", minSize: 50 },
    ],
    defaultSize: [15, 85],
    onCollapse: (details) => {
      console.log("onCollapse", details)
    },
    onExpand: (details) => {
      console.log("onExpand", details)
    },
  })

  const api = splitter.connect(service, normalizeProps)

  return (
    <>
      <main className="splitter">
        <div {...api.getRootProps()}>
          <div {...api.getPanelProps({ id: "a" })}>
            <p>A</p>
          </div>
          <div {...api.getResizeTriggerProps({ id: "a:b" })} />
          <div {...api.getPanelProps({ id: "b" })}>
            <p>B</p>
          </div>
        </div>
      </main>

      <Toolbar controls={controls.ui}>
        <StateVisualizer state={service} />
      </Toolbar>
    </>
  )
}
