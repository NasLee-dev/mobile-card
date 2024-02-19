import React, {
  FocusEventHandler,
  forwardRef,
  InputHTMLAttributes,
  useState,
} from 'react'
import Input from './Input'
import Text from './Text'

interface TextFieldProps extends InputHTMLAttributes<HTMLInputElement> {
  label?: React.ReactNode
  hasError?: boolean
  helpMessage?: React.ReactNode
}

const TextField = forwardRef<HTMLInputElement, TextFieldProps>(
  function TextField(
    { label, hasError, helpMessage, onFocus, onBlur, ...props },
    ref,
  ) {
    const [focused, setFocused] = useState(false)
    //  TODO: 포커스처리
    const labelColor = hasError ? 'red' : focused ? 'blue' : undefined

    const handleFocus: FocusEventHandler<HTMLInputElement> = (event) => {
      setFocused(true)
      onFocus?.(event)
    }
    const handleBlur: FocusEventHandler<HTMLInputElement> = (event) => {
      setFocused(false)
      onBlur?.(event)
    }
    return (
      <div>
        {label ? (
          <Text
            typography="t7"
            color={labelColor}
            display="inline-block"
            style={{
              marginBottom: 6,
            }}
          >
            {label}
          </Text>
        ) : null}
        <Input
          ref={ref}
          aria-invalid={hasError}
          onFocus={handleFocus}
          onBlur={handleBlur}
          {...props}
        />
        {helpMessage ? (
          <Text
            typography="t7"
            color={labelColor}
            display="inline-block"
            style={{
              marginTop: 6,
              fontSize: 12,
            }}
          >
            {helpMessage}
          </Text>
        ) : null}
      </div>
    )
  },
)

export default TextField
