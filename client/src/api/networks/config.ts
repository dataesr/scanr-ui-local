import { NetworkConfig } from "../../types/network"
import { graphGetTerminology } from "./models"
import graphGetTemplates from "./templates"

export default function configCreate(model: string): NetworkConfig {
  const templates = graphGetTemplates(model)
  const terminology = graphGetTerminology(model)

  const config = {
    ...(templates && { templates: templates }),
    ...(terminology && { terminology: terminology }),
  }

  console.log("config", config)

  return config
}
