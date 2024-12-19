export const LandingPageCarousel = [
  {
    header: "Hello!",
    subheader: "We are",
    description:
      "We are a collection of companies here to service your construction needs. Click the arrow for more details.",
    buttons: [
      {
        variant: "carouselPrimary",
        text: "View All Materials",
        navigateTo: "/materials",
      },
      {
        variant: "carouselOutline",
        text: "Contact Us",
        navigateTo: "/contact",
      },
    ],
    image: null,
  },
  {
    logo: "/logo_stoneyard.svg",
    subheader: "Stoneyard",
    description:
      "We specialize in providing natural stone products for construction and landscaping purposes. Our stone may be used in various applications like building facades, countertops, and retaining walls. Our high quality natural stone products can enhance any project design.",
    buttons: [
      {
        text: "View Materials",
        navigateTo: "/contact",
      },
    ],
    image: "/image_carousel_stoneyard.png", // Replace with your actual image path
  },
  {
    logo: "/logo_mrc.svg",
    subheader: "MRC Rock & Sand",
    description:
      "Our main business is to supply a range of aggregates for the construction industry. We operate quarries, processing facilities and have a range of portable equipment to provide services for various projects.",
    buttons: [
      {
        text: "View Materials",
        navigateTo: "/contact",
      },
      {
        text: "View Services",
        navigateTo: "/about",
      },
    ],
    image: "/about_us_timeline.png", // Replace with your actual image path
  },
  {
    logo: "/logo_spm.svg",
    subheader: "Santa Paula Materials",
    description:
      "We specialize in the demolition and recycling of building materials. We can take materials such as concrete, asphalt dirt and rock. We then break the materials down to offer products like crushed miscellaneous base.",
    buttons: [
      {
        text: "View Materials",
        navigateTo: "/contact",
      },
      {
        text: "View Services",
        navigateTo: "/about",
      },
    ],
    image: "/image_carousel_spm.png", // Replace with your actual image path
  },
];

export const ServicesSPM = [
  {
    id: 1,
    image: "/Service Image.png",
    name: "Recycle Building Material",
    desc: "We take pride in our recycling efforts, which are a key part of our commitment to sustainability. We process a variety of construction and demolition debris, transforming waste materials like concrete, asphalt, and other aggregates into high-quality recycled products. Our recycling services help clients minimize their environmental impact while providing them with reliable materials for their projects. ",
  },
];

export const ServicesMRC = [
  {
    id: 1,
    image: "/C & D Demolition.png",
    // image: "/image 136.svg",
    name: "C & D Demolition",
    desc: "We offer comprehensive construction and demolition (C&D) services that focus on efficient site clean-up and material recovery. Our team specializes in safely dismantling structures and managing the debris generated from these projects. We prioritize recycling and reclaiming valuable materials. We’re committed to providing a smooth, efficient experience for our clients while promoting sustainability.",
  },
  {
    id: 2,
    image: "/RockReclamation.png",
    name: "Rock Reclamation",
    desc: "We specialize in rock reclamation, a process that allows us to recover and repurpose valuable materials from construction and demolition sites. We take great care to sort and process various types of rock and aggregate, transforming them into usable products for future projects. This not only helps reduce waste in landfills but also conserves natural resources, making it a sustainable choice for our clients.",
  },
  {
    id: 3,
    image: "/Crushing&Screening.png",
    name: "Crushing & Screening",
    desc: "We provide comprehensive crushing and screening services that are essential for processing raw materials efficiently. Our mobile units can be transported directly to your project site, allowing us to deliver onsite services tailored to your needs. During the crushing process, we break down large materials into smaller, manageable pieces. Then, through screening, we separate these materials into various sizes and grades. We’re dedicated to helping you achieve the best results while minimizing waste and maximizing productivity.",
  },
];

export const CompanyAddresses = [
  {
    id: 1,
    name: "Santa Paula Materials",
    address: "1224 E Santa Clara St, Santa Paula, CA 93060",
    maps: "https://maps.app.goo.gl/auXAbfWyM3472uwb6",
  },
  {
    id: 2,
    name: "STONEYARD",
    address: "1400 E Santa Clara St, Santa Paula, CA 93060",
    maps: "https://maps.app.goo.gl/6U3rWgLghiJeLMtF9",
  },
  {
    id: 3,
    name: "MRC Rock & Sand (Mojave)",
    address: "Mojave, CA 93501",
    maps: "https://maps.app.goo.gl/Xr5dtssB8uk2qSQi9",
  },
  {
    id: 4,
    name: "MRC Rock & Sand (Ojai)",
    address: "Ojai, CA 93023",
    maps: "https://maps.app.goo.gl/3vTg68e313t97rjB6",
  },
  {
    id: 5,
    name: "MRC Rock & Sand (Fillmore)",
    address: "Fillmore, CA 93015",
    maps: "https://maps.app.goo.gl/7LDDrX1aKRdLyGdn9",
  },
];

