import { type Props as AccordionProps } from "@zag-js/accordion"
import { type Props as AngleSliderProps } from "@zag-js/angle-slider"
import { type Props as CarouselProps } from "@zag-js/carousel"
import { type Props as CheckboxProps } from "@zag-js/checkbox"
import { type Props as ClipboardProps } from "@zag-js/clipboard"
import { type Props as CollapsibleProps } from "@zag-js/collapsible"
import { type Props as ColorPickerProps } from "@zag-js/color-picker"
import { type Props as ComboboxProps } from "@zag-js/combobox"
import { type Props as DatePickerProps } from "@zag-js/date-picker"
import { type Props as EditableProps } from "@zag-js/editable"
import { type Props as FileUploadProps } from "@zag-js/file-upload"
import { type Props as FloatingPanelProps } from "@zag-js/floating-panel"
import { type Props as HoverCardProps } from "@zag-js/hover-card"
import { type Props as ListboxProps } from "@zag-js/listbox"
import { type Props as MenuProps } from "@zag-js/menu"
import { type Props as NavigationMenuProps } from "@zag-js/navigation-menu"
import { type Props as NumberInputProps } from "@zag-js/number-input"
import { type Props as PaginationProps } from "@zag-js/pagination"
import { type Props as PinInputProps } from "@zag-js/pin-input"
import { type Props as PopoverProps } from "@zag-js/popover"
import { type Props as ProgressProps } from "@zag-js/progress"
import { type Props as QrCodeProps } from "@zag-js/qr-code"
import { type Props as RadioGroupProps } from "@zag-js/radio-group"
import { type Props as RatingGroupProps } from "@zag-js/rating-group"
import { type Props as SelectProps } from "@zag-js/select"
import { type Props as SignaturePadProps } from "@zag-js/signature-pad"
import { type Props as SliderProps } from "@zag-js/slider"
import { type Props as SplitterProps } from "@zag-js/splitter"
import { type Props as StepsProps } from "@zag-js/steps"
import { type Props as SwitchProps } from "@zag-js/switch"
import { type Props as TabsProps } from "@zag-js/tabs"
import { type Props as TagsInputProps } from "@zag-js/tags-input"
import { type Props as TimePickerProps } from "@zag-js/time-picker"
import { type Props as ToastProps } from "@zag-js/toast"
import { type Props as ToggleGroupProps } from "@zag-js/toggle-group"
import { type Props as TourProps } from "@zag-js/tour"
import { type Props as TreeViewProps } from "@zag-js/tree-view"

import { defineControls } from "./define-controls"

export const accordionControls = defineControls<AccordionProps>({
  collapsible: { type: "boolean", defaultValue: false },
  multiple: { type: "boolean", defaultValue: false },
  orientation: { type: "select", options: ["horizontal", "vertical"], defaultValue: "vertical" },
})

export const checkboxControls = defineControls<CheckboxProps>({
  name: { type: "string", defaultValue: "checkbox" },
  disabled: { type: "boolean", defaultValue: false },
  value: { type: "string", defaultValue: "on" },
  readOnly: { type: "boolean", defaultValue: false },
})

export const collapsibleControls = defineControls<CollapsibleProps>({
  disabled: { type: "boolean", defaultValue: false },
  dir: { type: "select", options: ["ltr", "rtl"], defaultValue: "ltr" },
})

export const switchControls = defineControls<SwitchProps>({
  disabled: { type: "boolean", defaultValue: false },
  readOnly: { type: "boolean", defaultValue: false },
})

export const comboboxControls = defineControls<ComboboxProps>({
  inputBehavior: {
    type: "select",
    defaultValue: "autohighlight",
    options: ["autohighlight", "autocomplete", "none"],
  },
  selectionBehavior: {
    type: "select",
    defaultValue: "replace",
    options: ["replace", "clear", "preserve"],
  },
  disabled: { type: "boolean", defaultValue: false },
  multiple: { type: "boolean", defaultValue: false },
  loopFocus: { type: "boolean", defaultValue: true },
  openOnClick: { type: "boolean", defaultValue: false },
})

