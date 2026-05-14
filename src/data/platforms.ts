// 9 ad platforms supported. Used on landing "Every platform. One place." section.
export type Platform = {
  id: string;
  name: string;
  // Brand color, used only for subtle accents on dark cards.
  accent: string;
};

export const PLATFORMS: Platform[] = [
  { id: "meta", name: "Meta", accent: "#1877F2" },
  { id: "google", name: "Google", accent: "#4285F4" },
  { id: "tiktok", name: "TikTok", accent: "#FF0050" },
  { id: "linkedin", name: "LinkedIn", accent: "#0A66C2" },
  { id: "youtube", name: "YouTube", accent: "#FF0000" },
  { id: "pinterest", name: "Pinterest", accent: "#E60023" },
  { id: "snapchat", name: "Snapchat", accent: "#FFFC00" },
  { id: "x", name: "X / Twitter", accent: "#FFFFFF" },
  { id: "amazon", name: "Amazon", accent: "#FF9900" },
];
