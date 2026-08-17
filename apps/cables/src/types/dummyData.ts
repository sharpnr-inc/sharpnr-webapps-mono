import type {
  User,
  Channel,
  ChannelCategory,
  Message,
  DirectMessage,
  Workspace,
} from "../types";

export const CURRENT_USER_ID = "u_alex";

export const WORKSPACES: Workspace[] = [
  {
    id: "ws_sharpnr",
    name: "Sharpnr HQ",
    initials: "SH",
    color: "#4F8EF7",
    plan: "enterprise",
    memberCount: 48,
  },
  {
    id: "ws_product",
    name: "Product Circle",
    initials: "PC",
    color: "#7C3AED",
    plan: "pro",
    memberCount: 12,
  },
  {
    id: "ws_dev",
    name: "Dev Squad",
    initials: "DS",
    color: "#059669",
    plan: "pro",
    memberCount: 9,
  },
];

export const USERS: User[] = [
  {
    id: "u_alex",
    name: "Alex Morgan",
    username: "alex.morgan",
    initials: "AM",
    avatarColor: "#4F8EF7",
    status: "online",
    role: "admin",
    title: "Product Lead",
  },
  {
    id: "u_sarah",
    name: "Sarah Chen",
    username: "sarah.chen",
    initials: "SC",
    avatarColor: "#EC4899",
    status: "online",
    role: "member",
    title: "UX Designer",
  },
  {
    id: "u_marcus",
    name: "Marcus Webb",
    username: "marcus.webb",
    initials: "MW",
    avatarColor: "#F59E0B",
    status: "away",
    role: "member",
    title: "Backend Engineer",
  },
  {
    id: "u_priya",
    name: "Priya Sharma",
    username: "priya.sharma",
    initials: "PS",
    avatarColor: "#10B981",
    status: "online",
    role: "member",
    title: "Frontend Engineer",
  },
  {
    id: "u_jordan",
    name: "Jordan Kim",
    username: "jordan.kim",
    initials: "JK",
    avatarColor: "#8B5CF6",
    status: "busy",
    role: "member",
    title: "Product Manager",
  },
  {
    id: "u_theo",
    name: "Theo Grant",
    username: "theo.grant",
    initials: "TG",
    avatarColor: "#EF4444",
    status: "online",
    role: "admin",
    title: "Engineering Lead",
  },
  {
    id: "u_lena",
    name: "Lena Rao",
    username: "lena.rao",
    initials: "LR",
    avatarColor: "#06B6D4",
    status: "offline",
    role: "member",
    title: "Data Analyst",
  },
  {
    id: "u_devbot",
    name: "CablesBot",
    username: "cables.bot",
    initials: "CB",
    avatarColor: "#6366F1",
    status: "online",
    role: "bot",
    isBot: true,
  },
];

export const CHANNEL_CATEGORIES: ChannelCategory[] = [
  {
    id: "cat_company",
    label: "COMPANY",
    channelIds: ["ch_general", "ch_announcements"],
  },
  {
    id: "cat_product",
    label: "PRODUCT",
    channelIds: ["ch_design", "ch_frontend", "ch_backend"],
  },
  {
    id: "cat_social",
    label: "SOCIAL",
    channelIds: ["ch_random", "ch_standup"],
  },
];