export const editableControls = defineControls<EditableProps>({
  readOnly: { type: "boolean", defaultValue: false },
  disabled: { type: "boolean", defaultValue: false },
  autoResize: { type: "boolean", defaultValue: false },
  maxLength: { type: "number", defaultValue: 1000 },
  submitMode: {
    type: "select",
    options: ["enter", "blur", "both", "none"],
    defaultValue: "both",
  },
  activationMode: {
    type: "select",
    options: ["focus", "dblclick", "click"],
    defaultValue: "focus",
  },
})

export const menuControls = defineControls<MenuProps>({
  closeOnSelect: { type: "boolean", defaultValue: true },
  loopFocus: { type: "boolean", defaultValue: false },
})

export const hoverCardControls = defineControls<HoverCardProps>({
  openDelay: { type: "number", defaultValue: 700 },
  closeDelay: { type: "number", defaultValue: 300 },
})

export const numberInputControls = defineControls<NumberInputProps>({
  disabled: { type: "boolean", defaultValue: false },
  clampValueOnBlur: { type: "boolean", defaultValue: true },
  allowMouseWheel: { type: "boolean", defaultValue: false },
  spinOnPress: { type: "boolean", defaultValue: true },
  step: { type: "number", defaultValue: 1 },
  min: { type: "number", defaultValue: 0 },
  max: { type: "number", defaultValue: 100 },
  locale: {
    type: "select",
    options: ["en-US", "en-GB", "fr-FR", "de-DE", "ja-JP", "mk-MK", "zh-CN"] as const,
  },
  formatOptions: {
    maximumFractionDigits: { type: "number" },
    minimumFractionDigits: { type: "number" },
    style: {
      type: "select",
      options: ["decimal", "currency", "percent"],
    },
    currency: {
      type: "select",
      defaultValue: "USD",
      options: ["USD", "EUR", "JPY", "GBP", "MXN", "CNY"],
    },
  },
})

export const pinInputControls = defineControls<PinInputProps>({
  mask: { type: "boolean", defaultValue: false },
  otp: { type: "boolean", defaultValue: false },
  blurOnComplete: { type: "boolean", defaultValue: false },
  type: { type: "select", options: ["numeric", "alphanumeric", "alphabetic"], defaultValue: "numeric" },
})

export const popoverControls = defineControls<PopoverProps>({
  modal: { type: "boolean", defaultValue: false },
  portalled: { type: "boolean", defaultValue: true },
  autoFocus: { type: "boolean", defaultValue: true },
  closeOnEscape: { type: "boolean", defaultValue: true },
})

export const radioControls = defineControls<RadioGroupProps>({
  disabled: { type: "boolean", defaultValue: false },
  readOnly: { type: "boolean", defaultValue: false },
})

export const sliderControls = defineControls<SliderProps>({
  disabled: { type: "boolean", defaultValue: false },
  readOnly: { type: "boolean", defaultValue: false },
  orientation: { type: "select", options: ["horizontal", "vertical"], defaultValue: "horizontal" },
  thumbAlignment: { type: "select", options: ["contain", "center"], defaultValue: "contain" },
  dir: { type: "select", options: ["ltr", "rtl"], defaultValue: "ltr" },
  origin: { type: "select", options: ["center", "start", "end"], defaultValue: "start" },
  min: { type: "number", defaultValue: 0 },
  max: { type: "number", defaultValue: 100 },
  step: { type: "number", defaultValue: 1 },
})

export const tabsControls = defineControls<TabsProps>({
  activationMode: { type: "select", options: ["manual", "automatic"], defaultValue: "automatic" },
  deselectable: { type: "boolean", defaultValue: false },
  loopFocus: { type: "boolean", defaultValue: true },
  dir: { type: "select", options: ["ltr", "rtl"], defaultValue: "ltr" },
  orientation: { type: "select", options: ["vertical", "horizontal"], defaultValue: "horizontal" },
})

