import { LeanDocument, Document } from 'mongoose';
import { Source } from 'src/source/schema/source.schema';

export function groupByCategory(
  documentsArray: LeanDocument<Source>[] | Document<Source>[],
) {
  let start = Date.now();
  const categories = {};
  documentsArray.forEach((doc) => {
    const category = doc.category;
    if (!categories[category]) {
      categories[category] = [];
    }
    categories[category].push(doc);
  });
  let finish = Date.now();
  console.log(start);
  console.log(finish);
  console.log('Total time for groupByCategory = ', finish - start); // #1
  return categories;
}

// #1 The average time for this function to run with an array of aprox 10 elements is 0ms.
