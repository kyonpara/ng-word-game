import React from 'react'
import Chip from '@material-ui/core/Chip'
import Autocomplete from '@material-ui/lab/Autocomplete'
import TextField from '@material-ui/core/TextField'

export default function TagField({
  options,
  defaultValue,
  disabled,
  onTagChange,
  label,
  placeholder,
}) {
  return (
    <Autocomplete
      disabled={disabled}
      multiple
      id="tags-filled"
      options={options}
      freeSolo
      defaultValue={defaultValue}
      onChange={(event, values) => {
        onTagChange(values)
      }}
      renderTags={(value, getTagProps) =>
        value.map((option, index) => (
          <Chip variant="outlined" label={option} {...getTagProps({ index })} />
        ))
      }
      renderInput={params => {
        return (
          <div style={{ width: '300px', marginBottom: '30px' }}>
            <TextField
              {...params}
              variant="outlined"
              label={label}
              placeholder={placeholder}
            />
          </div>
        )
      }}
    />
  )
}
