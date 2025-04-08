import { normalizeProps, useMachine } from "@zag-js/react"
import * as toggle from "@zag-js/toggle-group"
import { useId } from "react"
import { RxFontBold, RxFontItalic, RxUnderline } from "react-icons/rx"

export function ToggleGroup(props: Omit<toggle.Props, "id">) {
  const service = useMachine(toggle.machine, {
    id: useId(),
    ...props,
  })

  const api = toggle.connect(service, normalizeProps)

  return (
    <div>
      <div {...api.getRootProps()}>
        <button {...api.getItemProps({ value: "bold" })}>
          <RxFontBold />
        </button>
        <button {...api.getItemProps({ value: "italic" })}>
          <RxFontItalic />
        </button>
        <button {...api.getItemProps({ value: "underline" })}>
          <RxUnderline />
        </button>
      </div>
    </div>
  )
}
