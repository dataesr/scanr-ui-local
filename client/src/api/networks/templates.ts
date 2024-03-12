export default function graphGetTemplates(model: string) {
  // prettier-ignore
  const item_description = `<div class='description_heading'><a class='description_url' href={page}>{label}</a></div>`
  const link_description = `<div class='description_heading'>Co-${model} link</div><div class='description_label'>`
  const templates = {
    item_description: item_description,
    link_description: link_description,
  }

  return templates
}
