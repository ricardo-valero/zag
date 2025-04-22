# UI Component State Machine Categories

I'll help you categorize these components and identify potential redundancies to develop better primitives.

## Category Organization

### 1. Selection Components

- **Simple Binary Selection**: Toggle, Switch
- **Multiple Selection**: Checkbox, Radio-group, Toggle-group
- **Complex Selection**: Select, Combobox, Listbox

### 2. Pickers (Specialized Selection + Popover)

- **Date/Time**: Date-picker, Time-picker
- **Color**: Color-picker

### 3. Input Components

- **Text/Number**: Number-input, Editable, Tags-input
- **Specialized Input**: Pin-input, Signature-pad, File-upload

### 4. Disclosure Components

- **Content Expansion**: Accordion, Collapsible, Splitter
- **Viewport Controlled**: Carousel, Tabs

### 5. Overlay Components

- **Contextual**: Tooltip, Popover, Hover-card, Menu
- **Modal**: Dialog, Tour
- **Notification**: Toast, Floating-panel

### 6. Navigation Components

- **Hierarchical**: Navigation-menu, Tree-view
- **Sequential**: Pagination, Steps

### 7. Feedback/Status Components

- **Progress Indicators**: Progress, Rating-group, Timer
- **State Indicators**: Presence, QR-code

## Redundancies

Several components share similar state machine logic:

1. **Navigation-menu vs Menu** - Both manage expandable options and selection
2. **Toggle vs Switch** - Both manage binary states
3. **Popover vs Hover-card** - Both overlay content triggered by user interaction
4. **Accordion vs Collapsible** - Both toggle content visibility (accordion is multiple collapsibles)

## Better Primitives

A better approach might be to define core state machines that can be composed:

### 1. Disclosure State

- **Properties**: open/closed, animated states
- **Used by**: Accordion, Collapsible, Dropdown, Dialog

### 2. Selection State

- **Properties**: selected items, single/multiple mode
- **Used by**: Checkbox, Radio, Select, Toggle

### 3. Overlay State

- **Properties**: trigger type, position, dismissal behavior
- **Used by**: Tooltip, Popover, Dialog, Menu

### 4. Input State

- **Properties**: value, validation, focus management
- **Used by**: All input components

### 5. Picker Primitive

```
Base Picker = Trigger + Overlay + Selection + Dismissal Logic
```

- **Time/Date/Color Picker** = Base Picker + Specialized Selection UI
- **Key behaviors**:
  - Opens overlay on trigger
  - Manages selection state
  - Automatically dismisses after selection (configurable)
  - Handles keyboard navigation

This approach would let you compose complex components from smaller state machine primitives, reducing redundancy while
maintaining flexibility.
