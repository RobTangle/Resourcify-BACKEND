import { Document, Types } from 'mongoose';
import { Source } from 'src/source/schema/source.schema';
import { User } from 'src/user/schema/user.schema';

export function parseResponseObj(
  userDocument: Document<unknown, any, User> &
    User & { _id: Types.ObjectId } & Required<{ _id: Types.ObjectId }>,
): {
  groupedDocs: {};
  sub: string;
  email: string;
  resources: Omit<
    import('mongoose').LeanDocument<Types.Subdocument<Types.ObjectId> & Source>,
    '$isSingleNested' | 'ownerDocument' | 'parent'
  >[];
  _id: Types.ObjectId;
} {
  const userLean = userDocument.toObject(); // #1
  const userResources = userLean.resources; // #2

  function groupByCategory(documentsArray: Source[]) {
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
    console.log('Total time for groupByCategory = ', finish - start);
    return categories;
  }
  const groupedDocs = groupByCategory(userResources); // #3
  return { ...userLean, groupedDocs }; // #4
}

// #1 This method returns a plain JavaScript object with only the document's data and no Mongoose-specific functionality.

// #2 Get the resources array so it can be used to group the documents by their category in the groupByCategory function.

// #3 Get an object with documents grouped in arrays by category keys

// #4 I return this object so the front-end has it easier at the moment of filtering and ordering the User Resources.
