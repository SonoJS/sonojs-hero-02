import type { JuiceId } from "@/types/juice";

export const copy = {
  metadata: {
    title: "Juicy - Premium Juice Selection",
    description:
      "Discover our premium selection of fresh juices with interactive 3D product showcase.",
  },
  brand: {
    name: "Juicy",
    wordmark: "JUICY",
  },
  common: {
    loading: "Loading...",
    loadingModels: "Loading 3D models...",
  },
  nav: {
    menu: "Menu",
    account: "Account",
    cart: "Shopping cart",
    items: {
      about: "About",
      contact: "Contact",
    },
  },
  account: {
    title: "My Account",
    email: "Email",
    password: "Password",
    signIn: "Sign In",
    noAccount: "Don't have an account?",
    register: "Register",
    validation: {
      emailRequired: "Email is required",
      emailInvalid: "Please enter a valid email",
      passwordRequired: "Password is required",
    },
  },
  cart: {
    title: "Shopping Cart",
    close: "Close",
    remove: "Remove item",
    quantity: (count: number) => `Qty: ${count}`,
    subtotal: "Subtotal",
    checkout: "Checkout",
    viewCart: "View Cart",
    items: {
      lemonGinger: "Lemon Ginger Soda",
      blueberryAcai: "Blueberry Açai Soda",
      mangoBurst: "Mango Burst Soda",
      raspberryRose: "Raspberry Rosé Soda",
    } satisfies Record<JuiceId, string>,
  },
  carousel: {
    previous: "Previous juice",
    next: "Next juice",
  },
  juices: {
    lemonGinger: {
      name: "Lemon Ginger",
      description:
        "A refreshing blend of zesty lemon and warming ginger that awakens the senses with every sip.",
    },
    blueberryAcai: {
      name: "Blueberry Açai",
      description:
        "Rich blueberries meet exotic açai berries for an antioxidant-packed pour that tastes as bold as it looks.",
    },
    mangoBurst: {
      name: "Mango Burst",
      description:
        "Sun-ripened mango crushed into a tropical explosion of sweet golden flavour.",
    },
    raspberryRose: {
      name: "Raspberry Rosé",
      description:
        "Delicate raspberry sweetness with soft floral notes for a refined experience.",
    },
  } satisfies Record<JuiceId, { name: string; description: string }>,
  product: {
    seeMore: "See More",
  },
  units: {
    ml: "ML",
  },
  cta: {
    getThis: "Get This",
  },
  contact: {
    title: "Contact me",
    links: {
      website: "Aniq Templates",
      github: "GitHub",
    },
  },
  decor: {
    fruit: "Fruit",
    iceCube: "Ice cube",
    leaf: "Leaf",
  },
} as const;
