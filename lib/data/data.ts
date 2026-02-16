

export const MOCK_USERS = [
  { id: "u1", name: "Sarah Connor", email: "sarah@resistance.com", role: "Admin" },
  { id: "u2", name: "James Holden", email: "j.holden@rocante.io", role: "User" },
  { id: "u3", name: "Naomi Nagata", email: "naomi@belt.sys", role: "User" },
  { id: "u4", name: "Arthur Dent", email: "adent@galaxy.guide", role: "User" },
  { id: "u5", name: "Ellen Ripley", email: "ripley@weyland.corp", role: "Moderator" },
];

export const MOCK_PAYMENTS = [
  { id: "p1", amount: 1250.00, status: "Success", method: "Stripe" },
  { id: "p2", amount: 450.50, status: "Success", method: "PayPal" },
  { id: "p3", amount: 89.99, status: "Pending", method: "Stripe" },
  { id: "p4", amount: 2100.00, status: "Success", method: "Bank Transfer" },
  { id: "p5", amount: 15.00, status: "Failed", method: "Stripe" },
];