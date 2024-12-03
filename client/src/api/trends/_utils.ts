import { SimpleLinearRegression } from "ml-regression-simple-linear"
import { YEARS } from "."

export const linearRegressionSlope = (values) => {
  const X = YEARS
  const y = YEARS?.map((year) => values?.[year] || 0.0)
  const regression = new SimpleLinearRegression(X, y)

  return { slope: regression?.slope, intercept: regression?.intercept }
}