export const paginationControls = defineControls<PaginationProps>({
  pageSize: { type: "number", defaultValue: 10 },
  siblingCount: { type: "number", defaultValue: 1 },
})

export const tagsInputControls = defineControls<TagsInputProps>({
  disabled: { type: "boolean", defaultValue: false },
  readOnly: { type: "boolean", defaultValue: false },
  addOnPaste: { type: "boolean", defaultValue: false },
  blurBehavior: { type: "select", options: ["add", "clear"] },
  max: { type: "number", defaultValue: 6 },
  allowOverflow: { type: "boolean", defaultValue: false },
  dir: { type: "select", options: ["ltr", "rtl"], defaultValue: "ltr" },
})

export const ratingControls = defineControls<RatingGroupProps>({
  disabled: { type: "boolean", defaultValue: false },
  readOnly: { type: "boolean", defaultValue: false },
  allowHalf: { type: "boolean", defaultValue: true },
  count: { type: "number", defaultValue: 5 },
  dir: { type: "select", options: ["ltr", "rtl"], defaultValue: "ltr" },
})

export const splitterControls = defineControls<SplitterProps>({
  dir: { type: "select", options: ["ltr", "rtl"], defaultValue: "ltr" },
  orientation: { type: "select", options: ["vertical", "horizontal"], defaultValue: "horizontal" },
})

export const toastControls = defineControls<ToastProps<unknown>>({
  dir: { type: "select", options: ["ltr", "rtl"], defaultValue: "ltr" },
})

export const selectControls = defineControls<SelectProps>({
  multiple: { type: "boolean", defaultValue: false },
  disabled: { type: "boolean", defaultValue: false },
  loopFocus: { type: "boolean", defaultValue: true },
  readOnly: { type: "boolean", defaultValue: false },
  deselectable: { type: "boolean", defaultValue: false },
  closeOnSelect: { type: "boolean", defaultValue: true },
  dir: { type: "select", options: ["ltr", "rtl"], defaultValue: "ltr" },
})

export const listboxControls = defineControls<ListboxProps<unknown>>({
  selectionMode: {
    type: "select",
    options: ["none", "single", "multiple", "extended"],
    defaultValue: "single",
  },
  deselectable: { type: "boolean", defaultValue: true },
  disabled: { type: "boolean", defaultValue: false },
  loopFocus: { type: "boolean", defaultValue: false },
})

export const datePickerControls = defineControls<DatePickerProps>({
  readOnly: { type: "boolean", defaultValue: false },
  disabled: { type: "boolean", defaultValue: false },
  dir: { type: "select", options: ["ltr", "rtl"], defaultValue: "ltr" },
  startOfWeek: { type: "number", defaultValue: 0 },
  fixedWeeks: { type: "boolean", defaultValue: false },
  locale: {
    type: "select",
    options: ["en-US", "en-GB", "fr-FR", "de-DE", "ja-JP", "mk-MK", "zh-CN"] as const,
    defaultValue: "en-US",
  },
  selectionMode: { type: "select", options: ["single", "multiple", "range"], defaultValue: "range" },
})

export const transitionControls = defineControls({
  duration: { type: "number", defaultValue: 200 },
  easing: {
    type: "select",
    options: ["linear", "ease", "ease-in", "ease-out", "ease-in-out"],
    defaultValue: "ease",
  },
})

export const carouselControls = defineControls<CarouselProps>({
  orientation: { type: "select", options: ["horizontal", "vertical"], defaultValue: "horizontal" },
  slidesPerPage: { type: "number", defaultValue: 2 },
  loop: { type: "boolean", defaultValue: false },
  spacing: { type: "string", defaultValue: "20px" },
  allowMouseDrag: { type: "boolean", defaultValue: true },
})

export const colorPickerControls = defineControls<ColorPickerProps>({
  disabled: { type: "boolean", defaultValue: false },
  readOnly: { type: "boolean", defaultValue: false },
  dir: { type: "select", options: ["ltr", "rtl"], defaultValue: "ltr" },
  defaultFormat: { type: "select", options: ["hsba", "hsla", "rgba"], defaultValue: "hsla" },
  format: { type: "select", options: ["hsba", "hsla", "rgba"], defaultValue: "hsla" },
})

