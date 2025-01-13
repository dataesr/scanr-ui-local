import { SimpleLinearRegression } from "ml-regression-simple-linear"

export const linearRegressionSlope = (values, years) => {
  const X = years?.map((year) => year - years[0])
  const y = years?.map((year) => values?.[year] || 0.0)
  const regression = new SimpleLinearRegression(X, y)
  const scores = regression.score(X, y)

  return { slope: regression?.slope, intercept: regression?.intercept, r2: scores.r2 }
}
