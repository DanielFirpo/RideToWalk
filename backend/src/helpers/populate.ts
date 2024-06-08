const { createCoreController } = require("@strapi/strapi").factories;

const fs = require("fs");
const path = require("path");

const components = path.join(__dirname, "../components/page-section-contents/");
const folderToIgnore = "interfaces";
let pageSectionComponents = [];

function readAndExtractAttributes(filePath) {
  try {
    const fileContent = fs.readFileSync(filePath, "utf8");
    const jsonData = JSON.parse(fileContent);

    if (jsonData.attributes) {
      console.log("pushing", jsonData.attributes);
      pageSectionComponents.push(jsonData.attributes);
    }
  } catch (err) {
    console.error(`Error reading or parsing file ${filePath}:`, err);
  }
}

// Read the directory synchronously
try {
  const files = fs.readdirSync(components);

  // Loop through all the files and folders
  files.forEach((file) => {
    const filePath = path.join(components, file);

    // Check if it's a file or folder
    const stat = fs.statSync(filePath);
    if (stat.isFile() && path.extname(file) === ".json") {
      // It's a JSON file, read and extract attributes
      readAndExtractAttributes(filePath);
    } else if (stat.isDirectory() && file === folderToIgnore) {
      // It's the folder to ignore, skip it
      return;
    }
  });
} catch (err) {
  console.log("Unable to scan directory: " + err);
}

function populateAttribute({ components }) {
  if (components) {
    const populate = components.reduce((currentValue, current) => {
      return {
        ...currentValue,
        [current.split(".").pop()]: { populate: "*" },
        ...populateComponentFields,
      };
    }, {});
    return { populate };
  }
  return { populate: "*" };
}

console.log("component fields:", pageSectionComponents);

let populateComponentFields = {};
pageSectionComponents.forEach((attributes) => {
  for (const key in attributes) {
    populateComponentFields[key] = { populate: "*" };
  }
});

console.log("POPULATING:", populateComponentFields);

const getPopulateFromSchema = function (schema) {
  return Object.keys(schema.attributes).reduce((currentValue, current) => {
    const attribute = schema.attributes[current];
    if (!["dynamiczone", "component"].includes(attribute.type)) {
      return currentValue;
    }
    return {
      ...currentValue,
      [current]: populateAttribute(attribute),
    };
  }, {});
};

function createPopulatedController(uid, schema) {
  return createCoreController(uid, () => {
    console.log(
      schema.collectionName,
      JSON.stringify(getPopulateFromSchema(schema))
    );
    return {
      async find(ctx) {
        ctx.query = {
          ...ctx.query,
          populate: getPopulateFromSchema(schema),
        };
        return await super.find(ctx);
      },
      async findOne(ctx) {
        ctx.query = {
          ...ctx.query,
          populate: getPopulateFromSchema(schema),
        };
        return await super.findOne(ctx);
      },
    };
  });
}

export default createPopulatedController;