export const CHANNELS: Channel[] = [
  {
    id: "ch_general",
    name: "general",
    description: "Company-wide updates and conversations",
    type: "text",
    category: "cat_company",
    isPrivate: false,
    memberIds: [
      "u_alex",
      "u_sarah",
      "u_marcus",
      "u_priya",
      "u_jordan",
      "u_theo",
      "u_lena",
    ],
    unreadCount: 0,
    topic: "Welcome to Sharpnr HQ! 🚀 All-hands tomorrow at 10 AM",
  },
  {
    id: "ch_announcements",
    name: "announcements",
    description: "Official company announcements",
    type: "announcement",
    category: "cat_company",
    isPrivate: false,
    memberIds: [
      "u_alex",
      "u_sarah",
      "u_marcus",
      "u_priya",
      "u_jordan",
      "u_theo",
      "u_lena",
    ],
    unreadCount: 2,
    topic: "Read-only for members. Admins only.",
  },
  {
    id: "ch_design",
    name: "design",
    description: "Design system, mockups, and feedback",
    type: "text",
    category: "cat_product",
    isPrivate: false,
    memberIds: ["u_alex", "u_sarah", "u_priya", "u_jordan"],
    unreadCount: 3,
    topic: "Design system v2.0 in progress",
  },
  {
    id: "ch_frontend",
    name: "frontend",
    description: "Frontend engineering discussions",
    type: "text",
    category: "cat_product",
    isPrivate: false,
    memberIds: ["u_alex", "u_priya", "u_theo"],
    unreadCount: 0,
  },
  {
    id: "ch_backend",
    name: "backend",
    description: "Backend, APIs and infrastructure",
    type: "text",
    category: "cat_product",
    isPrivate: false,
    memberIds: ["u_alex", "u_marcus", "u_theo"],
    unreadCount: 7,
    topic: "Auth service v2 deploying this week",
  },
  {
    id: "ch_random",
    name: "random",
    description: "Off-topic conversations",
    type: "text",
    category: "cat_social",
    isPrivate: false,
    memberIds: [
      "u_alex",
      "u_sarah",
      "u_marcus",
      "u_priya",
      "u_jordan",
      "u_theo",
      "u_lena",
    ],
    unreadCount: 1,
  },
  {
    id: "ch_standup",
    name: "standup",
    description: "Daily async standups",
    type: "text",
    category: "cat_social",
    isPrivate: false,
    memberIds: [
      "u_alex",
      "u_sarah",
      "u_marcus",
      "u_priya",
      "u_jordan",
      "u_theo",
    ],
    unreadCount: 0,
    topic: "Post your standup updates here daily before 10 AM",
  },
];

export const DIRECT_MESSAGES: DirectMessage[] = [
  { id: "dm_sarah", userId: "u_sarah", unreadCount: 0 },
  { id: "dm_marcus", userId: "u_marcus", unreadCount: 2 },
  { id: "dm_priya", userId: "u_priya", unreadCount: 0 },
  { id: "dm_devbot", userId: "u_devbot", unreadCount: 1 },
];

const now = new Date();
const mins = (n: number) => new Date(now.getTime() - n * 60 * 1000);

