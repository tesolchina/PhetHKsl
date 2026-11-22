-- Restore into a NEW Railway PostgreSQL database only.
CREATE TABLE public.simulations (
  id serial PRIMARY KEY,
  slug varchar(255) NOT NULL UNIQUE,
  name_en text NOT NULL,
  name_zh text NOT NULL,
  description_en text NOT NULL,
  description_zh text NOT NULL,
  category varchar(50) NOT NULL,
  grade_level varchar(20) NOT NULL,
  tags_en jsonb NOT NULL DEFAULT '[]'::jsonb,
  tags_zh jsonb NOT NULL DEFAULT '[]'::jsonb,
  url_en text NOT NULL,
  url_zh text NOT NULL,
  github_repo_url text,
  thumbnail_url text,
  has_chinese_localization boolean NOT NULL DEFAULT false,
  is_featured boolean NOT NULL DEFAULT false,
  local_dev boolean NOT NULL DEFAULT false,
  custom_route text,
  guide jsonb NOT NULL DEFAULT '[]'::jsonb,
  curriculum_mappings jsonb NOT NULL DEFAULT '[]'::jsonb
);
