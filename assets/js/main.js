(() => {
  const $ = (s) => document.querySelector(s);
  const reduce = matchMedia('(prefers-reduced-motion: reduce)').matches;
  const clamp = (v, a = 0, b = 1) => Math.min(b, Math.max(a, v));
  const lerp = (a, b, t) => a + (b - a) * t;
  const mobile = () => innerWidth < 900;

  // ---------- logo fold (letters) ----------
  $('#wmLetters').innerHTML = [...'WebsiteSoft'].map((c, i) => { const key = i === 0 || i === 7; const d = key ? 0 : i < 7 ? (7 - i) * 32 : (i - 7) * 45; return `<span class="c ${key ? 'k' : 'q'}${i >= 7 ? ' s' : ''}" style="--d:${d}ms">${c}</span>`; }).join('');
  const brand = $('#brand');
  const shortQ = matchMedia('(min-width:900px)');
  const fitCh4 = () => { const c = document.getElementById('ch4'); if (!c) return; Object.assign(c.dataset, shortQ.matches ? { shift: '.23', y: innerHeight < 760 ? '.95' : '1.05', scale: innerHeight < 760 ? '.82' : '.66' } : { shift: '0', y: '.55', scale: '.78' }); };
  fitCh4(); shortQ.addEventListener('change', fitCh4); addEventListener('resize', fitCh4);

  // ---------- services ----------
  const services = [
    ['Legacy Sitecore versions, SitecoreAI', 'Support, upgrades and migrations for legacy Sitecore versions, plus structured, scalable builds on SitecoreAI.', ['Sitecore XP / XM', 'SitecoreAI', '.NET', 'Headless'], ['Legacy Sitecore support and upgrades', 'Sitecore XP / XM to SitecoreAI', 'Templates and standard values', 'Reusable components', 'Multisite and multilingual', 'SitecoreAI and headless']],
    ['Umbraco CMS', 'Umbraco builds, upgrades and support on .NET.', ['Umbraco', '.NET', 'Razor', 'Block Grid'], ['New Umbraco builds', 'Version upgrades', 'Document types and compositions', 'Ongoing support']],
    ['CMS workflows & permissions', 'Roles, approvals and publishing that keep content safe and fast.', ['Sitecore workflows', 'Umbraco user groups', '.NET', 'Teams'], ['Draft, review, approve, publish', 'Roles, not individuals', 'Audit trails', 'Approval alerts to email or Teams']],
    ['Content architecture', 'Content structured for growth, so editors don\'t need developers.', ['Templates', 'Document types', 'Headless', 'Multisite'], ['Content models', 'Reusable components', 'A clear content tree', 'Editor training']],
    ['CMS migration', 'Planned migrations that keep content, integrations and search rankings.', ['Sitecore', 'Umbraco', 'Redirects', 'SEO'], ['Content mapping', 'Front end rebuilt for the new platform', 'Redirects and SEO', 'Post-launch checks']],
    ['Headless CMS', 'One content source for websites, apps and other channels.', ['SitecoreAI', 'Umbraco Delivery API', 'Next.js', 'GraphQL'], ['Content APIs', 'Next.js front ends', 'Omnichannel delivery', 'Preview for editors']],
    ['.NET & .NET Core apps', 'Secure, scalable custom applications in C#.', ['.NET', '.NET Core', 'C#', 'SQL Server'], ['Web applications', 'APIs and back ends', 'Code reviewed before it ships', 'Built to own for years']],
    ['API & systems integration', 'Your website, CRM, ERP and tools sharing data automatically.', ['REST', 'CRM', 'ERP', 'Webhooks'], ['Website forms to CRM', 'Product and pricing sync', 'Retries and monitoring', 'Secure access control']],
    ['AI integration', 'AI added to your existing CMS and systems, without a rebuild.', ['Azure OpenAI', '.NET', 'RAG', 'AI search'], ['Semantic search', 'Chatbots on approved content', 'Drafting and smart tagging', 'Human review built in']],
    ['AI QA tool', 'Automated website testing, in development, that will turn hundreds of results into one prioritised report.', ['Playwright', 'AI', 'Screenshots', 'Reports'], ['Functional and form tests', 'Broken links and console errors', 'Accessibility, performance and SEO', 'AI-grouped findings with evidence']],
    ['Web applications', 'Portals, dashboards and tools built around how you work.', ['React', 'Next.js', 'ASP.NET Core', 'TypeScript'], ['Customer portals', 'Internal dashboards', 'Responsive on every screen', 'Accessible UI']],
    ['Custom web software, built for your business', 'Custom websites and web software, designed and built around how your business works: fast, responsive and easy to find.', ['Custom software', 'UI/UX', '.NET', 'SEO'], ['Custom web software', 'UI/UX design', 'Responsive build', 'SEO, speed and security']],
    ['Legacy modernisation', 'Keep what works, upgrade what doesn\'t, without starting from scratch.', ['.NET Framework', 'Modern .NET', 'Azure', 'CMS upgrades'], ['System audits', 'Step-by-step upgrades', 'Framework to modern .NET', 'CMS restructuring']],
    ['Performance & accessibility', 'Sites that stay fast, reliable and usable by everyone.', ['Core Web Vitals', 'WCAG', 'Lighthouse', 'Monitoring'], ['Speed improvements', 'WCAG checks', 'Monitoring', 'Regular audits']],
    ['Support & maintenance', 'Building is only the beginning. We keep it healthy.', ['Support', 'Security', 'QA', 'Hosting'], ['Updates and patches', 'Content and feature changes', 'Security reviews', 'Quality checks every release']],
  ];
  const IMGS = {'team-desks': 'assets/img/team-desks.jpg', 'pair-coding': 'assets/img/pair-coding.jpg', 'whiteboard-pair': 'assets/img/whiteboard-pair.jpg', 'meeting-table': 'assets/img/meeting-table.jpg', 'coding-plant': 'assets/img/coding-plant.jpg', 'team-whiteboard': 'assets/img/team-whiteboard.jpg', 'sunlit-meeting': 'assets/img/sunlit-meeting.jpg', 'laptops-table': 'assets/img/laptops-table.jpg', 'office-desk': 'assets/img/office-desk.jpg', 'kanban': 'assets/img/kanban.jpg', 'code-screen': 'assets/img/code-screen.jpg', 'whiteboard-team': 'assets/img/whiteboard-team.jpg'};
  let sub = false, svcHover = -1, svcFront = 0;
  const slug = (n) => n.toLowerCase().replace(/&/g, 'and').replace(/[^a-z0-9]+/g, '-').replace(/^-|-$/g, '');
  const pad2 = (i) => String(i + 1).padStart(2, '0');
  // ---------- service catalogue (categories > services) ----------
  const CATS = [{"id": "umbraco", "name": "Umbraco Development & Migration", "short": "Umbraco", "img": "whiteboard-pair", "cta": "Talk to Our Umbraco Experts", "h1": "Umbraco, built and moved <span class=\"grad\">the right way.</span>", "lede": "We build, upgrade and support Umbraco sites, and move businesses onto Umbraco from Sitecore, WordPress and other platforms.", "subs": [{"id": "umbraco-upgrades", "name": "Umbraco upgrades", "cta": "Discuss Your Upgrade", "card": "Move from Umbraco 7, 8 or 13 (end of life December 2026) to Umbraco 17 LTS on .NET 10.", "challenge": ["Umbraco 13 reaches end of life on 14 December 2026", "Older versions are out of support and miss security fixes", "New versions have a rebuilt backoffice, so custom editors must change"], "help": ["Audit of packages, custom code and integrations", "Content, media and members migrated and checked", "Custom editors and templates rebuilt", "Redirects to protect search rankings"], "get": ["A supported, secure platform", "Faster pages and modern editing", "Easier upgrades from now on"], "steps": ["Agree target version and goals", "Inventory code, packages, integrations", "Choose what to keep, rebuild or retire", "Migrate content, rebuild editors", "Compare old and new, test everything", "Low-disruption cut-over, then support"], "answer": "An Umbraco upgrade moves a site from Umbraco 7, 8 or 13 to Umbraco 17 LTS on .NET 10. WebsiteSoft audits packages, custom code and integrations, migrates content, media and members, rebuilds custom editors for the new backoffice and adds redirects to protect rankings. The outcome is a supported, secure platform with easier future upgrades.", "faq": [["How long does an Umbraco upgrade take?", "It depends on the starting version and the amount of custom code. A move from Umbraco 13 is usually shorter than one from Umbraco 7 or 8, where the backoffice, templates and packages typically all need rebuilding rather than updating."], ["What happens to our content during the upgrade?", "Content, media and members are migrated into the new version and checked against the old site page by page. Nothing is retyped by editors. Where the content model changes, WebsiteSoft maps old properties to new ones and verifies the result."], ["Do we have to upgrade before Umbraco 13 goes end of life?", "Umbraco 13 stops receiving security fixes on 14 December 2026, so a site left on it after that date carries growing risk. Planning the upgrade earlier in 2026 avoids a rushed project and leaves time for testing and cut-over."]]}, {"id": "sitecore-to-umbraco-migration", "name": "Sitecore to Umbraco migration", "cta": "Discuss Your Migration", "card": "Move from Sitecore to Umbraco to cut licence costs and complexity, keeping content, integrations and rankings.", "challenge": ["Sitecore licence and hosting costs keep rising", "Many paid features are unused", "A Sitecore upgrade or SitecoreAI move is a big project anyway"], "help": ["Audit of templates, renderings, workflows and modules", "Sitecore templates mapped to Umbraco document types", "Content, media and languages migrated", "Integrations and .NET code moved or rebuilt"], "get": ["Much lower running costs", "A simpler platform to maintain", "Existing .NET skills reused"], "steps": ["Renewal date, budget, features used", "Review what Sitecore really does today", "Decide what moves, rebuild plan", "Build Umbraco, migrate content", "Validate against the Sitecore site", "Switch over, train editors, support"], "answer": "A Sitecore to Umbraco migration replaces Sitecore XP or XM with Umbraco to cut licence costs while keeping content, integrations and rankings. WebsiteSoft audits templates, renderings, workflows and modules, maps Sitecore templates to Umbraco document types, migrates content, media and languages, and moves or rebuilds .NET integrations, leaving a simpler platform with lower running costs.", "faq": [["Why move from Sitecore to Umbraco rather than upgrade Sitecore?", "Many organisations pay for Sitecore features they no longer use, and a Sitecore upgrade or SitecoreAI move is a large project in itself. If the features in use map to Umbraco, the migration takes similar effort but removes the licence fee."], ["Can our existing Sitecore integrations and .NET code be reused?", "Often, yes. Both platforms run on .NET, so business logic and integration code can typically be moved with changes rather than rewritten. Sitecore-specific APIs, renderings and pipelines are the parts that need rebuilding for Umbraco."], ["When should we start planning a Sitecore to Umbraco migration?", "Ideally well before the Sitecore licence renewal date, as that fixes the deadline. WebsiteSoft starts by reviewing which Sitecore features are actually used and what the renewal costs, then sets a plan that lands before the renewal falls due."]]}, {"id": "cms-to-umbraco-migration", "name": "WordPress and other CMS to Umbraco", "cta": "Discuss Your Migration", "card": "Move from WordPress, Drupal, Kentico Xperience or a bespoke CMS to a structured, secure Umbraco site.", "challenge": ["Plugin updates and security patches never stop", "Content is mixed with layout, so editing is fragile", "Templates from the old CMS cannot be reused"], "help": ["Content model mapped to Umbraco", "Scripted, repeatable content migration", "Plugins replaced with maintained features", "Full redirect map for every changed URL"], "get": ["Far less to maintain", "Structured content editors understand", "Rankings protected through the move"], "steps": ["Why you are moving, what editors need", "Review content, plugins, URLs", "Design the Umbraco structure", "Build site and migration scripts", "Check content, links, redirects", "Go live, train, support"], "answer": "A CMS to Umbraco migration moves a website from WordPress, Drupal, Kentico Xperience or a bespoke CMS onto Umbraco. WebsiteSoft maps the content model to Umbraco document types, writes scripted, repeatable migration tooling, replaces plugins with maintained features and builds a redirect map for every changed URL, giving structured content, less maintenance and protected rankings.", "faq": [["Will our WordPress plugins work on Umbraco?", "No, WordPress plugins cannot be installed on Umbraco. WebsiteSoft reviews what each plugin does and replaces it with an Umbraco package, a built-in feature or custom code, so the function is kept while the constant plugin updating stops."], ["How is content moved from the old CMS?", "Content is exported from the old database or API and loaded into Umbraco by scripts, so the migration can be rerun as content changes before go-live. Editors check the results rather than re-entering pages manually."], ["What happens to our URLs and SEO?", "Every URL that changes gets a permanent redirect in a full redirect map, and page titles, metadata and images are carried over. Links and redirects are tested before go-live, which typically keeps rankings stable through the move."]]}, {"id": "umbraco-development", "name": "Umbraco development and integrations", "cta": "Talk to Our Umbraco Experts", "card": "New Umbraco sites, custom features and connections to your CRM, ERP and business systems.", "challenge": ["Editors wait on developers for simple changes", "The website does not share data with other systems", "Quick builds become hard to change"], "help": ["Content model and reusable components", "Custom backoffice features", "CRM, ERP and marketing integrations through APIs", "Headless or traditional front ends"], "get": ["Editors publish without tickets", "Data flows between systems automatically", "New features delivered faster"], "steps": ["Goals, audience, editor needs", "Review current site and systems", "Design content model and integrations", "Build in short iterations", "Test features, data flows, editing", "Launch, train, keep improving"], "answer": "Umbraco development and integration at WebsiteSoft covers new Umbraco sites, custom backoffice features and connections to CRM, ERP and marketing systems through APIs. Work starts with a content model and reusable components, with headless or traditional front ends as needed. Editors publish without tickets, data flows between systems automatically and new features are delivered faster.", "faq": [["Can you integrate Umbraco with our CRM or ERP?", "Yes. WebsiteSoft connects Umbraco to CRM, ERP and marketing platforms through their APIs, with the data flows and security designed first. Which systems can connect depends on the APIs they expose, which is reviewed at the start."], ["Should we build a headless or traditional Umbraco site?", "It depends on where content needs to appear. A traditional Umbraco site is simpler if the website is the only channel. Headless suits apps, multiple front ends or a separate front-end framework, and WebsiteSoft builds either."], ["How do you approach a new Umbraco build?", "After agreeing goals, audience and editor needs, WebsiteSoft designs the content model and integrations, then builds in short iterations so editors can test features and data flows early. Launch is followed by training and ongoing improvement."]]}, {"id": "umbraco-support", "name": "Umbraco maintenance and support", "cta": "Request Umbraco Support", "card": "Keep your Umbraco site secure, up to date and improving, with a team that knows your code.", "challenge": ["Missed patches create security risk", "Small issues pile up", "Nobody knows the code when something breaks"], "help": ["Regular updates and security patches", "Uptime and error monitoring", "Fixes and small improvements", "Planning for the next major upgrade"], "get": ["A secure, up-to-date site", "Quick fixes from people who know it", "Predictable upgrades"], "steps": ["How critical the site is", "Review code, hosting, versions", "Agree a support plan", "Apply updates and fixes", "Every change peer-reviewed", "Ongoing monitoring and reports"], "answer": "Umbraco maintenance and support from WebsiteSoft keeps an Umbraco site secure, up to date and improving, covering updates and security patches, uptime and error monitoring, fixes and small improvements, and planning for the next upgrade. Every change is peer-reviewed, so site owners get quick fixes from a team that knows the code and predictable upgrades.", "faq": [["Do you support Umbraco sites you did not build?", "Yes. Support starts with a review of the code, hosting and versions to understand how critical the site is and what needs attention first. From that review WebsiteSoft agrees a support plan rather than assuming a rebuild."], ["What does an Umbraco support plan include?", "Typically regular Umbraco and package updates, security patches, uptime and error monitoring, bug fixes and small improvements, plus planning for the next major upgrade. The level of cover depends on how critical the site is to the business."], ["How quickly are issues fixed?", "Response depends on the agreed support plan and the severity of the issue. Because the team already knows the code and hosting, diagnosis is usually faster than with an unfamiliar site, and every fix is peer-reviewed before release."]]}], "answer": "Umbraco development at WebsiteSoft covers building new Umbraco sites, upgrading older versions such as Umbraco 7, 8 and 13 to Umbraco 17 LTS on .NET 10, and migrating businesses onto Umbraco from Sitecore, WordPress and other platforms. Content, integrations and search rankings are carried over, and ongoing support keeps the site patched and improving.", "faq": [["Which version of Umbraco should we be on?", "Umbraco 17 is the current long-term support release, running on .NET 10. Sites still on Umbraco 7, 8 or 13 should plan a move, because Umbraco 13 reaches end of life on 14 December 2026 and earlier versions are already unsupported."], ["Can you take over an Umbraco site another agency built?", "Yes. WebsiteSoft starts with a review of the code, packages, hosting and version, then agrees a support plan. Most handovers need no rebuild; the review simply shows what needs patching, fixing or planning for the next upgrade."], ["Will moving to Umbraco affect our search rankings?", "It should not if the move is planned. Every changed URL gets a redirect, metadata is carried across, and the new site is compared against the old before cut-over. Rankings typically hold when redirects are complete and tested."]]}, {"id": "sitecore", "name": "Sitecore Development & Migration", "short": "Sitecore", "img": "team-whiteboard", "cta": "Discuss Your Sitecore Project", "h1": "Sitecore, from legacy versions <span class=\"grad\">to SitecoreAI.</span>", "lede": "We support and upgrade Sitecore XP and XM, build and integrate features, and move businesses to SitecoreAI when the time is right.", "subs": [{"id": "sitecoreai-migration", "name": "SitecoreAI migration", "cta": "Discuss Your SitecoreAI Migration", "card": "Move from Sitecore XP or XM to SitecoreAI (formerly XM Cloud), Sitecore's SaaS platform, in planned phases.", "challenge": ["MVC renderings do not carry over to a headless front end", "Custom server-side code needs a new home", "Content needs cleaning up before it moves"], "help": ["Readiness assessment of your solution", "Headless front end in Next.js", "Templates and content migrated and tidied", "Custom logic moved to APIs and services"], "get": ["No more major version upgrades", "A faster front end", "Less infrastructure to manage"], "steps": ["Why SitecoreAI, timeline, features used", "Review templates, code, integrations", "Target architecture and phases", "Build front end, migrate content", "Test against the current site", "Phased go-live, then support"], "answer": "A SitecoreAI migration moves a Sitecore XP or XM solution to SitecoreAI, formerly XM Cloud, in phases. WebsiteSoft assesses readiness, builds a headless front end in Next.js, migrates and tidies templates and content, and moves custom server-side logic to APIs and services. The result is no more major version upgrades and less infrastructure to manage.", "faq": [["Do our existing MVC renderings carry over to SitecoreAI?", "No. SitecoreAI uses a headless front end, so MVC renderings are rebuilt as components, typically in Next.js. Custom server-side code also needs a new home in APIs or services, which is why the readiness assessment comes first."], ["How long does a SitecoreAI migration take?", "It depends on the number of templates, the amount of custom code and the state of the content. WebsiteSoft runs the move in phases, so parts of the site can go live on SitecoreAI while others remain on the current platform."], ["Does our content need cleaning up before moving to SitecoreAI?", "Usually, yes. Unused templates, duplicated items and stale content add cost to the migration and clutter the new platform. The review stage identifies what is actually used, and content is tidied as it moves."]]}, {"id": "sitecore-development", "name": "Sitecore development and integrations", "cta": "Discuss Your Sitecore Project", "card": "Components, templates and workflows built properly, plus integrations with your CRM, DAM and business systems.", "challenge": ["A messy content tree slows every new page", "Editors cannot add pages without help", "Manual data entry between systems"], "help": ["Templates, standard values and reusable components", "Roles, workflows and approvals", "SXA and headless development", "CRM, DAM and Teams integrations"], "get": ["Editors work independently", "Consistent pages and branding", "Data in sync across systems"], "steps": ["The feature or site you need", "Review templates and integrations", "Design components and workflow", "Develop with code review", "Test publishing and data flows", "Release, document, support"], "answer": "Sitecore development and integration at WebsiteSoft covers templates, standard values and reusable components, roles, workflows and approvals, SXA and headless development, and integrations with CRM, DAM and Microsoft Teams. Work is code-reviewed and tested for publishing and data flows, so editors add pages independently, pages stay consistent and data stays in sync across systems.", "faq": [["Can you fix a messy Sitecore content tree?", "Yes. WebsiteSoft reviews the existing templates and content structure, then redesigns templates, standard values and components so new pages are quick to create. Content is restructured in stages so editors can keep publishing during the work."], ["Do you work with SXA and headless Sitecore?", "Yes. WebsiteSoft builds with SXA on Sitecore XP and XM and develops headless components for SitecoreAI. The right approach depends on the current platform and whether a move to SitecoreAI is planned in the near future."], ["Which systems can Sitecore be integrated with?", "Typically CRM platforms, digital asset management systems and Microsoft Teams, along with other business systems that expose an API. The integration design covers data ownership, security and failure handling before any code is written."]]}, {"id": "sitecore-upgrades", "name": "Sitecore upgrades and support", "cta": "Discuss Your Sitecore Upgrade", "card": "Upgrade older Sitecore versions safely, or keep legacy versions stable and secure while you plan the next step.", "challenge": ["Old versions lose support and security fixes", "Modules and custom code block upgrades", "Specialist skills are hard to keep in-house"], "help": ["Upgrade path planning and blocker fixes", "Database and content upgrade", "Legacy version support and hardening", "Honest advice: upgrade, SitecoreAI or alternative"], "get": ["A supported, secure Sitecore", "Fewer surprises through phased testing", "Reliable access to Sitecore expertise"], "steps": ["Current version and plans", "Review install, modules, code", "Phased, tested upgrade plan", "Upgrade and fix compatibility", "Regression test everything", "Deploy, monitor, keep supporting"], "answer": "Sitecore upgrades and support from WebsiteSoft cover upgrading older Sitecore XP and XM versions safely, and keeping legacy versions stable and secure while the next step is planned. The work includes upgrade path planning, blocker fixes, database and content upgrade, hardening and regression testing, with honest advice on upgrading, moving to SitecoreAI or an alternative.", "faq": [["What usually blocks a Sitecore upgrade?", "Most often third-party modules that have no compatible release, custom pipelines or processors that depend on changed APIs, and old database schemas. WebsiteSoft reviews the install, modules and code first so blockers are fixed before the upgrade starts."], ["Should we upgrade Sitecore or move to SitecoreAI?", "It depends on your licence position, the features in use and how much custom server-side code exists. WebsiteSoft sets out the costs and risks of each path, including moving to another platform, rather than recommending one by default."], ["Can you keep an unsupported Sitecore version running safely?", "For a period, yes. Hardening, monitoring and targeted fixes reduce risk while a longer-term plan is agreed. It is a bridge rather than a destination, because unsupported versions no longer receive security fixes from Sitecore."]]}], "answer": "Sitecore development at WebsiteSoft covers support and upgrades for Sitecore XP and XM, building components, templates, workflows and integrations, and migration to SitecoreAI, the SaaS platform formerly called XM Cloud, when the time is right. Sites stay supported and secure, editors work independently, and organisations get advice on upgrading, moving to SitecoreAI or changing platform.", "faq": [["Do you support older Sitecore XP versions?", "Yes. WebsiteSoft keeps legacy Sitecore versions stable and hardened while the next step is planned, fixing blockers and applying security measures. Which versions remain practical to support depends on the modules and custom code in the installation."], ["Is SitecoreAI the same as XM Cloud?", "Yes. Sitecore renamed XM Cloud to SitecoreAI in November 2025. It is Sitecore's SaaS platform with a headless front end, so moving to it from XP or XM is a migration project rather than a version upgrade."], ["Can you work alongside our in-house Sitecore team?", "Yes. WebsiteSoft typically fills gaps in specialist skills, reviews code and handles upgrades or integrations while the in-house team keeps day-to-day ownership. Work is documented and code-reviewed so knowledge does not sit with one person."]]}, {"id": "optimizely", "name": "Optimizely Development", "short": "Optimizely", "img": "meeting-table", "cta": "Discuss Your Optimizely Project", "h1": "Optimizely CMS, <span class=\"grad\">implemented properly.</span>", "lede": "We build, customise, integrate and upgrade websites on Optimizely CMS (formerly Episerver), including upgrades to CMS 13.", "subs": [{"id": "optimizely-development", "name": "Optimizely development and implementation", "cta": "Discuss Your Optimizely Project", "card": "New Optimizely sites and custom features, set up around how your editors work, with roles and approvals.", "challenge": ["Confusing page and block types slow editors", "Workarounds break during upgrades", "Mistakes go live without approvals"], "help": ["Content model and component library", "Custom features on supported extension points", "Roles, access rights and approvals", "Editor training and guides"], "get": ["A site editors run confidently", "Safe publishing", "Lower long-term change costs"], "steps": ["Goals, audiences, editor workflow", "Review existing site and content", "Design model, components, roles", "Build in iterations", "Test features and editing", "Launch, train, support"], "answer": "Optimizely development and implementation at WebsiteSoft covers new Optimizely CMS sites and custom features built on supported extension points, set up around how editors work. The work includes a content model and component library, roles, access rights and approvals, and editor training. Editors run the site confidently, publishing is safe and change costs are lower.", "faq": [["Why do custom Optimizely features break during upgrades?", "Usually because they were built with workarounds rather than on Optimizely's supported extension points. WebsiteSoft builds customisations against the documented APIs so they typically carry through CMS upgrades with little or no rework."], ["Can you set up approvals so mistakes do not go live?", "Yes. Optimizely CMS supports roles, access rights and approval sequences. WebsiteSoft configures these around your editor workflow so content is reviewed before publishing, and documents the setup in editor guides for new starters."], ["How do you decide the page and block types?", "By looking at the content editors actually publish and the layouts the site needs, then designing a small, consistent set of page and block types. Confusing or overlapping types are the main cause of slow editing."]]}, {"id": "optimizely-integrations", "name": "Optimizely integrations", "cta": "Discuss Your Integration", "card": "Connect Optimizely to your CRM, ERP, PIM, marketing and analytics systems through secure APIs.", "challenge": ["Out-of-date product or customer data on the site", "Manual data transfer wastes time", "Disconnected tools weaken personalisation"], "help": ["CRM and marketing automation", "PIM and ERP data sync", "Single sign-on", "Content APIs for apps and channels"], "get": ["Accurate data on the site", "Less manual work", "Better personalisation"], "steps": ["Which systems should connect", "Review APIs and data", "Design flows and security", "Build in .NET", "Test with real data and failures", "Deploy with monitoring"], "answer": "Optimizely integration at WebsiteSoft connects Optimizely CMS to CRM, ERP, PIM, marketing automation and analytics systems through secure APIs built in .NET. The work covers CRM and marketing automation, PIM and ERP data sync, single sign-on and content APIs for apps and other channels, so sites show accurate data, manual transfer stops and personalisation improves.", "faq": [["Which systems can you connect to Optimizely?", "Typically CRM, marketing automation, PIM, ERP and analytics platforms, plus identity providers for single sign-on. Any system with a usable API can be considered; WebsiteSoft reviews the APIs and data quality before designing the flows."], ["How do you handle failures in an integration?", "Each flow is designed with retries, logging and alerts, and tested with real data and deliberate failures before go-live. Deployment includes monitoring so problems are visible rather than silently leaving stale data on the site."], ["Can Optimizely content be used in our mobile app?", "Yes. WebsiteSoft builds content APIs so content managed in Optimizely can be delivered to apps and other channels. On Optimizely CMS 13, Optimizely Graph is a required part of the platform and the standard route for content delivery."]]}, {"id": "optimizely-migration", "name": "Optimizely upgrades and migration", "cta": "Discuss Your Migration", "card": "Upgrade Episerver CMS 11 or Optimizely CMS 12 to CMS 13 on .NET 10, including the move to Optimizely Graph.", "challenge": ["CMS 11 and 12 are behind the current CMS 13 release", "CMS 13 runs on .NET 10 and needs Optimizely Graph and Opti ID", "Content and rankings at risk without a plan"], "help": ["CMS 11 or 12 to CMS 13 upgrade on .NET 10", "Search and content delivery moved to Optimizely Graph", "Add-on review and replacement", "Redirects and SEO protection"], "get": ["The current, supported CMS 13", "Better performance on .NET 10", "Content and rankings protected"], "steps": ["Current version, goals, timeline", "Inventory code and add-ons", "Choose path, plan phases", "Upgrade or migrate", "Regression testing", "Go live and support"], "answer": "An Optimizely upgrade moves Episerver CMS 11 or CMS 12 to Optimizely CMS 13, which runs on .NET 10 and requires Optimizely Graph and Opti ID. WebsiteSoft inventories code and add-ons, upgrades the solution, moves search and content delivery to Optimizely Graph, replaces unsupported add-ons and adds redirects, leaving the supported CMS with rankings protected.", "faq": [["What changes between Optimizely CMS 12 and CMS 13?", "CMS 13 reached general availability on 31 March 2026 and runs on .NET 10. Optimizely Graph and Opti ID are required parts of it, so search, content delivery and sign-in typically need changes even when the content model stays the same."], ["Can we upgrade straight from Episerver CMS 11 to CMS 13?", "The path depends on the solution and its add-ons. CMS 11 is two major releases behind CMS 13, so WebsiteSoft reviews the code and add-ons first, then chooses between a direct migration and staged phases with regression testing at each step."], ["What happens to our add-ons during the upgrade?", "Each add-on is reviewed for a CMS 13-compatible version. Those without one are replaced with supported alternatives or custom code on documented extension points. Search add-ons typically move to Optimizely Graph as part of the upgrade."]]}], "answer": "Optimizely development at WebsiteSoft covers building, customising, integrating and upgrading websites on Optimizely CMS, formerly Episerver, including upgrades from CMS 11 or 12 to Optimizely CMS 13 on .NET 10. Sites are set up around how editors work, connected to CRM, ERP, PIM and marketing systems, and kept on the current release with rankings protected.", "faq": [["Is Optimizely CMS the same as Episerver?", "Yes. Episerver was renamed Optimizely, and Episerver CMS 11 is the version many sites still run. Optimizely CMS 12 and CMS 13 are its successors, with CMS 13 reaching general availability on 31 March 2026 on .NET 10."], ["Can you take over an existing Optimizely site?", "Yes. WebsiteSoft reviews the existing site, content model and add-ons first, then agrees what to improve, integrate or upgrade. Most work builds on the current solution rather than replacing it, unless the version is too far behind."], ["What does an Optimizely project typically start with?", "A discussion of goals, audiences and editor workflow, followed by a review of the current site, content and integrations. From that WebsiteSoft designs the content model, components and roles before building in iterations."]]}, {"id": "custom-software", "name": "Custom Software Development", "short": "Custom Development", "img": "pair-coding", "cta": "Request a Project Estimate", "h1": "Custom software, <span class=\"grad\">built for your business.</span>", "lede": "When off-the-shelf tools do not fit, we build .NET applications, web apps, APIs and integrations around how your business works.", "subs": [{"id": "dotnet-applications", "name": ".NET and web applications", "cta": "Request a Project Estimate", "card": "Business applications, portals and internal tools in C# and modern .NET, replacing spreadsheets and manual steps.", "challenge": ["Spreadsheets and email break as you grow", "Packages force awkward processes", "Dependency-heavy code breaks on updates"], "help": ["Business apps, portals and dashboards", "Clean architecture, minimal dependencies", "Secure sign-in and roles", "Prototypes before the full build"], "get": ["Software that fits how you work", "Fewer security risks", "Code any competent team can pick up"], "steps": ["Talk to the people who do the work", "Review tools, data, processes", "Prototype, scope, plan releases", "Build in short iterations", "Test with real scenarios", "Roll out, train, improve"], "answer": ".NET and web application development at WebsiteSoft produces business applications, portals and dashboards in C# and modern .NET, replacing spreadsheets and manual steps. Applications use clean architecture with minimal dependencies and secure sign-in with roles, and are prototyped before the full build, giving software that fits the business and code any team can pick up.", "faq": [["How long does a custom .NET application take to build?", "It depends on scope. WebsiteSoft builds in short iterations and plans releases, so a first working version typically arrives early and grows from there, rather than everything landing at the end of a long project."], ["Why avoid dependency-heavy code?", "Every third-party package is something that can break on update, go unmaintained or carry a vulnerability. Keeping dependencies minimal and the architecture clean means updates are smaller, security risk is lower and the code stays understandable."], ["How do you make sure the software fits how we work?", "By talking to the people who do the work, reviewing the current tools, data and processes, and building a prototype before the full build. Testing uses real scenarios from the business rather than invented ones."]]}, {"id": "api-integrations", "name": "APIs and enterprise integration", "cta": "Discuss Your Integration", "card": "Secure APIs and integrations that connect your CRM, ERP, finance and other systems, so data is entered once.", "challenge": ["Teams retype the same data into several systems", "Nobody has a complete, current picture", "Insecure or undocumented APIs"], "help": ["REST and GraphQL APIs with documentation", "CRM, ERP and finance integration", "Retries, monitoring and alerts", "Clear data ownership rules"], "get": ["One consistent view of the business", "Hours of manual work removed", "New systems added without rework"], "steps": ["Map systems and data owners", "Review APIs and data quality", "Design flows and failure handling", "Build the integration layer", "Test accuracy, failures, volume", "Deploy with monitoring"], "answer": "API and enterprise integration at WebsiteSoft connects CRM, ERP, finance and other systems so data is entered once and shared automatically. The work covers documented REST and GraphQL APIs, retries, monitoring and alerts, and clear data ownership rules, giving one consistent view of the business, manual retyping removed and new systems added without rework.", "faq": [["Can you integrate systems that have poor or no documentation?", "Usually, yes. WebsiteSoft reviews what each system exposes and the quality of its data before designing flows. Where an API is missing or weak, options include database-level access, file exchange or wrapping the system in a documented API."], ["What happens when one system is down?", "The integration layer is designed for failure. Messages are retried, errors are logged and alerts are raised, so data is delivered when the system returns rather than lost. Failure handling is tested deliberately before deployment."], ["Who decides which system holds the master data?", "That is agreed at the start as data ownership rules: for each type of data, one system is the source of truth and the others receive updates from it. This prevents conflicting records and makes later changes predictable."]]}, {"id": "legacy-modernisation", "name": "Legacy system modernisation", "cta": "Request a Project Estimate", "card": "Modernise old applications in stages, moving to modern .NET and the cloud without stopping the business.", "challenge": ["Outdated technology is a security and support risk", "Changes are slow and expensive", "Knowledge sits with a few people"], "help": [".NET Framework to modern .NET", "Module-by-module replacement", "Cloud migration to Azure", "Documentation of existing behaviour"], "get": ["Lower risk than a rewrite", "A supported technology base", "Faster changes in future"], "steps": ["What must keep running", "Document how it really works", "Staged plan, value early", "Modernise module by module", "Test against existing behaviour", "Switch over gradually"], "answer": "Legacy system modernisation at WebsiteSoft moves old applications to modern .NET and the cloud in stages without stopping the business. It documents how the system behaves, replaces it module by module, migrates .NET Framework code to modern .NET and moves hosting to Azure, giving lower risk than a rewrite, a supported platform and faster changes.", "faq": [["Is it better to modernise or rewrite from scratch?", "Staged modernisation is typically lower risk. A rewrite delivers nothing until it is finished and often misses undocumented behaviour. Module-by-module replacement delivers value early, tests each part against the existing system and keeps the business running."], ["Can you modernise a system when the original developers have left?", "Yes. The first step is documenting how the system actually works, from the code, the data and the people who use it every day. That documentation then becomes the test baseline for each modernised module."], ["Do we have to move to the cloud as part of modernisation?", "No. Cloud migration to Azure is one option within the staged plan, not a requirement. Some systems move hosting first, others modernise code first, depending on what must keep running and where the biggest risk sits."]]}], "answer": "Custom software development at WebsiteSoft covers .NET applications, portals, APIs and integrations built around how a business works when off-the-shelf tools do not fit. WebsiteSoft has traded since 2007 and builds in C# and .NET with minimal dependencies, giving software that fits the business, fewer security risks and code any team can maintain.", "faq": [["What drives the cost of custom software?", "Mainly the number of processes and user roles covered, the systems it must integrate with and how much data needs migrating. WebsiteSoft prototypes first and plans releases, so the first version can be scoped to the parts that matter most."], ["Will we be tied to WebsiteSoft to maintain the software?", "No. Applications are built with clean architecture, minimal dependencies and documentation, so any competent .NET team can pick them up. Many clients keep WebsiteSoft on for support, but the code is written so that remains a choice."], ["Can you replace our spreadsheets with a proper application?", "Yes, this is a common starting point. WebsiteSoft talks to the people doing the work, reviews the spreadsheets and processes, then prototypes an application before the full build so the fit is confirmed early."]]}, {"id": "ai", "name": "AI Integration & AI-Powered Solutions", "short": "AI", "img": "code-screen", "cta": "Explore AI Solutions for Your Business", "h1": "Practical AI, <span class=\"grad\">built into your systems.</span>", "lede": "We add AI to the applications and websites you already run, securely and with people in control.", "subs": [{"id": "ai-integration", "name": "AI integration and smart assistants", "cta": "Explore AI Solutions for Your Business", "card": "Add AI to your existing website, CMS or application, including assistants that answer from your own approved content.", "challenge": ["Rebuilding systems for AI is expensive", "Uncontrolled AI can expose data", "Generic chatbots give wrong answers"], "help": ["Secure .NET layer to Azure OpenAI and others", "Drafting, summarising and tagging", "Assistants grounded in approved content", "Human review and cost monitoring"], "get": ["AI without replacing systems", "Data kept under control", "Faster answers for customers and staff"], "steps": ["Where AI could help, what data", "Review systems and security", "Pick use cases and safeguards", "Build and connect", "Test accuracy, safety, cost", "Monitor and improve"], "answer": "AI integration and assistants at WebsiteSoft add AI to an existing website, CMS or application through a secure .NET layer to Azure OpenAI. Capabilities include drafting, summarising and tagging, and assistants that answer only from approved content, with human review and cost monitoring, so businesses gain AI without replacing systems and keep data under control.", "faq": [["What can an AI assistant grounded in our content do?", "It answers customer and staff questions using only the content you have approved, such as product information, policies or help articles, and declines or escalates when the answer is not there. This avoids the invented answers generic chatbots give."], ["How do you control the cost of AI features?", "Usage is monitored from the start, with limits and alerts, and use cases are chosen where AI saves clear effort. Testing before launch covers cost alongside accuracy and safety, so running costs are understood before rollout."], ["Which AI providers do you work with?", "Azure OpenAI is the usual starting point for organisations already on Microsoft, and the .NET layer can connect to other providers. The choice depends on data residency, existing contracts and the specific use case."]]}, {"id": "ai-search", "name": "AI-powered search", "cta": "Explore AI Solutions for Your Business", "card": "Search that understands meaning and intent across your website, documents and knowledge base.", "challenge": ["Keyword search misses what people mean", "Visitors give up or call support", "Staff waste time finding information"], "help": ["Semantic and vector search", "Answers grounded in your content, with sources", "Works with Umbraco, Sitecore and Optimizely", "Search analytics and tuning"], "get": ["People find what they need", "Fewer support enquiries", "Insight into what people look for"], "steps": ["Who searches, for what", "Review current search and content", "Design sources and results", "Index content, build search", "Tune with real queries", "Monitor and refine"], "answer": "AI-powered search from WebsiteSoft understands meaning and intent across a website, documents and knowledge base using semantic and vector search. Results can include answers grounded in your own content with sources shown, and it works with Umbraco, Sitecore and Optimizely. Visitors find what they need, support enquiries fall and analytics show what people look for.", "faq": [["How is AI search different from the keyword search we have?", "Keyword search matches the words typed. Semantic and vector search matches the meaning, so a question phrased differently from the page still finds it. Answers can also be generated from the matching content, with sources shown."], ["Can AI search work with our existing CMS?", "Yes. WebsiteSoft indexes content from Umbraco, Sitecore and Optimizely sites, and can include documents and knowledge bases alongside web pages. The content stays in the CMS; the search index is built from it and kept updated."], ["How do you make sure search results are accurate?", "Search is tuned with real queries from your users before launch, and search analytics afterwards show what people look for and where results fall short. Generated answers cite their sources so users can check them."]]}, {"id": "document-automation", "name": "Document processing and workflow automation", "cta": "Explore AI Solutions for Your Business", "card": "Read, extract and route information from documents automatically, and automate repetitive process steps.", "challenge": ["Hours spent retyping documents", "Routine steps slow processes", "Errors and backlogs at busy times"], "help": ["Data extraction from invoices, forms and contracts", "Classification and routing", "Power Automate and custom .NET workflows", "People review anything uncertain"], "get": ["Manual work removed", "Fewer errors", "Clear audit trails"], "steps": ["Map documents and process", "Review samples, tools, rules", "Decide what to automate", "Build pipeline and workflows", "Test on real cases", "Roll out and improve"], "answer": "Document processing and workflow automation from WebsiteSoft reads, extracts and routes information from invoices, forms and contracts, and automates repetitive process steps. The work covers data extraction, classification and routing, Power Automate and custom .NET workflows, with people reviewing anything uncertain. Organisations remove manual retyping, cut errors and backlogs and gain clear audit trails.", "faq": [["What types of documents can be processed automatically?", "Typically invoices, forms and contracts, in scanned or digital form. Suitability is checked by reviewing real samples at the start, as layout variety and image quality affect extraction accuracy more than the document type itself."], ["What happens when the system is not sure about a document?", "It is routed to a person for review rather than guessed. Confidence thresholds are set during testing on real cases, so the system handles the routine majority and people handle the exceptions, with an audit trail of both."], ["Do you use Power Automate or custom code?", "Both, depending on the process. Power Automate suits organisations on Microsoft 365 with straightforward routing needs. Custom .NET workflows are used where logic is complex, volumes are high or integration goes beyond what Power Automate offers."]]}, {"id": "ai-qa-testing", "name": "AI QA website testing", "cta": "Ask About Early Access", "card": "Our AI QA tool is in development. It will crawl a site, run the checks and turn hundreds of results into one prioritised report.", "challenge": [], "help": [], "get": [], "steps": [], "href": "#/ai-qa", "answer": "AI QA website testing is a tool WebsiteSoft is developing. It will crawl a website, run quality checks across the pages it finds and turn hundreds of results into one prioritised report, so teams see the issues that matter most first rather than working through raw lists of findings. The tool is not yet released.", "faq": [["Is the AI QA testing tool available now?", "Not yet. The tool is in development and WebsiteSoft will publish details when it is ready for use. Organisations interested in it can contact WebsiteSoft to discuss their website and how they test it today."], ["What will the AI QA tool check?", "It will crawl a site and run checks across its pages, then consolidate hundreds of results into a single prioritised report. The precise set of checks is still being finalised while the tool is in development."], ["Will it replace manual website testing?", "It is intended to reduce routine checking and point human testers at what matters most, not to replace them. Prioritised reporting means people spend their time on judgement rather than on collecting and sorting results."]]}], "answer": "AI integration at WebsiteSoft adds AI to existing applications and websites, securely and with people in control. Services include assistants grounded in approved content, semantic search across websites and documents, document processing and workflow automation, and an AI QA testing tool in development, through a secure .NET layer to Azure OpenAI and other providers.", "faq": [["Do we need to rebuild our systems to add AI?", "No. WebsiteSoft adds a secure .NET layer between existing systems and AI services such as Azure OpenAI, so the current website, CMS or application stays in place and gains the new capability without a replacement project."], ["How do you stop an AI assistant giving wrong answers?", "By grounding it in approved content only, returning sources with answers, and routing uncertain cases to people. Accuracy, safety and cost are tested before launch and monitored afterwards, so quality is measured rather than assumed."], ["Is our data kept secure when using AI?", "The design decides which data the AI can see and which it cannot, access goes through a controlled .NET layer, and humans review outputs where needed. Which provider and hosting region is appropriate depends on your data requirements."]]}];
  const STAGES = ["Understand", "Analyse", "Plan", "Build", "Test", "Launch & support"];
  const SUBJ = {"umbraco": "Umbraco Development and Migration", "sitecore": "Sitecore Development and Migration", "optimizely": "Optimizely Development", "custom-software": "Custom Software Development", "ai": "AI Integration", "umbraco-upgrades": "Umbraco Upgrade", "sitecore-to-umbraco-migration": "Sitecore to Umbraco Migration", "cms-to-umbraco-migration": "CMS to Umbraco Migration", "umbraco-development": "Umbraco Development", "umbraco-support": "Umbraco Support", "sitecoreai-migration": "SitecoreAI Migration", "sitecore-development": "Sitecore Development", "sitecore-upgrades": "Sitecore Upgrade", "optimizely-development": "Optimizely Development", "optimizely-integrations": "Optimizely Integration", "optimizely-migration": "Optimizely Migration", "dotnet-applications": "Custom Software Development", "api-integrations": "Integration", "legacy-modernisation": "Legacy Modernisation", "ai-integration": "AI Integration", "ai-search": "AI-Powered Search", "document-automation": "Document and Workflow Automation", "ai-qa-testing": "AI QA Tool"};
  const SUBALIAS = {"umbraco-version-upgrade": "umbraco-upgrades", "wordpress-to-umbraco-migration": "cms-to-umbraco-migration", "umbraco-integrations": "umbraco-development", "sitecore-integrations": "sitecore-development", "sitecore-support": "sitecore-upgrades", "optimizely-website-development": "optimizely-development", "optimizely-cms-implementation": "optimizely-development", "optimizely-customisation": "optimizely-development", "dotnet-application-development": "dotnet-applications", "web-applications": "dotnet-applications", "business-software": "dotnet-applications", "api-development": "api-integrations", "enterprise-integrations": "api-integrations", "smart-assistants": "ai-integration", "document-processing": "document-automation", "workflow-automation": "document-automation", "xm-cloud-migration": "sitecoreai-migration"};
  // Campaign landing pages: one message, one form, no main navigation, noindex. Add a campaign here, rebuild, deploy;
  // the page is /c/<id>/. Results are tracked per campaign in docs/ROADMAP.md (Phase 7).
  const CAMPAIGNS = [
    { id: 'umbraco-13-end-of-life', cat: 'umbraco', sub: 'umbraco-upgrades', kicker: 'Umbraco 13 end of life: 14 December 2026', h1: 'Still on Umbraco 13? <span class="grad">Plan the move to 17 now.</span>', lede: 'Umbraco 13 stops receiving security fixes on 14 December 2026. We upgrade Umbraco 7, 8 and 13 sites to Umbraco 17 LTS on .NET 10, with content, packages, custom editors and search rankings carried across.', points: [['A fixed-price audit first', 'Packages, custom code and integrations inventoried, with a clear plan before any work starts.'], ['Rankings protected', 'Redirects, metadata and structured data checked page by page.'], ['Supported until 2028', 'Umbraco 17 LTS is supported until November 2028, so you upgrade once.']], cta: 'Book an Umbraco 13 upgrade review', subject: 'Umbraco 13 end-of-life upgrade enquiry' },
    { id: 'xm-cloud-to-sitecoreai', cat: 'sitecore', sub: 'sitecoreai-migration', kicker: 'Sitecore XP and XM to SitecoreAI', h1: 'Sitecore renamed XM Cloud. <span class="grad">Should you move?</span>', lede: 'Sitecore XM Cloud became SitecoreAI in November 2025. We help Sitecore XP and XM teams decide whether to move, stay or leave, and run the migration in planned phases when moving is right.', points: [['An honest options review', 'SitecoreAI, staying on XP or XM, or moving to Umbraco, costed side by side.'], ['Phased, not big bang', 'Content, templates and integrations move in stages you can test.'], ['Engineers who know both', 'The same team has built and migrated Sitecore and Umbraco since 2007.']], cta: 'Get a Sitecore options review', subject: 'SitecoreAI migration options enquiry' },
    { id: 'optimizely-cms-13-upgrade', cat: 'optimizely', sub: 'optimizely-migration', kicker: 'Optimizely CMS 13 on .NET 10', h1: 'Optimizely CMS 13 is here. <span class="grad">Upgrade without the surprises.</span>', lede: 'Optimizely CMS 13 reached general availability on 31 March 2026. It runs on .NET 10 and makes Optimizely Graph and Opti ID part of the licence. We upgrade Episerver CMS 11 and Optimizely CMS 12 sites and plan for what changes.', points: [['Graph and Opti ID planned in', 'The parts that catch teams out are scoped before the upgrade starts.'], ['Editors kept working', 'Visual Builder and custom properties checked with your content team.'], ['Integrations re-tested', 'CRM, PIM and marketing connections verified end to end.']], cta: 'Scope your CMS 13 upgrade', subject: 'Optimizely CMS 13 upgrade enquiry' },
  ];
  window.__wsRoutes = CAMPAIGNS.map((c) => '/c/' + c.id + '/'); // lets the pre-renderer find pages nothing links to
  const catBy = (id) => CATS.find((c) => c.id === id);
  const subBy = (c, id) => c && c.subs.find((s) => s.id === (SUBALIAS[id] || id));
  const catHref = (c) => `#/services/${c.id}`;
  const subHref = (c, s) => s.href || `#/services/${c.id}/${s.id}`;
  const askHref = (c, s) => `#/enquire/${c.id}${s ? '/' + s.id : ''}`;
  const subjectFor = (c, s) => `${s ? (SUBJ[s.id] || s.name) : SUBJ[c.id]} Enquiry`;
  const ALIAS = { 'legacy-sitecore-versions-xm-cloud': 'sitecore', 'sitecore-and-xm-cloud': 'sitecore', 'umbraco-cms': 'umbraco', 'cms-migration': 'umbraco/cms-to-umbraco-migration', 'headless-cms': 'sitecore/sitecoreai-migration', 'net-and-net-core-apps': 'custom-software/dotnet-applications', 'api-and-systems-integration': 'custom-software/api-integrations', 'ai-integration': 'ai/ai-integration', 'web-applications': 'custom-software/dotnet-applications', 'custom-web-software-built-for-your-business': 'custom-software', 'legacy-modernisation': 'custom-software/legacy-modernisation', 'support-and-maintenance': 'umbraco/umbraco-support', 'performance-and-accessibility': 'custom-software', 'cms-workflows-and-permissions': 'sitecore/sitecore-development', 'content-architecture': 'sitecore/sitecore-development', 'ai-qa-tool': '../ai-qa' };

  // home: service areas
  const pillars = $('#pillars');
  const pRow = (c, s) => `<a class="prow" href="${subHref(c, s)}"><b>${s.name}</b><span>${s.card}</span><i>→</i></a>`;
  pillars.innerHTML = `<div class="ptabs" role="tablist" aria-label="Service areas">${CATS.map((c, i) => `<button type="button" class="pt" role="tab" id="ptab-${i}" aria-controls="ppanel" aria-selected="${i === 0}" tabindex="${i ? -1 : 0}" data-i="${i}" title="${c.name}">${c.short}</button>`).join('')}</div><div class="ppanel" id="ppanel" role="tabpanel" aria-labelledby="ptab-0"></div>`;
  // Arrow keys, Home and End move between tabs (WAI-ARIA tabs pattern)
  const tabKeys = (list, go) => list.forEach((b, i) => b.addEventListener('keydown', (e) => { const n = { ArrowRight: i + 1, ArrowDown: i + 1, ArrowLeft: i - 1, ArrowUp: i - 1, Home: 0, End: list.length - 1 }[e.key]; if (n === undefined) return; e.preventDefault(); const k = (n + list.length) % list.length; go(k); list[k].focus(); }));
  const ptabs = [...pillars.querySelectorAll('.pt')];
  function showPillar(i) { const c = CATS[i]; ptabs.forEach((b, k) => { b.classList.toggle('on', k === i); b.setAttribute('aria-selected', k === i); b.tabIndex = k === i ? 0 : -1; }); $('#ppanel').setAttribute('aria-labelledby', 'ptab-' + i); $('#ppanel').innerHTML = `<p class="pd">${c.lede}</p>${c.subs.slice(0, 4).map((s) => pRow(c, s)).join('')}<a class="pall" href="${catHref(c)}">All ${c.short} services →</a>`; }
  ptabs.forEach((b) => b.addEventListener('click', () => showPillar(+b.dataset.i)));
  tabKeys(ptabs, showPillar);
  showPillar(0);

  // header: Services mega menu
  (() => {
    const nav = $('#nav');
    const dd = `<div class="nav-dd"><a href="#/services" class="ddt" aria-haspopup="true">Services <span class="car" aria-hidden="true">▾</span></a><div class="ddp" role="menu">${CATS.map((c) => `<div class="ddc"><a class="ddh" href="${catHref(c)}">${c.name}</a>${c.subs.map((s) => `<a class="dds" href="${subHref(c, s)}">${s.name}</a>`).join('')}</div>`).join('')}</div></div>`;
    const SOLM = [['#/cms', 'Websites & CMS', 'Content structure, workflows and CMS migration'], ['#/ai', 'AI integration', 'Add AI to your existing CMS or application'], ['#/integrations', 'Integrations & .NET', 'Connect your website, CRM, ERP and other systems'], ['#/ai-qa', 'AI QA tool', 'Automated website testing, in development']];
    const sd = `<div class="nav-dd"><a href="#/solutions" class="ddt" aria-haspopup="true">Solutions <span class="car" aria-hidden="true">▾</span></a><div class="ddp sm" role="menu">${SOLM.map(([h, t, d]) => `<a class="dsol" href="${h}"><b>${t}</b><span>${d}</span></a>`).join('')}<a class="dall" href="#/solutions">Common problems we solve →</a></div></div>`;
    const QUICK = ['umbraco', 'sitecore', 'custom-software', 'ai'].map((id) => [id, catBy(id).short]);
    const qd = QUICK.map(([id, label]) => { const c = catBy(id); return `<div class="nav-dd"><a href="${catHref(c)}" class="ddt" aria-haspopup="true">${label} <span class="car" aria-hidden="true">▾</span></a><div class="ddp sm qd" role="menu"><a class="ddh" href="${catHref(c)}">${c.name}</a>${c.subs.map((x) => `<a href="${subHref(c, x)}">${x.name}</a>`).join('')}</div></div>`; }).join('');
    nav.innerHTML = dd + qd + sd + '<a href="#/about">About</a>';
    nav.querySelectorAll('.nav-dd').forEach((box) => box.querySelectorAll('.ddp a').forEach((a) => a.addEventListener('click', () => { box.classList.add('shut'); setTimeout(() => box.classList.remove('shut'), 400); a.blur(); })));
    const mnav = $('#mnav'), burger = $('#burger'), scrim = $('#mscrim');
    mnav.innerHTML = `<div class="mn-top"><span>Menu</span><button type="button" class="mn-x" aria-label="Close menu">×</button></div>
      <div class="mn-body"><a class="mn-l" href="#/">Home</a>
      <details class="mn-g"><summary>Services</summary><a class="mn-all" href="#/services">All services →</a>${CATS.map((c) => `<details class="mn-c"><summary>${c.name}</summary><a href="${catHref(c)}">Overview</a>${c.subs.map((x) => `<a href="${subHref(c, x)}">${x.name}</a>`).join('')}</details>`).join('')}</details>
      <details class="mn-g"><summary>Solutions</summary><a class="mn-all" href="#/solutions">Common problems we solve →</a>${SOLM.map(([h, t]) => `<a href="${h}">${t}</a>`).join('')}</details>
      ${['umbraco', 'sitecore', 'custom-software', 'ai'].map((id) => [id, catBy(id).short]).map(([id, label]) => { const c = catBy(id); return `<details class="mn-g"><summary>${label}</summary><a class="mn-all" href="${catHref(c)}">${c.name} →</a>${c.subs.map((x) => `<a href="${subHref(c, x)}">${x.name}</a>`).join('')}</details>`; }).join('')}
      <a class="mn-l" href="#/about">About</a></div>
      <div class="mn-foot"><a class="btn pri" href="#/contact">Let's talk <span aria-hidden="true">→</span></a><a href="mailto:enquiries@websitesoft.co.uk">enquiries@websitesoft.co.uk</a><a href="https://wa.me/447552247128?text=I%27d%20like%20a%20free%20consultation%2C%20what%20are%20my%20options%3F" target="_blank" rel="noopener">WhatsApp us ↗</a></div>`;
    const setMenu = (open) => { document.body.classList.toggle('mn-open', open); mnav.setAttribute('aria-hidden', !open); burger.setAttribute('aria-expanded', open); burger.setAttribute('aria-label', open ? 'Close menu' : 'Open menu'); scrim.hidden = !open; if (open) mnav.querySelector('.mn-x').focus(); };
    burger.addEventListener('click', () => setMenu(!document.body.classList.contains('mn-open')));
    scrim.addEventListener('click', () => setMenu(false));
    mnav.querySelector('.mn-x').addEventListener('click', () => { setMenu(false); burger.focus(); });
    mnav.addEventListener('click', (e) => { if (e.target.closest('a')) setMenu(false); });
    addEventListener('keydown', (e) => { if (e.key === 'Escape' && document.body.classList.contains('mn-open')) { setMenu(false); burger.focus(); } });
    addEventListener('resize', () => { if (innerWidth > 1240 && document.body.classList.contains('mn-open')) setMenu(false); });
  })();

  // ---------- pages (hash routes) ----------
  const A = (h, t, c = 'sec') => `<a class="btn ${c}" href="${h}">${t}</a>`;
  const ALT = {
    'code-screen': 'Code on a laptop screen in a dark room', kanban: 'A project board with task cards', 'whiteboard-team': 'A team planning work together at a whiteboard',
    'laptops-table': 'Open laptops on a shared table during a working session', 'meeting-table': 'People talking around a meeting table', 'sunlit-meeting': 'A small group in discussion in a sunlit room',
    'team-whiteboard': 'Colleagues sketching a plan on a whiteboard', 'whiteboard-pair': 'Two people working through a diagram on a whiteboard', 'team-desks': 'An open-plan office with people working at desks',
    'pair-coding': 'Two developers looking at code on one screen', 'office-desk': 'A tidy desk with a monitor and a notebook', 'coding-plant': 'A laptop showing code next to a plant',
  };
  const fig = (n, v, cap) => `<figure class="ph ${v}"><span class="hud"></span><img src="${IMGS[n]}" alt="${ALT[n] || cap}" loading="lazy" decoding="async"><figcaption>${cap}</figcaption></figure>`;
  const shortT = (t) => { if (t.length <= 26) return t; const cut = t.slice(0, 24); return cut.slice(0, cut.lastIndexOf(' ') > 10 ? cut.lastIndexOf(' ') : 24).replace(/[ ,&]+$/, '') + '…'; };
  const crumb = (...x) => `<nav class="crumb" aria-label="Breadcrumb"><a href="#/">Home</a>${x.map(([h, t]) => h ? `<span>/</span><a href="${h}" title="${t}">${shortT(t)}</a>` : `<span>/</span><span aria-current="page" title="${t}">${shortT(t)}</span>`).join('')}</nav>`;
  const hero = (cr, k, h1, lede, acts, f) => `<div class="pg-hero${f ? '' : ' solo'}"><div>${cr}<h1 style="margin-top:26px">${h1}</h1><p class="lede">${lede}</p><div class="acts">${acts}</div></div>${f || ''}</div>`;
  const sec = (k, h, lede, body) => `<section class="ps"><span class="kicker"><i></i>${k}</span><h2>${h}</h2>${lede ? `<p class="lede">${lede}</p>` : ''}${body}</section>`;
  const cards = (arr, cols = 3, num = true) => `<div class="g${cols}">${arr.map(([t, p, href], i) => `<${href ? `a href="${href}"` : 'div'} class="card"><h3>${t}</h3><p>${p}</p>${href ? '<span class="go">Read more →</span>' : ''}</${href ? 'a' : 'div'}>`).join('')}</div>`;
  let tabSeq = 0;
  const tabs = (items) => { const id = 'tabs' + (++tabSeq); return `<div class="tabs" data-tabs><div class="tbar" role="tablist">${items.map(([k], i) => `<button type="button" class="tb${i ? '' : ' on'}" role="tab" id="${id}-t${i}" aria-controls="${id}-p${i}" aria-selected="${!i}" tabindex="${i ? -1 : 0}" data-t="${i}">${k}</button>`).join('')}</div>${items.map(([, b], i) => `<div class="tp" role="tabpanel" id="${id}-p${i}" aria-labelledby="${id}-t${i}"${i ? ' hidden' : ''}>${b}</div>`).join('')}</div>`; };
  const flow = (arr) => `<div class="flow">${arr.map((x, i) => `${i ? '<i>→</i>' : ''}<span>${x}</span>`).join('')}</div>`;
  const ul = (arr, bad) => `<ul class="ul2${bad ? ' bad' : ''}">${arr.map((x) => `<li>${x}</li>`).join('')}</ul>`;
  const chips = (arr) => `<div class="chips">${arr.map((x) => `<span>${x}</span>`).join('')}</div>`;
  const ctam = (h, href, label, p = 'Goes straight to our engineers. No obligation.') => `<section class="ctam"><div><h2>${h}</h2><p>${p}</p></div><a class="btn pri" href="${href}">${label.replace(/ →$/, '')} <span aria-hidden="true">→</span></a></section>`;
  const cta = (h = 'Tell us what you want to improve.', p, href = '#/contact', label = 'Get a Free Initial Consultation') => ctam(h, href, label, p);
  const ENQ_TO = 'enquiries@websitesoft.co.uk';
  const UTM = Object.fromEntries([...new URLSearchParams(location.search)].filter(([k]) => /^utm_/.test(k)).map(([k, v]) => [k, v.slice(0, 80)]));
  const utmFields = () => (Object.keys(UTM).length ? { Source: Object.entries(UTM).map(([k, v]) => `${k.slice(4)}=${v}`).join(' ') } : {});
  const CFG = (n) => (document.querySelector(`meta[name="${n}"]`) || {}).content || '';
  const API = CFG('ws-api-base').replace(/\/$/, '') + '/api';
  const TS_KEY = CFG('ws-turnstile-sitekey');
  // One probe per page load. A truthy result means the Cloudflare Worker (workers/enquiry) is live: forms post to
  // /api/enquiry and events are recorded. Anything else means "static site": forms go straight to FormSubmit.
  const withTimeout = (ms) => { const c = new AbortController(); setTimeout(() => c.abort(), ms); return c.signal; };
  const apiReady = (() => { try { return fetch(API + '/health', { signal: withTimeout(2500) }).then((r) => (r.ok && (r.headers.get('content-type') || '').includes('json') ? r.json() : false)).catch(() => false); } catch (e) { return Promise.resolve(false); } })();
  const track = (name, data) => { if (window.gtag && ga4Loaded) { try { gtag('event', name, data || {}); } catch (e) {} } apiReady.then((api) => { if (!api) return; try { navigator.sendBeacon(API + '/event', new Blob([JSON.stringify({ name, page: location.pathname + location.hash, data: data || {} })], { type: 'application/json' })); } catch (e) { /* beacon is best effort */ } }); };
  // ---------- analytics and consent ----------
  // Cloudflare Web Analytics: cookieless, no personal data, no consent needed. On only when the token meta is set.
  const CF_TOKEN = CFG('ws-cf-analytics-token'), GA4 = CFG('ws-ga4-id');
  if (CF_TOKEN && !IS_PREVIEW) { const sc = document.createElement('script'); sc.defer = true; sc.src = 'https://static.cloudflareinsights.com/beacon.min.js'; sc.setAttribute('data-cf-beacon', JSON.stringify({ token: CF_TOKEN })); document.head.appendChild(sc); }
  // Consent manager for tags that set cookies (GA4). Nothing loads before an explicit "Accept"; "Reject" has equal weight;
  // the choice is kept in localStorage (strictly necessary) and can be changed from the footer link that appears with it.
  const CONSENT_KEY = 'ws-consent';
  const readConsent = () => { try { return localStorage.getItem(CONSENT_KEY) || ''; } catch (e) { return ''; } };
  let ga4Loaded = false;
  const loadGa4 = () => { if (ga4Loaded || !GA4) return; ga4Loaded = true; window.dataLayer = window.dataLayer || []; window.gtag = function () { dataLayer.push(arguments); }; gtag('consent', 'default', { ad_storage: 'denied', ad_user_data: 'denied', ad_personalization: 'denied', analytics_storage: 'granted' }); gtag('js', new Date()); gtag('config', GA4, { anonymize_ip: true }); const sc = document.createElement('script'); sc.async = true; sc.src = 'https://www.googletagmanager.com/gtag/js?id=' + GA4; document.head.appendChild(sc); };
  const showConsent = () => { if ($('#consent')) return; const el = document.createElement('div'); el.id = 'consent'; el.className = 'consent'; el.setAttribute('role', 'dialog'); el.setAttribute('aria-label', 'Cookies'); el.innerHTML = `<p>We would like to use Google Analytics to understand how this site is used. It sets cookies. You can accept or reject; the site works the same either way. See our <a href="#/privacy">Privacy Statement</a>.</p><div class="acts"><button type="button" class="btn pri" data-c="accept">Accept analytics cookies</button><button type="button" class="btn sec" data-c="reject">Reject</button></div>`; linkPaths(el); el.addEventListener('click', (e) => { const b = e.target.closest('[data-c]'); if (!b) return; try { localStorage.setItem(CONSENT_KEY, b.dataset.c); } catch (x) { /* storage blocked: treat as session-only */ } el.remove(); if (b.dataset.c === 'accept') loadGa4(); track('consent', { choice: b.dataset.c }); }); document.body.appendChild(el); el.querySelector('[data-c=reject]').focus(); };
  if (GA4 && !IS_PREVIEW) { const c = readConsent(); if (c === 'accept') loadGa4(); else if (!c) setTimeout(showConsent, 800); const nav = document.querySelector('.fbar nav'); if (nav) { const a = document.createElement('a'); a.href = '#'; a.textContent = 'Cookie settings'; a.addEventListener('click', (e) => { e.preventDefault(); try { localStorage.removeItem(CONSENT_KEY); } catch (x) {} showConsent(); }); nav.appendChild(a); } }
  // Site events: enquiry_sent/enquiry_handoff/enquiry_blocked (forms), page_view (route changes), contact clicks, js_error
  document.addEventListener('click', (e) => { const a = e.target.closest('a[href]'); if (!a) return; const h = a.getAttribute('href') || ''; if (h.startsWith('https://wa.me')) track('whatsapp_click'); else if (h.startsWith('mailto:')) track('email_click'); else if (h.includes('linkedin.com')) track('linkedin_click'); });
  let errCount = 0; const onErr = (msg, src) => { if (errCount++ < 3) track('js_error', { msg: String(msg).slice(0, 160), src: String(src || '').slice(0, 120) }); };
  addEventListener('error', (e) => onErr(e.message, e.filename + ':' + e.lineno)); addEventListener('unhandledrejection', (e) => onErr(e.reason && e.reason.message || e.reason, 'promise'));
  // Turnstile in managed mode: invisible for most visitors, a challenge only when Cloudflare is unsure. Loaded only when a form is shown and a site key exists.
  let tsLoad = null;
  const turnstileReady = () => { if (!TS_KEY) return Promise.resolve(false); if (!tsLoad) tsLoad = new Promise((res) => { const sc = document.createElement('script'); sc.src = 'https://challenges.cloudflare.com/turnstile/v0/api.js?render=explicit'; sc.async = true; sc.onload = () => res(!!window.turnstile); sc.onerror = () => res(false); document.head.appendChild(sc); }); return tsLoad; };
  const mountTurnstile = async (form) => { form.dataset.t0 = Date.now(); if (!(await turnstileReady())) return; const box = form.querySelector('.ts'); if (!box || box.dataset.id) return; box.dataset.id = turnstile.render(box, { sitekey: TS_KEY, appearance: 'interaction-only', action: 'enquiry', 'expired-callback': () => turnstile.reset(box.dataset.id), 'error-callback': () => {} }); };
  const tsToken = (form) => { const box = form.querySelector('.ts'); return box && box.dataset.id && window.turnstile ? turnstile.getResponse(box.dataset.id) || '' : ''; };
  // Managed mode usually finishes silently within a second or two; when Cloudflare wants a click, the widget is visible and we wait for it.
  const tsWait = (form, ms) => new Promise((res) => { const t0 = Date.now(); const tick = () => { const t = tsToken(form); if (t || Date.now() - t0 > ms) return res(t); setTimeout(tick, 250); }; tick(); });
  const tsReset = (form) => { const box = form.querySelector('.ts'); if (box && box.dataset.id && window.turnstile) turnstile.reset(box.dataset.id); };
  // Sends the form to the enquiries inbox through FormSubmit (https://formsubmit.co). The first ever submission
  // triggers a one-time activation email to the inbox; after that every enquiry arrives as an email.
  // The claude.ai preview runs the page in a locked-down frame: it cannot reach outside services, and links that
  // leave the page must open in a new tab. The deployed site sends directly; the preview hands off to the visitor's email.
  const IS_PREVIEW = /claudeusercontent\.com$|claude\.ai$/.test(location.hostname);
  const mailUrls = (subject, body) => {
    const q = (o) => Object.entries(o).map(([k, v]) => `${k}=${encodeURIComponent(v)}`).join('&');
    return {
      app: `mailto:${ENQ_TO}?${q({ subject, body })}`,
      gmail: `https://mail.google.com/mail/?view=cm&fs=1&${q({ to: ENQ_TO, su: subject, body })}`,
      outlook: `https://outlook.office.com/mail/deeplink/compose?${q({ to: ENQ_TO, subject, body })}`,
    };
  };
  async function sendEnquiry(form, fields, subject) {
    const btn = form.querySelector('button[type=submit]'), st = form.querySelector('.fstat');
    const show = (cls, html) => { st.className = 'fstat ' + cls; st.innerHTML = html; st.hidden = false; st.scrollIntoView({ block: 'nearest', behavior: 'smooth' }); };
    if (form.querySelector('[name=_honey]').value) return;
    Object.assign(fields, utmFields());
    const body = Object.entries(fields).filter(([k]) => !k.startsWith('_')).map(([k, v]) => `${k}: ${v}`).join('\n');
    const handOff = (opened, failed) => {
      const u = mailUrls(subject, body);
      show('hand', `${failed ? '<b>Sorry, we could not send that automatically.</b> ' : ''}<b>Your enquiry is ready to send.</b> It is addressed to enquiries@websitesoft.co.uk with all your details filled in. Choose your email, then press Send:<span class="mopts"><a href="${u.gmail}" target="_blank" rel="noopener">Send with Gmail</a><a href="${u.outlook}" target="_blank" rel="noopener">Send with Outlook</a>${IS_PREVIEW ? '' : `<a href="${u.app}">Email app</a>`}</span>`);
    };
    if (IS_PREVIEW) { handOff(false); return; }
    btn.disabled = true; btn.dataset.t = btn.dataset.t || btn.innerHTML; btn.innerHTML = 'Sending…';
    const reset = () => { btn.disabled = false; btn.innerHTML = btn.dataset.t; };
    const done = () => { form.querySelectorAll('input:not([type=hidden]),textarea,select').forEach((x) => (x.disabled = true)); btn.innerHTML = 'Sent ✓'; show('ok', `<b>Thank you, ${fields.Name.split(' ')[0]}.</b> Your enquiry has been sent to our engineers. We usually reply within one working day.`); track('enquiry_sent', { page: fields.Page || '' }); };
    try {
      const api = await apiReady;
      if (api) {
        // The Worker verifies the Turnstile token, drops automated junk and relays to the inbox.
        let tok = tsToken(form);
        if (TS_KEY && window.turnstile && !tok) { btn.innerHTML = 'Checking…'; tok = await tsWait(form, 12000); }
        if (TS_KEY && window.turnstile && !tok) { reset(); const box = form.querySelector('.ts'); if (box) box.scrollIntoView({ block: 'center', behavior: 'smooth' }); show('err', '<b>Please complete the security check</b> shown above the button, then press Submit again.'); return; }
        const meta = { _subject: subject, _t: Date.now() - (+form.dataset.t0 || Date.now()), _honey: form.querySelector('[name=_honey]').value, _turnstile: tok };
        const r = await fetch(API + '/enquiry', { method: 'POST', headers: { 'Content-Type': 'application/json', Accept: 'application/json' }, body: JSON.stringify(Object.assign(meta, fields)) });
        const j = await r.json().catch(() => ({}));
        if (r.ok && j.ok) { done(); return; }
        if (j.challenge || r.status === 429) { reset(); tsReset(form); show('err', `<b>${j.error}</b>`); track('enquiry_blocked', { status: r.status }); return; }
        throw new Error(j.error || 'api failed');
      }
      const r = await fetch('https://formsubmit.co/ajax/' + ENQ_TO, { method: 'POST', headers: { 'Content-Type': 'application/json', Accept: 'application/json' }, body: JSON.stringify(Object.assign({ _subject: subject, _template: 'table', _captcha: 'false' }, fields)) });
      const j = await r.json().catch(() => ({}));
      if (!r.ok || j.success === false || j.success === 'false') throw new Error(j.message || 'send failed');
      done();
    } catch (e) {
      reset();
      track('enquiry_handoff', { reason: String(e && e.message).slice(0, 60) });
      handOff(false, true);
    }
  }
  const honey = '<label class="hp">Leave this field empty<input type="text" name="_honey" tabindex="-1" autocomplete="off"></label>';
  if (IS_PREVIEW) document.addEventListener('click', (e) => {
    const a = e.target.closest('a[href^="mailto:"]'); const pop = $('#mpop');
    if (!a) { if (pop && !e.target.closest('#mpop')) pop.remove(); return; }
    e.preventDefault(); if (pop) pop.remove();
    const u = mailUrls('Website enquiry', '');
    const el = document.createElement('div'); el.id = 'mpop'; el.setAttribute('role', 'dialog'); el.setAttribute('aria-label', 'Email us');
    el.innerHTML = `<b>Email ${ENQ_TO}</b><a href="${u.gmail}" target="_blank" rel="noopener">Open in Gmail</a><a href="${u.outlook}" target="_blank" rel="noopener">Open in Outlook</a>`;
    document.body.appendChild(el); const r = a.getBoundingClientRect(); const w = el.offsetWidth, h = el.offsetHeight;
    el.style.left = Math.max(12, Math.min(innerWidth - w - 12, r.left)) + 'px'; el.style.top = (r.bottom + h + 10 < innerHeight ? r.bottom + 8 : r.top - h - 8) + 'px';
    el.querySelectorAll('a').forEach((x) => x.addEventListener('click', () => setTimeout(() => el.remove(), 50)));
  });
  addEventListener('scroll', () => { const p = $('#mpop'); if (p) p.remove(); }, { passive: true });
  function toast(t) { let el = $('#toast'); if (!el) { el = document.createElement('div'); el.id = 'toast'; el.setAttribute('role', 'status'); document.body.appendChild(el); } el.textContent = t; el.classList.add('on'); clearTimeout(el._t); el._t = setTimeout(() => el.classList.remove('on'), 2200); }

  const P = {};
  const svcCrumb = (c, s, extra) => crumb(['#/services', 'Services'], ...(c ? [[s || extra ? catHref(c) : 0, c.name]] : []), ...(s ? [[extra ? subHref(c, s) : 0, s.name]] : []), ...(extra ? [[0, extra]] : []));
  const subNav = (c, cur) => `<nav class="subnav" aria-label="${c.name}"><span class="sn-k">In ${c.name}</span><div class="sn-l"><a href="${catHref(c)}"${cur ? '' : ' aria-current="page" class="on"'}>Overview</a>${c.subs.map((s) => `<a href="${subHref(c, s)}"${cur === s.id ? ' aria-current="page" class="on"' : ''}>${s.name}</a>`).join('')}</div></nav>`;
  const steps6 = (arr) => `<ol class="st6">${STAGES.map((st, i) => `<li><b>${st}</b><span>${arr[i]}</span></li>`).join('')}</ol>`;
  const glance = (s) => `<div class="glance"><div><h3>The challenge</h3>${ul(s.challenge, 1)}</div><div><h3>What we do</h3>${ul(s.help)}</div><div><h3>What you get</h3>${ul(s.get)}</div></div>`;
  // AEO: a direct-answer paragraph a search or answer engine can quote, and question-led FAQs with FAQPage schema (see pageLd)
  const answerBlock = (x) => (x.answer ? `<section class="ps ans-wrap"><p class="ans">${x.answer}</p></section>` : '');
  const faqBlock = (x, name) => (x.faq && x.faq.length ? `<section class="ps faq pg-faq"><span class="kicker"><i></i>Questions</span><h2>Questions about ${name}</h2>${x.faq.map(([q, a]) => `<details><summary>${q}</summary><p>${a}</p></details>`).join('')}</section>` : '');
  // GEO demo: visitors ask in their own words; the Worker answers from this site's own content only (/api/ask). Hidden until the backend says ask is on.
  const askPanel = (topic) => `<section class="ps ask" data-ask hidden><span class="kicker"><i></i>Ask</span><h2>Ask about ${topic}</h2><p class="lede">Type a question and get a short answer drawn only from this website, with the page that covers it. It is an AI summary of our own content, so check anything important with us.</p><form class="askf"><label class="hp">Leave this field empty<input type="text" name="_honey" tabindex="-1" autocomplete="off"></label><input name="q" maxlength="300" required placeholder="e.g. How long does an Umbraco upgrade take?" autocomplete="off"><button class="btn pri" type="submit">Ask</button></form><div class="ask-out" aria-live="polite" hidden></div></section>`;
  const wireAsk = (root) => root.querySelectorAll('[data-ask]').forEach((sec) => { apiReady.then((api) => { if (!api || !api.ask) return; sec.hidden = false; const f = sec.querySelector('form'), out = sec.querySelector('.ask-out'), btn = f.querySelector('button'); f.addEventListener('submit', async (e) => { e.preventDefault(); if (f.querySelector('[name=_honey]').value) return; const q = f.q.value.trim(); if (q.length < 3) return; btn.disabled = true; btn.textContent = 'Thinking…'; out.hidden = false; out.innerHTML = '<p class="ask-wait">Reading the site…</p>'; try { const r = await fetch(API + '/ask', { method: 'POST', headers: { 'Content-Type': 'application/json', Accept: 'application/json' }, body: JSON.stringify({ question: q, page: location.pathname }) }); const j = await r.json().catch(() => ({})); if (!r.ok) throw new Error(j.error || 'failed'); out.innerHTML = `<p class="ask-a">${j.answer.replace(/[<>&]/g, (ch) => ({ '<': '&lt;', '>': '&gt;', '&': '&amp;' })[ch])}</p>${j.more ? `<a class="tlink" href="${j.more.replace(/"/g, '')}">Read more →</a>` : ''}<small>AI answer from this website's content. Not advice; ask us to confirm.</small>`; linkPaths(out); track('ask_answered'); } catch (err) { out.innerHTML = `<p class="ask-a">Sorry, that did not work. Email <a href="mailto:${ENQ_TO}">${ENQ_TO}</a> and we will answer in person.</p>`; } btn.disabled = false; btn.textContent = 'Ask'; }); }); });
  const svcCard = (c, s) => `<a class="card" href="${subHref(c, s)}"><h3 style="margin-top:0">${s.name}</h3><p>${s.card}</p></a>`;

  const vz = (bar, body, foot) => `<div class="vz" aria-hidden="true"><div class="vz-b"><i></i><i></i><i></i><span>${bar}</span><em>Illustration</em></div><div class="vz-in">${body}</div>${foot ? `<div class="vz-f">${foot}</div>` : ''}</div>`;
  const vrow = (a, b, c = '') => `<div class="vr"><span>${a}</span><b>${b}</b>${c ? `<em>${c}</em>` : ''}</div>`;
  const vstep = (arr, on) => `<div class="vflow">${arr.map((x, i) => `<span class="${i < on ? 'done' : i === on ? 'on' : ''}">${x}</span>`).join('<i>→</i>')}</div>`;
  const VIZ = {
    'umbraco-upgrades': vz('umbraco · upgrade plan', `<div class="vpath"><div><small>Today</small><b>Umbraco 7, 8 or 13</b><span>Out of support or ending Dec 2026</span></div><i>→</i><div class="new"><small>After</small><b>Umbraco 17 LTS</b><span>.NET 10 · supported</span></div></div>${vrow('Packages audited', '✓')}${vrow('Content and media migrated', '✓')}${vrow('Custom editors rebuilt', '✓')}${vrow('Redirects live', '✓')}`),
    'sitecore-to-umbraco-migration': vz('migration map · sitecore → umbraco', `<div class="vmap"><b>Sitecore</b><b>Umbraco</b>${[['Article Page template', 'Article document type'], ['Hero rendering', 'Hero block'], ['Workflow', 'Approval flow'], ['Media Library', 'Media section'], ['Custom .NET modules', '.NET services']].map(([a, b]) => `<span>${a}</span><span>${b}</span>`).join('')}</div>`, 'Every template mapped before anything moves'),
    'cms-to-umbraco-migration': vz('redirects.csv · 301', `<div class="vtab">${[['/2019/05/our-news', '/news/our-news'], ['/?p=1432', '/services/support'], ['/category/case-studies', '/work'], ['/wp-content/uploads/brochure.pdf', '/media/brochure.pdf']].map(([a, b]) => `<div><code>${a}</code><i>→</i><code>${b}</code><em>301</em></div>`).join('')}</div>`, 'Every changed URL redirected, rankings kept'),
    'umbraco-development': vz('backoffice · Home page', `<div class="ved"><label>Headline<span>Software that stays built.</span></label><label>Hero image<span class="img"></span></label><label>Blocks<span class="blk"><i>Hero</i><i>Card list</i><i>Form</i><i>+ Add</i></span></label><div class="pub"><span>Saved</span><b>Save and publish</b></div></div>`, 'Editors publish without a ticket'),
    'umbraco-support': vz('support · this month', `<div class="vkpi"><div><b>99.9%</b><span>Uptime</span></div><div><b>2</b><span>Security patches applied</span></div><div><b>0</b><span>Open issues</span></div></div>${vrow('Umbraco and package updates', 'Done')}${vrow('Error and uptime monitoring', 'Live')}${vrow('Next major upgrade', 'Planned')}`),
    'sitecoreai-migration': vz('architecture · after migration', `<div class="varch"><div class="old">Sitecore XP / XM<span>MVC renderings, servers to patch</span></div><i>↓</i><div class="row3"><div>Next.js front end<span>Headless</span></div><div class="hub">SitecoreAI<span>SaaS, always current</span></div><div>Edge delivery<span>Fast everywhere</span></div></div></div>`, 'No more major version upgrades'),
    'sitecore-development': vz('content item · Pricing page', `${vstep(['Draft', 'Review', 'Approve', 'Publish'], 2)}${vrow('Template', 'Pricing Page')}${vrow('Components', 'Hero · Plans · FAQ')}${vrow('Waiting on', 'Legal sign-off', '1 of 2')}`, 'Roles and approvals built in'),
    'sitecore-upgrades': vz('sitecore · options', `<div class="vopt">${[['Upgrade in place', 'Latest supported XP / XM'], ['Move to SitecoreAI', 'SaaS, headless'], ['Move to Umbraco', 'Lower running costs']].map(([a, b], i) => `<div class="${i ? '' : 'on'}"><b>${a}</b><span>${b}</span></div>`).join('')}</div>${vrow('Current version', 'Sitecore 9.x')}${vrow('Blocking modules', '3 found')}${vrow('Recommendation', 'Phased upgrade')}`),
    'optimizely-development': vz('optimizely · block library', `<div class="vblocks">${['Hero', 'Feature grid', 'Quote', 'Form', 'Product list', 'CTA banner'].map((b) => `<span>${b}</span>`).join('')}</div>${vrow('Editor role', 'Create and edit')}${vrow('Publisher role', 'Approve and publish')}`, 'Reusable blocks, safe publishing'),
    'optimizely-integrations': vz('optimizely · connected systems', `<div class="vhub"><span>CRM</span><span>ERP</span><b>Optimizely</b><span>PIM</span><span>Analytics</span></div>${vrow('Product data', 'Synced', '2 min ago')}${vrow('Form leads', 'Sent to CRM', 'live')}`, 'Data entered once, used everywhere'),
    'optimizely-migration': vz('upgrade · CMS 11 or 12 → CMS 13', `<div class="vpath"><div><small>Today</small><b>CMS 11 / 12</b><span>.NET Framework or .NET 6–8</span></div><i>→</i><div class="new"><small>After</small><b>CMS 13</b><span>.NET 10 · Optimizely Graph</span></div></div>${vrow('Opti ID sign-in', '✓')}${vrow('Search moved to Graph', '✓')}${vrow('SEO and redirects', '✓')}`),
    'dotnet-applications': vz('orders app', `<div class="vapp"><div class="k"><b>128</b><span>Orders this week</span></div><div class="k"><b>6</b><span>Awaiting approval</span></div></div>${vrow('Order #1042', 'Approved')}${vrow('Order #1043', 'Awaiting approval')}${vrow('Order #1044', 'Dispatched')}`, 'One app instead of spreadsheets and email'),
    'api-integrations': vz('integration log', `<div class="vlog">${[['POST', '/api/leads', '201', 'CRM'], ['PUT', '/stock/sku-114', '200', 'ERP'], ['POST', '/invoices', 'retry 1', 'Finance'], ['POST', '/invoices', '201', 'Finance']].map(([m, u, c, t]) => `<div><b>${m}</b><code>${u}</code><em class="${c.startsWith('retry') ? 'w' : ''}">${c}</em><span>→ ${t}</span></div>`).join('')}</div>`, 'Retries and alerts built in'),
    'legacy-modernisation': vz('modernisation · by module', `<div class="vmods">${[['Billing', 100, 'Modern .NET'], ['Customers', 100, 'Modern .NET'], ['Reports', 60, 'In progress'], ['Admin', 0, 'Legacy, next']].map(([n, v, t]) => `<div><span>${n}</span><i style="--v:${v}%"></i><em>${t}</em></div>`).join('')}</div>`, 'The business keeps running throughout'),
    'ai-integration': vz('assistant · intranet', `<div class="chat"><div class="u">What is our returns policy for trade customers?</div><div class="b">Trade customers can return unopened stock within <b>30 days</b>. Opened items need approval from the account manager.<small>Source: Trade terms 2026, section 4</small></div></div>`, 'Answers from your approved content'),
    'ai-search': vz('site search', `<div class="vsearch"><div class="q">homes for a growing family</div>${[['4-bed house near two primary schools', 'meaning'], ['3-bed semi with garden, quiet street', 'meaning'], ['Family homes guide', 'keyword']].map(([t, m]) => `<div class="r"><b>${t}</b><em>${m === 'meaning' ? 'matched on meaning' : 'matched on keyword'}</em></div>`).join('')}</div>`, 'Finds what people mean, not just the words'),
    'document-automation': vz('invoice_0418.pdf', `${vrow('Supplier', 'Example Supplier Ltd', '99%')}${vrow('Invoice number', 'INV-0418', '99%')}${vrow('PO reference', 'PO-7731', '97%')}${vrow('Due date', '12 Nov 2026', '71%')}<div class="vflag">Due date unclear: sent to a person to check</div>`, 'People review anything uncertain'),
  };
  const FMT = { 'umbraco-upgrades': 'path', 'sitecore-to-umbraco-migration': 'ba', 'cms-to-umbraco-migration': 'lst', 'umbraco-development': 'glance', 'umbraco-support': 'checks', 'sitecoreai-migration': 'path', 'sitecore-development': 'glance', 'sitecore-upgrades': 'opts', 'optimizely-development': 'lst', 'optimizely-integrations': 'ba', 'optimizely-migration': 'path', 'dotnet-applications': 'ba', 'api-integrations': 'glance', 'legacy-modernisation': 'path', 'ai-integration': 'lst', 'ai-search': 'ba', 'document-automation': 'checks' };
  const fmtBody = (c, s) => {
    const f = FMT[s.id] || 'glance';
    if (f === 'ba') return `<div class="ba"><div><span class="tag bad">Today</span>${ul(s.challenge, 1)}</div><div class="arr" aria-hidden="true">→</div><div><span class="tag">With WebsiteSoft</span><ul class="ul2 ok">${s.get.map((x) => `<li>${x}</li>`).join('')}</ul></div></div><div class="how1"><h3>How we get you there</h3>${chips(s.help)}</div>`;
    if (f === 'lst') return `<div class="lst"><div><span class="kicker"><i></i>What we do</span><ol class="big">${s.help.map((x) => `<li>${x}</li>`).join('')}</ol></div><aside><div><h3>Why it matters</h3>${ul(s.challenge, 1)}</div><div><h3>The result</h3><ul class="ul2 ok">${s.get.map((x) => `<li>${x}</li>`).join('')}</ul></div></aside></div>`;
    if (f === 'path') return `<span class="kicker"><i></i>The route</span><div class="route">${s.help.map((x, i) => `<div><b>${['Assess', 'Prepare', 'Move', 'Protect'][i] || 'Step'}</b><span>${x}</span></div>`).join('')}</div><div class="two slim"><div><h3>Why now</h3>${ul(s.challenge, 1)}</div><div><h3>What you get</h3><ul class="ul2 ok">${s.get.map((x) => `<li>${x}</li>`).join('')}</ul></div></div>`;
    if (f === 'checks') return `<div class="checks2"><div class="lead"><span class="kicker"><i></i>What's included</span><p>${s.challenge[0]}. We take that off your plate.</p></div><ul>${s.help.concat(s.get).map((x) => `<li>${x}</li>`).join('')}</ul></div>`;
    if (f === 'opts') { const sc = catBy('sitecore'), um = catBy('umbraco'); return `<span class="kicker"><i></i>Your options</span><div class="opts"><div class="card"><h3>Upgrade in place</h3><p>Stay on Sitecore XP or XM, on a supported version. Best when the platform still fits.</p></div><a class="card" href="${subHref(sc, subBy(sc, 'sitecoreai-migration'))}"><h3>Move to SitecoreAI</h3><p>SaaS and headless, with no more major upgrades.</p></a><a class="card" href="${subHref(um, subBy(um, 'sitecore-to-umbraco-migration'))}"><h3>Move to Umbraco</h3><p>Much lower running costs, same .NET skills.</p></a></div><div class="two slim"><div><h3>What we do</h3>${ul(s.help)}</div><div><h3>What you get</h3><ul class="ul2 ok">${s.get.map((x) => `<li>${x}</li>`).join('')}</ul></div></div>`; }
    return glance(s);
  };
  const nextBand = (href, label, h, p) => ctam(h, href, label, p);
  const askBand = (c, s, h, p) => nextBand(askHref(c, s), s ? s.cta : c.cta, h, p);
  const GENERIC = ['Goals, systems and what success looks like', 'Review what you have today', 'Approach, scope, risks and plan', 'Short iterations, peer-reviewed code', 'Functionality, performance, security, data', 'Go live, handover, ongoing support'];

  P.services = () => ({ t: 'Services', h: `<div class="pg"><div class="wrap">${hero(crumb([0, 'Services']), 'Services', 'Everything we build, <span class="grad">under one roof.</span>', 'Umbraco, Sitecore and Optimizely development and migration, custom .NET software and practical AI.', A('#/contact', 'Get a Free Initial Consultation →', 'pri') + A('#/solutions', 'See solutions'), fig('team-whiteboard', 'nat', 'Planning'))}
    ${CATS.map((c) => `<section class="ps svc-area"><div class="sa-h"><div><span class="kicker"><i></i>${c.short}</span><h2><a href="${catHref(c)}">${c.name}</a></h2></div><a class="tlink" href="${catHref(c)}">Overview →</a></div><div class="g${c.subs.length % 3 === 0 ? 3 : c.subs.length === 4 ? 4 : 3}">${c.subs.map((s) => svcCard(c, s)).join('')}</div></section>`).join('')}
    ${sec('How we work', 'Six stages, every project', '', steps6(GENERIC))}
    ${sec('Why WebsiteSoft', 'Why work with us', '', `<div class="g4 why4">${[['Since 2007', 'Web and software development for nearly two decades.'], ['Engineers, not sales', 'You talk to the people who do the work.'], ['Peer-reviewed code', 'A second developer checks every change before release.'], ['Honest advice', 'If you do not need a rebuild, we will say so.']].map(([t, p]) => `<div class="card"><h3>${t}</h3><p>${p}</p></div>`).join('')}</div>`)}
    ${ctam('Not sure which service you need?', '#/contact', 'Get a Free Initial Consultation', 'Tell us what you use today. We will suggest a practical way forward.')}</div></div>` });

  P.cat = (c) => ({ t: c.name, h: `<div class="pg"><div class="wrap">${hero(svcCrumb(c), c.name, c.h1, c.lede, A(askHref(c), c.cta + ' →', 'pri') + A('#/services', 'All services'), fig(c.img, 'nat', c.name))}
    ${answerBlock(c)}<section class="ps"><span class="kicker"><i></i>${c.short} services</span><div class="g${c.subs.length === 4 ? 2 : 3}" style="margin-top:20px">${c.subs.map((s) => svcCard(c, s)).join('')}</div></section>
    ${faqBlock(c, c.short)}${askPanel(c.short + ' services')}
    ${ctam(`Ready to talk about ${c.short}?`, askHref(c), c.cta)}</div></div>` });

  P.sub = (c, s) => ({ t: s.name, h: `<div class="pg"><div class="wrap">${hero(svcCrumb(c, s), c.name, s.name, s.card, A(askHref(c, s), s.cta + ' →', 'pri') + A(catHref(c), `All ${c.short} services`), VIZ[s.id] || fig(c.img, 'nat', s.name))}
    ${answerBlock(s)}${subNav(c, s.id)}
    <section class="ps fmt-${FMT[s.id] || 'glance'}">${fmtBody(c, s)}</section>
    ${faqBlock(s, s.name)}${askPanel(s.name)}
    ${ctam(`Let's talk about your ${SUBJ[s.id] || s.name} project`, askHref(c, s), s.cta)}</div></div>` });

  P.cms = () => ({ t: 'Websites & CMS', h: `<div class="pg"><div class="wrap">${hero(crumb(['#/solutions', 'Solutions'], [0, 'Websites & CMS']), 'Websites & CMS', 'A CMS your team <span class="grad">can actually use.</span>', '"Can you just change the text on that page?" should not take a week. We structure Sitecore, SitecoreAI and Umbraco so content sits apart from layout, and editors publish without raising a ticket.', A('#/enquire/umbraco', 'Get a Free Initial Consultation →', 'pri') + A('#/services/sitecore', 'Sitecore services') + A('#/services/umbraco', 'Umbraco services'), fig('whiteboard-pair', 'nat arch', 'Structuring content'))}
    ${tabs([
      ['Structure', `<h3 class="th">Scalable starts with structure, not pages</h3><p class="lede">Sites get hard to manage when content was never structured for growth. We plan four layers first.</p>${cards([['Templates', 'The blueprint: fields defined once, with base templates and standard values.'], ['Content items', 'Every item comes from a template, so editors work one way, with no copy and paste.'], ['Reusable components', 'Build once, use everywhere. One update shows on every page that uses it.'], ['Content tree', 'A clear hierarchy by site, section and language, ready for multisite growth.']], 4)}<p class="lede" style="margin-top:18px"><b>Quick check:</b> can your editors add a new page without asking a developer? If not, the structure needs attention.</p>`],
      ['Workflow', `<h3 class="th">Who can publish, and who signs off?</h3>${flow(['Draft: authors create, cannot publish', 'Review: editors check tone and brand', 'Approve: legal or marketing signs off', 'Publish: authorised publishers only'])}${cards([['Roles, not individuals', 'Access through CMS roles keeps setup simple as the team grows.'], ['Workflow matches risk', 'A blog post and a pricing page need different approval steps.'], ['Visible ownership', 'Every section of the content tree has an owner and an audit trail.']], 3, false)}<p class="lede" style="margin-top:18px">Built in Sitecore, SitecoreAI and Umbraco user groups, with optional email or Teams notifications and links to your CRM or asset library.</p>`],
      ['Who changes what', `<h3 class="th">One website, different teams</h3><p class="lede">Marketing, HR, product, support and legal all need to update the site. Without a clear workflow, one shared CMS becomes a bottleneck or a risk.</p><div class="two"><div><h3>Problems we are asked to fix</h3>${ul(['Everyone has full admin access', 'Important pages go live without review', 'Simple updates wait days for approval', 'Teams rely on developers for basic changes', 'No one knows who changed what, or when', 'Former staff or agencies still have access'], 1)}</div><div><h3>What you get instead</h3>${ul(['The right access for every team, and nothing more', 'Approvals that protect key content without slowing routine work', 'Multiple sites, brands or regions in one CMS', 'Headless delivery when content must reach several channels'])}</div></div>`],
      ['Migration', `<h3 class="th">CMS migration is not copying pages</h3>${cards([['"It is just copying pages"', 'Content must be mapped and restructured for the new platform.'], ['"The design stays, so it is quick"', 'Templates are CMS-specific, so the front end is usually rebuilt.'], ['"A new CMS fixes our problems"', 'Only if you know what to fix. Otherwise the problems move with the content.']], 3, false)}<div class="acts" style="margin-top:20px">${A('#/services/cms-migration', 'How we run a migration →')}</div>`],
      ['CMS or custom?', `<h3 class="th">Where does a CMS end and custom development begin?</h3><p class="lede">A CMS manages content well. Stretch it further and you get stacked plugins, workarounds one developer understands and a site that gets harder to change.</p><div class="call">Let the CMS do what it is good at, and build the specific parts of your business properly alongside it.<small>We plan both sides together, so they work as one.</small></div>`]
    ])}
    <div class="relrow"><span>Related services</span><a href="#/services/umbraco/umbraco-development">Umbraco development</a><a href="#/services/sitecore/sitecore-development">Sitecore development</a><a href="#/services/umbraco/cms-to-umbraco-migration">CMS migration</a><a class="go" href="#/contact">Tell us about your project →</a></div></div></div>` });

P.ai = () => ({ t: 'AI integration', h: `<div class="pg"><div class="wrap">${hero(crumb(['#/solutions', 'Solutions'], [0, 'AI integration']), 'AI integration', 'AI around your CMS, <span class="grad">not instead of it.</span>', 'Your Umbraco or Sitecore site does not need replacing to benefit from AI. A secure .NET layer connects it to AI services, so content, search and editing get smarter without a rebuild.', A('#/enquire/ai/ai-integration', 'Explore AI Solutions for Your Business →', 'pri') + A('#/services/ai', 'AI services'), fig('code-screen', 'warm', 'Secure .NET layer'))}
    ${tabs([
      ['How it works', `<h3 class="th">Four steps, no rebuild</h3>${flow(['Your CMS manages content', 'A .NET backend calls an AI service through an API', 'The AI returns a response', 'Your site uses it for a smarter experience'])}<div class="call">An AI-assisted content lifecycle<small>Create, optimise, tag, personalise, publish, analyse, improve. The CMS is the platform; AI is the intelligence layer around it.</small></div>`],
      ['Where AI helps', `<h3 class="th">Eight practical uses</h3>${cards([['Content creation', 'First drafts for pages, blogs, product text and FAQs.'], ['Optimisation', 'SEO, readability, meta data, headings and accessibility suggestions.'], ['Smart tagging', 'Topics, categories and metadata assigned automatically.'], ['Personalisation', 'Content matched to interests, location and engagement.'], ['Multilingual', 'Translate and adapt content while keeping brand tone.'], ['Semantic search', 'Understands intent: "homes for a growing family" finds matching listings.'], ['Recommendations', 'Related articles, products or pages for what a visitor is viewing.'], ['Governance', 'Spot outdated, duplicate or inconsistent content.']], 4)}`],
      ['Done responsibly', `<h3 class="th">What to consider first</h3>${cards([['Keep your CMS', 'Add AI without replacing the site.'], ['Integrate securely', 'APIs and backend services manage all AI traffic.'], ['Protect your data', 'Access controls, and no unnecessary sensitive data sent to AI.'], ['Human oversight', 'Review AI output before it informs important decisions.'], ['Plan for scale', 'API costs, response times, error handling.']], 3, false)}`]
    ])}
    <div class="relrow"><span>Related services</span><a href="#/services/ai/ai-integration">AI integration and assistants</a><a href="#/services/ai/ai-search">AI-powered search</a><a href="#/services/ai/document-automation">Document automation</a><a class="go" href="#/contact">Tell us about your project →</a></div></div></div>` });

P.integrations = () => ({ t: 'Integrations & .NET', h: `<div class="pg"><div class="wrap">${hero(crumb(['#/solutions', 'Solutions'], [0, 'Integrations & .NET']), 'Integrations & .NET', 'Your systems should <span class="grad">talk to each other.</span>', 'Behind every website sits a CRM, ERP, stock and marketing tools. Update once in your CMS and every system follows, with no retyping and no mismatched data.', A('#/enquire/custom-software/api-integrations', 'Discuss Your Integration →', 'pri') + A('#/services/custom-software/api-integrations', 'Integration services'), fig('laptops-table', 'nat', 'Connected systems'))}
    ${tabs([
      ['How it works', `<h3 class="th">From a website form to your CRM</h3>${flow(['Customer submits a form', 'Secure API reaches a .NET back end', 'It validates and connects to your CRM or system', 'Records and workflows update automatically'])}<h3 style="margin-top:30px">Update once, everywhere</h3>${flow(['Change it once in the CMS', 'The API sends it in seconds', 'CRM, stock, accounts and email follow'])}`],
      ['Why it matters', `<h3 class="th">What integration changes</h3>${cards([['Less manual work', 'No retyping, fewer errors.'], ['Enquiries reach sales', 'Leads go straight into the CRM.'], ['Data stays in sync', 'Products, pricing and availability connected.'], ['Marketing workflows', 'Enquiry and consent data shared appropriately.'], ['Consistent records', 'Website, customers and systems agree.'], ['Scale without rebuilding', 'Add tools as you grow.']], 3)}`],
      ['Done properly', `<h3 class="th">What we plan for</h3>${cards([['API security', 'Authentication, authorisation, access control.'], ['Data validation', 'Checked before it reaches another system.'], ['Error handling', 'Failures detected, retried, monitored.'], ['Data ownership', 'One system owns each type of data.'], ['Performance', 'Background processing keeps the site fast.']], 3, false)}${chips(['.NET', '.NET Core', 'C#', 'REST APIs', 'CRM', 'ERP', 'Headless', 'SQL Server', 'Azure'])}`]
    ])}
    <div class="relrow"><span>Related services</span><a href="#/services/custom-software/api-integrations">APIs and integration</a><a href="#/services/optimizely/optimizely-integrations">Optimizely integrations</a><a href="#/services/custom-software/legacy-modernisation">Legacy modernisation</a><a class="go" href="#/contact">Tell us about your project →</a></div></div></div>` });

P['ai-qa'] = () => ({ t: 'AI QA tool', h: `<div class="pg"><div class="wrap">${hero(crumb(['#/services', 'Services'], ['#/services/ai', 'AI Integration & AI-Powered Solutions'], [0, 'AI QA tool']), 'AI QA tool', 'From one URL to <span class="grad">a prioritised QA report.</span>', 'A site can look perfect and still have broken links, console errors or accessibility issues. We are building an AI QA tool that crawls a site, runs the checks, collects evidence and turns hundreds of raw results into a short list ordered by impact. It is in development, with early access available.', A('#/enquire/ai/ai-qa-testing', 'Ask About Early Access →', 'pri') + '<span class="badge o" style="align-self:center">In development</span>', fig('code-screen', 'nat', 'Checks, then evidence'))}
    ${sec('The process', 'Eight connected steps', 'Most QA time is spent repeating and reading, not testing.', `<div class="qa-track" id="qaTrack2"></div><div class="qa-now" aria-live="polite" style="margin-top:14px"><b id="qaT2"></b><p id="qaD2"></p></div>`)}
    <div class="two" style="margin-top:56px"><div><h3>What it checks</h3>${chips(['Functional', 'Responsive layouts', 'Broken links', 'Console errors', 'Accessibility', 'Performance & SEO'])}<p class="lede" style="margin-top:18px">A red mark is not a finding. We capture the page, element, console output and a screenshot from that moment.</p><div class="call" style="margin-top:18px">It is a place to start.<small>AI adds context. People decide.</small></div></div><div class="report"><div class="rh"><span>QA report · <b>example</b></span><span>Illustration</span></div><ul><li><span class="sev h">High</span><span>Quote form fails on mobile</span><small>/quote</small></li><li><span class="sev h">High</span><span>Console errors after release</span><small>/checkout</small></li><li><span class="sev m">Medium</span><span>Low colour contrast</span><small>/pricing</small></li><li><span class="sev m">Medium</span><span>Broken links</span><small>site-wide</small></li><li><span class="sev l">Low</span><span>Missing meta descriptions</span><small>several pages</small></li></ul></div></div></div></div>`, after: () => { const T = $('#qaTrack2'); if (!T) return; T.innerHTML = qaSteps.map(([n], i) => `<button type="button" class="qs" data-i="${i}"><i>${String(i + 1).padStart(2, '0')}</i>${n}</button>`).join(''); const E = [...T.children]; const show = (i) => { E.forEach((e, k) => { e.classList.toggle('on', k === i); e.classList.toggle('done', k < i); }); $('#qaT2').textContent = qaSteps[i][1]; $('#qaD2').textContent = qaSteps[i][2]; }; E.forEach((e) => e.addEventListener('click', () => show(+e.dataset.i))); show(0); } });

const SOL = [
  ['Editors wait on developers', 'Restructured content lets editors add and change pages themselves.', '#/cms', 'Content architecture'],
  ['Pages go live without review', 'Roles, approvals and audit trails matched to risk.', '#/cms', 'CMS workflows'],
  ['Enquiries sit in an inbox', 'Forms flow through a secure API into your CRM.', '#/integrations', 'Integrations'],
  ['Data is split across systems', 'One update reaches CMS, CRM, stock, accounts and email.', '#/integrations', 'API integration'],
  ['AI without replacing the CMS', 'Search, chatbots and editor help through a secure .NET layer.', '#/ai', 'AI integration'],
  ['Planning a CMS migration', 'Content mapped, front end rebuilt, rankings protected.', '#/services/cms-migration', 'CMS migration'],
  ['Releases wait on manual checks', 'Our AI QA tool, in development, will crawl, test and report what matters, with evidence.', '#/ai-qa', 'AI QA tool'],
  ['An old system holds us back', 'Keep what works, upgrade the rest step by step.', '#/services/legacy-modernisation', 'Legacy modernisation'],
  ['Unsure what belongs in the CMS', 'We plan the CMS and custom parts together.', '#/cms', 'CMS or custom']
];
P.solutions = () => ({ t: 'Solutions', h: `<div class="pg"><div class="wrap">${hero(crumb([0, 'Solutions']), 'Solutions', 'Real problems, <span class="grad">practical fixes.</span>', 'The situations businesses bring to us most often, and how we solve them. Find yours and open the page.', A('#/contact', 'Describe your situation →', 'pri') + A('#/services', 'See all services'), fig('meeting-table', 'warm arch', 'Discovery'))}
    <div class="g3" style="margin-top:64px">${SOL.map(([t, p, h, tag], i) => `<a class="card" href="${h}"><span class="ix">${tag}</span><h3>${t}</h3><p>${p}</p><span class="go">See how →</span></a>`).join('')}</div>
    <div class="call">You do not always need a new website.<small>Often the smartest move is to keep what works, upgrade what does not, and make everything work together.</small></div></div></div>` });

P.about = () => ({ t: 'About', h: `<div class="pg"><div class="wrap">${hero(crumb([0, 'About']), 'About WebsiteSoft', 'Web & software development <span class="grad">since 2007.</span>', 'We design, build and connect business software, with no shortcuts: software built to last, on Sitecore, Umbraco and .NET, with AI where it helps.', A('#/contact', 'Work with us →', 'pri') + A('#/services', 'What we do'))}
    ${sec('How we build', 'Software you will be happy to own for years', 'Build cost is a one-off. Ownership cost is forever.', cards([['We write our own code', 'Fewer third-party packages means fewer security risks, and nothing breaks on someone else\'s update.'], ['Every line is reviewed', 'Each change is reviewed by a second developer, so problems are caught early and knowledge is shared.'], ['Built to last', 'Clean architecture and a handover any competent team could pick up.']], 3))}
    <div class="two" style="margin-top:72px"><div><h3>A team that learns on live projects</h3>${ul(['Real deadlines teach faster than any course', 'Every change is read, discussed and improved', 'Many developers started as trainees'])}${chips(['Sitecore', 'Umbraco', '.NET', 'Azure', 'React', 'AI'])}</div><div><h3>What working with us looks like</h3>${ul(['You talk to the engineers doing the work', 'Small teams with clear ownership', 'A clean handover any team could pick up'])}</div></div>
    <div class="abstats">${[['2007', 'Building web and business software since'], [String(SVC_COUNT), 'Services across five areas'], ['3', 'CMS platforms: Umbraco, Sitecore, Optimizely']].map(([b, t]) => `<div><b>${b}</b><span>${t}</span></div>`).join('')}</div>
    ${sec('Work culture', 'How we work together', 'Small teams, clear ownership and honest conversations.', `<div class="g4 culture4">${[['Engineers talk to clients', 'You speak to the people who write the code, not a chain of account managers.'], ['Review is a habit', 'Every change is read by a second developer. It is how we teach, and how we keep quality.'], ['Learning on real work', 'Trainees grow on live projects with mentors beside them, and many now lead them.'], ['Honest advice', 'If you do not need a rebuild, we will say so. Keeping what works is often the smart move.']].map(([t, p]) => `<div class="card"><h3>${t}</h3><p>${p}</p></div>`).join('')}</div>`)}
    ${sec('What we value', 'Software you will be happy to own', '', chips(['Clean code', 'Few dependencies', 'Security first', 'Clear handover', 'Long-term support', 'AI where it helps']))}</div></div>` });



  const legal = (t, k, h1, lede, body) => ({ t, h: `<div class="pg"><div class="wrap">${crumb([0, t])}<article class="legal"><span class="kicker"><i></i>${k}</span><h1>${h1}</h1><p class="lede">${lede}</p><p class="upd">Last updated: 21 October 2026 · Version 1.0</p>${body}</article></div></div>` });
  const LS = (h, ...ps) => `<section><h2>${h}</h2>${ps.join('')}</section>`;
  const LP = (x) => `<p>${x}</p>`;
  const LU = (arr) => `<ul>${arr.map((x) => `<li>${x}</li>`).join('')}</ul>`;
  const MAIL = '<a href="mailto:enquiries@websitesoft.co.uk">enquiries@websitesoft.co.uk</a>';
  const N = (n, h, ...ps) => LS(h, ...ps);
  P.privacy = () => legal('Privacy Statement', 'Legal', 'Privacy Statement', 'WebsiteSoft ("WebsiteSoft", "we", "us" or "our") respects your privacy. This statement explains what personal information we collect through this website, how we use it, and the choices and rights you have.',
    N(0, 'Who we are', LP('WebsiteSoft is a trading name of Website Software Ltd., a company registered in England and Wales (company number 06209251). Our registered office is 20 Winchcombe Road, Frampton Cotterell, Bristol, South Gloucestershire, BS36 2AG. Website Software Ltd. is the data controller for the personal information described in this statement.'))
    + N(1, 'Information we collect', LP('We collect only the information you choose to give us:'), LU(['<b>Contact details</b>, such as your name, email address, phone number and company, when you fill in a contact or enquiry form.', '<b>Enquiry details</b>, such as your message, project timeline and the page you enquired from.', '<b>Correspondence</b>, including emails and WhatsApp messages you send us and our replies.']), LP('We do not collect information automatically through analytics or tracking tools, and you do not need an account to use this website.'))
    + N(2, 'How we use your information', LU(['To respond to your enquiry and discuss your project.', 'To prepare proposals and provide the services you ask for.', 'To keep a record of our communication with you.', 'To meet our legal and regulatory obligations.']), LP('We do not sell your personal information or use it for unrelated marketing.'))
    + N(3, 'Legal basis for processing', LP('We process your information because it is necessary to take steps at your request before entering into a contract, because we have a legitimate interest in responding to enquiries and running our business, or because we must comply with a legal obligation.'))
    + N(4, 'Sharing your information', LP('We share your information only with trusted service providers who help us run this website and our communications, and only as needed:'), LU(['FormSubmit, which delivers website form submissions to our inbox.', 'Cloudflare, whose Turnstile check may run on our forms to tell people from automated traffic and whose service may receive a form submission before it reaches us; it processes your IP address and browser signals for that purpose only.', 'Your own email service (for example Gmail or Outlook), only if automatic sending fails and you choose to send the enquiry from there.', 'Microsoft 365, which hosts our email.', 'WhatsApp (Meta), if you choose to contact us there.', 'Google Fonts, which provides the fonts on this website and receives your IP address when your browser loads them.']), LP('We may also disclose information where required by law.'))
    + N(5, 'International transfers', LP('Some of our service providers may process information outside the UK. Where they do, appropriate safeguards such as standard contractual clauses are in place to protect it.'))
    + N(6, 'Data security', LP('We use appropriate technical and organisational measures to protect your information. This website is served over a secure HTTPS connection and uses a Content Security Policy that limits what the page can load and where it can send data. Access to enquiries is limited to the people who need it to respond.'), LP(`If you believe you have found a security issue on this website, please email ${MAIL} with the subject "Security report".`))
    + N(7, 'Data retention', LP('We keep your information only for as long as needed for the purposes above, including any legal or accounting requirements, and then delete it securely.'))
    + N(8, 'Cookies', LP('This website does not use cookies to track you. We may count visits with Cloudflare Web Analytics, which sets no cookies and does not identify you, and we may record which of our own pages and links are used (page, link, no personal data). If we ever add a tool that sets cookies, such as Google Analytics, nothing will load until you accept it in a banner, you can reject it with one click, and this section will list each cookie.'))
    + N(9, 'Your rights', LP('Under UK data protection law you have the right to access, correct or delete your personal information, to restrict or object to how we use it, and to ask for a copy of it. To exercise any of these rights, email us at ' + MAIL + '. We will respond within one month.'), LP('You also have the right to complain to the Information Commissioner\'s Office (ICO) at <a href="https://ico.org.uk/make-a-complaint/" target="_blank" rel="noopener">ico.org.uk</a>.'))
    + N(10, 'Third-party websites', LP('This website contains links to other websites, such as LinkedIn and WhatsApp. We are not responsible for their content or privacy practices, so please read their privacy statements.'))
    + N(11, 'Children\'s privacy', LP('This website is intended for businesses and is not directed at children. We do not knowingly collect personal information from children.'))
    + N(12, 'Contact us', LP(`If you have any questions about this statement or how we handle your information, please contact us at ${MAIL}.`))
    + N(13, 'Changes to this statement', LP('We may update this statement from time to time. The latest version will always be available on this page, with the date it was last updated.')));
  P.terms = () => legal('Terms of Use', 'Legal', 'Terms of Use', 'These terms apply to your use of the WebsiteSoft website. Please read them carefully.',
    N(0, 'Who we are', LP('This website is operated by Website Software Ltd., trading as WebsiteSoft, a company registered in England and Wales (company number 06209251). Registered office: 20 Winchcombe Road, Frampton Cotterell, Bristol, South Gloucestershire, BS36 2AG. VAT number GB 379 2422 73.'))
    + N(1, 'Acceptance of terms', LP('By accessing or using this website, you agree to these Terms of Use and our <a href="#/privacy">Privacy Statement</a>. If you do not agree, please do not use this website.'))
    + N(2, 'Use of the website', LP('You may use this website for lawful purposes only, to learn about WebsiteSoft and our services and to contact us.'))
    + N(3, 'Intellectual property and copyright', LP('All content on this website, including text, design, graphics, logos and code, is owned by WebsiteSoft or used with permission, and is protected by copyright and other intellectual property laws. © WebsiteSoft. All rights reserved.'), LP('You may not copy, reproduce, modify, distribute or republish any content without our prior written permission. Photographs are illustrative stock images used under the Unsplash licence and do not show WebsiteSoft staff or offices. Product screens marked "Illustration" or "Example" are examples and do not show real client data.'))
    + N(4, 'Accuracy of information', LP('We aim to keep the information on this website accurate and up to date, but it is provided for general information only and does not constitute professional advice. Proposals, estimates and agreements are binding only when confirmed in writing.'))
    + N(5, 'Prohibited use', LP('You must not:'), LU(['attempt to gain unauthorised access to this website or its systems;', 'introduce viruses or other malicious code;', 'send spam or misleading information through our forms;', 'interfere with or disrupt the website or its security.']))
    + N(6, 'Third-party links', LP('Links to other websites are provided for convenience only. We do not control and are not responsible for their content, availability or practices.'))
    + N(7, 'Limitation of liability', LP('To the fullest extent permitted by law, WebsiteSoft is not liable for any loss or damage arising from your use of, or inability to use, this website. Nothing in these terms limits liability that cannot be limited by law.'))
    + N(8, 'Changes to these terms', LP('We may update these terms at any time. Changes take effect when they are published on this page.'))
    + N(9, 'Governing law', LP('These terms are governed by the laws of England and Wales, and the courts of England and Wales have exclusive jurisdiction.'))
    + N(10, 'Contact us', LP(`If you have any questions about these terms, please contact us at ${MAIL}.`)));

  P.enquire = (cid, sid) => { const c = catBy(cid), sv = subBy(c, sid); if (!c) return null; const subj = subjectFor(c, sv); const what = sv ? sv.name : c.name; const back = sv ? subHref(c, sv) : catHref(c);
    const ctxLabel = ({ umbraco: 'Current CMS and version', sitecore: 'Current Sitecore version', optimizely: 'Current Optimizely / Episerver version', 'custom-software': 'Current systems or tools', ai: 'Where would you like to use AI?' })[c.id];
    return { t: `${sv ? sv.cta : c.cta}`, h: `<div class="pg enq"><div class="wrap">${svcCrumb(c, sv, 'Enquiry')}
    <div class="enq-grid"><div class="enq-main"><span class="pill2">${what}</span><h1>${sv ? sv.cta : c.cta}</h1><p class="lede">Tell us a little about your project. An engineer who works on ${sv ? (SUBJ[sv.id] || what) : c.short} projects will read it and get back to you.</p>
      <form class="form enq-form" id="eform"><input type="hidden" name="s" value="${subj}">${honey}<div class="subj"><span>Subject</span><b>${subj}</b></div>
        <div class="f2"><label>Your name<input name="n" autocomplete="name" maxlength="100" required></label><label>Work email<input name="e" type="email" autocomplete="email" maxlength="160" required></label></div>
        <div class="f2"><label><span>Company <small>(optional)</small></span><input name="c" autocomplete="organization" maxlength="120"></label><label><span>Phone <small>(optional)</small></span><input name="p" type="tel" autocomplete="tel" maxlength="40"></label></div>
        <div class="f2"><label><span>${ctxLabel} <small>(optional)</small></span><input name="x"></label><label>Timeline<select name="t"><option>Not sure yet</option><option>As soon as possible</option><option>In the next 3 months</option><option>In 3 to 6 months</option><option>Just exploring</option></select></label></div>
        <label>What would you like to achieve?<textarea name="m" rows="5" required placeholder="A few lines about your current setup and goals is enough."></textarea></label>
        <div class="ts"></div><div class="acts"><button class="btn pri big" type="submit">Submit enquiry <span aria-hidden="true">→</span></button><a class="tlink" href="${back}">← Back to ${shortT(what)}</a></div><p class="fnote">We use your details only to reply to your enquiry. See our <a href="#/privacy">Privacy Statement</a>.</p><p class="fstat" hidden aria-live="polite"></p></form></div>
      <aside class="enq-side"><h3>What happens next</h3><ol class="nx v"><li><b>We read your enquiry</b><span>It goes to the engineers, not a sales queue.</span></li><li><b>We talk it through</b><span>A short call to understand your setup and goals.</span></li><li><b>You get a clear plan</b><span>Approach, scope and an estimate, with no obligation.</span></li></ol>
        <div class="enq-alt"><h3>Prefer to reach us directly?</h3><a href="mailto:enquiries@websitesoft.co.uk">enquiries@websitesoft.co.uk</a><a href="https://wa.me/447552247128?text=I%27d%20like%20a%20free%20consultation%2C%20what%20are%20my%20options%3F" target="_blank" rel="noopener">WhatsApp us ↗</a></div></aside></div></div></div>`,
      after: () => { const f = $('#eform'); if (f) mountTurnstile(f); if (f) f.addEventListener('submit', (e) => { e.preventDefault(); const d = new FormData(f); const o = { Name: d.get('n'), Email: d.get('e'), Company: d.get('c') || '-', Phone: d.get('p') || '-', [ctxLabel]: d.get('x') || '-', Timeline: d.get('t'), Message: d.get('m'), Page: what, _replyto: d.get('e') }; sendEnquiry(f, o, d.get('s')); }); } }; };
  P.c = (id) => { const cp = CAMPAIGNS.find((x) => x.id === id); if (!cp) return null; const c = catBy(cp.cat), sv = subBy(c, cp.sub);
    return { t: cp.kicker, d: cp.lede, h: `<div class="pg camp"><div class="wrap">
    <div class="pg-hero solo"><div><span class="kicker"><i></i>${cp.kicker}</span><h1>${cp.h1}</h1><p class="lede">${cp.lede}</p><div class="acts"><a class="btn pri" href="#camp-form">${cp.cta} →</a>${sv ? A(subHref(c, sv), 'How we do it') : ''}</div></div></div>
    <section class="ps"><div class="g3">${cp.points.map(([t, p]) => `<div class="card"><h3>${t}</h3><p>${p}</p></div>`).join('')}</div></section>
    <section class="ps enq-grid" id="camp-form"><div class="enq-main"><h2>${cp.cta}</h2><p class="lede">Tell us a little about your current setup. An engineer reads every enquiry and replies, usually within one working day.</p>
      <form class="form enq-form" id="eform"><input type="hidden" name="s" value="${cp.subject}">${honey}
        <div class="f2"><label>Your name<input name="n" autocomplete="name" maxlength="100" required></label><label>Work email<input name="e" type="email" autocomplete="email" maxlength="160" required></label></div>
        <div class="f2"><label><span>Company <small>(optional)</small></span><input name="c" autocomplete="organization" maxlength="120"></label><label><span>Phone <small>(optional)</small></span><input name="p" type="tel" autocomplete="tel" maxlength="40"></label></div>
        <label>What would you like to achieve?<textarea name="m" rows="5" required placeholder="A few lines about your current setup and goals is enough."></textarea></label>
        <div class="ts"></div><div class="acts"><button class="btn pri big" type="submit">${cp.cta} <span aria-hidden="true">→</span></button></div><p class="fnote">We use your details only to reply to your enquiry. See our <a href="#/privacy">Privacy Statement</a>.</p><p class="fstat" hidden aria-live="polite"></p></form></div>
      <aside class="enq-side"><h3>What happens next</h3><ol class="nx v"><li><b>We read your enquiry</b><span>It goes to the engineers, not a sales queue.</span></li><li><b>We talk it through</b><span>A short call to understand your setup and goals.</span></li><li><b>You get a clear plan</b><span>Approach, scope and an estimate, with no obligation.</span></li></ol>
        <div class="enq-alt"><h3>Prefer to reach us directly?</h3><a href="mailto:${ENQ_TO}">${ENQ_TO}</a><a href="https://wa.me/447552247128?text=I%27d%20like%20a%20free%20consultation%2C%20what%20are%20my%20options%3F" target="_blank" rel="noopener">WhatsApp us ↗</a></div></aside></section></div></div>`,
      after: () => { const f = $('#eform'); if (f) mountTurnstile(f); if (f) f.addEventListener('submit', (e) => { e.preventDefault(); const d = new FormData(f); sendEnquiry(f, { Name: d.get('n'), Email: d.get('e'), Company: d.get('c') || '-', Phone: d.get('p') || '-', Message: d.get('m'), Page: 'Campaign: ' + cp.id, Campaign: cp.id, _replyto: d.get('e') }, d.get('s')); }); } }; };
  P.contact = (cid, sid) => { const c = catBy(cid), sv = subBy(c, sid); const subj = c ? subjectFor(c, sv) : '';
    const from = c ? `<p class="ctx">Enquiring about <a href="${sv ? subHref(c, sv) : catHref(c)}">${sv ? sv.name : c.name}</a>. The subject is filled in for you.</p>` : '';
    const ico = { mail: '<svg viewBox="0 0 24 24"><rect x="3" y="5" width="18" height="14" rx="3"/><path d="m4 7 8 6 8-6"/></svg>', chat: '<svg viewBox="0 0 24 24"><path d="M4 18.5 5.3 15A7.5 7.5 0 1 1 9 18.2Z"/></svg>', in: '<svg viewBox="0 0 24 24"><rect x="3" y="3" width="18" height="18" rx="4"/><path d="M8 10v6M8 7.5v.01M12 16v-3.5a2 2 0 0 1 4 0V16M12 10v6"/></svg>' };
    return { t: 'Contact', h: `<div class="pg ct"><div class="wrap">${c ? svcCrumb(c, sv, 'Contact') : crumb([0, 'Contact'])}
    <div class="ct-head"><span class="kicker"><i></i>Let's talk</span><h1>Got a technology challenge? <span class="grad">Let's talk.</span></h1><p class="lede">Tell us what you use today and what you want to improve. An engineer will read it and reply.</p></div>
    <div class="ct-panel"><div class="ct-form"><h2>Send us a note</h2>${from}<form class="form" id="cform">${honey}<label>Subject<input name="s" id="cSubj" value="${subj}" placeholder="What is your enquiry about?" required></label><div class="f2"><label>Your name<input name="n" autocomplete="name" maxlength="100" required></label><label>Email<input name="e" type="email" autocomplete="email" maxlength="160" required></label></div><div class="f2"><label><span>Company <small>(optional)</small></span><input name="c" autocomplete="organization" maxlength="120"></label><label><span>Phone <small>(optional)</small></span><input name="p" type="tel" autocomplete="tel" maxlength="40"></label></div><label>What do you want to improve?<textarea name="m" rows="5" required placeholder="A few lines about your current setup and goals is enough."></textarea></label><div class="ts"></div><div class="ct-send"><button class="btn pri big" type="submit">Submit <span aria-hidden="true">→</span></button><small>Goes straight to our engineers. No obligation.</small></div><p class="fnote">We use your details only to reply to your enquiry. See our <a href="#/privacy">Privacy Statement</a>.</p><p class="fstat" hidden aria-live="polite"></p></form></div>
    <aside class="ct-side"><h2>Or reach us directly</h2><a class="ct-tile" href="mailto:enquiries@websitesoft.co.uk"><i>${ico.mail}</i><span><b>Email</b>enquiries@websitesoft.co.uk</span></a><a class="ct-tile" href="https://wa.me/447552247128?text=I%27d%20like%20a%20free%20consultation%2C%20what%20are%20my%20options%3F" target="_blank" rel="noopener"><i>${ico.chat}</i><span><b>WhatsApp</b>Message the team ↗</span></a><a class="ct-tile" href="https://www.linkedin.com/company/websitesoft" target="_blank" rel="noopener"><i>${ico.in}</i><span><b>LinkedIn</b>Follow WebsiteSoft ↗</span></a>
      <div class="ct-meta"><div><b>Engineers, not sales</b><span>You talk to the people who do the work</span></div><div><b>Since 2007</b><span>Web and software development</span></div></div>${fig('sunlit-meeting', 'nat', 'Start with a conversation')}</aside></div></div></div>`, after: () => { const f = $('#cform'); if (f) mountTurnstile(f); if (f) f.addEventListener('submit', (e) => { e.preventDefault(); const d = new FormData(f); sendEnquiry(f, { Name: d.get('n'), Email: d.get('e'), Company: d.get('c') || '-', Phone: d.get('p') || '-', Message: d.get('m'), Page: 'Contact', _replyto: d.get('e') }, d.get('s') || 'Website enquiry'); }); } }; };

  const homeEl = $('#home'), pagesEl = $('#pages');
  wireAsk(homeEl);
  let navigated = false; // first route() is the initial load: no focus move
  $('#skip').addEventListener('click', (e) => { e.preventDefault(); const m = sub ? pagesEl : homeEl; m.focus(); m.scrollIntoView(); });
  $('#cyear').textContent = new Date().getFullYear();
  const metaD = document.querySelector('meta[name="description"]'), ogT = document.querySelector('meta[property="og:title"]'), ogD = document.querySelector('meta[property="og:description"]');
  const META0 = { t: 'WebsiteSoft | Web & software development since 2007', d: 'WebsiteSoft builds custom website software, Sitecore and SitecoreAI, Umbraco CMS, .NET applications, API integrations and AI tools. Web and software development since 2007.' };
  // Live site: every page has its own real URL (/services/umbraco/), pre-rendered so search engines and AI crawlers can read it.
  // claude.ai preview: one file, so pages stay on #/ links.
  const SITE = 'https://www.websitesoft.co.uk/';
  const PATH_MODE = (document.querySelector('meta[name="ws-routing"]') || {}).content === 'path';
  const BASE = PATH_MODE ? new URL(document.baseURI).pathname : '/';
  const toPath = (h) => BASE + h.replace(/^#\/?/, '').replace(/\/?$/, '/').replace(/^\/$/, '');
  const curRoute = () => (PATH_MODE && !location.hash.startsWith('#/') ? location.pathname.slice(BASE.length - 1) : location.hash).replace(/^#?\/?/, '').replace(/\/$/, '').replace(/\/index\.html$|^index\.html$/, '');
  const redirect = (h) => { if (PATH_MODE) { history.replaceState(null, '', toPath(h)); route(); } else location.replace(h); };
  const linkPaths = (root) => { if (!PATH_MODE) return; root.querySelectorAll('a[href^="#/"]').forEach((a) => { const h = a.getAttribute('href'); a.dataset.h = h; a.setAttribute('href', toPath(h)); }); };
  if (PATH_MODE) {
    document.addEventListener('click', (e) => {
      const a = e.target.closest('a[href]'); if (!a || e.defaultPrevented || e.button || e.metaKey || e.ctrlKey || e.shiftKey || a.target === '_blank') return;
      const raw = a.getAttribute('href');
      if (raw.startsWith('#') && !raw.startsWith('#/')) { e.preventDefault(); const el = document.getElementById(raw.slice(1)); if (el) el.scrollIntoView({ behavior: 'smooth' }); return; }
      const u = new URL(a.href, location.href); if (u.origin !== location.origin || !u.pathname.startsWith(BASE) || /\.[a-z0-9]+$/i.test(u.pathname)) return;
      e.preventDefault(); if (u.pathname !== location.pathname) { history.pushState(null, '', u.pathname); route(); }
    });
    addEventListener('popstate', route);
  }
  const hrefKey = (a) => a.dataset.h || a.getAttribute('href');
  const setTag = (sel, make) => { let el = document.head.querySelector(sel); if (!el) { el = make(); document.head.appendChild(el); } return el; };
  const canon = setTag('link[rel="canonical"]', () => Object.assign(document.createElement('link'), { rel: 'canonical' }));
  const robots = setTag('meta[name="robots"]', () => Object.assign(document.createElement('meta'), { name: 'robots' }));
  const ogU = setTag('meta[property="og:url"]', () => { const m = document.createElement('meta'); m.setAttribute('property', 'og:url'); return m; });
  const twT = document.querySelector('meta[name="twitter:title"]'), twD = document.querySelector('meta[name="twitter:description"]');
  const esc = (x) => x.replace(/\s+/g, ' ').trim();
  function pageLd(r, page) {
    const url = SITE + (r ? r + '/' : ''), out = [];
    const crumbs = [...pagesEl.querySelectorAll('.crumb a, .crumb [aria-current]')].map((el) => ({ name: el.getAttribute('title') || esc(el.textContent), url: el.tagName === 'A' ? SITE + (hrefKey(el) || '').replace(/^#\/?/, '').replace(/(.)$/, '$1/').replace(/^\/$/, '') : url }));
    if (crumbs.length > 1) out.push({ '@type': 'BreadcrumbList', itemListElement: crumbs.map((c, i) => ({ '@type': 'ListItem', position: i + 1, name: c.name, item: c.url })) });
    if (page && page.svc) out.push({ '@type': 'Service', name: page.svc.name, serviceType: page.svc.type, description: page.d, url, provider: { '@id': SITE + '#org' }, areaServed: ['GB', 'Worldwide'] });
    { const qa = [...document.querySelectorAll((r ? '#pages .pg-faq' : '#faq') + ' details')].map((d) => ({ '@type': 'Question', name: esc(d.querySelector('summary').textContent), acceptedAnswer: { '@type': 'Answer', text: esc(d.querySelector('p').textContent) } })); if (qa.length) out.push({ '@type': 'FAQPage', mainEntity: qa }); }
    const wp = { '@type': 'WebPage', url, name: document.title, description: metaD.content, isPartOf: { '@id': SITE + '#site' }, about: { '@id': SITE + '#org' }, inLanguage: 'en-GB' };
    const built = CFG('ws-build-date'); if (built) wp.dateModified = built;
    if (r && pagesEl.querySelector('.ans')) wp.speakable = { '@type': 'SpeakableSpecification', cssSelector: ['.ans'] };
    out.push(wp);
    return { '@context': 'https://schema.org', '@graph': out };
  }
  function setMeta(page, r) {
    const t = page ? document.title : META0.t;
    const lede = page && pagesEl.querySelector('.lede');
    const d = page ? esc(page.d || (lede ? lede.textContent : META0.d)).slice(0, 158) : META0.d;
    if (page) page.d = d;
    if (!page) document.title = META0.t;
    metaD.content = d; ogT.content = t; ogD.content = d; if (twT) twT.content = t; if (twD) twD.content = d;
    const url = SITE + (r && page ? r + '/' : ''); canon.href = url; ogU.content = url;
    robots.content = page && page.noindex ? 'noindex, follow' : 'index, follow';
    const ld = setTag('#ldpage', () => Object.assign(document.createElement('script'), { type: 'application/ld+json', id: 'ldpage' }));
    ld.textContent = JSON.stringify(pageLd(page ? r : '', page));
  }
  function route() {
    tabSeq = 0;
    if (PATH_MODE && location.hash.startsWith('#/')) { history.replaceState(null, '', toPath(location.hash)); }
    const h = curRoute();
    let page = null, key = '';
    if (h) { const [a, b, c3] = h.split('/'); key = a;
      if (a === 'services' && b && !catBy(b) && ALIAS[b]) { const t = ALIAS[b]; redirect(t.startsWith('../') ? '#/' + t.slice(3) : '#/services/' + t); return; }
      if (a === 'services' && b && c3 && SUBALIAS[c3]) { redirect(`#/services/${b}/${SUBALIAS[c3]}`); return; }
      if (a === 'services' && b) { const c = catBy(b), sv = subBy(c, c3); page = c ? (c3 ? (sv && !sv.href ? P.sub(c, sv) : null) : P.cat(c)) : null; if (page) { page.d = c3 ? sv.card : c.lede; page.svc = c3 ? { name: sv.name, type: c.name } : { name: c.name, type: c.name }; } }
      else if (a === 'contact' && b) { redirect(`#/enquire/${b}${c3 ? '/' + c3 : ''}`); return; }
      else if (a === 'cookies' || a === 'security') { redirect('#/privacy'); return; }
      else if (a === 'enquire') { page = P.enquire(b, c3); if (page) page.noindex = true; }
      else if (a === 'c') { page = P.c(b); if (page) page.noindex = true; }
      else if (a === 'contact') page = P.contact();
      else page = P[a] && P[a](); }
    sub = !!page;
    homeEl.hidden = sub; pagesEl.hidden = !sub; document.body.classList.toggle('sub', sub);
    if (!sub && typeof startStage === 'function') startStage();
    document.body.classList.toggle('campaign', key === 'c' && sub);
    if (h && !page) { redirect('#/'); return; }
    if (sub) { pagesEl.innerHTML = page.h; linkPaths(pagesEl); document.title = `${page.t} | WebsiteSoft`; if (page.after) page.after(); wireAsk(pagesEl); pagesEl.querySelectorAll('[data-tabs]').forEach((w) => { const bs = [...w.querySelectorAll('.tb')], ps = [...w.querySelectorAll('.tp')]; const go = (i) => { bs.forEach((x, k) => { x.classList.toggle('on', k === i); x.setAttribute('aria-selected', k === i); x.tabIndex = k === i ? 0 : -1; }); ps.forEach((x, k) => (x.hidden = k !== i)); }; bs.forEach((b, i) => b.addEventListener('click', () => go(i))); tabKeys(bs, go); }); } else { document.title = 'WebsiteSoft | Web & software development since 2007'; }
    const navKey = ({ cms: 'solutions', ai: 'solutions', integrations: 'solutions', 'ai-qa': 'solutions', enquire: 'services' })[key] || key;
    const seg = h.split('/'), quick = (seg[0] === 'services' || seg[0] === 'enquire') && ['umbraco', 'sitecore', 'custom-software', 'ai'].includes(seg[1]) ? `#/services/${seg[1]}` : null;
    navA.forEach((a) => a.classList.toggle('on', sub && (quick ? hrefKey(a) === quick : hrefKey(a) === '#/' + navKey))); lastCh = -1;
    document.querySelectorAll('.nav-dd').forEach((ddb) => { ddb.classList.add('shut'); setTimeout(() => ddb.classList.remove('shut'), 400); });
    setMeta(page, h);
    if (navigated) track('page_view', { route: h || '/' });
    window.scrollTo({ top: 0, behavior: 'instant' });
    if (navigated) { const h1 = sub && pagesEl.querySelector('h1'); if (h1) { h1.tabIndex = -1; h1.focus({ preventScroll: true }); } else homeEl.focus({ preventScroll: true }); }
    navigated = true;
    if (typeof collectFade === 'function') collectFade();
  }
  addEventListener('hashchange', () => { if (!PATH_MODE || location.hash.startsWith('#/')) route(); });

  // ---------- AI QA steps ----------
  const qaSteps = [['URL', 'Enter a URL', 'Start from a single address. No scripts to write.'], ['Crawl', 'Crawl the site', 'Every page, form and link is discovered automatically.'], ['Test', 'Run the checks', 'Functional, responsive, accessibility, performance and SEO.'], ['Detect', 'Detect issues', 'Broken links, console errors and failing forms are flagged.'], ['Evidence', 'Collect evidence', 'The page, element, console output and a screenshot from that moment.'], ['Analyse', 'Analyse with AI', 'AI groups the raw results into a short list ordered by impact.'], ['Report', 'Share the report', 'One clear, prioritised report your developers can act on.'], ['Retest', 'Fix and retest', 'Run it again after each release to protect quality.']];
  const qaTrack = $('#qaTrack');
  qaTrack.innerHTML = qaSteps.map(([n], i) => `<button type="button" class="qs" data-i="${i}"><i>${String(i + 1).padStart(2, '0')}</i>${n}</button>`).join('');
  const qsEls = [...qaTrack.children]; let qi = 0, qaHold = 0;
  const qaShow = (i) => { qi = i; qsEls.forEach((e, k) => { e.classList.toggle('on', k === i); e.classList.toggle('done', k < i); }); $('#qaT').textContent = qaSteps[i][1]; $('#qaD').textContent = qaSteps[i][2]; };
  qsEls.forEach((e) => e.addEventListener('click', () => { qaShow(+e.dataset.i); qaHold = 3; }));
  qaShow(0); if (!reduce) setInterval(() => { if (qaHold > 0) { qaHold--; return; } qaShow((qi + 1) % qaSteps.length); }, 2200);

  // ---------- numbers ----------
  const SVC_COUNT = CATS.reduce((n, c) => n + c.subs.filter((x) => !x.href).length, 0);
  const techCount = new Set(services.flatMap((x) => x[2]).concat([...document.querySelectorAll('.stackrow span')].map((e) => e.textContent))).size;
  const statVals = { years: new Date().getFullYear() - 2007, services: SVC_COUNT };
  const statEls = [...document.querySelectorAll('#stats b')];
  const runStats = () => statEls.forEach((el) => { const to = statVals[el.dataset.to] ?? +el.dataset.to; if (reduce) { el.textContent = to; return; } const t0 = performance.now(); const step = (now) => { const k = Math.min(1, (now - t0) / 1400); el.textContent = Math.round(to * (1 - Math.pow(1 - k, 3))); if (k < 1) requestAnimationFrame(step); }; requestAnimationFrame(step); });
  new IntersectionObserver((es, o) => es.forEach((e) => { if (e.isIntersecting) { runStats(); o.disconnect(); } }), { threshold: .4 }).observe($('#stats'));

  // ---------- migration bar ----------
  let mig = 0; setInterval(() => { mig = mig >= 100 ? 0 : Math.min(100, mig + 3 + Math.round(Math.random() * 5)); $('#migBar').style.setProperty('--p', mig / 100); $('#migPct').textContent = mig + '%'; }, reduce ? 99999 : 260);

  // ---------- small UI ----------
  if ($('#voice')) $('#voice').innerHTML = Array.from({ length: 26 }, (_, k) => `<i style="--k:${k};--h:${30 + Math.round(Math.abs(Math.sin(k * .7)) * 70)}%"></i>`).join('');
  const wfEls = [...document.querySelectorAll('#wf span')], wfNotes = ['Author creates. Can\'t publish.', 'Editor checks accuracy, tone and brand.', 'Legal or marketing lead signs off.', 'Only authorised publishers go live.'];
  let wfi = 0; const wfTick = () => { wfEls.forEach((e, k) => { e.classList.toggle('on', k === wfi); e.classList.toggle('done', k < wfi); }); $('#wfNote').textContent = wfNotes[wfi]; wfi = (wfi + 1) % 4; }; wfTick(); if (!reduce) setInterval(wfTick, 1500);
  const prices = ['120 units', '118 units', '96 units', '140 units']; let pi = 0;
  const syncTick = () => { pi = (pi + 1) % prices.length; const p = prices[pi]; $('#syncP').textContent = p; document.querySelectorAll('.sats span').forEach((el, k) => setTimeout(() => { el.querySelector('b').textContent = p; el.classList.remove('hit'); void el.offsetWidth; el.classList.add('hit'); }, 300 + k * 160)); };
  if (!reduce) setInterval(syncTick, 2600);
  const lines = ['crawling 214 pages', 'testing forms and links', '3 console errors found', 'grouping results by impact', 'report ready: priority fixes listed'];
  let li = 0; setInterval(() => { li = (li + 1) % lines.length; $('#say').textContent = lines[li]; }, 2200);
  const fmt = (tz) => new Intl.DateTimeFormat('en-GB', { hour: '2-digit', minute: '2-digit', timeZone: tz });
  const uk = fmt('Europe/London'), ind = fmt('Asia/Kolkata');
  const tick = () => { const d = new Date(); if ($('#tUK')) $('#tUK').textContent = uk.format(d); if ($('#tIN')) $('#tIN').textContent = ind.format(d); };
  tick(); setInterval(tick, 15000);
  $('#copy').addEventListener('click', (e) => { const b = e.currentTarget; navigator.clipboard.writeText('enquiries@websitesoft.co.uk').then(() => { b.textContent = 'Copied'; setTimeout(() => (b.textContent = 'Copy'), 1600); }).catch(() => { const r = document.createRange(); r.selectNodeContents($('#email')); const s = getSelection(); s.removeAllRanges(); s.addRange(r); }); });
  const WCLINK = [['#/services/umbraco/cms-to-umbraco-migration', 'See CMS migration'], ['#/services/sitecore/sitecore-development', 'See CMS workflows'], ['#/services/custom-software/api-integrations', 'See integrations'], ['#/ai-qa', 'See the AI QA tool']];
  document.querySelectorAll('#ch5 .wc').forEach((c, i) => { const l = WCLINK[i]; if (!l) return; c.classList.add('lk'); const b = c.querySelector('.body'); if (b) b.insertAdjacentHTML('beforeend', `<a class="go2" href="${l[0]}">${l[1]} →</a>`); c.addEventListener('click', (e) => { if (!e.target.closest('a')) location.hash = l[0]; }); });
  document.querySelectorAll('.wc').forEach((c) => {
    c.addEventListener('pointermove', (e) => { if (e.pointerType !== 'mouse' || reduce) return; const r = c.getBoundingClientRect(); const x = (e.clientX - r.left) / r.width - .5, y = (e.clientY - r.top) / r.height - .5; c.style.transform = `perspective(1000px) rotateY(${x * 5}deg) rotateX(${-y * 5}deg) translateY(-4px)`; c.style.setProperty('--mx', `${(x + .5) * 100}%`); c.style.setProperty('--my', `${(y + .5) * 100}%`); });
    c.addEventListener('pointerleave', () => (c.style.transform = ''));
  });

  // ---------- chapters ----------
  const chs = [...document.querySelectorAll('#home .chapter')];
  const navA = [...document.querySelectorAll('#nav > a, #nav .ddt')];
  let cur = 0;
  function currentChapter() { const mid = innerHeight * .5; let k = 0; chs.forEach((c, i) => { const r = c.getBoundingClientRect(); if (r.top <= mid) k = i; }); return k; }
  const go = (d) => chs[clamp(cur + d, 0, chs.length - 1)].scrollIntoView({ behavior: reduce ? 'auto' : 'smooth' });
  $('#cPrev').onclick = () => go(-1); $('#cNext').onclick = () => go(1);
  const cw = $('#cWave'), cx = cw.getContext('2d');
  function drawWave(t, p) {
    const W = cw.width, H = cw.height, n = 46, bw = W / n; cx.clearRect(0, 0, W, H);
    const g = cx.createLinearGradient(0, 0, W, 0); g.addColorStop(0, '#5eead4'); g.addColorStop(.5, '#3b82f6'); g.addColorStop(1, '#8b5cf6');
    for (let i = 0; i < n; i++) {
      const a = reduce ? .5 : Math.abs(Math.sin(t * 3 + i * .45) * Math.sin(t * 1.1 + i * .17));
      const h = Math.max(4, (.18 + a * .82) * H * (i / n <= p ? 1 : .45));
      cx.fillStyle = i / n <= p ? g : 'rgba(124,170,255,.22)';
      cx.beginPath(); cx.roundRect ? cx.roundRect(i * bw + 1, (H - h) / 2, bw - 3, h, 3) : cx.rect(i * bw + 1, (H - h) / 2, bw - 3, h); cx.fill();
    }
  }

  // ---------- content dissolves under the header and the chapter bar ----------
  const fadeSel = 'main h1,main h2,main p,main li,main .kicker,main .pills,main .mini,main .row,main .mock,main .stackrow,main .fc,main .step,main .wc,main .clk,main .stats>div,main .sv,main .svbar,main .svcstack,main .svstrip,main .cp,main .quote,main .ph,main .ic,main details,main .report,main .qa-track,main .qa-now,main .checks,main .tstrip';
  let fadeEls = [];
  const collectFade = () => { fadeEls = [...document.querySelectorAll(fadeSel)].filter((e) => !e.parentElement.closest(fadeSel)); lastDissolveY = -1; };
  collectFade(); setTimeout(collectFade, 1500);
  var lastDissolveY = -1, lastDissolveH = -1;
  function dissolve() {
    if (scrollY < 60) { for (const e of fadeEls) { if (e.style.opacity || e.style.filter) { e.style.opacity = ''; e.style.filter = ''; } } return; }
    if (scrollY === lastDissolveY && innerHeight === lastDissolveH) return; lastDissolveY = scrollY; lastDissolveH = innerHeight;
    const H = innerHeight, top = 74, topBand = 110, bot = H - 90, botBand = 120;
    const rects = fadeEls.map((e) => e.getBoundingClientRect());
    for (let n = 0; n < fadeEls.length; n++) {
      const e = fadeEls[n], r = rects[n];
      if (r.bottom < -20 || r.top > H + 20) continue;
      const a = Math.min(1, Math.max(0, (r.top + Math.min(r.height, 60) * .5 - top) / topBand));
      const b = Math.min(1, Math.max(0, (bot - (r.bottom - Math.min(r.height, 60) * .5)) / botBand));
      const q = Math.min(a, r.height > H * .6 ? 1 : b), k = q * q * (3 - 2 * q);
      const v = k > .995 ? '' : String(k.toFixed(3));
      if (e.style.opacity !== v) { e.style.opacity = v; }
    }
  }
  const NAVMAP = { services: 'services', ch4: 'about', culture: 'about', ch5: 'solutions', aiqa: 'ai-qa', ch6: 'about' };
  var lastCh = -1, lastChY = -1, brandCompact = null;
  function ui(t) {
    const cmp = scrollY > 80; if (cmp !== brandCompact) { brandCompact = cmp; brand.classList.toggle('compact', cmp); }
    if (sub) return;
    if (scrollY !== lastChY) { lastChY = scrollY; cur = currentChapter(); }
    if (cur !== lastCh) {
      lastCh = cur; $('#cLbl').innerHTML = `<b>${String(cur).padStart(2, "0")}</b>${chs[cur].dataset.name}`;
    }
    const p = scrollY / Math.max(1, document.documentElement.scrollHeight - innerHeight);
    drawWave(t, p);
  }

  // ---------- loader ----------
  const pctEl = $('#pct'); let pct = 0;
  const pctTimer = setInterval(() => { pct = Math.min(99, pct + 7 + Math.random() * 9); pctEl.textContent = String(Math.floor(pct)).padStart(2, '0'); }, 90);
  const finish = () => { clearInterval(pctTimer); pctEl.textContent = '100'; setTimeout(() => $('#loader').classList.add('done'), 300); };

  // ---------- 3D stage ----------
  // The home page is the only page with the 3D stage, so only the home page (and 404.html, which renders it) ships
  // three.min.js in its HTML. Pre-rendered sub-pages fetch it on demand when a visitor navigates home.
  let three = null, threeTried = false;
  const ensureThree = () => (window.THREE ? Promise.resolve(true) : new Promise((res) => { const sc = document.createElement('script'); const mv = document.querySelector('script[data-three-v]'); sc.src = 'assets/vendor/three.min.js' + (mv ? '?v=' + mv.dataset.threeV : ''); sc.onload = () => res(!!window.THREE); sc.onerror = () => res(false); document.head.appendChild(sc); }));
  const startStage = () => {
    if (three || threeTried || reduce || !$('#stage')) return; threeTried = true;
    ensureThree().then((ok) => { try { if (ok) three = buildStage(); } catch (e) { console.error(e); } if (!three) { const c = $('#stage'); if (c) c.remove(); } else dispatchEvent(new Event('resize')); });
  };
  if (reduce) $('#stage').remove(); else if (!document.body.classList.contains('sub')) startStage();
  setTimeout(finish, reduce ? 0 : 1600);

  const t0 = performance.now();
  let lastNow = 0, slow = 0, lowered = false;
  function loop(now) { const ft = now - (lastNow || now); lastNow = now;
    if (!lowered && window.__wsR && ft > 0 && ft < 200) { slow = ft > 25 ? slow + 1 : Math.max(0, slow - 2); if (slow > 45) { lowered = true; window.__wsR.setPixelRatio(1); dispatchEvent(new Event('resize')); } }
    if (document.hidden) { requestAnimationFrame(loop); return; }
    const t = Math.max(0, (now - t0) / 1000); ui(t); if (three && !sub) three.frame(t); requestAnimationFrame(loop); }
  linkPaths(document);
  route();
  requestAnimationFrame(loop);

  function buildStage() {
    const canvas = $('#stage');
    const renderer = new THREE.WebGLRenderer({ canvas, antialias: true, alpha: true });
    renderer.setPixelRatio(Math.min(devicePixelRatio, 1.5)); window.__wsR = renderer;
    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(34, 1, .1, 140); camera.position.set(0, 0, 12);

    // studio environment for glossy reflections
    const pmrem = new THREE.PMREMGenerator(renderer);
    const env = new THREE.Scene();
    env.add(new THREE.Mesh(new THREE.BoxGeometry(30, 30, 30), new THREE.MeshBasicMaterial({ color: 0x0b1a4d, side: THREE.BackSide })));
    [[0x7cc4ff, 8, 6, 6, 10, 2], [0x8b5cf6, -9, 2, 4, 6, 6], [0x5eead4, 2, -8, 5, 10, 1], [0xffffff, 0, 9, -4, 14, 1.4]].forEach(([c, x, y, z, s, k]) => { const m = new THREE.Mesh(new THREE.PlaneGeometry(s, s * .5), new THREE.MeshBasicMaterial({ color: new THREE.Color(c).multiplyScalar(k), side: THREE.DoubleSide })); m.position.set(x, y, z); m.lookAt(0, 0, 0); env.add(m); });
    scene.environment = pmrem.fromScene(env, .04).texture;
    scene.add(new THREE.HemisphereLight(0x9fc4ff, 0x0b1033, .55));
    const key = new THREE.DirectionalLight(0xffffff, .85); key.position.set(4, 6, 8); scene.add(key);
    const rim = new THREE.DirectionalLight(0x8b5cf6, .65); rim.position.set(-6, 2, -4); scene.add(rim);

    const C = { teal: new THREE.Color(0x5eead4), sky: new THREE.Color(0x7cc4ff), blue: new THREE.Color(0x3b82f6), violet: new THREE.Color(0x7c3aed) };
    const glossy = (color, extra = {}) => new THREE.MeshPhysicalMaterial(Object.assign({ color, roughness: .33, metalness: .1, clearcoat: .65, clearcoatRoughness: .22, envMapIntensity: .42 }, extra));
    const models = {};
    const mk = (name) => { const g = new THREE.Group(); scene.add(g); models[name] = g; return g; };

    // --- W mark (two glossy V tubes) ---
    function buildW(g) {
      const v = (px, py, z) => new THREE.Vector3((px - 50) / 10, (50 - py) / 10 + .2, z), R = .75;
      const colorize = (geo, fn) => { const p = geo.attributes.position, c = new Float32Array(p.count * 3), t = new THREE.Color(); for (let i = 0; i < p.count; i++) { fn(p.getX(i), p.getY(i), t); c.set([t.r, t.g, t.b], i * 3); } geo.setAttribute('color', new THREE.BufferAttribute(c, 3)); };
      const m = glossy(0xffffff, { vertexColors: true });
      const stroke = (pts, fn, r = R, mat = m) => { const grp = new THREE.Group();
        for (let i = 0; i < pts.length - 1; i++) { const a = pts[i], b = pts[i + 1]; const geo = new THREE.CylinderGeometry(r, r, a.distanceTo(b), 48, 1, true); geo.applyMatrix4(new THREE.Matrix4().compose(a.clone().add(b).multiplyScalar(.5), new THREE.Quaternion().setFromUnitVectors(new THREE.Vector3(0, 1, 0), b.clone().sub(a).normalize()), new THREE.Vector3(1, 1, 1))); if (fn) colorize(geo, fn); grp.add(new THREE.Mesh(geo, mat)); }
        pts.forEach((p) => { const s = new THREE.SphereGeometry(r, 48, 24); s.translate(p.x, p.y, p.z); if (fn) colorize(s, fn); grp.add(new THREE.Mesh(s, mat)); }); return grp; };
      const fG = (x, y, c) => c.copy(C.teal).lerp(C.blue, clamp((2.8 - y) / 5.6));
      const bG = (x, y, c) => c.copy(C.blue).lerp(C.violet, clamp(((x + .8) / 4.6 + (2.8 - y) / 5.6) / 2));
      const hl = new THREE.MeshBasicMaterial({ color: 0xffffff, transparent: true, opacity: .7 });
      const back = stroke([v(42, 41, -.5), v(62, 80, -.5), v(87, 24, -.5)], bG), front = stroke([v(13, 24, .5), v(34, 80, .5), v(53, 36, .5)], fG);
      back.add(stroke([v(49, 45, -.5 + R * .92), v(42, 64, -.5 + R * .92)], null, .06, hl)); front.add(stroke([v(20, 34, .5 + R * .92), v(29, 58, .5 + R * .92)], null, .06, hl));
      g.add(back); g.add(front); g.userData.front = front; g.userData.back = back;
      g.scale.setScalar(.62);
    }
    buildW(mk('w')); buildW(mk('w2'));

    // --- browser screens ---
    function uiTex(kind) {
      const c = document.createElement('canvas'); c.width = 640; c.height = 420; const x = c.getContext('2d');
      const rr = (a, b, w, h, r, f) => { x.beginPath(); x.moveTo(a + r, b); x.arcTo(a + w, b, a + w, b + h, r); x.arcTo(a + w, b + h, a, b + h, r); x.arcTo(a, b + h, a, b, r); x.arcTo(a, b, a + w, b, r); x.closePath(); x.fillStyle = f; x.fill(); };
      rr(0, 0, 640, 420, 26, '#0b1b4f'); rr(0, 0, 640, 56, 0, '#12286e');
      ['#fb7185', '#fbbf24', '#34d399'].forEach((f, i) => { x.beginPath(); x.arc(30 + i * 24, 28, 7, 0, 7); x.fillStyle = f; x.fill(); });
      rr(120, 16, 380, 24, 12, '#0b1b4f');
      const g = x.createLinearGradient(0, 0, 640, 0); g.addColorStop(0, '#5eead4'); g.addColorStop(.5, '#3b82f6'); g.addColorStop(1, '#8b5cf6');
      if (kind === 0) { rr(36, 86, 330, 150, 16, g); x.globalAlpha = .85; [0, 1, 2].forEach((i) => rr(390, 92 + i * 34, 210 - i * 50, 14, 7, '#7cc4ff')); rr(390, 200, 110, 34, 12, '#ffffff'); x.globalAlpha = 1; [0, 1, 2].forEach((i) => rr(36 + i * 196, 264, 176, 120, 14, '#16307a')); }
      if (kind === 1) { x.font = '500 22px monospace'; const lines = [['#c4b5fd', 'export async function '], ['#7cc4ff', 'quote'], ['#c8d6f5', '(id) {'], ['#5f74a8', '  // fetch and price'], ['#c8d6f5', '  const q = await db.get(id);'], ['#5eead4', "  return price(q, 'GBP');"], ['#c8d6f5', '}']];
        let y = 100; lines.forEach(([col, s], i) => { if (i === 1 || i === 2) return; x.fillStyle = col; x.fillText(s, 40, y); y += 40; }); x.fillStyle = '#7cc4ff'; x.fillText('quote', 40 + x.measureText('export async function ').width, 100); }
      if (kind === 2) { [0, 1, 2].forEach((i) => { rr(36 + i * 196, 84, 176, 90, 14, '#16307a'); x.fillStyle = '#93a7d6'; x.font = '500 18px sans-serif'; x.fillText(['Orders', 'Sync', 'Release'][i], 56 + i * 196, 118); x.fillStyle = '#ffffff'; x.font = '700 28px sans-serif'; x.fillText(['Live', 'Healthy', 'Friday'][i], 56 + i * 196, 154); });
        rr(36, 196, 568, 190, 14, '#16307a'); x.strokeStyle = g; x.lineWidth = 5; x.beginPath(); [30, 46, 40, 80, 70, 110, 96, 140, 128, 160].forEach((v, i) => { const px = 60 + i * 58, py = 360 - v; i ? x.lineTo(px, py) : x.moveTo(px, py); }); x.stroke(); }
      const t = new THREE.CanvasTexture(c); t.anisotropy = 8; return t;
    }
    (() => { const g = mk('screens');
      const geo = new THREE.BoxGeometry(4.2, 2.76, .06);
      [[2, -1.6, -1.3, -1.2, .3], [1, 1.5, 1.1, -.4, -.2], [0, 0, 0, .7, 0]].forEach(([k, x, y, z, ry]) => {
        const tex = uiTex(k);
        const mats = [0, 1, 2, 3].map(() => new THREE.MeshStandardMaterial({ color: 0x16307a, roughness: .4 })); mats.push(new THREE.MeshStandardMaterial({ map: tex, emissiveMap: tex, emissive: 0xffffff, emissiveIntensity: .38, roughness: .35 })); mats.push(new THREE.MeshStandardMaterial({ color: 0x0b1b4f }));
        const m = new THREE.Mesh(geo, mats); m.position.set(x, y, z); m.rotation.y = ry - .35; m.userData.base = m.position.clone(); g.add(m);
        const edge = new THREE.LineSegments(new THREE.EdgesGeometry(geo), new THREE.LineBasicMaterial({ color: 0x7cc4ff, transparent: true, opacity: .5 })); m.add(edge);
      });
      g.userData.anim = (t) => g.children.forEach((m, i) => { m.position.y = m.userData.base.y + Math.sin(t * 1.1 + i * 1.7) * .12; });
      g.rotation.x = .08; g.scale.setScalar(.92);
    })();

    // --- AI core with a voice ring ---
    (() => { const g = mk('ai');
      const core = new THREE.Mesh(new THREE.IcosahedronGeometry(1.15, 4), glossy(0x0b1a4d, { emissive: 0x1d4ed8, emissiveIntensity: .24, metalness: .4 })); g.add(core);
      const wire = new THREE.LineSegments(new THREE.EdgesGeometry(new THREE.IcosahedronGeometry(1.19, 1)), new THREE.LineBasicMaterial({ color: 0x7cc4ff, transparent: true, opacity: .6 })); g.add(wire);
      const glowC = document.createElement('canvas'); glowC.width = glowC.height = 128; const gx = glowC.getContext('2d'); const rg = gx.createRadialGradient(64, 64, 0, 64, 64, 64); rg.addColorStop(0, 'rgba(124,196,255,.9)'); rg.addColorStop(.35, 'rgba(59,130,246,.35)'); rg.addColorStop(1, 'rgba(59,130,246,0)'); gx.fillStyle = rg; gx.fillRect(0, 0, 128, 128);
      const glow = new THREE.Sprite(new THREE.SpriteMaterial({ map: new THREE.CanvasTexture(glowC), blending: THREE.AdditiveBlending, depthWrite: false, transparent: true })); glow.scale.set(5, 5, 1); g.add(glow);
      const rings = [[1.75, .03, 0x5eead4, 1.2, .4], [2.05, .022, 0x8b5cf6, -.9, -.6]].map(([r, tk, c, s, tilt]) => { const m = new THREE.Mesh(new THREE.TorusGeometry(r, tk, 12, 120), new THREE.MeshBasicMaterial({ color: c })); m.rotation.set(Math.PI / 2 + tilt, tilt * .5, 0); m.userData.s = s; g.add(m);
        for (let i = 0; i < 5; i++) { const n = new THREE.Mesh(new THREE.SphereGeometry(.07, 12, 8), new THREE.MeshBasicMaterial({ color: 0xffffff })); const a = i / 5 * Math.PI * 2; n.position.set(Math.cos(a) * r, Math.sin(a) * r, 0); m.add(n); } return m; });
      const bars = [], NB = 84, ringR = 2.75;
      const barGeo = new THREE.BoxGeometry(.07, 1, .07); barGeo.translate(0, .5, 0);
      for (let i = 0; i < NB; i++) { const a = i / NB * Math.PI * 2; const col = C.teal.clone().lerp(C.blue, (i % (NB / 2)) / (NB / 2)).lerp(C.violet, i > NB / 2 ? .5 : 0);
        const b = new THREE.Mesh(barGeo, new THREE.MeshBasicMaterial({ color: col })); b.position.set(Math.cos(a) * ringR, Math.sin(a) * ringR, 0); b.rotation.z = a - Math.PI / 2; g.add(b); bars.push(b); }
      g.userData.anim = (t) => { core.rotation.y = t * .3; wire.rotation.y = -t * .2; wire.rotation.x = t * .1; rings.forEach((r) => (r.rotation.z = t * r.userData.s * .5));
        const talk = .5 + .5 * Math.sin(t * 1.3);
        bars.forEach((b, i) => { b.scale.y = .12 + Math.abs(Math.sin(t * 5 + i * .55) * Math.sin(t * 1.7 + i * .21)) * (.35 + .75 * talk); });
        glow.material.opacity = .7 + talk * .3; };
      g.scale.setScalar(.8);
    })();

    // --- twisting cube (3x3x3) ---
    (() => { const g = mk('cube'); const holder = new THREE.Group(); g.add(holder);
      const S = .66, cubies = [];
      const geo = new THREE.BoxGeometry(S * .94, S * .94, S * .94); const eg = new THREE.EdgesGeometry(geo);
      for (let x = -1; x <= 1; x++) for (let y = -1; y <= 1; y++) for (let z = -1; z <= 1; z++) {
        const t = clamp((x + 1) / 4 + (1 - y) / 4); const col = t < .5 ? C.teal.clone().lerp(C.blue, t * 2) : C.blue.clone().lerp(C.violet, (t - .5) * 2);
        const m = new THREE.Mesh(geo, glossy(col, { transparent: true, opacity: .92 })); m.position.set(x * S * 1.04, y * S * 1.04, z * S * 1.04);
        m.add(new THREE.LineSegments(eg, new THREE.LineBasicMaterial({ color: 0xffffff, transparent: true, opacity: .35 }))); holder.add(m); cubies.push(m);
      }
      const pivot = new THREE.Group(); holder.add(pivot);
      let move = null, nextAt = 0;
      const axes = ['x', 'y', 'z'];
      g.userData.anim = (t) => { holder.rotation.y = t * .25; holder.rotation.x = .45 + Math.sin(t * .4) * .1;
        if (reduce) return;
        if (!move && t > nextAt) { const ax = axes[Math.floor(Math.random() * 3)], layer = Math.floor(Math.random() * 3) - 1, dir = Math.random() < .5 ? 1 : -1;
          pivot.rotation.set(0, 0, 0); pivot.updateMatrixWorld();
          cubies.forEach((c) => { if (Math.round(c.position[ax] / (S * 1.04)) === layer) pivot.attach(c); });
          move = { ax, dir, start: t }; }
        if (move) { const k = clamp((t - move.start) / .6); const e = k < .5 ? 4 * k * k * k : 1 - Math.pow(-2 * k + 2, 3) / 2; pivot.rotation[move.ax] = e * move.dir * Math.PI / 2;
          if (k >= 1) { pivot.updateMatrixWorld(); [...pivot.children].forEach((c) => { holder.attach(c); c.position.set(Math.round(c.position.x / (S * 1.04)) * S * 1.04, Math.round(c.position.y / (S * 1.04)) * S * 1.04, Math.round(c.position.z / (S * 1.04)) * S * 1.04); c.rotation.set(Math.round(c.rotation.x / (Math.PI / 2)) * Math.PI / 2, Math.round(c.rotation.y / (Math.PI / 2)) * Math.PI / 2, Math.round(c.rotation.z / (Math.PI / 2)) * Math.PI / 2); }); move = null; nextAt = t + .35; } } };
      g.scale.setScalar(1.15);
    })();

    // --- three steps with a hopping orb ---
    (() => { const g = mk('steps');
      const label = (txt) => { const c = document.createElement('canvas'); c.width = 256; c.height = 64; const x = c.getContext('2d'); x.font = '600 30px Sora, sans-serif'; x.fillStyle = '#eef4ff'; x.textAlign = 'center'; x.fillText(txt, 128, 42); const t = new THREE.CanvasTexture(c); const s = new THREE.Sprite(new THREE.SpriteMaterial({ map: t, transparent: true, depthWrite: false })); s.scale.set(1.6, .4, 1); return s; };
      const P = [[-1.9, -1.3], [0, -.25], [1.9, .8]], cols = [C.teal, C.blue, C.violet];
      const tops = P.map(([x, y], i) => { const m = new THREE.Mesh(new THREE.BoxGeometry(1.7, .3, 1.7), glossy(cols[i].clone().multiplyScalar(.85), { transparent: true, opacity: .95 })); m.position.set(x, y, 0); g.add(m);
        m.add(new THREE.LineSegments(new THREE.EdgesGeometry(m.geometry), new THREE.LineBasicMaterial({ color: 0xffffff, transparent: true, opacity: .45 })));
        const l = label(['WRITE', 'REVIEW', 'SHIP'][i]); l.position.set(x, y - .55, .9); g.add(l); return new THREE.Vector3(x, y + .15, 0); });
      const orb = new THREE.Mesh(new THREE.SphereGeometry(.26, 32, 16), new THREE.MeshStandardMaterial({ color: 0xffffff, emissive: 0x7cc4ff, emissiveIntensity: .9 })); g.add(orb);
      const ol = new THREE.PointLight(0x7cc4ff, 1, 4); orb.add(ol);
      g.userData.anim = (t) => { const cyc = (t * .7) % 3, i = Math.floor(cyc), f = cyc - i; const a = tops[i], b = tops[(i + 1) % 3];
        if (i < 2) { const e = f < .7 ? 0 : (f - .7) / .3; orb.position.lerpVectors(a, b, e); orb.position.y += .26 + Math.sin(e * Math.PI) * 1.1 + (e === 0 ? Math.abs(Math.sin(f * 9)) * .12 : 0); }
        else { const e = f; orb.position.set(lerp(tops[2].x, tops[0].x, e), lerp(tops[2].y, tops[0].y, e) + .26 + Math.sin(e * Math.PI) * .6, Math.sin(e * Math.PI) * 1.4); }
        g.rotation.y = -.35 + Math.sin(t * .4) * .12; };
      g.rotation.x = .25; g.scale.setScalar(.82); g.position.x = -.4;
    })();

    // --- wire globe with the UK marker ---
    (() => { const g = mk('globe'); const R = 2.1; const holder = new THREE.Group(); g.add(holder);
      holder.add(new THREE.Mesh(new THREE.SphereGeometry(R * .985, 48, 32), glossy(0x0b1a4d, { transparent: true, opacity: .85, metalness: .3 })));
      const lm = new THREE.LineBasicMaterial({ color: 0x7cc4ff, transparent: true, opacity: .32 });
      for (let la = -60; la <= 60; la += 30) { const pts = []; for (let i = 0; i <= 64; i++) { const a = i / 64 * Math.PI * 2, r = R * Math.cos(la * Math.PI / 180); pts.push(new THREE.Vector3(Math.cos(a) * r, R * Math.sin(la * Math.PI / 180), Math.sin(a) * r)); } holder.add(new THREE.Line(new THREE.BufferGeometry().setFromPoints(pts), lm)); }
      for (let lo = 0; lo < 180; lo += 30) { const pts = []; for (let i = 0; i <= 64; i++) { const a = i / 64 * Math.PI * 2; pts.push(new THREE.Vector3(Math.cos(a) * R * Math.cos(lo * Math.PI / 180), Math.sin(a) * R, Math.cos(a) * R * Math.sin(lo * Math.PI / 180))); } holder.add(new THREE.Line(new THREE.BufferGeometry().setFromPoints(pts), lm)); }
      const ll = (lat, lon, r = R) => { const p = (90 - lat) * Math.PI / 180, t = (lon + 180) * Math.PI / 180; return new THREE.Vector3(-r * Math.sin(p) * Math.cos(t), r * Math.cos(p), r * Math.sin(p) * Math.sin(t)); };
      const uk = ll(51.5, -.1);
      [[uk, 0x5eead4]].forEach(([p, c]) => { const m = new THREE.Mesh(new THREE.SphereGeometry(.09, 16, 8), new THREE.MeshBasicMaterial({ color: c })); m.position.copy(p); holder.add(m); const ring = new THREE.Mesh(new THREE.RingGeometry(.14, .18, 32), new THREE.MeshBasicMaterial({ color: c, side: THREE.DoubleSide, transparent: true })); ring.position.copy(p.clone().multiplyScalar(1.01)); ring.lookAt(p.clone().multiplyScalar(2)); holder.add(ring); ring.userData.pulse = true; });
      const orbit = new THREE.Mesh(new THREE.TorusGeometry(R * 1.32, .012, 6, 160), new THREE.MeshBasicMaterial({ color: 0x8b5cf6, transparent: true, opacity: .6 })); orbit.rotation.x = Math.PI / 2.3; g.add(orbit);
      const sat = new THREE.Mesh(new THREE.SphereGeometry(.08, 12, 8), new THREE.MeshBasicMaterial({ color: 0x5eead4 })); orbit.add(sat);
      holder.rotation.set(.45, -2.2, 0);
      g.userData.anim = (t) => { holder.rotation.y = -2.2 + Math.sin(t * .25) * .35; const a = t * .6; sat.position.set(Math.cos(a) * R * 1.32, Math.sin(a) * R * 1.32, 0);
        holder.children.forEach((c) => { if (c.userData.pulse) { const k = (t * .8) % 1; c.scale.setScalar(1 + k * 1.8); c.material.opacity = 1 - k; } }); };
    })();

    // --- service orbit: a ring of tiles round a small W ---
    (() => { const g = mk('orbit'); const holder = new THREE.Group(); holder.rotation.x = .3; g.add(holder);
      const labels = ['Sitecore', 'Umbraco', 'Workflows', 'Content', 'Migration', 'Headless', '.NET  C#', 'APIs', 'AI', 'AI QA', 'Web apps', 'Custom web', 'Modernise', 'Speed', 'Support'];
      const n = labels.length, R = 3.45;
      const stops = ['#5eead4', '#7cc4ff', '#3b82f6', '#8b5cf6'];
      const tex = (label, i) => { const c = document.createElement('canvas'); c.width = 320; c.height = 200; const x = c.getContext('2d');
        const rr = (a, b, w, h, r) => { x.beginPath(); x.moveTo(a + r, b); x.arcTo(a + w, b, a + w, b + h, r); x.arcTo(a + w, b + h, a, b + h, r); x.arcTo(a, b + h, a, b, r); x.arcTo(a, b, a + w, b, r); x.closePath(); };
        const gr = x.createLinearGradient(0, 0, 320, 200); const k = i / (n - 1) * (stops.length - 1), j = Math.min(stops.length - 2, Math.floor(k)); gr.addColorStop(0, stops[j]); gr.addColorStop(1, stops[j + 1]);
        rr(0, 0, 320, 200, 28); x.fillStyle = gr; x.fill(); rr(6, 6, 308, 188, 23); x.fillStyle = '#0b1b4f'; x.fill();
        x.fillStyle = gr; x.font = '500 22px monospace'; 
        x.fillStyle = '#ffffff'; x.font = '600 44px Sora, sans-serif'; x.textAlign = 'center'; x.fillText(label, 160, 128);
        rr(110, 152, 100, 6, 3); x.fillStyle = gr; x.fill();
        const t = new THREE.CanvasTexture(c); t.anisotropy = 8; return t; };
      const geo = new THREE.BoxGeometry(1.36, .85, .07);
      const side = new THREE.MeshStandardMaterial({ color: 0x1d3a8a, roughness: .4 }), backM = new THREE.MeshStandardMaterial({ color: 0x0b1b4f, roughness: .6 });
      const tiles = labels.map((l, i) => { const t = tex(l, i); const front = new THREE.MeshStandardMaterial({ map: t, emissiveMap: t, emissive: 0xffffff, emissiveIntensity: .38, roughness: .35 });
        const m = new THREE.Mesh(geo, [side, side, side, side, front, backM]); const a = i / n * Math.PI * 2; m.position.set(Math.sin(a) * R, 0, Math.cos(a) * R); m.rotation.y = a; holder.add(m); return m; });
      const ring = new THREE.Mesh(new THREE.TorusGeometry(R, .015, 6, 160), new THREE.MeshBasicMaterial({ color: 0x7cc4ff, transparent: true, opacity: .5 })); ring.rotation.x = Math.PI / 2; ring.position.y = -.6; holder.add(ring);
      const ring2 = new THREE.Mesh(new THREE.TorusGeometry(R * .55, .012, 6, 120), new THREE.MeshBasicMaterial({ color: 0x8b5cf6, transparent: true, opacity: .5 })); ring2.rotation.x = Math.PI / 2; ring2.position.y = -.6; holder.add(ring2);
      const w = new THREE.Group(); buildW(w); w.scale.setScalar(.55); w.position.y = .4; g.add(w);
      let ang = 0;
      g.userData.anim = (t) => {
        if (svcHover >= 0) { const target = -svcHover / n * Math.PI * 2; let d = target - ang; d = ((d + Math.PI) % (Math.PI * 2) + Math.PI * 2) % (Math.PI * 2) - Math.PI; ang += d * .09; }
        else if (t > 0) ang -= .0035;
        holder.rotation.y = ang;
        svcFront = ((Math.round(-ang / (Math.PI * 2) * n) % n) + n) % n;
        tiles.forEach((m, i) => m.scale.setScalar(lerp(m.scale.x, i === svcFront ? 1.2 : 1, .15)));
        w.rotation.y = t * .6;
      };
    })();

    // ---------- one continuous space: stations along a flight path ----------
    const SP = 15, D = 12, N = chs.length;
    const FOGC = 0x050c26;
    scene.fog = new THREE.FogExp2(FOGC, .021);

    // per-model materials, made fadeable
    Object.values(models).forEach((g) => {
      const mats = [];
      g.traverse((o) => { if (!o.material) return; (Array.isArray(o.material) ? o.material : [o.material]).forEach((m) => { if (mats.includes(m)) return; m.userData.base = m.opacity; m.transparent = true; mats.push(m); }); });
      g.userData.mats = mats;
      g.userData.baseScale = g.scale.x; g.userData.baseRy = g.rotation.y; g.userData.baseRx = g.rotation.x;
      g.visible = true;
    });
    // station index of each model
    const stationOf = {}; chs.forEach((c, i) => { if (c.dataset.model && c.dataset.model !== 'none') stationOf[c.dataset.model] = i; });

    // light trails: two ribbons in the logo colours that run through every chapter
    const zEnd = -(N - 1) * SP - 30;
    const glowTexC = document.createElement('canvas'); glowTexC.width = glowTexC.height = 64; const gtx = glowTexC.getContext('2d'); const grd = gtx.createRadialGradient(32, 32, 0, 32, 32, 32); grd.addColorStop(0, 'rgba(255,255,255,1)'); grd.addColorStop(.3, 'rgba(255,255,255,.35)'); grd.addColorStop(1, 'rgba(255,255,255,0)'); gtx.fillStyle = grd; gtx.fillRect(0, 0, 64, 64);
    const glowTex = new THREE.CanvasTexture(glowTexC);
    const trails = [[0, C.teal, C.blue], [Math.PI, C.violet, C.sky]].map(([ph, c1, c2]) => {
      const pts = [];
      for (let z = D + 95; z >= zEnd; z -= 2.5) { const k = z * .11 + ph; pts.push(new THREE.Vector3(Math.sin(k) * (7.6 + Math.sin(z * .05) * 2.2), Math.cos(k * .8) * 2.6 - .8, z)); }
      const curve = new THREE.CatmullRomCurve3(pts);
      const paint = (geo) => { const p = geo.attributes.position, col = new Float32Array(p.count * 3), c = new THREE.Color(); for (let i = 0; i < p.count; i++) { const t = .5 + .5 * Math.sin(p.getZ(i) * .06); c.copy(c1).lerp(c2, t); col.set([c.r, c.g, c.b], i * 3); } geo.setAttribute('color', new THREE.BufferAttribute(col, 3)); };
      const core = new THREE.TubeGeometry(curve, 1100, .026, 8); paint(core);
      const halo = new THREE.TubeGeometry(curve, 1100, .2, 10); paint(halo);
      const trailMat = (op) => new THREE.ShaderMaterial({ transparent: true, depthWrite: false, blending: THREE.AdditiveBlending, uniforms: { uOp: { value: op } },
        vertexShader: 'attribute vec3 color; varying vec3 vC; varying float vD; void main(){ vC = color; vec4 mv = modelViewMatrix * vec4(position,1.0); vD = -mv.z; gl_Position = projectionMatrix * mv; }',
        fragmentShader: 'uniform float uOp; varying vec3 vC; varying float vD; void main(){ float a = smoothstep(3.0, 11.0, vD) * (1.0 - smoothstep(38.0, 60.0, vD)); gl_FragColor = vec4(vC, uOp * a); }' });
      scene.add(new THREE.Mesh(core, trailMat(.6)));
      scene.add(new THREE.Mesh(halo, trailMat(.035)));
      const sparks = Array.from({ length: 14 }, (_, i) => { const s = new THREE.Sprite(new THREE.SpriteMaterial({ map: glowTex, color: i % 2 ? c1 : c2, blending: THREE.AdditiveBlending, depthWrite: false, transparent: true })); s.scale.set(.45, .45, 1); scene.add(s); return { s, o: i / 14 }; });
      return { curve, sparks };
    });

    // gates you fly through between chapters
    const gates = [];
    for (let i = 0; i < N - 1; i++) {
      const g = new THREE.Group(); g.position.set(0, -.2, D - (i + .5) * SP); scene.add(g);
      const r = 7.6;
      const ring = new THREE.Mesh(new THREE.TorusGeometry(r, .025, 6, 180), new THREE.MeshBasicMaterial({ color: i % 2 ? 0x8b5cf6 : 0x5eead4, transparent: true, opacity: .35, blending: THREE.AdditiveBlending, depthWrite: false })); g.add(ring);
      const tp = []; for (let k = 0; k < 120; k++) { const a = k / 120 * Math.PI * 2, l = k % 10 === 0 ? .55 : .2; tp.push(Math.cos(a) * (r - .15), Math.sin(a) * (r - .15), 0, Math.cos(a) * (r - .15 - l), Math.sin(a) * (r - .15 - l), 0); }
      const tg = new THREE.BufferGeometry(); tg.setAttribute('position', new THREE.Float32BufferAttribute(tp, 3));
      g.add(new THREE.LineSegments(tg, new THREE.LineBasicMaterial({ color: 0x7cc4ff, transparent: true, opacity: .22 })));
      const arc = new THREE.Mesh(new THREE.TorusGeometry(r + .35, .05, 6, 60, Math.PI * .55), new THREE.MeshBasicMaterial({ color: 0x7cc4ff, transparent: true, opacity: .5, blending: THREE.AdditiveBlending, depthWrite: false })); g.add(arc);
      g.userData = { ring, arc, s: i % 2 ? -1 : 1 };
      gates.push(g);
    }

    for (let i = 1; i <= 4; i++) {
      const g = new THREE.Group(); g.position.set(0, -.2, D + 6 + i * 16); scene.add(g);
      const ring = new THREE.Mesh(new THREE.TorusGeometry(7.6, .025, 6, 180), new THREE.MeshBasicMaterial({ color: i % 2 ? 0x8b5cf6 : 0x5eead4, transparent: true, opacity: .35, blending: THREE.AdditiveBlending, depthWrite: false })); g.add(ring);
      const arc = new THREE.Mesh(new THREE.TorusGeometry(7.95, .05, 6, 60, Math.PI * .55), new THREE.MeshBasicMaterial({ color: 0x7cc4ff, transparent: true, opacity: .5, blending: THREE.AdditiveBlending, depthWrite: false })); g.add(arc);
      g.userData = { ring, arc, s: i % 2 ? -1 : 1 }; gates.push(g);
    }

    // floating code symbols
    const glyphs = ['</>', '{ }', 'C#', '.NET', '=>', '( )', '[ ]', 'AI', '::', '01', '#', '&&'];
    const glyphTex = glyphs.map((g) => { const c = document.createElement('canvas'); c.width = 256; c.height = 128; const x = c.getContext('2d'); x.font = '600 76px "JetBrains Mono", monospace'; x.textAlign = 'center'; x.textBaseline = 'middle'; x.fillStyle = '#ffffff'; x.shadowColor = 'rgba(124,196,255,.9)'; x.shadowBlur = 18; x.fillText(g, 128, 66); return new THREE.CanvasTexture(c); });
    const glyphCols = [0x5eead4, 0x7cc4ff, 0x3b82f6, 0x8b5cf6];
    const floaters = Array.from({ length: mobile() ? 26 : 54 }, (_, i) => {
      const sp = new THREE.Sprite(new THREE.SpriteMaterial({ map: glyphTex[i % glyphTex.length], color: glyphCols[i % 4], transparent: true, opacity: .32, depthWrite: false, blending: THREE.AdditiveBlending }));
      const side = i % 2 ? 1 : -1, sc = .9 + Math.random() * 1.4;
      sp.position.set(side * (5.5 + Math.random() * 7), -3.5 + Math.random() * 8, D + 80 - Math.random() * (D + 80 - zEnd + 10)); sp.scale.set(sc * 2, sc, 1);
      sp.userData = { y: sp.position.y, ph: Math.random() * 6.28 }; scene.add(sp); return sp; });


    // click bursts
    const BN = 700, bPos = new Float32Array(BN * 3), bCol = new Float32Array(BN * 3), bVel = new Float32Array(BN * 3), bLife = new Float32Array(BN); let bHead = 0;
    const bGeo = new THREE.BufferGeometry(); bGeo.setAttribute('position', new THREE.BufferAttribute(bPos, 3)); bGeo.setAttribute('color', new THREE.BufferAttribute(bCol, 3));
    const burst = new THREE.Points(bGeo, new THREE.PointsMaterial({ size: .14, map: glowTex, vertexColors: true, transparent: true, blending: THREE.AdditiveBlending, depthWrite: false })); burst.frustumCulled = false; scene.add(burst);
    const burstCols = [C.teal, C.sky, C.blue, C.violet];
    addEventListener('click', (e) => {
      if (reduce || e.target.closest('a,button,input,textarea,.mock,.wc,.clk,.stats,.svcstack,.cbar,header')) return;
      const nx = e.clientX / innerWidth * 2 - 1, ny = -(e.clientY / innerHeight) * 2 + 1;
      const v = new THREE.Vector3(nx, ny, .5).unproject(camera).sub(camera.position).normalize();
      const at = camera.position.clone().add(v.multiplyScalar(8));
      for (let k = 0; k < 90; k++) { const i = bHead; bHead = (bHead + 1) % BN;
        const th = Math.random() * 6.283, ph = Math.acos(2 * Math.random() - 1), sp = 2.2 + Math.random() * 3.2;
        bPos.set([at.x, at.y, at.z], i * 3); bVel.set([Math.sin(ph) * Math.cos(th) * sp, Math.sin(ph) * Math.sin(th) * sp, Math.cos(ph) * sp], i * 3); bLife[i] = 1;
        const c = burstCols[k % 4]; bCol.set([c.r, c.g, c.b], i * 3); }
    });
    let lastT = 0;

    // drifting dust and a floor grid that fades into the fog
    const DN = mobile() ? 900 : 1800, dp = new Float32Array(DN * 3);
    for (let i = 0; i < DN; i++) dp.set([(Math.random() - .5) * 34, (Math.random() - .5) * 18, D + 90 - Math.random() * (D + 90 - zEnd)], i * 3);
    const dg = new THREE.BufferGeometry(); dg.setAttribute('position', new THREE.BufferAttribute(dp, 3));
    const dust = new THREE.Points(dg, new THREE.PointsMaterial({ color: 0x9fc4ff, size: .05, transparent: true, opacity: .7, depthWrite: false })); scene.add(dust);
    const grid = new THREE.GridHelper(360, 180, 0x3b82f6, 0x1e3a8a); grid.material.transparent = true; grid.material.opacity = .22; grid.position.set(0, -5.2, (D + 90 + zEnd) / 2); scene.add(grid);

    // ---------- scroll → continuous position along the path ----------
    function scrollPos() {
      const vh = innerHeight, mid = vh / 2;
      const r = chs.map((c) => { const b = c.getBoundingClientRect(); const h = Math.min(b.height, vh); return { a: b.top + h / 2, z: b.bottom - h / 2 }; });
      const has = chs.map((c) => !!c.dataset.model && c.dataset.model !== 'none');
      const hold = (k) => { while (k > 0 && !has[k]) k--; return k; };
      if (mid <= r[0].a) return 0;
      for (let i = 0; i < r.length; i++) {
        if (mid >= r[i].a && mid <= r[i].z) return hold(i);
        if (i < r.length - 1 && mid > r[i].z && mid < r[i + 1].a) { const f = (mid - r[i].z) / (r[i + 1].a - r[i].z), e = f * f * (3 - 2 * f), a = hold(i), b = has[i + 1] ? i + 1 : a; return a + (b - a) * e; }
      }
      return hold(r.length - 1);
    }
    let camZ = reduce ? D : D + 82, mx = 0, my = 0, smx = 0, smy = 0;
    addEventListener('pointermove', (e) => { mx = e.clientX / innerWidth - .5; my = e.clientY / innerHeight - .5; }, { passive: true });
    function resize() { renderer.setSize(innerWidth, innerHeight, false); camera.aspect = innerWidth / innerHeight; camera.updateProjectionMatrix(); }
    addEventListener('resize', resize); resize();
    const sstep = (a, b, x) => { const t = clamp((x - a) / (b - a)); return t * t * (3 - 2 * t); };
    camera.far = 140; camera.updateProjectionMatrix();

    return { frame(t) {
      const m = mobile();
      const s = scrollPos();
      const target = D - s * SP;
      const kz = reduce ? 1 : t < 1.9 ? 0 : t < 5 ? .03 : .085;
      camZ = lerp(camZ, target, kz);
      smx = lerp(smx, mx, .05); smy = lerp(smy, my, .05);
      const frac = s - Math.floor(s), dir = Math.floor(s) % 2 ? -1 : 1;
      camera.position.set(reduce ? 0 : smx * .7, reduce ? 0 : -smy * .45, camZ);
      camera.lookAt(camera.position.x * .4, camera.position.y * .4, camZ - 10);
      camera.rotateZ(reduce ? 0 : Math.sin(frac * Math.PI) * .07 * dir);
      const halfH = D * Math.tan(17 * Math.PI / 180), halfW = halfH * camera.aspect;

      Object.entries(models).forEach(([name, g]) => {
        const i = stationOf[name]; if (i === undefined) { g.visible = false; return; }
        const ch = chs[i], ud = g.userData;
        const zS = -i * SP, d = camZ - zS;                     // distance ahead of the camera
        const fade = sstep(3.5, 8, d) * (1 - sstep(D + SP * .3, D + SP * .8, d));
        g.visible = fade > .005;
        if (!g.visible) return;
        let x = m ? 0 : +(ch.dataset.shift || 0) * 2 * halfW, y = m ? (name === 'w' ? 2.0 : 2.6) : +(ch.dataset.y || 0);
        const past = Math.max(0, D - d);                      // how far we have flown past its resting spot
        const len = Math.hypot(x, y) || 1, ox = Math.abs(x) + Math.abs(y) < .3 ? 0 : x / len, oy = Math.abs(x) + Math.abs(y) < .3 ? 1 : y / len;
        x += ox * past * .55; y += oy * past * .55;
        let fitSc = 0;
        if (name === 'w' && !m) {
          const pills = document.querySelector('#ch0 .pills');
          if (pills) {
            const pillsTop = pills.getBoundingClientRect().top + scrollY, topPx = 88, gap = 16;
            const avail = Math.max(110, pillsTop - gap - topPx);
            const ppu = innerHeight / (2 * D * Math.tan(17 * Math.PI / 180));
            const wantPx = Math.min(avail, 300, ud.baseScale * +(ch.dataset.scale || 1) * 7.1 * ppu);
            fitSc = wantPx / (7.1 * ppu);
            y = (innerHeight / 2 - (topPx + avail / 2 + Math.max(0, avail - wantPx) / 2 * .6)) / ppu + Math.min(scrollY, innerHeight * 1.2) / ppu * (D / Math.max(1, d));
          }
        }
        g.position.set(x, y, zS);
        const sc = fitSc || ud.baseScale * +(ch.dataset.scale || 1) * (name === 'w2' ? .95 : 1) * (m ? .62 : 1);
        g.scale.setScalar(sc);
        g.rotation.y = ud.baseRy + (reduce ? 0 : (d - D) * .07 + smx * .4 + (name.startsWith('w') ? Math.sin(t * .5) * .25 : 0));
        g.rotation.x = ud.baseRx + (reduce ? 0 : smy * .2);
        if (name.startsWith('w') && !reduce) { const sp = past * .35 + Math.max(0, d - D) * .18; ud.front.position.x = -sp; ud.back.position.x = sp; g.position.y += Math.sin(t * 1.1) * .1; }
        ud.mats.forEach((mt) => (mt.opacity = mt.userData.base * fade));
        if (ud.anim) ud.anim(reduce ? 0 : t);
      });

      trails.forEach((tr, k) => tr.sparks.forEach((sp) => { const u = (((reduce ? sp.o : sp.o + t * (.012 + k * .004)) % 1) + 1) % 1; sp.s.position.copy(tr.curve.getPoint(u)); }));
      gates.forEach((g) => { const d = camZ - g.position.z; const f = sstep(-2, 2, d) * (1 - sstep(30, 44, d)); g.visible = f > .01; g.userData.ring.material.opacity = .35 * f; g.userData.arc.material.opacity = .55 * f; g.rotation.z = reduce ? 0 : t * .08 * g.userData.s; });
      if (!reduce) dust.rotation.z = t * .006;
      const dt = Math.min(.05, Math.max(0, t - lastT)); lastT = t;
      // floaters
      floaters.forEach((f) => { const d = camZ - f.position.z; f.material.opacity = .32 * sstep(2, 8, d) * (1 - sstep(40, 60, d)); if (!reduce) { f.position.y = f.userData.y + Math.sin(t * .6 + f.userData.ph) * .35; f.material.rotation = Math.sin(t * .3 + f.userData.ph) * .15; } });
      // bursts
      for (let i = 0; i < BN; i++) { if (bLife[i] <= 0) continue; bLife[i] -= dt * .9; const j = i * 3;
        bVel[j + 1] -= dt * 1.4; bVel[j] *= .985; bVel[j + 1] *= .985; bVel[j + 2] *= .985;
        bPos[j] += bVel[j] * dt; bPos[j + 1] += bVel[j + 1] * dt; bPos[j + 2] += bVel[j + 2] * dt;
        if (bLife[i] <= 0) { bCol[j] = bCol[j + 1] = bCol[j + 2] = 0; } else { const k = bLife[i] / Math.max(.001, bLife[i] + dt * .9); bCol[j] *= k; bCol[j + 1] *= k; bCol[j + 2] *= k; } }
      bGeo.attributes.position.needsUpdate = true; bGeo.attributes.color.needsUpdate = true;
      renderer.render(scene, camera);
    } };
  }
})();
