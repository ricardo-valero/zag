<script lang="ts" generics="T">
  import type { UseControlsReturn } from "$lib/use-controls.svelte"
  const props: UseControlsReturn<T> & { path?: string } = $props()
  import Self from "./controls.svelte"
</script>

<div class="controls-container">
  {#each Object.keys(props.config) as [keyof T] as k}
    {@const key = k.toString()}
    {@const config = props.config[k]}
    {@const path = props.path ? `${props.path}.${key}` : key}
    {#if config}
      {#if !("type" in config)}
        <div>
          <span>{key}</span>
          <Self {...props} {config} {path} />
        </div>
      {:else}
        {@const { type, defaultValue } = config}
        {#if type === "boolean"}
          <div class="checkbox">
            <input
              data-testid={path}
              id={path}
              type="checkbox"
              checked={defaultValue}
              oninput={(e) => {
                props.setContext(path, e.currentTarget.checked)
              }}
            />
            <label for={path}>{key}</label>
          </div>
        {:else if type === "string"}
          <div class="text">
            <label for={path} style="margin-right:10px;">{key}</label>
            <input
              data-testid={path}
              id={path}
              type="text"
              placeholder={key}
              value={defaultValue}
              onkeydown={(event) => {
                if (event.key === "Enter") {
                  props.setContext(path, event.currentTarget.value)
                }
              }}
            />
          </div>
        {:else if type === "select"}
          <div class="text">
            <label for={path} style="margin-right:10px;">
              {key}
            </label>
            <select
              data-testid={path}
              id={path}
              value={defaultValue}
              onchange={(e) => {
                props.setContext(path, (e.target as HTMLInputElement).value)
              }}
            >
              <option>-----</option>
              {#each config.options as option}
                <option value={option}>
                  {option}
                </option>
              {/each}
            </select>
          </div>
        {:else if type === "number"}
          <div class="text">
            <label for={path} style="margin-right:10px;">
              {key}
            </label>
            <input
              data-testid={path}
              id={path}
              type="number"
              value={defaultValue}
              onkeydown={(e) => {
                if (e.key === "Enter") {
                  const val = parseFloat((e.target as HTMLInputElement).value)
                  props.setContext(path, isNaN(val) ? 0 : val)
                }
              }}
            />
          </div>
        {/if}
      {/if}
    {/if}
  {/each}
</div>
