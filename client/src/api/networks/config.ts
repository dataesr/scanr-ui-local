import { graphGetTerminology } from "./models"
import graphGetTemplates from "./templates"
// import graphGetColorSchemes from "./colors"

export default function createConfig(clusters: any, model: string) {
  const templates = graphGetTemplates(model)
  const terminology = graphGetTerminology(model)
  // const color_schemes = graphGetColorSchemes(clusters)

  const config = {
    templates: templates,
    ...(terminology && { terminology: terminology }),
    // ...(color_schemes && { color_schemes: color_schemes }),
  }

  console.log("config", config)

  return config
}
