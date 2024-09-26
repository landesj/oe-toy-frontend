export const CATEGORIES = [
  "Covid",
  "Blood thinning",
  "Pneumonia",
  "Diabetes",
  "Weight loss",
  "Arthritis",
  "Breast cancer",
  "Multiple sclerosis",
  "Lymphona",
  "HIV",
  "RSV",
  "Shingles",
  "Pancreatic cancer",
];

/**
 * A very naive method for determining the category of a given question. The intention
 * here is simply to provide an interface for this procedur, allowing it to be developed
 * well in isolation.
 */
export const determineCategory = (question: string) => {
  const foundCategory = CATEGORIES.find((value) =>
    question.toLowerCase().includes(value.toLowerCase())
  );
  if (!foundCategory) return undefined;
  return foundCategory;
};
