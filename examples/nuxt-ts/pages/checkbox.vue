<script setup lang="ts">
import * as checkbox from "@zag-js/checkbox"
import { checkboxControls } from "@zag-js/shared"
import { normalizeProps, useMachine } from "@zag-js/vue"
import serialize from "form-serialize"

const controls = useControls(checkboxControls)

const service = useMachine(
  checkbox.machine,
  controls.mergeProps<checkbox.Props>({
    name: "checkbox",
    id: useId(),
  }),
)

const api = computed(() => checkbox.connect(service, normalizeProps))
</script>

<template>
  <main class="checkbox">
    <form
      @change="
        (e) => {
          const result = serialize(e.currentTarget as HTMLFormElement, { hash: true })
          console.log(result)
        }
      "
    >
      <fieldset>
        <label v-bind="api.getRootProps()">
          <div v-bind="api.getControlProps()" />
          <span v-bind="api.getLabelProps()">Input {{ api.checked ? "Checked" : "Unchecked" }}</span>
          <input v-bind="api.getHiddenInputProps()" data-testid="hidden-input" />
          <div v-bind="api.getIndicatorProps()">Indicator</div>
        </label>

        <button type="button" :disabled="api.checked" @click="() => api.setChecked(true)">Check</button>
        <button type="button" :disabled="!api.checked" @click="() => api.setChecked(false)">Uncheck</button>
        <button type="reset">Reset Form</button>
      </fieldset>
    </form>
  </main>

  <Toolbar>
    <StateVisualizer :state="service" />
    <template #controls>
      <Controls :control="controls" />
    </template>
  </Toolbar>
</template>
