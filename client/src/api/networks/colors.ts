import iwanthue from "iwanthue"

export default function graphGetColorSchemes(clusters: any) {
  console.log("clusters", clusters)

  const palette = iwanthue(clusters.length, {
    attempts: 100,
    clustering: "force-vector",
    colorSpace: "default",
    quality: 50,
    seed: 42,
  })

  console.log("palette", palette)

  const color_schemes = {
    cluster_colors: clusters.map(({ cluster }, index) => ({ cluster: cluster, color: palette[index] })),
  }

  console.log("color_schemes", color_schemes)
  return color_schemes
}
