CREATE EXTENSION IF NOT EXISTS "pgcrypto";

CREATE TABLE IF NOT EXISTS addresses(
  address_id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  address VARCHAR (200) NOT NULL,
  place_id VARCHAR (50) NOT NULL,
  latitude DECIMAL(9, 7) NOT NULL,
  longitude DECIMAL(10, 7) NOT NULL,
  wkt GEOMETRY(Point, 4326),
  created_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
  updated_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

