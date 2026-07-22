import { forwardRef, useState } from "react"

import { cn } from "@/lib/utils"

// A native <input type="file"> is one atomic clickable control — the
// browser makes the whole thing (button + filename text + blank space)
// open the file picker, and CSS on ::file-selector-button can't carve out
// a smaller click target. So the input is hidden (not removed — still a
// real, accessible file input) and a separate <label> drives it instead;
// only that label is clickable.
const FileInput = forwardRef(function FileInput(
  { id, className, onChange, multiple, buttonLabel, ...props },
  ref
) {
  const [fileNames, setFileNames] = useState([])

  function handleChange(event) {
    setFileNames(Array.from(event.target.files ?? []).map((file) => file.name))
    onChange?.(event)
  }

  return (
    <div className={cn("flex items-center gap-3", className)}>
      <label
        htmlFor={id}
        className="inline-flex h-8 shrink-0 cursor-pointer items-center rounded-lg bg-primary px-3 text-sm font-medium text-primary-foreground transition-colors hover:bg-primary-hover"
      >
        {buttonLabel ?? (multiple ? "choose files" : "choose file")}
      </label>
      <input
        id={id}
        ref={ref}
        type="file"
        multiple={multiple}
        className="sr-only"
        onChange={handleChange}
        {...props}
      />
      <span className="truncate text-sm text-muted-foreground">
        {fileNames.length ? fileNames.join(", ") : "no file chosen"}
      </span>
    </div>
  )
})

export { FileInput }
