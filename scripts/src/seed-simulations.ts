import pg from "pg";
import { drizzle } from "drizzle-orm/node-postgres";
import * as schema from "@workspace/db/schema";
import type { CurriculumMapping, PhetSimulation } from "./seed-data/types";
import { featuredSimulations } from "./seed-data/featured-simulations";
import { fullCatalog } from "./seed-data/catalog-simulations";

const PHET_API_URL = "https://phet.colorado.edu/services/metadata/1.3/simulations?format=json&type=html";

async function main() {
  if (!process.env.DATABASE_URL) {
    throw new Error("DATABASE_URL must be set");
  }

  const pool = new pg.Pool({ connectionString: process.env.DATABASE_URL });
  const db = drizzle(pool, { schema });

  console.log("Fetching PhET simulation metadata...");

  let phetData: PhetSimulation;
  try {
    const response = await fetch(PHET_API_URL);
    if (!response.ok) {
      throw new Error(`HTTP ${response.status}`);
    }
    phetData = await response.json() as PhetSimulation;
  } catch (err) {
    console.error("Failed to fetch PhET API, using static catalog:", err);
    phetData = { simulations: [] };
  }

  const featuredSlugs = new Set(featuredSimulations.map(s => s.slug));
  const allInserts: schema.InsertSimulation[] = [];

  for (const sim of featuredSimulations) {
    allInserts.push({
      slug: sim.slug,
      nameEn: sim.nameEn,
      nameZh: sim.nameZh,
      descriptionEn: sim.descriptionEn,
      descriptionZh: sim.descriptionZh,
      category: sim.category,
      gradeLevel: sim.gradeLevel,
      tagsEn: sim.tagsEn,
      tagsZh: sim.tagsZh,
      urlEn: sim.urlEn,
      urlZh: sim.urlZh,
      githubRepoUrl: `https://github.com/phetsims/${sim.slug}`,
      thumbnailUrl: `https://phet.colorado.edu/sims/html/${sim.slug}/latest/${sim.slug}-600.png`,
      hasChineseLocalization: !sim.localDev,
      isFeatured: true,
      localDev: sim.localDev || false,
      customRoute: sim.customRoute || null,
      guide: sim.guide || [],
      curriculumMappings: sim.curriculumMappings || [],
    });
  }

  const htmlSims = (phetData.simulations || []).filter(s => {
    return s.name && s.type?.includes?.("html") !== false;
  });

  console.log(`Found ${htmlSims.length} simulations from PhET API`);

  const allSlugs = new Set(featuredSlugs);

  if (htmlSims.length > 0) {
    const catalogBySlugs = new Map(fullCatalog.map(s => [s.slug, s]));

    for (const sim of htmlSims) {
      const slug = sim.name;
      if (allSlugs.has(slug)) continue;
      allSlugs.add(slug);

      const zhLocalization = sim.localizedSimulations?.find(
        (l) => l.locale === "zh_CN" || l.locale === "zh_TW"
      );
      const hasZh = !!zhLocalization;
      const zhTitle = zhLocalization?.title || slug;
      const enTitle = sim.localizedSimulations?.find(l => l.locale === "en")?.title || slug.replace(/-/g, " ").replace(/\b\w/g, c => c.toUpperCase());
      const topicCategoryMap: Record<string, string> = {
        "physics": "Physics",
        "chemistry": "Chemistry",
        "biology": "Biology",
        "math": "Math",
        "mathematics": "Math",
        "earth-science": "Earth Science",
        "earth science": "Earth Science",
      };
      const rawTopic = (sim.topics?.[0] || "").toLowerCase();
      const category = topicCategoryMap[rawTopic] || "Physics";

      const catalogEntry = catalogBySlugs.get(slug);

      allInserts.push({
        slug,
        nameEn: enTitle,
        nameZh: hasZh ? zhTitle : enTitle,
        descriptionEn: `Interactive simulation: ${enTitle}`,
        descriptionZh: hasZh ? `互动模拟：${zhTitle}` : `Interactive simulation: ${enTitle}`,
        category: catalogEntry?.category || category,
        gradeLevel: catalogEntry?.gradeLevel || (slug.includes("basics") || slug.includes("intro") ? "elementary" : "middle"),
        tagsEn: (sim.topics || []).map(t => t.replace(/-/g, " ").replace(/\b\w/g, c => c.toUpperCase())).slice(0, 5),
        tagsZh: [],
        urlEn: `https://phet.colorado.edu/sims/html/${slug}/latest/${slug}_en.html`,
        urlZh: hasZh ? `https://phet.colorado.edu/sims/html/${slug}/latest/${slug}_zh_CN.html` : `https://phet.colorado.edu/sims/html/${slug}/latest/${slug}_en.html`,
        githubRepoUrl: `https://github.com/phetsims/${slug}`,
        thumbnailUrl: `https://phet.colorado.edu/sims/html/${slug}/latest/${slug}-600.png`,
        hasChineseLocalization: hasZh,
        isFeatured: false,
        localDev: false,
        customRoute: null,
        guide: [],
        curriculumMappings: catalogEntry?.curriculumMappings || [],
      });
    }
  }

  const categoryDescMap: Record<string, string> = {
    "Physics": "物理", "Chemistry": "化学", "Biology": "生物",
    "Math": "数学", "Earth Science": "地球科学",
  };
  for (const sim of fullCatalog) {
    if (allSlugs.has(sim.slug)) continue;
    allSlugs.add(sim.slug);

    allInserts.push({
      slug: sim.slug,
      nameEn: sim.nameEn,
      nameZh: sim.nameZh,
      descriptionEn: `Interactive ${sim.category.toLowerCase()} simulation: ${sim.nameEn}`,
      descriptionZh: sim.hasZh ? `互动${categoryDescMap[sim.category] || "科学"}模拟：${sim.nameZh}` : `Interactive simulation: ${sim.nameEn}`,
      category: sim.category,
      gradeLevel: sim.gradeLevel,
      tagsEn: [sim.category],
      tagsZh: sim.hasZh ? [categoryDescMap[sim.category] || sim.category] : [],
      urlEn: `https://phet.colorado.edu/sims/html/${sim.slug}/latest/${sim.slug}_en.html`,
      urlZh: sim.hasZh ? `https://phet.colorado.edu/sims/html/${sim.slug}/latest/${sim.slug}_zh_CN.html` : `https://phet.colorado.edu/sims/html/${sim.slug}/latest/${sim.slug}_en.html`,
      githubRepoUrl: `https://github.com/phetsims/${sim.slug}`,
      thumbnailUrl: `https://phet.colorado.edu/sims/html/${sim.slug}/latest/${sim.slug}-600.png`,
      hasChineseLocalization: sim.hasZh,
      isFeatured: false,
      localDev: false,
      customRoute: null,
      guide: [],
      curriculumMappings: sim.curriculumMappings || [],
    });
  }

  console.log(`Inserting ${allInserts.length} simulations (${featuredSlugs.size} featured, ${allInserts.length - featuredSlugs.size} catalog)...`);

  const categoryCounts: Record<string, number> = {};
  const gradeCounts: Record<string, number> = {};
  const withCurriculum = allInserts.filter(s => (s.curriculumMappings as CurriculumMapping[])?.length > 0).length;
  for (const sim of allInserts) {
    categoryCounts[sim.category] = (categoryCounts[sim.category] || 0) + 1;
    gradeCounts[sim.gradeLevel] = (gradeCounts[sim.gradeLevel] || 0) + 1;
  }
  console.log("  Categories:", JSON.stringify(categoryCounts));
  console.log("  Grade levels:", JSON.stringify(gradeCounts));
  console.log(`  With curriculum mappings: ${withCurriculum}`);

  await db.transaction(async (tx) => {
    await tx.delete(schema.simulationsTable);

    const batchSize = 50;
    for (let i = 0; i < allInserts.length; i += batchSize) {
      const batch = allInserts.slice(i, i + batchSize);
      await tx.insert(schema.simulationsTable).values(batch);
      console.log(`  Inserted batch ${Math.floor(i / batchSize) + 1}/${Math.ceil(allInserts.length / batchSize)}`);
    }
  });

  console.log(`Done! Inserted ${allInserts.length} simulations total.`);

  await pool.end();
}

main().catch((err) => {
  console.error("Seed failed:", err);
  process.exit(1);
});