export const HISTORY = [
  {
    title: "We started as Santa Paula Materials",
    body: "Santa Paula Materials specializes in delivering high-quality aggregate products for construction and landscaping. We provide a wide range of materials, including rock, sand, gravel, and landscaping supplies. Additionally, we offer recycling and delivery services tailored to both residential and commercial projects. Our commitment to sustainability ensures a reliable supply that meets our customers' needs.",
    image: "/image_carousel_spm.png",
  },
  {
    title: "We added MRC Rock & Sand",
    body: "MRC Rock and Sand is a general contracting company providing on-site  screening and crushing services. We have collaborated with land developers, gold mines, and county maintenance projects, delivering tailored solutions to meet their unique needs. We offer specialized services that include custom blending and aggregate processing.",
    image: "/about_us_timeline.png",
  },
  {
    title: "Lastly, we added Stoneyard",
    body: "At Stoneyard Building Materials, we offer an extensive range of natural stone products for both residential and commercial projects. We provide materials for hardscaping, such as patios, walkways, and walls, as well as interior applications like fireplaces and countertops. Additionally, we offer custom stonework and consultation services to help you achieve the perfect look and functionality for your project. ",
    image: "/image_carousel_stoneyard.png",
  },
];

export const HOWTOUSE = [
  {
    title: "1. Add Material to Cart",
    content:
      "From Material Description, enter the quantity, and click on the  'Request to Quote.'",
  },
  {
    title: "2. Review Cart",
    content:
      "Click on the cart icon at the navigation bar to review all materials in your cart.",
  },
  {
    title: "3. Enter Contact Info",
    content:
      "Enter your contact info, and a message to MRC specifying the purpose for the materials.",
  },
  {
    title: "4. Reviewed by MRC",
    content:
      "MRC will review your request and contact you directly with a quote.",
  },
];

export const MaterialsMenu = [
  {
    company: "STONEYARD",
    text: "We are focused on artisanal stone and tile.",
  },
  {
    company: "MRC Rock & Sand",
    text: "We are focused on artisanal stone and tile.",
  },
  {
    company: "Santa Paula Materials",
    text: "We are focused on artisanal stone and tile.",
  },
];

export const ArtisanalStone = [
  "Oklahoma Flagstone",
  "Arizona Flagstone",
  "Pennsylvania Blue",
  "Sydney Peak",
  "Santa Barbara Sandstone",
  "Silver & Gold Quartzite",
  "Lompoc Stone",
  "Pacific Clay Brick",
  "Pebbles",
];

export const MRCandSPMMaterials = [
  "Mojave",
  "Sespe",
  "Malibu",
  "Cucamonga",
  "Ojai",
  "Topanga",
  "Santa Barbara",
  "Construction Aggregates",
];

export const RequestQuoteCards = [
  {
    image: "/quote_add_material.svg",
    title: "Add Material",
    text: "From Material MaterialDetailForm, enter the quantity, and click on the 'request to Quote.'",
    width: 125,
    height: 125,
  },
  {
    image: "/quote_review_cart.svg",
    title: "Review Cart",
    text: "Click on the cart icon at the navigation bar to review materials in your cart.",
    width: 125,
    height: 127,
  },
  {
    image: "/enter_info.svg",
    title: "Enter Info",
    text: "Enter your contact info, and a message specifying your purpose.",
    width: 125,
    height: 132,
  },
  {
    image: "/review.svg",
    title: "We Review",
    text: "We will review your request and contact you directly with a quote.",
    width: 125,
    height: 132,
  },
];

export const Articles = [
  {
    image: "/article1.png",
    title: "Spirit of Small Business 2016 honoree, Santa Paula Materials",
    content:
      "As a young boy in the lush seaside municipality of pre blocka Croatia Mile once dreamed of captaining his own ship. Yet due to the restraints of the socialist Federal... ",
  },
  {
    image: "/article2.png",
    title: "As Montecito cleanup continues, a search for...",
    content:
      "Santa Paula Materials, which sells rocks and recycled construction debris, will collect the rocks that are hauled out, while Standard Industries, a building material...",
  },
  {
    image: "/article3.png",
    title: "SP Materials: State $1.1M loan to help create new...",
    content:
      "The ceremonial check for the proposed expansion - considered in the category of “green” business practices - was presented Thursday to Santa Paula Materials’...",
  },
];

export const AllCompanies = [
  "MRC Rock & Sand",
  "Stoneyard",
  "Santa Paula Materials",
];

export const AllCategories = [
  "Aggregate",
  "Cobble & Rubble",
  "Boulders",
  "Decomposed Granite",
  "Base Materials",
  "Rip Rap",
  "Drain Rock",
  "Rock Dust",
];

export const AllTextures = ["Angular", "Round"];

export const AllColors = [
  "Gold",
  "Red/Pink",
  "Green",
  "Blue",
  "White/Cool Neutral",
  "Light Earth-tones",
  "Dark Earth-tones",
  "Gray/Black",
];

export const AllSizes = [
  "1/4 in. chipped",
  "1/4 in. fine",
  "3/8 - 1/2 in.",
  "3/4 - 1 in.",
  "1 - 2 in.",
  "1 - 3 in.",
  "2 - 4 in.",
  "4 - 6 in.",
  "4 - 8 in.",
  "6 - 9 in.",
  "9 - 12 in.",
  "2 - 18 in.",
  "12 - 18 in.",
  "1 - 2 ft.",
  "2 - 3 ft.",
  "3 - 4 ft.",
  "4 - 6 ft.",
  "+ 6 ft.",
];
