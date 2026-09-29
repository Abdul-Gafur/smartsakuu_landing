import type { Job } from "../types";

/**
 * Local job postings, served by `services/jobs.ts` until a careers backend is
 * connected. Each entry is a complete `Job`, so a posting added here appears
 * on the listing, gets its own page and joins the sitemap.
 */
export const jobs: Job[] = [
  {
    slug: "sales-marketing",
    title: "Sales & Marketing Associate",
    department: "Sales and Marketing",
    language: "en",
    location: {
      city: "Wa",
      region: "Upper West Region",
      country: "Ghana",
      countryCode: "GH",
    },
    workplaceType: "hybrid",
    employmentType: "fullTime",
    opensAt: "2026-09-30",
    closesAt: "2026-10-20",
    // The last week of October.
    interviewPeriod: { start: "2026-10-26", end: "2026-10-30" },
    summary:
      "Drive school acquisition, partnerships, brand visibility and revenue growth as SmartSakuu expands across Ghana.",
    overview: [
      "We are looking for a Sales & Marketing Associate to drive school acquisition, partnerships, brand visibility and revenue growth as SmartSakuu expands in Ghana.",
      "You will spend much of your time with school owners, headteachers, education stakeholders and partners: understanding how their schools run, showing them what SmartSakuu can change, and turning that interest into lasting partnerships. Alongside sales, you will shape how SmartSakuu is seen, from the story told in a product demonstration to the posts on our social media channels.",
      "This is a hands-on growth role for someone who can combine sales execution, relationship building, market development and marketing strategy.",
    ],
    responsibilities: [
      {
        title: "School acquisition and sales",
        items: [
          "Develop and execute sales strategies that bring new schools onto SmartSakuu, starting in the Upper West Region.",
          "Generate, qualify and follow up leads through school visits, referrals, events, outreach and inbound enquiries.",
          "Coordinate and deliver product demonstrations tailored to each school’s size, needs and priorities.",
          "Manage the pipeline from first conversation to signed agreement, and hand new schools over smoothly for onboarding.",
          "Prepare proposals and contribute to pricing conversations and revenue targets.",
        ],
      },
      {
        title: "Partnerships and relationships",
        items: [
          "Build trusted relationships with school owners, headteachers, education officers and other stakeholders.",
          "Identify and develop partnerships with associations, organisations and community groups that extend SmartSakuu’s reach.",
          "Stay close to schools after they join to understand their experience, gather feedback and find new ways to help.",
        ],
      },
      {
        title: "Marketing and messaging",
        items: [
          "Translate SmartSakuu’s value into clear, compelling messaging for school leaders, teachers, parents and partners.",
          "Plan and run campaigns, online and on the ground, that build awareness and generate demand.",
          "Create and maintain sales materials such as presentations, brochures and demonstration scripts.",
          "Represent SmartSakuu at education events, school gatherings and community forums.",
        ],
      },
      {
        title: "Social media and content",
        items: [
          "Manage SmartSakuu’s social media channels, from planning the content calendar to publishing and responding to our community.",
          "Produce content that shows the work of partner schools and the difference SmartSakuu makes for them.",
          "Track how each channel performs and adjust based on what resonates.",
        ],
      },
      {
        title: "Market insight and reporting",
        items: [
          "Gather insight on schools’ needs, the market and competitors, and share it with the product team.",
          "Keep accurate records of leads, activities and outcomes, and report regularly on progress against targets.",
        ],
      },
    ],
    requirements: [
      "Experience in sales, business development, marketing or partnerships, ideally in education, technology or services.",
      "Confidence engaging school owners, headteachers and senior stakeholders, in person and by phone.",
      "A record of generating leads and converting them into customers or partners.",
      "Strong written and spoken English, and the ability to adapt a message to different audiences.",
      "Hands-on experience managing social media channels for a business or organisation.",
      "The organisation and self-drive to plan your own work and deliver outcomes in a largely remote team.",
      "Willingness to travel within the Upper West Region and to other parts of Ghana for approved missions.",
    ],
    niceToHave: [
      "An understanding of how basic and secondary schools in Ghana are run, including private schools.",
      "Fluency in a language widely spoken in the Upper West Region, such as Dagaare, Waali or Sisaali.",
      "Experience with CRM tools, email marketing or design tools such as Canva.",
      "An interest in education technology, AI or the use of data to improve learning.",
      "A degree in marketing, business, communications, education or a related field.",
    ],
    outcomes: [
      "A growing, well-managed pipeline of schools, starting in the Upper West Region.",
      "School leaders who understand what SmartSakuu offers and choose it with confidence.",
      "Active partnerships that open doors to new schools and communities.",
      "Social media channels that consistently reflect SmartSakuu’s work and bring in enquiries.",
    ],
    application: {
      // TODO: replace with the application form link.
      url: "https://forms.gle/AgSQBdYWFaEKCEVy7",
      checklist: [
        "Your CV.",
        "A short note, no longer than a page, on why this role and why SmartSakuu.",
        "An example of a sale, partnership or campaign you led, and what came of it.",
      ],
    },
  },
];
