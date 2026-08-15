import validator from "./index";

const mealPlanSchema = {
  userId: { type: "string", optional: true, nullable: true },
  packageId: { type: "string", optional: true, nullable: true },
  title: {
    type: "string",
    empty: false,
    min: 2,
    messages: {
      stringEmpty: "عنوان برنامه نباید خالی باشد.",
      stringMin: "عنوان برنامه باید حداقل ۲ کاراکتر باشد.",
      string: "عنوان برنامه باید متن باشد.",
    },
  },
  description: { type: "string", optional: true, nullable: true },
  isActive: { type: "boolean", optional: true },
  breakfast: {
    type: "array",
    optional: true,
    items: {
      type: "object",
      props: {
        foodId: { type: "string", empty: false },
        quantity: { type: "number", positive: true },
        unit: { type: "string", optional: true, nullable: true },
      },
    },
  },
  lunch: {
    type: "array",
    optional: true,
    items: {
      type: "object",
      props: {
        foodId: { type: "string", empty: false },
        quantity: { type: "number", positive: true },
        unit: { type: "string", optional: true, nullable: true },
      },
    },
  },
  dinner: {
    type: "array",
    optional: true,
    items: {
      type: "object",
      props: {
        foodId: { type: "string", empty: false },
        quantity: { type: "number", positive: true },
        unit: { type: "string", optional: true, nullable: true },
      },
    },
  },
  snack: {
    type: "array",
    optional: true,
    items: {
      type: "object",
      props: {
        foodId: { type: "string", empty: false },
        quantity: { type: "number", positive: true },
        unit: { type: "string", optional: true, nullable: true },
      },
    },
  },
};

const mealPlanUpdateSchema = {
  ...mealPlanSchema,
  title: {
    type: "string",
    empty: false,
    min: 2,
    optional: true,
    messages: {
      stringEmpty: "عنوان برنامه نباید خالی باشد.",
      stringMin: "عنوان برنامه باید حداقل ۲ کاراکتر باشد.",
      string: "عنوان برنامه باید متن باشد.",
    },
  },
  packageId: { type: "string", optional: true, nullable: true },
};

export const validateMealPlan = validator.compile(mealPlanSchema);
export const validateMealPlanUpdate = validator.compile(mealPlanUpdateSchema);

