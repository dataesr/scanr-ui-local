export default function graphGetTemplates(model: string) {
  // prettier-ignore
  const link_description = `<div class='description_heading'>Co-${model} link</div><div class='description_label'><div class='description_text'>{strength} co-publications</div>`
  const templates = {
    link_description: link_description,
  }

  return templates
}
