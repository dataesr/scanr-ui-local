import { projectsIndex, headers } from "../../../config/api"
import { Project } from "../../../types/project"

export async function getProjectById(id: string): Promise<Project> {
  const res = await fetch(`${projectsIndex}/_search?q=id:"${id}"`, { headers })
  const data = await res.json()
  const project = data?.hits?.hits?.[0]?._source
  if (!project) throw new Error('404')
  return { ...project, _id: data?.hits?.hits?.[0]._id } || {}
}
