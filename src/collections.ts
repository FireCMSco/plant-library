import {buildCollection, buildProperty} from "firecms";
import {Plant} from "./models";

export const adminCollection = buildCollection({
  path: "admins",
  name: "Admins",
  customId: true,
  group: "Library",
  permissions: ({
                  entity,
                  user,
                  authController,
                }) => {
    const isAdmin = authController.extra?.roles.includes("admin") ?? false;
    return ({
      edit: isAdmin,
      create: isAdmin,
      delete: isAdmin
    });
  },
  properties: {
    name: {dataType: "string", name: "Name", validation: {required: true}}
  }
});

export const plantsCollection = buildCollection<Plant>({
  name: "Plants",
  group: "Library",
  singularName: "Plant",
  path: "plants",
  permissions: ({
                  entity,
                  user,
                  authController,
                }) => {
    const isAdmin = authController.extra?.roles.includes("admin") ?? false;
    return ({
      edit: isAdmin,
      create: isAdmin,
      delete: isAdmin
    });
  },
  properties: {
    name: {
      name: "Name",
      validation: { required: true },
      dataType: "string"
    },
    scientific_name: {
      name: "Scientific Name",
      validation: { required: false },
      dataType: "string"
    },
    other_names: {
      name: "Other Names",
      validation: { required: false },
      dataType: "array",
      of: {
        dataType: "string"
      }
    },
    sunlight: {
      name: "Sunlight",
      validation: { required: true },
      dataType: "string",
      description: "Sunlight required by the plant",
      enumValues: {
        bright_direct: "Bright direct sunlight",
        bright_indirect: "Bright indirect sunlight",
        shade: "Shade",
        dark: "Dark"
      }
    },
    watering: {
      name: "Watering",
      validation: { required: true },
      dataType: "string",
      description: "Hidratation required by the plant",
      enumValues: {
        daily: "Daily",
        twice_a_week: "Twice a week",
        weekly: "Weekly",
        monthly: "Monthly",
        rarely: "Rarely"
      }
    },
    extra_care: {
      name: "Extra Care",
      description: "Extra care required by the plant",
      validation: { required: false },
      dataType: "string"
    },
    geographic_origin: {
      name: "geographic_origin",
      description: "Where the plant is from",
      dataType: "string",
    },
    curiosities: {
      name: "Curiosities",
      description: "Curiosities about the plant",
      dataType: "string",
      multiline: true
    },
    picture: buildProperty({ // The `buildProperty` method is a utility function used for type checking
      name: "Picture",
      dataType: "string",
      storage: {
        storagePath: "images",
        acceptedFiles: ["image/*"]
      }
    }),
  }
});