export const fileUploadControls = defineControls<FileUploadProps>({
  accept: {
    type: "select",
    options: ["application/*", "application/pdf", "image/*", "video/*"],
    defaultValue: "application/*",
  },
  maxFiles: { type: "number", defaultValue: 1 },
  disabled: { type: "boolean", defaultValue: false },
  allowDrop: { type: "boolean", defaultValue: true },
})

export const toggleGroupControls = defineControls<ToggleGroupProps>({
  disabled: { type: "boolean", defaultValue: false },
  loopFocus: { type: "boolean", defaultValue: true },
  multiple: { type: "boolean", defaultValue: false },
  rovingFocus: { type: "boolean", defaultValue: true },
})

export const progressControls = defineControls<ProgressProps>({
  dir: { type: "select", options: ["ltr", "rtl"], defaultValue: "ltr" },
})

export const treeviewControls = defineControls<TreeViewProps>({
  dir: { type: "select", options: ["ltr", "rtl"], defaultValue: "ltr" },
  selectionMode: { type: "select", options: ["single", "multiple"], defaultValue: "single" },
  openOnClick: { type: "boolean", defaultValue: true },
})

export const clipboardControls = defineControls<ClipboardProps>({
  timeout: { type: "number", defaultValue: 3000 },
})

export const tourControls = defineControls<TourProps>({
  keyboardNavigation: { type: "boolean", defaultValue: true },
  closeOnEscape: { type: "boolean", defaultValue: true },
  closeOnInteractOutside: { type: "boolean", defaultValue: true },
  preventInteraction: { type: "boolean", defaultValue: true },
})

export const floatingPanelControls = defineControls<FloatingPanelProps>({
  disabled: { type: "boolean", defaultValue: false },
  resizable: { type: "boolean", defaultValue: true },
  draggable: { type: "boolean", defaultValue: true },
  lockAspectRatio: { type: "boolean", defaultValue: false },
  closeOnEscape: { type: "boolean", defaultValue: true },
  persistRect: { type: "boolean", defaultValue: false },
})

export const signaturePadControls = defineControls<SignaturePadProps>({
  disabled: { type: "boolean", defaultValue: false },
  readOnly: { type: "boolean", defaultValue: false },
  drawing: {
    size: { type: "number", defaultValue: 4 },
    simulatePressure: { type: "boolean", defaultValue: true },
    fill: { type: "string", defaultValue: "red" },
  },
})

export const timePickerControls = defineControls<TimePickerProps>({
  locale: {
    type: "select",
    options: ["en-US", "en-GB", "fr-FR", "de-DE", "ja-JP", "mk-MK", "zh-CN"] as const,
    defaultValue: "en-US",
  },
  allowSeconds: { type: "boolean", defaultValue: false },
  disabled: { type: "boolean", defaultValue: false },
  readOnly: { type: "boolean", defaultValue: false },
})

export const qrCodeControls = defineControls<QrCodeProps>({
  value: { type: "string", defaultValue: "https://chakra-ui.com/" },
  encoding: {
    ecc: { type: "select", options: ["L", "M", "Q", "H"], defaultValue: "H" },
    boostEcc: { type: "boolean", defaultValue: false },
  },
})

export const stepsControls = defineControls<StepsProps>({
  linear: { type: "boolean", defaultValue: false },
  orientation: { type: "select", options: ["horizontal", "vertical"], defaultValue: "horizontal" },
})

export const angleSliderControls = defineControls<AngleSliderProps>({
  disabled: { type: "boolean", defaultValue: false },
  readOnly: { type: "boolean", defaultValue: false },
  step: { type: "number", defaultValue: 1 },
})

export const navigationMenuControls = defineControls<NavigationMenuProps>({
  dir: { type: "select", options: ["ltr", "rtl"], defaultValue: "ltr" },
  openDelay: { type: "number", defaultValue: 200 },
  closeDelay: { type: "number", defaultValue: 300 },
})
