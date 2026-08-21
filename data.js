// Weekly plan data: 2 gym days / 2 home days, tailored for 5kg dumbbells,
// resistance bands, and a bench at home, plus full gym access on Mon/Thu.

const ICONS = {
  legs: "legs",
  back: "back",
  chest: "chest",
  shoulders: "shoulders",
  core: "core",
  glutes: "glutes",
  cardio: "cardio",
  rest: "rest",
};

function ytSearch(query) {
  return "https://www.youtube.com/results?search_query=" + encodeURIComponent(query + " proper form tutorial");
}

const WEEK_PLAN = [
  {
    day: "Monday",
    short: "Mon",
    location: "Gym",
    focus: "Lower Body & Heavy Compound",
    theme: "gym",
    items: [
      {
        id: "mon-1",
        name: "Leg Press or Barbell Squats",
        setsReps: "3 sets x 10 reps",
        category: ICONS.legs,
        cue: "Feet hip-width, drive through heels, knees track over toes.",
        video: ytSearch("barbell squat"),
      },
      {
        id: "mon-2",
        name: "Cable Rows",
        setsReps: "3 sets x 12 reps",
        category: ICONS.back,
        cue: "Squeeze shoulder blades together, keep spine neutral.",
        video: ytSearch("seated cable row"),
      },
      {
        id: "mon-3",
        name: "Cable Woodchoppers",
        setsReps: "3 sets x 12 reps per side",
        category: ICONS.core,
        cue: "Rotate from the hips and core, not just the arms.",
        video: ytSearch("cable woodchopper"),
      },
    ],
  },
  {
    day: "Tuesday",
    short: "Tue",
    location: "Home",
    focus: "Upper Body & Core",
    theme: "home",
    items: [
      {
        id: "tue-1",
        name: "Dumbbell Chest Press on Bench",
        setsReps: "3 sets x 12 reps",
        category: ICONS.chest,
        cue: "Lower slowly (3 sec), press up without locking elbows hard.",
        video: ytSearch("dumbbell bench press"),
      },
      {
        id: "tue-2",
        name: "Banded Pulldowns",
        setsReps: "3 sets x 15 reps",
        category: ICONS.back,
        cue: "Anchor band overhead, pull elbows down and back.",
        video: ytSearch("resistance band lat pulldown"),
      },
      {
        id: "tue-3",
        name: "Forearm Plank",
        setsReps: "3 sets, hold 45 seconds",
        category: ICONS.core,
        cue: "Straight line from head to heels, brace your core.",
        video: ytSearch("forearm plank"),
      },
    ],
  },
  {
    day: "Wednesday",
    short: "Wed",
    location: "Recovery",
    focus: "Active Recovery",
    theme: "recovery",
    items: [
      {
        id: "wed-1",
        name: "Brisk Walk or Gentle Stretching",
        setsReps: "30-45 minutes",
        category: ICONS.cardio,
        cue: "Keep it easy and conversational to lower cortisol, not to train.",
        video: ytSearch("full body stretching routine"),
      },
    ],
  },
  {
    day: "Thursday",
    short: "Thu",
    location: "Gym",
    focus: "Full Body & Machine Strength",
    theme: "gym",
    items: [
      {
        id: "thu-1",
        name: "Lat Pulldowns",
        setsReps: "3 sets x 10 reps",
        category: ICONS.back,
        cue: "Pull to upper chest, avoid leaning back excessively.",
        video: ytSearch("lat pulldown machine"),
      },
      {
        id: "thu-2",
        name: "Dumbbell Step-Ups",
        setsReps: "3 sets x 10 reps per leg",
        category: ICONS.legs,
        cue: "Drive through the front heel, control the step down.",
        video: ytSearch("dumbbell step ups"),
      },
      {
        id: "thu-3",
        name: "Machine Shoulder Press",
        setsReps: "3 sets x 12 reps",
        category: ICONS.shoulders,
        cue: "Press straight up, keep ribs down and core braced.",
        video: ytSearch("machine shoulder press"),
      },
    ],
  },
  {
    day: "Friday",
    short: "Fri",
    location: "Home",
    focus: "Lower Body & Burnout",
    theme: "home",
    items: [
      {
        id: "fri-1",
        name: "5kg Dumbbell Goblet Squats",
        setsReps: "3 sets x 15 reps",
        category: ICONS.legs,
        cue: "Hold dumbbell at chest, sit hips back and down.",
        video: ytSearch("goblet squat"),
      },
      {
        id: "fri-2",
        name: "Banded Monster Walks",
        setsReps: "3 sets x 15 steps per direction",
        category: ICONS.glutes,
        cue: "Band above knees, stay low, small controlled steps.",
        video: ytSearch("banded monster walk"),
      },
      {
        id: "fri-3",
        name: "Dead Bugs",
        setsReps: "3 sets x 12 reps per side",
        category: ICONS.core,
        cue: "Keep lower back pressed to the floor throughout.",
        video: ytSearch("dead bug exercise"),
      },
    ],
  },
  {
    day: "Saturday",
    short: "Sat",
    location: "Cardio",
    focus: "Light Cardio",
    theme: "recovery",
    items: [
      {
        id: "sat-1",
        name: "Outdoor Walk or Treadmill Session",
        setsReps: "30-45 minutes",
        category: ICONS.cardio,
        cue: "Brisk pace, incline optional, this is for movement not intensity.",
        video: ytSearch("incline treadmill walking workout"),
      },
    ],
  },
  {
    day: "Sunday",
    short: "Sun",
    location: "Rest",
    focus: "Full Rest",
    theme: "rest",
    items: [],
  },
];

const NUTRITION_PILLARS = [
  {
    title: "Protein First",
    detail: "Aim for 25-30g of protein per meal (chicken, turkey, fish, tofu, eggs, Greek yogurt) to preserve lean muscle and boost satiety.",
    icon: "protein",
  },
  {
    title: "Smart Carbs",
    detail: "Replace refined carbs with slow-digesting complex carbs like quinoa, sweet potatoes, oats, and berries.",
    icon: "carbs",
  },
  {
    title: "Fiber & Healthy Fats",
    detail: "Eat plenty of leafy greens, seeds, avocados, and olive oil to support digestion and hormone regulation.",
    icon: "fats",
  },
  {
    title: "Hydration",
    detail: "Drink at least 2.5-3 liters of water daily to reduce bloating and support metabolic function.",
    icon: "water",
  },
];

const KEY_HABITS = [
  {
    title: "Prioritize Sleep",
    detail: "Aim for 7-8 hours per night. Poor sleep increases ghrelin (the hunger hormone) and triggers abdominal fat storage.",
  },
  {
    title: "Manage Stress",
    detail: "High cortisol directly contributes to visceral belly fat. Practice daily deep breathing or a light walk.",
  },
  {
    title: "Consistency Over Intensity",
    detail: "Sustainable, moderate daily habits yield better long-term results than extreme, exhausting routines.",
  },
  {
    title: "Progressive Overload",
    detail: "At the gym, gradually increase the weights over time. At home, increase resistance with thicker bands or a slower tempo.",
  },
];
