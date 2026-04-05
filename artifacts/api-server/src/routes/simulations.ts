import { Router, type IRouter } from "express";
import { db } from "@workspace/db";
import { simulationsTable } from "@workspace/db/schema";
import { eq, and, desc, asc, SQL } from "drizzle-orm";

const router: IRouter = Router();

router.get("/simulations", async (req, res) => {
  try {
    const { category, gradeLevel, featured } = req.query;

    const validCategories = ["Physics", "Chemistry", "Biology", "Math", "Earth Science"];
    const validGradeLevels = ["elementary", "middle"];

    const conditions: SQL[] = [];

    if (typeof category === "string" && category) {
      if (!validCategories.includes(category)) {
        res.status(400).json({ error: `Invalid category. Must be one of: ${validCategories.join(", ")}` });
        return;
      }
      conditions.push(eq(simulationsTable.category, category));
    }

    if (typeof gradeLevel === "string" && gradeLevel) {
      if (!validGradeLevels.includes(gradeLevel)) {
        res.status(400).json({ error: `Invalid gradeLevel. Must be one of: ${validGradeLevels.join(", ")}` });
        return;
      }
      conditions.push(eq(simulationsTable.gradeLevel, gradeLevel));
    }

    if (featured === "true") {
      conditions.push(eq(simulationsTable.isFeatured, true));
    } else if (featured === "false") {
      conditions.push(eq(simulationsTable.isFeatured, false));
    }

    const where = conditions.length > 0 ? and(...conditions) : undefined;

    const results = await db
      .select()
      .from(simulationsTable)
      .where(where)
      .orderBy(desc(simulationsTable.isFeatured), asc(simulationsTable.nameEn));

    const mapped = results.map((r) => ({
      id: r.id,
      slug: r.slug,
      nameEn: r.nameEn,
      nameZh: r.nameZh,
      descriptionEn: r.descriptionEn,
      descriptionZh: r.descriptionZh,
      category: r.category,
      gradeLevel: r.gradeLevel,
      tagsEn: r.tagsEn,
      tagsZh: r.tagsZh,
      urlEn: r.urlEn,
      urlZh: r.urlZh,
      githubRepoUrl: r.githubRepoUrl,
      thumbnailUrl: r.thumbnailUrl,
      hasChineseLocalization: r.hasChineseLocalization,
      isFeatured: r.isFeatured,
      localDev: r.localDev,
      customRoute: r.customRoute,
      guide: r.guide,
    }));

    res.json(mapped);
  } catch (err) {
    console.error("Error fetching simulations:", err);
    res.status(500).json({ error: "Internal server error" });
  }
});

export default router;
