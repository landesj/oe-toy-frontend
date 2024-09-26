type Row = {
  companyId: string;
  companyName: string;
  imgUrl: string;
  finalUrl: string;
  headline: string;
  description: string;
  drugName: string;
};

/**
 * Represents a snapshot of a general key-value store mapping a category to the information
 * necessary to deliver ads.
 *
 * While the store itself can be considered arbitrary, I imagine a DynamoDb table in which
 * the category is the primary partition key and the company id is the sort key. This
 * enables the possibility of multiple companies "owning" a category.
 */
const CATEGORY_ITEMS: Record<string, Row> = {
  "Breast cancer": {
    companyId: "8adc14ac",
    companyName: "Genentech",
    imgUrl: "ads/GenentechAd.jpg",
    finalUrl: "https://www.gene.com/",
    headline: "Hope and Innovation for Breast Cancer",
    description:
      "Genentech's breakthrough treatment brings new possibilities to breast cancer patients.",
    drugName: "Herceptin",
  },
  "Multiple sclerosis": {
    companyId: "8adc14ac",
    companyName: "Genentech",
    imgUrl: "ads/GenentechAd.jpg",
    finalUrl: "https://www.gene.com/",
    headline: "Empower Mobility, Manage Multiple Sclerosis",
    description:
      "Transforming lives with effective treatments for managing multiple sclerosis symptoms.",
    drugName: "Ocrevus",
  },
  Covid: {
    companyId: "6107e28e",
    companyName: "Pfizer",
    imgUrl: "ads/PfizerAd.jpg",
    finalUrl: "https://www.pfizer.com/",
    headline: "Fighting COVID, Protecting Your Future",
    description:
      "Pfizer's COVID treatment delivers powerful protection for your health.",
    drugName: "Zepbound",
  },
  Pneumonia: {
    companyId: "6107e28e",
    companyName: "Pfizer",
    imgUrl: "ads/PfizerAd.jpg",
    finalUrl: "https://www.pfizer.com/",
    headline: "Shield Against Pneumonia with Pfizer",
    description:
      "Pfizer's solution helps protect you from pneumonia, ensuring healthier lungs.",
    drugName: "Prevnar",
  },
  "Weight loss": {
    companyId: "5d6cb2a6",
    companyName: "Eli Lilly",
    imgUrl: "ads/EliLilly.png",
    finalUrl: "https://www.lilly.com/",
    headline: "Transforming Weight Loss, Empowering Health",
    description:
      "Eli Lilly's innovative drug supports safe, effective weight management.",
    drugName: "Zepbound",
  },
  Arthritis: {
    companyId: "5d6cb2a6",
    companyName: "Eli Lilly",
    headline: "Relieve Arthritis Pain with Ease",
    imgUrl: "ads/EliLilly.png",
    finalUrl: "https://www.lilly.com/",
    description:
      "Targeted arthritis relief, improving mobility and reducing joint inflammation.",
    drugName: "Taltz",
  },
  Diabetes: {
    companyId: "5d6cb2a6",
    companyName: "Eli Lilly",
    headline: "Control Diabetes, Improve Your Life",
    imgUrl: "ads/EliLilly.png",
    finalUrl: "https://www.lilly.com/",
    description:
      "Advanced diabetes management for better blood sugar control and healthn.",
    drugName: "Humalog",
  },
  HIV: {
    companyId: "3f8b0c4b",
    companyName: "GSK",
    headline: "Advancing HIV Treatment, Enhancing Lives",
    imgUrl: "ads/gskAd.jpg",
    finalUrl: "https://www.gsk.com/",
    description:
      "GSK's breakthrough HIV drug offers powerful control and lasting hope.",
    drugName: "Apretude",
  },
};

export class AvertisingInfoDbClient {
  getCategory(categoryId: string): Row | undefined {
    if (categoryId in CATEGORY_ITEMS) return CATEGORY_ITEMS[categoryId];
  }
  removeCategory(category: string): void {}
  updateCategory(category: string, adInfo: Row): void {}
}
