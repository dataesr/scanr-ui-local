import { useEffect, useState } from "react"
import { useIntl } from "react-intl"
import { TextInput } from "@dataesr/dsfr-plus"
import useOptions from "../../../hooks/useOptions"
import { NETWORK_PARAMETERS } from "../../../config/parameters"

export default function InputmaxComponents() {
  const intl = useIntl()
  const {
    parameters: { maxComponents },
    handleParameterChange,
  } = useOptions()
  const [input, setInput] = useState<number>(maxComponents)
  const defaultValues = NETWORK_PARAMETERS["maxComponents"]

  useEffect(() => {
    const timer = setTimeout(() => {
      input >= defaultValues.min && input <= defaultValues.max && handleParameterChange("maxComponents", input)
    }, 1000)

    return () => {
      clearTimeout(timer)
    }
  }, [input])

  return (
    <TextInput
      label={intl.formatMessage({ id: "networks.parameters.input-max-components.label" })}
      hint={intl.formatMessage({ id: "networks.parameters.input-max-components.hint" })}
      type="number"
      min={defaultValues.min}
      max={defaultValues.max}
      value={input}
      onChange={(event) => setInput(Number(event.target.value))}
    />
  )
}
