export type SalesByDate = {
  dateRanges: {
    range1: { start: string; end: string };
    range2: { start: string; end: string };
  };

  previous: ValueSales;
  results: ValueSales;
};

export type ValueSales = {
  grossProfit: number;
  grossProfitMargin: number;
  grossProfitMarkup: number;
  itemsSold: number;
  orders: number;
  salesValueGross: number;
  salesValueNet: number;
};