export const MESSAGES: Record<string, Message[]> = {
  ch_general: [
    {
      id: "m1",
      channelId: "ch_general",
      authorId: "u_devbot",
      type: "system",
      content:
        "Welcome to **#general** — the place for company-wide conversation.",
      timestamp: mins(180),
    },
    {
      id: "m2",
      channelId: "ch_general",
      authorId: "u_theo",
      type: "text",
      content:
        "Morning team! 👋 Quick heads-up — all-hands is tomorrow at 10 AM. Link will be posted in #announcements 30 minutes before.",
      timestamp: mins(120),
    },
    {
      id: "m3",
      channelId: "ch_general",
      authorId: "u_sarah",
      type: "text",
      content:
        "Thanks Theo! Will the recording be shared for the folks in different time zones?",
      timestamp: mins(118),
      reactions: [{ emoji: "👍", count: 3, reactedByMe: false }],
    },
    {
      id: "m4",
      channelId: "ch_general",
      authorId: "u_theo",
      type: "text",
      content:
        "Always — recordings go to the shared drive within 24h and I'll drop the link here.",
      timestamp: mins(115),
    },
    {
      id: "m5",
      channelId: "ch_general",
      authorId: "u_priya",
      type: "text",
      content:
        "The new design system components are live in Storybook 🎉 Check out the updated button variants, modal system, and data tables. Link: https://storybook.sharpnr.dev",
      timestamp: mins(90),
      reactions: [
        { emoji: "🔥", count: 5, reactedByMe: true },
        { emoji: "❤️", count: 2, reactedByMe: false },
      ],
    },
    {
      id: "m6",
      channelId: "ch_general",
      authorId: "u_sarah",
      type: "text",
      content:
        "Priya these look incredible!! The button variants are so clean. The loading state animation is my favorite detail.",
      timestamp: mins(87),
      replyToId: "m5",
    },
    {
      id: "m7",
      channelId: "ch_general",
      authorId: "u_marcus",
      type: "text",
      content:
        "Deployed the auth service v2 update to staging this morning. @u_priya can you run through the SSO flow when you get a chance?",
      timestamp: mins(60),
    },
    {
      id: "m8",
      channelId: "ch_general",
      authorId: "u_priya",
      type: "text",
      content: "On it! Give me ~30 min",
      timestamp: mins(58),
    },
    {
      id: "m9",
      channelId: "ch_general",
      authorId: "u_jordan",
      type: "text",
      content:
        "Quick question for the group — are we still targeting Q2 for the cable encryption feature? Trying to finalize the roadmap deck.",
      timestamp: mins(45),
    },
    {
      id: "m10",
      channelId: "ch_general",
      authorId: "u_theo",
      type: "text",
      content:
        "Yes, Q2 is still the target. Alex's team is leading that work. We have a milestone review scheduled for May 3rd.",
      timestamp: mins(43),
    },
    {
      id: "m11",
      channelId: "ch_general",
      authorId: "u_priya",
      type: "text",
      content:
        "@marcus SSO flow is working great! Found one edge case with the SAML provider redirect — DM'd you the details with a screen recording.",
      timestamp: mins(28),
    },
    {
      id: "m12",
      channelId: "ch_general",
      authorId: "u_marcus",
      type: "text",
      content: "Got it, on it now. Should have a fix pushed in the next hour.",
      timestamp: mins(26),
      reactions: [{ emoji: "⚡", count: 2, reactedByMe: false }],
    },
    {
      id: "m13",
      channelId: "ch_general",
      authorId: "u_alex",
      type: "text",
      content:
        "Great work everyone. Jordan — I'll sync with you tomorrow before the all-hands on the roadmap, we can finalize the Q2 scope together.",
      timestamp: mins(15),
    },
    {
      id: "m14",
      channelId: "ch_general",
      authorId: "u_jordan",
      type: "text",
      content: "Perfect, I'll have the draft deck ready by EOD. 🙌",
      timestamp: mins(13),
      reactions: [{ emoji: "✅", count: 1, reactedByMe: false }],
    },
    {
      id: "m15",
      channelId: "ch_general",
      authorId: "u_lena",
      type: "text",
      content:
        "Quick data note — saw a 23% spike in channel message volume this week vs last. The new Cables rollout is going really well!",
      timestamp: mins(5),
      reactions: [{ emoji: "📈", count: 4, reactedByMe: true }],
    },
  ],
  ch_design: [
    {
      id: "d1",
      channelId: "ch_design",
      authorId: "u_sarah",
      type: "text",
      content:
        "Uploaded the new wireframes for the channels redesign to the shared drive. Would love feedback from the team before I move to high-fidelity.",
      timestamp: mins(200),
    },
    {
      id: "d2",
      channelId: "ch_design",
      authorId: "u_priya",
      type: "text",
      content:
        "These are looking really solid! A few thoughts:\n• The sidebar hierarchy reads really well\n• Love the channel category collapsing pattern\n• The message input toolbar might be a bit crowded on mobile",
      timestamp: mins(180),
    },
    {
      id: "d3",
      channelId: "ch_design",
      authorId: "u_sarah",
      type: "text",
      content:
        'Great points. Will simplify the mobile toolbar — maybe overflow into a "more" button.',
      timestamp: mins(170),
    },
    {
      id: "d4",
      channelId: "ch_design",
      authorId: "u_jordan",
      type: "text",
      content:
        "From a PM perspective — users in the beta have been requesting threaded replies more than any other feature. Should that be in v1?",
      timestamp: mins(140),
    },
    {
      id: "d5",
      channelId: "ch_design",
      authorId: "u_sarah",
      type: "text",
      content:
        "I have a threads design ready actually — was going to propose it for v1.1 but we can pull it forward if it's the top ask.",
      timestamp: mins(135),
      reactions: [{ emoji: "🙌", count: 3, reactedByMe: false }],
    },
  ],
  ch_backend: [
    {
      id: "b1",
      channelId: "ch_backend",
      authorId: "u_marcus",
      type: "text",
      content:
        "Auth service v2 PR is up for review. Main changes: JWT refresh token rotation, SAML 2.0 support, rate limiting on /auth endpoints. Please review by EOD.",
      timestamp: mins(240),
    },
    {
      id: "b2",
      channelId: "ch_backend",
      authorId: "u_theo",
      type: "text",
      content:
        "Reviewed. Left a few comments on the token rotation logic — mainly around edge cases when the refresh window expires mid-request. Otherwise looks great.",
      timestamp: mins(200),
    },
    {
      id: "b3",
      channelId: "ch_backend",
      authorId: "u_marcus",
      type: "text",
      content:
        "Good catch on the refresh window race condition. Fixed it with a mutex + retry queue. Updated PR is ready.",
      timestamp: mins(160),
    },
    {
      id: "b4",
      channelId: "ch_backend",
      authorId: "u_theo",
      type: "text",
      content: "Approved ✅ merging now and deploying to staging.",
      timestamp: mins(150),
    },
    {
      id: "b5",
      channelId: "ch_backend",
      authorId: "u_devbot",
      type: "system",
      content:
        "🚀 **auth-service v2.1.0** deployed to **staging** — 3 minutes ago",
      timestamp: mins(148),
    },
  ],
  ch_random: [
    {
      id: "r1",
      channelId: "ch_random",
      authorId: "u_lena",
      type: "text",
      content: "Anyone else watching the F1 race this weekend? 🏎️",
      timestamp: mins(300),
    },
    {
      id: "r2",
      channelId: "ch_random",
      authorId: "u_jordan",
      type: "text",
      content: "Yes!! Setting my alarm for 6am 😅",
      timestamp: mins(295),
    },
    {
      id: "r3",
      channelId: "ch_random",
      authorId: "u_theo",
      type: "text",
      content: "Going to be a good one. Hoping for rain 🌧️",
      timestamp: mins(290),
      reactions: [{ emoji: "😂", count: 3, reactedByMe: false }],
    },
  ],
  ch_standup: [
    {
      id: "s1",
      channelId: "ch_standup",
      authorId: "u_alex",
      type: "text",
      content:
        "**Alex — Today**\n✅ Reviewed Q2 roadmap with Jordan\n🔧 Working on: Cable encryption spec doc\n🚫 Blockers: None",
      timestamp: mins(180),
    },
    {
      id: "s2",
      channelId: "ch_standup",
      authorId: "u_priya",
      type: "text",
      content:
        "**Priya — Today**\n✅ Design system v2 shipped to Storybook\n✅ QA'd auth service SSO flow\n🔧 Working on: Mobile responsive pass on new components\n🚫 Blockers: None",
      timestamp: mins(175),
    },
    {
      id: "s3",
      channelId: "ch_standup",
      authorId: "u_marcus",
      type: "text",
      content:
        "**Marcus — Today**\n✅ Auth service v2 merged and on staging\n🔧 Working on: SAML redirect edge case fix\n🚫 Blockers: Need staging DB access — pinged @theo",
      timestamp: mins(170),
    },
  ],
  ch_announcements: [
    {
      id: "a1",
      channelId: "ch_announcements",
      authorId: "u_theo",
      type: "text",
      content:
        "📣 **All-hands meeting — Tomorrow, 10:00 AM EST**\n\nAgenda:\n• Q1 results review\n• Q2 roadmap reveal\n• Team shoutouts\n• Open Q&A\n\nMeeting link will be shared 30 min before start.",
      timestamp: mins(480),
      isPinned: true,
    },
    {
      id: "a2",
      channelId: "ch_announcements",
      authorId: "u_alex",
      type: "text",
      content:
        "🎉 **Sharpnr Cables v1.0 Beta** is now live for all internal users!\n\nThis is the platform you're on right now. We've been building this for 6 months and we're proud to finally share it with the team. Please log all feedback in #general or directly to Jordan.\n\nThank you to everyone who made this happen. 🙏",
      timestamp: mins(1440),
      isPinned: true,
    },
  ],
  ch_frontend: [
    {
      id: "f1",
      channelId: "ch_frontend",
      authorId: "u_priya",
      type: "text",
      content:
        "Upgrading to React 19 this sprint. Main changes we'll feel: concurrent features by default, new `use` hook, and server components groundwork. Let me know if anyone has concerns.",
      timestamp: mins(360),
    },
    {
      id: "f2",
      channelId: "ch_frontend",
      authorId: "u_alex",
      type: "text",
      content:
        "Sounds good. Make sure to do the upgrade on a feature branch and run the full test suite before opening the PR.",
      timestamp: mins(340),
    },
    {
      id: "f3",
      channelId: "ch_frontend",
      authorId: "u_theo",
      type: "text",
      content:
        "Also worth checking the TanStack Router compatibility — they usually drop an update within a week of major React releases.",
      timestamp: mins(330),
    },
  ],
  dm_sarah: [
    {
      id: "dm_s1",
      channelId: "dm_sarah",
      authorId: "u_sarah",
      type: "text",
      content:
        "Hey! Just wanted to say the product spec you shared for the encryption feature is really clear. Made my design work so much easier 🙏",
      timestamp: mins(400),
    },
    {
      id: "dm_s2",
      channelId: "dm_sarah",
      authorId: "u_alex",
      type: "text",
      content:
        "Glad it helped! Your wireframes look great by the way — Jordan showed me in the standup. Really nailed the hierarchy.",
      timestamp: mins(390),
    },
    {
      id: "dm_s3",
      channelId: "dm_sarah",
      authorId: "u_sarah",
      type: "text",
      content:
        "Thank you! I'm moving to hifi this week. Will tag you when the first screens are ready for review.",
      timestamp: mins(385),
      reactions: [{ emoji: "🙌", count: 1, reactedByMe: false }],
    },
    {
      id: "dm_s4",
      channelId: "dm_sarah",
      authorId: "u_alex",
      type: "text",
      content: "Perfect, looking forward to it!",
      timestamp: mins(380),
    },
  ],
  dm_marcus: [
    {
      id: "dm_m1",
      channelId: "dm_marcus",
      authorId: "u_marcus",
      type: "text",
      content:
        "Hey Alex — quick heads up, the DB migration for the messages table is going to need a 5-10 min maintenance window. Thinking Thursday 11 PM EST works best. OK to proceed?",
      timestamp: mins(50),
    },
    {
      id: "dm_m2",
      channelId: "dm_marcus",
      authorId: "u_marcus",
      type: "text",
      content:
        "I'll set up the status page banner so users are notified in advance.",
      timestamp: mins(49),
    },
  ],
  dm_priya: [
    {
      id: "dm_p1",
      channelId: "dm_priya",
      authorId: "u_alex",
      type: "text",
      content:
        "Hey Priya — are you available for a quick sync on the component library this afternoon?",
      timestamp: mins(120),
    },
    {
      id: "dm_p2",
      channelId: "dm_priya",
      authorId: "u_priya",
      type: "text",
      content: "Yes! 3 PM works for me. Shall I send a Cables Meet invite?",
      timestamp: mins(115),
    },
    {
      id: "dm_p3",
      channelId: "dm_priya",
      authorId: "u_alex",
      type: "text",
      content: "Perfect, yes please!",
      timestamp: mins(113),
    },
  ],
  dm_devbot: [
    {
      id: "dm_b1",
      channelId: "dm_devbot",
      authorId: "u_devbot",
      type: "system",
      content:
        "👋 Hi Alex! I'm CablesBot. I can help you with:\n• `/remind` — set reminders\n• `/status` — check service status\n• `/deploy` — trigger deployments\n• `/standup` — generate standup template\n\nType `/help` for the full command list.",
      timestamp: mins(2880),
    },
    {
      id: "dm_b2",
      channelId: "dm_devbot",
      authorId: "u_devbot",
      type: "system",
      content:
        "🔔 **Reminder** — Q2 Roadmap review with Jordan is tomorrow at 2 PM EST",
      timestamp: mins(30),
    },
  ],
};
