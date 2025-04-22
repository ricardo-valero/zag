import * as datePicker from "@zag-js/date-picker"
import { normalizeProps, useMachine } from "@zag-js/solid"
import { datePickerControls } from "@zag-js/shared"
import { StateVisualizer } from "../components/state-visualizer"
import { Toolbar } from "../components/toolbar"
import { useControls } from "../hooks/use-controls"
import { Index, createMemo, createUniqueId } from "solid-js"

export default function Page() {
  const controls = useControls(datePickerControls)
  const service = useMachine(datePicker.machine, () => ({ id: createUniqueId(), ...controls.state() }))

  const api = createMemo(() => datePicker.connect(service, normalizeProps))
  const offset = createMemo(() => api().getOffset({ months: 1 }))

  return (
    <>
      <main class="date-picker">
        <div>
          <button>Outside Element</button>
        </div>
        <p>{`Visible range: ${api().visibleRangeText.formatted}`}</p>

        <output class="date-output">
          <div>Selected: {api().valueAsString ?? "-"}</div>
          <div>Focused: {api().focusedValueAsString}</div>
        </output>

        <div {...api().getControlProps()}>
          <input {...api().getInputProps()} />
          <button {...api().getClearTriggerProps()}>❌</button>
          <button {...api().getTriggerProps()}>🗓</button>
        </div>

        <div {...api().getPositionerProps()}>
          <div {...api().getContentProps()}>
            <div style={{ "margin-bottom": "20px" }}>
              <select {...api().getMonthSelectProps()}>
                <Index each={api().getMonths()}>
                  {(month, i) => (
                    <option value={i + 1} selected={api().focusedValue.month === i + 1}>
                      {month().label}
                    </option>
                  )}
                </Index>
              </select>

              <select {...api().getYearSelectProps()}>
                <Index each={api().getYears()}>
                  {(year, i) => (
                    <option value={i + 1} selected={api().focusedValue.year === i + 1}>
                      {year().label}
                    </option>
                  )}
                </Index>
              </select>
            </div>

            <div hidden={api().view !== "day"} style={{ width: "100%" }}>
              <div {...api().getViewControlProps({ view: "year" })}>
                <button {...api().getPrevTriggerProps()}>Prev</button>
                <button {...api().getViewTriggerProps()}>{api().visibleRangeText.start}</button>
                <button {...api().getNextTriggerProps()}>Next</button>
              </div>

              <div style={{ display: "flex", gap: "24px" }}>
                <table {...api().getTableProps({ id: createUniqueId() })}>
                  <thead {...api().getTableHeaderProps()}>
                    <tr {...api().getTableRowProps()}>
                      <Index each={api().weekDays}>
                        {(day) => (
                          <th scope="col" aria-label={day().long}>
                            {day().narrow}
                          </th>
                        )}
                      </Index>
                    </tr>
                  </thead>

                  <tbody {...api().getTableBodyProps()}>
                    <Index each={api().weeks}>
                      {(week) => (
                        <tr {...api().getTableRowProps()}>
                          <Index each={week()}>
                            {(value) => (
                              <td {...api().getDayTableCellProps({ value: value() })}>
                                <div {...api().getDayTableCellTriggerProps({ value: value() })}>{value().day}</div>
                              </td>
                            )}
                          </Index>
                        </tr>
                      )}
                    </Index>
                  </tbody>
                </table>
              </div>
            </div>

            <div style={{ display: "flex", gap: "40px", "margin-top": "24px" }}>
              <div hidden={api().view !== "month"} style={{ width: "100%" }}>
                <div {...api().getViewControlProps({ view: "year" })}>
                  <button {...api().getPrevTriggerProps({ view: "month" })}>Prev</button>
                  <button {...api().getViewTriggerProps({ view: "month" })}>{api().visibleRange.start.year}</button>
                  <button {...api().getNextTriggerProps({ view: "month" })}>Next</button>
                </div>

                <table {...api().getTableProps({ view: "month", columns: 4 })}>
                  <tbody {...api().getTableBodyProps({ view: "month" })}>
                    {api()
                      .getMonthsGrid({ columns: 4, format: "short" })
                      .map((months, row) => (
                        <tr key={row}>
                          {months.map((month, index) => (
                            <td key={index} {...api().getMonthTableCellProps({ ...month, columns: 4 })}>
                              <div {...api().getMonthTableCellTriggerProps({ ...month, columns: 4 })}>
                                {month.label}
                              </div>
                            </td>
                          ))}
                        </tr>
                      ))}
                  </tbody>
                </table>
              </div>

              <div hidden={api().view !== "year"} style={{ width: "100%" }}>
                <div {...api().getViewControlProps({ view: "year" })}>
                  <button {...api().getPrevTriggerProps({ view: "year" })}>Prev</button>
                  <span>
                    {api().getDecade().start} - {api().getDecade().end}
                  </span>
                  <button {...api().getNextTriggerProps({ view: "year" })}>Next</button>
                </div>

                <table {...api().getTableProps({ view: "year", columns: 4 })}>
                  <tbody {...api().getTableBodyProps({ view: "year" })}>
                    {api()
                      .getYearsGrid({ columns: 4 })
                      .map((years, row) => (
                        <tr key={row}>
                          {years.map((year, index) => (
                            <td key={index} {...api().getYearTableCellProps({ ...year, columns: 4 })}>
                              <div {...api().getYearTableCellTriggerProps({ ...year, columns: 4 })}>{year.label}</div>
                            </td>
                          ))}
                        </tr>
                      ))}
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        </div>
      </main>

      <Toolbar viz controls={controls}>
        <StateVisualizer state={service} omit={["weeks"]} />
      </Toolbar>
    </>
  )
}
